
import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Globe, Users, TrendingUp, Heart, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/contexts/RegionContext";

const About = () => {
  const { isCentralAsia } = useRegion();

  const { ref: storyRef, inView: storyInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: whyRef, inView: whyInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: Target,
      title: isCentralAsia ? "Расширение возможностей, а не зависимость" : "Empowerment Over Dependency",
      description: isCentralAsia
        ? "Мы не раздаём подачки — мы даём инструменты, обучение и уверенность, необходимые для создания чего-то долговечного."
        : "We don't give handouts -- we give tools, training, and the confidence to build something lasting.",
    },
    {
      icon: Globe,
      title: isCentralAsia ? "Местные корни, глобальная поддержка" : "Local Roots, Global Support",
      description: isCentralAsia
        ? "Программы разработаны для общин Центральной Азии при поддержке всемирной сети волонтёров и доноров."
        : "Programs are designed for Central Asian communities with the backing of a worldwide network of volunteers and donors.",
    },
    {
      icon: TrendingUp,
      title: isCentralAsia ? "Методы, основанные на доказательствах" : "Evidence-Based Methods",
      description: isCentralAsia
        ? "Каждая программа построена на проверенных концепциях: Lean Startup, бюджетирование с нулевой базой, лидерская модель 70-20-10."
        : "Every program is built on proven frameworks -- Lean Startup, zero-based budgeting, the 70-20-10 leadership model.",
    },
    {
      icon: Heart,
      title: isCentralAsia ? "Достоинство прежде всего" : "Dignity First",
      description: isCentralAsia
        ? "Мы верим, что предпринимательство возвращает достоинство. Когда вы создаёте что-то своё, это меняет взгляд на себя и своё будущее."
        : "We believe entrepreneurship restores dignity. Building something of your own changes how you see yourself and your future.",
    },
    {
      icon: Users,
      title: isCentralAsia ? "Умножение через сообщество" : "Community Multiplication",
      description: isCentralAsia
        ? "Каждый выпускник обучен обучать других. Один предприниматель становится десятью. Одно сообщество поднимает многих."
        : "Every graduate is trained to teach others. One entrepreneur becomes ten. One community lifts many.",
    },
    {
      icon: Lightbulb,
      title: isCentralAsia ? "Прозрачность и подотчётность" : "Transparency & Accountability",
      description: isCentralAsia
        ? "100% пожертвований идут на финансирование программ. Мы открыто отчитываемся о результатах и придерживаемся самых высоких стандартов."
        : "100% of donations fund programs. We report impact openly and hold ourselves to the highest standard.",
    },
  ];

  const teamMembers = [
    {
      name: "Jacken Holland",
      role: isCentralAsia ? "Основатель и CEO" : "Founder & CEO",
      bio: isCentralAsia
        ? "Джакен родился на Гаити и был брошен при рождении. Три с половиной года он провёл в приюте, где речь шла о выживании, а не о заботе. Усыновлённый американской семьёй, он приехал в США, не зная ни языка, ни культуры, ни мира за пределами Гаити. Он получил степень в области бизнеса в Университете Центральной Флориды, побывал в девяти странах и везде видел одно и то же: люди с амбициями, но без доступа к финансовому образованию. В 23 года он основал Businesses Beyond Borders и переехал в Кыргызстан с рюкзаком, чтобы строить организацию с нуля."
        : "Jacken was born in Haiti and abandoned at birth. He spent three and a half years in an orphanage where survival -- not care -- was the daily reality. Adopted by an American family, he came to the United States knowing nothing of the language, culture, or world outside Haiti. He earned an Integrated Business degree from the University of Central Florida, traveled to nine countries, and saw the same gap everywhere: people with ambition but no access to financial training. At 23, he founded Businesses Beyond Borders and moved to Kyrgyzstan with a backpack to build it from the ground up.",
      image: "/photo-1581092795360-fd1ca04f0952",
      initials: "JH",
    },
    {
      name: "Yeva Romanova",
      role: isCentralAsia ? "Сооснователь и COO" : "Co-Founder & COO",
      bio: isCentralAsia
        ? "Родившись в Кыргызстане, Йева Романова на собственном опыте пережила экономическую нестабильность постсоветской Центральной Азии, прежде чем эмигрировала в США. В каждую программу BBB она привносит непосредственное знание культуры, опыт работы в политических кругах Вашингтона и глубокое понимание проблем, с которыми сталкиваются общины Центральной Азии."
        : "Born in Kyrgyzstan. Eight years at a DC accounting firm serving nonprofits. Five years building microloan programs on the ground while working remotely across two time zones. Yeva brings the cultural roots, the financial expertise, and the on-the-ground relationships that make BBB's programs actually work.",
      image: "/photo-1581091226825-a6a2a5aee158",
      initials: "YR",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{isCentralAsia
          ? "О нас — Наша история и миссия | Businesses Beyond Borders"
          : "About Us - Our Story & Mission | Businesses Beyond Borders"}</title>
        <meta name="description" content={isCentralAsia
          ? "Джакен Холланд, брошенный при рождении на Гаити и усыновлённый американской семьёй, основал BBB, чтобы дать другим шанс."
          : "Founded by Jacken Holland — abandoned at birth in Haiti, adopted, and driven to give others the same chance. Meet the BBB team."} />
        <meta name="keywords" content={isCentralAsia
          ? "о Businesses Beyond Borders, обучение предпринимателей Центральная Азия, некоммерческая организация, история основания"
          : "nonprofit business training Port Orange, entrepreneurship program Florida, about Businesses Beyond Borders, Central Asia development nonprofit, Jacken Holland founder, Yeva Romanova COO, Volusia County nonprofit"} />

        <meta property="og:title" content={isCentralAsia ? "О нас — Наша история и миссия" : "About Us - Our Story & Mission | Businesses Beyond Borders"} />
        <meta property="og:description" content={isCentralAsia
          ? "Брошен при рождении на Гаити. Усыновлён. Основал BBB в 23 года. Познакомьтесь с командой, стоящей за Businesses Beyond Borders."
          : "Abandoned at birth in Haiti. Adopted. Founded a nonprofit at 23 to give others the same chance. Meet the team behind Businesses Beyond Borders."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/about" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "О нас — Businesses Beyond Borders" : "About Businesses Beyond Borders - Our Story"} />
        <meta name="twitter:description" content={isCentralAsia
          ? "Брошен при рождении. Усыновлён. Основал BBB в 23 года, чтобы дать другим настоящий шанс."
          : "Abandoned at birth in Haiti. Adopted by an American family. Founded BBB at 23 to train entrepreneurs in Central Asia."} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" />

        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/about" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["NonprofitOrganization", "Organization"],
            "name": "Businesses Beyond Borders",
            "description": "Nonprofit training entrepreneurs in Central Asia through evidence-based financial literacy, business creation, and leadership development programs",
            "url": "https://businessesbeyondborders.com",
            "foundingDate": "2022",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Port Orange",
              "addressRegion": "FL",
              "postalCode": "32127",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-386-517-1527",
              "contactType": "customer support",
              "email": "donations@businessesbeyondborders.com"
            },
            "founder": [
              {
                "@type": "Person",
                "name": "Jacken Holland",
                "jobTitle": "Founder & CEO"
              },
              {
                "@type": "Person",
                "name": "Yeva Romanova",
                "jobTitle": "Co-Founder & COO"
              }
            ],
            "mission": "Businesses Beyond Borders exists to bring hope to the hopeless -- equipping diligent people to build dignified, sustainable lives through financial literacy, entrepreneurship, and opportunity."
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <div
          className="relative h-[60vh] flex items-center justify-center pt-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
              {isCentralAsia ? "Кто мы" : "Who We Are"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms]">
              {isCentralAsia
                ? "Два человека, знающих, каково начинать с нуля, — строящих организацию, чтобы другим не пришлось оставаться там."
                : "Two people who know what it's like to start with nothing -- building an organization so others don't have to stay there."}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 space-y-20">

          {/* Origin Story - Jacken */}
          <section
            ref={storyRef}
            className={`max-w-4xl mx-auto transition-all duration-700 ${
              storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-3 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#1B2A4A]/5 text-[#1B2A4A] px-4 py-1.5 rounded-full text-sm font-medium">
                  {isCentralAsia ? "История основателя" : "Founder's Story"}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {isCentralAsia
                    ? "Из гаитянского детского дома — к основанию некоммерческой организации"
                    : "From a Haitian Orphanage to Founding a Nonprofit"}
                </h2>
                <div className="prose max-w-none text-gray-700 space-y-4">
                  <p className="leading-relaxed text-lg">
                    {isCentralAsia
                      ? "Джакен Холланд родился на Гаити и был брошен при рождении. Его нашли в одной из самых опасных деревень страны — месте, где иностранцев похищали ради выкупа. Женщина, владевшая приютом в трёх часах езды, приехала в эту деревню по причинам, которые она до сих пор не может объяснить. Она нашла его больным и одиноким и сделала две вещи, которых никогда не делала ни для одного ребёнка: достала лекарства и обратилась в полицию — оба поступка, ставившие под угрозу её собственное дело."
                      : "Jacken Holland was born in Haiti and abandoned at birth. He was found in one of the most dangerous villages in the country -- a place where foreigners were routinely kidnapped for ransom. A woman who ran an orphanage three hours away traveled to that village for reasons she still can't explain. She found him sick and alone and did two things she had never done for any child: she got him medicine, and she went to the police -- both acts that put her own operation at risk."}
                  </p>
                  <p className="leading-relaxed">
                    {isCentralAsia
                      ? "Приют означал выживание, а не заботу. Детей кормили раз в несколько дней. Они пили из стоячей реки, где купали животных. Не было обуви, кроватей, чистой воды. Название деревни в переводе означает «меньше, чем ничто». Джакен провёл там три с половиной года."
                      : "The orphanage was survival, not care. Children were fed every few days. They drank from a stagnant river where animals bathed. There were no shoes, no beds, no clean water. The village's name, when translated, means \"less than nothing.\" Jacken spent three and a half years there."}
                  </p>
                  <p className="leading-relaxed">
                    {isCentralAsia
                      ? "Американская пара приехала в гуманитарную поездку. Отец — мастер-электрик — зашёл в приют и увидел толпу детей. В стороне сидел злой, замкнутый мальчик. Он прошёл мимо всех остальных, опустился на колени и взял его на руки. Впервые в жизни Джакен почувствовал себя в безопасности. Он уснул на руках незнакомца. Мужчина повернулся к жене со слезами: «Это наш ребёнок». Им было за сорок, дочери выросли, впереди была пенсия. Они решили начать всё сначала."
                      : "An American couple arrived on a humanitarian trip. The father -- a master electrician -- walked into the orphanage and saw a crowd of children. Off to the side sat one angry, resistant boy, alone. He walked straight past every other child, knelt down, and picked him up. For the first time in his life, Jacken felt safe. He fell asleep in the stranger's arms. The man turned to his wife with tears in his eyes and said, \"This is our child.\" They were in their mid-40s with grown daughters, heading toward retirement. They chose to start over."}
                  </p>
                  <p className="leading-relaxed">
                    {isCentralAsia
                      ? "Усыновление заняло два года на фоне политических потрясений. Когда Джакен прибыл в Америку, всё было новым: язык, культура, электричество, первый полёт. Но адаптация была тяжёлой — годы гнева, боли и горя. Приёмные родители никогда не требовали благодарности. Они встречали его там, где он был, и давали горевать столько, сколько нужно. Он поступил в Университет Центральной Флориды и получил степень в области бизнеса. Побывал в девяти странах и в каждой видел одно: люди с амбициями, но без доступа к финансовому образованию."
                      : "The adoption took two years through political upheaval. When Jacken arrived in America, everything was new: language, culture, electricity, his first plane ride. But the adjustment was brutal -- years of anger, loss, and grief. His adoptive parents never forced gratitude. They met him where he was and let him grieve as long as he needed. He studied business at the University of Central Florida. He traveled to nine countries and found the same gap in every one: people with drive but no access to financial education or business training."}
                  </p>
                  <p className="leading-relaxed">
                    {isCentralAsia
                      ? "В 23 года он основал Businesses Beyond Borders. Люди называли его сумасшедшим — молодой парень без денег создаёт организацию, собираясь уехать из страны. Он переехал в Кыргызстан с походным рюкзаком и начал сначала — снова. В Центральной Азии он увидел свою историю повсюду: семьи, разлучённые потому, что родители не могли найти работу, дети без отцов и матерей. BBB существует потому, что Джакен знает, каково это — получить настоящий шанс. И что происходит, когда ты его получаешь."
                      : "At 23, he founded Businesses Beyond Borders. People called him crazy -- a kid with no money starting a nonprofit while leaving the country. He moved to Kyrgyzstan with a hiking backpack and started over, again. In Central Asia, he saw his own story everywhere: families torn apart because parents couldn't find work, children growing up without fathers or mothers. BBB exists because Jacken knows what it's like to be given a real chance -- and what happens when you are."}
                  </p>
                  <p className="leading-relaxed font-medium text-gray-800">
                    {isCentralAsia
                      ? "«Я знаю, каково это — не иметь ничего и слышать, что ты — ничто. Но я также знаю, что происходит, когда один человек решает, что ты стоишь того, чтобы начать всё сначала. Это и есть BBB. Мы приходим и даём людям настоящий шанс.»"
                      : "\"I know what it's like to have nothing and to be told you are nothing. I also know what happens when one person decides you're worth starting over for. That's what BBB is. We show up, and we give people a real chance.\""}
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-[#1B2A4A]/5 rounded-2xl p-6 space-y-4">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src="/photo-1581092795360-fd1ca04f0952" alt="Jacken Holland" className="object-cover" />
                    <AvatarFallback className="bg-[#1B2A4A]/20 text-[#1B2A4A] text-2xl">JH</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">Jacken Holland</h3>
                    <p className="text-[#1B2A4A] font-medium">
                      {isCentralAsia ? "Основатель и CEO" : "Founder & CEO"}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]" />
                      {isCentralAsia ? "Родился на Гаити, брошен при рождении" : "Born in Haiti, abandoned at birth"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]" />
                      {isCentralAsia ? "3,5 года в приюте на выживание" : "Survived 3.5 years in an orphanage"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]" />
                      {isCentralAsia ? "Усыновлён американской семьёй" : "Adopted by American family"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]" />
                      {isCentralAsia ? "Степень по бизнесу, UCF" : "UCF Integrated Business degree"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]" />
                      {isCentralAsia ? "Побывал в 9 странах" : "Traveled to 9 countries"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]" />
                      {isCentralAsia ? "Основал BBB в 23 года" : "Founded BBB at age 23"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]" />
                      {isCentralAsia ? "Живёт в Центральной Азии" : "Based in Central Asia"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Yeva's Story */}
          <section className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-2 md:order-1 order-2">
                <div className="bg-[#C9922A]/5 rounded-2xl p-6 space-y-4">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src="/photo-1581091226825-a6a2a5aee158" alt="Yeva Romanova" className="object-cover" />
                    <AvatarFallback className="bg-[#C9922A]/20 text-[#C9922A] text-2xl">YR</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">Yeva Romanova</h3>
                    <p className="text-[#C9922A] font-medium">
                      {isCentralAsia ? "Сооснователь и COO" : "Co-Founder & COO"}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9922A]" />
                      {isCentralAsia ? "Родилась в Кыргызстане" : "Born in Kyrgyzstan"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9922A]" />
                      {isCentralAsia ? "8 лет в бухгалтерской фирме Вашингтона" : "8 years at DC accounting firm"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9922A]" />
                      {isCentralAsia ? "5 лет строила программы микрокредитования на месте" : "5 years building microloan programs on the ground"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9922A]" />
                      {isCentralAsia ? "Мост между двумя мирами" : "Bridge between two worlds"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 md:order-2 order-1 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#C9922A]/10 text-[#C9922A] px-4 py-1.5 rounded-full text-sm font-medium">
                  {isCentralAsia ? "История сооснователя" : "Co-Founder's Story"}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {isCentralAsia ? "Мост между двумя мирами" : "Bridging Two Worlds"}
                </h2>
                <div className="prose max-w-none text-gray-700 space-y-4">
                  <p className="leading-relaxed text-lg">
                    {isCentralAsia
                      ? "Йева выросла в Кыргызстане и построила восьмилетнюю карьеру в престижной бухгалтерской фирме в Вашингтоне, специализируясь на обслуживании некоммерческих организаций. В 2016 году она приняла решение, лишённое всякой практической логики: попросила работать удалённо из Центральной Азии. Каждый руководитель был против. Тогда фирма обратилась ко всем пяти её клиентам, ожидая возражений. Каждый из них ответил: «Нам нужна Йева. Как угодно.»"
                      : "Yeva grew up in Kyrgyzstan and built an eight-year career at a prestigious DC accounting firm, specializing in serving nonprofits. In 2016, she made a decision that made no practical sense: she asked to work remotely from Central Asia. Every manager opposed it. Then the firm contacted all five of her clients expecting pushback. Every single one said: \"We want Yeva. However she can work.\""}
                  </p>
                  <p className="leading-relaxed">
                    {isCentralAsia
                      ? "Пять лет она жила между двумя мирами — обслуживая клиентов из Вашингтона удалённо, одновременно строя программы микрокредитования на месте в Кыргызстане. Шестнадцатичасовые дни. Два часовых пояса. Две жизни. Она делала это, потому что понимала то, что упускают большинство организаций по развитию: устойчивые перемены в Центральной Азии приходят не от внешних программ. Они приходят от людей внутри сообщества, которые становятся теми, у кого есть ресурсы, навыки и авторитет."
                      : "For five years she lived between two worlds -- serving DC clients remotely while building microloan programs on the ground in Kyrgyzstan. Sixteen-hour days. Two time zones. Two lives. She did it because she understood something most development organizations miss: lasting change in Central Asia doesn't come from outside programs. It comes from people inside the community becoming the ones with resources, skills, and standing."}
                  </p>
                  <p className="leading-relaxed">
                    {isCentralAsia
                      ? "Заём в $2,000 на материалы превращается в $4,000 дохода за шесть месяцев. Отец остаётся вместо того, чтобы уехать в Россию. Дети остаются в школе. Семья остаётся целой. Йева видела это своими глазами — и у неё есть бухгалтерский опыт, культурные корни и связи на месте, чтобы это продолжало работать."
                      : "A $2,000 loan for materials becomes $4,000 in revenue within six months. A father stays instead of leaving for Russia. Children stay in school. A family stays whole. Yeva has seen it happen -- and she has the accounting expertise, the cultural roots, and the on-the-ground relationships to make it keep happening."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Central Asia */}
          <section
            ref={whyRef}
            className={`max-w-4xl mx-auto transition-all duration-700 ${
              whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                {isCentralAsia ? "Региональный фокус" : "Regional Focus"}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {isCentralAsia ? "Почему Центральная Азия?" : "Why Central Asia?"}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {isCentralAsia
                  ? "Казахстан, Кыргызстан и Узбекистан — дом для миллионов людей с предпринимательским духом, но с ограниченным доступом к обучению, капиталу и инфраструктуре."
                  : "Kazakhstan, Kyrgyzstan, and Uzbekistan are home to millions of people with entrepreneurial spirit but limited access to training, capital, and infrastructure."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {isCentralAsia ? "Постсоветские экономические вызовы" : "Post-Soviet Economic Challenges"}
                  </h3>
                  <p className="text-gray-600">
                    {isCentralAsia
                      ? "После распада Советского Союза экономики Центральной Азии в одночасье лишились своей промышленной базы. Спустя десятилетия многие общины по-прежнему не имеют инфраструктуры для развития малого бизнеса. Молодёжь нередко видит эмиграцию как единственный выход."
                      : "After the collapse of the Soviet Union, Central Asian economies lost their industrial base overnight. Decades later, many communities still lack the infrastructure for small business development. Young people often see emigration as their only option."}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {isCentralAsia ? "Высокая молодёжная безработица" : "High Youth Unemployment"}
                  </h3>
                  <p className="text-gray-600">
                    {isCentralAsia
                      ? "В отдельных районах Кыргызстана и Узбекистана молодёжная безработица превышает 17%. Это образованные, мотивированные люди, которым не хватает доступа к бизнес-подготовке, финансовой грамотности и стартовому капиталу — но не амбиций."
                      : "In parts of Kyrgyzstan and Uzbekistan, youth unemployment exceeds 17%. These are educated, motivated people who lack access to business training, financial literacy, and startup capital -- not ambition."}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {isCentralAsia ? "Предпринимательский дух существует" : "Entrepreneurial Spirit Exists"}
                  </h3>
                  <p className="text-gray-600">
                    {isCentralAsia
                      ? "Центральная Азия имеет глубокую традицию торговли и коммерции, уходящую корнями в эпоху Шёлкового пути. Предпринимательский инстинкт здесь есть — не хватает современного обучения и системы поддержки, чтобы направить его на создание устойчивого бизнеса."
                      : "Central Asia has a deep tradition of trade and commerce stretching back to the Silk Road. The entrepreneurial instinct is there -- what's missing is the modern training and support system to channel it into sustainable businesses."}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {isCentralAsia ? "BBB заполняет этот пробел" : "BBB Bridges the Gap"}
                  </h3>
                  <p className="text-gray-600">
                    {isCentralAsia
                      ? "Мы предоставляем то, чего не хватает: обучение финансовой грамотности на основе доказательств, практические мастер-классы по созданию бизнеса, менторство в области лидерства и микрокредитование. Наши программы разработаны для местного контекста людьми, которые знают его изнутри."
                      : "We provide what's missing: evidence-based financial literacy training, hands-on business creation workshops, leadership mentorship, and micro-lending. Our programs are designed for the local context by people who understand it firsthand."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Values / Approach */}
          <section
            ref={valuesRef}
            className={`transition-all duration-700 ${
              valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {isCentralAsia ? "Наш подход" : "Our Approach"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isCentralAsia
                  ? "Всё, что мы делаем, основано на этих принципах."
                  : "Everything we do is grounded in these principles."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="border-gray-200 hover:border-[#C9922A]/40 transition-colors hover:shadow-lg"
                  >
                    <CardContent className="p-6 space-y-3">
                      <div className="bg-[#C9922A]/10 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#C9922A]" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Team Section */}
          <section
            ref={teamRef}
            className={`transition-all duration-700 ${
              teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              {isCentralAsia ? "Наша команда" : "Our Team"}
            </h2>
            <div className="w-full mx-auto flex flex-wrap justify-center gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex-[1_1_300px] max-w-sm min-w-[280px] flex justify-center"
                >
                  <Card className="w-full border-gray-200 hover:shadow-lg transition-all flex flex-col items-center">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <Avatar className="w-28 h-28 mb-4">
                        <AvatarImage
                          src={member.image}
                          alt={member.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-[#1B2A4A]/10 text-[#1B2A4A] text-xl">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#C9922A] font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 leading-relaxed text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/90 text-white p-10 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">
              {isCentralAsia ? "Присоединяйтесь к миссии" : "Join the Mission"}
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              {isCentralAsia
                ? "Посвятите своё время волонтёрству, пожертвуйте на поддержку будущего предпринимателя или просто поделитесь нашей историей — и вы станете частью чего-то долговечного."
                : "Whether you volunteer your time, donate to fund a future entrepreneur, or simply share our story -- you become part of something that lasts."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-involved">
                <Button size="lg" className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8">
                  {isCentralAsia ? "Принять участие" : "Get Involved"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/programs-and-impact">
                <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#1B2A4A] px-8">
                  {isCentralAsia ? "Наши программы" : "See Our Programs"}
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
