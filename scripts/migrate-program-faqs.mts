/**
 * Seed per-program FAQ items into Sanity faqItem docs with the `program`
 * reference field pointing to the corresponding programPage doc.
 *
 * FAQ content is extracted from the inline generateFAQSchema calls in the
 * four program-page TSX files.
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-program-faqs.mts
 *   — or —
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:program-faqs
 *
 * Idempotent — _id="faqItem.<programSlug>.<n>".
 * References the programPage doc by _id="program.<programSlug>".
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN.\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

interface FaqSeed {
  question: string;
  answer: string;
}

interface ProgramFaqs {
  slug: string;
  faqs: FaqSeed[];
}

const PROGRAM_FAQS: ProgramFaqs[] = [
  {
    slug: "financial-literacy",
    faqs: [
      {
        question: "Is the Financial Literacy Program really free?",
        answer:
          "Yes, the program is 100% free with no login required. The self-paced 6-week online course and all interactive tools are available at no cost, forever.",
      },
      {
        question:
          "How long does the Financial Literacy Program take to complete?",
        answer:
          "The self-paced online course is 6 weeks long. A more comprehensive cohort-based version runs 10 weeks with facilitator-led group sessions. Both options allow you to go at your own speed.",
      },
      {
        question: "What topics does the Financial Literacy Program cover?",
        answer:
          "The program covers zero-based budgeting, debt elimination strategies (including snowball and avalanche methods), emergency fund planning, income diversification, saving strategies, and the principles of generous giving.",
      },
      {
        question: "Do I need any prior financial knowledge to join?",
        answer:
          "No prerequisites are required. The program is open to all backgrounds and is designed to be accessible to anyone who wants to take control of their financial future.",
      },
      {
        question:
          "What is the difference between the 6-week course and the 10-week cohort program?",
        answer:
          "The 6-week self-paced online course lets you start anytime and progress at your own speed. The 10-week cohort program includes facilitator-led group sessions, accountability partnerships, and a certificate of completion — ideal for those who thrive in a community setting.",
      },
      {
        question:
          "What interactive tools are included in the program?",
        answer:
          "The program includes a Debt Payoff Calculator (comparing snowball vs. avalanche strategies), guided budget worksheets for building a zero-based budget, and a Financial Snapshot self-assessment tool available in Week 1.",
      },
    ],
  },
  {
    slug: "business-creation",
    faqs: [
      {
        question: "What is the Business Creation Training Program?",
        answer:
          "The Business Creation Training Program is a 12-week intensive entrepreneurship program that uses Lean Startup methodology and Business Model Canvas to take participants from a business idea to a market-ready venture. It includes 72 hours of training, 4 progressive modules, and 1:1 mentorship support.",
      },
      {
        question:
          "What does the 12-week Business Creation curriculum cover?",
        answer:
          "The curriculum is divided into 4 modules: Module 1 (Weeks 1-3) covers entrepreneurial mindset and Lean Startup methodology; Module 2 (Weeks 4-6) covers Business Model Canvas and value proposition design; Module 3 (Weeks 7-9) covers customer validation and data-driven decision making; Module 4 (Weeks 10-12) covers MVP development, product-market fit, and investor pitch creation.",
      },
      {
        question:
          "What is the success rate of the Business Creation Program?",
        answer:
          "90% of participants launch a viable business within 6 months of completing the program. Graduates have collectively generated over $2 million in revenue and created 100+ jobs. The program maintains an 85% completion rate.",
      },
      {
        question: "How much does the Business Creation Program cost?",
        answer:
          "Scholarships are available to make the program accessible. Contact the BBB program team for details on current cohort costs and scholarship availability.",
      },
      {
        question:
          "What tools and resources are included in the Business Creation Program?",
        answer:
          "Participants get access to professional tools including Miro/Mural for Business Model Canvas collaboration, Figma for MVP prototyping and design, Typeform for customer validation surveys, and financial modeling templates for projections.",
      },
      {
        question: "When does the next Business Creation cohort start?",
        answer:
          "The next Business Creation cohort starts April 15, 2026. Cohorts meet Tuesday and Thursday evenings from 6-9 PM in a hybrid format (in-person and online), with 12-15 entrepreneurs per cohort. Apply through the BBB website to reserve your spot.",
      },
    ],
  },
  {
    slug: "leadership-development",
    faqs: [
      {
        question: "Is the Leadership Development Program free?",
        answer:
          "Yes, the 12-week self-paced online course is 100% free. A mentored cohort-based program is also available for those who prefer guided group learning with one-on-one mentorship sessions.",
      },
      {
        question:
          "What are the prerequisites for the Leadership Development Program?",
        answer:
          "The Leadership Development Program is designed to follow the 12-Week Business Creation Course, which provides the entrepreneurship foundation that leadership skills build upon.",
      },
      {
        question: "What leadership topics does the program cover?",
        answer:
          "The 12-week program covers emotional intelligence and self-leadership, communication and influence skills, team building and management, conflict resolution, strategic thinking, change management, and organizational leadership — built on research by Covey, Goleman, Kotter, and other leading experts.",
      },
      {
        question:
          "How is the Leadership Development Program structured?",
        answer:
          "The program is organized into four modules over 12 weeks: self-leadership (Weeks 1-3), leading others (Weeks 4-6), team leadership (Weeks 7-9), and organizational leadership (Weeks 10-12). Each module follows a Learn-Practice-Lead framework.",
      },
      {
        question:
          "What will I be able to do after completing the Leadership Development Program?",
        answer:
          "Graduates develop emotional intelligence and self-leadership mastery, communication and influence skills, the ability to build and manage high-performance teams, values-based decision-making confidence, conflict resolution abilities, and a personal leadership legacy statement.",
      },
      {
        question:
          "Is there a cohort option for the Leadership Development Program?",
        answer:
          "Yes. In addition to the self-paced online course, BBB offers a mentored leadership program with facilitator guidance, group discussions, one-on-one mentorship sessions, accountability partnerships, and a certificate of completion.",
      },
    ],
  },
  {
    slug: "community-collaboration",
    faqs: [
      {
        question: "What is the Community Collaboration Network?",
        answer:
          "The Community Collaboration Network is a volunteer-driven initiative by Businesses Beyond Borders that connects entrepreneurs, businesses, and organizations to build sustainable local partnerships for economic development and social impact in Central Asia and beyond.",
      },
      {
        question:
          "How can I volunteer with the Community Collaboration Network?",
        answer:
          "Volunteers are needed in several roles including community coordinators, partnership facilitators, business professionals, and event organizers. The program is designed to be run by volunteers with approximately 2 hours per week of commitment. Apply through the BBB website to get involved.",
      },
      {
        question: "When will the Community Collaboration Network launch?",
        answer:
          "The program launches in three phases: Phase 1 (Foundation Building, Q2 2026) focuses on recruiting 15-20 volunteer coordinators and building infrastructure; Phase 2 (Program Launch, Q3 2026) includes the inaugural community forum and digital platform launch; Phase 3 (Growth and Impact, Q4 2026 onward) scales the network to 200+ members.",
      },
      {
        question:
          "What skills do I need to volunteer with the Community Collaboration Network?",
        answer:
          "Useful skills include community organizing, partnership development, event planning, business networking, project coordination, and communication. The program welcomes volunteers from all professional backgrounds who share a passion for entrepreneurship and community development.",
      },
      {
        question:
          "Is the Community Collaboration Network only for Central Asia?",
        answer:
          "While the network has a strong focus on Central Asia, it connects entrepreneurs, businesses, and organizations worldwide. The digital collaboration platform will enable global participation and partnership-building across geographic boundaries.",
      },
    ],
  },
];

async function main() {
  let totalSucceeded = 0;
  let totalFailed = 0;

  for (const { slug, faqs } of PROGRAM_FAQS) {
    const programRef = `program.${slug}`;
    console.log(`\n📁 Program: ${slug} (${faqs.length} FAQs)`);
    console.log(`   → referencing programPage _id="${programRef}"`);

    for (let n = 0; n < faqs.length; n++) {
      const faq = faqs[n];
      const _id = `faqItem.${slug}.${n + 1}`;
      try {
        await client.createOrReplace({
          _id,
          _type: "faqItem",
          question: faq.question,
          answer: faq.answer,
          category: "general",
          order: (n + 1) * 10,
          active: true,
          program: {
            _type: "reference",
            _ref: programRef,
          },
        });
        console.log(`   ✓ ${_id}`);
        totalSucceeded++;
      } catch (err) {
        console.error(`   ✗ ${_id}: ${(err as Error).message}`);
        totalFailed++;
      }
    }
  }

  const total = totalSucceeded + totalFailed;
  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ ${totalSucceeded} succeeded, ❌ ${totalFailed} failed (${total} total)`);
  console.log(
    `\nVisit https://bbborders.sanity.studio/structure/faqItem to verify.\n`
  );

  if (totalFailed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
