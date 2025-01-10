import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref: missionRef, inView: missionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const coreValues = [
    {
      title: "Inclusivity",
      description:
        "Creating opportunities for all, regardless of background or experience.",
    },
    {
      title: "Innovation",
      description:
        "Embracing creative solutions to address complex economic challenges.",
    },
    {
      title: "Community",
      description:
        "Building strong networks that foster collaboration and mutual support.",
    },
    {
      title: "Sustainability",
      description:
        "Promoting long-term economic growth that benefits future generations.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative h-[40vh] bg-sage-100">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Our Story
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Background Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-sage-500 mb-6">
            Our Background
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Businesses Beyond Borders emerged from a simple yet powerful vision: to
            create sustainable economic opportunities in Central Asia. Founded in
            2015, our organization began by partnering with local communities to
            understand their unique challenges and aspirations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            What started as a small initiative has grown into a comprehensive
            platform that equips entrepreneurs with the skills, resources, and
            networks they need to thrive in today's global economy.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section
          ref={missionRef}
          className={`max-w-3xl mx-auto space-y-12 transition-all duration-700 ${
            missionInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <h2 className="text-3xl font-semibold text-sage-500 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To empower entrepreneurs in Central Asia through comprehensive
              business education, leadership development, and community support,
              fostering sustainable economic growth and positive social impact.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-sage-500 mb-6">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We envision thriving communities across Central Asia where local
              entrepreneurs lead the way in creating sustainable businesses,
              generating employment opportunities, and building resilient local
              economies.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section
          ref={valuesRef}
          className={`transition-all duration-700 ${
            valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-semibold text-sage-500 mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="border-sage-200 hover:border-sage-300 transition-colors"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-sage-500 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;