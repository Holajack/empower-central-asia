interface HeroSectionProps {
  inView: boolean;
}

const HeroSection = ({ inView }: HeroSectionProps) => {
  return (
    <section
      className={`pt-24 pb-12 px-4 md:px-6 lg:px-8 transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover how Businesses Beyond Borders has helped entrepreneurs transform
          their dreams into reality.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;