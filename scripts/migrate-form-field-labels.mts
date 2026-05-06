/**
 * Seed the per-form field-label arrays inside the `formSettings` singleton.
 *
 * Captures every hardcoded label/placeholder/helper-text currently rendered by:
 *   - /newsletter standalone signup page
 *   - /contact form (rendered through GoHighLevelForm)
 *   - /volunteer-application page
 *   - /partner-application page
 *
 * IDEMPOTENT — uses `client.patch("formSettings").set({...arrays}).commit()`
 * (NOT createOrReplace). Other fields owned by previous form-copy migrations
 * are left untouched. Re-running the script overwrites only the field-label
 * arrays.
 *
 * Stable `_key` per array item: `field-<fieldName>` so admins can reorder
 * without breaking references.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:form-fields
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  console.error(
    "Generate at sanity.io/manage → API → Tokens (Editor permissions).",
  );
  console.error(
    "Then run:\n  SANITY_WRITE_TOKEN=<token> npm run migrate:form-fields\n",
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

// ─── Types ───────────────────────────────────────────────────────────────────

interface FieldLabel {
  _key: string;
  _type: "formFieldLabel";
  fieldName: string;
  label: string;
  labelRu?: string;
  placeholder?: string;
  placeholderRu?: string;
  helperText?: string;
  helperTextRu?: string;
}

type FormName = "newsletter" | "contact" | "volunteer" | "partner";

interface FieldInput {
  fieldName: string;
  label: string;
  labelRu?: string;
  placeholder?: string;
  placeholderRu?: string;
  helperText?: string;
  helperTextRu?: string;
}

const toEntry = (input: FieldInput): FieldLabel => ({
  _key: `field-${input.fieldName}`,
  _type: "formFieldLabel",
  fieldName: input.fieldName,
  label: input.label,
  ...(input.labelRu !== undefined ? { labelRu: input.labelRu } : {}),
  ...(input.placeholder !== undefined ? { placeholder: input.placeholder } : {}),
  ...(input.placeholderRu !== undefined
    ? { placeholderRu: input.placeholderRu }
    : {}),
  ...(input.helperText !== undefined ? { helperText: input.helperText } : {}),
  ...(input.helperTextRu !== undefined
    ? { helperTextRu: input.helperTextRu }
    : {}),
});

// ─── Hardcoded labels (mirror current code in form components) ───────────────

const FIELD_LABELS: Record<FormName, FieldInput[]> = {
  // /newsletter standalone signup page (src/pages/Newsletter.tsx)
  newsletter: [
    {
      fieldName: "firstName",
      label: "First name",
      labelRu: "Имя",
      placeholder: "First name",
      placeholderRu: "Имя",
    },
    {
      fieldName: "lastName",
      label: "Last name",
      labelRu: "Фамилия",
      placeholder: "Last name",
      placeholderRu: "Фамилия",
    },
    {
      fieldName: "email",
      label: "Email",
      labelRu: "Электронная почта",
      placeholder: "you@example.com",
      placeholderRu: "you@example.com",
    },
    {
      fieldName: "phone",
      label: "Phone number",
      labelRu: "Номер телефона",
      placeholder: "(386) 555-0123",
      placeholderRu: "+7 (700) 000-0000",
    },
  ],

  // /contact page (rendered via src/components/forms/GoHighLevelForm.tsx)
  contact: [
    {
      fieldName: "firstName",
      label: "First Name",
      labelRu: "Имя",
      placeholder: "Enter your first name",
      placeholderRu: "Введите ваше имя",
    },
    {
      fieldName: "lastName",
      label: "Last Name",
      labelRu: "Фамилия",
      placeholder: "Enter your last name",
      placeholderRu: "Введите вашу фамилию",
    },
    {
      fieldName: "email",
      label: "Email Address",
      labelRu: "Электронная почта",
      placeholder: "your@email.com",
      placeholderRu: "ваш@email.com",
    },
    {
      fieldName: "phone",
      label: "Phone Number",
      labelRu: "Номер телефона",
      placeholder: "(386) 555-0123",
      placeholderRu: "+7 (555) 000-0000",
    },
    {
      fieldName: "inquiryType",
      label: "How can we help you?",
      labelRu: "Как мы можем помочь вам?",
      placeholder: "Select inquiry type",
      placeholderRu: "Выберите тип запроса",
    },
    {
      fieldName: "message",
      label: "Your Message",
      labelRu: "Ваше сообщение",
      placeholder:
        "Tell us more about your inquiry. The more details you provide, the better we can assist you.",
      placeholderRu:
        "Расскажите подробнее о вашем запросе. Чем больше деталей вы предоставите, тем лучше мы сможем помочь.",
    },
  ],

  // /volunteer-application + the per-opportunity volunteer forms
  // (src/pages/VolunteerApplication.tsx + GoHighLevelForm volunteer mode).
  volunteer: [
    {
      fieldName: "firstName",
      label: "First Name",
      labelRu: "Имя",
      placeholder: "First name",
      placeholderRu: "Имя",
    },
    {
      fieldName: "lastName",
      label: "Last Name",
      labelRu: "Фамилия",
      placeholder: "Last name",
      placeholderRu: "Фамилия",
    },
    {
      fieldName: "email",
      label: "Email",
      labelRu: "Электронная почта",
      placeholder: "you@email.com",
      placeholderRu: "you@email.com",
    },
    {
      fieldName: "phone",
      label: "Phone",
      labelRu: "WhatsApp / Телефон",
      placeholder: "(386) 555-0123",
      placeholderRu: "+7 (999) 123-45-67",
    },
    {
      fieldName: "volunteerType",
      label: "Role You're Interested In",
      labelRu: "Интересующая роль",
      placeholder: "Select a role",
      placeholderRu: "Выберите роль",
    },
    {
      fieldName: "availability",
      label: "Availability",
      labelRu: "Доступность",
      placeholder: "Your availability",
      placeholderRu: "Ваша доступность",
    },
    {
      fieldName: "experience",
      label: "Relevant Experience",
      labelRu: "Соответствующий опыт",
      placeholder:
        "What professional or volunteer experience do you bring? What skills could you contribute?",
      placeholderRu:
        "Какой профессиональный или волонтёрский опыт вы привносите? Какие навыки могли бы применить?",
    },
    {
      fieldName: "motivation",
      label: "Why Do You Want to Volunteer?",
      labelRu: "Почему вы хотите стать волонтёром?",
      placeholder:
        "What draws you to BBB's mission? Why is this meaningful to you?",
      placeholderRu:
        "Что привлекает вас в миссии BBB? Почему это важно для вас?",
    },
    {
      fieldName: "skills",
      label: "Skills & Expertise",
      labelRu: "Навыки и экспертиза",
      placeholder:
        "e.g., Business mentorship, marketing, financial planning, event coordination...",
      placeholderRu:
        "Например: наставничество в бизнесе, маркетинг, финансовое планирование, организация мероприятий...",
    },
  ],

  // /partner-application page (src/pages/PartnerApplication.tsx)
  partner: [
    {
      fieldName: "orgName",
      label: "Organization Name",
      labelRu: "Название организации",
      placeholder: "Your organization",
      placeholderRu: "Ваша организация",
    },
    {
      fieldName: "contactName",
      label: "Your Name",
      labelRu: "Ваше имя",
      placeholder: "Full name",
      placeholderRu: "Имя и фамилия",
    },
    {
      fieldName: "email",
      label: "Email",
      labelRu: "Электронная почта",
      placeholder: "you@org.com",
      placeholderRu: "you@org.com",
    },
    {
      fieldName: "phone",
      label: "Phone",
      labelRu: "Телефон",
      placeholder: "(386) 555-0123",
      placeholderRu: "+7 (700) 000-0000",
    },
    {
      fieldName: "orgType",
      label: "Organization Type",
      labelRu: "Тип организации",
      placeholder: "Select type",
      placeholderRu: "Выберите тип",
    },
    {
      fieldName: "partnershipInterest",
      label: "Partnership Interest",
      labelRu: "Формат партнёрства",
      placeholder: "How you'd like to partner",
      placeholderRu: "Как вы хотите участвовать",
    },
    {
      fieldName: "message",
      label: "Tell Us About Your Interest",
      labelRu: "Расскажите о своём интересе",
      placeholder:
        "What drew you to BBB? What does your organization hope to accomplish through this partnership? Any specific ideas or questions?",
      placeholderRu:
        "Что привлекло вас в BBB? Чего ваша организация хочет достичь через это партнёрство? Есть ли конкретные идеи или вопросы?",
    },
  ],
};

// ─── Patch ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🚀 Patching formSettings field-label arrays\n");
  console.log(`   project=${projectId} dataset=${dataset}\n`);

  const newsletter = FIELD_LABELS.newsletter.map(toEntry);
  const contact = FIELD_LABELS.contact.map(toEntry);
  const volunteer = FIELD_LABELS.volunteer.map(toEntry);
  const partner = FIELD_LABELS.partner.map(toEntry);

  const total =
    newsletter.length + contact.length + volunteer.length + partner.length;

  // Make sure the doc exists. If it doesn't, the user hasn't run the
  // migrate:forms migration yet and we should bail out cleanly.
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_id == "formSettings"][0]{_id}`,
  );

  if (!existing) {
    console.error(
      '\n❌ formSettings document not found. Run `npm run migrate:forms` first to seed the base singleton.\n',
    );
    process.exit(1);
  }

  await client
    .patch("formSettings")
    .set({
      newsletterFieldLabels: newsletter,
      contactFieldLabels: contact,
      volunteerFieldLabels: volunteer,
      partnerFieldLabels: partner,
    })
    .commit();

  console.log(
    `   ✅ patched newsletterFieldLabels (${newsletter.length} fields)`,
  );
  console.log(`   ✅ patched contactFieldLabels (${contact.length} fields)`);
  console.log(
    `   ✅ patched volunteerFieldLabels (${volunteer.length} fields)`,
  );
  console.log(`   ✅ patched partnerFieldLabels (${partner.length} fields)`);
  console.log(`\n   total: ${total} field-label entries\n`);
  console.log(
    "✅ Done. Visit https://bbborders.sanity.studio/structure/formSettings to verify.\n",
  );
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
