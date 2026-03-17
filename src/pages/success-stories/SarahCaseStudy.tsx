import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig } from "@/lib/seo";

const DATA = {
  title: "From Market Stall to Market Leader",
  titleRu: "От рыночного лотка — к лидеру рынка",
  description: "How Sarah transformed her local produce stand into a sustainable business empire.",
  descriptionRu: "Как Сара превратила небольшой овощной лоток в устойчивую бизнес-империю.",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  impact: "Created 50+ jobs in the community",
  impactRu: "Создано более 50 рабочих мест в сообществе",
};

const SarahCaseStudy = () => {
  const { isCentralAsia } = useRegion();

  const pageTitle = isCentralAsia ? DATA.titleRu : DATA.title;
  const pageDesc = isCentralAsia ? DATA.descriptionRu : DATA.description;

  return (
    <>
      <Helmet>
        <title>{pageTitle} | BBB</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.url}/success-stories/case-study-sarah`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteConfig.url}/success-stories/case-study-sarah`} />
        <meta property="og:image" content={DATA.image} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={DATA.image} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: pageTitle,
          description: pageDesc,
          image: DATA.image,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: siteConfig.logo } },
        })}</script>
      </Helmet>
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-28">
      <div className="container mx-auto px-4 py-8">
        <Link to="/success-stories" className="text-[#C9922A] hover:text-[#C9922A]/80 flex items-center gap-2 mb-6 md:mb-8">
          <ArrowLeft size={16} />
          {isCentralAsia ? "Назад к историям успеха" : "Back to Success Stories"}
        </Link>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
          <img
            src={DATA.image}
            alt={isCentralAsia ? DATA.titleRu : DATA.title}
            width={800}
            height={256}
            loading="lazy"
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-[#1B2A4A] mb-4">
              {isCentralAsia ? DATA.titleRu : DATA.title}
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              {isCentralAsia ? DATA.descriptionRu : DATA.description}
            </p>
            <div className="bg-[#1B2A4A]/5 p-4 rounded mb-4">
              <div className="font-semibold text-[#1B2A4A]">
                {isCentralAsia ? "Результат:" : "Impact:"}
              </div>
              <div className="text-gray-600">
                {isCentralAsia ? DATA.impactRu : DATA.impact}
              </div>
            </div>
            {isCentralAsia ? (
              <>
                <p className="text-gray-600">
                  Сара Чен выросла в небольшом сельскохозяйственном городке, работая после школы на скромном овощном лотке своей семьи на местном базаре. Лоток представлял собой лишь стол и несколько ящиков с овощами, но даже в детстве Сара мечтала о большем — о том, чтобы помочь семье процветать, а не просто выживать. Она видела, как родители из года в год преодолевают трудности: непредсказуемая погода, растущие расходы, жёсткая конкуренция. Тем не менее Сара всегда чувствовала: при наличии нужных навыков и поддержки они смогут превратить своё скромное начало во что-то гораздо большее.
                </p>
                <p className="text-gray-600 mt-2">
                  Полная решимости найти лучший путь, Сара начала искать новые возможности. Её жизнь изменилась, когда она узнала о программе наставничества Businesses Beyond Borders. Благодаря специализированным семинарам и практическому обучению она освоила навыки анализа рынка, финансового управления и цифрового маркетинга. Сара научилась отслеживать сезонные тенденции и поведение покупателей, что позволило ей адаптировать ассортимент лотка под реальные потребности клиентов. Она также получила поддержку от опытных женщин-предпринимателей, которые вдохновили её представить более широкие горизонты для своего дела.
                </p>
                <p className="text-gray-600 mt-2">
                  Применяя полученные знания на практике, Сара постепенно превратила рыночный лоток в процветающий бизнес. Она начала предлагать не просто свежие овощи, но и продукты с добавленной стоимостью — варенье, соленья и свежие салаты, приготовленные по традиционным рецептам с современным подходом. Освоив брендинг, Сара ввела экологичную упаковку и начала продвигать свою продукцию в социальных сетях, привлекая новых покупателей из соседних районов. По мере роста спроса она стала нанимать женщин из своего сообщества, обеспечивая им стабильный доход и возможности, которых у них прежде никогда не было.
                </p>
                <p className="text-gray-600 mt-2">
                  Сегодня компания Сары признана образцом устойчивого бизнеса в своём регионе. Она отстаивает экологически осознанные практики — компостирование отходов и поддержку местных производителей — и регулярно наставляет других начинающих предпринимателей. Помимо финансового успеха, Сара с гордостью создала более 50 рабочих мест в родном городе, положительно изменив жизнь многих семей. Её история — свидетельство того, что происходит, когда целеустремлённость встречает правильную поддержку: путь от рыночного лотка до лидера рынка, вдохновляющий новое поколение мечтать смелее и строить более крепкие сообщества.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600">
                  Sarah Chen grew up in a small agricultural town, working after school at her family's modest produce stall in the local bazaar. The stall was little more than a table and a few crates of vegetables, but even as a child, Sarah dreamed of more—of helping her family thrive, not just survive. She watched her parents struggle season after season, facing unpredictable weather, rising costs, and fierce competition. Yet, Sarah always sensed that with the right skills and support, they could turn their humble beginnings into something far greater.
                </p>
                <p className="text-gray-600 mt-2">
                  Determined to find a better path, Sarah looked for new opportunities. Her journey changed course when she discovered the Businesses Beyond Borders mentorship program. Through tailored workshops and hands-on learning, she developed skills in market analysis, financial management, and digital marketing. Sarah learned to track seasonal trends and buyer behavior, which helped her adjust the stall's offerings to better match customer needs. She also found guidance from experienced women entrepreneurs who encouraged Sarah to visualize bigger possibilities for her business.
                </p>
                <p className="text-gray-600 mt-2">
                  Applying what she learned, Sarah gradually expanded the market stall into a thriving business. She began offering not just raw produce, but value-added products such as jams, pickles, and fresh salads, using traditional recipes with a modern twist. With a new eye for branding, Sarah introduced eco-friendly packaging and promoted her products on social media, attracting a new wave of customers from neighboring regions. As demand grew, she hired women from her community, providing them with stable incomes and opportunities they never had before.
                </p>
                <p className="text-gray-600 mt-2">
                  Today, Sarah's company is recognized as a model of sustainable business in her area. She champions environmentally conscious practices, like composting waste and supporting local growers, and regularly mentors other aspiring entrepreneurs. Beyond just financial success, Sarah is proud to have created over 50 jobs in her hometown, positively impacting countless families. Her story is a testament to what can happen when determination meets the right support network—a journey from market stall to market leader, inspiring a new generation to dream bigger and build stronger communities.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Related Programs */}
        <div className="max-w-3xl mx-auto mt-8">
          <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">
            {isCentralAsia ? "Связанные программы" : "Related Programs"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/programs/financial-literacy" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
              <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Финансовая грамотность" : "Financial Literacy"}</p>
              <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Программа →" : "Program →"}</p>
            </Link>
            <Link to="/course/financial-literacy" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
              <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Курс финансовой грамотности" : "Financial Literacy Course"}</p>
              <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Бесплатный курс →" : "Free course →"}</p>
            </Link>
            <Link to="/get-involved" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
              <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Участвовать" : "Get Involved"}</p>
              <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SarahCaseStudy;

