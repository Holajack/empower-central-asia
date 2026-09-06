import { Helmet } from "react-helmet";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig } from "@/lib/seo";

/**
 * Privacy policy covering everything the Learning Hub actually collects:
 * account data (Clerk), learning progress (browser + optional Convex),
 * email marketing (ActiveCampaign / Google Sheet), analytics, and cookies.
 */
const PrivacyPolicy = () => {
  const { isCentralAsia } = useRegion();
  const t = (en: string, ru: string) => (isCentralAsia ? ru : en);
  const org = siteConfig.orgName;
  const email = siteConfig.email;
  const updated = "2026-09-06";

  const sections: { h: string; p?: string[]; list?: string[] }[] = [
    {
      h: t("1. Who we are", "1. Кто мы"),
      p: [
        t(
          `${org} ("we", "us") operates ${siteConfig.host}, a free learning platform offering financial literacy, business creation, and leadership courses in English and Russian. This policy explains what personal information we collect, why, and the choices you have.`,
          `${org} («мы») управляет сайтом ${siteConfig.host} — бесплатной обучающей платформой с курсами по финансовой грамотности, созданию бизнеса и лидерству на русском и английском языках. Эта политика объясняет, какие персональные данные мы собираем, зачем и какой у вас есть выбор.`
        ),
      ],
    },
    {
      h: t("2. Information we collect", "2. Какую информацию мы собираем"),
      p: [t("We collect information you give us directly:", "Мы собираем информацию, которую вы предоставляете напрямую:")],
      list: [
        t("Account details when you sign up: name, email address, and (optionally) a profile photo or Google account.", "Данные аккаунта при регистрации: имя, адрес электронной почты и (по желанию) фото профиля или аккаунт Google."),
        t("Onboarding answers: preferred language, country, city, learning goals, and an optional WhatsApp/Telegram number.", "Ответы при регистрации: предпочитаемый язык, страна, город, цели обучения и (по желанию) номер WhatsApp/Telegram."),
        t("Form submissions: newsletter, cohort interest, community messages, and resource downloads.", "Отправленные формы: подписка на рассылку, интерес к когортам, сообщения сообществу и загрузка материалов."),
        t("Learning activity: which lessons you complete, worksheet answers you type, and course chat messages you post.", "Учебная активность: какие уроки вы завершили, ответы в рабочих листах и сообщения в чате курса."),
        t("Technical data collected automatically: approximate location from your IP address (to suggest Russian for visitors in Central Asia), device and browser type, pages visited, and usage analytics.", "Технические данные, собираемые автоматически: приблизительное местоположение по IP-адресу (чтобы предложить русский язык посетителям из Центральной Азии), тип устройства и браузера, посещённые страницы и аналитика использования."),
      ],
    },
    {
      h: t("3. How we use it", "3. Как мы используем данные"),
      list: [
        t("To run the courses: save your progress, unlock weeks, and show worksheets in your language.", "Для работы курсов: сохранять прогресс, открывать недели и показывать рабочие листы на вашем языке."),
        t("To email you: lesson reminders, new content, cohort invitations, and community updates in the language you chose. Every email has an unsubscribe link.", "Для писем: напоминания об уроках, новые материалы, приглашения в когорты и новости сообщества на выбранном вами языке. В каждом письме есть ссылка для отписки."),
        t("To build community: your first name and initial may be shown to other learners in course chat and the \"who is online\" list.", "Для сообщества: ваше имя и инициал могут отображаться другим ученикам в чате курса и в списке «кто онлайн»."),
        t("To improve the platform: aggregated, anonymized analytics about which lessons and tools people use.", "Для улучшения платформы: обобщённая, анонимная аналитика о том, какие уроки и инструменты используются."),
        t("To respond when you contact us.", "Чтобы отвечать на ваши обращения."),
      ],
    },
    {
      h: t("4. Services we rely on", "4. Сервисы, которые мы используем"),
      p: [t("We share data only with the service providers needed to run the site. Each processes data under its own privacy policy and security commitments:", "Мы передаём данные только сервисам, необходимым для работы сайта. Каждый обрабатывает данные согласно своей политике конфиденциальности:")],
      list: [
        t("Clerk — account creation, sign-in, and password/security management.", "Clerk — создание аккаунта, вход и управление паролями/безопасностью."),
        t("ActiveCampaign (and, where enabled, a Google Sheet) — email list and campaigns, tagged with your preferred language.", "ActiveCampaign (и, где включено, Google Таблица) — список рассылки и кампании с пометкой вашего языка."),
        t("Convex — cloud storage of course progress, chat messages, and presence when community features are enabled.", "Convex — облачное хранение прогресса, сообщений чата и статуса онлайн, когда включены функции сообщества."),
        t("Netlify — hosting and serverless functions.", "Netlify — хостинг и серверные функции."),
        t("Google Analytics, Microsoft Clarity, and Meta Pixel — usage analytics and ad measurement, where configured.", "Google Analytics, Microsoft Clarity и Meta Pixel — аналитика и измерение рекламы, где настроено."),
        t("ipapi.co — one-time country lookup from your IP address to suggest a language.", "ipapi.co — однократное определение страны по IP-адресу для выбора языка."),
      ],
    },
    {
      h: t("5. Data stored in your browser", "5. Данные в вашем браузере"),
      p: [
        t("Course progress, worksheet answers, your language choice, and whether you dismissed pop-ups are stored in your browser's local storage so the site works even without an account. Clearing site data removes them. When you are signed in and community features are enabled, progress is also synced to your account.", "Прогресс, ответы в рабочих листах, выбранный язык и закрытые всплывающие окна хранятся в локальном хранилище браузера, чтобы сайт работал даже без аккаунта. Очистка данных сайта удаляет их. Если вы вошли в аккаунт и включены функции сообщества, прогресс также синхронизируется с аккаунтом."),
      ],
    },
    {
      h: t("6. Your choices and rights", "6. Ваш выбор и права"),
      list: [
        t("Unsubscribe from emails at any time using the link in any message, or by writing to us.", "Отписаться от писем в любой момент по ссылке в письме или написав нам."),
        t("Update your name, language, or country in your account, or delete your account entirely from the account menu.", "Изменить имя, язык или страну в аккаунте либо полностью удалить аккаунт в меню аккаунта."),
        t("Ask us for a copy of your data, a correction, or deletion by emailing us. We respond within 30 days.", "Запросить копию данных, исправление или удаление, написав нам. Мы отвечаем в течение 30 дней."),
        t("Refuse analytics cookies with your browser or a blocker; the courses still work.", "Отключить аналитические cookie в браузере или блокировщиком; курсы продолжат работать."),
      ],
    },
    {
      h: t("7. Children", "7. Дети"),
      p: [t("The platform is intended for people 16 and older. We do not knowingly collect data from children under 16; if you believe a child has created an account, contact us and we will delete it.", "Платформа предназначена для лиц от 16 лет. Мы сознательно не собираем данные детей младше 16 лет; если вы считаете, что ребёнок создал аккаунт, напишите нам, и мы удалим его.")],
    },
    {
      h: t("8. Security and retention", "8. Безопасность и сроки хранения"),
      p: [t("Data is transmitted over HTTPS and stored with providers that use industry-standard encryption. We keep account and progress data while your account exists, email list data until you unsubscribe, and analytics for up to 26 months.", "Данные передаются по HTTPS и хранятся у провайдеров, использующих стандартное шифрование. Мы храним данные аккаунта и прогресса, пока существует аккаунт, данные рассылки — до отписки, аналитику — до 26 месяцев.")],
    },
    {
      h: t("9. Changes and contact", "9. Изменения и контакты"),
      p: [
        t(`We may update this policy; the date at the top shows the latest version. Questions or requests: ${email}.`, `Мы можем обновлять эту политику; дата вверху показывает актуальную версию. Вопросы и запросы: ${email}.`),
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t(`Privacy Policy | ${siteConfig.name}`, `Политика конфиденциальности | ${siteConfig.name}`)}</title>
        <meta name="description" content={t(`How ${org} collects, uses, and protects your information on the learning platform.`, `Как ${org} собирает, использует и защищает вашу информацию на обучающей платформе.`)} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="min-h-screen bg-white pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-[#1B2A4A] mb-2">{t("Privacy Policy", "Политика конфиденциальности")}</h1>
          <p className="text-gray-500 mb-10">{t("Last updated: ", "Последнее обновление: ")}{updated}</p>
          {sections.map((s) => (
            <section key={s.h} className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1B2A4A] mb-3">{s.h}</h2>
              {s.p?.map((para, i) => (
                <p key={i} className="text-gray-700 mb-3 leading-relaxed">{para}</p>
              ))}
              {s.list && (
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  {s.list.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
