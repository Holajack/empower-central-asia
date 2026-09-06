import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Map, Users, BarChart3, BookOpen, ArrowRight, Download, DollarSign, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig, absoluteUrl } from "@/lib/seo";
import { useResources } from "@/hooks/useResources";

const iconMap: Record<string, React.ElementType> = {
  Map,
  Users,
  BarChart3,
  BookOpen,
  DollarSign,
  Calculator,
};

export default function Resources() {
  const { isCentralAsia, language } = useRegion();
  const { resources } = useResources();

  const pageTitle = isCentralAsia
    ? `Бесплатные ресурсы | ${siteConfig.name}`
    : `Free Resources & Toolkits | ${siteConfig.name}`;
  const pageDesc = isCentralAsia
    ? "Скачайте бесплатные инструменты для развития сообщества, картирования ресурсов, управления волонтёрами и оценки воздействия."
    : "Download free toolkits for community development, asset mapping, volunteer management, and impact measurement. No cost, no catch.";
  const canonicalUrl = `${siteConfig.url}/resources`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isCentralAsia ? "Бесплатные ресурсы" : "Free Resources & Toolkits",
    description: pageDesc,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: resources.map((r) => ({
      "@type": "CreativeWork",
      name: r.title,
      description: r.description,
      url: absoluteUrl(`/resources/${r.slug}`, language),
      isAccessibleForFree: true,
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content="free nonprofit resources, community development toolkit, asset mapping template, volunteer management guide, impact measurement framework, nonprofit tools download" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={siteConfig.defaultImage} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={siteConfig.defaultImage} />

        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/90 text-white pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-[#C9922A]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8 text-[#C9922A]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {isCentralAsia ? "Бесплатные ресурсы и инструменты" : "Free Resources & Toolkits"}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {isCentralAsia
              ? "Практические инструменты для организаций, занимающихся международным развитием. Бесплатно — без скрытых условий."
              : "Practical tools for organizations doing community-based international development. Free to download, no strings attached."}
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource) => {
              const IconComponent = iconMap[resource.icon] || BookOpen;
              return (
                <Link key={resource.slug} to={`/resources/${resource.slug}`}>
                  <Card className="h-full border border-gray-200 hover:border-[#C9922A]/50 hover:shadow-lg transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#C9922A]/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9922A]/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-[#C9922A]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg font-bold text-[#1B2A4A] mb-2 group-hover:text-[#C9922A] transition-colors">
                            {isCentralAsia ? resource.titleRu : resource.title}
                          </h2>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                            {isCentralAsia ? resource.excerptRu : resource.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#C9922A] group-hover:gap-2 transition-all">
                            {isCentralAsia ? "Скачать бесплатно" : "Download Free"}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">
            {isCentralAsia
              ? "Хотите больше? Присоединяйтесь к нашему сообществу"
              : "Want More? Join Our Community"}
          </h2>
          <p className="text-gray-600 mb-8">
            {isCentralAsia
              ? "Исследуйте наши бесплатные курсы и программы для более глубокого обучения."
              : "Explore our free courses and programs for deeper learning and hands-on practice."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/course/financial-literacy"
              className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {isCentralAsia ? "Курс финансовой грамотности" : "Financial Literacy Course"}
            </Link>
            <Link
              to="/course/business-creation"
              className="border border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A]/5 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {isCentralAsia ? "Курс создания бизнеса" : "Business Creation Course"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
