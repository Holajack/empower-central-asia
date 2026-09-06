import type { WeekFullContent } from './types';

export const week1Content: WeekFullContent = {
  week: 1,
  title: "Your Money, Your Story",
  subtitle: "Understanding your financial reality and taking ownership",
  keyQuote: "The first step toward getting somewhere is to decide you're not going to stay where you are.",
  quoteAuthor: "J.P. Morgan",
  overview:
    "This opening week is about honest self-assessment. Before you can build a plan, you need to know exactly where you stand. You'll take a complete financial snapshot, identify the habits and beliefs shaping your money decisions, and commit to a new path forward. No judgment -- just clarity.",
  objectives: [
    "Complete a personal financial snapshot (income, expenses, debts, assets)",
    "Identify 3 money habits you want to change",
    "Understand the difference between income and wealth",
    "Set a clear intention for what you want to achieve in 6 weeks",
  ],
  keyTopics: [
    {
      title: "The Financial Snapshot",
      description:
        "A structured exercise to map out every dollar coming in and going out. You'll list all income sources, fixed expenses, variable spending, outstanding debts, and any savings or assets. This becomes your baseline -- the honest starting point for everything that follows.",
    },
    {
      title: "Money Scripts: The Stories We Tell Ourselves",
      description:
        "We all carry beliefs about money formed in childhood and reinforced over time. Some are helpful ('save for a rainy day') and some hold us back ('I'll never be good with money'). Identifying these scripts is the first step to rewriting them.",
    },
    {
      title: "Ownership Mindset",
      description:
        "Taking full responsibility for your financial situation -- without blame or shame. This isn't about where you started; it's about deciding that from this point forward, you're in the driver's seat. Ownership is the foundation every other week builds on.",
    },
  ],
  activities: [
    {
      title: "Personal Financial Snapshot",
      description:
        "Use our guided worksheet to document your current income, expenses, debts, and assets. Be as specific as possible -- round numbers are fine, but don't skip anything.",
      type: "worksheet",
    },
    {
      title: "Money Autobiography",
      description:
        "Write 1-2 paragraphs about your earliest memory of money and how your family talked about finances. What messages did you absorb? Which ones still influence you today?",
      type: "reflection",
    },
    {
      title: "Financial Goal Setting",
      description:
        "Define one specific, measurable financial goal you want to achieve by the end of this 6-week course. Write it down and share it with an accountability partner if possible.",
      type: "exercise",
    },
  ],
  actionItems: [
    "Complete the Personal Financial Snapshot worksheet",
    "Write down your #1 financial goal for the next 6 weeks",
    "Identify one person who can be your accountability partner",
    "Track every dollar you spend this week (use an app or notebook)",
  ],

  lessonSections: [
    {
      id: "financial-snapshot",
      heading: "The Financial Snapshot",
      content: [
        "Most people have no idea where their money actually goes. Studies consistently show that the average person underestimates their monthly spending by 20-40%. That gap between what we think we spend and what we actually spend is where financial trouble quietly grows -- like a slow leak in a roof that goes unnoticed until the ceiling caves in.",
        "A financial snapshot is exactly what it sounds like: a clear, unflinching photograph of your money right now. Not where you want to be. Not where you think you should be. Where you actually are. It captures four things: what comes in (income), what goes out (expenses), what you owe (debt), and what you've saved (assets). Together, these four numbers tell the story of your financial life more honestly than any feeling or assumption ever could.",
        "Why does this matter? Because you cannot navigate to a destination you've never mapped. Imagine trying to drive from New York to Los Angeles with no GPS, no map, and no idea which direction is west. That's what most people do with money. They earn it, spend it, worry about it, and repeat -- without ever stopping to actually look at the numbers. The financial snapshot breaks that cycle.",
        "The process is simple but uncomfortable. You'll sit down with your bank statements, your pay stubs, and your bills. You'll write down every source of income. You'll list every recurring expense -- rent, utilities, insurance, subscriptions, groceries, gas, dining out, coffee runs, everything. Then you'll tally up every debt: credit cards, car loans, student loans, personal loans, medical bills. Finally, you'll add up whatever you've saved: checking accounts, savings accounts, retirement funds.",
        "The number at the end -- income minus expenses -- is called The Gap. If it's positive, you have margin. If it's zero, you're breaking even. If it's negative, you're going deeper into debt every single month. Most people have never calculated this number. And most people who do are surprised by what they find.",
        "Here's the good news: awareness is the first and most powerful step toward change. You don't have to fix everything today. You just have to see it. Once you see where your money is going, you gain the power to redirect it. The fog lifts. The anxiety starts to shrink. Not because your situation has changed -- but because you're no longer guessing. You're operating with facts.",
        "There is an old proverb that says the prudent see danger and take refuge, but the simple keep going and pay the penalty. Your financial snapshot is how you see the danger -- or the opportunity. It's the foundation for every decision you'll make in the weeks ahead."
      ],
      questionsToConsider: [
        "What's your biggest expense each month? Can you name it without looking?",
        "When was the last time you actually looked at all your numbers in one place?",
        "What does your spending say about what you value most?"
      ],
      deeperPerspective: {
        title: "A Deeper Perspective",
        content: [
          "There's a perspective that says everything we have -- every paycheck, every asset, every opportunity -- is entrusted to us rather than owned by us. If that's true, then a financial snapshot isn't just an accounting exercise. It's an act of stewardship: taking inventory of what's been placed in your care.",
          "Ancient wisdom literature teaches that the diligent know the condition of their flocks and give careful attention to their herds. In modern terms: the wise person knows their numbers. Not because money is the most important thing, but because managing it well reflects something deeper about character and responsibility.",
          "Consider this: if a friend gave you $10,000 to manage for their family while they were away, you'd track every penny. You'd be careful, intentional, even anxious about doing it right. What if that's closer to reality than most of us realize?"
        ],
        insightStory: "There's an ancient story about a wise leader who entrusted three apprentices with different amounts of resources before leaving on a journey. Two apprentices invested and grew what they were given. The third buried his portion in the ground out of fear. When the leader returned, he praised the two who had been responsible managers -- and challenged the one who had done nothing. The lesson wasn't about making money. It was about taking responsibility for what you've been given. Many traditions teach that we're not ultimate owners of what we have -- we're caretakers. What would change if you believed that?",
        questions: [
          "Do you think of your resources as truly yours, or as something entrusted to you?",
          "How would your financial decisions change if you believed someone was going to ask you to account for every dollar?",
          "What would change if you saw yourself as a caretaker rather than an owner of your resources?"
        ]
      }
    },
    {
      id: "money-scripts",
      heading: "Money Scripts: The Stories We Tell Ourselves",
      content: [
        "Before you ever earned your first dollar, you already had a relationship with money. It was shaped by the conversations you overheard at the kitchen table, the things your parents argued about behind closed doors, the way your family celebrated -- or stressed about -- holidays. These early experiences crystallized into what psychologists call 'money scripts': deeply held beliefs about money that operate mostly below the surface of conscious thought.",
        "Money scripts come in many forms. Some people grow up believing 'there's never enough' -- and they carry that scarcity mindset into adulthood, hoarding every dollar out of fear. Others absorb the script that 'money is evil' or 'rich people are greedy,' which creates an unconscious resistance to earning more or building wealth. Some learn that 'you have to work yourself to death to get ahead,' which leads to burnout and broken relationships. And some grow up believing 'money equals love,' spending recklessly to prove affection or earn acceptance.",
        "The tricky thing about money scripts is that they feel like facts. They don't announce themselves as beliefs -- they operate as invisible rules that govern your behavior. When someone who grew up in poverty earns a good salary for the first time, their script might tell them to spend it all immediately because 'it could disappear at any moment.' When someone who was taught that talking about money is shameful avoids having financial conversations with their spouse, the script is running the show.",
        "Identifying your money scripts requires honest reflection. Think back to your earliest memory of money. Was your family stressed about it? Did your parents fight about finances? Were you told things like 'money doesn't grow on trees' or 'we can't afford that'? Were you compared to wealthier relatives or neighbors? Each of these moments planted seeds that grew into the beliefs you carry today.",
        "The most common money scripts fall into four categories. Money avoidance scripts ('money is bad,' 'I don't deserve wealth') lead people to sabotage their own financial progress. Money worship scripts ('more money will solve everything,' 'I'll be happy when I earn X') create a never-ending chase for a moving target. Money status scripts ('my worth equals my net worth,' 'people respect me because of what I have') tie identity to bank balances. And money vigilance scripts ('I must always be saving,' 'spending is wasteful') can create healthy habits but also lead to hoarding and inability to enjoy what you have.",
        "Here's what matters most: money scripts can be rewritten. They're not permanent. Once you identify a script that isn't serving you, you can replace it with something more truthful. 'There's never enough' can become 'I have what I need for today, and I'm building for tomorrow.' 'I'll never be good with money' can become 'I'm learning to manage money better every day.' The rewrite starts with awareness.",
        "This week, pay attention to the voices in your head when you swipe your card, check your bank balance, or think about your financial future. Those voices aren't facts -- they're scripts. And scripts can be changed."
      ],
      callout: { type: 'tip', content: 'Write down the first three things that come to mind when you hear the word "money." Those responses often reveal your deepest money scripts.' },
      questionsToConsider: [
        "What was your earliest memory of money? Was it positive or negative?",
        "What did your family teach you -- spoken or unspoken -- about finances?",
        "Which of the four money script categories (avoidance, worship, status, vigilance) do you most identify with?",
        "What's one money belief you want to change?"
      ],
      deeperPerspective: {
        title: "A Deeper Perspective",
        content: [
          "Many of us carry stories about money that were written by our circumstances rather than by truth. What if the story you're telling yourself about money isn't the whole story? What if there's a bigger narrative at work -- one that says your worth was established long before you earned your first paycheck?",
          "Ancient wisdom teaches that a person's life does not consist in the abundance of their possessions. That's a direct challenge to the money worship script that so many of us run on autopilot. If your life doesn't consist in what you own, then what does it consist in? Your relationships? Your character? Your purpose?",
          "There's a freedom that comes from uncoupling your identity from your income. People who've made this shift describe it like setting down a heavy backpack they didn't know they were carrying. They still work hard. They still manage money wisely. But the anxiety lifts because their worth is no longer on the line with every financial decision."
        ],
        questions: [
          "What if the story you're telling yourself about money isn't the whole story? What if there's a bigger narrative at work?",
          "If your life doesn't consist in what you own, what does it consist in?",
          "What would it feel like to know -- really know -- that your worth was established before you ever earned a dollar?"
        ]
      }
    },
    {
      id: "ownership-mindset",
      heading: "The Ownership Mindset",
      content: [
        "There's a moment in every person's financial journey where a fundamental shift happens -- or doesn't. It's the moment you stop saying 'this happened to me' and start saying 'I'm going to do something about this.' That shift is what we call the ownership mindset, and without it, no budget, no debt payoff strategy, and no savings plan will work.",
        "The ownership mindset is not about blame. It's not about looking at your credit card debt and saying 'this is all my fault and I'm a terrible person.' That kind of self-flagellation doesn't help anyone. The ownership mindset is about responsibility -- the decision to take full responsibility for your financial future regardless of how you got here. Your parents might have made terrible financial decisions. The economy might have dealt you a bad hand. Medical bills might have blindsided you. All of those things can be true. And it can also be true that from this point forward, you are in the driver's seat.",
        "The opposite of the ownership mindset is the victim mindset. People in victim mode say things like: 'I'll never get ahead.' 'The system is rigged.' 'I wasn't born into money, so what's the point?' 'My spouse is the one who spends too much.' Each of these statements may contain a grain of truth. But none of them lead anywhere productive. They're walls, not doors.",
        "Here's what the ownership mindset looks like in practice. When a bill you forgot about hits your account, instead of saying 'Why does this always happen to me?' you say, 'I need a system to track irregular expenses so this doesn't happen again.' When you realize you've been spending $200 a month on subscriptions you barely use, instead of feeling ashamed, you cancel them and redirect that money. When your car breaks down unexpectedly, instead of spiraling into despair, you build an emergency fund so the next surprise doesn't derail you.",
        "Taking ownership doesn't mean doing everything alone. Some of the most financially successful people in the world have advisors, coaches, accountability partners, and support systems. Ownership means you take the lead. You ask for help. You make the call. You follow through. Nobody is coming to rescue you from your financial situation -- but plenty of people will walk alongside you if you take the first step.",
        "One of the most powerful things about the ownership mindset is how it changes your relationship with failure. In a victim mindset, failure is permanent: 'I tried a budget and it didn't work, so I'm just bad with money.' In an ownership mindset, failure is information: 'That budget approach didn't work for me. Let me try a different one.' The person who eventually wins with money isn't the one who never makes mistakes -- it's the one who keeps adjusting.",
        "This week, we're going to ask you to make a commitment. Not a commitment to be perfect. Not a commitment to pay off all your debt by next month. A commitment to ownership. A commitment that says: 'I see where I am, I accept responsibility for getting here, and I'm choosing to move forward.' That commitment is the foundation everything else in this course is built on.",
        "One more thought: some people believe that taking ownership and accepting help from a higher power aren't opposites -- they're partners. The most resilient people often combine fierce personal responsibility with deep trust that they're not truly alone in this journey. Whether that resonates with you or not, consider this: ownership doesn't mean carrying the weight by yourself. It means choosing to pick it up."
      ],
      callout: { type: 'example', content: 'Victim mindset: "I\'ll never get ahead because I don\'t make enough." Ownership mindset: "I don\'t make as much as I\'d like, but I can control where every dollar goes and look for ways to earn more."' },
      questionsToConsider: [
        "In what areas of your finances have you been operating in victim mode?",
        "What's one thing you can take full ownership of this week?",
        "Who could be your accountability partner on this journey?",
        "Is there something you're holding onto that's holding you back?"
      ],
      deeperPerspective: {
        title: "A Deeper Perspective",
        content: [
          "Some people believe that everything they have is truly theirs -- earned by their own effort, controlled by their own decisions. Others believe they're managing something that was entrusted to them -- by their community, their family, or something beyond themselves. Which perspective leads to more freedom? Which leads to more anxiety?",
          "The concept of stewardship -- managing what belongs to someone else -- is one of the oldest ideas in human civilization. It shows up in ancient texts, in philosophy, and in traditions across the world. If you're not the ultimate owner of your resources, then you're not burdened with ultimate responsibility. You're a steward trusted with a role.",
          "That might sound like it contradicts the ownership mindset. But it doesn't. Being a good steward actually requires more responsibility, not less. A steward doesn't shrug and say 'it's not mine, so why bother?' A steward says 'it's been entrusted to me, so I'd better manage it well.' The ownership mindset and the stewardship perspective work together: you take full responsibility for managing what's in your hands, while trusting that the ultimate outcome isn't entirely on your shoulders."
        ],
        insightStory: "There's an ancient story of a leader who went on a long journey and entrusted his property to three people he trusted. To one he gave a large sum, to another a moderate sum, and to a third a small sum. The first two invested wisely and doubled what they'd been given. The third buried his in the ground. When the leader returned, the first two were praised and given even more responsibility. The third was challenged -- not for failing, but for doing nothing at all. The lesson isn't about financial returns. It's about the courage to take responsibility for what you've been given, instead of hiding from it.",
        questions: [
          "What if your financial situation isn't just about you -- but about what you could do for others if you managed it well?",
          "Is there a difference between carrying the full weight alone and accepting help from something greater than yourself?",
          "What would change in your life if you truly believed you were trusted with your resources for a reason?"
        ]
      }
    }
  ],

  story: {
    title: "Henry & Grace: The Wake-Up Call",
    paragraphs: [
      "Henry stared at the pile of bills on the kitchen table. The credit card statement showed a balance that made his stomach turn -- $14,200. Grace walked in and saw his face. She knew that look. It was the same expression he wore every time they sat down to \"figure things out.\"",
      "\"We make decent money,\" Henry said, rubbing his temples. \"I don't understand where it all goes.\"",
      "Grace sat down across from him. \"Maybe that's the problem. We don't understand where it goes because we've never really looked.\"",
      "They had tried before. A spreadsheet here, a budgeting app there. But they always quit after two weeks. The truth was, money felt like an enemy -- something that controlled them rather than something they controlled.",
      "That weekend, their friend David mentioned a community financial workshop he'd been attending. \"It's not like a boring finance class,\" David said. \"It's more about understanding your relationship with money -- where it comes from, what it means, how to manage it as something you've been trusted with.\"",
      "Henry looked at Grace. She raised her eyebrows. He nodded.",
      "\"Let's do it,\" he whispered.",
      "On the first night, the facilitator -- a calm, steady man named Marcus who'd walked his own family out of $80,000 in debt -- asked a question that rocked Henry's world: \"Do you believe -- really believe -- that what you have is entrusted to you rather than just earned by you? Your paycheck, your house, your car, your debt?\"",
      "Henry's honest answer, deep inside, was no. He'd always seen his money as his territory. His sweat. His overtime. His sacrifice.",
      "Marcus smiled gently. \"That's where most of us start. And that's exactly why we're here. We're not here to guilt you into giving more or spending less. We're here to help you see money differently -- as something entrusted to you, not something that defines you.\"",
      "That night, driving home, Grace said something Henry didn't expect. \"You know what struck me? Marcus didn't say we were bad with money. He said we hadn't connected what we value with how we handle what we've been given. That's different.\"",
      "Henry nodded slowly. \"I've spent twenty years thinking my paycheck was the scoreboard -- like how much I earned proved how much I was worth. Maybe that's the real problem.\"",
      "They sat in the driveway for a long time, talking honestly about money for the first time in years. Not arguing. Not blaming. Just... seeing.",
      "It was the beginning."
    ]
  },

  storyCentralAsia: {
    title: "The Story of Bakyt and Ainura",
    paragraphs: [
      "Bakyt is 33 years old. He works construction in Bishkek -- sometimes a big job near the Osh bazaar, sometimes smaller repairs in the apartment buildings of Jal. He is a hard worker. He does not complain. But his income comes and goes like weather: some months he brings home 30,000 som, other months only 15,000, depending on whether there is work.",
      "Ainura, his wife, is 30. She has a small stall at the Osh bazaar where she sells dried fruits, walnuts, and apricots. She knows her regular customers by name. She knows which vendors nearby are honest and which ones shade their scales. What she does not know is exactly how much she earns each month. She takes what comes in, buys what the family needs, and assumes it works out.",
      "They live in a modest two-room apartment near the bazaar with their two children: Nurlan, who is eight and attends the local school, and Madina, who is five and goes to a neighborhood kindergarten. The apartment is clean. There is always food on the table. To the neighbors, Bakyt and Ainura look like a family that is managing.",
      "But one Tuesday evening in October, Ainura sat down to pay for Madina's kindergarten fees -- 2,500 som for the month -- and realized there was almost nothing in the tin box where they keep cash. Bakyt had been between jobs for two weeks. The last of his pay had gone to groceries and a small debt they owed the landlord. She counted 1,800 som.",
      "She sat in the kitchen for a long time after the children were asleep. She was not panicking -- she had survived tight months before. But something felt different this time. She could not name where the money had gone. Bakyt's pay from the previous month had been 28,000 som. Ainura had brought in around 9,000 from the bazaar. That was 37,000 som. And yet here they were, with less than 2,000 in the tin.",
      "When Bakyt came home, she told him. He sat down heavily and rubbed his face with both hands. He said what he always said: they made enough, it should be fine, something must have come up. But neither of them could say what that something was. They had no record of anything. They were guessing about their own lives.",
      "A few days later, Ainura mentioned the situation to her friend Gulnara, who sold spices two stalls down at the bazaar. Gulnara told her about a free financial literacy program being offered at a community center near the Ala-Too square. 'It is not for rich people,' Gulnara said. 'It is for people like us, who work hard but cannot figure out where the money goes.'",
      "Ainura mentioned it to Bakyt that evening. He was skeptical -- he had heard of programs before that promised things and delivered nothing. But Ainura pressed gently. They had nothing to lose. They went on a Thursday night, sitting in plastic chairs in a room with a whiteboard and a projector, surrounded by other couples from their neighborhood. The teacher asked one question that stayed with both of them long after they left: 'Do you know exactly how much money came into your household last month, and exactly where it went?' Neither of them could answer. That was the wake-up call.",
    ],
  },

  worksheetDef: {
    id: "financial-snapshot",
    title: "Personal Financial Snapshot",
    description: "Complete this snapshot of your current financial situation. This becomes your baseline -- the starting point for everything that follows.",
    sections: [
      {
        title: "Monthly Income (after taxes)",
        description: "List all sources of income you receive each month.",
        fields: [
          { id: "income-primary", label: "Primary job", type: "currency", placeholder: "0.00" },
          { id: "income-secondary", label: "Secondary / side income", type: "currency", placeholder: "0.00" },
          { id: "income-other", label: "Other income", type: "currency", placeholder: "0.00" },
        ],
        calculation: { type: "sum", fieldIds: ["income-primary", "income-secondary", "income-other"], resultLabel: "Total Monthly Income" }
      },
      {
        title: "Monthly Expenses (estimate)",
        description: "Include everything you spend money on each month. Round numbers are fine.",
        fields: [
          { id: "expense-housing", label: "Housing (rent/mortgage)", type: "currency", placeholder: "0.00" },
          { id: "expense-utilities", label: "Utilities", type: "currency", placeholder: "0.00" },
          { id: "expense-food", label: "Food / Groceries", type: "currency", placeholder: "0.00" },
          { id: "expense-transport", label: "Transportation", type: "currency", placeholder: "0.00" },
          { id: "expense-insurance", label: "Insurance", type: "currency", placeholder: "0.00" },
          { id: "expense-debt", label: "Debt payments", type: "currency", placeholder: "0.00" },
          { id: "expense-entertainment", label: "Entertainment / Dining out", type: "currency", placeholder: "0.00" },
          { id: "expense-subscriptions", label: "Subscriptions", type: "currency", placeholder: "0.00" },
          { id: "expense-giving", label: "Giving / Charity", type: "currency", placeholder: "0.00" },
          { id: "expense-other", label: "Other", type: "currency", placeholder: "0.00" },
        ],
        calculation: { type: "sum", fieldIds: ["expense-housing", "expense-utilities", "expense-food", "expense-transport", "expense-insurance", "expense-debt", "expense-entertainment", "expense-subscriptions", "expense-giving", "expense-other"], resultLabel: "Total Monthly Expenses" }
      },
      {
        title: "Current Debts",
        description: "List every debt you currently have. Be thorough -- include credit cards, car loans, student loans, personal loans, and medical bills.",
        fields: [
          { id: "debt-creditor", label: "Creditor", type: "text", placeholder: "e.g., Visa, Sallie Mae" },
          { id: "debt-balance", label: "Balance", type: "currency", placeholder: "0.00" },
          { id: "debt-payment", label: "Monthly Payment", type: "currency", placeholder: "0.00" },
        ],
        allowDynamicRows: true,
        calculation: { type: "sum", fieldIds: ["debt-balance"], resultLabel: "Total Debt" }
      },
      {
        title: "Current Savings",
        description: "What do you have saved? Include all accounts.",
        fields: [
          { id: "savings-emergency", label: "Emergency fund", type: "currency", placeholder: "0.00" },
          { id: "savings-retirement", label: "Retirement accounts", type: "currency", placeholder: "0.00" },
          { id: "savings-other", label: "Other savings", type: "currency", placeholder: "0.00" },
        ],
        calculation: { type: "sum", fieldIds: ["savings-emergency", "savings-retirement", "savings-other"], resultLabel: "Total Savings" }
      }
    ]
  },

  reflectionQuestions: [
    { question: "What was your earliest memory of money?", prompt: "Think back to childhood -- what's the first thing that comes to mind when you think about money in your family?" },
    { question: "What did your family teach you (spoken or unspoken) about finances?", prompt: "Consider the messages you absorbed -- were they about scarcity, generosity, fear, or something else?" },
    { question: "What's one money belief you want to change?", prompt: "Name one script that isn't serving you anymore." },
    { question: "What's your biggest financial fear right now?", prompt: "Be honest -- naming it is the first step to facing it." },
  ]
};
