import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Printer, Map, Users, BarChart3, BookOpen, DollarSign, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig } from "@/lib/seo";
import { getResourceBySlug, resources } from "@/data/resources";
import type { ResourceSection } from "@/data/resources";
import ResourceGate from "@/components/resources/ResourceGate";

const iconMap: Record<string, React.ElementType> = {
  Map,
  Users,
  BarChart3,
  BookOpen,
  DollarSign,
  Calculator,
};

function SectionRenderer({ section }: { section: ResourceSection }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A] mb-4">{section.heading}</h2>
      {section.content.map((para, i) => (
        <p key={i} className="text-gray-700 mb-4 leading-relaxed">{para}</p>
      ))}
      {section.items && (
        <ul className="space-y-3 mb-4">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-700">
              <span className="text-[#C9922A] font-bold mt-0.5 flex-shrink-0">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#1B2A4A] text-white">
                {section.table.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 border-b border-gray-100 text-gray-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ResourceDetail() {
  const { slug } = useParams();
  const { isCentralAsia } = useRegion();

  const resource = getResourceBySlug(slug || "");

  if (!resource) {
    return (
      <div className="min-h-screen pt-28 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isCentralAsia ? "Ресурс не найден" : "Resource not found"}
        </h2>
        <Link to="/resources" className="text-[#C9922A] hover:text-[#C9922A]/80 flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> {isCentralAsia ? "Все ресурсы" : "Back to all resources"}
        </Link>
      </div>
    );
  }

  const IconComponent = iconMap[resource.icon] || BookOpen;
  const title = isCentralAsia ? resource.titleRu : resource.title;
  const description = isCentralAsia ? resource.descriptionRu : resource.description;
  const sections = isCentralAsia ? resource.sectionsRu : resource.sections;
  const canonicalUrl = `${siteConfig.url}/resources/${resource.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.description,
    url: canonicalUrl,
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: siteConfig.logo },
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${siteConfig.url}/resources` },
      { "@type": "ListItem", position: 3, name: resource.title, item: canonicalUrl },
    ],
  };

  // Other resources for cross-linking
  const otherResources = resources.filter((r) => r.slug !== resource.slug);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{`${resource.title} - Free Download | BBB`}</title>
        <meta name="description" content={resource.description} />
        <meta name="keywords" content={resource.keywords.join(", ")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${resource.title} - Free Download`} />
        <meta property="og:description" content={resource.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={siteConfig.defaultImage} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${resource.title} - Free Download`} />
        <meta name="twitter:description" content={resource.description} />
        <meta name="twitter:image" content={siteConfig.defaultImage} />

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/90 text-white pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link to="/resources" className="text-white/70 hover:text-white flex items-center gap-2 mb-6 text-sm">
            <ArrowLeft size={16} /> {isCentralAsia ? "Все ресурсы" : "All Resources"}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#C9922A]/20 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-7 h-7 text-[#C9922A]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#C9922A] font-medium">
                {isCentralAsia ? "Бесплатный ресурс" : "Free Resource"}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            </div>
          </div>
          <p className="text-white/80 text-lg">{description}</p>
        </div>
      </section>

      {/* Content - gated */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <ResourceGate resourceTitle={resource.title}>
            {/* Print button */}
            <div className="flex justify-end mb-6 print:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="text-gray-600"
              >
                <Printer className="w-4 h-4 mr-2" />
                {isCentralAsia ? "Печать / Сохранить PDF" : "Print / Save as PDF"}
              </Button>
            </div>

            {/* Printable content header */}
            <div className="hidden print:block mb-8">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-sm text-gray-500 mt-1">businessesbeyondborders.com/resources/{resource.slug}</p>
              <hr className="my-4" />
            </div>

            {/* Resource sections */}
            <div className="resource-content">
              {sections.map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
            </div>

            {/* Footer attribution */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-sm text-gray-500">
                {isCentralAsia
                  ? "Подготовлено Businesses Beyond Borders — 501(c)(3) некоммерческая организация, Порт Ориндж, Флорида."
                  : `Prepared by ${siteConfig.name} \u2014 a 501(c)(3) nonprofit headquartered in ${siteConfig.address.city}, ${siteConfig.address.state}. For more resources, visit businessesbeyondborders.com/resources.`}
              </p>
            </div>
          </ResourceGate>
        </div>
      </section>

      {/* Other resources */}
      <section className="bg-gray-50 py-12 px-4 print:hidden">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-6">
            {isCentralAsia ? "Другие бесплатные ресурсы" : "More Free Resources"}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherResources.map((r) => {
              const OtherIcon = iconMap[r.icon] || BookOpen;
              return (
                <Link
                  key={r.slug}
                  to={`/resources/${r.slug}`}
                  className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-[#C9922A]/50 hover:shadow-md transition-all"
                >
                  <OtherIcon className="w-5 h-5 text-[#C9922A] mb-2" />
                  <p className="text-sm font-bold text-[#1B2A4A]">
                    {isCentralAsia ? r.titleRu : r.title}
                  </p>
                  <p className="text-xs text-[#C9922A] mt-2 font-medium">
                    {isCentralAsia ? "Скачать →" : "Download →"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related courses CTA */}
      <section className="py-12 px-4 print:hidden">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">
            {isCentralAsia ? "Готовы к следующему шагу?" : "Ready for the Next Step?"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isCentralAsia
              ? "Пройдите наши бесплатные онлайн-курсы для более глубокого обучения."
              : "Take our free online courses for deeper, hands-on learning."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/course/financial-literacy"
              className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {isCentralAsia ? "Финансовая грамотность →" : "Financial Literacy Course →"}
            </Link>
            <Link
              to="/course/business-creation"
              className="border border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A]/5 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {isCentralAsia ? "Создание бизнеса →" : "Business Creation Course →"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
