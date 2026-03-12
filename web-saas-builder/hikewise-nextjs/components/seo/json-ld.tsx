// JSON-LD Schema components for SEO
// Note: dangerouslySetInnerHTML is safe here because we're using JSON.stringify
// which escapes all special characters and only outputs valid JSON

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}

export function OrganizationSchema({
  name,
  url,
  logo,
  sameAs,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema({ name, url }: { name: string; url: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HikeWise",
    applicationCategory: "EducationalApplication",
    operatingSystem: ["iOS", "Android"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Transform your study habits with intelligent focus sessions, friendly competition, and an AI companion that keeps you on track.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "HikeWise",
      logo: {
        "@type": "ImageObject",
        url: "https://hikewise.app/images/app-icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  questions: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  image?: string;
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  image,
}: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    image: image || "https://hikewise.app/images/og-image.png",
    totalTime: totalTime || "PT30M",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
      image: step.image,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface VideoObjectSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
}

export function VideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
}: VideoObjectSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration: duration || "PT1M",
    contentUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostingSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
  keywords?: string[];
  wordCount?: number;
  articleSection?: string;
}

export function BlogPostingSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
  keywords,
  wordCount,
  articleSection,
}: BlogPostingSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: author,
      url: "https://hikewise.app/blog",
    },
    publisher: {
      "@type": "Organization",
      name: "HikeWise",
      url: "https://hikewise.app",
      logo: {
        "@type": "ImageObject",
        url: "https://hikewise.app/images/app-icon.png",
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": "https://hikewise.app/blog",
      name: "HikeWise Blog",
      publisher: {
        "@type": "Organization",
        name: "HikeWise",
        url: "https://hikewise.app",
      },
    },
    keywords: keywords?.join(", "),
    wordCount,
  };

  if (articleSection) {
    schema.articleSection = articleSection;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogListSchemaProps {
  posts: Array<{
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
  }>;
  totalCount: number;
}

export function BlogListSchema({ posts, totalCount }: BlogListSchemaProps) {
  const baseUrl = "https://hikewise.app";
  const mostRecentDate = posts[0]?.date ?? new Date().toISOString().split("T")[0];

  // Blog entity — tells Google this page is the canonical blog with a known publisher
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog`,
    name: "HikeWise Blog",
    description:
      "Science-backed study strategies, productivity tips, and insights to help students study smarter and achieve their academic goals.",
    url: `${baseUrl}/blog`,
    inLanguage: "en-US",
    dateModified: mostRecentDate,
    publisher: {
      "@type": "Organization",
      name: "HikeWise",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/app-icon.png`,
        width: 512,
        height: 512,
      },
    },
  };

  // ItemList — signals the full set of articles on this page to Google
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HikeWise Blog Articles",
    description: `${totalCount} science-backed study guides and productivity articles for students`,
    url: `${baseUrl}/blog`,
    numberOfItems: totalCount,
    itemListElement: posts.slice(0, 20).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${baseUrl}/blog/${post.slug}`,
      name: post.title,
      description: post.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
