import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>CentralImpact - Empowering Entrepreneurs in Central Asia</title>
        <meta 
          name="description" 
          content="CentralImpact empowers entrepreneurs across Central Asia through sustainable business development, financial literacy programs, and community transformation initiatives." 
        />
        <meta 
          name="keywords" 
          content="Central Asia entrepreneurship, business development, financial literacy, community empowerment, sustainable development, economic growth" 
        />
        <meta property="og:title" content="CentralImpact - Transforming Communities Through Entrepreneurship" />
        <meta property="og:description" content="Join our mission to empower entrepreneurs and foster sustainable development across Central Asia." />
      </Helmet>

      <main className="min-h-screen" role="main">
        <div className="container mx-auto px-4">
          <section className="hero-section mb-16" aria-labelledby="hero-heading">
            <h1 id="hero-heading" className="sr-only">CentralImpact - Empowering Entrepreneurs in Central Asia</h1>
            <div className="flex flex-col items-center">
              <h2 className="text-5xl font-bold text-gray-900">Empowering Entrepreneurs</h2>
              <p className="mt-4 text-lg text-gray-600 text-center">
                Join us in transforming communities through entrepreneurship education and sustainable business development.
              </p>
            </div>
          </section>

          <section className="mission-section mb-16" aria-labelledby="mission-heading">
            <h2 id="mission-heading" className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600">
              At CentralImpact, we are dedicated to fostering entrepreneurship and economic growth across Central Asia. Our mission is to empower individuals with the skills and resources they need to succeed in their business ventures.
            </p>
          </section>

          <section className="impact-section" aria-labelledby="impact-heading">
            <h2 id="impact-heading" className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Through our programs, we have helped thousands of entrepreneurs launch and grow their businesses, leading to sustainable economic development in their communities. Our impact metrics show significant improvements in business success rates and community engagement.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;
