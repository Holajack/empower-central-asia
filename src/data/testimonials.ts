export interface Testimonial {
  name: string;
  business?: string;
  quote: string;
  image: string;
  before?: string;
  after?: string;
  quoteRu?: string;
  businessRu?: string;
  beforeRu?: string;
  afterRu?: string;
}

export function getLocalizedTestimonial(t: Testimonial, isCentralAsia: boolean) {
  return {
    ...t,
    displayQuote: isCentralAsia && t.quoteRu ? t.quoteRu : t.quote,
    displayBusiness: isCentralAsia && t.businessRu ? t.businessRu : t.business,
    displayBefore: isCentralAsia && t.beforeRu ? t.beforeRu : t.before,
    displayAfter: isCentralAsia && t.afterRu ? t.afterRu : t.after,
  };
}

export const testimonials: Testimonial[] = [
  {
    name: "Asel K.",
    business: "Handcraft Collective, Bishkek",
    businessRu: "Коллектив ремесленников, Бишкек",
    quote: "Before the program, I had skills but no idea how to turn them into income. BBB taught me budgeting, pricing, and how to actually run a business. Now I employ three other women from my neighborhood.",
    quoteRu: "До программы у меня были навыки, но я не знала, как превратить их в доход. BBB научила меня бюджетированию, ценообразованию и тому, как вести бизнес. Теперь я даю работу трём женщинам из моего района.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    before: "Informal craftworker with inconsistent income",
    beforeRu: "Неофициальная ремесленница с нестабильным доходом",
    after: "Registered business employing 3 women",
    afterRu: "Зарегистрированный бизнес, 3 сотрудницы",
  },
  {
    name: "Timur M.",
    business: "FreshRoute Delivery, Almaty",
    businessRu: "Доставка FreshRoute, Алматы",
    quote: "I was drowning in debt and felt trapped. The financial literacy course gave me a clear plan -- I paid off everything in eight months and launched a delivery service that now serves over 200 customers a week.",
    quoteRu: "Я тонул в долгах и чувствовал себя в ловушке. Курс финансовой грамотности дал мне чёткий план — я выплатил всё за восемь месяцев и запустил службу доставки, которая сейчас обслуживает более 200 клиентов в неделю.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    before: "Unemployed with mounting debt",
    beforeRu: "Безработный с растущими долгами",
    after: "Debt-free business owner, 200+ weekly customers",
    afterRu: "Владелец бизнеса без долгов, 200+ клиентов в неделю",
  },
  {
    name: "Nargiza S.",
    business: "Digital Marketing Studio, Tashkent",
    businessRu: "Студия цифрового маркетинга, Ташкент",
    quote: "Businesses Beyond Borders helped me see that entrepreneurship was possible even in Uzbekistan. The mentorship and business creation workshops gave me the confidence and the plan I needed to launch.",
    quoteRu: "Businesses Beyond Borders помогла мне увидеть, что предпринимательство возможно даже в Узбекистане. Наставничество и мастер-классы по созданию бизнеса дали мне уверенность и план, которые были нужны для старта.",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd",
  },
  {
    name: "Daniyar R.",
    quote: "The course changed how I think about money entirely. I went from spending everything I earned to having a savings plan, an emergency fund, and a small investment. My family's future looks completely different now.",
    quoteRu: "Курс полностью изменил моё отношение к деньгам. Раньше я тратил всё, что зарабатывал, а теперь у меня есть план накоплений, резервный фонд и небольшие инвестиции. Будущее моей семьи выглядит совершенно иначе.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
];
