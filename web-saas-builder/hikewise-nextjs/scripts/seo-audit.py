#!/usr/bin/env python3
"""
SEO Audit Script for HikeWise Blog
Analyzes blog posts for SEO best practices
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Any

class SEOAuditor:
    def __init__(self, blog_posts_path: str):
        with open(blog_posts_path, 'r') as f:
            self.data = json.load(f)
        self.posts = self.data['posts']
        self.issues = []
        self.recommendations = []

    def audit_metadata(self):
        """Audit titles and descriptions"""
        print("\n" + "="*80)
        print("SEO METADATA AUDIT")
        print("="*80)

        for post in self.posts:
            title_len = len(post['title'])
            desc_len = len(post['description'])

            # Title checks
            if title_len < 50:
                self.issues.append({
                    'post': post['slug'],
                    'type': 'title_too_short',
                    'current': title_len,
                    'message': f"Title too short ({title_len} chars). Optimal: 50-60 chars"
                })
            elif title_len > 60:
                self.issues.append({
                    'post': post['slug'],
                    'type': 'title_too_long',
                    'current': title_len,
                    'message': f"Title too long ({title_len} chars). Optimal: 50-60 chars"
                })

            # Description checks
            if desc_len < 150:
                self.issues.append({
                    'post': post['slug'],
                    'type': 'description_too_short',
                    'current': desc_len,
                    'message': f"Description too short ({desc_len} chars). Optimal: 150-160 chars"
                })
            elif desc_len > 160:
                self.issues.append({
                    'post': post['slug'],
                    'type': 'description_too_long',
                    'current': desc_len,
                    'message': f"Description too long ({desc_len} chars). Optimal: 150-160 chars"
                })

    def audit_keywords(self):
        """Audit keyword optimization"""
        print("\n" + "="*80)
        print("KEYWORD OPTIMIZATION AUDIT")
        print("="*80)

        for post in self.posts:
            content = post.get('content', '')
            title = post['title'].lower()
            description = post['description'].lower()

            # Remove HTML tags
            clean_content = re.sub(r'<[^>]+>', '', content).lower()

            # Get first paragraph
            first_para = clean_content.split('\n\n')[0] if '\n\n' in clean_content else clean_content[:300]

            # Extract potential keywords from title
            title_words = set(re.findall(r'\b\w{4,}\b', title))

            # Check if title keywords appear in first paragraph
            found_in_first_para = sum(1 for word in title_words if word in first_para)
            if found_in_first_para < len(title_words) * 0.5:
                self.issues.append({
                    'post': post['slug'],
                    'type': 'keyword_placement',
                    'message': 'Target keywords should appear in first paragraph'
                })

            # Check keyword density (should be 1-2%)
            total_words = len(clean_content.split())
            if total_words > 0:
                for keyword in title_words:
                    count = clean_content.count(keyword)
                    density = (count / total_words) * 100

                    if density > 3:
                        self.issues.append({
                            'post': post['slug'],
                            'type': 'keyword_stuffing',
                            'keyword': keyword,
                            'density': round(density, 2),
                            'message': f"Keyword '{keyword}' appears too often ({density:.1f}%). Keep density 1-2%"
                        })

    def audit_headings(self):
        """Audit heading structure"""
        print("\n" + "="*80)
        print("HEADING STRUCTURE AUDIT")
        print("="*80)

        for post in self.posts:
            content = post.get('content', '')

            # Count headings
            h1_count = len(re.findall(r'<h1[^>]*>', content))
            h2_count = len(re.findall(r'<h2[^>]*>', content))
            h3_count = len(re.findall(r'<h3[^>]*>', content))

            if h1_count > 1:
                self.issues.append({
                    'post': post['slug'],
                    'type': 'multiple_h1',
                    'count': h1_count,
                    'message': 'Multiple H1 tags found. Should only have one H1.'
                })

            if h2_count < 3:
                self.issues.append({
                    'post': post['slug'],
                    'type': 'insufficient_h2',
                    'count': h2_count,
                    'message': 'Should have at least 3-4 H2 headings for better structure'
                })

    def audit_internal_links(self):
        """Audit internal linking"""
        print("\n" + "="*80)
        print("INTERNAL LINKING AUDIT")
        print("="*80)

        for post in self.posts:
            content = post.get('content', '')

            # Count internal links to other blog posts
            internal_links = len(re.findall(r'href="/blog/', content))

            if internal_links < 3:
                self.issues.append({
                    'post': post['slug'],
                    'type': 'insufficient_internal_links',
                    'count': internal_links,
                    'message': f'Only {internal_links} internal links. Should have 3-5 for better SEO.'
                })

            # Check for "click here" anti-pattern
            click_here_count = len(re.findall(r'>click here<', content, re.IGNORECASE))
            if click_here_count > 0:
                self.issues.append({
                    'post': post['slug'],
                    'type': 'poor_anchor_text',
                    'message': 'Avoid "click here" anchor text. Use descriptive text instead.'
                })

    def audit_images(self):
        """Audit image optimization"""
        print("\n" + "="*80)
        print("IMAGE OPTIMIZATION AUDIT")
        print("="*80)

        for post in self.posts:
            content = post.get('content', '')

            # Find all img tags
            images = re.findall(r'<img[^>]+>', content)

            for img in images:
                # Check for alt text
                if 'alt=' not in img:
                    self.issues.append({
                        'post': post['slug'],
                        'type': 'missing_alt_text',
                        'message': 'Image missing alt text'
                    })
                elif 'alt=""' in img or "alt=''" in img:
                    self.issues.append({
                        'post': post['slug'],
                        'type': 'empty_alt_text',
                        'message': 'Image has empty alt text'
                    })

                # Check for width/height
                if 'width=' not in img or 'height=' not in img:
                    self.issues.append({
                        'post': post['slug'],
                        'type': 'missing_image_dimensions',
                        'message': 'Image missing width/height attributes (CLS issue)'
                    })

    def generate_recommendations(self):
        """Generate SEO recommendations"""
        self.recommendations = [
            "✓ Add internal links to related blog posts (3-5 per post)",
            "✓ Use descriptive anchor text (avoid 'click here')",
            "✓ Include target keywords in first paragraph",
            "✓ Add descriptive alt text to all images",
            "✓ Ensure proper heading hierarchy (H1 > H2 > H3)",
            "✓ Keep keyword density between 1-2%",
            "✓ Use schema markup (BlogPosting, BreadcrumbList)",
            "✓ Add FAQ schema where applicable",
            "✓ Implement HowTo schema for tutorial posts",
            "✓ Create topic clusters with pillar content",
            "✓ Add 'Read Time' to all posts",
            "✓ Include social share buttons",
            "✓ Add newsletter signup CTAs",
            "✓ Implement lazy loading for images",
            "✓ Optimize images (WebP format, compressed)",
        ]

    def print_summary(self):
        """Print audit summary"""
        print("\n" + "="*80)
        print("SEO AUDIT SUMMARY")
        print("="*80)

        # Group issues by type
        issues_by_type = {}
        for issue in self.issues:
            issue_type = issue['type']
            if issue_type not in issues_by_type:
                issues_by_type[issue_type] = []
            issues_by_type[issue_type].append(issue)

        print(f"\nTotal Issues Found: {len(self.issues)}")
        print(f"Total Posts Analyzed: {len(self.posts)}")
        print(f"\nIssues by Type:")

        for issue_type, issues in sorted(issues_by_type.items()):
            print(f"\n  {issue_type.replace('_', ' ').title()}: {len(issues)} occurrences")
            for issue in issues[:3]:  # Show first 3 examples
                print(f"    - {issue['post']}: {issue['message']}")
            if len(issues) > 3:
                print(f"    ... and {len(issues) - 3} more")

        print("\n" + "="*80)
        print("SEO RECOMMENDATIONS")
        print("="*80)

        for rec in self.recommendations:
            print(f"  {rec}")

        # Calculate SEO score
        max_possible_issues = len(self.posts) * 10  # Estimate
        score = max(0, 100 - (len(self.issues) / max_possible_issues * 100))

        print("\n" + "="*80)
        print(f"SEO SCORE: {score:.1f}/100")
        print("="*80)

        if score >= 90:
            print("✓ Excellent! Your content is well-optimized for SEO.")
        elif score >= 75:
            print("⚠ Good, but there's room for improvement.")
        elif score >= 60:
            print("⚠ Needs work. Address the issues above to improve rankings.")
        else:
            print("✗ Critical issues found. Immediate action required.")

    def run_full_audit(self):
        """Run complete SEO audit"""
        print("\n🔍 Running SEO Audit for HikeWise Blog...")

        self.audit_metadata()
        self.audit_keywords()
        self.audit_headings()
        self.audit_internal_links()
        self.audit_images()
        self.generate_recommendations()
        self.print_summary()

        # Save issues to file
        output_file = Path(__file__).parent.parent / 'seo-audit-report.json'
        with open(output_file, 'w') as f:
            json.dump({
                'issues': self.issues,
                'recommendations': self.recommendations,
                'total_posts': len(self.posts),
                'total_issues': len(self.issues)
            }, f, indent=2)

        print(f"\n✓ Detailed report saved to: {output_file}")


if __name__ == "__main__":
    blog_posts_path = Path(__file__).parent.parent / 'data' / 'blog-posts.json'

    if not blog_posts_path.exists():
        print(f"❌ Error: Blog posts file not found at {blog_posts_path}")
        exit(1)

    auditor = SEOAuditor(str(blog_posts_path))
    auditor.run_full_audit()
