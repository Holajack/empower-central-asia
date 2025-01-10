import { Helmet } from "react-helmet";

const SuccessStories = () => {
  return (
    <>
      <Helmet>
        <title>Success Stories | CentralImpact - Entrepreneur Testimonials</title>
        <meta 
          name="description" 
          content="Read inspiring success stories from entrepreneurs who have transformed their businesses through CentralImpact's programs in Central Asia." 
        />
        <meta 
          name="keywords" 
          content="success stories, entrepreneur testimonials, Central Asia business, community impact, business transformation, entrepreneurship success" 
        />
        <meta property="og:title" content="CentralImpact Success Stories - Real Entrepreneur Transformations" />
        <meta property="og:description" content="Discover how entrepreneurs across Central Asia have achieved success through our programs and support." />
      </Helmet>

      <main className="min-h-screen py-20" role="main">
        <div className="container mx-auto px-4">
          <section aria-labelledby="stories-heading">
            <h1 id="stories-heading" className="text-4xl font-bold text-gray-900 mb-8">Success Stories</h1>
            <article className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800">Story of Amina</h2>
              <p className="text-lg text-gray-600">
                Amina, a young entrepreneur from Kyrgyzstan, started her own handicraft business with the help of CentralImpact's training programs. Through our workshops, she learned essential business skills and gained access to a network of mentors. Today, Amina's products are sold in local markets and online, empowering her community and inspiring others.
              </p>
            </article>
            <article className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800">Success of Timur</h2>
              <p className="text-lg text-gray-600">
                Timur, a former participant in our financial literacy program, transformed his family's grocery store into a thriving business. With the knowledge gained from our sessions, he implemented effective budgeting and marketing strategies, leading to a significant increase in sales and customer satisfaction.
              </p>
            </article>
            <article className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800">Fatima's Journey</h2>
              <p className="text-lg text-gray-600">
                Fatima, a passionate baker from Tajikistan, turned her hobby into a successful bakery business. With CentralImpact's support, she received training in business management and marketing. Her bakery now serves delicious pastries to the local community and has become a beloved spot for residents and visitors alike.
              </p>
            </article>
          </section>
        </div>
      </main>
    </>
  );
};

export default SuccessStories;
