import { Helmet } from "react-helmet";

const GetInvolved = () => {
  return (
    <>
      <Helmet>
        <title>Get Involved | CentralImpact - Support Our Mission</title>
        <meta 
          name="description" 
          content="Join CentralImpact's mission to empower entrepreneurs in Central Asia. Discover volunteer opportunities, partnerships, and ways to support our cause." 
        />
        <meta 
          name="keywords" 
          content="volunteer opportunities, partnerships, support entrepreneurs, Central Asia development, community involvement, social impact" 
        />
        <meta property="og:title" content="Get Involved with CentralImpact - Make a Difference" />
        <meta property="og:description" content="Support our mission to empower entrepreneurs and transform communities across Central Asia." />
      </Helmet>

      <main className="min-h-screen py-20" role="main">
        <div className="container mx-auto px-4">
          <section className="mb-16" aria-labelledby="volunteer-heading">
            <h1 id="volunteer-heading" className="text-4xl font-bold text-gray-900 mb-8">Get Involved</h1>
            <p className="text-lg text-gray-600 mb-6">
              At CentralImpact, we believe in the power of community. Join us in our mission to empower entrepreneurs across Central Asia.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Whether you're looking to volunteer your time, partner with us, or support our initiatives, there are many ways to get involved.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Volunteer Opportunities</h2>
            <p className="text-lg text-gray-600 mb-6">
              We are always looking for passionate individuals to join our team as volunteers. Your skills and time can make a significant impact in the lives of entrepreneurs we serve.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              If you're interested in volunteering, please reach out to us for more information on available opportunities.
            </p>
          </section>

          <section className="mb-16" aria-labelledby="partnership-heading">
            <h2 id="partnership-heading" className="text-3xl font-bold text-gray-900 mb-6">Partnership Opportunities</h2>
            <p className="text-lg text-gray-600 mb-6">
              CentralImpact is committed to building strong partnerships with organizations that share our vision of empowering entrepreneurs. Together, we can create sustainable change in Central Asia.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              If your organization is interested in partnering with us, please contact us to discuss potential collaboration opportunities.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default GetInvolved;
