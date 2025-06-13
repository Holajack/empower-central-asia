
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
      title: "Integrity & Accountability",
      description:
        "Building trust through transparent actions and taking responsibility for our commitments to the communities we serve.",
    },
    {
      title: "Leadership & Empowerment",
      description:
        "Developing leaders within communities who can drive sustainable change and empower others to reach their potential.",
    },
    {
      title: "Excellence & Impact",
      description:
        "Striving for the highest quality in everything we do, ensuring our efforts create meaningful and lasting transformation.",
    },
    {
      title: "Collaboration & Partnership",
      description:
        "Working together with local communities, global partners, and stakeholders to build solutions that work for everyone.",
    },
  ];

  const teamMembers = [
    {
      name: "Jacken Holland",
      role: "CEO & Owner",
      bio: "With over 15 years of experience in international development, Jacken leads our mission to empower entrepreneurs across Central Asia.",
      image: "/photo-1581092795360-fd1ca04f0952",
      initials: "JH",
    },
    {
      name: "Yeva Romanova",
      role: "COO",
      bio: "Born and raised in Bishkek, Yeva brings deep local knowledge and a passion for community development to our programs.",
      image: "/photo-1581091226825-a6a2a5aee158",
      initials: "YR",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div 
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            From Vision to Reality
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            Empowering People to Stay and Build
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Background Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-sage-500 mb-6">
            Our Story
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="leading-relaxed">
              Businesses Beyond Borders was officially founded in 2022, but the heart behind it began long before. Years before the paperwork, there was a burden. A quiet conviction. A belief that people in low-income, high-risk regions deserve more than survival—they deserve the tools, the knowledge, and the support to <em>thrive</em>.
            </p>
            <p className="leading-relaxed">
              We saw what was happening—people leaving their homes, their communities, and even their countries in search of something better. But what if <em>better</em> could be built right where they are?
            </p>
            <p className="leading-relaxed font-medium text-sage-600">
              What if the solution wasn't found across a border… but <strong>within</strong> the community itself?
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section
          ref={missionRef}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            missionInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-semibold text-sage-500 mb-6">
            What We Do
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="leading-relaxed">
              Since 2022, we've walked alongside:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>15+ families</strong>, teaching financial literacy from the kitchen table to the marketplace.</li>
              <li><strong>100+ children</strong>, benefiting from more stable, supportive home environments.</li>
              <li><strong>6+ businesses</strong>, now launched and sustained through training and micro-loans—with loans already repaid in full.</li>
            </ul>
            <p className="leading-relaxed">
              We don't just hold seminars—we walk through every step of business development:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li>• Brainstorming ideas</li>
              <li>• Writing business plans</li>
              <li>• Offering mentorship and financial training</li>
              <li>• Connecting locals with regional and global partners</li>
            </ul>
            <p className="leading-relaxed font-medium text-sage-600">
              We activate vision. Equip with tools. Empower transformation.
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

        {/* Why We Do It Section */}
        <section className="max-w-3xl mx-auto bg-sage-50 p-8 rounded-lg">
          <h2 className="text-3xl font-semibold text-sage-500 mb-6">
            Why We Do It
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="leading-relaxed">
              Most people don't leave their homes because they want to—they leave because they feel they have no choice.
            </p>
            <p className="leading-relaxed">
              But when local individuals are empowered with education, tools, and support, they begin to see a new future. One built not out of desperation, but out of purpose and potential.
            </p>
            <p className="leading-relaxed font-medium text-sage-600">
              Our work is about more than economics—it's about <em>transformation</em> from the inside out.
            </p>
          </div>
        </section>

        {/* How You Can Help Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-sage-500 mb-6">
            How You Can Help
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="leading-relaxed font-medium">
              We can't do this alone.
            </p>
            <p className="leading-relaxed">
              You can partner with us by:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li>• Donating to fund micro-loans and education</li>
              <li>• Sponsoring entrepreneurs and families</li>
              <li>• Volunteering or helping lead programs</li>
              <li>• Joining us on future trips</li>
            </ul>
            <p className="leading-relaxed">
              When you partner with us, you're helping build something that lasts—for families, for futures, and for entire communities.
            </p>
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
          <div className="w-full mx-auto flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex-[1_1_300px] max-w-xs min-w-[250px] flex justify-center"
              >
                <Card className="w-full border-sage-200 hover:border-sage-300 transition-colors flex flex-col items-center">
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
              </div>
            ))}
          </div>
        </section>

        {/* Closing Statement */}
        <section className="max-w-3xl mx-auto text-center">
          <p className="text-xl font-medium text-sage-600 italic">
            Let's go beyond borders—together.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
