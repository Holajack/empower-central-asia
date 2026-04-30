import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/contexts/RegionContext";
import { Breadcrumbs } from "@/components/SEO";
import { useSuccessStory } from "@/hooks/useSuccessStories";
import type {
  PortableTextBlock,
  StoryMetric,
  StoryTimelinePhase,
} from "@/hooks/useSuccessStories";
import { getLocalized } from "@/lib/localized";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 mb-4 leading-relaxed text-lg">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-[#1B2A4A] mb-3 mt-6">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#C9922A] pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 mb-4 list-disc list-inside text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 mb-4 list-decimal list-inside text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

// Render plain-text fields (challenge / solution / results) — split on blank
// lines into paragraphs so authors get sensible spacing without needing
// rich text.
function renderTextBlock(text: string | undefined) {
  if (!text) return null;
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return paragraphs.map((p, i) => (
    <p key={i} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
      {p}
    </p>
  ));
}

interface MetricCardProps {
  metric: StoryMetric;
  isCentralAsia: boolean;
}

function MetricCard({ metric, isCentralAsia }: MetricCardProps) {
  const label = getLocalized(metric.label ?? "", metric.labelRu, isCentralAsia);
  const description = getLocalized(
    metric.description ?? "",
    metric.descriptionRu,
    isCentralAsia
  );
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center transition-all duration-300 hover:shadow-md">
      <div className="text-3xl md:text-4xl font-bold text-[#C9922A] mb-2">
        {metric.value ?? ""}
      </div>
      {label && (
        <div className="text-lg font-semibold text-[#1B2A4A] mb-2">{label}</div>
      )}
      {description && (
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      )}
    </div>
  );
}

interface TimelinePhaseRowProps {
  phase: StoryTimelinePhase;
  isCentralAsia: boolean;
}

function TimelinePhaseRow({ phase, isCentralAsia }: TimelinePhaseRowProps) {
  const phaseName = getLocalized(phase.phase ?? "", phase.phaseRu, isCentralAsia);
  const duration = getLocalized(
    phase.duration ?? "",
    phase.durationRu,
    isCentralAsia
  );
  const description = getLocalized(
    phase.description ?? "",
    phase.descriptionRu,
    isCentralAsia
  );
  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg border border-gray-100">
      <div className="md:w-32 flex-shrink-0">
        <div className="inline-block text-sm font-semibold text-[#C9922A] bg-[#C9922A]/10 px-3 py-1 rounded">
          {duration}
        </div>
      </div>
      <div className="flex-1">
        {phaseName && (
          <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">{phaseName}</h3>
        )}
        {description && (
          <p className="text-gray-700 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}

const SuccessStoryDetail = () => {
  const { id } = useParams();
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  const { story, isLoading } = useSuccessStory(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center pt-32">
        <p className="text-gray-500">
          {isCentralAsia ? "Загрузка..." : "Loading..."}
        </p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-12 text-center pt-32">
        <h2 className="text-2xl font-bold mb-4">
          {isCentralAsia
            ? "История успеха не найдена"
            : "Success story not found"}
        </h2>
        <Link
          to="/success-stories"
          className="text-[#C9922A] hover:text-[#C9922A]/80 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          {isCentralAsia
            ? "Вернуться ко всем историям"
            : "Return to all success stories"}
        </Link>
      </div>
    );
  }

  // Localized field values
  const title = getLocalized(story.title, story.titleRu, isCentralAsia);
  const name = getLocalized(story.name, story.nameRu, isCentralAsia);
  const location = getLocalized(
    story.location ?? "",
    story.locationRu,
    isCentralAsia
  );
  const excerpt = getLocalized(
    story.excerpt ?? "",
    story.excerptRu,
    isCentralAsia
  );
  const pullQuote = getLocalized(
    story.pullQuote ?? "",
    story.pullQuoteRu,
    isCentralAsia
  );
  const challenge = getLocalized(
    story.challenge ?? "",
    story.challengeRu,
    isCentralAsia
  );
  const solution = getLocalized(
    story.solution ?? "",
    story.solutionRu,
    isCentralAsia
  );
  const results = getLocalized(
    story.results ?? "",
    story.resultsRu,
    isCentralAsia
  );
  const storyBody: PortableTextBlock[] = isCentralAsia
    ? story.storyRu ?? story.story ?? []
    : story.story ?? [];

  const slug = story.slug ?? story._id;
  const heroImage = story.heroImageUrl ?? "";
  const tags = story.tags ?? [];
  const metrics = story.metrics ?? [];
  const timeline = story.timeline ?? [];

  const hasMetrics = metrics.length > 0;
  const hasTimeline = timeline.length > 0;
  const hasStoryBody = storyBody.length > 0;
  const hasChallengeSolutionResults = Boolean(challenge || solution || results);

  return (
    <div className="min-h-screen pt-20 md:pt-28 bg-white">
      <Helmet>
        <title>
          {isCentralAsia
            ? `${title} | Истории успеха - BBB`
            : `${title} | Stories - BBB`}
        </title>
        <meta name="description" content={excerpt} />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        {tags.length > 0 && (
          <meta
            name="keywords"
            content={`${tags.join(", ")}, success story, entrepreneur, business development, Central Asia, volunteer mentorship`}
          />
        )}

        <meta
          property="og:title"
          content={
            story.business
              ? `${name} Success Story - ${story.business}`
              : `${name} Success Story`
          }
        />
        <meta property="og:description" content={excerpt} />
        {heroImage && <meta property="og:image" content={heroImage} />}
        <meta
          property="og:url"
          content={`https://businessesbeyondborders.com/success-stories/${slug}`}
        />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            story.business ? `${name} - ${story.business} Success Story` : title
          }
        />
        <meta name="twitter:description" content={excerpt} />
        {heroImage && <meta name="twitter:image" content={heroImage} />}

        <link
          rel="canonical"
          href={`https://businessesbeyondborders.com/success-stories/${slug}`}
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description: excerpt,
            image: heroImage,
            author: {
              "@type": "Organization",
              name: "Businesses Beyond Borders",
            },
            publisher: {
              "@type": "Organization",
              name: "Businesses Beyond Borders",
              logo: {
                "@type": "ImageObject",
                url: "https://businessesbeyondborders.com/logo.png",
              },
            },
            datePublished: story.year ? `${story.year}-01-01` : undefined,
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs
          items={[
            { name: "Home", url: "https://businessesbeyondborders.com" },
            {
              name: "Success Stories",
              url: "https://businessesbeyondborders.com/success-stories",
            },
            {
              name: title,
              url: `https://businessesbeyondborders.com/success-stories/${slug}`,
            },
          ]}
        />
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {heroImage && (
          <img
            src={`${heroImage}${heroImage.includes("?") ? "&" : "?"}w=1920&h=1080&fit=crop`}
            alt={title}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link
              to="/success-stories"
              className="text-white/80 hover:text-white flex items-center gap-2 mb-6"
            >
              <ArrowLeft size={16} />
              {isCentralAsia
                ? "Все истории успеха"
                : "Back to all success stories"}
            </Link>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center text-white/80 gap-4 md:gap-6 text-sm md:text-base mb-6">
              {story.year && (
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {story.year}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {location}
                </span>
              )}
            </div>

            {(name || story.business) && (
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-white font-medium">
                  {name}
                  {name && story.business ? " • " : ""}
                  {story.business}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Excerpt */}
          {excerpt && (
            <div className="mb-12">
              <p className="text-xl md:text-2xl font-normal text-gray-700 leading-relaxed border-l-4 border-[#C9922A] pl-6 bg-[#C9922A]/5 py-6 rounded-r-lg">
                {excerpt}
              </p>
            </div>
          )}

          {/* Metrics grid */}
          {hasMetrics && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1B2A4A]">
                {isCentralAsia ? "Ключевые показатели" : "Key Metrics"}
              </h2>
              <div
                className={`grid gap-6 ${
                  metrics.length === 1
                    ? "grid-cols-1"
                    : metrics.length === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : metrics.length === 3
                        ? "grid-cols-1 md:grid-cols-3"
                        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                }`}
              >
                {metrics.map((metric, idx) => (
                  <MetricCard
                    key={idx}
                    metric={metric}
                    isCentralAsia={isCentralAsia}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Challenge / Solution / Results trio */}
          {hasChallengeSolutionResults && (
            <section className="mb-12 space-y-8">
              {challenge && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1B2A4A]">
                    {isCentralAsia ? "Трудности на пути" : "The Challenge"}
                  </h2>
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                    {renderTextBlock(challenge)}
                  </div>
                </div>
              )}

              {solution && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1B2A4A]">
                    {isCentralAsia ? "Найденное решение" : "The Solution"}
                  </h2>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    {renderTextBlock(solution)}
                  </div>
                </div>
              )}

              {results && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1B2A4A]">
                    {isCentralAsia
                      ? "Достигнутые результаты"
                      : "The Results"}
                  </h2>
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                    {renderTextBlock(results)}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Timeline */}
          {hasTimeline && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1B2A4A]">
                {isCentralAsia ? "Хронология проекта" : "Project Timeline"}
              </h2>
              <div className="space-y-4">
                {timeline.map((phase, idx) => (
                  <TimelinePhaseRow
                    key={idx}
                    phase={phase}
                    isCentralAsia={isCentralAsia}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Long-form Portable Text body */}
          {hasStoryBody && (
            <section className="mb-12">
              <PortableText
                value={
                  storyBody as Parameters<typeof PortableText>[0]["value"]
                }
                components={portableTextComponents}
              />
            </section>
          )}

          {/* Pull quote */}
          {pullQuote && (
            <section className="mb-12">
              <div className="bg-[#C9922A]/5 p-8 rounded-xl border border-[#C9922A]/20">
                <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-6 italic text-center">
                  &ldquo;{pullQuote}&rdquo;
                </blockquote>
                {(name || story.business) && (
                  <footer className="text-center">
                    <cite className="text-[#C9922A] font-semibold not-italic">
                      &mdash; {name}
                      {story.business ? `, ${story.business}` : ""}
                    </cite>
                  </footer>
                )}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="bg-gradient-to-r from-[#1B2A4A] to-[#1B2A4A]/90 rounded-xl p-8 mb-12 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                {isCentralAsia
                  ? `Вдохновляет история ${name}?`
                  : `Inspired by ${name}'s Success?`}
              </h3>
              <p className="mb-6 text-lg">
                {isCentralAsia
                  ? "Помогите нам создавать больше подобных историй. Ваша поддержка даёт предпринимателям возможность строить процветающий бизнес и укреплять свои сообщества."
                  : "Help us create more transformative stories like this. Your support enables entrepreneurs worldwide to build thriving businesses that strengthen their communities."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!isRegionCentralAsia && (
                  <Link to="/get-involved">
                    <Button
                      size="lg"
                      className="bg-white text-[#C9922A] hover:bg-[#C9922A]/5"
                    >
                      Support Entrepreneurs
                    </Button>
                  </Link>
                )}
                <Link to="/get-involved?type=volunteer">
                  <Button
                    size="lg"
                    className="bg-transparent border border-white/40 text-white hover:bg-white/20"
                  >
                    {isCentralAsia ? "Стать наставником" : "Become a Mentor"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Back to Stories */}
          <div className="text-center">
            <Link
              to="/success-stories"
              className="inline-flex items-center gap-2 text-[#C9922A] hover:text-[#C9922A]/80 font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              {isCentralAsia
                ? "Все истории успеха"
                : "View All Success Stories"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryDetail;
