import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Home, ArrowLeft, Search, BookOpen, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const popularPages = [
    { name: "Home", path: "/", icon: Home },
    { name: "About Us", path: "/about", icon: Users },
    { name: "Get Involved", path: "/get-involved", icon: Heart },
    { name: "Blog", path: "/blog", icon: BookOpen },
  ];

  return (
    <>
      <Helmet>
        <title>Page Not Found | Businesses Beyond Borders</title>
        <meta name="description" content="The page you're looking for doesn't exist. Navigate back to Businesses Beyond Borders to explore volunteer opportunities, our programs, and how you can help empower entrepreneurs in Central Asia." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen pt-20 md:pt-28 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Visual */}
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-purple-200 select-none">404</h1>
            </div>

            {/* Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for seems to have wandered off.
              But don't worry – there's still plenty to explore at Businesses Beyond Borders.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Return Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blog">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Our Blog
                </Link>
              </Button>
            </div>

            {/* Popular Pages */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Pages
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50 transition-colors group"
                  >
                    <page.icon className="h-6 w-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
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
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back to Previous Page
              </button>
            </div>

            {/* Contact CTA */}
            <div className="mt-12 p-6 bg-purple-50 rounded-xl">
              <p className="text-gray-700 mb-4">
                Can't find what you're looking for? We're here to help!
              </p>
              <Link
                to="/contact"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
