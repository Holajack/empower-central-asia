import type { BusinessWeekContent } from './types';

export const week1Content: BusinessWeekContent = {
  week: 1,
  module: { number: 1, title: 'Think Like an Entrepreneur' },
  title: 'The Lean Start',
  subtitle: "Why most businesses fail — and how yours won't",
  keyQuote: 'No business plan survives first contact with a customer.',
  quoteAuthor: 'Steve Blank',
  overview:
    'Most businesses fail not because entrepreneurs are lazy or unintelligent, but because they operate on a fatal assumption: that they already know what customers want. This week dismantles that assumption and introduces the Lean Startup framework — a method for testing ideas cheaply before committing everything to them. You will learn to distinguish a business plan from a business hypothesis, understand why learning from real customers is faster than planning in isolation, and begin mapping the assumptions hiding inside your own business idea.',
  objectives: [
    'Understand the core principles of the Lean Startup methodology and why it outperforms traditional planning',
    'Recognize the Fatal Assumption — the single most common reason new businesses fail',
    'Apply the Build-Measure-Learn loop to generate real market feedback quickly and cheaply',
    'Identify and rank the riskiest assumptions embedded in your own business idea',
  ],
  keyTopics: [
    {
      title: 'The Fatal Assumption',
      description:
        'The belief that you understand what customers want before you\'ve tested it with them. Nearly every failed business traces back to this moment: an entrepreneur convinced they know the answer before asking the question. Michael Gerber\'s E-Myth calls this the entrepreneurial seizure — the moment a skilled person confuses technical skill with business knowledge.',
    },
    {
      title: 'Build-Measure-Learn',
      description:
        'The engine of every successful lean business: build the smallest possible version of your idea, measure how real customers respond, and learn what to do next. This cycle replaces months of planning with weeks of reality-testing. Each loop produces knowledge that no amount of desk research can match.',
    },
    {
      title: 'Assumptions vs. Hypotheses',
      description:
        'An assumption is something you believe without evidence. A hypothesis is an assumption you\'ve structured as a testable statement. The shift from "I think customers want X" to "I will know customers want X when I see Y behavior" is what separates entrepreneurs who learn from those who guess.',
    },
  ],
  actionItems: [
    'Write down your business idea in one clear sentence',
    'List every assumption your idea rests on (aim for at least 8)',
    'Rank your assumptions by risk: which one, if wrong, would kill the business?',
    'Schedule at least one conversation with a potential customer this week',
  ],
  realWorldActivity: {
    title: 'The Customer Discovery Conversation',
    description:
      'Identify one person who represents your target customer. This week, have a real conversation with them — not to pitch your idea, but to understand their problem. Ask them: What is the hardest part of [the problem you think you\'re solving]? How do you handle it today? What have you already tried? Do not mention your solution until the very end, and only to ask if it sounds useful. Write down what surprised you most about what they said.',
  },
  lessonSections: [
    {
      id: 'why-businesses-fail',
      heading: "Why Most Businesses Fail (And How Yours Won't)",
      content: [
        'In his landmark book The E-Myth Revisited, Michael Gerber tells the story of Sarah, a woman who loves baking pies. She\'s brilliant at it. Her friends tell her so constantly. One day, exhausted by her office job and intoxicated by the dream of independence, she decides to open a bakery. Within two years, she\'s out of business. Not because she couldn\'t bake. She could bake magnificently. She failed because she never stopped to ask whether loving to bake and knowing how to run a bakery business are the same thing. They are not. They are almost completely different skill sets. Gerber called this the Fatal Assumption: the dangerous belief that because you understand the technical work of a business, you understand the business that does that technical work.',
        'The Fatal Assumption is not limited to bakers. It kills restaurants, consultancies, handmade goods businesses, tech startups, and social enterprises with equal enthusiasm. The woodworker who opens a furniture shop. The programmer who launches an app. The agronomist who starts an agricultural consultancy. In every case, the story follows the same arc: passion for a craft, confidence that others will value it, the decision to build something based on that confidence alone, and then the slow or sudden discovery that customers don\'t behave the way the founder imagined they would.',
        'What makes this pattern so persistent is that the Fatal Assumption feels so reasonable. You have real skills. You have real experience. You\'ve seen real demand — your friends love your product, your colleagues respect your expertise. But friends are not customers. Colleagues are not a market. The people who tell you your idea is great are almost never the ones who will open their wallets, and the people who will open their wallets have problems, preferences, and constraints you haven\'t yet uncovered. The fatal moment isn\'t launching a bad idea. It\'s launching without first discovering whether the idea is good.',
        'The traditional response to this problem was the business plan: a thick document that forecast revenues, described the competitive landscape, outlined marketing strategies, and projected three to five years into the future with impressive-looking spreadsheets. Banks love business plans. Governments grant them weight. Entrepreneurship textbooks teach students how to write them. The problem is that a business plan, however detailed, is a work of fiction. It is a document about what you believe will happen when you have not yet tested whether any of it is true. Steve Blank, the Stanford professor and serial entrepreneur who coined the phrase "lean startup," was blunt about this: no business plan survives first contact with a customer.',
        'This is not a criticism of planning. Planning matters. Strategy matters. But there is a critical difference between a plan — which describes what you intend to do — and a hypothesis — which describes what you believe to be true and that you are about to test. A hypothesis invites disconfirmation. It says: "I believe X is true. Here is how I will find out whether X is actually true. Here is what I will do if X turns out to be false." A plan says: "X is true. Here is what we will do based on that." The humble word "hypothesis" holds enormous power: it gives you permission to be wrong and to learn from being wrong, which is the only path to eventually being right.',
        'The businesses that survive and thrive are almost always the ones that began with a clear-eyed acknowledgment of what they did not yet know. The founders of those businesses treated their earliest assumptions not as facts but as experiments. They moved quickly, learned fast, spent little, and adjusted constantly. This approach has a name — the Lean Startup, developed by Eric Ries — and while the term was coined in Silicon Valley, the underlying logic applies just as powerfully to a craftsperson in Bishkek, a textile seller in Tashkent, or a food vendor in Almaty.',
        'Here is the promise of this course: you do not have to repeat the fatal pattern. You do not have to bet your savings, your family\'s stability, and years of your life on assumptions you\'ve never tested. You can start smaller, learn faster, and build something that works because you built it around what customers actually need — not what you assumed they needed. This is not the comfortable path. Testing your assumptions honestly often means discovering they were wrong, and that can sting. But it is infinitely better to discover you were wrong after a week of testing than after a year of building.',
        'This week, we begin with honesty. Specifically, the honest work of mapping every assumption hiding inside your business idea — and asking, with genuine openness: "What if I\'m wrong about this?" That question, answered rigorously and honestly, is the foundation of a business that survives.',
      ],
      callout: {
        type: 'warning',
        content:
          'The most dangerous words in entrepreneurship are "I know my customers." You may know people like your customers. You may know what you wish they wanted. Knowing what your customers actually need requires listening to them — before you build.',
      },
      questionsToConsider: [
        'What\'s the one thing you are most confident customers will love about your idea? How do you know that\'s true?',
        'Have you ever started something based on an assumption that turned out to be wrong? What happened?',
        'What would you do differently in your business planning if you treated every belief as a hypothesis to test?',
      ],
    },
    {
      id: 'build-measure-learn',
      heading: 'Build-Measure-Learn: The Engine of Every Successful Business',
      content: [
        'Imagine a Bishkek café owner named Nurlan. He\'s convinced that what the city\'s business district needs is a premium third-wave coffee experience — single-origin beans, pour-over method, minimalist design, prices that reflect the quality. He spends six months finding the right space, importing equipment from Germany, training his staff, designing a menu, and building out the interior. He opens. The first week is slow. The second week is slower. By month three, he is quietly alarmed. His core customers are spending an average of 90 minutes at a table, ordering one drink, and using his Wi-Fi. His premium pricing is keeping out the office workers who could have been his lunch rush. The product is excellent. The market response is wrong.',
        'What Nurlan did is completely understandable and extremely expensive. He optimized for a hypothesis he never tested. He assumed that a premium coffee experience was the gap in the market, that business-district workers would pay premium prices, that fast table turnover would support his margin model, and that the local culture around café time would match what he\'d seen in Istanbul and Berlin. Each of those assumptions was partially wrong. Discovering that partial wrongness cost him six months of rent, imported equipment he couldn\'t easily sell, and a customer base that had already formed habits elsewhere.',
        'The Build-Measure-Learn loop exists precisely to prevent this scenario. The concept is simple: instead of building everything at once based on your assumptions, you build the smallest possible version of your idea that will let you test your most critical assumption. You call this a Minimum Viable Product, or MVP. Then you measure how real customers respond to it — not in surveys, not in theory, but in actual behavior. Do they buy? Do they return? Do they tell other people? Do they pay the price you expected? And then, based on what you learned, you either confirm your hypothesis and build further, or you adjust — pivot, in startup language — and test again.',
        'A Kazakh craftsperson making traditional felt goods demonstrates this naturally without even knowing the term "lean startup." Aigul starts by posting photos of three designs on Instagram to see which ones get comments and inquiries. She doesn\'t make 50 items in advance. She makes three, posts them, and waits to see which designs people actually respond to — not just with heart reactions, but with "how much?" and "can I order one?" She learns that one design draws almost no response while another generates five inquiries before she\'s even finished listing it. She scales the successful design first. She\'s running Build-Measure-Learn without a business school degree, because her limited resources forced her to learn before she spent.',
        'The measure step is where most aspiring entrepreneurs get uncomfortable. Measuring means defining, in advance, what success looks like. It means saying: "I will know my hypothesis is correct when I see X." For Nurlan, a valid early metric might have been: "I will know business-district workers will pay my prices if at least 30% of walk-in visitors order a drink without asking about the price." For Aigul, the metric was simpler: "I will know which design is worth scaling if it receives at least three serious purchase inquiries in the first week." Without pre-defining what "it\'s working" looks like, entrepreneurs are left interpreting ambiguous data through the distorted lens of hope.',
        'The learn step is not merely absorbing what happened. It is actively updating your beliefs based on evidence. This requires intellectual honesty that runs against human nature. We are wired to confirm what we already believe. When Nurlan\'s café is slow in week one, the tempting interpretation is "people just need more time to discover us." That may be true. But an honest interpretation asks: "Is the slowness evidence that my pricing assumption was wrong? That my location assumption was wrong? That my target customer assumption was wrong?" Learning means following the evidence wherever it leads, not using it to justify what you already believed.',
        'The power of the Build-Measure-Learn loop is not speed, though speed is a benefit. Its real power is that it replaces opinion with evidence. Every cycle through the loop makes you incrementally less wrong about the market, about your customers, and about your business model. You will never achieve perfect knowledge. Markets change. Customers are complex. But the entrepreneur who has completed ten Build-Measure-Learn cycles is operating with dramatically better information than the one who spent the same ten weeks writing a business plan. One person knows what they believe. The other knows what they have discovered.',
        'This week, you will take your first step into this loop. You will not build a product. You will not write a plan. You will identify the single assumption your business idea most depends on — the one that, if wrong, would make the whole idea fall apart — and you will design the smallest possible test to find out whether that assumption is true. The goal is not to succeed. The goal is to learn.',
      ],
      callout: {
        type: 'example',
        content:
          'A young entrepreneur in Almaty wanted to start a home-cooked meal delivery service. Instead of renting a kitchen and hiring delivery staff, she first posted a message in a neighborhood WhatsApp group: "I\'m thinking of offering home-cooked Kazakh meals delivered for 1,500 KZT per portion. Who would be interested?" 23 people responded within an hour. She cooked 10 meals, delivered them on foot, and had 8 repeat orders the following week. Total investment before first revenue: under 5,000 KZT. That\'s the Build-Measure-Learn loop.',
      },
      questionsToConsider: [
        'What is the smallest test you could run this week to learn something real about your business idea?',
        'How would you know — from observable behavior, not from what people say — that your idea is working?',
        'What is the most expensive assumption in your business plan? What would it cost to test it cheaply first?',
      ],
    },
    {
      id: 'assumptions-hypotheses',
      heading: 'Assumptions, Hypotheses, and How to Tell the Difference',
      content: [
        'Every business idea is a bundle of assumptions. Most entrepreneurs know this in the abstract but have never actually sat down to identify each assumption by name. This is the most important exercise in Week 1, and it is harder than it sounds. Assumptions hide in plain sight. They live inside phrases like "people will obviously want" and "the market clearly needs" and "of course customers will pay." They disguise themselves as common sense. Uncovering them requires the discipline to question what feels self-evident.',
        'Let\'s take a specific example. Suppose you want to start a business tutoring high school students in mathematics, operating out of your apartment in Bishkek. Seems simple, right? Look more carefully. Embedded in that idea are at least the following assumptions: that parents in your area actively want tutoring for their children rather than relying on school alone; that they will pay for an independent tutor rather than asking a relative who teaches; that they will trust a tutor they don\'t already know personally; that students in your neighborhood are actually struggling with math specifically rather than other subjects; that your apartment is a viable location rather than the student\'s home or a neutral space; that you can teach in a way that produces results quickly enough that parents see the value; and that 1:1 tutoring is the format parents want rather than small groups, which would be cheaper per student.',
        'Count those assumptions: at least seven, for what looked like a simple idea. Each one is a point of potential failure. If parents prefer group tutoring — which many do, because it reduces cost — your 1:1 model fails. If trust networks are so strong in your community that parents will only hire tutors known to the family, your marketing strategy fails. If the real problem is not math but study habits, your subject-matter expertise fails to address what parents are actually paying for. None of these failure modes are obvious until you list the assumptions explicitly and examine each one.',
        'The process of turning assumptions into hypotheses is a practice in structured humility. An assumption says: "Parents will pay 2,000 som per hour for tutoring." A hypothesis says: "I believe parents will pay 2,000 som per hour for tutoring. I will know this is true if I can find five families willing to commit to a trial session at that price before I\ve set up my full schedule." The hypothesis version has three components that the assumption lacks: a clear belief, a defined metric, and a test. This structure forces you to decide in advance what "working" looks like, which prevents you from moving the goalposts after the fact.',
        'When mapping your assumptions, it helps to organize them into categories. Customer assumptions are beliefs about who your customers are, what they want, how they behave, and how much they\'ll pay. Problem assumptions are beliefs about the severity and frequency of the problem you\'re solving — is it actually painful enough that people will change their behavior to fix it? Solution assumptions are beliefs about whether your particular approach is better than the alternatives the customer already uses. Market assumptions are beliefs about how big the opportunity is, how competitive the landscape is, and whether the market is growing or shrinking. Each category contains its own landmines.',
        'Ranking your assumptions by risk is the next critical step, and it requires honest self-assessment. The ranking question is: "If this assumption turns out to be false, how much does it damage the business?" A low-risk assumption, if wrong, is inconvenient. A high-risk assumption, if wrong, is fatal. For most businesses, the highest-risk assumptions concern whether the customer actually has the problem you think they have, and whether they experience that problem as urgent enough to change their behavior. Everything downstream of those two questions — your solution, your pricing, your marketing — rests on those foundational assumptions. They should be tested first.',
        'There is a phrase worth carrying with you throughout this course: "get out of the building." It was coined by Steve Blank to describe the essential act of going to where customers actually are — their homes, their markets, their workplaces, their daily routines — and observing them, talking to them, and learning from them directly. Every assumption you have about customers was formed inside the building. The evidence that will confirm or refute those assumptions lives outside the building. No amount of research done at a desk, no matter how thorough, equals a single honest conversation with a real potential customer. This week, your most important task is to get out of the building.',
        'One final note: the goal of assumption mapping is not to discourage you. It is to make you dangerous in the best sense — a founder who asks sharp questions, tests fast, and builds on evidence rather than hope. The entrepreneur who knows their riskiest assumption and has a plan to test it is in a vastly stronger position than one who doesn\'t know what they don\'t know. You cannot address a problem you haven\'t named. Name your assumptions. Rank them honestly. Then go find out which ones are true.',
      ],
      callout: {
        type: 'tip',
        content:
          'The "Mom Test" (from Rob Fitzpatrick\'s book by that name): ask your potential customers about their life and problems, not about your idea. "Do you think this would be useful?" always gets a polite yes. "How do you currently handle X? How much time does it take? What\'s the most annoying part?" gets you truth.',
      },
      questionsToConsider: [
        'What is the single assumption your business idea cannot survive being wrong about?',
        'Which of your assumptions feel most obvious and self-evident? Those are exactly the ones most worth testing.',
        'If you had to test your riskiest assumption in 48 hours with almost no money, how would you do it?',
      ],
    },
  ],
  story: {
    title: "Aijan's Bakery: The Fatal Assumption",
    paragraphs: [
      'Aijan had been baking bread since she was nine years old. Her grandmother had taught her, hands dusted in flour at the kitchen table in Tokmok, and by the time Aijan was in secondary school she was known across the neighborhood for her boorsok, her samsa, and her extraordinary honey cake. Baking was not something she did. It was something she was.',
      'By her late twenties, Aijan was working as an accountant at a logistics company in Bishkek. She was good at her job. But on the mornings she had to go to the office, she felt it — a low, steady pull toward the kitchen, toward the warmth of the oven, toward the life she imagined running her own bakery. She kept a notebook of recipes. She followed pastry accounts on Instagram. She calculated, roughly, how much a small retail space might cost.',
      'The decision crystallized on a Tuesday morning when her manager criticized her for a trivial formatting error. She sat at her desk, looking at a spreadsheet she no longer cared about, and made up her mind. She had loved baking her entire life. People had told her for years that her food was better than anything in the city. She was going to open a bakery.',
      'She gave notice that Friday. She spent the next two months renting a small space in a busy Bishkek neighborhood, buying a commercial oven on credit, sourcing flour and butter from a supplier she found through a friend, and having simple signs made for the window. She told everyone she knew. She posted photos on Instagram. She felt alive in a way she hadn\'t felt in years.',
      'The bakery opened on a Monday in October. Aijan arrived at 4 in the morning to start the first batch. By 9, she had produced sixty items: a variety of breads, pastries, and her signature honey cake. By noon, she had sold eleven of them.',
      'She assumed it was first-week slowness. By the end of week one, she had sold 63 items — a number that sounded decent until she added up what the ingredients, rent, and utilities had cost her. She was losing money on every single day she opened.',
      'The problems were everywhere and she hadn\'t seen a single one. She had no idea what to charge because she had never calculated her actual cost per item. She had assumed the neighborhood foot traffic would find her, but she had never asked anyone in that neighborhood whether they bought fresh-baked goods regularly or where they currently bought them. She had assumed customers would want the artisan European-style pastries she loved to make, without asking whether the local preference was for more traditional Kyrgyz baked goods. She had assumed her reputation among friends would translate into walk-in customers — but her friends were scattered across the city, not in this neighborhood.',
      'She was skilled. She was passionate. She was completely unprepared for what she hadn\'t asked. The business wasn\'t failing because her bread was bad. It was failing because she had built it entirely on assumptions she had never tested.',
      'What Aijan needed — what she would eventually learn — was not a better recipe. It was the discipline to ask hard questions before she spent her savings answering them the expensive way.',
    ],
  },
  storyCentralAsia: {
    title: "Aijan's Kitchen Dream: The Fatal Assumption",
    paragraphs: [
      'Aijan had been cooking since she was seven years old, standing on a stool beside her grandmother in the cramped kitchen of a Tokmok village house. Her grandmother taught her everything: how to roll dough for manty until it was thin as paper, how to judge when the oil was ready for boorsok by the sound it made, how to layer a beshbarmak so every piece of meat sat on a wide belt of noodle the way tradition demanded. By the time Aijan was in secondary school and her family had moved to Bishkek, she was the one cooking for weddings in the neighborhood.',
      'By twenty-eight, she was working as an accountant at a small logistics company near Osh bazaar, earning 18,000 som a month. The salary paid the rent on her one-room apartment and left almost nothing for her younger brother Temirlan\'s university fund. Her father, whose back had given out after years of driving a marshrutka on Bishkek\'s crowded routes, could not help. Her mother still taught at the village school near Tokmok, three hours away by shared taxi. The weight of the family\'s expectations had quietly settled on Aijan\'s shoulders.',
      'On a Tuesday morning in October, her manager criticized her for a minor spreadsheet error in front of the whole open-plan office. She sat very still afterward, looking at a screen she no longer cared about, and made a decision. She knew how to cook. People had been telling her for years that her food was better than anything from the ashkana down the street. She was going to start a food business.',
      'The idea that formed in her mind was a delivery service — home-cooked Kyrgyz meals brought to offices at lunchtime. She had noticed that the workers in the cluster of small offices around her apartment ate instant noodles or went to the nearest ashkana, where the plov sat in pans under heat lamps until it was dry and the lagman soup was always the same. She told her mother on the phone, and her mother said, cautiously, that it sounded like a lot of work. Her father said nothing, which was how he expressed the opinion that women in their family did not run businesses.',
      'Aijan spent three weeks planning. She calculated what containers would cost, how much she could cook in a morning, which offices were within delivery distance of her apartment. She told her younger brother Temirlan — nineteen, studying economics at a Bishkek institute — and he said he could deliver by bicycle between classes. She felt alive in a way the accounting job had never made her feel.',
      'She invested her savings: 8,000 som on containers and a thermal delivery bag, 5,000 som on her first week of ingredients from Osh bazaar, another 2,000 som on printed flyers she slipped under office doors. She cooked her first batch on a Monday — plov, lagman, and a salad — enough for fifteen portions. By noon she had sold four.',
      'She told herself it was first-week slowness. The second week she sold eight portions total. She added beshbarmak on Fridays because her father always said it was the most Kyrgyz of all dishes and surely people would want it. The portions sat in their containers through the lunch hour. She brought them home and fed them to Temirlan.',
      'The problems were everywhere and she had not seen a single one. She had assumed office workers wanted traditional Kyrgyz food — but nobody had asked them. She had assumed a flyer under a door would be enough for someone to trust a stranger with their lunch. She had assumed beshbarmak, which requires sitting and eating slowly with your hands, would work in a twenty-minute office lunch break. She had assumed the problem was the lack of a delivery service, when the real problem — the one her customers were silently living with — was something she had never paused to ask about.',
      'She was a skilled cook. She was a careful planner. She was completely unprepared for the one thing no plan can substitute for: the honest conversation with a real customer, before anything is built, about what they actually need.',
    ],
  },
  worksheetDef: {
    id: 'business-1',
    title: 'Assumption Mapper',
    description:
      'Every business idea rests on a set of assumptions — beliefs you hold about customers, the market, and your solution that you haven\'t yet tested. This worksheet helps you surface those assumptions, organize them, and identify which ones are most dangerous if wrong.',
    sections: [
      {
        title: 'Your Business Idea',
        description: 'State your idea clearly before diving into assumptions.',
        fields: [
          {
            id: 'business-idea',
            label: 'Describe your business idea in 1-2 sentences',
            type: 'textarea',
            placeholder:
              'What product or service do you want to offer, to whom, and how?',
            helpText:
              'Keep it simple. If you can\'t state it in two sentences, it may not be clear enough yet.',
          },
          {
            id: 'business-customer',
            label: 'Who is your target customer? (Be specific)',
            type: 'textarea',
            placeholder:
              'e.g., Mothers in urban Bishkek aged 25-40 who work full-time and need affordable weekday meal options',
            helpText:
              'The more specific you are here, the more useful the rest of this worksheet becomes.',
          },
        ],
      },
      {
        title: 'Customer Assumptions',
        description:
          'What do you believe about who your customers are and how they behave?',
        fields: [
          {
            id: 'assumption-customer-1',
            label: 'Assumption 1: Who your customers are',
            type: 'textarea',
            placeholder:
              'e.g., "My customers are small business owners who want to save time on accounting."',
          },
          {
            id: 'assumption-customer-2',
            label: 'Assumption 2: What problem they have',
            type: 'textarea',
            placeholder:
              'e.g., "They spend 4+ hours per week on bookkeeping and find it stressful."',
          },
          {
            id: 'assumption-customer-3',
            label: 'Assumption 3: How urgently they want a solution',
            type: 'textarea',
            placeholder:
              'e.g., "They\'re actively looking for a solution right now, not just mildly curious."',
          },
        ],
      },
      {
        title: 'Market Assumptions',
        description: 'What do you believe about the size and nature of the market?',
        fields: [
          {
            id: 'assumption-market-1',
            label: 'Assumption 4: How many potential customers exist',
            type: 'textarea',
            placeholder:
              'e.g., "There are at least 500 potential customers within 5 km of my location."',
          },
          {
            id: 'assumption-market-2',
            label: 'Assumption 5: How customers currently solve the problem',
            type: 'textarea',
            placeholder:
              'e.g., "They currently do it themselves or don\'t solve it at all."',
          },
        ],
      },
      {
        title: 'Solution Assumptions',
        description: 'What do you believe about your product or service itself?',
        fields: [
          {
            id: 'assumption-solution-1',
            label: 'Assumption 6: Why your solution is better than alternatives',
            type: 'textarea',
            placeholder:
              'e.g., "My solution is faster and cheaper than what they currently use."',
          },
          {
            id: 'assumption-solution-2',
            label: 'Assumption 7: What customers will pay',
            type: 'textarea',
            placeholder:
              'e.g., "Customers will pay 3,000 KZT per month for this service."',
          },
          {
            id: 'assumption-solution-3',
            label: 'Assumption 8: Your delivery/logistics assumption',
            type: 'textarea',
            placeholder:
              'e.g., "I can fulfill orders within 24 hours using only my current equipment."',
          },
        ],
      },
      {
        title: 'Risk Assessment',
        description:
          'Now rank your assumptions. Which one, if wrong, would most damage your business?',
        fields: [
          {
            id: 'riskiest-assumption',
            label: 'Your single riskiest assumption (copy it here)',
            type: 'textarea',
            placeholder: 'Which assumption above is most dangerous if false?',
            helpText:
              'Usually this is about whether the customer actually has the problem you think they have.',
          },
          {
            id: 'evidence-for',
            label: 'What evidence do you currently have that it\'s true?',
            type: 'textarea',
            placeholder: 'Be honest — anecdotes from friends do not count as market evidence.',
          },
          {
            id: 'how-to-test',
            label: 'How could you test this assumption this week with minimal cost?',
            type: 'textarea',
            placeholder:
              'e.g., "Talk to 5 potential customers and ask them directly about this problem."',
          },
        ],
      },
    ],
  },
  reflectionQuestions: [
    {
      question: 'What is the one assumption you are most afraid of testing?',
      prompt:
        'Usually the assumption we avoid testing most is the one we\'re most attached to — and therefore the one most dangerous to leave untested. Name it honestly.',
    },
    {
      question: 'What would it mean for you personally if your biggest assumption turned out to be wrong?',
      prompt:
        'This is not just a business question. Some entrepreneurs need the idea to succeed for deeply personal reasons — identity, family expectation, proving something. Awareness of this helps you stay honest.',
    },
    {
      question:
        'If you had to start generating your first 100 som of revenue from your idea within 7 days, what would you do?',
      prompt:
        'This question forces you to strip away everything that isn\'t essential and focus on the core transaction. Often it reveals your riskiest assumption immediately.',
    },
  ],
};
