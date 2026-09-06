/**
 * SEO Components for Businesses Beyond Borders
 * Reusable components for adding structured data and meta tags
 */

import { Helmet } from "react-helmet";
import {
  siteConfig,
  generateBlogPostSchema,
  generateBreadcrumbSchema,
  generateCourseSchema,
  generateEventSchema,
  generateFAQSchema,
  generateDonateActionSchema,
  generateWebsiteSchema,
  type BlogPostSchemaProps,
  type BreadcrumbItem,
  type CourseSchemaProps,
  type EventSchemaProps,
  type FAQItem
} from "@/lib/seo";

// Props for the main SEO component
interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "blog";
  noIndex?: boolean;
  children?: React.ReactNode;
}

/**
 * Main SEO component for page-level meta tags
 */
export function SEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  noIndex = false,
  children
}: SEOProps) {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const pageUrl = url || siteConfig.url;
  const pageImage = image || siteConfig.defaultImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Robots */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={pageImage} />

      {/* Additional Meta */}
      <meta name="author" content={siteConfig.name} />
      <meta name="geo.region" content="US-FL" />
      <meta name="geo.placename" content="Port Orange, Florida" />

      {children}
    </Helmet>
  );
}

/**
 * Blog Post Schema Component
 */
export function BlogPostSEO(props: BlogPostSchemaProps & {
  title: string;
  description: string;
  keywords?: string[];
}) {
  const schema = generateBlogPostSchema(props);

  return (
    <SEO
      title={props.title}
      description={props.description}
      keywords={props.keywords}
      image={props.image}
      url={props.url}
      type="article"
    >
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </SEO>
  );
}

/**
 * Breadcrumb Schema Component
 */
export function Breadcrumbs({ items, tone = "light" }: { items: BreadcrumbItem[]; tone?: "light" | "dark" }) {
  const schema = generateBreadcrumbSchema(items);
  const dark = tone === "dark";

  return (
    <>
      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className={`flex items-center flex-wrap space-x-2 text-sm ${dark ? "text-white/70" : "text-gray-600"}`}>
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index === items.length - 1 ? (
                <span className={dark ? "text-white font-medium" : "text-gray-900 font-medium"}>{item.name}</span>
              ) : (
                <a
                  href={item.url}
                  className="hover:text-[#C9922A] transition-colors"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Schema Markup */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    </>
  );
}

/**
 * Course/Program Schema Component
 */
export function CourseSEO(props: CourseSchemaProps & {
  title: string;
  description: string;
  keywords?: string[];
}) {
  const schema = generateCourseSchema(props);

  return (
    <SEO
      title={props.title}
      description={props.description}
      keywords={props.keywords}
      image={props.image}
      url={props.url}
    >
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </SEO>
  );
}

/**
 * Event Schema Component
 */
export function EventSEO(props: EventSchemaProps & {
  title: string;
  keywords?: string[];
}) {
  const schema = generateEventSchema(props);

  return (
    <SEO
      title={props.title}
      description={props.description}
      keywords={props.keywords}
      image={props.image}
      url={props.url}
    >
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </SEO>
  );
}

/**
 * FAQ Schema Component
 */
export function FAQSection({ items, className = "" }: { items: FAQItem[]; className?: string }) {
  const schema = generateFAQSchema(items);

  return (
    <>
      {/* Visual FAQ */}
      <div className={`space-y-4 ${className}`}>
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.question}
            </h3>
            <p className="text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>

      {/* Schema Markup */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    </>
  );
}

/**
 * Donate Action Schema (add to donation pages)
 */
export function DonateActionSchema() {
  const schema = generateDonateActionSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * Website Schema (add to homepage)
 */
export function WebsiteSchema() {
  const schema = generateWebsiteSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export default SEO;
