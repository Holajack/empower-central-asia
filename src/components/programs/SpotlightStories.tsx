
import { Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { testimonials } from "@/data/testimonials";
import { useRegion } from "@/contexts/RegionContext";

const spotlightNames = ["Asel K.", "Timur M."];
const spotlightTestimonials = testimonials.filter(t =>
  spotlightNames.includes(t.name)
);

// Russian translations for spotlight testimonials
const spotlightTranslations: Record<string, {
  business?: string;
  before?: string;
  after?: string;
  quote: string;
}> = {
  "Asel K.": {
    business: "Handcraft Collective, Бишкек",
    before: "Неформальный ремесленник с нестабильным доходом",
    after: "Зарегистрированный бизнес, дающий работу 3 женщинам",
    quote: "До программы у меня были навыки, но я понятия не имела, как превратить их в доход. BBB научила меня составлению бюджета, ценообразованию и тому, как управлять бизнесом. Теперь я даю работу трём другим женщинам из нашего района.",
  },
  "Timur M.": {
    business: "FreshRoute Delivery, Алматы",
    before: "Безработный с растущими долгами",
    after: "Владелец бизнеса без долгов, более 200 клиентов в неделю",
    quote: "Я тонул в долгах и чувствовал себя в ловушке. Курс по финансовой грамотности дал мне чёткий план — я погасил все долги за восемь месяцев и запустил службу доставки, которая сейчас обслуживает более 200 клиентов в неделю.",
  },
};

const SpotlightStories = () => {
  const { isCentralAsia } = useRegion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`space-y-8 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {isCentralAsia ? "Люди, прошедшие этот путь" : "People Who Walked This Path"}
            </h2>
            <p className="text-gray-600">
              {isCentralAsia
                ? "Реальные люди. Реальный бизнес. Построен с нуля по четырёхэтапной модели BBB."
                : "Real people. Real businesses. Built from the ground up through BBB's four-stage model."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {spotlightTestimonials.map((testimonial, index) => {
              const translation = spotlightTranslations[testimonial.name];
              const displayBusiness = isCentralAsia && translation?.business
                ? translation.business
                : testimonial.business;
              const displayBefore = isCentralAsia && translation?.before
                ? translation.before
                : testimonial.before;
              const displayAfter = isCentralAsia && translation?.after
                ? translation.after
                : testimonial.after;
              const displayQuote = isCentralAsia && translation
                ? translation.quote
                : testimonial.quote;

              return (
                <Card
                  key={index}
                  className="overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1B2A4A]">
                          {testimonial.name}
                        </h3>
                        {displayBusiness && (
                          <p className="text-sm text-gray-600">{displayBusiness}</p>
                        )}
                      </div>
                    </div>
                    {displayBefore && displayAfter && (
                      <div className="flex gap-4 mb-4 text-sm">
                        <div className="flex-1 bg-gray-100 rounded-lg p-3">
                          <span className="font-medium text-gray-500 block mb-1">
                            {isCentralAsia ? "До" : "Before"}
                          </span>
                          <span className="text-gray-700">{displayBefore}</span>
                        </div>
                        <div className="flex-1 bg-[#C9922A]/10 rounded-lg p-3">
                          <span className="font-medium text-[#C9922A] block mb-1">
                            {isCentralAsia ? "После" : "After"}
                          </span>
                          <span className="text-gray-700">{displayAfter}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-4">
                      <Quote className="w-8 h-8 text-[#C9922A]/40 flex-shrink-0" />
                      <p className="text-gray-600 italic">{displayQuote}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/success-stories">
              <Button
                variant="outline"
                className="border-[#1B2A4A]/30 text-[#1B2A4A] hover:bg-gray-50"
              >
                {isCentralAsia ? "Читать больше историй" : "Read More Stories"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightStories;
