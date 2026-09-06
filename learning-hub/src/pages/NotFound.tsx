import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Home, ArrowLeft, Search, BookOpen, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig } from "@/lib/seo";

const NotFound = () => {
  const { isCentralAsia } = useRegion();

  const popularPages = isCentralAsia
    ? [
        { name: "Главная", path: "/", icon: Home },
        { name: "О нас", path: "/about", icon: Users },
        { name: "Участвовать", path: "/get-involved", icon: Heart },
        { name: "Блог", path: "/blog", icon: BookOpen },
      ]
    : [
        { name: "Home", path: "/", icon: Home },
        { name: "About Us", path: "/about", icon: Users },
        { name: "Get Involved", path: "/get-involved", icon: Heart },
        { name: "Blog", path: "/blog", icon: BookOpen },
      ];

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? `Страница не найдена | ${siteConfig.name}`
            : `Page Not Found | ${siteConfig.name}`}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? `Запрашиваемая страница не существует. Вернитесь на сайт ${siteConfig.name}, чтобы узнать о наших программах и возможностях участия.`
              : `The page you're looking for doesn't exist. Navigate back to ${siteConfig.name} to explore volunteer opportunities, our programs, and how you can help empower entrepreneurs in Central Asia.`
          }
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen pt-20 md:pt-28 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Visual */}
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-[#C9922A]/20 select-none">404</h1>
            </div>

            {/* Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isCentralAsia ? "Страница не найдена" : "Page Not Found"}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {isCentralAsia
                ? `Похоже, эта страница куда-то пропала. Но не беспокойтесь — на сайте ${siteConfig.name} есть ещё много интересного.`
                : `Oops! The page you're looking for seems to have wandered off. But don't worry \u2013 there's still plenty to explore at ${siteConfig.name}.`}
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-[#C9922A] hover:bg-[#C9922A]/90">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  {isCentralAsia ? "На главную" : "Return Home"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blog">
                  <Search className="mr-2 h-5 w-5" />
                  {isCentralAsia ? "Наш блог" : "Browse Our Blog"}
                </Link>
              </Button>
            </div>

            {/* Popular Pages */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isCentralAsia ? "Популярные разделы" : "Popular Pages"}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-[#C9922A]/5 transition-colors group"
                  >
                    <page.icon className="h-6 w-6 text-[#C9922A] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-700">
                      {page.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-[#C9922A] hover:text-[#C9922A]/80 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isCentralAsia ? "Вернуться на предыдущую страницу" : "Go Back to Previous Page"}
              </button>
            </div>

            {/* Contact CTA */}
            <div className="mt-12 p-6 bg-[#C9922A]/5 rounded-xl">
              <p className="text-gray-700 mb-4">
                {isCentralAsia
                  ? "Не можете найти нужное? Мы готовы помочь!"
                  : "Can't find what you're looking for? We're here to help!"}
              </p>
              <Link
                to="/community"
                className="text-[#C9922A] hover:text-[#C9922A]/80 font-semibold"
              >
                {isCentralAsia ? "Связаться с нами \u2192" : "Contact Us \u2192"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
