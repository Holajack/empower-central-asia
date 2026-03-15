import type { WeekFullContent } from './types';

export const week4Content: WeekFullContent = {
  week: 4,
  title: "Destroying Debt",
  subtitle: "Breaking the chains that keep you from financial freedom",
  keyQuote: "The borrower is slave to the lender. But there's a way to break those chains.",
  quoteAuthor: "Ancient Proverb",
  overview:
    "This week confronts debt head-on. You'll create a complete inventory of everything you owe, learn the Debt Snowball method for eliminating debt systematically, and discover strategies for accelerating payoff. More than just a plan, this week is about reclaiming your freedom from the burden of debt.",
  objectives: [
    "Complete a full debt inventory with every creditor, balance, and interest rate",
    "Understand the Debt Snowball vs. Avalanche methods and choose your strategy",
    "Calculate how long it will take to become debt-free",
    "Find extra money to accelerate debt payoff",
  ],
  keyTopics: [
    {
      title: "The Debt Inventory",
      description:
        "The first step to freedom is facing the full truth. You'll list every debt you owe -- credit cards, medical bills, car loans, student loans, personal loans. No hiding, no guessing. Once it's on paper, you can fight it.",
    },
    {
      title: "Snowball vs. Avalanche",
      description:
        "Two proven strategies for eliminating debt. The Snowball pays smallest to largest for quick wins and momentum. The Avalanche pays highest interest first for mathematical efficiency. You'll learn both and choose what works for you.",
    },
    {
      title: "Accelerating Payoff",
      description:
        "Finding extra money to throw at debt. Selling items you don't need. Picking up side income. Negotiating interest rates. Every extra dollar shortens your journey to freedom by days or weeks.",
    },
  ],
  activities: [
    {
      title: "Complete Debt Inventory Worksheet",
      description:
        "List every single debt you owe. Include the creditor name, type of debt, total balance, interest rate, and minimum payment. This becomes your battle plan.",
      type: "worksheet",
    },
    {
      title: "Calculate Your Debt-Free Date",
      description:
        "Using your debt inventory and current budget, calculate how long it will take to pay off your smallest debt, then the next, then the next. See your debt-free date in writing.",
      type: "exercise",
    },
    {
      title: "Draw Your Lion",
      description:
        "Draw a lion on a piece of paper. Inside its body, write each of your debts from smallest to largest. Post it somewhere you'll see it every day. Every time you pay off a debt, cross it out with a big red X.",
      type: "reflection",
    },
  ],
  actionItems: [
    "Complete the Debt Inventory worksheet -- every debt, no exceptions",
    "Order your debts from smallest to largest balance",
    "Make one extra payment toward your smallest debt this week, even if it's just $5",
    "Draw your lion and put it somewhere visible",
    "Take on NO new debt this week -- zero credit card charges, no buy-now-pay-later",
  ],
  toolLink: "/tools/debt-calculator",
  toolLabel: "Debt Payoff Calculator",

  lessonSections: [
    {
      id: "debt-inventory",
      heading: "The Debt Inventory",
      content: [
        "Most people with debt can't tell you exactly how much they owe. They know it's bad. They know the credit card balance is high. They know the student loan payment hits every month. But the actual number? The total across all debts? That's a number most people avoid like a diagnosis they don't want to hear.",
        "Avoidance makes sense. Debt carries shame. It feels like failure, like proof that you're not responsible enough or disciplined enough or successful enough. Writing down the full amount can feel like staring into an abyss. What if it's too much? What if there's no way out? These fears are real, and they keep millions of people trapped in a cycle they never break because they never face the full truth.",
        "But here's what changes everything: you cannot fight an enemy you refuse to see. Debt grows in the dark. It feeds on vague anxiety and avoidance. The moment you turn on the lights -- the moment you write down every creditor, every balance, every interest rate -- something shifts. The enemy stops being this shapeless monster in your head and becomes a list of numbers. Numbers you can organize. Numbers you can attack. Numbers you can eliminate.",
        "The debt inventory is brutally simple. You sit down with your bank statements, your credit card bills, your loan documents, and you make a list. Every debt. No exceptions. Credit cards, store cards, buy-now-pay-later accounts, car loans, student loans, medical bills, personal loans from family or friends. Everything. You write down the creditor name, the type of debt, the current balance, the interest rate, and the minimum monthly payment.",
        "For many people, seeing the total for the first time is devastating. The number is bigger than expected. The weight feels heavier. But here's the paradox: the moment you see the full number is also the moment you gain power over it. Before the inventory, the debt was infinite and unknowable. After the inventory, it's finite. It has a boundary. And anything with a boundary can be conquered.",
        "There's another reason the inventory matters. Debt isn't just a financial burden -- it's an emotional and spiritual one. Every dollar you owe is a dollar you don't control. It's already spoken for. Already claimed by someone else. The old proverb says the borrower is slave to the lender, and that's not hyperbole. Debt limits your choices, restricts your freedom, and shapes your future without your permission. The inventory is the first step toward reclaiming that freedom.",
        "Some people discover debts they'd forgotten about. A medical bill that went to collections. A store card with a small balance that's been accruing interest for years. A personal loan from a friend they'd mentally written off. The inventory forces honesty. And honesty, as uncomfortable as it is, is the only path to freedom."
      ],
      questionsToConsider: [
        "What emotions come up when you think about facing your total debt number?",
        "Have you been avoiding the full truth? Why?",
        "How would it feel to know exactly where you stand -- good or bad?",
      ],
      deeperPerspective: {
        title: "A Deeper Perspective",
        content: [
          "There's a reason the ancient proverb says the borrower is slave to the lender. Debt isn't just about money -- it's about freedom. When you owe, you're bound. Your choices are limited. Your future is constrained. The weight you feel isn't just financial; it's existential.",
          "But here's the question worth sitting with: what chains have you been carrying? Not just the financial ones -- the emotional ones. The shame. The anxiety. The sense that you're always behind, always trying to catch up, never quite free. Those chains are just as real as the debt itself.",
          "Facing the full truth about your debt is an act of courage. It's choosing to see rather than hide. It's the first step toward breaking chains that may have held you -- or your family -- for years. And breaking those chains isn't just about numbers. It's about reclaiming the person you were meant to be."
        ],
        questions: [
          "What would it feel like to be completely free from debt?",
          "How would your life change if you owed no one anything?",
          "What chains -- financial, emotional, spiritual -- are you ready to break?"
        ]
      }
    },
    {
      id: "snowball-avalanche",
      heading: "Snowball vs. Avalanche",
      content: [
        "Once you know what you owe, the next question is: how do you pay it off? There are two main strategies that personal finance experts recommend, and they have competing philosophies. The first is called the Debt Snowball. The second is the Debt Avalanche. Both work. But they work for different reasons.",
        "The Debt Snowball method says: ignore interest rates. Order your debts from smallest balance to largest balance. Pay the minimum on everything except the smallest debt. Throw every extra dollar you can find at that smallest debt. When it's gone, take the payment you were making on it and roll it into the next smallest debt. The payment gets bigger each time -- like a snowball rolling downhill, gathering mass and momentum.",
        "Why does the Snowball work? Because personal finance is 80 percent behavior and 20 percent math. The Snowball gives you quick wins. When you pay off that first debt -- even if it's just $800 or $1,200 -- something changes. You feel it. You taste freedom. That first victory proves the plan works, and it fuels your determination to keep going. The momentum becomes psychological, not just financial.",
        "The Debt Avalanche method takes a different approach. It says: order your debts from highest interest rate to lowest interest rate. Pay minimums on everything except the highest-rate debt. Attack that one first. This method saves you the most money in interest over time because you're eliminating the most expensive debt first. Mathematically, it's the optimal strategy.",
        "So which one should you choose? Here's the honest answer: the best debt payoff plan is the one you'll actually finish. If you're the kind of person who needs quick wins to stay motivated, the Snowball is for you. If you're analytical and motivated by efficiency, the Avalanche might work better. But most people -- especially those who've tried and quit before -- need the Snowball. They need to see progress fast.",
        "There's a deeper reason the Snowball works for most people. Debt elimination isn't a sprint; it's a marathon. And marathons are won by people who keep going when it gets hard. The Snowball builds the habit of winning. Each paid-off debt is a milestone, a celebration, a reminder that you're making real progress. By the time you're three or four debts in, the momentum is unstoppable.",
        "The Avalanche, by contrast, can feel slower at first. If your highest-interest debt is also your largest balance, it might take months or even years to see that first victory. For people who are already discouraged, already exhausted from years of minimum payments, that delay can be fatal to motivation. The math is better, but the psychology is harder.",
        "Here's the compromise some people use: start with the Snowball to build momentum, then switch to the Avalanche once you've knocked out a few debts and proven to yourself that you can do this. The early wins give you confidence. The later efficiency saves you money. Best of both worlds."
      ],
      callout: { type: 'tip', content: 'Personal finance is 80% behavior, 20% math. The best plan is the one you will actually stick with until every debt is gone.' },
      questionsToConsider: [
        "Are you more motivated by quick wins or by mathematical efficiency?",
        "Have you tried to pay off debt before? What made you quit?",
        "Which method feels right for your personality and situation?",
      ],
      deeperPerspective: {
        title: "A Deeper Perspective",
        content: [
          "There's something powerful about persistence in the face of a mountain that looks too high to climb. Debt can feel that way -- overwhelming, insurmountable, like no matter how hard you work, you'll never reach the top. That feeling is one of the reasons so many people give up.",
          "But here's what the Debt Snowball teaches: progress is made one step at a time. You don't have to see the top of the mountain to take the next step. You just have to keep moving. The first debt you pay off might be small, but it proves something crucial: the mountain can be climbed. And once you know that, hope replaces despair.",
          "Hope is a powerful force. It's the difference between giving up and pressing on. And sometimes, the most important thing you can do is choose a strategy that keeps hope alive long enough for you to finish the journey."
        ],
        questions: [
          "When have you felt like giving up on something that seemed too hard?",
          "What gave you the strength to keep going?",
          "How does hope change the way you approach challenges?"
        ]
      }
    },
    {
      id: "accelerating-payoff",
      heading: "Accelerating Payoff",
      content: [
        "The Debt Snowball or Avalanche gives you the method. But the speed at which you pay off debt depends on one thing: how much extra money you can throw at it. If you're only making minimum payments, you'll be paying for decades. If you can add an extra $100, $200, or $500 a month, you'll cut years off your timeline. Every extra dollar matters.",
        "So where do you find extra money? The answer is uncomfortable but true: you make sacrifices. You sell things you don't need. You cut expenses you've been justifying. You pick up side income. You negotiate lower interest rates. You redirect every windfall -- tax refunds, work bonuses, gifts -- straight to debt. This season of your life isn't about comfort. It's about intensity.",
        "Start with what you already own. Walk through your house and ask: what could I sell? Old electronics. Furniture you're not using. Clothes that don't fit. Tools in the garage. Kids' toys they've outgrown. Books, DVDs, sports equipment. People have raised thousands of dollars by selling things that were gathering dust. Every dollar from a sale is a dollar that shortens your debt timeline.",
        "Next, look at your budget. Where can you cut? This isn't about small tweaks -- this is about radical, temporary sacrifice. Cancel subscriptions. Stop eating out. Cut the cable. Shop at discount grocery stores. Drive less. The goal is to squeeze every possible dollar out of your current income and redirect it to debt. This intensity won't last forever, but it has to last long enough to kill the debt.",
        "Then there's side income. In the gig economy, there are dozens of ways to earn extra money: rideshare driving, food delivery, freelancing, tutoring, dog walking, yard work, online selling. Even an extra $500 a month -- just $125 a week -- can cut years off a debt payoff plan. The work is hard, the hours are long, but the freedom on the other side is worth it.",
        "One often-overlooked strategy: negotiating with creditors. If you have high-interest credit card debt, call the company and ask for a lower rate. If you've been a good customer with a history of on-time payments, they'll often reduce your rate by several percentage points. That lower rate means more of your payment goes to principal instead of interest. It's a five-minute phone call that can save you hundreds or thousands of dollars.",
        "Balance transfers are another option. Some credit cards offer 0 percent interest for 12 to 18 months on transferred balances. If you can transfer a high-interest balance to a 0 percent card and pay it off during the promotional period, you save a massive amount in interest. But be careful: if you don't pay it off in time, the interest can come roaring back. This strategy requires discipline.",
        "Here's the key mindset shift: every financial decision you make during this season should be viewed through the lens of debt elimination. When you get a raise, don't inflate your lifestyle -- throw it at debt. When you get a tax refund, don't take a vacation -- throw it at debt. When someone offers to pay you for a weekend project, say yes -- and throw it at debt. This is war, and wars are won by people who stay focused on the mission until it's over.",
        "The freedom you're chasing is real. And many people who've walked this path say the deepest freedom isn't just financial -- it's the realization that your worth was never defined by your bank account in the first place.",
        "The borrower is slave to the lender -- that's true in money, and it's true in life. But here's what many people discover on this journey: the chains they're trying to break aren't just about numbers. There's something deeper at work. What if your worth was never determined by what you owe or what you own?",
        "This isn't about guilting you into perfection. It's about recognizing that the financial debt is real, hard, and urgent -- but it's not the thing that defines you. You are not your debt. You are someone worth setting free. And the sooner you internalize that, the harder you'll fight to get there."
      ],
      questionsToConsider: [
        "What could you sell this month to put toward debt?",
        "Where can you cut expenses radically -- even if just temporarily?",
        "What side income could you pick up for the next 6-12 months?",
        "How would your life change if you were completely debt-free a year from now?",
      ],
      deeperPerspective: {
        title: "A Deeper Perspective",
        content: [
          "The freedom you're chasing with your finances is real and important. And many people who've walked this path say the deepest freedom isn't just about money -- it's the discovery that your worth was never determined by what you owe or what you own.",
          "The borrower is slave to the lender. That's the proverb. And it's true financially. But something deeper is also at work. Many people who become debt-free report that the journey changed more than their bank account. It changed how they saw themselves.",
          "Something deeper has been at work all along. What if the chains you're trying to break are the visible version of something that's already been unlocked, if you'd just step out of them? The freedom you're chasing is real. Fight for it. And consider that it may point to something even larger than your balance sheet."
        ],
        questions: [
          "What if the freedom you're chasing with your finances points to a deeper kind of freedom?",
          "How does recognizing that your worth isn't defined by what you owe change the way you approach debt?",
          "What would change in your life if you truly believed you were not your debt?"
        ]
      }
    }
  ],

  story: {
    title: "Henry & Grace: Drawing the Lion",
    paragraphs: [
      "Henry has been dreading this night. Grace spent the entire week gathering statements, bills, and account printouts. Now they're spread across the kitchen table like evidence at a crime scene.",
      "\"Okay,\" Henry says, sitting down. \"Let's do this.\"",
      "Grace pulls out a yellow legal pad. They start writing. Credit Card 1: $4,200. Credit Card 2: $2,800. Store card: $1,400. Medical bill from the ER visit last year: $3,000. Personal loan from Henry's dad: $6,000. Henry's car loan: $18,000. Grace's student loans: $32,000.",
      "Grace writes the final number at the bottom of the page: $67,400.",
      "She stares at it. Her eyes fill with tears. \"How did we let this happen?\"",
      "Henry remembers something Marcus said at their last session. The borrower is slave to the lender. \"Grace, that's us. Every dollar we earn, $1,148 goes out the door before we can even decide what to do with it. We're working for Visa and Sallie Mae and the hospital and my dad. We're not free.\"",
      "Grace wipes her eyes. \"So what do we do?\"",
      "\"Marcus taught us the Debt Snowball. We pay minimums on everything and attack the smallest debt first. That $1,400 store card. We throw every extra dollar at it. When it's dead, we roll that payment into the next one. It's like killing a lion -- you don't kill a lion by staring at it. You pick up your weapon and you fight.\"",
      "Grace's expression changes. Not from despair to joy -- not yet. But from despair to determination.",
      "She grabs a piece of paper and draws a rough cartoon lion. Inside the lion's body, she writes each debt from smallest to largest. She tapes it to the refrigerator.",
      "\"Every time we kill a debt, we cross it out,\" she says. \"When they're all crossed out, the lion is dead.\"",
      "Henry puts his arm around her. \"We can do this.\"",
      "Grace tapes the marker to the fridge. \"The marker stays here until we're done.\"",
      "Later that night, Henry reads something Marcus gave him -- a passage about the ancient practice of debt cancellation, the idea that some debts were meant to be forgiven, not just repaid. He doesn't fully understand it yet. But he feels something: hope. Not because the number is smaller. But because something in the idea of release -- of a burden lifted -- makes the fight feel possible."
    ]
  },

  storyCentralAsia: {
    title: "The Story of Bakyt and Ainura",
    paragraphs: [
      "Week four was the hardest so far. The course asked Bakyt and Ainura to write down every debt they owed -- not just the obvious ones, but all of them. Bakyt had been putting this off since the program started. He knew there was something he had not told Ainura.",
      "About a year earlier, during a three-month stretch when construction work had completely dried up, Bakyt had borrowed 50,000 som from his brother-in-law Marat to cover rent and groceries. He had told Ainura it was a gift, a gesture of family support. It was not. It was a loan, and Marat had been quietly expecting repayment. The two men had not spoken about it in months. Every family gathering where Marat was present, Bakyt felt a tightness in his chest that had nothing to do with the food.",
      "Ainura had her own debt to add. When she expanded her stall at the Osh bazaar two years ago, she had taken a microloan from a local bank: 20,000 som at 24 percent annual interest, to buy additional inventory. She had been paying the minimum each month -- about 700 som -- but she had never calculated how long it would take to pay off at that rate, or how much she was paying in interest. She had been treating it like a utility bill, something that just existed.",
      "Together, they wrote it all down. The bank microloan: 20,000 som at 24 percent. The debt to Marat: 50,000 som with no formal interest but a weight that felt heavier than any interest rate. Total: 70,000 som. Ainura did not say anything for a long time after she read the number. Then she asked Bakyt quietly why he had not told her about Marat. He did not have a clean answer.",
      "The course material made something clear: debt between family members is still debt. It does not go away because no one is charging interest. In Kyrgyz culture, owing money to a relative carries a particular kind of shame -- it is not just a financial obligation but a social and family one. Bakyt had been avoiding it precisely because acknowledging it meant facing both the money and the relationship. The course gave him a framework to do both.",
      "They used the debt worksheet to prioritize. The bank microloan, though smaller, carried 24 percent annual interest -- higher than almost anything else they could imagine. The math was clear: that one had to go first. They committed to paying 2,500 som a month toward it instead of the 700 som minimum. At that rate, they calculated, it would be paid off in about nine months.",
      "The debt to Marat required a different kind of courage. Bakyt called his brother-in-law the following Sunday after a family lunch and asked to speak privately. He acknowledged the loan directly, apologized for his evasion, and proposed a repayment plan: 3,000 som a month until the full 50,000 was repaid. Marat was visibly relieved. He had not known how to bring it up either. The conversation that had been causing both men silent stress for over a year took eleven minutes.",
      "Ainura said afterward that what surprised her most was not the debt itself -- it was how much energy they had both been spending simply not thinking about it. Avoiding something heavy is still carrying it. The debt inventory did not make the debts disappear. But it made them visible, which made them manageable, which made them something other than a source of dread.",
    ],
  },

  worksheetDef: {
    id: "debt-inventory",
    title: "Debt Inventory & Snowball Plan",
    description: "List every debt you owe and create your plan to eliminate them one by one.",
    sections: [
      {
        title: "My Debt Inventory",
        description: "Write down EVERY debt. No exceptions. This is your battle plan.",
        fields: [
          { id: "debt-creditor", label: "Creditor / Lender", type: "text", placeholder: "e.g., Visa, Toyota Financial" },
          { id: "debt-type", label: "Type of Debt", type: "text", placeholder: "e.g., Credit Card, Auto Loan, Student Loan" },
          { id: "debt-balance", label: "Current Balance", type: "currency", placeholder: "0.00" },
          { id: "debt-rate", label: "Interest Rate (%)", type: "number", placeholder: "0.00" },
          { id: "debt-minimum", label: "Minimum Payment", type: "currency", placeholder: "0.00" },
        ],
        allowDynamicRows: true,
        calculation: { type: "sum", fieldIds: ["debt-balance"], resultLabel: "Total Debt" }
      },
      {
        title: "Debt Snowball Order",
        description: "List your debts again in order from SMALLEST balance to LARGEST balance (ignore interest rates).",
        fields: [
          { id: "snowball-order", label: "Snowball Order (1, 2, 3...)", type: "number" },
          { id: "snowball-debt", label: "Debt Name", type: "text", placeholder: "e.g., Store Card" },
          { id: "snowball-balance", label: "Balance", type: "currency" },
          { id: "snowball-payment", label: "Monthly Attack Payment", type: "currency", helpText: "Minimum + extra" },
        ],
        allowDynamicRows: true
      },
      {
        title: "Accelerating Payoff",
        description: "Where will you find extra money to attack debt faster?",
        fields: [
          { id: "extra-budget", label: "Extra from budget cuts", type: "currency", placeholder: "0.00" },
          { id: "extra-sell", label: "Money from selling items", type: "currency", placeholder: "0.00" },
          { id: "extra-side", label: "Side income per month", type: "currency", placeholder: "0.00" },
          { id: "extra-windfalls", label: "Expected windfalls (tax refund, bonus, etc.)", type: "currency", placeholder: "0.00" },
        ],
        calculation: { type: "sum", fieldIds: ["extra-budget", "extra-sell", "extra-side", "extra-windfalls"], resultLabel: "Total Extra Monthly" }
      },
      {
        title: "Your Debt-Free Date",
        description: "Estimate how long until your first debt is paid off.",
        fields: [
          { id: "first-debt-balance", label: "Smallest debt balance", type: "currency" },
          { id: "first-debt-payment", label: "Monthly payment (min + extra)", type: "currency" },
          { id: "first-debt-months", label: "Months to payoff (balance ÷ payment)", type: "number", helpText: "Round up" },
          { id: "first-debt-date", label: "Estimated payoff date", type: "text", placeholder: "e.g., June 2026" },
        ]
      }
    ]
  },

  reflectionQuestions: [
    { question: "How did it feel to write down your total debt number?", prompt: "Be honest about the emotions that came up -- shame, fear, anger, relief, determination." },
    { question: "What chains has your debt created in your life?", prompt: "What decisions has debt prevented you from making? What opportunities has it stolen?" },
    { question: "What would you do if you were completely debt-free?", prompt: "Dream out loud. Where would that money go? How would your life change?" },
    { question: "How does recognizing that your worth isn't defined by what you owe change the way you approach debt?", prompt: "Does it make the fight feel different? More urgent? Less shameful?" },
  ]
};
