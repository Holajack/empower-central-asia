/**
 * SEO Utilities for Businesses Beyond Borders
 * Provides schema.org markup generators and SEO helpers
 */

// Site configuration
export const siteConfig = {
  name: "Businesses Beyond Borders",
  url: "https://businessesbeyondborders.com",
  description: "International nonprofit empowering entrepreneurs in Central Asia through proven business training, financial literacy, and leadership development programs",
  email: "donations@businessesbeyondborders.com",
  phone: "+1-386-517-1527",
  address: {
    street: "",
    city: "Port Orange",
    state: "FL",
    zip: "32127",
    country: "US"
  },
  social: {
    facebook: "https://www.facebook.com/Businesses.BB",
    linkedin: "https://www.linkedin.com/company/businesses-beyond-borders",
    instagram: "https://www.instagram.com/businessesbeyondborders"
  },
  foundingDate: "2022",
  logo: "https://businessesbeyondborders.com/logo.png",
  defaultImage: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2"
};

// Generate NonprofitOrganization schema
export function generateNonprofitSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["NonprofitOrganization", "Organization"],
    "name": siteConfig.name,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "logo": siteConfig.logo,
    "image": siteConfig.defaultImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": siteConfig.address.city,
      "addressRegion": siteConfig.address.state,
      "postalCode": siteConfig.address.zip,
      "addressCountry": siteConfig.address.country
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.phone,
      "contactType": "customer support",
      "areaServed": ["US-FL", "KZ", "KG", "TJ"],
      "availableLanguage": ["English", "Russian"]
    },
    "sameAs": Object.values(siteConfig.social),
    "foundingDate": siteConfig.foundingDate,
    "email": siteConfig.email,
    "areaServed": [
      { "@type": "Place", "name": "Volusia County, Florida" },
      { "@type": "Country", "name": "Kazakhstan" },
      { "@type": "Country", "name": "Kyrgyzstan" },
      { "@type": "Country", "name": "Tajikistan" }
    ],
    "knowsAbout": [
      "Financial Literacy Training",
      "Business Development Programs",
      "Entrepreneurship Education",
      "Leadership Development",
      "Community Collaboration",
      "International Development",
      "Microfinance Programs"
    ]
  };
}

// Generate BlogPosting schema for blog posts
export interface BlogPostSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  url: string;
  tags?: string[];
  wordCount?: number;
}

export function generateBlogPostSchema(props: BlogPostSchemaProps) {
  const {
    title,
    description,
    datePublished,
    dateModified,
    author,
    image,
    url,
    tags = [],
    wordCount
  } = props;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image || siteConfig.defaultImage,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author,
      "url": siteConfig.url + "/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": siteConfig.logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": tags.join(", "),
    ...(wordCount && { "wordCount": wordCount }),
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };
}

// Generate BreadcrumbList schema
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Generate Event schema
export interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    name: string;
    address?: string;
  };
  isOnline?: boolean;
  url: string;
  image?: string;
  organizer?: string;
}

export function generateEventSchema(props: EventSchemaProps) {
  const {
    name,
    description,
    startDate,
    endDate,
    location,
    isOnline = false,
    url,
    image,
    organizer = siteConfig.name
  } = props;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    ...(endDate && { "endDate": endDate }),
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    "location": isOnline
      ? {
          "@type": "VirtualLocation",
          "url": url
        }
      : location
        ? {
            "@type": "Place",
            "name": location.name,
            ...(location.address && {
              "address": {
                "@type": "PostalAddress",
                "streetAddress": location.address
              }
            })
          }
        : undefined,
    "image": image || siteConfig.defaultImage,
    "organizer": {
      "@type": "Organization",
      "name": organizer,
      "url": siteConfig.url
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": url
    }
  };
}

// Generate Course schema for program pages
export interface CourseSchemaProps {
  name: string;
  description: string;
  provider?: string;
  url: string;
  image?: string;
}

export function generateCourseSchema(props: CourseSchemaProps) {
  const { name, description, provider = siteConfig.name, url, image } = props;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "sameAs": siteConfig.url
    },
    "url": url,
    "image": image || siteConfig.defaultImage,
    "isAccessibleForFree": true,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT10H"
    }
  };
}

// Generate DonateAction schema
export function generateDonateActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    "recipient": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": siteConfig.url + "/get-involved",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    }
  };
}

// Generate FAQ schema
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

// Generate WebSite schema with search
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": siteConfig.url + "/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// Helper to render schema as JSON-LD script content
export function schemaToJsonLd(schema: object): string {
  return JSON.stringify(schema);
}

// SEO Meta helpers
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: "website" | "article" | "blog";
}

export function generateMetaTags(meta: PageMeta) {
  const { title, description, keywords = [], image, url, type = "website" } = meta;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: keywords.join(", "),
    canonical: url,
    og: {
      title,
      description,
      type,
      url,
      image: image || siteConfig.defaultImage,
      siteName: siteConfig.name,
      locale: "en_US"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: image || siteConfig.defaultImage
    }
  };
}

// Local SEO keywords to include naturally
export const localSEOKeywords = [
  "nonprofit organizations international development",
  "volunteer opportunities remote",
  "charity organizations entrepreneurship",
  "community service Central Asia",
  "corporate volunteer programs global",
  "international nonprofit",
  "Central Asia development nonprofit",
  "remote volunteer mentoring"
];
