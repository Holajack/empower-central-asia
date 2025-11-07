# API Infrastructure Plan for BBB Web Intelligence System

**Project:** Businesses Beyond Borders Website Orchestration
**Document Version:** 1.0
**Date:** November 7, 2025
**Status:** Implementation Planning

---

## Executive Summary

This document provides a comprehensive plan for setting up the complete API and MCP (Model Context Protocol) infrastructure needed to support the Morpheus web intelligence system and its 9 specialized agents.

**Current State:**
- Basic blog scheduler with content generation (TypeScript/React)
- Nano Banana image API integration (partial)
- MCP servers available: Donorbox, Gmail, Google Calendar, Google Drive, Microsoft 365

**Required State:**
- Full API integration for 9 specialized agents
- Unified API client with error handling and rate limiting
- Python-based orchestration layer for automation
- Comprehensive monitoring and logging

---

## 1. Current Infrastructure Audit

### 1.1 Available MCP Servers

| MCP Server | Status | Purpose | Auth Method |
|------------|--------|---------|-------------|
| **Donorbox** | ✅ Active | Fundraising data, campaign tracking | API Key |
| **Gmail** | ✅ Active | Email communications, donor outreach | OAuth 2.0 |
| **Google Calendar** | ✅ Active | Event scheduling, calendar management | OAuth 2.0 |
| **Google Drive** | ✅ Active | Document storage, content management | OAuth 2.0 |
| **Microsoft 365** | ✅ Active | Office integration, SharePoint access | OAuth 2.0 |

### 1.2 Existing Code Assets

| Asset | Location | Status | Purpose |
|-------|----------|--------|---------|
| Blog Scheduler | `/src/services/blogScheduler.ts` | ✅ Functional | Daily content generation |
| Blog Subagent | `/src/services/blogWritingSubagent.ts` | ✅ Functional | Content writing |
| SEO Optimizer | `/src/services/seoOptimizedBoldText.ts` | ✅ Functional | Bold text optimization |
| Image Service | `/src/services/nanoBananaImageService.ts` | ⚠️ Partial | Image generation (API pending) |
| Environment Config | `.env.example` | ⚠️ Incomplete | Only Nano Banana configured |

### 1.3 Missing Infrastructure

**Critical Gaps:**
- ❌ No Python API client for orchestration
- ❌ No Google Trends API integration
- ❌ No Google Search Console API
- ❌ No GA4 Reporting API
- ❌ No Schema.org validation API
- ❌ No Netlify deployment API
- ❌ No centralized error handling/logging
- ❌ No rate limiting system
- ❌ No unified authentication manager

---

## 2. Agent-to-API Mapping

### 2.1 Web-Scout (Research & Discovery Agent)

**Purpose:** Discover trending topics, competitor analysis, market research

**Required APIs:**
1. **Google Trends API** (Priority: HIGH)
   - Trending topics in entrepreneurship/nonprofit space
   - Regional interest data (Central Asia)
   - Related queries and topics

2. **Google Custom Search API** (Priority: HIGH)
   - Competitor content analysis
   - Industry news monitoring
   - Research source discovery

3. **NewsAPI** (Priority: MEDIUM)
   - Real-time news about Central Asia
   - Entrepreneurship trends
   - Nonprofit sector updates

4. **SerpAPI** (Priority: LOW)
   - SERP feature analysis
   - Competitor ranking tracking

**MCP Dependencies:**
- Google Drive (store research findings)

---

### 2.2 Web-Scribe (Content Writing Agent)

**Purpose:** Generate blog posts, website copy, newsletters

**Required APIs:**
1. **OpenAI API** (Priority: HIGH) - ALREADY HAVE KEY
   - GPT-4 for content generation
   - Content refinement and editing
   - Title/headline generation

2. **Nano Banana API** (Priority: HIGH)
   - Featured image generation
   - Blog header images
   - Social media graphics

3. **Grammarly API** (Priority: MEDIUM) - Optional
   - Grammar and style checking
   - Readability analysis

4. **Copyscape API** (Priority: LOW)
   - Plagiarism detection
   - Content originality verification

**MCP Dependencies:**
- Google Drive (save drafts)
- Gmail (send for review)

**Current Status:** ✅ Mostly functional (TypeScript implementation exists)

---

### 2.3 Web-Revive (Legacy Content Modernizer)

**Purpose:** Update old blog posts, refresh outdated content

**Required APIs:**
1. **OpenAI API** (Priority: HIGH)
   - Content rewriting
   - SEO improvement suggestions

2. **Google Search Console API** (Priority: HIGH)
   - Identify underperforming content
   - Track content improvements

3. **Screaming Frog API** (Priority: LOW) - Optional
   - Content audit automation

**MCP Dependencies:**
- Google Drive (access old content)

---

### 2.4 Web-Canvas (Design & UI/UX Agent)

**Purpose:** Design updates, visual improvements, layout optimization

**Required APIs:**
1. **Figma API** (Priority: MEDIUM)
   - Design file access
   - Component updates

2. **Nano Banana API** (Priority: HIGH)
   - Generate design mockups
   - Create visual assets

3. **TinyPNG API** (Priority: MEDIUM)
   - Image optimization
   - File size reduction

4. **ImageOptim API** (Priority: LOW)
   - Additional image compression

**MCP Dependencies:**
- Google Drive (store design assets)

---

### 2.5 Web-Beacon (SEO Optimization Agent)

**Purpose:** Monitor rankings, optimize metadata, track performance

**Required APIs:**
1. **Google Search Console API** (Priority: HIGH)
   - Search performance data
   - Indexing status
   - Core Web Vitals

2. **GA4 Reporting API** (Priority: HIGH)
   - Traffic analysis
   - User behavior tracking
   - Conversion monitoring

3. **PageSpeed Insights API** (Priority: HIGH)
   - Performance scores
   - Optimization suggestions

4. **Ahrefs API** (Priority: LOW) - Optional
   - Backlink monitoring
   - Competitor analysis

5. **SEMrush API** (Priority: LOW) - Optional
   - Keyword research
   - SERP tracking

**MCP Dependencies:**
- Google Drive (store reports)
- Gmail (send alerts)

---

### 2.6 Web-Architect (Schema.org & Structured Data Agent)

**Purpose:** Manage structured data, validate schema markup

**Required APIs:**
1. **Google Rich Results Test API** (Priority: HIGH)
   - Validate structured data
   - Check rich result eligibility

2. **Schema.org Validator API** (Priority: HIGH)
   - Markup validation
   - Error detection

3. **OpenAI API** (Priority: MEDIUM)
   - Generate schema markup
   - Suggest improvements

**MCP Dependencies:**
- Google Drive (store schema templates)

---

### 2.7 Web-Navigator (Localization & Static Page Generation)

**Purpose:** Multi-language support, generate static pages

**Required APIs:**
1. **Google Translate API** (Priority: HIGH)
   - Content translation (English/Russian)
   - Quality translation for Central Asia context

2. **DeepL API** (Priority: MEDIUM) - Alternative translator
   - Higher quality translations
   - Better context understanding

3. **OpenAI API** (Priority: MEDIUM)
   - Cultural adaptation of content
   - Localized content generation

**MCP Dependencies:**
- Google Drive (store translations)

---

### 2.8 Web-Pulse (Event Scheduling & Calendar Sync)

**Purpose:** Manage events, sync calendars, send reminders

**Required APIs:**
1. **Google Calendar API** (Priority: HIGH) - ALREADY HAVE VIA MCP
   - Event creation/updates
   - Calendar synchronization

2. **Twilio API** (Priority: MEDIUM)
   - SMS reminders
   - Event notifications

3. **SendGrid API** (Priority: MEDIUM)
   - Email reminders
   - Event invitations

**MCP Dependencies:**
- Google Calendar (primary integration)
- Gmail (send invites)

---

### 2.9 Web-Custodian (Site Maintenance & Health Monitoring)

**Purpose:** Monitor uptime, check broken links, security scans

**Required APIs:**
1. **Netlify API** (Priority: HIGH)
   - Deploy status monitoring
   - Build logs
   - Site analytics

2. **PageSpeed Insights API** (Priority: HIGH)
   - Performance monitoring
   - Core Web Vitals tracking

3. **UptimeRobot API** (Priority: MEDIUM)
   - Uptime monitoring
   - Downtime alerts

4. **SecurityScorecard API** (Priority: LOW)
   - Security assessment
   - Vulnerability scanning

5. **Broken Link Checker API** (Priority: MEDIUM)
   - Link validation
   - 404 detection

**MCP Dependencies:**
- Gmail (send alerts)
- Google Drive (store logs)

---

## 3. Priority-Ranked Implementation Plan

### Phase 1: Core Infrastructure (Week 1-2)
**Priority: CRITICAL - Must be completed first**

1. **Create Python API Client Structure**
   - Unified authentication manager
   - Rate limiting system
   - Error handling and retry logic
   - Logging framework

2. **Google APIs Setup**
   - Enable Google Cloud Console APIs
   - Configure OAuth 2.0 credentials
   - Set up service account for automation

3. **OpenAI Integration**
   - Secure API key storage
   - Token usage tracking
   - Content generation wrapper

4. **Git/GitHub API**
   - Automated commits
   - Deployment triggers
   - Branch management

**Deliverables:**
- `/utils/api_client.py` (complete)
- `/utils/auth_manager.py`
- `/utils/rate_limiter.py`
- `/config/api_config.yaml`
- `.env.template` (comprehensive)

---

### Phase 2: Essential Agent APIs (Week 3-4)
**Priority: HIGH - Required for basic automation**

1. **Web-Beacon APIs**
   - Google Search Console API
   - GA4 Reporting API
   - PageSpeed Insights API

2. **Web-Architect APIs**
   - Google Rich Results Test API
   - Schema.org validator

3. **Web-Scout APIs**
   - Google Trends API
   - Google Custom Search API

4. **Netlify API**
   - Deployment automation
   - Build status monitoring

**Deliverables:**
- `/agents/web_beacon/api_client.py`
- `/agents/web_architect/schema_validator.py`
- `/agents/web_scout/research_engine.py`
- `/agents/web_custodian/netlify_client.py`

---

### Phase 3: Content Enhancement (Week 5-6)
**Priority: MEDIUM - Improves content quality**

1. **Image Generation**
   - Complete Nano Banana integration
   - Fallback to OpenAI DALL-E
   - Image optimization pipeline

2. **Translation Services**
   - Google Translate API
   - DeepL API (optional)

3. **Email/SMS Services**
   - Twilio API (SMS)
   - SendGrid API (Email)

**Deliverables:**
- `/agents/web_canvas/image_generator.py`
- `/agents/web_navigator/translation_service.py`
- `/agents/web_pulse/notification_service.py`

---

### Phase 4: Advanced Features (Week 7-8)
**Priority: LOW - Nice-to-have enhancements**

1. **Advanced SEO Tools**
   - Ahrefs API (if budget allows)
   - SEMrush API (if budget allows)

2. **Monitoring Services**
   - UptimeRobot API
   - SecurityScorecard API

3. **Content Quality Tools**
   - Grammarly API
   - Copyscape API

**Deliverables:**
- `/agents/web_beacon/advanced_seo.py`
- `/agents/web_custodian/monitoring.py`

---

## 4. Complete API Client Architecture

### 4.1 File Structure

```
/Businesses Beyond Borders/empower-central-asia/
├── automation/                    # NEW: Python automation layer
│   ├── agents/                    # Agent implementations
│   │   ├── web_scout.py
│   │   ├── web_scribe.py
│   │   ├── web_revive.py
│   │   ├── web_canvas.py
│   │   ├── web_beacon.py
│   │   ├── web_architect.py
│   │   ├── web_navigator.py
│   │   ├── web_pulse.py
│   │   └── web_custodian.py
│   │
│   ├── morpheus.py                # Main orchestrator
│   ├── workflows/                 # Workflow definitions
│   │   ├── weekly_cycle.py
│   │   ├── emergency_repair.py
│   │   └── content_generation.py
│   │
│   ├── utils/                     # Shared utilities
│   │   ├── api_client.py          # Base API client
│   │   ├── auth_manager.py        # Authentication handler
│   │   ├── rate_limiter.py        # Rate limiting
│   │   ├── error_handler.py       # Error handling
│   │   ├── logger.py              # Logging framework
│   │   └── cache.py               # Response caching
│   │
│   ├── config/                    # Configuration files
│   │   ├── api_config.yaml        # API endpoints and settings
│   │   ├── agent_config.yaml      # Agent-specific configs
│   │   └── schedule_config.yaml   # Cron schedules
│   │
│   └── reports/                   # Generated reports
│       ├── daily/
│       ├── weekly/
│       └── monthly/
│
├── .env                           # Environment variables (gitignored)
├── .env.template                  # Template for setup
└── requirements.txt               # Python dependencies
```

### 4.2 Base API Client (`utils/api_client.py`)

```python
"""
Base API Client for BBB Web Intelligence System
Provides unified interface for all API integrations
"""

import requests
import time
import logging
from typing import Dict, Any, Optional, Callable
from functools import wraps
from datetime import datetime, timedelta
import json
import hashlib

from .rate_limiter import RateLimiter
from .error_handler import APIError, RateLimitError, AuthenticationError
from .cache import APICache
from .logger import get_logger


class BaseAPIClient:
    """
    Base API client with error handling, rate limiting, and caching
    """

    def __init__(
        self,
        api_name: str,
        base_url: str,
        api_key: Optional[str] = None,
        rate_limit: Optional[int] = None,
        cache_ttl: int = 3600
    ):
        self.api_name = api_name
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.logger = get_logger(f"api.{api_name}")

        # Rate limiting
        self.rate_limiter = RateLimiter(rate_limit) if rate_limit else None

        # Response caching
        self.cache = APICache(ttl=cache_ttl)

        # Session for connection pooling
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'BBB-Web-Intelligence/1.0',
            'Accept': 'application/json'
        })

        if api_key:
            self._set_auth_header()

    def _set_auth_header(self):
        """Set authentication header (override in subclasses)"""
        self.session.headers['Authorization'] = f'Bearer {self.api_key}'

    def _cache_key(self, method: str, endpoint: str, params: Dict) -> str:
        """Generate cache key from request parameters"""
        key_string = f"{method}:{endpoint}:{json.dumps(params, sort_keys=True)}"
        return hashlib.md5(key_string.encode()).hexdigest()

    def request(
        self,
        method: str,
        endpoint: str,
        params: Optional[Dict] = None,
        data: Optional[Dict] = None,
        headers: Optional[Dict] = None,
        use_cache: bool = True,
        retry_count: int = 3,
        retry_delay: int = 1
    ) -> Dict[Any, Any]:
        """
        Make API request with error handling, rate limiting, and caching

        Args:
            method: HTTP method (GET, POST, PUT, DELETE)
            endpoint: API endpoint (relative to base_url)
            params: Query parameters
            data: Request body data
            headers: Additional headers
            use_cache: Whether to use cached response
            retry_count: Number of retries on failure
            retry_delay: Delay between retries (seconds)

        Returns:
            API response as dictionary

        Raises:
            APIError: For API-specific errors
            RateLimitError: When rate limit is exceeded
            AuthenticationError: For authentication failures
        """

        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        params = params or {}

        # Check cache for GET requests
        if method.upper() == 'GET' and use_cache:
            cache_key = self._cache_key(method, endpoint, params)
            cached = self.cache.get(cache_key)
            if cached:
                self.logger.debug(f"Cache hit for {endpoint}")
                return cached

        # Apply rate limiting
        if self.rate_limiter:
            self.rate_limiter.wait_if_needed()

        # Merge headers
        request_headers = self.session.headers.copy()
        if headers:
            request_headers.update(headers)

        # Retry logic
        last_exception = None
        for attempt in range(retry_count):
            try:
                self.logger.debug(f"{method} {url} (attempt {attempt + 1}/{retry_count})")

                response = self.session.request(
                    method=method.upper(),
                    url=url,
                    params=params,
                    json=data,
                    headers=request_headers,
                    timeout=30
                )

                # Handle rate limiting
                if response.status_code == 429:
                    retry_after = int(response.headers.get('Retry-After', 60))
                    self.logger.warning(f"Rate limited. Waiting {retry_after}s")
                    time.sleep(retry_after)
                    continue

                # Handle authentication errors
                if response.status_code == 401:
                    raise AuthenticationError(f"Authentication failed for {self.api_name}")

                # Handle other errors
                if response.status_code >= 400:
                    error_msg = self._parse_error(response)
                    raise APIError(
                        f"{self.api_name} API error: {error_msg}",
                        status_code=response.status_code,
                        response=response.text
                    )

                # Parse response
                result = response.json() if response.text else {}

                # Cache successful GET requests
                if method.upper() == 'GET' and use_cache:
                    cache_key = self._cache_key(method, endpoint, params)
                    self.cache.set(cache_key, result)

                self.logger.info(f"✓ {method} {endpoint} - {response.status_code}")
                return result

            except requests.exceptions.RequestException as e:
                last_exception = e
                self.logger.warning(f"Request failed (attempt {attempt + 1}): {e}")
                if attempt < retry_count - 1:
                    time.sleep(retry_delay * (attempt + 1))  # Exponential backoff

        # All retries failed
        raise APIError(f"Failed after {retry_count} attempts: {last_exception}")

    def _parse_error(self, response: requests.Response) -> str:
        """Parse error message from response"""
        try:
            error_data = response.json()
            return error_data.get('error', {}).get('message', response.text)
        except:
            return response.text

    def get(self, endpoint: str, params: Optional[Dict] = None, **kwargs) -> Dict:
        """GET request"""
        return self.request('GET', endpoint, params=params, **kwargs)

    def post(self, endpoint: str, data: Optional[Dict] = None, **kwargs) -> Dict:
        """POST request"""
        return self.request('POST', endpoint, data=data, **kwargs)

    def put(self, endpoint: str, data: Optional[Dict] = None, **kwargs) -> Dict:
        """PUT request"""
        return self.request('PUT', endpoint, data=data, **kwargs)

    def delete(self, endpoint: str, **kwargs) -> Dict:
        """DELETE request"""
        return self.request('DELETE', endpoint, **kwargs)

    def close(self):
        """Close session"""
        self.session.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()
```

### 4.3 Rate Limiter (`utils/rate_limiter.py`)

```python
"""
Rate limiting to prevent API quota exhaustion
"""

import time
from collections import deque
from datetime import datetime, timedelta
import threading


class RateLimiter:
    """
    Token bucket rate limiter
    """

    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.window_size = 60  # seconds
        self.requests = deque()
        self.lock = threading.Lock()

    def wait_if_needed(self):
        """Wait if rate limit would be exceeded"""
        with self.lock:
            now = datetime.now()

            # Remove old requests outside the window
            cutoff = now - timedelta(seconds=self.window_size)
            while self.requests and self.requests[0] < cutoff:
                self.requests.popleft()

            # Check if we're at the limit
            if len(self.requests) >= self.requests_per_minute:
                # Calculate wait time
                oldest_request = self.requests[0]
                wait_until = oldest_request + timedelta(seconds=self.window_size)
                wait_seconds = (wait_until - now).total_seconds()

                if wait_seconds > 0:
                    time.sleep(wait_seconds)
                    # Clean up after waiting
                    self.requests.popleft()

            # Record this request
            self.requests.append(now)
```

### 4.3 Authentication Manager (`utils/auth_manager.py`)

```python
"""
Centralized authentication management for all APIs
"""

import os
import json
from typing import Dict, Optional
from pathlib import Path
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow


class AuthManager:
    """
    Manages API keys and OAuth tokens
    """

    def __init__(self, env_file: str = '.env'):
        self.env_file = env_file
        self.tokens_dir = Path.home() / '.bbb_web_intelligence' / 'tokens'
        self.tokens_dir.mkdir(parents=True, exist_ok=True)

        # Load from environment
        self._load_env()

    def _load_env(self):
        """Load environment variables"""
        if os.path.exists(self.env_file):
            with open(self.env_file) as f:
                for line in f:
                    if '=' in line and not line.startswith('#'):
                        key, value = line.strip().split('=', 1)
                        os.environ[key] = value

    def get_api_key(self, service: str) -> Optional[str]:
        """Get API key for service"""
        key_name = f"{service.upper()}_API_KEY"
        return os.getenv(key_name)

    def get_google_oauth_creds(self, scopes: list, token_file: str = 'google_token.json') -> Credentials:
        """
        Get or refresh Google OAuth credentials

        Args:
            scopes: List of required OAuth scopes
            token_file: Name of token file

        Returns:
            Google OAuth credentials
        """
        token_path = self.tokens_dir / token_file
        creds = None

        # Load existing token
        if token_path.exists():
            creds = Credentials.from_authorized_user_file(str(token_path), scopes)

        # Refresh or create new token
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                credentials_file = os.getenv('GOOGLE_OAUTH_CREDENTIALS')
                if not credentials_file:
                    raise ValueError("GOOGLE_OAUTH_CREDENTIALS not set in environment")

                flow = InstalledAppFlow.from_client_secrets_file(credentials_file, scopes)
                creds = flow.run_local_server(port=0)

            # Save token
            with open(token_path, 'w') as f:
                f.write(creds.to_json())

        return creds
```

### 4.4 Error Handler (`utils/error_handler.py`)

```python
"""
Custom exceptions and error handling
"""

class BBBAPIError(Exception):
    """Base exception for all API errors"""
    pass


class APIError(BBBAPIError):
    """General API error"""
    def __init__(self, message: str, status_code: int = None, response: str = None):
        self.status_code = status_code
        self.response = response
        super().__init__(message)


class RateLimitError(BBBAPIError):
    """Rate limit exceeded"""
    pass


class AuthenticationError(BBBAPIError):
    """Authentication failed"""
    pass


class ValidationError(BBBAPIError):
    """Invalid data or parameters"""
    pass


def handle_api_error(func):
    """Decorator for consistent error handling"""
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except APIError as e:
            # Log and re-raise API errors
            logger = get_logger('error_handler')
            logger.error(f"API Error in {func.__name__}: {e}")
            raise
        except Exception as e:
            # Wrap unexpected errors
            logger = get_logger('error_handler')
            logger.exception(f"Unexpected error in {func.__name__}: {e}")
            raise BBBAPIError(f"Unexpected error: {e}") from e

    return wrapper
```

### 4.5 Logger (`utils/logger.py`)

```python
"""
Centralized logging configuration
"""

import logging
import sys
from pathlib import Path
from logging.handlers import RotatingFileHandler


def get_logger(name: str, level: int = logging.INFO) -> logging.Logger:
    """
    Get configured logger

    Args:
        name: Logger name
        level: Logging level

    Returns:
        Configured logger
    """
    logger = logging.getLogger(name)

    if logger.handlers:
        return logger

    logger.setLevel(level)

    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(level)
    console_formatter = logging.Formatter(
        '%(asctime)s | %(name)s | %(levelname)s | %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    console_handler.setFormatter(console_formatter)
    logger.addHandler(console_handler)

    # File handler
    log_dir = Path('logs')
    log_dir.mkdir(exist_ok=True)
    file_handler = RotatingFileHandler(
        log_dir / f'{name}.log',
        maxBytes=10*1024*1024,  # 10MB
        backupCount=5
    )
    file_handler.setLevel(level)
    file_formatter = logging.Formatter(
        '%(asctime)s | %(name)s | %(levelname)s | %(funcName)s:%(lineno)d | %(message)s'
    )
    file_handler.setFormatter(file_formatter)
    logger.addHandler(file_handler)

    return logger
```

### 4.6 Cache (`utils/cache.py`)

```python
"""
Response caching to reduce API calls
"""

import time
from typing import Any, Optional
import pickle
from pathlib import Path


class APICache:
    """
    Simple file-based cache for API responses
    """

    def __init__(self, cache_dir: str = '.cache', ttl: int = 3600):
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(exist_ok=True)
        self.ttl = ttl

    def _cache_path(self, key: str) -> Path:
        """Get cache file path for key"""
        return self.cache_dir / f"{key}.cache"

    def get(self, key: str) -> Optional[Any]:
        """Get cached value"""
        cache_path = self._cache_path(key)

        if not cache_path.exists():
            return None

        # Check if expired
        age = time.time() - cache_path.stat().st_mtime
        if age > self.ttl:
            cache_path.unlink()
            return None

        # Load cached value
        with open(cache_path, 'rb') as f:
            return pickle.load(f)

    def set(self, key: str, value: Any):
        """Set cached value"""
        cache_path = self._cache_path(key)
        with open(cache_path, 'wb') as f:
            pickle.dump(value, f)

    def clear(self):
        """Clear all cached values"""
        for cache_file in self.cache_dir.glob('*.cache'):
            cache_file.unlink()
```

---

## 5. Specific API Client Implementations

### 5.1 Google Search Console Client

```python
"""
Google Search Console API client for Web-Beacon agent
"""

from googleapiclient.discovery import build
from ..utils.api_client import BaseAPIClient
from ..utils.auth_manager import AuthManager


class SearchConsoleClient:
    """Google Search Console API client"""

    SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

    def __init__(self):
        self.auth_manager = AuthManager()
        creds = self.auth_manager.get_google_oauth_creds(self.SCOPES)
        self.service = build('searchconsole', 'v1', credentials=creds)
        self.site_url = 'https://businessesbeyondborders.com'

    def get_search_analytics(
        self,
        start_date: str,
        end_date: str,
        dimensions: list = ['query'],
        row_limit: int = 1000
    ) -> dict:
        """
        Get search analytics data

        Args:
            start_date: Start date (YYYY-MM-DD)
            end_date: End date (YYYY-MM-DD)
            dimensions: Dimensions to group by (query, page, country, device)
            row_limit: Maximum number of rows

        Returns:
            Search analytics data
        """
        request = {
            'startDate': start_date,
            'endDate': end_date,
            'dimensions': dimensions,
            'rowLimit': row_limit
        }

        response = self.service.searchanalytics().query(
            siteUrl=self.site_url,
            body=request
        ).execute()

        return response

    def get_top_queries(self, days: int = 30, limit: int = 50) -> list:
        """Get top performing queries"""
        from datetime import datetime, timedelta

        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)

        data = self.get_search_analytics(
            start_date=start_date.strftime('%Y-%m-%d'),
            end_date=end_date.strftime('%Y-%m-%d'),
            dimensions=['query'],
            row_limit=limit
        )

        rows = data.get('rows', [])
        return [{
            'query': row['keys'][0],
            'clicks': row['clicks'],
            'impressions': row['impressions'],
            'ctr': row['ctr'],
            'position': row['position']
        } for row in rows]

    def get_page_performance(self, page_url: str, days: int = 30) -> dict:
        """Get performance data for specific page"""
        from datetime import datetime, timedelta

        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)

        request = {
            'startDate': start_date.strftime('%Y-%m-%d'),
            'endDate': end_date.strftime('%Y-%m-%d'),
            'dimensions': ['query'],
            'dimensionFilterGroups': [{
                'filters': [{
                    'dimension': 'page',
                    'expression': page_url
                }]
            }]
        }

        response = self.service.searchanalytics().query(
            siteUrl=self.site_url,
            body=request
        ).execute()

        return response
```

### 5.2 OpenAI Client

```python
"""
OpenAI API client for content generation
"""

import openai
from ..utils.api_client import BaseAPIClient
from ..utils.auth_manager import AuthManager
from ..utils.error_handler import handle_api_error


class OpenAIClient:
    """OpenAI API client"""

    def __init__(self):
        self.auth_manager = AuthManager()
        openai.api_key = self.auth_manager.get_api_key('OPENAI')

    @handle_api_error
    def generate_content(
        self,
        prompt: str,
        model: str = 'gpt-4',
        max_tokens: int = 2000,
        temperature: float = 0.7
    ) -> str:
        """
        Generate content using GPT

        Args:
            prompt: Generation prompt
            model: Model to use (gpt-4, gpt-3.5-turbo)
            max_tokens: Maximum tokens to generate
            temperature: Creativity level (0-1)

        Returns:
            Generated content
        """
        response = openai.ChatCompletion.create(
            model=model,
            messages=[{'role': 'user', 'content': prompt}],
            max_tokens=max_tokens,
            temperature=temperature
        )

        return response.choices[0].message.content

    @handle_api_error
    def generate_blog_post(
        self,
        topic: str,
        keywords: list,
        audience: str = 'entrepreneurs in Central Asia',
        length: str = 'medium'
    ) -> dict:
        """Generate complete blog post"""

        word_count = {
            'short': '800-1200',
            'medium': '1500-2000',
            'long': '2500-3000'
        }[length]

        prompt = f"""
        Write a comprehensive, SEO-optimized blog post about: {topic}

        Requirements:
        - Target audience: {audience}
        - Primary keywords: {', '.join(keywords)}
        - Word count: {word_count} words
        - Include: compelling introduction, actionable tips, practical examples
        - Format: Use markdown with H2/H3 headings, bullet points, numbered lists
        - Tone: Professional yet approachable, inspiring and informative
        - Bold text: Use sparingly (< 1% of content) only for true emphasis

        Structure:
        1. Engaging introduction with hook
        2. 3-4 main sections with H2 headings
        3. Practical tips and action steps
        4. Real-world examples
        5. Conclusion with key takeaways

        Include a meta description (150-160 characters) at the end.
        """

        content = self.generate_content(prompt, max_tokens=3000)

        # Extract meta description
        meta_start = content.rfind('Meta Description:')
        if meta_start != -1:
            meta_desc = content[meta_start:].split('\n')[0].replace('Meta Description:', '').strip()
            content = content[:meta_start].strip()
        else:
            meta_desc = content[:160]

        return {
            'title': topic,
            'content': content,
            'meta_description': meta_desc,
            'keywords': keywords
        }

    @handle_api_error
    def generate_image_prompt(self, blog_topic: str, style: str = 'professional photography') -> str:
        """Generate DALL-E image prompt from blog topic"""
        prompt = f"""
        Create a detailed image generation prompt for a blog post about: {blog_topic}

        The prompt should describe:
        - Main subject and scene
        - Visual style: {style}
        - Mood and atmosphere
        - Composition details
        - Central Asian cultural elements (subtle)
        - Color palette (warm, professional tones)

        Keep the prompt under 200 characters, specific and visual.
        """

        return self.generate_content(prompt, max_tokens=150, temperature=0.8)
```

### 5.3 Netlify API Client

```python
"""
Netlify API client for deployment and monitoring
"""

from ..utils.api_client import BaseAPIClient
from ..utils.auth_manager import AuthManager


class NetlifyClient(BaseAPIClient):
    """Netlify API client"""

    def __init__(self):
        auth_manager = AuthManager()
        api_key = auth_manager.get_api_key('NETLIFY')

        super().__init__(
            api_name='netlify',
            base_url='https://api.netlify.com/api/v1',
            api_key=api_key,
            rate_limit=100  # 100 requests per minute
        )

        self.site_id = os.getenv('NETLIFY_SITE_ID')

    def _set_auth_header(self):
        """Override to use Netlify auth header format"""
        self.session.headers['Authorization'] = f'Bearer {self.api_key}'

    def get_site(self) -> dict:
        """Get site information"""
        return self.get(f'/sites/{self.site_id}')

    def get_deploys(self, limit: int = 10) -> list:
        """Get recent deploys"""
        response = self.get(f'/sites/{self.site_id}/deploys', params={'per_page': limit})
        return response

    def get_latest_deploy(self) -> dict:
        """Get latest deploy status"""
        deploys = self.get_deploys(limit=1)
        return deploys[0] if deploys else {}

    def trigger_deploy(self) -> dict:
        """Trigger new deploy"""
        build_hook = os.getenv('NETLIFY_BUILD_HOOK_URL')
        if not build_hook:
            raise ValueError("NETLIFY_BUILD_HOOK_URL not configured")

        import requests
        response = requests.post(build_hook)
        return {'status': 'triggered', 'response': response.status_code}

    def get_build_logs(self, deploy_id: str) -> str:
        """Get build logs for deploy"""
        response = self.get(f'/deploys/{deploy_id}/log')
        return response.get('log', '')
```

---

## 6. Environment Configuration Template

### 6.1 `.env.template`

```bash
# BBB Web Intelligence System - API Configuration
# Copy this file to .env and fill in your actual credentials

# ============================================================================
# CRITICAL - OpenAI (Content Generation)
# ============================================================================
OPENAI_API_KEY=sk-...your-key-here

# ============================================================================
# CRITICAL - Google Cloud APIs
# ============================================================================
# Get these from: https://console.cloud.google.com/apis/credentials
GOOGLE_OAUTH_CREDENTIALS=/path/to/gcp-oauth.keys.json
GOOGLE_CLOUD_PROJECT_ID=your-project-id

# ============================================================================
# HIGH PRIORITY - Netlify (Deployment)
# ============================================================================
NETLIFY_API_KEY=your-netlify-api-key
NETLIFY_SITE_ID=your-site-id
NETLIFY_BUILD_HOOK_URL=https://api.netlify.com/build_hooks/your-hook-id

# ============================================================================
# HIGH PRIORITY - Image Generation
# ============================================================================
NANO_BANANA_API_ENDPOINT=https://api.nanobanana.com/v1/generate
NANO_BANANA_API_KEY=your_nano_banana_api_key_here
NANO_BANANA_DEFAULT_STYLE=modern
NANO_BANANA_DEFAULT_QUALITY=high
NANO_BANANA_TIMEOUT=30000

# ============================================================================
# MEDIUM PRIORITY - SEO & Analytics
# ============================================================================
# Google Trends (no key needed - uses scraping)
GOOGLE_TRENDS_ENABLED=true

# Google PageSpeed Insights
PAGESPEED_API_KEY=your-pagespeed-api-key

# ============================================================================
# MEDIUM PRIORITY - Translation Services
# ============================================================================
# Google Translate API (included in Google Cloud)
GOOGLE_TRANSLATE_ENABLED=true

# DeepL (optional - higher quality)
DEEPL_API_KEY=your-deepl-api-key

# ============================================================================
# MEDIUM PRIORITY - Communication Services
# ============================================================================
# Twilio (SMS notifications)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid (Email notifications)
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@businessesbeyondborders.com

# ============================================================================
# LOW PRIORITY - Advanced SEO Tools (Optional)
# ============================================================================
# Ahrefs API
AHREFS_API_KEY=your-ahrefs-api-key

# SEMrush API
SEMRUSH_API_KEY=your-semrush-api-key

# ============================================================================
# LOW PRIORITY - Monitoring Services (Optional)
# ============================================================================
# UptimeRobot
UPTIMEROBOT_API_KEY=your-uptimerobot-api-key

# ============================================================================
# SYSTEM CONFIGURATION
# ============================================================================
# Environment
ENVIRONMENT=production  # development, staging, production

# Logging
LOG_LEVEL=INFO  # DEBUG, INFO, WARNING, ERROR, CRITICAL

# Timezone
TIMEZONE=America/New_York

# Website
WEBSITE_URL=https://businessesbeyondborders.com
WEBSITE_PATH=/Users/jackenholland/Businesses Beyond Borders/empower-central-asia

# Rate Limiting
API_RATE_LIMIT_RPM=60  # Requests per minute (global default)

# Caching
API_CACHE_TTL=3600  # Cache time-to-live in seconds

# ============================================================================
# AGENT-SPECIFIC SETTINGS
# ============================================================================
# Web-Scout
SCOUT_MAX_DAILY_TOPICS=10
SCOUT_RESEARCH_DEPTH=comprehensive  # quick, standard, comprehensive

# Web-Scribe
SCRIBE_DEFAULT_LENGTH=medium  # short, medium, long
SCRIBE_DAILY_POST_LIMIT=3

# Web-Beacon
BEACON_CHECK_FREQUENCY=daily  # hourly, daily, weekly
BEACON_ALERT_THRESHOLD=90  # Performance score threshold

# Web-Architect
ARCHITECT_AUTO_FIX=true  # Auto-fix schema errors

# Web-Custodian
CUSTODIAN_UPTIME_CHECK_INTERVAL=300  # seconds
CUSTODIAN_ALERT_EMAIL=admin@businessesbeyondborders.com

# ============================================================================
# SCHEDULE CONFIGURATION
# ============================================================================
# Morpheus Weekly Cycle
WEEKLY_CYCLE_TIME=02:00  # Time to run (HH:MM)
WEEKLY_CYCLE_DAY=sunday  # Day of week

# Emergency Checks
EMERGENCY_CHECK_ENABLED=true
EMERGENCY_CHECK_INTERVAL=3600  # seconds (1 hour)
```

---

## 7. Setup Instructions

### 7.1 Google Cloud Console Setup

**Required APIs to Enable:**
1. Google Search Console API
2. Google Analytics Data API (GA4)
3. PageSpeed Insights API
4. Google Trends API (no explicit API needed)
5. Google Translate API
6. Google Rich Results Test API

**Steps:**
```bash
# 1. Go to Google Cloud Console
https://console.cloud.google.com/

# 2. Create new project (if needed)
Project Name: BBB Web Intelligence
Project ID: bbb-web-intelligence

# 3. Enable APIs
Navigation → APIs & Services → Library
- Search for and enable each API above

# 4. Create OAuth 2.0 Credentials
APIs & Services → Credentials → Create Credentials → OAuth Client ID
- Application type: Desktop app
- Name: BBB Web Intelligence OAuth
- Download JSON file → Save as gcp-oauth.keys.json

# 5. Create API Key (for PageSpeed Insights)
Create Credentials → API Key
- Name: BBB PageSpeed API Key
- Restrict to: PageSpeed Insights API

# 6. Set up consent screen (for OAuth)
OAuth Consent Screen → External
- App name: BBB Web Intelligence
- User support email: your-email
- Scopes: Add required scopes (Search Console, Analytics, etc.)
```

### 7.2 OpenAI API Setup

```bash
# 1. Go to OpenAI Platform
https://platform.openai.com/

# 2. Navigate to API Keys
Account → API Keys

# 3. Create New Secret Key
- Name: BBB Web Intelligence
- Copy key immediately (won't be shown again)

# 4. Set up billing
Account → Billing → Add payment method

# 5. Set usage limits (recommended)
Account → Limits
- Set monthly limit: $100 (adjust as needed)
- Enable email notifications
```

### 7.3 Netlify API Setup

```bash
# 1. Go to Netlify
https://app.netlify.com/

# 2. Get Personal Access Token
User Settings → Applications → Personal Access Tokens
- New Access Token
- Description: BBB Web Intelligence
- Copy token

# 3. Get Site ID
Sites → Select your site → Site settings → General
- Copy Site ID (or use site name)

# 4. Create Build Hook
Site Settings → Build & Deploy → Build Hooks
- Add build hook
- Name: Morpheus Automation
- Branch: main
- Copy webhook URL
```

### 7.4 Installation Steps

```bash
# 1. Navigate to project directory
cd "/Users/jackenholland/Businesses Beyond Borders/empower-central-asia"

# 2. Create automation directory structure
mkdir -p automation/{agents,utils,config,workflows,reports}

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.template .env
# Edit .env and fill in your API keys

# 5. Set up Google OAuth
# Place gcp-oauth.keys.json in ~/.config/google-mcp/

# 6. Run initial setup
python automation/setup.py

# 7. Test API connections
python automation/test_apis.py

# 8. Start Morpheus
python automation/morpheus.py
```

---

## 8. Requirements.txt

```txt
# Core dependencies
requests==2.31.0
python-dotenv==1.0.0
pyyaml==6.0.1

# Google APIs
google-auth==2.23.4
google-auth-oauthlib==1.1.0
google-auth-httplib2==0.1.1
google-api-python-client==2.108.0
google-cloud-translate==3.12.1

# OpenAI
openai==1.3.5

# Utilities
python-dateutil==2.8.2
pytz==2023.3
schedule==1.2.0

# Web scraping (for competitor analysis)
beautifulsoup4==4.12.2
selenium==4.15.2

# Data processing
pandas==2.1.3
numpy==1.26.2

# Logging and monitoring
loguru==0.7.2

# Testing
pytest==7.4.3
pytest-cov==4.1.0
```

---

## 9. Next Steps & Action Items

### Immediate Actions (This Week)

1. **Review and Approve Plan** ✅ (You're here!)
   - Review this document
   - Confirm API priorities
   - Approve budget for paid APIs

2. **Set Up Google Cloud Console**
   - Create project
   - Enable APIs
   - Set up OAuth credentials
   - Generate API keys

3. **Create Python Project Structure**
   - Create `automation/` directory
   - Set up virtual environment
   - Install dependencies
   - Create base utilities

4. **Implement Base API Client**
   - Create `utils/api_client.py`
   - Implement rate limiting
   - Add error handling
   - Set up logging

5. **Test MCP Integrations**
   - Verify existing MCP servers work
   - Document MCP usage patterns
   - Create MCP wrapper utilities

### Week 2-3 Actions

1. **Implement Priority APIs**
   - Google Search Console client
   - OpenAI client
   - Netlify client
   - GA4 client

2. **Create First Agent (Web-Beacon)**
   - SEO monitoring
   - Performance tracking
   - Alert system

3. **Set Up Automation Schedule**
   - Configure cron jobs
   - Test weekly cycle
   - Set up logging/reporting

### Week 4+ Actions

1. **Implement Remaining Agents**
   - Scout (research)
   - Scribe (writing) - migrate TypeScript
   - Architect (schema)
   - Custodian (maintenance)
   - etc.

2. **Build Morpheus Orchestrator**
   - Agent coordination
   - Workflow management
   - Error recovery

3. **Testing & Optimization**
   - End-to-end testing
   - Performance optimization
   - Documentation

---

## 10. Budget Considerations

### API Costs (Monthly Estimates)

| Service | Tier | Est. Cost | Priority |
|---------|------|-----------|----------|
| **OpenAI API** | Pay-as-you-go | $50-100 | HIGH |
| **Google Cloud APIs** | Free tier adequate | $0-20 | HIGH |
| **Nano Banana** | TBD | TBD | HIGH |
| **Netlify** | Pro plan | $19 | HIGH |
| **Twilio SMS** | Pay-as-you-go | $10-30 | MEDIUM |
| **SendGrid** | Free/Essentials | $0-20 | MEDIUM |
| **DeepL** | Free tier | $0 | MEDIUM |
| **Ahrefs** | Lite plan | $99 | LOW (optional) |
| **SEMrush** | Pro plan | $119 | LOW (optional) |
| **UptimeRobot** | Free tier | $0 | MEDIUM |
| | | | |
| **Total (Essential)** | | **$79-159** | |
| **Total (With Optional)** | | **$297-377** | |

**Recommendation:** Start with essential APIs only ($79-159/month) and add optional services as needed.

---

## 11. Risk Mitigation

### Potential Issues & Solutions

1. **API Rate Limits**
   - **Risk:** Exceeding free tier quotas
   - **Mitigation:** Implement rate limiting, caching, and quota monitoring

2. **API Key Security**
   - **Risk:** Exposed credentials in code/Git
   - **Mitigation:** Use environment variables, .gitignore .env files, rotate keys regularly

3. **Service Downtime**
   - **Risk:** Third-party API unavailability
   - **Mitigation:** Implement fallbacks, retry logic, graceful degradation

4. **Cost Overruns**
   - **Risk:** Unexpected API usage spikes
   - **Mitigation:** Set billing alerts, implement usage caps, monitor daily

5. **Data Loss**
   - **Risk:** Failed deployments or data corruption
   - **Mitigation:** Git backups, staging environment, rollback procedures

---

## 12. Success Metrics

### Key Performance Indicators

1. **Automation Coverage**
   - Target: 80% of weekly tasks automated by Week 8

2. **API Reliability**
   - Target: 99.5% uptime for critical APIs
   - Target: <1% error rate on API calls

3. **Content Quality**
   - Target: 3-5 blog posts per week
   - Target: SEO score >85 for all content
   - Target: <0.5% bold text usage

4. **Performance**
   - Target: Page load time <2s
   - Target: Core Web Vitals in "Good" range

5. **Cost Efficiency**
   - Target: Stay within $150/month budget (essential tier)
   - Target: <$0.50 per generated blog post

---

## Conclusion

This plan provides a comprehensive roadmap for building a robust API infrastructure to support the Morpheus web intelligence system. By following the phased implementation approach and prioritizing essential APIs first, we can achieve full automation while managing costs and complexity.

**Recommended Next Step:** Begin with Phase 1 (Core Infrastructure) and set up the Google Cloud Console APIs this week. Once the foundation is in place, we can rapidly implement the agent-specific integrations.

---

**Document Prepared By:** Claude (Morpheus Assistant)
**For:** Jacken Holland / Businesses Beyond Borders
**Review Status:** Pending Approval
**Implementation Start Date:** TBD
