"""
Unified API Client for Morpheus Web Intelligence System
Handles all external API integrations for BBB website agents
"""

import os
import sys
import json
import time
import requests
import openai
import git
from datetime import datetime
from functools import wraps
from typing import Dict, List, Optional, Any
from pathlib import Path


# ====================
# Configuration
# ====================

class Config:
    """Central configuration for all API clients"""

    # OpenAI (for content generation)
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    # Google APIs
    GOOGLE_CLOUD_PROJECT = os.getenv("GOOGLE_CLOUD_PROJECT")
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    GOOGLE_SEARCH_CONSOLE_CREDENTIALS = os.getenv("GOOGLE_SEARCH_CONSOLE_CREDENTIALS")
    GOOGLE_ANALYTICS_PROPERTY_ID = os.getenv("GOOGLE_ANALYTICS_PROPERTY_ID")

    # Netlify
    NETLIFY_AUTH_TOKEN = os.getenv("NETLIFY_AUTH_TOKEN")
    NETLIFY_SITE_ID = os.getenv("NETLIFY_SITE_ID")

    # Git Configuration
    GIT_REPO_PATH = "/Users/jackenholland/Businesses Beyond Borders/empower-central-asia"
    GIT_DEFAULT_BRANCH = "main"

    # Rate Limiting
    RATE_LIMIT_REQUESTS = 100
    RATE_LIMIT_WINDOW = 60  # seconds

    # Caching
    CACHE_DIR = Path(__file__).parent.parent / ".cache"
    CACHE_TTL = 3600  # 1 hour


# ====================
# Utilities
# ====================

def rate_limit(max_calls: int = Config.RATE_LIMIT_REQUESTS,
               window: int = Config.RATE_LIMIT_WINDOW):
    """Decorator for rate limiting API calls"""
    calls = []

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            # Remove calls outside the window
            calls[:] = [c for c in calls if c > now - window]

            if len(calls) >= max_calls:
                sleep_time = window - (now - calls[0])
                print(f"⏱️  Rate limit reached. Sleeping for {sleep_time:.2f}s...")
                time.sleep(sleep_time)
                calls[:] = []

            calls.append(time.time())
            return func(*args, **kwargs)
        return wrapper
    return decorator


def cache_result(ttl: int = Config.CACHE_TTL):
    """Decorator for caching API results"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Create cache key from function name and args
            cache_key = f"{func.__name__}_{hash(str(args) + str(kwargs))}"
            cache_file = Config.CACHE_DIR / f"{cache_key}.json"

            # Check cache
            if cache_file.exists():
                cache_time = cache_file.stat().st_mtime
                if time.time() - cache_time < ttl:
                    with open(cache_file, 'r') as f:
                        print(f"📦 Using cached result for {func.__name__}")
                        return json.load(f)

            # Call function and cache result
            result = func(*args, **kwargs)
            Config.CACHE_DIR.mkdir(exist_ok=True)
            with open(cache_file, 'w') as f:
                json.dump(result, f, indent=2)

            return result
        return wrapper
    return decorator


# ====================
# OpenAI Client
# ====================

class OpenAIClient:
    """Client for OpenAI API (content and image generation)"""

    def __init__(self):
        if not Config.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY environment variable not set")
        openai.api_key = Config.OPENAI_API_KEY

    @rate_limit(max_calls=50, window=60)
    def generate_text(self, prompt: str, model: str = "gpt-4.1-turbo",
                     max_tokens: int = 1800, temperature: float = 0.7) -> str:
        """Generate text content using OpenAI"""
        try:
            response = openai.ChatCompletion.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=max_tokens,
                temperature=temperature
            )
            return response.choices[0].message["content"]
        except Exception as e:
            print(f"❌ OpenAI text generation failed: {e}")
            raise

    @rate_limit(max_calls=20, window=60)
    def generate_image(self, prompt: str, size: str = "1024x1024",
                      quality: str = "standard") -> str:
        """Generate image using DALL-E"""
        try:
            response = openai.Image.create(
                prompt=prompt,
                n=1,
                size=size,
                quality=quality
            )
            return response.data[0].url
        except Exception as e:
            print(f"❌ DALL-E image generation failed: {e}")
            raise


# ====================
# Google APIs Client
# ====================

class GoogleAPIsClient:
    """Client for Google Cloud APIs (Trends, Search Console, Analytics, etc.)"""

    def __init__(self):
        if not Config.GOOGLE_API_KEY:
            raise ValueError("GOOGLE_API_KEY environment variable not set")
        self.api_key = Config.GOOGLE_API_KEY

    @rate_limit(max_calls=100, window=60)
    @cache_result(ttl=3600)
    def get_trends_data(self, keywords: List[str], timeframe: str = "today 3-m",
                       geo: str = "US") -> Dict:
        """Get Google Trends data for keywords"""
        # Note: Google Trends doesn't have an official API
        # Using pytrends library (pip install pytrends)
        try:
            from pytrends.request import TrendReq
            pytrends = TrendReq(hl='en-US', tz=360)

            pytrends.build_payload(keywords, timeframe=timeframe, geo=geo)

            return {
                "interest_over_time": pytrends.interest_over_time().to_dict(),
                "interest_by_region": pytrends.interest_by_region().to_dict(),
                "related_queries": pytrends.related_queries()
            }
        except Exception as e:
            print(f"❌ Google Trends failed: {e}")
            return {}

    @rate_limit(max_calls=200, window=60)
    def get_search_console_data(self, site_url: str, start_date: str,
                                end_date: str, dimensions: List[str] = ["query"]) -> Dict:
        """Get Google Search Console data"""
        # Requires: google-api-python-client, google-auth-oauthlib
        try:
            from googleapiclient.discovery import build
            from google.oauth2 import service_account

            credentials = service_account.Credentials.from_service_account_file(
                Config.GOOGLE_SEARCH_CONSOLE_CREDENTIALS,
                scopes=['https://www.googleapis.com/auth/webmasters.readonly']
            )

            service = build('searchconsole', 'v1', credentials=credentials)

            request = {
                'startDate': start_date,
                'endDate': end_date,
                'dimensions': dimensions,
                'rowLimit': 25000
            }

            response = service.searchanalytics().query(
                siteUrl=site_url, body=request
            ).execute()

            return response
        except Exception as e:
            print(f"❌ Google Search Console failed: {e}")
            return {}

    @rate_limit(max_calls=200, window=60)
    def get_pagespeed_insights(self, url: str, strategy: str = "mobile") -> Dict:
        """Get PageSpeed Insights data"""
        try:
            api_url = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
            params = {
                "url": url,
                "key": self.api_key,
                "strategy": strategy,
                "category": ["performance", "accessibility", "best-practices", "seo"]
            }

            response = requests.get(api_url, params=params)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"❌ PageSpeed Insights failed: {e}")
            return {}

    @rate_limit(max_calls=200, window=60)
    def test_rich_results(self, url: str) -> Dict:
        """Test URL for rich results eligibility"""
        try:
            api_url = "https://searchconsole.googleapis.com/v1/urlTestingTools/richResults:test"
            headers = {"Authorization": f"Bearer {self.api_key}"}
            data = {"url": url}

            response = requests.post(api_url, json=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"❌ Rich Results Test failed: {e}")
            return {}

    @rate_limit(max_calls=200, window=60)
    def validate_schema(self, schema_json: str) -> Dict:
        """Validate schema.org markup"""
        try:
            api_url = "https://validator.schema.org/validate"
            headers = {"Content-Type": "application/json"}

            response = requests.post(api_url, data=schema_json, headers=headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"❌ Schema validation failed: {e}")
            return {}

    @rate_limit(max_calls=200, window=60)
    def get_analytics_data(self, property_id: str, start_date: str,
                          end_date: str, metrics: List[str]) -> Dict:
        """Get Google Analytics 4 data"""
        try:
            from google.analytics.data_v1beta import BetaAnalyticsDataClient
            from google.analytics.data_v1beta.types import (
                DateRange,
                Dimension,
                Metric,
                RunReportRequest,
            )
            from google.oauth2 import service_account

            credentials = service_account.Credentials.from_service_account_file(
                Config.GOOGLE_SEARCH_CONSOLE_CREDENTIALS
            )

            client = BetaAnalyticsDataClient(credentials=credentials)

            request = RunReportRequest(
                property=f"properties/{property_id}",
                date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
                metrics=[Metric(name=m) for m in metrics],
            )

            response = client.run_report(request)
            return {"rows": [row for row in response.rows]}
        except Exception as e:
            print(f"❌ Google Analytics failed: {e}")
            return {}


# ====================
# Netlify Client
# ====================

class NetlifyClient:
    """Client for Netlify API (deployment, site management)"""

    def __init__(self):
        if not Config.NETLIFY_AUTH_TOKEN:
            raise ValueError("NETLIFY_AUTH_TOKEN environment variable not set")
        self.auth_token = Config.NETLIFY_AUTH_TOKEN
        self.site_id = Config.NETLIFY_SITE_ID
        self.base_url = "https://api.netlify.com/api/v1"

    def _headers(self) -> Dict:
        return {"Authorization": f"Bearer {self.auth_token}"}

    @rate_limit(max_calls=100, window=60)
    def get_site_info(self) -> Dict:
        """Get site information"""
        try:
            url = f"{self.base_url}/sites/{self.site_id}"
            response = requests.get(url, headers=self._headers())
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"❌ Netlify site info failed: {e}")
            return {}

    @rate_limit(max_calls=50, window=60)
    def trigger_deploy(self, title: str = "Manual deploy") -> Dict:
        """Trigger a new deployment"""
        try:
            url = f"{self.base_url}/sites/{self.site_id}/builds"
            data = {"title": title}
            response = requests.post(url, json=data, headers=self._headers())
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"❌ Netlify deploy failed: {e}")
            return {}

    @rate_limit(max_calls=100, window=60)
    def get_deploy_status(self, deploy_id: str) -> Dict:
        """Check deployment status"""
        try:
            url = f"{self.base_url}/sites/{self.site_id}/deploys/{deploy_id}"
            response = requests.get(url, headers=self._headers())
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"❌ Netlify deploy status failed: {e}")
            return {}


# ====================
# Git Client
# ====================

class GitClient:
    """Client for Git operations (commit, push, etc.)"""

    def __init__(self, repo_path: str = Config.GIT_REPO_PATH):
        self.repo_path = repo_path
        try:
            self.repo = git.Repo(repo_path)
        except git.exc.InvalidGitRepositoryError:
            raise ValueError(f"Invalid git repository: {repo_path}")

    def commit_and_push(self, file_paths: List[str], message: str,
                       branch: str = Config.GIT_DEFAULT_BRANCH) -> bool:
        """Commit and push files to repository"""
        try:
            # Add files
            for file_path in file_paths:
                self.repo.git.add(file_path)

            # Commit
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            full_message = f"{message}\n\n🤖 Generated with Claude Code\nTimestamp: {timestamp}"
            self.repo.index.commit(full_message)

            # Push
            origin = self.repo.remote(name='origin')
            origin.push(refspec=f'{branch}:{branch}')

            print(f"✅ Committed and pushed: {message}")
            return True
        except Exception as e:
            print(f"❌ Git commit/push failed: {e}")
            return False

    def get_status(self) -> Dict:
        """Get repository status"""
        try:
            return {
                "branch": self.repo.active_branch.name,
                "modified": [item.a_path for item in self.repo.index.diff(None)],
                "untracked": self.repo.untracked_files,
                "staged": [item.a_path for item in self.repo.index.diff("HEAD")]
            }
        except Exception as e:
            print(f"❌ Git status failed: {e}")
            return {}


# ====================
# Unified API Manager
# ====================

class APIManager:
    """Central manager for all API clients"""

    def __init__(self):
        self.openai = OpenAIClient()
        self.google = GoogleAPIsClient()
        self.netlify = NetlifyClient()
        self.git = GitClient()

    def health_check(self) -> Dict[str, bool]:
        """Check health of all API connections"""
        health = {}

        # OpenAI
        try:
            self.openai.generate_text("test", max_tokens=5)
            health["openai"] = True
        except:
            health["openai"] = False

        # Google APIs
        try:
            self.google.get_pagespeed_insights("https://google.com")
            health["google"] = True
        except:
            health["google"] = False

        # Netlify
        try:
            self.netlify.get_site_info()
            health["netlify"] = True
        except:
            health["netlify"] = False

        # Git
        try:
            self.git.get_status()
            health["git"] = True
        except:
            health["git"] = False

        return health


# ====================
# Main Execution
# ====================

if __name__ == "__main__":
    """Test API connections"""
    print("🔧 Testing API Connections...\n")

    api = APIManager()
    health = api.health_check()

    print("\n📊 API Health Status:")
    for service, status in health.items():
        emoji = "✅" if status else "❌"
        print(f"  {emoji} {service.upper()}: {'Connected' if status else 'Failed'}")

    print("\n✨ API Client Ready!")
