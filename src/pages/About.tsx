import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | CentralImpact - Our Mission in Central Asia</title>
        <meta 
          name="description" 
          content="Learn about CentralImpact's mission to empower entrepreneurs across Central Asia through sustainable business development and financial literacy programs." 
        />
        <meta 
          name="keywords" 
          content="about CentralImpact, Central Asia entrepreneurship, business development, financial literacy, community empowerment" 
        />
        <meta property="og:title" content="About CentralImpact - Empowering Central Asian Entrepreneurs" />
        <meta property="og:description" content="Discover our mission to transform communities through entrepreneurship education and sustainable business development in Central Asia." />
      </Helmet>

      <main className="min-h-screen py-20" role="main">
        <div className="container mx-auto px-4">
          <section className="mb-16" aria-labelledby="mission-heading">
            <h1 id="mission-heading" className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h1>
            <p className="text-lg text-gray-600 mb-6">
              At CentralImpact, we're dedicated to fostering entrepreneurship and economic growth across Central Asia.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We believe in the power of entrepreneurship to transform lives and communities, providing individuals with the tools and resources they need to succeed.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to empower aspiring entrepreneurs through comprehensive training programs, mentorship, and access to financial resources.
            </p>
          </section>

          <section className="mb-16" aria-labelledby="values-heading">
            <h2 id="values-heading" className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-lg text-gray-600 mb-4">
              We are guided by our core values of integrity, collaboration, and innovation. We strive to create an inclusive environment where everyone can thrive.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              We value the diverse perspectives and experiences of our community, and we are committed to fostering a culture of respect and support.
            </p>
          </section>

          <section aria-labelledby="team-heading">
            <h2 id="team-heading" className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-lg text-gray-600 mb-4">
              Our team is composed of passionate individuals with diverse backgrounds and expertise in entrepreneurship, business development, and community engagement.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Together, we work tirelessly to support entrepreneurs and drive positive change in Central Asia.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default About;
