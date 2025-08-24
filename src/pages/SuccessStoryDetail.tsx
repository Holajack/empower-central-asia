import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { successStories } from "@/data/successStories";
import { ArrowLeft, Calendar, Clock, MapPin, TrendingUp, Users, DollarSign, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SuccessStoryDetail = () => {
  const { id } = useParams();
  const story = successStories.find((story) => story.id === id);

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Success story not found</h2>
        <Link to="/success-stories" className="text-purple-600 hover:text-purple-700 flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Return to all success stories
        </Link>
      </div>
    );
  }

  const renderContent = (content: string) => {
    const sections = content.split('\n\n');
    
    return sections.map((section, index) => {
      const processText = (text: string) => {
        // Handle bold text **text**
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
        // Handle italic text *text*
        text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic">$1</em>');
        // Handle links [text](url)
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-600 hover:text-purple-800 underline" target="_blank" rel="noopener noreferrer">$1</a>');
        
        return text;
      };

      // Headers
      if (section.startsWith('### ')) {
        const headerText = processText(section.replace('### ', ''));
        return (
          <h3 key={index} className="text-xl font-bold mt-8 mb-4 text-gray-800" 
              dangerouslySetInnerHTML={{ __html: headerText }}>
          </h3>
        );
      } else if (section.startsWith('## ')) {
        const headerText = processText(section.replace('## ', ''));
        return (
          <h2 key={index} className="text-2xl font-bold mt-10 mb-6 text-gray-800" 
              dangerouslySetInnerHTML={{ __html: headerText }}>
          </h2>
        );
      } else if (section.startsWith('# ')) {
        const headerText = processText(section.replace('# ', ''));
        return (
          <h1 key={index} className="text-3xl font-bold mt-12 mb-6 text-gray-900" 
              dangerouslySetInnerHTML={{ __html: headerText }}>
          </h1>
        );
      }
      
      // Lists
      else if (section.startsWith('- ') || section.startsWith('* ')) {
        const listItems = section.split('\n').map((item, itemIndex) => {
          if (item.startsWith('- ') || item.startsWith('* ')) {
            const itemText = processText(item.replace(/^[-*] /, ''));
            return <li key={itemIndex} dangerouslySetInnerHTML={{ __html: itemText }}></li>;
          }
          return null;
        }).filter(Boolean);
        
        return (
          <ul key={index} className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
            {listItems}
          </ul>
        );
      }
      
      // Regular paragraphs
      else if (section.trim() !== '') {
        const processedText = processText(section);
        return (
          <p key={index} className="text-gray-700 mb-6 leading-relaxed text-lg"
             dangerouslySetInnerHTML={{ __html: processedText }}>
          </p>
        );
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 bg-white">
      <Helmet>
        <title>{story.title} | Success Stories - Businesses Beyond Borders</title>
        <meta 
          name="description" 
          content={story.excerpt}
        />
        <meta 
          name="keywords" 
          content={`${story.tags.join(', ')}, success story, entrepreneur, business development, Central Asia, Volusia County mentorship`}
        />
        
        <meta property="og:title" content={`${story.name} Success Story - ${story.business}`} />
        <meta property="og:description" content={story.excerpt} />
        <meta property="og:image" content={story.heroImage} />
        <meta property="og:url" content={`https://businessesbeyondborders.com/success-stories/${story.id}`} />
        <meta property="og:type" content="article" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${story.name} - ${story.business} Success Story`} />
        <meta name="twitter:description" content={story.excerpt} />
        <meta name="twitter:image" content={story.heroImage} />
        
        <link rel="canonical" href={`https://businessesbeyondborders.com/success-stories/${story.id}`} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": story.title,
            "description": story.excerpt,
            "image": story.heroImage,
            "author": {
              "@type": "Organization",
              "name": "Businesses Beyond Borders"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Businesses Beyond Borders",
              "logo": {
                "@type": "ImageObject",
                "url": "https://businessesbeyondborders.com/logo.png"
              }
            },
            "datePublished": story.date,
            "dateModified": story.date
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img 
          src={`${story.heroImage}?w=1920&h=1080&fit=crop`}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/success-stories" className="text-white/80 hover:text-white flex items-center gap-2 mb-6">
              <ArrowLeft size={16} /> Back to all success stories
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {story.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{story.title}</h1>
            
            <div className="flex flex-wrap items-center text-white/80 gap-4 md:gap-6 text-sm md:text-base mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {story.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {story.readTime}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {story.location}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white font-medium">{story.name} • {story.business}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Story Excerpt */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl font-normal text-gray-700 leading-relaxed border-l-4 border-purple-500 pl-6 bg-purple-50 py-6 rounded-r-lg">
              {story.excerpt}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {story.metrics.map((metric, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-2">
                  <div className="text-3xl font-bold text-purple-600">{metric.value}</div>
                  <CardTitle className="text-lg">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Before Story */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">The Beginning</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              {renderContent(story.beforeStory)}
            </div>
          </section>

          {/* Challenge */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">The Challenge</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              {renderContent(story.challenge)}
            </div>
          </section>

          {/* Solution */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">The Solution</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              {renderContent(story.solution)}
            </div>
          </section>

          {/* Implementation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Implementation Journey</h2>
            <div className="space-y-6">
              {renderContent(story.implementation)}
              
              {/* Timeline */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Project Timeline</h3>
                <div className="space-y-4">
                  {story.timeline.map((phase, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-24 text-sm font-medium text-purple-600 bg-white px-3 py-1 rounded">
                        {phase.duration}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{phase.phase}</h4>
                        <p className="text-gray-600 text-sm">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">The Results</h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              {renderContent(story.results)}
            </div>
          </section>

          {/* Impact */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Broader Impact</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {story.impact.map((impact, index) => (
                <div key={index} className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <p className="text-gray-700">{impact}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Volunteer Support */}
          {story.volunteerSupport && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Volusia County Volunteer Support</h2>
              <div className="bg-sage-50 border-l-4 border-sage-500 p-6 rounded-r-lg">
                {renderContent(story.volunteerSupport)}
              </div>
            </section>
          )}

          {/* Quote */}
          <section className="mb-12">
            <div className="bg-purple-50 p-8 rounded-xl border border-purple-200">
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-6 italic text-center">
                "{story.quote}"
              </blockquote>
              <footer className="text-center">
                <cite className="text-purple-600 font-semibold not-italic">
                  — {story.name}, Founder of {story.business}
                </cite>
              </footer>
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 mb-12 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Inspired by {story.name}'s Success?</h3>
              <p className="mb-6 text-lg">
                Help us create more transformative stories like this. Your support enables entrepreneurs 
                worldwide to build thriving businesses that strengthen their communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-involved">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                    Support Entrepreneurs
                  </Button>
                </Link>
                <Link to="/get-involved?type=volunteer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    Become a Mentor
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Back to Stories */}
          <div className="text-center">
            <Link 
              to="/success-stories" 
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              <ArrowLeft size={16} /> View All Success Stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryDetail;