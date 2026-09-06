import type { BusinessWeekContent } from './types';

export const week10Content: BusinessWeekContent = {
  week: 10,
  module: { number: 4, title: 'Build Your Traction' },
  title: 'MVP Design',
  subtitle: 'Build the simplest version that delivers real value',
  keyQuote:
    "If you're not embarrassed by the first version of your product, you've launched too late.",
  quoteAuthor: 'Reid Hoffman',
  overview:
    'You have spent nine weeks discovering a problem, researching customers, designing a business model, and validating your core assumptions. Now comes a pivotal moment: you must decide exactly what to build first. This week bridges the gap between validated idea and real-world product. You will revisit your Value Proposition Canvas in light of everything you have learned, ruthlessly cut features using the MoSCoW framework, and design an MVP — a Minimum Viable Product — that delivers genuine value without requiring six months of work to build. The goal is not a perfect product. The goal is a real one, in the hands of real customers, as soon as possible.',
  objectives: [
    'Update your Value Proposition Canvas to reflect what you learned during validation',
    'Apply the MoSCoW framework to prioritize features and cut scope ruthlessly',
    'Identify which type of MVP fits your business context and resource constraints',
    'Build a concrete resource inventory and realistic timeline for your MVP launch',
    'Define the exact boundaries of your MVP — what it includes and what it deliberately excludes',
  ],
  keyTopics: [
    {
      title: 'VPC Before and After',
      description:
        'How to honestly update your Value Proposition Canvas after customer interviews, what changed and why, and how to tighten the fit between what customers actually want and what you plan to build.',
    },
    {
      title: 'MoSCoW Prioritization',
      description:
        'The four-category system — Must Have, Should Have, Could Have, Won\'t Have — that separates the essential from the tempting and protects you from the #1 startup killer: feature creep.',
    },
    {
      title: 'MVP Types and Selection',
      description:
        'Five distinct MVP types — single-feature, Wizard of Oz, concierge, piecemeal, and crowd-funded — with Central Asian examples for each, helping you match the right approach to your specific situation.',
    },
  ],
  actionItems: [
    'Pull out your original Value Proposition Canvas from Week 4 and mark every assumption that was confirmed, refuted, or partially validated during Weeks 7–9',
    'List every feature, service, or capability you have ever imagined for your business on separate slips of paper',
    'Sort each feature into one of the four MoSCoW categories, placing every item in exactly one bucket',
    'Read descriptions of all five MVP types and identify which one (or which combination) fits your situation',
    'Complete your resource inventory: money available, time you can dedicate per week, skills you personally have, people who can help you',
    'Write out your MVP definition in one paragraph — specific enough that a stranger could build it without asking you questions',
  ],
  realWorldActivity: {
    title: 'Define Your MVP Scope',
    description:
      'Write your MVP definition statement: "My MVP is [description]. It includes [specific list of features]. It deliberately excludes [specific list of excluded features] until [milestone or date]. I will know my MVP is working when [specific measurable outcome]." Share this with someone who was not in your customer interviews and ask them to challenge every word. If they can find ambiguity, find it yourself first.',
  },
  lessonSections: [
    {
      id: 'week10-section1',
      heading: 'Updating Your Value Proposition Canvas',
      content: [
        'When you created your original Value Proposition Canvas in Week 4, it was a document of hypotheses. You were writing down your best guesses about customer jobs, pains, and gains — intelligent guesses informed by observation, but guesses nonetheless. Now, after three weeks of direct customer contact, you have something far more valuable than guesses. You have evidence. The single most important thing you can do before designing your MVP is to sit down with your original VPC and update it honestly, line by line, in light of what you actually heard.',
        'Customer jobs are the activities, tasks, and goals that drive your customers through their day. When you first filled in this section, you probably listed the jobs you assumed mattered most. Interviews almost always reveal a different story. Perhaps you thought your bakery customers\' primary job was "enjoy a delicious treat," but you discovered their real job is "have something beautiful to bring to a gathering that reflects well on me." These are not the same job, and they lead to completely different product decisions. Go back and rewrite the jobs section using the exact language your interviewees used.',
        'Customer pains deserve the same honest revision. The pains you assumed would matter — inconvenience, high prices, poor quality — may not have been what customers complained about most intensely. In many Central Asian markets, interviewers discover that the real pain is unreliability: a vendor who promises delivery on Wednesday but arrives Friday, or a product whose quality varies wildly from one purchase to the next. If your interviews surfaced pains you had not anticipated, these new pains should now sit at the top of your list. Rank them by intensity, not by how much you want them to be true.',
        'Customer gains require the most careful revision, because gains are what customers hope to achieve — and hope is easily colored by social desirability. Customers tell interviewers what they think they should want rather than what genuinely excites them. A gain that came up repeatedly, spontaneously, and with visible enthusiasm is a real gain. A gain that customers only mentioned when you asked them directly is a weaker signal. As you revise your gains section, note not just what customers want, but how much they want it and how they expressed it.',
        'Now turn to the right side of the canvas — your products and services, pain relievers, and gain creators. For each item you originally listed, ask a simple but ruthless question: did your interviews provide evidence that this actually matters to real customers? Pain relievers that address pains you no longer believe are primary should be moved or removed. Gain creators that you invented but customers never mentioned should be questioned seriously. This is uncomfortable work, because you may have to acknowledge that your original ideas need significant revision. That discomfort is valuable information.',
        'The most useful output of this exercise is not the updated canvas itself — it is the gap analysis between your original and updated versions. Every place where you changed something represents a hypothesis you were wrong about, and that is where the real learning lives. Write down each change and the specific evidence from your interviews that drove it. This documentation becomes your validation record, showing anyone who asks — a bank, an investor, a mentor — that you built your business on evidence rather than assumption.',
        'Finally, look at the overall fit between the left and right sides of your updated canvas. A well-fitted VPC is one where every significant pain has a pain reliever, every important gain has a gain creator, and every core job is addressed by your product or service. Gaps in this fit are gaps in your offering. You do not need to fill every gap before launching your MVP — but you should know exactly where the gaps are and have a theory about which ones matter most to your first customers.',
        'One important principle: updating your VPC does not mean you were wrong before. It means you are learning, which is precisely what this course is designed to produce. Every great entrepreneur revises their value proposition multiple times before finding the version that truly resonates. The entrepreneurs who fail are those who cling to their original assumptions long after the evidence has told them to let go.',
      ],
      callout: {
        type: 'tip',
        content:
          'Print your original VPC, tape it next to a blank one, and fill in the new version without looking at the old one first. Then compare the two side by side. The differences will tell you what you actually learned from validation.',
      },
      questionsToConsider: [
        'What is the single biggest thing you were wrong about in your original VPC?',
        'Which customer pain turned out to be more severe than you expected?',
        'Is there a customer gain that you assumed mattered but no one mentioned spontaneously?',
        'After updating your VPC, does your planned offering still make sense? Or do you need to rethink it more fundamentally?',
      ],
    },
    {
      id: 'week10-section2',
      heading: 'MoSCoW Feature Prioritization',
      content: [
        'Feature creep is one of the most reliable ways to kill a new business. It happens gradually, almost invisibly, and it feels productive while it is happening — each new feature seems reasonable on its own, but together they turn a simple, powerful idea into an overwhelming, unfinished mess. The MoSCoW framework exists specifically to prevent this. It forces you to make hard decisions about what your business truly needs to launch, and what is merely tempting to add.',
        'The "M" stands for Must Have. These are features without which your product cannot function as a minimum viable offering. A Must Have is not a feature you really want — it is a feature whose absence makes the product fundamentally broken or illegal or undeliverable. If you are building a custom tailoring service, a Must Have might be the ability to take accurate measurements and deliver a garment on the promised date. Without those, you have no business at all. Be brutally honest here: entrepreneurs routinely place things in Must Have that are actually preferences, not requirements.',
        'The "S" stands for Should Have. These are features that significantly improve the product and that most customers would expect to see eventually — but that you can launch without. A Should Have for a home-based baking business might be attractive packaging or the ability to accept mobile payments. These things matter and you should build them soon, but your very first customer can receive her cake without them. The key test for Should Have is: "Would a reasonable first customer accept the product without this?" If yes, it is at most a Should Have.',
        'The "C" stands for Could Have. These features would be nice additions — they might delight some customers or add convenience — but their absence will not significantly affect the core experience. Could Have features are often the first ideas that entrepreneurs generate when excited about their business, because they are the fun ideas. Telegram order tracking, a referral rewards system, a loyalty points program — these are Could Haves for most small businesses at launch. They belong on a future roadmap, not in an MVP.',
        'The "W" stands for Won\'t Have. This is where brutally honest entrepreneurs earn enormous time and money. Won\'t Have does not mean "never" — it means "not in this version, and we are consciously committing to that decision." Listing things in Won\'t Have is an act of discipline. It prevents scope creep by turning implicit assumptions ("surely we\'ll need a website eventually") into explicit decisions ("we will not build a website for the first three months"). The moment a feature is in Won\'t Have, you stop thinking about it, which frees cognitive resources for what actually matters.',
        'When running MoSCoW with your business, start by writing every possible feature, service element, or capability you can imagine on individual cards or sticky notes. Do not filter at this stage — write everything, from the mundane to the ambitious. Then go through them one by one and ask, "Is this a Must Have, Should Have, Could Have, or Won\'t Have for launch?" The first pass is usually too generous with Must Have. Go through the Must Have pile a second time and challenge every item: "Could our first customer receive genuine value without this?" If yes, move it to Should Have.',
        'One common mistake is treating operational necessities as product features. Registering your business with the local government is not a product feature — it is a legal requirement. Keeping a phone charged so you can receive Telegram orders is not a feature — it is basic business operation. MoSCoW should focus on customer-facing capabilities. What can the customer see, touch, experience, or benefit from? That is what you are prioritizing.',
        'The real power of MoSCoW emerges when you use it repeatedly over time. Your MVP launches with Must Haves only. As you earn revenue and gain confidence, you add Should Haves. As your business grows, you introduce Could Haves. And you revisit the Won\'t Have list regularly, moving things up when market evidence suggests they have become important. This creates a disciplined product roadmap driven by customer needs rather than founder enthusiasm.',
      ],
      callout: {
        type: 'warning',
        content:
          'If your Must Have list has more than 5–7 items, you have not been ruthless enough. Real Must Haves are rare. Go through your list again and ask: "If I removed this, would my very first customer refuse to pay?" If not, it is not a Must Have.',
      },
      questionsToConsider: [
        'What is genuinely in your Must Have list — not what you want to include, but what is truly non-negotiable for delivering real value?',
        'Which feature are you most tempted to include that probably belongs in Could Have or Won\'t Have?',
        'What would you need to remove from your current plan to be able to launch in the next 30 days?',
        'If you had to ship your product this Friday, what would you absolutely have to cut — and would customers actually miss it?',
      ],
    },
    {
      id: 'week10-section3',
      heading: 'Designing Your MVP',
      content: [
        'The Minimum Viable Product is one of the most misunderstood concepts in entrepreneurship. Many people hear "minimum" and assume it means low quality or a rough prototype. That is exactly wrong. The "minimum" in MVP refers to scope — the range of features and capabilities — not to the quality of those features. Your MVP should deliver genuine, excellent value in a narrow domain. It should be something a real customer would pay for and recommend to a friend. The goal is to eliminate everything that is not essential to that value, not to deliver something half-finished.',
        'The single-feature MVP is the most common type and the most appropriate for most new businesses in Central Asian markets. You identify the one thing your business does that creates the most value for your most important customer segment, and you build an offering around exactly that. A home-based baker whose MVP is three flavors of celebration cake, ordered via Telegram with three-day advance notice and local delivery — that is a single-feature MVP. It is complete, it is excellent, and it is specifically scoped. Everything else comes later.',
        'The Wizard of Oz MVP is named after the scene where you discover that the man behind the curtain is running the show manually. In a Wizard of Oz MVP, the customer experiences what appears to be a systematic, automated service — but behind the scenes, you are doing everything by hand. This type works well when the core value of your business is in the outcome, not the process. A translation service might accept orders through a professional-looking form but fulfill them manually. A produce delivery service might have customers place orders online while you personally drive to the bazaar each morning. The customer gets real value; you learn which orders, what volume, and what preferences exist before you invest in automation.',
        'The concierge MVP flips this approach — instead of hiding the manual work, you make it the feature. You personally serve a small number of carefully selected customers in an extremely hands-on way, learning every detail of their needs. A business consulting service might offer ten free one-on-one sessions to local entrepreneurs, learning deeply what their problems are before building any standardized offering. A caterer might personally cook and deliver for three families for a month, learning preferences, timing, and dietary needs before scaling. The concierge MVP is expensive in time but extraordinarily valuable in learning.',
        'The piecemeal MVP assembles an offering from existing tools and services without building anything custom. In Central Asia, this often looks like: Telegram for order intake, a Google Form for customer information, WhatsApp for delivery coordination, and a cash-on-delivery payment model. No custom technology, no upfront investment, but a complete business operation that can process orders and generate revenue. The piecemeal approach is particularly powerful in markets where customers are already comfortable with common digital platforms and where smartphone penetration means Telegram and WhatsApp are universal.',
        'The crowd-funded MVP is less common in Central Asian markets but worth understanding. Platforms like Kickstarter or, more locally, informal pre-sale campaigns allow you to validate demand before producing anything. A craftsperson might announce a limited collection of handmade goods and take pre-orders before buying materials. A workshop organizer might sell tickets to a training session before booking the venue. If people pay in advance, you have validation of the highest possible quality — real money from real customers who wanted your product enough to pay before it existed.',
        'Your resource inventory is the practical constraint that determines which MVP type is available to you. Be honest about three categories: financial capital (how much money you can spend without income from the business), time capital (how many hours per week you can realistically dedicate), and human capital (skills you have, people who can help, and what they can contribute). A woman running a home-based business while also managing a household has very different resource constraints than a man who has left a salaried job to focus full-time on entrepreneurship. Your MVP must fit your actual resource reality, not an idealized version of it.',
        'Central Asian market conditions suggest specific MVP design principles. First, mobile-first: your customers use smartphones, not computers, and they communicate primarily through Telegram. Any digital element of your MVP should work perfectly on a phone. Second, cash-compatible: many customers, particularly older ones and those in smaller cities, still prefer cash. Your MVP payment process should accommodate this. Third, community-dependent: word-of-mouth through personal networks is far more powerful than advertising in these markets. Design your MVP to generate stories that customers want to share, because your growth will depend on it.',
      ],
      callout: {
        type: 'example',
        content:
          'Aijan\'s MVP for her custom cake business: Take orders via Telegram only. Offer exactly three flavors (chocolate, vanilla, and a seasonal Kyrgyz fruit cake). Deliver within 5km of her home neighborhood. Require minimum 3-day advance orders. Accept cash on delivery. No website, no Instagram store, no printed menu — just great cakes, delivered on time, with a Telegram conversation that makes customers feel cared for. Total startup cost: ingredients and a simple cake stand she already owns.',
      },
      questionsToConsider: [
        'Which of the five MVP types best matches your business model and your resource constraints?',
        'What is the single most important value your MVP must deliver, and does every feature you are including directly serve that value?',
        'How does the mobile-first, cash-compatible nature of your market shape the design of your MVP?',
        'What is your honest resource inventory — and does your current MVP plan fit within it?',
      ],
      deeperPerspective: {
        title: 'The Wisdom of Starting Small',
        content: [
          'There is a tendency in entrepreneurship culture to celebrate grand ambition and massive scale. The most talked-about companies are the ones that disrupted entire industries. But the businesses that create lasting, dignified livelihoods for Central Asian families are rarely the ones that disrupted anything — they are the ones that served their neighbors excellently, one customer at a time, and grew steadily from that foundation.',
          'Starting small is not a compromise. It is wisdom. When you launch an MVP that is narrow but excellent, you learn faster than any classroom could teach you. You discover which customers value your work most. You refine your process until it is reliable. You build the kind of reputation that sustains a business through market downturns and difficult seasons. The entrepreneur who launches a focused MVP and earns ten loyal customers has something more valuable than the entrepreneur who builds a comprehensive product that impresses investors but confuses buyers.',
          'In many Central Asian communities, trust is built slowly and through personal relationship. A business that starts small and serves its initial customers superbly becomes part of the community in a way that a business chasing rapid scale cannot. Your first customers are not just revenue — they are advocates, feedback sources, and the foundation of a reputation that will outlast any marketing campaign you could afford.',
        ],
        questions: [
          'What does "starting small with excellence" look like for your specific business?',
          'Who are the five or ten people in your network who, if they became loyal customers, would transform your business prospects through their referrals?',
          'How does your community\'s relationship with trust and personal reputation shape what your MVP should look and feel like?',
        ],
      },
    },
  ],
  story: {
    title: "Aijan Designs Her MVP",
    paragraphs: [
      'Aijan had filled three notebooks during the course. Customer interview notes. Market research. Financial calculations. Hypotheses confirmed and hypotheses crossed out. When she reached Week 10, she spread everything across her kitchen table and stared at it for a long time.',
      'Her original plan had been ambitious. A website with an online store. Five categories of cakes. Delivery anywhere in Bishkek. Professional packaging with her name on it. A logo she had already sketched three times. When she looked at that original plan now, she felt something between affection and embarrassment. She had written it before she knew anything.',
      'She pulled out her original Value Proposition Canvas. Under "Customer Pains" she had written: expensive professional cakes, long delivery times, limited design options. But her interviews had told a different story. The real pain her customers felt was not the price or the design. It was the unreliability. Three different people had told her about ordering a celebration cake and having the vendor cancel the day before. One woman had cried when she described showing up to her daughter\'s party without the cake she had promised. That pain — the fear of being let down on a day that mattered — was something Aijan had not even thought to ask about.',
      'She rewrote her VPC. The primary pain she was solving was not cost or design. It was the terror of entrusting something important to someone who would not show up. Her gain creator was not "beautiful cakes" — it was "someone who keeps her word." That realization changed everything about what her MVP needed to be.',
      'She went through her feature list with the MoSCoW framework. Must Have: ability to take orders reliably, clear communication with customers about timing, consistent quality on the three flavors she made best. Should Have: attractive but simple presentation. Could Have: custom designs. Won\'t Have: website, delivery outside her neighborhood, more than three flavor options. The list that had seemed minimal felt even more focused now, and for the first time, she felt ready instead of overwhelmed.',
      'Her MVP was this: she would take orders through Telegram, offering exactly three flavors — chocolate, vanilla, and a walnut honey cake her mother had taught her. Delivery within five kilometers of her apartment, minimum three days in advance, cash on delivery. No website. No packaging beyond a clean white box with a handwritten card. No marketing except telling ten people she knew and asking them to spread the word if they were satisfied.',
      'The piecemeal MVP, she realized, was her natural fit. She already had Telegram. She already had her baking equipment. She already had the recipes. What she was building was not a product so much as a reliable promise: order a cake from me and I will be there, on time, exactly as agreed. In a market where unreliability had caused so much disappointment, that promise alone was her competitive advantage.',
      'She wrote her MVP definition statement in her notebook: "My MVP is a custom celebration cake service operating in the Bishkek city center area. I take orders via Telegram, offer three signature flavors, require three days advance notice, deliver within 5km, and accept cash on delivery. I am not a wedding cake business. I am not a design studio. I am the baker who shows up." She underlined that last sentence. It felt like the truest thing she had written in three notebooks.',
    ],
  },
  storyCentralAsia: {
    title: "Aijan Designs Her MVP",
    paragraphs: [
      "Aijan spread three notebooks across her kitchen table: the original one from Week 1, the mountain-cover numbers notebook from the financial sessions, and a third she had started using for customer interview notes. She also spread the revised VPC she had updated after the tea session with her customers and the Business Model Canvas with its two revised versions. She sat in front of all of it for a long time, looking at what the evidence said versus what she had originally imagined.",
      "Her original plan had included five menu items, delivery anywhere in Bishkek, a website she had been half-designing in her head, and a printed menu card she had sketched designs for during one long accounting shift. She had imagined the business operating from a proper rented kitchen within the first month.",
      "The evidence said something different. Two dishes — manty and the rotating soup — were generating most of the orders and most of the repeat customers. The other three dishes added preparation time and ingredient variety that complicated her Osh bazaar shopping without meaningfully increasing revenue. Her customers lived within a two-kilometer radius of her apartment: the Frunze district inquiry had not converted to a regular order when she priced in the delivery cost. The website had never come up in any customer conversation. The Telegram channel was already doing everything a website would have done, in a format every customer preferred.",
      "She went through her feature list with MoSCoW. Must Have: the Telegram channel with evening menu posts and next-morning order confirmation, manty available every day, rotating soup option, delivery within two kilometers by 12:30. That was the entire business. Everything customers had paid her for, and nothing more. Should Have: a third dish option for customers who ordered the light option. Could Have: a printed card with contact information for customers to share. Won't Have: website, delivery beyond two kilometers, more than three menu items, branded packaging, a kitchen outside her apartment for at least the first sixty days.",
      "The not-won't-have that had been hardest to write down was the rented kitchen. Uncle Kanybek had agreed to the 40,000 som loan after Thursday's meeting. She could rent commercial kitchen space. But the Math said she needed to reach 90 portions per month to justify the fixed cost of external kitchen rental. She was at 55 portions. The disciplined decision was to wait until she was consistently above 80 before adding that cost.",
      "She wrote her MVP definition in the notebook: 'Aijan's Kitchen delivers freshly cooked manty and one rotating soup to office workers within two kilometers of my apartment in central Bishkek. Orders placed via Telegram by 9pm the night before. Delivery by 12:30. Cash on delivery. Three items maximum per day. No delivery outside the two-kilometer radius until I reach 90 daily portions consistently. I am not a restaurant. I am not a caterer. I am the cook who shows up every day with food that tastes like it was made this morning, because it was.'",
      "She read it back. Every word of it was based on something a real customer had said, or a real number she had calculated, or a real lesson from a failed assumption. Not a single sentence was about the business she had imagined. Every sentence was about the business she had evidence for.",
      "She photographed the page and sent it to her mother in Tokmok, who replied with a voice message. Her mother said: 'This sounds like something you can actually do. Your grandmother always said you don't need a big stove to cook good food. You just need to know your recipe.'",
    ],
  },
  worksheetDef: {
    id: 'business-10',
    title: 'MVP Blueprint',
    description:
      'Use this worksheet to update your Value Proposition Canvas, prioritize features using MoSCoW, select your MVP type, and build a resource inventory that confirms your MVP is achievable.',
    sections: [
      {
        title: 'Value Proposition Canvas: Before and After',
        description:
          'Compare your original VPC from Week 4 with your updated understanding after customer validation.',
        fields: [
          {
            id: 'vpc-original-jobs',
            label: 'Original Customer Jobs (Week 4)',
            type: 'textarea',
            placeholder: 'What did you originally believe customers were trying to accomplish?',
            helpText: 'Write what you put in the Customer Jobs section of your original VPC.',
          },
          {
            id: 'vpc-updated-jobs',
            label: 'Updated Customer Jobs (After Validation)',
            type: 'textarea',
            placeholder: 'What do you now know customers are actually trying to accomplish?',
            helpText: 'Use the exact language your interview subjects used.',
          },
          {
            id: 'vpc-original-pains',
            label: 'Original Customer Pains (Week 4)',
            type: 'textarea',
            placeholder: 'What pains did you originally assume mattered most?',
          },
          {
            id: 'vpc-updated-pains',
            label: 'Updated Customer Pains (After Validation)',
            type: 'textarea',
            placeholder: 'What pains did customers actually describe with the most intensity?',
            helpText: 'Rank by intensity, not by what you hoped to hear.',
          },
          {
            id: 'vpc-original-gains',
            label: 'Original Customer Gains (Week 4)',
            type: 'textarea',
            placeholder: 'What gains did you originally believe customers desired?',
          },
          {
            id: 'vpc-updated-gains',
            label: 'Updated Customer Gains (After Validation)',
            type: 'textarea',
            placeholder: 'What gains did customers spontaneously describe wanting?',
          },
          {
            id: 'vpc-biggest-change',
            label: 'Biggest Change Between Original and Updated VPC',
            type: 'textarea',
            placeholder: 'What is the most important thing you were wrong about, and what evidence proved it?',
            helpText: 'Be specific. Name the interviewee (by number, not name) and what they said.',
          },
        ],
      },
      {
        title: 'MoSCoW Feature Prioritization',
        description:
          'Categorize every feature, capability, or service element of your business into one of four buckets.',
        fields: [
          {
            id: 'moscow-must-have',
            label: 'Must Have (Maximum 5–7 items)',
            type: 'textarea',
            placeholder: 'List only features without which your product cannot deliver basic value...',
            helpText: 'Test each item: "Would my first customer refuse to pay if this were missing?" If no, it is not Must Have.',
          },
          {
            id: 'moscow-should-have',
            label: 'Should Have',
            type: 'textarea',
            placeholder: 'Features that significantly improve the offering but are not essential for launch...',
          },
          {
            id: 'moscow-could-have',
            label: 'Could Have',
            type: 'textarea',
            placeholder: 'Nice-to-have features that add convenience or delight but are not core...',
          },
          {
            id: 'moscow-wont-have',
            label: "Won't Have (For Now)",
            type: 'textarea',
            placeholder: 'Features you are consciously choosing not to build in this version...',
            helpText: 'Be explicit. Every item here is a decision made, freeing your attention for what matters.',
          },
        ],
      },
      {
        title: 'MVP Type Selection',
        description: 'Identify which MVP type or combination fits your business.',
        fields: [
          {
            id: 'mvp-type',
            label: 'MVP Type Selected',
            type: 'text',
            placeholder: 'Single-feature, Wizard of Oz, Concierge, Piecemeal, or Crowd-funded',
          },
          {
            id: 'mvp-type-rationale',
            label: 'Why This MVP Type Fits Your Situation',
            type: 'textarea',
            placeholder: 'Explain why this approach makes sense given your market, resources, and business model...',
          },
          {
            id: 'mvp-definition',
            label: 'Your MVP Definition Statement',
            type: 'textarea',
            placeholder: 'My MVP is... It includes... It deliberately excludes... I will know it is working when...',
            helpText: 'Write this clearly enough that someone who has never met you could build it without asking questions.',
          },
        ],
      },
      {
        title: 'Resource Inventory',
        description:
          'Be honest about what you actually have available. Your MVP must fit your real resources, not your ideal resources.',
        fields: [
          {
            id: 'resource-financial',
            label: 'Financial Capital Available for MVP Launch',
            type: 'currency',
            placeholder: '0',
            helpText: 'How much money can you spend before you need the business to generate income?',
          },
          {
            id: 'resource-time',
            label: 'Hours Per Week Available for the Business',
            type: 'number',
            placeholder: '10',
            helpText: 'Be realistic. Include only hours when you can actually focus on the business.',
          },
          {
            id: 'resource-skills',
            label: 'Skills You Personally Bring',
            type: 'textarea',
            placeholder: 'List your relevant skills honestly — technical, creative, interpersonal, domain knowledge...',
          },
          {
            id: 'resource-people',
            label: 'People Who Can Help (and How)',
            type: 'textarea',
            placeholder: 'Name and role: e.g., "My sister Gulnara — can help with delivery on Saturdays"',
          },
          {
            id: 'resource-gaps',
            label: 'Resource Gaps That Could Threaten Your MVP',
            type: 'textarea',
            placeholder: 'What do you not have that your MVP genuinely needs? How will you address each gap?',
          },
          {
            id: 'mvp-launch-date',
            label: 'Realistic MVP Launch Target Date',
            type: 'text',
            placeholder: 'e.g., March 15, 2026',
            helpText: 'Given your resources and Must Have features, when is a realistic first day of service?',
          },
        ],
      },
    ],
  },
  reflectionQuestions: [
    {
      question: 'What is the hardest feature to cut from your MVP, and why?',
      prompt:
        'Think about why that particular feature is so difficult to remove. Is it because customers genuinely need it, or because you are attached to it for other reasons?',
    },
    {
      question: 'If your MVP fails — if customers do not buy — what would that prove?',
      prompt:
        'A good MVP is designed to give you useful information even if it fails. What assumption would a failed MVP disprove? Is that assumption worth testing?',
    },
    {
      question: 'Who is your ideal first customer, and what does your MVP need to do to earn their trust?',
      prompt:
        'Describe a specific person — their situation, what they need, and why your MVP would or would not meet that need as currently designed.',
    },
    {
      question: 'What is the biggest risk your MVP faces in the first 30 days?',
      prompt:
        'Not a vague risk like "competition" — a specific risk. What specific thing could go wrong that would prevent your first customer from having a good experience?',
    },
  ],
};
