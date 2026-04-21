
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getLocalizedPost } from "@/data/blogPosts";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TableOfContents from "./TableOfContents";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { useRegion } from "@/contexts/RegionContext";
import { getResourcesForBlog } from "@/data/resources";
import AudioPlayer from "./AudioPlayer";

const BlogDetail = () => {
  const { id } = useParams();
  const { isCentralAsia } = useRegion();

  // Fetch post from Sanity; falls back to hardcoded data if Sanity is
  // unreachable or the slug isn't in the CMS yet.
  const { post, isLoading } = useBlogPost(id);

  if (isLoading && !post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#C9922A] border-t-transparent" aria-label="Loading" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isCentralAsia ? "Статья не найдена" : "Blog post not found"}
        </h2>
        <Link to="/blog" className="text-[#C9922A] hover:text-[#C9922A]/80 flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> {isCentralAsia ? "Вернуться к статьям" : "Return to all articles"}
        </Link>
      </div>
    );
  }

  const localized = getLocalizedPost(post, isCentralAsia);
  const canonicalUrl = `https://businessesbeyondborders.com/blog/${post.slug}`;
  const wordCount = localized.displayContent.split(/\s+/).length;

  const blogSchema = generateBlogPostSchema({
    title: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString().split('T')[0],
    dateModified: post.dateModified || new Date(post.date).toISOString().split('T')[0],
    author: post.author,
    image: post.imageUrl,
    url: canonicalUrl,
    tags: post.tags,
    wordCount,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://businessesbeyondborders.com" },
    { name: "Blog", url: "https://businessesbeyondborders.com/blog" },
    { name: post.title, url: canonicalUrl },
  ]);

  // Function to render blog content with proper formatting
  // Note: Content comes from our own hardcoded blogPosts.ts data file, not user input
  const renderContent = (content: string) => {
    // Pre-compute heading IDs matching the TableOfContents component's logic
    const headingIds: string[] = [];
    const lines = content.split('\n');
    lines.forEach((line, lineIndex) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const text = match[2].replace(/\*\*/g, '').replace(/\*/g, '');
        const id = `heading-${lineIndex}-${text.toLowerCase().replace(/[^a-z0-9а-яё]+/g, '-')}`;
        headingIds.push(id);
      }
    });
    let headingCounter = 0;

    // Split by double newlines to identify paragraphs
    const paragraphs = content.split('\n\n');

    return paragraphs.map((paragraph, index) => {
      // Process markdown formatting for the text content
      const processMarkdown = (text: string) => {
        // Handle bold text **text**
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
        // Handle italic text *text*
        text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic">$1</em>');
        // Handle links [text](url) - internal links don't get target="_blank"
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, linkText, url) => {
          if (url.startsWith('/')) {
            return `<a href="${url}" class="text-[#C9922A] hover:text-[#C9922A]/80 underline">${linkText}</a>`;
          }
          return `<a href="${url}" class="text-[#C9922A] hover:text-[#C9922A]/80 underline" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
        });

        return text;
      };

      if (paragraph.startsWith('## ')) {
        const headerText = processMarkdown(paragraph.replace('## ', ''));
        const headingId = headingIds[headingCounter++] || undefined;
        return (
          <h2 key={index} id={headingId} className="text-2xl font-bold mt-8 mb-4 text-gray-800">
            <span dangerouslySetInnerHTML={{ __html: headerText }} />
          </h2>
        );
      } else if (paragraph.startsWith('### ')) {
        const headerText = processMarkdown(paragraph.replace('### ', ''));
        const headingId = headingIds[headingCounter++] || undefined;
        return (
          <h3 key={index} id={headingId} className="text-xl font-bold mt-6 mb-3 text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: headerText }} />
          </h3>
        );
      } else if (paragraph.startsWith('#### ')) {
        const headerText = processMarkdown(paragraph.replace('#### ', ''));
        return (
          <h4 key={index} className="text-lg font-semibold mt-5 mb-2 text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: headerText }} />
          </h4>
        );
      } else if (paragraph.startsWith('# ')) {
        const headerText = processMarkdown(paragraph.replace('# ', ''));
        return (
          <h2 key={index} className="text-3xl font-bold mt-10 mb-4 text-gray-900">
            <span dangerouslySetInnerHTML={{ __html: headerText }} />
          </h2>
        );
      } else if (paragraph.startsWith('> ')) {
        const quoteText = processMarkdown(paragraph.replace('> ', ''));
        return (
          <blockquote key={index} className="border-l-4 border-[#C9922A] pl-4 py-2 mb-5 bg-[#C9922A]/5 italic text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: quoteText }} />
          </blockquote>
        );
      } else if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        const listItems = paragraph.split('\n').map((item, itemIndex) => {
          if (item.startsWith('- ') || item.startsWith('* ')) {
            const itemText = processMarkdown(item.replace(/^[-*] /, ''));
            return <li key={itemIndex}><span dangerouslySetInnerHTML={{ __html: itemText }} /></li>;
          }
          return null;
        }).filter(Boolean);

        return (
          <ul key={index} className="list-disc list-inside mb-5 space-y-2 text-gray-600">
            {listItems}
          </ul>
        );
      } else if (/^\d+\./.test(paragraph)) {
        const listItems = paragraph.split('\n').map((item, itemIndex) => {
          if (/^\d+\./.test(item)) {
            const itemText = processMarkdown(item.replace(/^\d+\.\s*/, ''));
            return <li key={itemIndex}><span dangerouslySetInnerHTML={{ __html: itemText }} /></li>;
          }
          return null;
        }).filter(Boolean);

        return (
          <ol key={index} className="list-decimal list-inside mb-5 space-y-2 text-gray-600">
            {listItems}
          </ol>
        );
      } else if (paragraph.startsWith('---')) {
        return <hr key={index} className="border-gray-300 my-8" />;
      } else if (paragraph.trim() === '') {
        return null;
      } else {
        const processedText = processMarkdown(paragraph);
        return (
          <p key={index} className="text-gray-600 mb-5 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: processedText }} />
          </p>
        );
      }
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 bg-white">
      <Helmet>
        <title>{localized.displayTitle.length <= 54 ? `${localized.displayTitle} | BBB` : localized.displayTitle}</title>
        <meta name="description" content={localized.displayExcerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="author" content={post.author} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={localized.displayTitle} />
        <meta property="og:description" content={localized.displayExcerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:author" content={post.author} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={localized.displayTitle} />
        <meta name="twitter:description" content={localized.displayExcerpt} />
        <meta name="twitter:image" content={post.imageUrl} />

        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero Section with Featured Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={
            post.imageUrl.includes("?")
              ? `${post.imageUrl}&w=1920&h=1080&fit=crop`
              : `${post.imageUrl}?w=1920&h=1080&fit=crop`
          }
          alt={localized.displayTitle}
          width={1200}
          height={630}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/blog" className="text-white/80 hover:text-white flex items-center gap-2 mb-4">
              <ArrowLeft size={16} /> {isCentralAsia ? "Все статьи" : "Back to all articles"}
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {localized.displayTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{localized.displayTitle}</h1>

            <div className="flex flex-wrap items-center text-white/80 gap-4 md:gap-6 text-sm md:text-base">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {localized.displayDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {localized.displayReadTime}
              </span>
              <span>{isCentralAsia ? "Автор:" : "By"} {post.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-6">
            <p className="text-xl md:text-2xl font-normal text-gray-700 leading-relaxed border-l-4 border-[#C9922A] pl-6 bg-gray-50 py-6 rounded-r-lg">
              {localized.displayExcerpt}
            </p>
          </div>

          {/* Quick Summary (TL;DR) */}
          {localized.displaySummary && (
            <div className="max-w-3xl mb-6">
              <div className="bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1B2A4A]/60 mb-2">
                  {isCentralAsia ? "Кратко" : "Quick Summary"}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {localized.displaySummary}
                </p>
              </div>
            </div>
          )}

          {/* Audio Player - only shows when a recording exists */}
          {localized.displayAudioUrl && (
            <div className="max-w-3xl mb-10">
              <AudioPlayer audioUrl={localized.displayAudioUrl} title={localized.displayTitle} />
            </div>
          )}

          <div className="lg:hidden">
            <TableOfContents content={localized.displayContent} variant="inline" />
          </div>

          <div className="flex gap-10">
            <article className="prose prose-lg prose-gray max-w-none flex-1 min-w-0">
              <div
                style={{
                  fontSize: '18px',
                  lineHeight: '1.7',
                  maxWidth: '680px',
                }}
                className="text-gray-700"
              >
                {renderContent(localized.displayContent)}
              </div>
            </article>

            <aside className="hidden lg:block w-44 flex-shrink-0">
              <TableOfContents content={localized.displayContent} variant="sidebar" />
            </aside>
          </div>

          {/* Call to Action Section - Per-blog relevant resources */}
          {(() => {
            const blogResources = getResourcesForBlog(post.slug);
            return (
              <div className="mt-16 pt-12 border-t border-gray-200 max-w-3xl">
                <div className="bg-gradient-to-r from-[#C9922A]/5 to-[#1B2A4A]/5 rounded-xl p-8 mb-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {isCentralAsia ? "Бесплатные ресурсы по теме" : "Related Free Resources"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {isCentralAsia
                      ? "Скачайте практические инструменты, связанные с темой этой статьи."
                      : "Download practical toolkits related to the topics covered in this article."}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {blogResources.map((resource) => (
                      <Link
                        key={resource.slug}
                        to={`/resources/${resource.slug}`}
                        className="bg-white p-4 rounded-lg border border-[#C9922A]/20 hover:border-[#C9922A]/50 hover:shadow-md transition-all block"
                      >
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {isCentralAsia ? resource.titleRu : resource.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {isCentralAsia ? resource.excerptRu : resource.excerpt}
                        </p>
                        <span className="text-[#C9922A] text-sm font-medium">
                          {isCentralAsia ? "Скачать бесплатно →" : "Download Free →"}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/resources"
                      className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      {isCentralAsia ? "Все бесплатные ресурсы" : "View All Free Resources"}
                    </Link>
                    <Link
                      to="/get-involved"
                      className="border border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A]/5 px-6 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      {isCentralAsia ? "Изучить программы BBB" : "Explore BBB Programs"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {isCentralAsia ? "Об авторе" : "About the Author"}
            </h4>
            <p className="text-gray-600">
              {post.authorBio
                ? post.authorBio
                : (
                  <>
                    <strong>{post.author}</strong>{" "}
                    {isCentralAsia
                      ? "— основатель Businesses Beyond Borders, общественной организации, которая демонстрирует принципы, изложенные в этом руководстве, через программы поддержки предпринимателей в Центральной Азии."
                      : "is the founder of Businesses Beyond Borders, a community-based nonprofit demonstrating the principles outlined in this guide through programs empowering entrepreneurs in Central Asia. The organization serves as a real-world case study for community-based international development, engaging local volunteers remotely while creating measurable global impact."}
                  </>
                )
              }
            </p>
          </div>

          {/* Social Sharing */}
          <div className="border-t border-gray-200 pt-8 mb-12">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              {isCentralAsia ? "Поделиться статьёй" : "Share this article"}
            </h4>
            <div className="flex gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Facebook
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Related Courses */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">
              {isCentralAsia ? "Связанные курсы" : "Related Courses"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/course/financial-literacy"
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-shadow hover:shadow-md"
              >
                <p className="text-sm font-bold text-[#1B2A4A]">
                  {isCentralAsia ? "Курс финансовой грамотности" : "Financial Literacy Course"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isCentralAsia ? "6 недель • бесплатно →" : "6 weeks • free →"}
                </p>
              </Link>
              <Link
                to="/course/business-creation"
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-shadow hover:shadow-md"
              >
                <p className="text-sm font-bold text-[#1B2A4A]">
                  {isCentralAsia ? "Курс создания бизнеса" : "Business Creation Course"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isCentralAsia ? "12 недель • бесплатно →" : "12 weeks • free →"}
                </p>
              </Link>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#C9922A] hover:text-[#C9922A]/80 font-medium transition-colors"
            >
              <ArrowLeft size={16} /> {isCentralAsia ? "Все статьи" : "Back to all articles"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
