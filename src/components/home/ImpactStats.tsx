import StatCard from "../StatCard";

const ImpactStats = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard number={500} label="Entrepreneurs Trained" delay={0} />
          <StatCard number={10} label="Communities Served" suffix="+" delay={200} />
          <StatCard number={85} label="Success Rate" suffix="%" delay={400} />
          <StatCard number={1200} label="Jobs Created" delay={600} />
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;