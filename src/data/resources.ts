export interface ResourceSection {
  heading: string;
  content: string[];
  items?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface ResourceDef {
  slug: string;
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  excerpt: string;
  excerptRu: string;
  icon: string; // lucide icon name
  keywords: string[];
  sections: ResourceSection[];
  sectionsRu: ResourceSection[];
}

export const resources: ResourceDef[] = [
  {
    slug: "asset-mapping-toolkit",
    title: "Community Asset Mapping Toolkit",
    titleRu: "Набор для картирования ресурсов сообщества",
    description: "A step-by-step framework for identifying, cataloging, and mobilizing the strengths already present in your community to support international development work.",
    descriptionRu: "Пошаговая система для определения, каталогизации и мобилизации ресурсов вашего сообщества для поддержки международного развития.",
    excerpt: "Identify and mobilize community resources for global impact. Includes worksheets, templates, and a facilitator guide.",
    excerptRu: "Определите и мобилизуйте ресурсы сообщества для глобального воздействия. Включает рабочие листы, шаблоны и руководство для ведущего.",
    icon: "Map",
    keywords: [
      "asset mapping toolkit",
      "community asset mapping template",
      "community resources worksheet",
      "nonprofit asset mapping",
      "ABCD community development",
    ],
    sections: [
      {
        heading: "What Is Asset Mapping?",
        content: [
          "Asset mapping is the process of identifying and cataloging the skills, resources, networks, and institutions already present in a community. Rather than focusing on what a community lacks, asset mapping starts from a position of strength -- recognizing that every neighborhood, congregation, or civic group already possesses significant untapped capacity.",
          "This toolkit adapts the Asset-Based Community Development (ABCD) approach, pioneered by John McKnight and Jody Kretzmann at Northwestern University, for organizations doing international development work. The core insight is simple: communities that understand what they already have are far better positioned to contribute meaningfully to global work than communities that only see what they need.",
        ],
      },
      {
        heading: "Step 1: Individual Asset Inventory",
        content: [
          "Begin by surveying individual community members. Every person has skills, knowledge, and passions that can be leveraged for community development. Use the worksheet below to catalog individual assets across five categories.",
        ],
        items: [
          "Professional Skills: What does this person do for work? What specialized knowledge do they have? (Accounting, construction, teaching, healthcare, IT, marketing, etc.)",
          "Personal Skills: What can they do that isn't part of their job? (Cooking, tutoring, translation, driving, event planning, childcare, etc.)",
          "Life Experience: What has this person lived through that gives them unique perspective? (Immigration, business ownership, caregiving, recovery, military service, etc.)",
          "Passions: What do they care deeply about? What would they volunteer time for even without being asked?",
          "Connections: Who do they know? What networks, organizations, or institutions are they connected to?",
        ],
      },
      {
        heading: "Step 2: Organizational Asset Inventory",
        content: [
          "Map the organizations and institutions in your community that could contribute resources, expertise, or networks to your mission. Include both formal institutions and informal groups.",
        ],
        table: {
          headers: ["Category", "Examples", "What They Can Offer"],
          rows: [
            ["Religious organizations", "Churches, mosques, synagogues, temples", "Facilities, volunteers, financial support, networks"],
            ["Educational institutions", "Schools, colleges, universities, libraries", "Expertise, interns, research capacity, meeting space"],
            ["Businesses", "Local shops, restaurants, professional firms", "Funding, in-kind donations, expertise, employment"],
            ["Civic groups", "Rotary, Lions Club, chamber of commerce", "Networks, leadership, organized volunteer capacity"],
            ["Government agencies", "City departments, county services, state programs", "Grants, data, regulatory support, facilities"],
            ["Nonprofits", "Other 501(c)(3) organizations in your area", "Partnership opportunities, shared resources, referrals"],
          ],
        },
      },
      {
        heading: "Step 3: Physical and Economic Assets",
        content: [
          "Catalog the tangible resources available in your community. These are often overlooked but can be critical for launching and sustaining programs.",
        ],
        items: [
          "Physical spaces: Meeting rooms, vacant lots, community centers, church halls, co-working spaces",
          "Equipment: Computers, projectors, vehicles, tools, kitchen facilities",
          "Financial resources: Local grants, community foundations, corporate giving programs, crowdfunding capacity",
          "Natural assets: Parks, waterways, farmland, scenic areas (relevant for tourism-based development)",
          "Infrastructure: Internet connectivity, transportation networks, proximity to airports or ports",
        ],
      },
      {
        heading: "Step 4: Connect Assets to Mission",
        content: [
          "Once you have cataloged your community's assets, the next step is connecting them to specific development needs. Create a matrix that maps each asset to the ways it can support your international work.",
          "For example, if your mission involves entrepreneurship training in Central Asia, a local accountant could provide pro bono financial literacy workshops via video call. A church with a large fellowship hall could host fundraising dinners. A university marketing department could assign students to create social media content as a class project.",
          "The key principle: every asset you identify should have at least one clear pathway to mission impact. If it doesn't, either you haven't been creative enough in your thinking, or it's not actually an asset for your specific work.",
        ],
      },
      {
        heading: "Step 5: Mobilization Plan",
        content: [
          "For each high-priority asset, create a simple mobilization plan with four elements:",
        ],
        items: [
          "Contact: Who is the decision-maker or gatekeeper for this asset?",
          "Ask: What specific, concrete request will you make? (Avoid vague asks like 'support our work.' Instead: 'Would you be willing to lead one 90-minute financial literacy session per month via Zoom for our entrepreneurs in Bishkek?')",
          "Timeline: When will you make the ask, and when do you need the asset available?",
          "Follow-up: What is your plan for maintaining the relationship and reporting impact back to the contributor?",
        ],
      },
      {
        heading: "Facilitator Tips",
        content: [
          "If you're running an asset mapping session with a group, here are practical guidelines:",
        ],
        items: [
          "Allow 2-3 hours for a thorough initial mapping session",
          "Use large paper or a whiteboard so everyone can see the assets accumulating -- visibility builds momentum",
          "Start with individual assets before organizational ones -- people engage more readily when they see their own contributions valued",
          "Assign a note-taker to capture everything -- ideas mentioned casually often turn out to be the most valuable",
          "End with a clear next step: who will follow up with each identified asset, and by when?",
          "Schedule a follow-up session in 2-4 weeks to review progress and add newly identified assets",
        ],
      },
    ],
    sectionsRu: [
      {
        heading: "Что такое картирование ресурсов?",
        content: [
          "Картирование ресурсов -- это процесс выявления и каталогизации навыков, ресурсов, сетей и организаций, уже существующих в сообществе. Вместо того чтобы сосредотачиваться на недостатках, картирование начинается с позиции силы -- признавая, что каждое сообщество уже обладает значительным нереализованным потенциалом.",
          "Этот инструментарий адаптирует подход развития на основе активов сообщества (ABCD) для организаций, занимающихся международным развитием.",
        ],
      },
      {
        heading: "Шаг 1: Инвентаризация индивидуальных ресурсов",
        content: [
          "Начните с опроса членов сообщества. Каждый человек обладает навыками, знаниями и увлечениями, которые можно использовать для развития.",
        ],
        items: [
          "Профессиональные навыки: Чем этот человек занимается на работе? Какие специализированные знания у него есть?",
          "Личные навыки: Что он умеет делать помимо работы?",
          "Жизненный опыт: Что пережил этот человек, что даёт ему уникальную перспективу?",
          "Увлечения: Что его глубоко волнует?",
          "Связи: Кого он знает? С какими организациями связан?",
        ],
      },
      {
        heading: "Шаг 2: Инвентаризация организационных ресурсов",
        content: [
          "Составьте карту организаций и учреждений в вашем сообществе, которые могут предоставить ресурсы, экспертизу или связи для вашей миссии.",
        ],
        items: [
          "Религиозные организации: помещения, волонтёры, финансовая поддержка",
          "Образовательные учреждения: экспертиза, стажёры, исследовательский потенциал",
          "Бизнес: финансирование, натуральные пожертвования, экспертиза",
          "Общественные группы: сети, лидерство, организованные волонтёры",
          "Государственные агентства: гранты, данные, поддержка",
          "Некоммерческие организации: партнёрство, общие ресурсы",
        ],
      },
      {
        heading: "Шаг 3: Физические и экономические ресурсы",
        content: [
          "Каталогизируйте материальные ресурсы, доступные в вашем сообществе.",
        ],
        items: [
          "Физические пространства: конференц-залы, общественные центры, коворкинги",
          "Оборудование: компьютеры, проекторы, транспорт, инструменты",
          "Финансовые ресурсы: местные гранты, фонды, корпоративные программы",
          "Инфраструктура: интернет, транспортные сети",
        ],
      },
      {
        heading: "Шаг 4: Связь ресурсов с миссией",
        content: [
          "После каталогизации ресурсов свяжите каждый из них с конкретными потребностями развития. Создайте матрицу, которая покажет, как каждый ресурс может поддержать вашу международную работу.",
          "Ключевой принцип: каждый выявленный ресурс должен иметь хотя бы один чёткий путь к воздействию на миссию.",
        ],
      },
      {
        heading: "Шаг 5: План мобилизации",
        content: [
          "Для каждого приоритетного ресурса создайте простой план мобилизации:",
        ],
        items: [
          "Контакт: Кто является ключевым лицом для этого ресурса?",
          "Запрос: Какую конкретную просьбу вы сформулируете?",
          "Сроки: Когда вы обратитесь и когда нужен ресурс?",
          "Последующие действия: Как вы будете поддерживать отношения?",
        ],
      },
      {
        heading: "Советы для ведущего",
        content: [
          "Если вы проводите сессию картирования с группой:",
        ],
        items: [
          "Выделите 2-3 часа для первой сессии",
          "Используйте большую бумагу или доску для визуализации",
          "Начните с индивидуальных ресурсов, затем переходите к организационным",
          "Назначьте ответственного за записи",
          "Завершите чётким планом следующих шагов",
        ],
      },
    ],
  },
  {
    slug: "remote-volunteer-playbook",
    title: "Remote Volunteer Engagement Playbook",
    titleRu: "Справочник по вовлечению удалённых волонтёров",
    description: "A comprehensive guide for creating meaningful virtual volunteer experiences that connect local community members with international development projects.",
    descriptionRu: "Полное руководство по созданию значимого виртуального волонтёрского опыта, связывающего местных жителей с международными проектами развития.",
    excerpt: "Build a virtual volunteer program that creates real impact. Includes role templates, onboarding workflows, and engagement tracking.",
    excerptRu: "Создайте виртуальную волонтёрскую программу с реальным воздействием. Включает шаблоны ролей, процесс адаптации и отслеживание вовлечённости.",
    icon: "Users",
    keywords: [
      "remote volunteer playbook",
      "virtual volunteer management",
      "remote volunteer program template",
      "nonprofit virtual volunteering",
      "volunteer engagement guide",
    ],
    sections: [
      {
        heading: "Why Remote Volunteering Works for International Development",
        content: [
          "The traditional model of international volunteering -- fly overseas for a week, build something, fly home -- has well-documented limitations. Travel costs consume a disproportionate share of budgets. Short-term visits rarely create sustainable impact. And the volunteers themselves often lack the specialized skills that local communities actually need.",
          "Remote volunteering flips this model. By connecting skilled volunteers in one country with organizations and entrepreneurs in another through digital tools, you can deliver high-value expertise at a fraction of the cost, maintain relationships over months rather than days, and match specific skills to specific needs.",
          "At Businesses Beyond Borders, our remote volunteer program has demonstrated that a financial analyst in Daytona Beach can provide more sustained value to an entrepreneur in Bishkek through weekly 45-minute video calls than a well-intentioned visitor could provide in a two-week trip.",
        ],
      },
      {
        heading: "Phase 1: Program Design",
        content: [
          "Before recruiting a single volunteer, define your program structure clearly. Ambiguity is the enemy of remote volunteer engagement -- people disengage when they don't know exactly what is expected of them.",
        ],
        items: [
          "Define 3-5 specific volunteer roles with clear descriptions (see templates below)",
          "Set minimum time commitments (we recommend 2-4 hours per week for 12 weeks minimum)",
          "Identify the technology platform (Zoom, Google Meet, WhatsApp, etc.)",
          "Create a matching process that pairs volunteers with beneficiaries based on skills and language",
          "Establish success metrics for each role",
        ],
      },
      {
        heading: "Volunteer Role Templates",
        content: [
          "Here are five proven remote volunteer roles that work across most international development contexts:",
        ],
        table: {
          headers: ["Role", "Time Commitment", "Skills Required", "Impact Measure"],
          rows: [
            ["Business Mentor", "2 hrs/week for 12 weeks", "Business experience, patience, cross-cultural sensitivity", "Mentee business plan completion rate"],
            ["Financial Literacy Coach", "1.5 hrs/week for 6 weeks", "Personal finance knowledge, teaching ability", "Pre/post assessment score improvement"],
            ["Marketing Advisor", "3 hrs/week for 8 weeks", "Social media, branding, content creation", "Mentee social media/marketing launch"],
            ["Translation Support", "2 hrs/week ongoing", "Fluency in Russian/Kyrgyz/Uzbek + English", "Materials translated per month"],
            ["Grant Researcher", "4 hrs/week for 4 weeks", "Research skills, grant writing experience", "Viable grant opportunities identified"],
          ],
        },
      },
      {
        heading: "Phase 2: Recruitment and Screening",
        content: [
          "Recruiting remote volunteers requires a different approach than recruiting for in-person roles. Remote volunteering attracts people who value flexibility but also requires a higher degree of self-motivation and reliability.",
        ],
        items: [
          "Create a simple online application (Google Form works fine for most organizations)",
          "Include a short video or written response question to assess communication skills and motivation",
          "Conduct a 20-minute video interview with every applicant -- this is non-negotiable for remote roles",
          "Check references, especially for roles involving direct contact with beneficiaries",
          "Be transparent about technology requirements (stable internet, webcam, quiet workspace)",
        ],
      },
      {
        heading: "Phase 3: Onboarding",
        content: [
          "A structured onboarding process is critical for remote volunteer retention. Volunteers who feel prepared and connected are three times more likely to complete their commitment than those who are thrown in without context.",
        ],
        items: [
          "Week 1: Welcome email + orientation video (30 min) covering mission, culture, expectations",
          "Week 1: Technology setup session -- ensure all tools work before the first real session",
          "Week 2: Shadow session -- new volunteer observes an experienced volunteer in action",
          "Week 2: Meet your match -- introductory call between volunteer and beneficiary/team",
          "Week 3: First independent session with check-in afterward from program coordinator",
          "Month 1: 30-day check-in survey to identify any issues early",
        ],
      },
      {
        heading: "Phase 4: Engagement and Retention",
        content: [
          "The biggest challenge in remote volunteer programs is not recruitment -- it is retention. People sign up with good intentions but drop off when they feel disconnected, unsupported, or uncertain about their impact.",
        ],
        items: [
          "Monthly team calls where all volunteers connect, share experiences, and learn from each other",
          "Bi-weekly impact updates showing what their work is actually accomplishing (share specific stories)",
          "Quarterly recognition -- even a simple certificate or social media shout-out matters enormously",
          "Annual volunteer appreciation event (virtual or in-person if geographically feasible)",
          "Clear escalation path when volunteers encounter challenges they can't resolve alone",
          "End-of-commitment debrief with invitation to continue, take a break, or transition to a different role",
        ],
      },
      {
        heading: "Tracking and Measuring Impact",
        content: [
          "Use a simple tracking system to measure both volunteer engagement and program outcomes:",
        ],
        table: {
          headers: ["Metric", "Frequency", "Target"],
          rows: [
            ["Session completion rate", "Monthly", "> 85%"],
            ["Volunteer retention (12-week cycle)", "Quarterly", "> 70%"],
            ["Beneficiary satisfaction score", "End of cycle", "> 4.0/5.0"],
            ["Volunteer satisfaction score", "End of cycle", "> 4.0/5.0"],
            ["Skills transfer assessment", "Pre/post cycle", "> 20% improvement"],
            ["Net Promoter Score (volunteers)", "Annually", "> 50"],
          ],
        },
      },
    ],
    sectionsRu: [
      {
        heading: "Почему удалённое волонтёрство работает",
        content: [
          "Традиционная модель международного волонтёрства -- полететь за рубеж на неделю, что-то построить, вернуться домой -- имеет хорошо задокументированные ограничения. Удалённое волонтёрство переворачивает эту модель, соединяя квалифицированных волонтёров с организациями через цифровые инструменты.",
        ],
      },
      {
        heading: "Фаза 1: Проектирование программы",
        content: [
          "Прежде чем набирать волонтёров, чётко определите структуру программы. Неоднозначность -- враг вовлечённости.",
        ],
        items: [
          "Определите 3-5 конкретных ролей волонтёров",
          "Установите минимальные обязательства по времени (2-4 часа в неделю, 12 недель минимум)",
          "Выберите технологическую платформу",
          "Создайте процесс подбора пар",
          "Определите метрики успеха",
        ],
      },
      {
        heading: "Фаза 2: Набор и отбор",
        content: [
          "Набор удалённых волонтёров требует иного подхода, чем для очных ролей.",
        ],
        items: [
          "Создайте простую онлайн-анкету",
          "Проведите 20-минутное видеоинтервью с каждым кандидатом",
          "Проверьте рекомендации",
          "Будьте прозрачны в отношении технических требований",
        ],
      },
      {
        heading: "Фаза 3: Адаптация",
        content: [
          "Структурированный процесс адаптации критически важен для удержания волонтёров.",
        ],
        items: [
          "Неделя 1: Приветственное письмо + ориентационное видео",
          "Неделя 1: Настройка технологий",
          "Неделя 2: Наблюдение за опытным волонтёром",
          "Неделя 2: Знакомство с подопечным",
          "Неделя 3: Первая самостоятельная сессия",
        ],
      },
      {
        heading: "Фаза 4: Вовлечённость и удержание",
        content: [
          "Главная проблема -- не набор, а удержание. Люди уходят, когда чувствуют себя оторванными или не видят результатов.",
        ],
        items: [
          "Ежемесячные командные звонки",
          "Регулярные обновления о воздействии",
          "Ежеквартальное признание",
          "Чёткий путь эскалации при проблемах",
        ],
      },
      {
        heading: "Отслеживание и измерение воздействия",
        content: [
          "Используйте простую систему отслеживания для измерения вовлечённости и результатов программы.",
        ],
        items: [
          "Процент завершения сессий: > 85%",
          "Удержание волонтёров (12 недель): > 70%",
          "Удовлетворённость подопечных: > 4.0/5.0",
          "Удовлетворённость волонтёров: > 4.0/5.0",
        ],
      },
    ],
  },
  {
    slug: "impact-measurement-templates",
    title: "Impact Measurement Templates",
    titleRu: "Шаблоны оценки воздействия",
    description: "Ready-to-use frameworks for tracking dual-impact across local volunteer communities and international beneficiary populations.",
    descriptionRu: "Готовые к использованию системы для отслеживания двойного воздействия на местных волонтёров и международных бенефициаров.",
    excerpt: "Track and report your organization's impact with proven frameworks. Includes logic models, KPI dashboards, and donor reporting templates.",
    excerptRu: "Отслеживайте и сообщайте о воздействии вашей организации. Включает логические модели, панели KPI и шаблоны отчётов для доноров.",
    icon: "BarChart3",
    keywords: [
      "nonprofit impact measurement template",
      "impact measurement framework nonprofit",
      "program evaluation templates",
      "nonprofit KPI dashboard",
      "donor impact report template",
    ],
    sections: [
      {
        heading: "Why Dual-Impact Measurement Matters",
        content: [
          "Most international development organizations measure impact in one direction: what happened for the beneficiaries overseas. But organizations that also engage local communities as volunteers, donors, and advocates create a second stream of impact that is equally important and often unmeasured.",
          "Dual-impact measurement tracks both dimensions: what changed for the people you serve internationally, and what changed for the people who participated locally. This approach not only gives you a more complete picture of your organization's value, but it also provides the kind of story that resonates with donors, board members, and community partners.",
        ],
      },
      {
        heading: "Logic Model Template",
        content: [
          "A logic model is the foundation of any impact measurement system. It maps the causal chain from what you invest (inputs) to what you ultimately achieve (impact). Here is a template adapted for organizations doing community-based international development:",
        ],
        table: {
          headers: ["Stage", "International Track", "Local/Community Track"],
          rows: [
            ["Inputs", "Curriculum, trainers, technology, seed funding", "Volunteer time, donated expertise, fundraising"],
            ["Activities", "Financial literacy training, business mentoring, microloans", "Volunteer matching, training sessions, fundraising events"],
            ["Outputs", "Entrepreneurs trained, businesses launched, loans disbursed", "Volunteers engaged, hours logged, funds raised"],
            ["Outcomes", "Increased income, improved financial health, job creation", "Skill development, cultural awareness, civic engagement"],
            ["Impact", "Reduced poverty, economic resilience, community development", "Strengthened local community, global citizenship, donor retention"],
          ],
        },
      },
      {
        heading: "Core KPI Framework",
        content: [
          "Track these key performance indicators on a monthly basis. Each KPI should have a baseline (where you started), a target (where you want to be), and an actual (where you are now).",
        ],
        table: {
          headers: ["Category", "KPI", "Measurement Method", "Frequency"],
          rows: [
            ["Reach", "Total beneficiaries served", "Program enrollment records", "Monthly"],
            ["Reach", "Total active volunteers", "Volunteer database", "Monthly"],
            ["Quality", "Program completion rate", "Attendance tracking", "Per cohort"],
            ["Quality", "Beneficiary satisfaction", "Post-program survey (1-5 scale)", "Per cohort"],
            ["Outcome", "Income change (beneficiaries)", "Pre/post income assessment", "6-month follow-up"],
            ["Outcome", "Businesses still operating", "Follow-up survey", "12-month follow-up"],
            ["Outcome", "Volunteer retention rate", "Volunteer tracking system", "Quarterly"],
            ["Financial", "Cost per beneficiary served", "Total program cost / beneficiaries", "Annually"],
            ["Financial", "Donor retention rate", "Donor database comparison", "Annually"],
            ["Growth", "New donors acquired", "Donor database", "Monthly"],
          ],
        },
      },
      {
        heading: "Data Collection Toolkit",
        content: [
          "For each KPI, you need a reliable, low-burden data collection method. Small nonprofits should prioritize simplicity over sophistication -- a consistently used Google Sheet beats an abandoned Salesforce implementation every time.",
        ],
        items: [
          "Pre/Post Assessments: Administer at program start and end. Keep to 10-15 questions. Include both knowledge questions and self-efficacy ratings.",
          "Session Attendance Logs: Track presence/absence for every session. Auto-calculate completion rates.",
          "Monthly Volunteer Activity Reports: A simple form volunteers complete at month-end. 5 minutes max.",
          "Quarterly Beneficiary Check-ins: Brief phone or video calls to track progress after program completion.",
          "Annual Donor Survey: Measure donor satisfaction, reasons for giving, and likelihood of continued support.",
          "Financial Tracking: Use a simple spreadsheet to track all program costs by category. Calculate cost-per-beneficiary annually.",
        ],
      },
      {
        heading: "Donor Reporting Template",
        content: [
          "Your impact data is only valuable if you communicate it effectively. Here is a structure for quarterly donor impact reports:",
        ],
        items: [
          "Executive Summary (1 paragraph): Key headline number + one compelling story",
          "By the Numbers: 4-6 KPIs with visual indicators (up/down arrows, green/yellow/red)",
          "Spotlight Story: One detailed beneficiary story with before/after details",
          "Volunteer Impact: How local engagement contributed to results this quarter",
          "Financial Stewardship: How donor funds were allocated (simple pie chart)",
          "Looking Ahead: Next quarter's goals and how the reader can help",
        ],
      },
      {
        heading: "Annual Impact Report Outline",
        content: [
          "Produce a comprehensive annual impact report using this structure:",
        ],
        items: [
          "Letter from the Executive Director",
          "Year in Numbers (full-page infographic with 8-10 key metrics)",
          "Program Highlights (2-3 pages covering each major program)",
          "Stories of Change (3-4 detailed beneficiary/volunteer stories)",
          "Financial Summary (revenue, expenses, program allocation percentages)",
          "Donor and Partner Recognition",
          "Looking Forward: Next year's goals and strategic priorities",
        ],
      },
    ],
    sectionsRu: [
      {
        heading: "Почему важно измерять двойное воздействие",
        content: [
          "Большинство организаций измеряют воздействие только в одном направлении: что произошло для бенефициаров. Но организации, которые также вовлекают местные сообщества, создают второй поток воздействия, который не менее важен.",
        ],
      },
      {
        heading: "Шаблон логической модели",
        content: [
          "Логическая модель -- основа любой системы измерения воздействия. Она отображает причинно-следственную цепь от вложений до конечного воздействия.",
        ],
        items: [
          "Вложения → Деятельность → Результаты → Эффекты → Воздействие",
          "Международный трек: обучение, наставничество, микрозаймы",
          "Местный трек: волонтёры, экспертиза, сбор средств",
        ],
      },
      {
        heading: "Основные KPI",
        content: [
          "Отслеживайте ключевые показатели эффективности ежемесячно.",
        ],
        items: [
          "Охват: бенефициары, волонтёры",
          "Качество: завершение программы, удовлетворённость",
          "Результат: изменение дохода, действующие бизнесы",
          "Финансы: стоимость на бенефициара, удержание доноров",
        ],
      },
      {
        heading: "Инструменты сбора данных",
        content: [
          "Для каждого KPI нужен надёжный и простой метод сбора данных.",
        ],
        items: [
          "Пре/пост-оценки: 10-15 вопросов",
          "Журнал посещаемости сессий",
          "Ежемесячные отчёты волонтёров",
          "Ежеквартальные проверки бенефициаров",
          "Ежегодный опрос доноров",
        ],
      },
      {
        heading: "Шаблон отчёта для доноров",
        content: [
          "Структура ежеквартального отчёта:",
        ],
        items: [
          "Резюме: ключевое число + история",
          "Цифры: 4-6 KPI с визуальными индикаторами",
          "История успеха: подробный рассказ бенефициара",
          "Воздействие волонтёров",
          "Финансовое управление",
          "Взгляд в будущее",
        ],
      },
    ],
  },
  {
    slug: "implementation-guide",
    title: "Community-Based International Development Implementation Guide",
    titleRu: "Руководство по внедрению программ международного развития",
    description: "A step-by-step roadmap for launching a community-based international development program, from initial planning through first-year operations.",
    descriptionRu: "Пошаговый план запуска программы международного развития на базе сообщества, от начального планирования до первого года работы.",
    excerpt: "Launch your international development program with confidence. A 12-month implementation roadmap with checklists, timelines, and templates.",
    excerptRu: "Запустите программу международного развития с уверенностью. 12-месячный план внедрения с чек-листами, сроками и шаблонами.",
    icon: "BookOpen",
    keywords: [
      "nonprofit implementation guide",
      "international development program guide",
      "how to start a nonprofit program",
      "community development roadmap",
      "nonprofit program launch checklist",
    ],
    sections: [
      {
        heading: "Before You Begin: Readiness Assessment",
        content: [
          "Launching an international development program is a significant commitment. Before investing time and resources, honestly assess whether your organization is ready. Answer these five questions:",
        ],
        items: [
          "Do you have a clear, specific mission that identifies who you serve, what you provide, and where you work?",
          "Do you have at least 3 committed people (staff or volunteers) who can dedicate 5+ hours per week to this work for at least 12 months?",
          "Do you have a relationship with at least one organization or contact in your target country?",
          "Do you have at least $5,000 in available funding (or a realistic plan to raise it) for first-year operations?",
          "Do you have a board of directors (or advisory board) that supports this initiative?",
        ],
      },
      {
        heading: "Months 1-3: Foundation",
        content: [
          "The first quarter is about building the structural foundation your program will rest on. Resist the temptation to start delivering programs immediately -- the planning you do now will determine whether your work is sustainable or a flash in the pan.",
        ],
        items: [
          "Month 1: Finalize your program model. What specific intervention will you deliver? Who is your target population? What outcomes do you expect?",
          "Month 1: Secure or confirm your legal structure (501(c)(3) status, fiscal sponsorship, or equivalent)",
          "Month 2: Develop curriculum or program content. Adapt proven models rather than building from scratch.",
          "Month 2: Establish your technology infrastructure (video conferencing, project management, communication tools)",
          "Month 3: Recruit and onboard your initial volunteer team (minimum 5 people for a viable pilot)",
          "Month 3: Establish your in-country partnership. This may involve travel or extensive video calls.",
        ],
      },
      {
        heading: "Months 4-6: Pilot Program",
        content: [
          "Run your first program cycle with a small cohort. The goal is not perfection -- it is learning. Document everything.",
        ],
        items: [
          "Launch with 5-10 beneficiaries maximum. You want enough to learn from but few enough to give individual attention.",
          "Collect baseline data on every participant (income, skills, business status, confidence level)",
          "Run your complete program cycle from start to finish without cutting corners",
          "Hold weekly debrief sessions with your volunteer team to identify what works and what doesn't",
          "Document every challenge, surprise, and success. This is your organizational learning.",
          "At pilot end: conduct formal evaluation with all participants and volunteers",
        ],
      },
      {
        heading: "Months 7-9: Iteration and Scaling",
        content: [
          "Use your pilot data to refine the program before expanding.",
        ],
        items: [
          "Analyze pilot results: What worked? What didn't? What was the completion rate? What were common dropout reasons?",
          "Revise curriculum based on feedback. Cut what didn't resonate, expand what did.",
          "Develop a scalable version of your program that can serve 2-3x more participants",
          "Begin fundraising using pilot results as proof of concept",
          "Recruit a second cohort of volunteers to build organizational capacity",
          "Create a simple marketing strategy to attract participants for the next cycle",
        ],
      },
      {
        heading: "Months 10-12: Growth and Sustainability",
        content: [
          "The final quarter of year one is about building the systems that will carry your work into year two and beyond.",
        ],
        items: [
          "Launch your second (full-scale) program cycle with 15-25 beneficiaries",
          "Establish regular donor communication (monthly or quarterly updates)",
          "Create your first annual impact report using data from the pilot and second cycle",
          "Develop a year-two strategic plan with specific growth targets",
          "Apply for grants using your demonstrated impact data",
          "Celebrate and recognize your founding team -- their contribution to a successful first year is invaluable",
        ],
      },
      {
        heading: "Common Pitfalls to Avoid",
        content: [
          "Based on our experience at Businesses Beyond Borders and observation of other organizations in the space, here are the most common mistakes new international development programs make:",
        ],
        items: [
          "Starting too big: A failed pilot with 50 people is worse than a successful pilot with 5. Start small, prove the model, then scale.",
          "Ignoring the local context: Programs designed entirely from abroad almost always miss critical cultural, economic, or practical realities. Invest in local partnerships.",
          "Measuring activity instead of outcomes: Counting workshops delivered tells you nothing. Measuring whether participants' incomes actually changed tells you everything.",
          "Volunteer burnout: Remote volunteering sounds easy until people are juggling it with full-time jobs and family. Set realistic expectations and build in breaks.",
          "Donor dependency: If your entire program depends on one major donor, you are one conversation away from collapse. Diversify from day one.",
          "Mission drift: Saying yes to every opportunity feels productive but usually leads to doing many things poorly. Stay focused on your core competency.",
        ],
      },
    ],
    sectionsRu: [
      {
        heading: "Прежде чем начать: Оценка готовности",
        content: [
          "Запуск программы международного развития -- серьёзное обязательство. Честно оцените готовность вашей организации.",
        ],
        items: [
          "Есть ли у вас чёткая миссия?",
          "Есть ли минимум 3 человека, готовых посвятить 5+ часов в неделю?",
          "Есть ли связь с организацией в целевой стране?",
          "Есть ли минимум $5,000 на первый год?",
          "Есть ли поддержка правления?",
        ],
      },
      {
        heading: "Месяцы 1-3: Фундамент",
        content: [
          "Первый квартал -- построение структурной основы. Не спешите с реализацией программ.",
        ],
        items: [
          "Месяц 1: Модель программы и юридическая структура",
          "Месяц 2: Разработка учебной программы и технологической инфраструктуры",
          "Месяц 3: Набор волонтёров и установление партнёрства",
        ],
      },
      {
        heading: "Месяцы 4-6: Пилотная программа",
        content: [
          "Запустите первый цикл с малой группой. Цель -- не совершенство, а обучение.",
        ],
        items: [
          "5-10 бенефициаров максимум",
          "Сбор базовых данных",
          "Еженедельные обсуждения с командой",
          "Формальная оценка по завершении",
        ],
      },
      {
        heading: "Месяцы 7-9: Итерация и масштабирование",
        content: [
          "Используйте данные пилота для доработки программы.",
        ],
        items: [
          "Анализ результатов пилота",
          "Пересмотр учебной программы",
          "Начало сбора средств",
          "Набор второй когорты волонтёров",
        ],
      },
      {
        heading: "Месяцы 10-12: Рост и устойчивость",
        content: [
          "Последний квартал первого года -- построение систем для второго года.",
        ],
        items: [
          "Запуск полного цикла на 15-25 бенефициаров",
          "Регулярная коммуникация с донорами",
          "Первый годовой отчёт о воздействии",
          "Стратегический план на второй год",
        ],
      },
      {
        heading: "Типичные ошибки",
        content: [
          "Наиболее распространённые ошибки новых программ:",
        ],
        items: [
          "Слишком масштабный старт",
          "Игнорирование местного контекста",
          "Измерение деятельности вместо результатов",
          "Выгорание волонтёров",
          "Зависимость от одного донора",
          "Размывание миссии",
        ],
      },
    ],
  },
  {
    slug: "financial-literacy-starter-kit",
    title: "Financial Literacy Starter Kit",
    titleRu: "Стартовый набор финансовой грамотности",
    description: "A beginner-friendly guide to building financial health: budgeting basics, debt elimination strategies, emergency fund planning, and long-term wealth building for individuals and families.",
    descriptionRu: "Простое руководство по финансовому здоровью: основы бюджетирования, стратегии погашения долгов, планирование резервного фонда и долгосрочное накопление.",
    excerpt: "Master the fundamentals of personal finance with practical worksheets for budgeting, debt payoff, and savings goals.",
    excerptRu: "Освойте основы личных финансов с практическими рабочими листами для бюджетирования, погашения долгов и накоплений.",
    icon: "DollarSign",
    keywords: [
      "financial literacy starter kit",
      "free budgeting template",
      "debt payoff planner free",
      "personal finance worksheet",
      "zero-based budget template",
    ],
    sections: [
      {
        heading: "Your Financial Starting Point",
        content: [
          "Before you can build financial health, you need to know exactly where you stand. This starter kit walks you through a simple four-step process that thousands of entrepreneurs in Central Asia and the United States have used to take control of their money for the first time.",
          "You don't need any special knowledge or tools. All you need is honesty about your current situation and willingness to follow through.",
        ],
      },
      {
        heading: "Step 1: The Income Snapshot",
        content: [
          "Write down every source of income you received last month. Include everything: salary, side work, irregular income, help from family. If your income varies month to month, use the average of the last three months.",
        ],
        items: [
          "Primary job/salary: $_____ per month",
          "Second job or side work: $_____ per month",
          "Irregular income (average): $_____ per month",
          "Other sources: $_____ per month",
          "TOTAL MONTHLY INCOME: $_____ per month",
        ],
      },
      {
        heading: "Step 2: The Expense Tracker",
        content: [
          "For the next 30 days, write down every single purchase. Every tea, every bus fare, every bill. Most people discover they spend 15-25% more than they think they do. This exercise alone changes behavior.",
        ],
        items: [
          "Housing (rent/mortgage): $_____",
          "Food and groceries: $_____",
          "Transportation: $_____",
          "Utilities (electric, water, phone, internet): $_____",
          "Debt payments: $_____",
          "Family obligations: $_____",
          "Personal/entertainment: $_____",
          "Everything else: $_____",
          "TOTAL MONTHLY EXPENSES: $_____",
        ],
      },
      {
        heading: "Step 3: The Debt Inventory",
        content: [
          "List every debt you owe. Include the total amount, the interest rate, and the minimum monthly payment. This is the hardest step emotionally, but you cannot eliminate debt you haven't named.",
        ],
        table: {
          headers: ["Who You Owe", "Total Amount", "Interest Rate", "Minimum Payment"],
          rows: [
            ["(example) Bank loan", "$2,000", "18%", "$85/month"],
            ["(example) Relative", "$500", "0%", "$50/month"],
            ["", "", "", ""],
            ["", "", "", ""],
            ["TOTAL", "$_____", "", "$_____/month"],
          ],
        },
      },
      {
        heading: "Step 4: The Zero-Based Budget",
        content: [
          "A zero-based budget means every dollar of income gets a job before the month begins. Income minus all planned expenses should equal zero. This doesn't mean you spend everything -- savings is a planned expense.",
          "The formula: Income - Needs - Debt Payments - Savings - Wants = $0",
        ],
        items: [
          "Needs (50-60% of income): Housing, food, utilities, transportation, minimum debt payments",
          "Debt acceleration (10-20%): Extra payments beyond minimums, starting with smallest debt or highest interest",
          "Savings (10-15%): Emergency fund first (target: 1 month of expenses), then long-term savings",
          "Wants (10-20%): Everything else -- entertainment, dining out, new clothes, gifts",
        ],
      },
      {
        heading: "The Debt Snowball Method",
        content: [
          "List your debts from smallest balance to largest. Make minimum payments on everything except the smallest debt. Throw every extra dollar at the smallest debt until it's gone. Then roll that payment into the next smallest. The psychological wins of eliminating debts quickly build momentum that keeps you going.",
        ],
      },
      {
        heading: "Emergency Fund Roadmap",
        content: [
          "An emergency fund prevents one bad month from destroying years of progress. Build it in three stages:",
        ],
        items: [
          "Stage 1 (Starter): Save $500 or one week of expenses -- whichever is higher. This covers small emergencies without going into debt.",
          "Stage 2 (Stable): Save one full month of expenses. This covers job loss, medical bills, or major repairs.",
          "Stage 3 (Secure): Save three months of expenses. This provides genuine financial security and the confidence to take calculated risks like starting a business.",
        ],
      },
    ],
    sectionsRu: [
      {
        heading: "Ваша финансовая отправная точка",
        content: [
          "Прежде чем строить финансовое здоровье, нужно точно знать, где вы находитесь. Этот набор проведёт вас через простой четырёхэтапный процесс.",
        ],
      },
      {
        heading: "Шаг 1: Обзор доходов",
        content: [
          "Запишите каждый источник дохода за прошлый месяц. Включите всё: зарплату, подработки, помощь от семьи.",
        ],
        items: [
          "Основная работа: _____ сом/месяц",
          "Подработка: _____ сом/месяц",
          "Нерегулярный доход: _____ сом/месяц",
          "ИТОГО: _____ сом/месяц",
        ],
      },
      {
        heading: "Шаг 2: Отслеживание расходов",
        content: [
          "В течение 30 дней записывайте каждую покупку. Большинство людей обнаруживают, что тратят на 15-25% больше, чем думают.",
        ],
        items: [
          "Жильё: _____",
          "Продукты: _____",
          "Транспорт: _____",
          "Коммунальные услуги: _____",
          "Платежи по долгам: _____",
          "Семейные обязательства: _____",
          "Личное/развлечения: _____",
          "ИТОГО РАСХОДЫ: _____",
        ],
      },
      {
        heading: "Шаг 3: Инвентаризация долгов",
        content: [
          "Перечислите каждый долг. Вы не можете устранить долг, который не назвали.",
        ],
        items: [
          "Кому должны | Сумма | Процент | Минимальный платёж",
          "Заполните для каждого долга",
        ],
      },
      {
        heading: "Шаг 4: Бюджет с нуля",
        content: [
          "Каждый сом дохода получает задание до начала месяца. Доход минус все запланированные расходы = 0.",
        ],
        items: [
          "Потребности (50-60%): жильё, еда, коммунальные",
          "Ускорение погашения долгов (10-20%)",
          "Сбережения (10-15%): сначала резервный фонд",
          "Желания (10-20%): развлечения, подарки",
        ],
      },
      {
        heading: "Метод снежного кома",
        content: [
          "Перечислите долги от наименьшего к наибольшему. Платите минимум по всем, кроме наименьшего. Направьте все лишние деньги на наименьший долг до его полного погашения.",
        ],
      },
      {
        heading: "План резервного фонда",
        content: [
          "Резервный фонд предотвращает превращение одного плохого месяца в катастрофу.",
        ],
        items: [
          "Этап 1: Сбережения на одну неделю расходов",
          "Этап 2: Один месяц расходов",
          "Этап 3: Три месяца расходов",
        ],
      },
    ],
  },
  {
    slug: "lean-startup-budget-template",
    title: "Lean Startup Budget Template",
    titleRu: "Шаблон бюджета бережливого стартапа",
    description: "A practical budgeting framework for launching a business on minimal capital. Covers startup costs, first-month projections, break-even analysis, and cash flow planning for entrepreneurs starting with under $1,000.",
    descriptionRu: "Практическая система бюджетирования для запуска бизнеса с минимальным капиталом. Включает стартовые расходы, прогнозы на первый месяц и планирование денежных потоков.",
    excerpt: "Plan your business launch on a tight budget. Includes startup cost calculator, break-even worksheet, and 3-month cash flow projector.",
    excerptRu: "Спланируйте запуск бизнеса с ограниченным бюджетом. Включает калькулятор стартовых расходов и прогноз денежных потоков.",
    icon: "Calculator",
    keywords: [
      "lean startup budget template",
      "startup cost calculator free",
      "small business budget template",
      "how to start business on tight budget",
      "break-even analysis template",
    ],
    sections: [
      {
        heading: "The Lean Startup Mindset",
        content: [
          "You don't need a lot of money to start a business. What you need is clarity about exactly how much money you need, what it will be spent on, and how quickly your business can start generating revenue. This template is designed for entrepreneurs starting with $1,000 or less -- which describes the majority of first-time business owners in emerging markets.",
          "The lean startup approach means spending as little as possible to test whether your business idea works before investing more. Every dollar should be traceable to a specific purpose.",
        ],
      },
      {
        heading: "Part 1: Startup Cost Calculator",
        content: [
          "List every expense you will incur before your first sale. Be honest and specific. Many new businesses fail because they underestimate startup costs by 30-50%.",
        ],
        table: {
          headers: ["Category", "Item", "Estimated Cost", "Actual Cost"],
          rows: [
            ["Legal/Registration", "Business registration/license", "$___", "$___"],
            ["Legal/Registration", "Permits or certifications", "$___", "$___"],
            ["Equipment", "Tools, machines, or technology", "$___", "$___"],
            ["Equipment", "Phone or computer (if needed)", "$___", "$___"],
            ["Inventory/Supplies", "Initial materials or products", "$___", "$___"],
            ["Inventory/Supplies", "Packaging or display materials", "$___", "$___"],
            ["Marketing", "Business cards or flyers", "$___", "$___"],
            ["Marketing", "Social media setup (photos, etc.)", "$___", "$___"],
            ["Space", "First month rent (if applicable)", "$___", "$___"],
            ["Space", "Utilities deposit", "$___", "$___"],
            ["Buffer", "Emergency reserve (10-15% of total)", "$___", "$___"],
            ["", "TOTAL STARTUP COSTS", "$___", "$___"],
          ],
        },
      },
      {
        heading: "Part 2: Revenue Projection",
        content: [
          "Estimate your monthly revenue. Be conservative -- most new businesses earn less in the first three months than they expect. Use the formula: Number of customers per month x Average sale amount = Monthly revenue.",
        ],
        table: {
          headers: ["Month", "Customers", "Avg Sale", "Revenue", "Expenses", "Profit/Loss"],
          rows: [
            ["Month 1", "___", "$___", "$___", "$___", "$___"],
            ["Month 2", "___", "$___", "$___", "$___", "$___"],
            ["Month 3", "___", "$___", "$___", "$___", "$___"],
          ],
        },
      },
      {
        heading: "Part 3: Break-Even Analysis",
        content: [
          "Break-even is the point where your total revenue equals your total costs. Calculate it with this formula:",
          "Fixed Monthly Costs / (Average Sale Price - Variable Cost Per Sale) = Number of Sales Needed to Break Even",
        ],
        items: [
          "Fixed monthly costs (rent, phone, internet, loan payments): $_____ per month",
          "Average selling price per product/service: $_____",
          "Variable cost per sale (materials, packaging, transaction fees): $_____",
          "Profit per sale: $_____ (selling price minus variable cost)",
          "Break-even point: _____ sales per month",
          "At your projected customer rate, you will break even in month: _____",
        ],
      },
      {
        heading: "Part 4: Where to Cut Costs",
        content: [
          "Before spending money, ask these five questions for every line item:",
        ],
        items: [
          "Can I start without this? Many businesses launch without a website, business cards, or dedicated workspace.",
          "Can I borrow instead of buy? Equipment, vehicles, and tools can often be shared or rented.",
          "Can I use a free alternative? Social media replaces paid advertising. WhatsApp replaces a business phone line. A kitchen table replaces office space.",
          "Can I barter for it? Trade your skills for services you need. A baker can trade bread for accounting help.",
          "Can I start smaller? Instead of buying 100 units of inventory, buy 10 and reinvest the profits.",
        ],
      },
      {
        heading: "Part 5: Cash Flow Emergency Plan",
        content: [
          "Plan for the worst-case scenario before it happens. Answer these questions now, not when you're in crisis:",
        ],
        items: [
          "If sales are 50% below projections for 2 months, what expenses can you cut immediately?",
          "Do you have a personal financial cushion (savings, family support) that can cover 2 months of business losses?",
          "What is your walk-away number? At what point would you close the business to protect your family's finances?",
          "Who can you ask for advice if things go wrong? (Mentor, experienced business owner, BBB program coordinator)",
        ],
      },
    ],
    sectionsRu: [
      {
        heading: "Мышление бережливого стартапа",
        content: [
          "Вам не нужно много денег, чтобы начать бизнес. Нужна ясность: сколько именно денег нужно, на что они пойдут и как быстро бизнес начнёт приносить доход.",
        ],
      },
      {
        heading: "Часть 1: Калькулятор стартовых расходов",
        content: [
          "Перечислите каждый расход до первой продажи. Будьте честны -- многие бизнесы терпят неудачу, потому что недооценивают стартовые расходы на 30-50%.",
        ],
        items: [
          "Регистрация и лицензии",
          "Оборудование и инструменты",
          "Начальные материалы и товары",
          "Маркетинг и реклама",
          "Аренда помещения (если нужно)",
          "Резервный фонд (10-15% от общей суммы)",
        ],
      },
      {
        heading: "Часть 2: Прогноз доходов",
        content: [
          "Оцените ежемесячный доход консервативно. Количество клиентов x Средний чек = Месячный доход.",
        ],
        items: [
          "Месяц 1: клиенты ___ x средний чек ___ = доход ___",
          "Месяц 2: клиенты ___ x средний чек ___ = доход ___",
          "Месяц 3: клиенты ___ x средний чек ___ = доход ___",
        ],
      },
      {
        heading: "Часть 3: Анализ точки безубыточности",
        content: [
          "Точка безубыточности -- когда выручка равна расходам.",
        ],
        items: [
          "Постоянные расходы: _____ сом/месяц",
          "Средняя цена продажи: _____ сом",
          "Переменные расходы на продажу: _____ сом",
          "Прибыль с продажи: _____ сом",
          "Точка безубыточности: _____ продаж/месяц",
        ],
      },
      {
        heading: "Часть 4: Где сократить расходы",
        content: [
          "Перед каждой тратой задайте пять вопросов:",
        ],
        items: [
          "Можно ли начать без этого?",
          "Можно ли одолжить вместо покупки?",
          "Есть ли бесплатная альтернатива?",
          "Можно ли обменяться услугами?",
          "Можно ли начать в меньшем масштабе?",
        ],
      },
      {
        heading: "Часть 5: План на случай кризиса",
        content: [
          "Планируйте худший сценарий заранее:",
        ],
        items: [
          "Какие расходы можно сразу сократить при падении продаж на 50%?",
          "Есть ли финансовая подушка на 2 месяца убытков?",
          "При какой сумме вы закроете бизнес?",
          "К кому обратиться за советом?",
        ],
      },
    ],
  },
];

// Map each blog post to its 2 most relevant resources
export const blogResourceMap: Record<string, string[]> = {
  "why-entrepreneurship-is-the-most-sustainable-form-of-foreign-aid": [
    "implementation-guide",
    "impact-measurement-templates",
  ],
  "what-central-asia-taught-us-about-resilience-and-business": [
    "asset-mapping-toolkit",
    "implementation-guide",
  ],
  "how-one-nonprofit-is-rethinking-poverty-without-handouts": [
    "impact-measurement-templates",
    "implementation-guide",
  ],
  "debt-snowball-vs-avalanche-which-actually-works": [
    "financial-literacy-starter-kit",
    "lean-startup-budget-template",
  ],
  "5-financial-habits-first-generation-entrepreneurs": [
    "financial-literacy-starter-kit",
    "lean-startup-budget-template",
  ],
  "why-financial-literacy-should-be-a-human-right": [
    "financial-literacy-starter-kit",
    "impact-measurement-templates",
  ],
  "from-a-haitian-orphanage-to-founding-a-nonprofit-jackens-story": [
    "implementation-guide",
    "remote-volunteer-playbook",
  ],
  "bridging-two-worlds-how-yeva-brings-central-asian-insight-to-american-nonprofits": [
    "remote-volunteer-playbook",
    "asset-mapping-toolkit",
  ],
  "understanding-the-post-soviet-economy-why-central-asia-needs-entrepreneurs": [
    "implementation-guide",
    "impact-measurement-templates",
  ],
  "the-untapped-potential-of-women-entrepreneurs-in-kyrgyzstan": [
    "lean-startup-budget-template",
    "asset-mapping-toolkit",
  ],
  "how-to-start-a-business-with-less-than-500": [
    "lean-startup-budget-template",
    "financial-literacy-starter-kit",
  ],
  "building-business-networks-in-isolated-communities": [
    "asset-mapping-toolkit",
    "remote-volunteer-playbook",
  ],
  "the-complete-guide-to-microfinance-small-loans-big-impact": [
    "lean-startup-budget-template",
    "impact-measurement-templates",
  ],
  "7-ways-to-support-global-entrepreneurs-from-your-living-room": [
    "remote-volunteer-playbook",
    "asset-mapping-toolkit",
  ],
  "what-happens-when-you-sponsor-an-entrepreneur-a-real-impact-breakdown": [
    "impact-measurement-templates",
    "implementation-guide",
  ],
  "community-cooperatives-the-future-of-sustainable-development": [
    "asset-mapping-toolkit",
    "implementation-guide",
  ],
};

export function getResourceBySlug(slug: string): ResourceDef | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesForBlog(blogSlug: string): ResourceDef[] {
  const slugs = blogResourceMap[blogSlug] || ["asset-mapping-toolkit", "implementation-guide"];
  return slugs.map((s) => resources.find((r) => r.slug === s)).filter(Boolean) as ResourceDef[];
}
