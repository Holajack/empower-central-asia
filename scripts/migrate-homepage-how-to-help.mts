/**
 * Seed the `homepageHowToHelp` singleton with the current copy from the
 * homepage HowToHelp component (English + Russian, all three card groups).
 *
 * Idempotent — uses createOrReplace with _id="homepageHowToHelp".
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:homepage-how-to-help
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing SANITY_WRITE_TOKEN.\n" +
      "Set it on the command line:\n" +
      "  SANITY_WRITE_TOKEN=<token> npm run migrate:homepage-how-to-help\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Helper: build a `helpCard` object value for use inside an array. Sanity
// arrays of objects need a unique `_key` per item; we derive a stable one
// from the icon name.
function card(c: {
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  icon: string;
  link?: string;
  buttonText: string;
  buttonTextRu: string;
}) {
  return {
    _type: "helpCard",
    _key: `card-${c.icon.toLowerCase()}`,
    title: c.title,
    titleRu: c.titleRu,
    description: c.description,
    descriptionRu: c.descriptionRu,
    icon: c.icon,
    link: c.link,
    buttonText: c.buttonText,
    buttonTextRu: c.buttonTextRu,
  };
}

async function main() {
  console.log("\nSeeding homepageHowToHelp singleton...\n");

  await client.createOrReplace({
    _id: "homepageHowToHelp",
    _type: "homepageHowToHelp",

    // ── Section heading ─────────────────────────────────────────────────────
    sectionHeading: "How You Can Help",
    sectionHeadingRu: "Как вы можете помочь",

    // ── Learn group ─────────────────────────────────────────────────────────
    // The component labels this column "I want to learn".
    learnHeading: "I want to learn",
    learnHeadingRu: "Хочу учиться",
    learnCards: [
      card({
        title: "Free Course",
        titleRu: "Бесплатный курс",
        description:
          "Our 6-week financial literacy course covers budgeting, debt elimination, saving, and entrepreneurship basics.",
        descriptionRu:
          "Наш 6-недельный курс по финансовой грамотности охватывает составление бюджета, устранение долгов, накопления и основы предпринимательства.",
        icon: "BookOpen",
        link: "/course/financial-literacy",
        buttonText: "Start Learning",
        buttonTextRu: "Начать обучение",
      }),
      card({
        title: "Business Course",
        titleRu: "Курс создания бизнеса",
        description:
          "12-week intensive for financial literacy graduates: business model, market validation, and launch.",
        descriptionRu:
          "12-недельный интенсив для выпускников курса финансовой грамотности: бизнес-модель, проверка рынка, запуск.",
        icon: "Briefcase",
        link: "/course/business-creation",
        buttonText: "Start the Course",
        buttonTextRu: "Начать курс",
      }),
      card({
        title: "Debt Calculator",
        titleRu: "Калькулятор долгов",
        description:
          "Compare snowball vs. avalanche payoff strategies and see exactly when you'll be debt-free.",
        descriptionRu:
          "Сравните стратегии погашения «снежный ком» и «лавина» и узнайте точную дату, когда вы освободитесь от долгов.",
        icon: "Calculator",
        link: "/tools/debt-calculator",
        buttonText: "Try the Calculator",
        buttonTextRu: "Открыть калькулятор",
      }),
      card({
        title: "Blog & Resources",
        titleRu: "Блог и ресурсы",
        description:
          "Deep-dive articles on financial literacy, entrepreneurship, and sustainable development.",
        descriptionRu:
          "Подробные статьи по финансовой грамотности, предпринимательству и устойчивому развитию.",
        icon: "Newspaper",
        link: "/blog",
        buttonText: "Read Articles",
        buttonTextRu: "Читать статьи",
      }),
    ],

    // ── Volunteer group ─────────────────────────────────────────────────────
    // This array seeds the give-column with the Donate card first (no link →
    // the component renders it as <DonateButton/>) followed by Volunteer.
    volunteerHeading: "I want to give",
    volunteerHeadingRu: "Хочу помочь",
    volunteerCards: [
      card({
        title: "Donate",
        titleRu: "Пожертвовать",
        description:
          "100% of donations fund proven programs that train entrepreneurs and transform communities in Central Asia.",
        descriptionRu:
          "100% пожертвований финансируют проверенные программы, которые обучают предпринимателей и преобразуют сообщества Центральной Азии.",
        icon: "Heart",
        // No `link` — component renders as <DonateButton/>.
        buttonText: "Make a Donation",
        buttonTextRu: "Сделать пожертвование",
      }),
      card({
        title: "Volunteer",
        titleRu: "Волонтёрство",
        description:
          "Share your expertise remotely -- mentor entrepreneurs, lead workshops, or support program operations.",
        descriptionRu:
          "Делитесь своим опытом дистанционно — наставляйте предпринимателей, проводите мастер-классы или поддерживайте работу программ.",
        icon: "Users2",
        link: "/get-involved",
        buttonText: "Become a Volunteer",
        buttonTextRu: "Стать волонтёром",
      }),
    ],

    // ── Partner group ───────────────────────────────────────────────────────
    partnerHeading: "Partner",
    partnerHeadingRu: "Партнёрство",
    partnerCards: [
      card({
        title: "Partner",
        titleRu: "Партнёрство",
        description:
          "Corporate and organizational partnerships that create measurable social impact and sustainable change.",
        descriptionRu:
          "Корпоративное и организационное партнёрство, создающее измеримое социальное воздействие и устойчивые изменения.",
        icon: "Handshake",
        link: "/partner-application",
        buttonText: "Partner With Us",
        buttonTextRu: "Стать партнёром",
      }),
    ],
  });

  console.log(
    "Done. Visit https://bbborders.sanity.studio/structure/homepageHowToHelp to verify.\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
