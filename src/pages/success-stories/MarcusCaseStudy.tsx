import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig } from "@/lib/seo";

const DATA = {
  title: "Tech Innovation in Rural Areas",
  titleRu: "Технологические инновации в сельской местности",
  description: "Marcus brought affordable internet solutions to underserved communities.",
  descriptionRu: "Маркус принёс доступный интернет в малообеспеченные сообщества.",
  image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  impact: "Connected 1000+ households",
  impactRu: "Подключено более 1000 домохозяйств",
};

const MarcusCaseStudy = () => {
  const { isCentralAsia } = useRegion();

  const pageTitle = isCentralAsia ? DATA.titleRu : DATA.title;
  const pageDesc = isCentralAsia ? DATA.descriptionRu : DATA.description;

  return (
    <>
      <Helmet>
        <title>{pageTitle} | BBB</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.url}/success-stories/case-study-marcus`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteConfig.url}/success-stories/case-study-marcus`} />
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
                  Маркус вырос в обширном сельском регионе, где интернет был роскошью, которую мало кто мог себе позволить. Его детство было отмечено вечерами за уроками при тусклом свете и долгими поездками до ближайшей городской библиотеки только ради доступа к медленным, ненадёжным компьютерам. Во время учёбы в университете — далеко от дома — Маркус открыл для себя безграничные возможности интернета и осознал глубокое цифровое неравенство, с которым продолжали сталкиваться он и его соседи дома. Решив преодолеть этот разрыв, Маркус вернулся на родину после окончания учёбы, привезя с собой не только технические навыки, но и видение того, как подключить всё своё сообщество к миру.
                </p>
                <p className="text-gray-600 mt-2">
                  Путь оказался далеко не простым. Маркус столкнулся со скептицизмом сельчан — многие никогда не пользовались интернетом, и большинство считало его слишком дорогим или сложным, чтобы быть полезным. Технических трудностей тоже хватало: пересечённая местность для прокладки кабеля, частые перебои с электричеством и почти полное отсутствие инфраструктуры. Тем не менее Маркус не сдавался. Он провёл месяцы в переговорах с местными руководителями, организовывал общественные встречи и внимательно выслушивал опасения людей. Он наладил партнёрство с международными некоммерческими организациями и договорился с поставщиками оборудования о доступных ценах на маршрутизаторы и спутниковые ресиверы. Маркус даже обучил команду местной молодёжи, превратив их в первых «цифровых послов» своих сёл и дав им нужные навыки и рабочие места.
                </p>
                <p className="text-gray-600 mt-2">
                  Творчески сочетая микрозаймы, общественные сборы средств и поддержку государственных грантов, Маркус и его растущая команда постепенно начали разворачивать доступное решение для подключения к сети. Они установили ретрансляторы на солнечных панелях и создали интернет-узлы в школах, медицинских учреждениях и кооперативных центрах — местах, центральных в повседневной жизни. С каждой неделей всё больше домохозяйств выходили в сеть; вскоре дети могли посещать онлайн-занятия, фермеры проверяли прогнозы погоды и рыночные цены, а семьи впервые связывались с близкими, живущими далеко. Истории разлетались по округе: первый онлайн-бизнес в районе, бабушка, видеозвонящая своей дочери за рубежом, подростки, получающие стипендии после онлайн-подготовки заявок на конкурсы, организованной мастерскими Маркуса.
                </p>
                <p className="text-gray-600 mt-2">
                  Сегодня компания Маркуса подключила к доступному высокоскоростному интернету более тысячи сельских домохозяйств — преобразование, которое меняет будущее сообщества. Помимо технологий, Маркус породил волну новых возможностей: онлайн-образование, удалённая работа, цифровое предпринимательство и низовые социальные изменения. Главная гордость для него — не только технические достижения, но и то, что соседи, которые когда-то чувствовали себя изолированными, теперь с гордостью учат других, открывают собственные предприятия и строят более светлое, более связанное завтра. История Маркуса — мощное свидетельство инноваций, движимых сердцем, и способности одного человека поднять целые сообщества благодаря настойчивости, сочувствию и видению лучшего мира.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600">
                  Marcus grew up in a sprawling rural region where internet was a luxury that few could afford. His childhood was marked by evenings doing homework in the dim light and long treks to the nearest town library just to access slow, unreliable computers. While studying technology at university—far from home—Marcus encountered endless opportunity online, and realized the stark digital divide he and his neighbors still faced back home. Determined to close this gap, Marcus returned to his roots after graduation, bringing with him not only his technical skills, but also a vision for connecting his entire community to the world.
                </p>
                <p className="text-gray-600 mt-2">
                  The journey was anything but easy. Marcus faced skepticism from villagers—many had never used the internet, and most believed it was too expensive or complicated to ever be useful. There were a thousand technical challenges too: rough terrain for laying cable, frequent power outages, and near-zero infrastructure. Nevertheless, Marcus persisted. He spent months meeting with local leaders, holding community forums, and listening to people's concerns. He partnered with international nonprofits and negotiated with hardware suppliers for affordable routers and satellite receivers. Marcus even trained a team of local youth, turning them into the first "digital ambassadors" for their villages, equipping them with much-needed skills and employment.
                </p>
                <p className="text-gray-600 mt-2">
                  By creatively combining micro-loans, community fundraising, and support from government grants, Marcus and his growing team slowly began rolling out their affordable connectivity solution. They installed solar-powered relays and established internet hubs in schools, health clinics, and cooperative centers—places central to daily life. With each week, more households came online; soon, children could attend online classes, farmers checked weather patterns and market prices, and families communicated with loved ones far away for the first time. Stories spread: the first online small business in the area, a grandmother video-calling her daughter abroad, teenagers winning scholarships after online application prep provided by Marcus's workshops.
                </p>
                <p className="text-gray-600 mt-2">
                  Today, Marcus's company has connected over a thousand rural households to affordable, high-speed internet—a transformation that is reshaping the community's future. Beyond technology, Marcus has sparked a wave of new possibilities: online education, remote work, digital entrepreneurship, and grassroots social change. His greatest pride comes not from the technical achievements alone, but from seeing neighbors who once felt isolated now proudly teaching others, launching their own ventures, and building a brighter, more connected tomorrow. Marcus's journey is a powerful testament to innovation guided by heart, and to one person's ability to lift up entire communities through perseverance, empathy, and a vision for a better world.
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
            <Link to="/programs/business-creation" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
              <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Создание бизнеса" : "Business Creation"}</p>
              <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Программа →" : "Program →"}</p>
            </Link>
            <Link to="/course/business-creation" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
              <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Курс создания бизнеса" : "Business Creation Course"}</p>
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

export default MarcusCaseStudy;
