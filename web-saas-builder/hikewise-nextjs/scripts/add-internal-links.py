#!/usr/bin/env python3
"""
Internal Linking Strategy Script for HikeWise Blog
Automatically adds contextual internal links between related posts
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Set

class InternalLinker:
    def __init__(self, blog_posts_path: str):
        with open(blog_posts_path, 'r') as f:
            self.data = json.load(f)
        self.posts = self.data['posts']

        # Topic clusters for strategic linking
        self.clusters = {
            'focus_productivity': [
                'how-to-focus-while-studying',
                'distraction-free-studying-techniques',
                'digital-minimalism-students',
                'pomodoro-technique-for-studying',
                'pomodoro-technique-explained',
                'deep-work-for-students'
            ],
            'ai_technology': [
                'ai-study-companions-benefits-risks',
                'ai-study-companions',
                'best-study-apps-for-students-2026'
            ],
            'study_methods': [
                'spaced-repetition-technique',
                'time-blocking-for-college-students',
                'how-to-create-study-schedule',
                'study-habits-successful-students',
                'atomic-habits'
            ],
            'social_studying': [
                'virtual-study-room-benefits',
                'study-room-benefits',
                'study-with-me-videos-benefits'
            ]
        }

        # Keyword to post mapping for contextual linking
        self.keyword_map = {
            'pomodoro technique': ['pomodoro-technique-for-studying', 'pomodoro-technique-explained'],
            'ai study companion': ['ai-study-companions-benefits-risks', 'ai-study-companions'],
            'nora': ['ai-study-companions-benefits-risks', 'ai-study-companions'],
            'focus': ['how-to-focus-while-studying', 'distraction-free-studying-techniques'],
            'study app': ['best-study-apps-for-students-2026'],
            'virtual study room': ['virtual-study-room-benefits', 'study-room-benefits'],
            'spaced repetition': ['spaced-repetition-technique'],
            'time blocking': ['time-blocking-for-college-students'],
            'deep work': ['deep-work-for-students'],
            'digital minimalism': ['digital-minimalism-students'],
            'study habits': ['study-habits-successful-students', 'atomic-habits'],
            'study schedule': ['how-to-create-study-schedule', 'time-blocking-for-college-students'],
            'distractions': ['distraction-free-studying-techniques', 'digital-minimalism-students'],
        }

    def get_related_posts(self, current_slug: str, cluster_name: str = None) -> List[str]:
        """Get related posts from the same cluster"""
        if cluster_name:
            cluster = self.clusters.get(cluster_name, [])
            return [slug for slug in cluster if slug != current_slug]

        # Find cluster for current post
        for cluster_posts in self.clusters.values():
            if current_slug in cluster_posts:
                return [slug for slug in cluster_posts if slug != current_slug]

        return []

    def find_linking_opportunities(self, content: str, current_slug: str) -> List[Dict]:
        """Find opportunities to add internal links"""
        opportunities = []

        for keyword, target_slugs in self.keyword_map.items():
            # Skip self-linking
            target_slugs = [s for s in target_slugs if s != current_slug]
            if not target_slugs:
                continue

            # Find keyword occurrences (not already linked)
            pattern = rf'\b{re.escape(keyword)}\b(?![^<]*</a>)'
            matches = list(re.finditer(pattern, content, re.IGNORECASE))

            if matches:
                # Link first occurrence only to avoid over-linking
                match = matches[0]
                target_slug = target_slugs[0]
                target_post = next((p for p in self.posts if p['slug'] == target_slug), None)

                if target_post:
                    opportunities.append({
                        'keyword': keyword,
                        'position': match.start(),
                        'target_slug': target_slug,
                        'target_title': target_post['title'],
                        'link': f'/blog/{target_slug}'
                    })

        return opportunities

    def generate_internal_link_suggestions(self):
        """Generate internal linking suggestions for all posts"""
        print("\n" + "="*80)
        print("INTERNAL LINKING STRATEGY")
        print("="*80)

        suggestions = {}

        for post in self.posts:
            slug = post['slug']
            content = post.get('content', '')
            title = post['title']

            opportunities = self.find_linking_opportunities(content, slug)

            if opportunities:
                suggestions[slug] = {
                    'post_title': title,
                    'current_links': len(re.findall(r'href="/blog/', content)),
                    'opportunities': opportunities
                }

        # Print summary
        print(f"\nAnalyzed {len(self.posts)} posts")
        print(f"Found linking opportunities in {len(suggestions)} posts\n")

        for slug, data in suggestions.items():
            print(f"\n📝 {data['post_title']}")
            print(f"   Current internal links: {data['current_links']}")
            print(f"   Suggested additions: {len(data['opportunities'])}")

            for opp in data['opportunities'][:5]:  # Show first 5
                print(f"   → Link '{opp['keyword']}' to: {opp['target_title']}")

        # Save to file
        output_file = Path(__file__).parent.parent / 'internal-linking-strategy.json'
        with open(output_file, 'w') as f:
            json.dump(suggestions, f, indent=2)

        print(f"\n✓ Full strategy saved to: {output_file}")

        return suggestions

    def generate_topic_cluster_map(self):
        """Generate visual topic cluster map"""
        print("\n" + "="*80)
        print("TOPIC CLUSTER MAP")
        print("="*80)

        for cluster_name, post_slugs in self.clusters.items():
            print(f"\n📚 {cluster_name.replace('_', ' ').title()}")

            # Find posts
            cluster_posts = [p for p in self.posts if p['slug'] in post_slugs]

            for post in cluster_posts:
                internal_links = len(re.findall(r'href="/blog/', post.get('content', '')))
                status = "✓" if internal_links >= 3 else "⚠"
                print(f"  {status} {post['title']} ({internal_links} links)")

    def generate_recommended_links_per_post(self):
        """Generate specific linking recommendations"""
        print("\n" + "="*80)
        print("RECOMMENDED INTERNAL LINKS BY POST")
        print("="*80)

        recommendations = {}

        for post in self.posts:
            slug = post['slug']
            title = post['title']

            # Get posts from same cluster
            related = []
            for cluster_name, cluster_posts in self.clusters.items():
                if slug in cluster_posts:
                    related = [p for p in self.posts if p['slug'] in cluster_posts and p['slug'] != slug]
                    break

            if related:
                print(f"\n📄 {title}")
                print(f"   Recommended internal links:")

                for i, related_post in enumerate(related[:5], 1):
                    print(f"   {i}. {related_post['title']}")
                    print(f"      URL: /blog/{related_post['slug']}")

                recommendations[slug] = {
                    'post_title': title,
                    'recommended_links': [
                        {
                            'title': rp['title'],
                            'slug': rp['slug'],
                            'url': f'/blog/{rp["slug"]}'
                        } for rp in related[:5]
                    ]
                }

        # Save recommendations
        output_file = Path(__file__).parent.parent / 'linking-recommendations.json'
        with open(output_file, 'w') as f:
            json.dump(recommendations, f, indent=2)

        print(f"\n✓ Recommendations saved to: {output_file}")

        return recommendations


if __name__ == "__main__":
    blog_posts_path = Path(__file__).parent.parent / 'data' / 'blog-posts.json'

    if not blog_posts_path.exists():
        print(f"❌ Error: Blog posts file not found at {blog_posts_path}")
        exit(1)

    linker = InternalLinker(str(blog_posts_path))

    print("\n🔗 Analyzing Internal Linking Strategy for HikeWise Blog...")

    linker.generate_topic_cluster_map()
    linker.generate_internal_link_suggestions()
    linker.generate_recommended_links_per_post()

    print("\n" + "="*80)
    print("✓ Internal Linking Analysis Complete!")
    print("="*80)
