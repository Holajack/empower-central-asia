import { Helmet } from "react-helmet";

const ProgramsAndImpact = () => {
  return (
    <>
      <Helmet>
        <title>Programs & Impact | CentralImpact - Business Development Initiatives</title>
        <meta 
          name="description" 
          content="Explore CentralImpact's entrepreneurship programs and their impact on Central Asian communities. From business training to financial literacy workshops." 
        />
        <meta 
          name="keywords" 
          content="entrepreneurship programs, business training, financial literacy, Central Asia development, impact assessment, community transformation" 
        />
        <meta property="og:title" content="CentralImpact Programs - Transforming Central Asian Communities" />
        <meta property="og:description" content="Discover our impactful programs fostering entrepreneurship and sustainable development across Central Asia." />
      </Helmet>

      <main className="min-h-screen py-20" role="main">
        <div className="container mx-auto px-4">
          <section className="mb-16" aria-labelledby="programs-heading">
            <h1 id="programs-heading" className="text-4xl font-bold text-gray-900 mb-8">Our Programs</h1>
            <p className="text-lg text-gray-600 mb-6">
              At CentralImpact, we offer a variety of programs designed to empower entrepreneurs and foster sustainable business practices. Our initiatives include workshops, mentorship, and access to resources that help individuals turn their ideas into successful ventures.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Business Training Workshops</li>
              <li>Financial Literacy Programs</li>
              <li>Mentorship and Coaching</li>
              <li>Networking Opportunities</li>
            </ul>
          </section>

          <section className="mb-16" aria-labelledby="impact-heading">
            <h2 id="impact-heading" className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our programs have made a significant impact on the communities we serve. Through our initiatives, we have helped numerous entrepreneurs launch and grow their businesses, leading to job creation and economic development in the region.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Here are some of the key metrics that highlight our impact:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Over 500 entrepreneurs trained</li>
              <li>75% of participants reported increased business revenue</li>
              <li>Partnerships with local organizations to enhance program reach</li>
              <li>Continuous support and follow-up for program graduates</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default ProgramsAndImpact;
