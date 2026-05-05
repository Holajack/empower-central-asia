
import React from "react";
import { Helmet } from "react-helmet";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Globe,
  Users,
  TrendingUp,
  Heart,
  Target,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/contexts/RegionContext";
import { useAboutPage, useTeamMembers, localizeTeam } from "@/hooks/useAbout";

// PortableText components — styled to match the existing class names used
// in the narrative sections so the visual look is preserved.
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed text-gray-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#1B2A4A]/20 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-1">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-gray-800">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

// Map Sanity-stored icon names to actual lucide components.
const ICON_MAP: Record<string, LucideIcon> = {
  Target,
  Globe,
  Heart,
  Users,
  TrendingUp,
  Lightbulb,
};

const About = () => {
  const { isCentralAsia } = useRegion();
  const { about } = useAboutPage();
  const { members: rawMembers } = useTeamMembers();
  const teamMembers = localizeTeam(rawMembers, isCentralAsia).map((m) => ({
    name: m.name,
    role: m.role,
    bio: m.bio,
    image: m.photoUrl ?? "",
    initials: m.initials,
  }));

  const { ref: storyRef, inView: storyInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: whyRef, inView: whyInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Values come from Sanity (aboutPage.values), with hardcoded fallback in the
  // hook. Icon name strings -> lucide components via ICON_MAP.
  const values = about.getValuesLocalized(isCentralAsia).map((v) => ({
    icon: ICON_MAP[v.icon] ?? Target,
    title: v.title,
    description: v.description,
  }));

  // teamMembers comes from Sanity at the top of the component (with hardcoded fallback).

  return (
    <>
      <Helmet>
        <title>{`${about.getHeroTitle(isCentralAsia)} | Businesses Beyond Borders`}</title>
        <meta name="description" content={about.getHeroSubtitle(isCentralAsia)} />
        <meta name="keywords" content={isCentralAsia
          ? "о Businesses Beyond Borders, обучение предпринимателей Центральная Азия, некоммерческая организация, история основания"
          : "nonprofit business training Port Orange, entrepreneurship program Florida, about Businesses Beyond Borders, Central Asia development nonprofit, Jacken Holland founder, Yeva Romanova COO, Volusia County nonprofit"} />

        <meta property="og:title" content={isCentralAsia ? "О нас — Наша история и миссия" : "About Us - Our Story & Mission | Businesses Beyond Borders"} />
        <meta property="og:description" content={isCentralAsia
          ? "Брошен при рождении на Гаити. Усыновлён. Основал BBB в 23 года. Познакомьтесь с командой, стоящей за Businesses Beyond Borders."
          : "Abandoned at birth in Haiti. Adopted. Founded a nonprofit at 23 to give others the same chance. Meet the team behind Businesses Beyond Borders."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/about" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "О нас — Businesses Beyond Borders" : "About Businesses Beyond Borders - Our Story"} />
        <meta name="twitter:description" content={isCentralAsia
          ? "Брошен при рождении. Усыновлён. Основал BBB в 23 года, чтобы дать другим настоящий шанс."
          : "Abandoned at birth in Haiti. Adopted by an American family. Founded BBB at 23 to train entrepreneurs in Central Asia."} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />

        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/about" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["NonprofitOrganization", "Organization"],
            "name": "Businesses Beyond Borders",
            "description": "Nonprofit training entrepreneurs in Central Asia through evidence-based financial literacy, business creation, and leadership development programs",
            "url": "https://businessesbeyondborders.com",
            "foundingDate": "2022",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Port Orange",
              "addressRegion": "FL",
              "postalCode": "32127",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-386-517-1527",
              "contactType": "customer support",
              "email": "donations@businessesbeyondborders.com"
            },
            "founder": [
              {
                "@type": "Person",
                "name": "Jacken Holland",
                "jobTitle": "Founder & CEO"
              },
              {
                "@type": "Person",
                "name": "Yeva Romanova",
                "jobTitle": "Co-Founder & COO"
              }
            ],
            "mission": "Businesses Beyond Borders exists to bring hope to the hopeless -- equipping diligent people to build dignified, sustainable lives through financial literacy, entrepreneurship, and opportunity."
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <div
          className="relative h-[60vh] flex items-center justify-center pt-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
              {about.getHeroTitle(isCentralAsia)}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms]">
              {about.getHeroSubtitle(isCentralAsia)}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 space-y-20">

          {/* Origin Story - Jacken */}
          <section
            ref={storyRef}
            className={`max-w-4xl mx-auto transition-all duration-700 ${
              storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-3 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#1B2A4A]/5 text-[#1B2A4A] px-4 py-1.5 rounded-full text-sm font-medium">
                  {about.getFounderBadge(isCentralAsia)}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {about.getFounderHeading(isCentralAsia)}
                </h2>
                <div className="prose max-w-none text-gray-700 space-y-4">
                  <PortableText
                    value={about.getFoundingStory(isCentralAsia)}
                    components={portableTextComponents}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-[#1B2A4A]/5 rounded-2xl p-6 space-y-4">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src="/photo-1581092795360-fd1ca04f0952" alt="Jacken Holland" className="object-cover" />
                    <AvatarFallback className="bg-[#1B2A4A]/20 text-[#1B2A4A] text-2xl">JH</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">Jacken Holland</h3>
                    <p className="text-[#1B2A4A] font-medium">
                      {about.getFounderRoleLabel(isCentralAsia)}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    {about.getFounderBio(isCentralAsia).map((bullet, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]" />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Yeva's Story */}
          <section className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-2 md:order-1 order-2">
                <div className="bg-[#C9922A]/5 rounded-2xl p-6 space-y-4">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src="/photo-1581091226825-a6a2a5aee158" alt="Yeva Romanova" className="object-cover" />
                    <AvatarFallback className="bg-[#C9922A]/20 text-[#C9922A] text-2xl">YR</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">Yeva Romanova</h3>
                    <p className="text-[#C9922A] font-medium">
                      {about.getCoFounderRoleLabel(isCentralAsia)}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    {about.getCoFounderBio(isCentralAsia).map((bullet, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9922A]" />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 md:order-2 order-1 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#C9922A]/10 text-[#C9922A] px-4 py-1.5 rounded-full text-sm font-medium">
                  {about.getCoFounderBadge(isCentralAsia)}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {about.getCoFounderHeading(isCentralAsia)}
                </h2>
                <div className="prose max-w-none text-gray-700 space-y-4">
                  <PortableText
                    value={about.getMissionText(isCentralAsia)}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Why Central Asia */}
          <section
            ref={whyRef}
            className={`max-w-4xl mx-auto transition-all duration-700 ${
              whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                {about.getWhyBadge(isCentralAsia)}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {about.getWhyHeading(isCentralAsia)}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {about.getWhyIntro(isCentralAsia)}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {about.getWhyCards(isCentralAsia).map((card, i) => (
                <Card key={i} className="border-green-200 hover:shadow-lg transition-all">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {card.title}
                    </h3>
                    <p className="text-gray-600">
                      {card.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Values / Approach */}
          <section
            ref={valuesRef}
            className={`transition-all duration-700 ${
              valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {about.getApproachHeading(isCentralAsia)}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {about.getApproachIntro(isCentralAsia)}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="border-gray-200 hover:border-[#C9922A]/40 transition-colors hover:shadow-lg"
                  >
                    <CardContent className="p-6 space-y-3">
                      <div className="bg-[#C9922A]/10 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#C9922A]" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Team Section */}
          <section
            ref={teamRef}
            className={`transition-all duration-700 ${
              teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              {about.getTeamHeading(isCentralAsia)}
            </h2>
            <div className="w-full mx-auto flex flex-wrap justify-center gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex-[1_1_300px] max-w-sm min-w-[280px] flex justify-center"
                >
                  <Card className="w-full border-gray-200 hover:shadow-lg transition-all flex flex-col items-center">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <Avatar className="w-28 h-28 mb-4">
                        <AvatarImage
                          src={member.image}
                          alt={member.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-[#1B2A4A]/10 text-[#1B2A4A] text-xl">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#C9922A] font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 leading-relaxed text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/90 text-white p-10 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">
              {about.getCtaHeading(isCentralAsia)}
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              {about.getCtaBody(isCentralAsia)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={about.ctaPrimaryUrl}>
                <Button size="lg" className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8">
                  {about.getCtaPrimaryLabel(isCentralAsia)}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={about.ctaSecondaryUrl}>
                <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#1B2A4A] px-8">
                  {about.getCtaSecondaryLabel(isCentralAsia)}
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
