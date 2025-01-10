import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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

  const { ref: teamRef, inView: teamInView } = useInView({
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

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Executive Director",
      bio: "With over 15 years of experience in international development, Sarah leads our mission to empower entrepreneurs across Central Asia.",
      image: "/photo-1581092795360-fd1ca04f0952",
      initials: "SC",
    },
    {
      name: "Azamat Kulov",
      role: "Regional Director",
      bio: "Born and raised in Bishkek, Azamat brings deep local knowledge and a passion for community development to our programs.",
      image: "/photo-1581091226825-a6a2a5aee158",
      initials: "AK",
    },
    {
      name: "Dr. Maria Santos",
      role: "Program Director",
      bio: "An expert in microfinance and sustainable development, Maria designs and oversees our entrepreneurship training programs.",
      image: "/photo-1605810230434-7631ac76ec81",
      initials: "MS",
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

        {/* Team Section */}
        <section
          ref={teamRef}
          className={`transition-all duration-700 ${
            teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-semibold text-sage-500 mb-8 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-sage-200 hover:border-sage-300 transition-colors"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage
                      src={member.image}
                      alt={member.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-sage-200 text-sage-700">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-sage-500 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sage-400 mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
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