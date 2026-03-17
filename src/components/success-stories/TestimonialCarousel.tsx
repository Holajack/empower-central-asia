
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRegion } from "@/contexts/RegionContext";

interface Testimonial {
  name: string;
  business?: string; // Made business optional
  quote: string;
  image: string;
  before?: string;
  after?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  inView: boolean;
}

// Russian translations for testimonial quotes and business names
const testimonialTranslations: Record<string, { quote: string; business?: string }> = {
  "Asel K.": {
    business: "Handcraft Collective, Бишкек",
    quote: "До программы у меня были навыки, но я понятия не имела, как превратить их в доход. BBB научила меня составлению бюджета, ценообразованию и тому, как управлять бизнесом. Теперь я даю работу трём другим женщинам из нашего района.",
  },
  "Timur M.": {
    business: "FreshRoute Delivery, Алматы",
    quote: "Я тонул в долгах и чувствовал себя в ловушке. Курс по финансовой грамотности дал мне чёткий план — я погасил все долги за восемь месяцев и запустил службу доставки, которая сейчас обслуживает более 200 клиентов в неделю.",
  },
  "Nargiza S.": {
    business: "Digital Marketing Studio, Ташкент",
    quote: "Businesses Beyond Borders помогли мне понять, что предпринимательство возможно даже в Узбекистане. Наставничество и семинары по созданию бизнеса дали мне уверенность и план для запуска.",
  },
  "Daniyar R.": {
    quote: "Курс полностью изменил моё отношение к деньгам. Я перешёл от трат всего заработанного к наличию плана сбережений, резервного фонда и небольших инвестиций. Будущее моей семьи теперь выглядит совершенно иначе.",
  },
};

const TestimonialCarousel = ({ testimonials, inView }: TestimonialCarouselProps) => {
  const { isCentralAsia } = useRegion();

  return (
    <section
      className={`py-16 px-4 md:px-6 lg:px-8 bg-white transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#1B2A4A]">
          {isCentralAsia ? "Что говорят предприниматели" : "What Entrepreneurs Say"}
        </h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const translation = testimonialTranslations[testimonial.name];
              const displayQuote = isCentralAsia && translation ? translation.quote : testimonial.quote;
              const displayBusiness = isCentralAsia && translation?.business
                ? translation.business
                : testimonial.business;

              return (
                <CarouselItem key={index}>
                  <Card className="mx-4">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
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
                          <CardTitle>{testimonial.name}</CardTitle>
                          {displayBusiness && (
                            <CardDescription>{displayBusiness}</CardDescription>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <Quote className="w-8 h-8 text-muted-foreground" />
                        <p className="text-lg">{displayQuote}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
