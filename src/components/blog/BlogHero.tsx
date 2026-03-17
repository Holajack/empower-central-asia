
import { useRegion } from "@/contexts/RegionContext";

const BlogHero = () => {
  const { isCentralAsia } = useRegion();

  return (
    <div className="bg-[#1B2A4A] text-white py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {isCentralAsia ? "Идеи для предпринимателей" : "Entrepreneurship Insights"}
        </h1>
        <p className="text-xl md:max-w-2xl">
          {isCentralAsia
            ? "Практические советы и истории успеха о создании устойчивого бизнеса, с фокусом на поддержку предпринимателей в развивающихся экономиках."
            : "Explore practical advice and success stories on building sustainable businesses, with a focus on empowering entrepreneurs in developing economies."}
        </p>
      </div>
    </div>
  );
};

export default BlogHero;
