export interface CourseActivity {
  title: string;
  description: string;
  type: 'reflection' | 'worksheet' | 'exercise' | 'discussion';
}

export interface CourseTopic {
  title: string;
  description: string;
}

export interface CourseWeek {
  week: number;
  title: string;
  subtitle: string;
  keyQuote: string;
  quoteAuthor: string;
  overview: string;
  objectives: string[];
  keyTopics: CourseTopic[];
  activities: CourseActivity[];
  actionItems: string[];
  toolLink?: string;
  toolLabel?: string;
}

export interface TenWeekOverview {
  phase: string;
  weeks: { week: number; title: string; focus: string }[];
}

export const courseWeeks: CourseWeek[] = [
  {
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
  },
  {
    week: 2,
    title: "Identity & Work",
    subtitle: "Your worth beyond your income",
    keyQuote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    quoteAuthor: "Steve Jobs",
    overview:
      "Week 2 explores the relationship between who you are and how you earn. Many people tie their entire identity to their paycheck -- when income drops, self-worth drops with it. This week breaks that pattern. You'll examine how to find purpose in your work, maximize your earning potential, and build a healthy relationship between your career and your finances.",
    objectives: [
      "Separate your self-worth from your net worth",
      "Identify your core skills and how they translate to income",
      "Understand the concept of multiple income streams",
      "Create a plan to increase your earning power",
    ],
    keyTopics: [
      {
        title: "The Identity Trap",
        description:
          "When your income defines you, any financial setback becomes a personal crisis. Learn to build an identity rooted in your values, relationships, and character -- not just your bank balance. This shift creates resilience that no paycheck can provide.",
      },
      {
        title: "Maximizing Your Work",
        description:
          "Whether you're employed, self-employed, or between jobs, there are concrete steps to increase your value in the marketplace. We cover skill-stacking, negotiation basics, and how to think about your career as an asset that grows over time.",
      },
      {
        title: "Income Diversification",
        description:
          "Relying on a single income source is one of the biggest financial risks most people carry. Explore realistic ways to create additional revenue streams -- from side skills to passive income -- without burning out.",
      },
    ],
    activities: [
      {
        title: "Skills Inventory",
        description:
          "List every skill you have -- professional, personal, technical, creative. Then identify which ones people would pay for and which you could develop further.",
        type: "worksheet",
      },
      {
        title: "The Meaning of Work",
        description:
          "Reflect on what work means to you beyond a paycheck. What would you do even if you weren't paid? How can you bring more of that energy into your current role?",
        type: "reflection",
      },
      {
        title: "Group Discussion: Income & Identity",
        description:
          "Share with a partner or group: How has your income affected how you see yourself? What would change if your identity wasn't tied to your earnings?",
        type: "discussion",
      },
    ],
    actionItems: [
      "Complete the Skills Inventory worksheet",
      "Research one realistic way to earn additional income this month",
      "Write down 3 things that define you outside of your job",
      "Continue daily expense tracking from Week 1",
    ],
  },
  {
    week: 3,
    title: "Building a Budget That Works",
    subtitle: "Zero-based budgeting for real life",
    keyQuote: "A budget is telling your money where to go instead of wondering where it went.",
    quoteAuthor: "Dave Ramsey",
    overview:
      "This is where theory meets practice. You'll build a zero-based budget -- a plan where every dollar has a job. We don't use complicated spreadsheets or unrealistic categories. This is a practical, flexible system designed for real people with real expenses, real emergencies, and real goals.",
    objectives: [
      "Build a complete zero-based monthly budget",
      "Understand the difference between fixed, variable, and discretionary expenses",
      "Learn the envelope system (digital or physical)",
      "Create a realistic spending plan you can actually follow",
    ],
    keyTopics: [
      {
        title: "Zero-Based Budgeting Explained",
        description:
          "Income minus expenses equals zero. Every dollar is assigned a purpose before the month begins. This isn't about restriction -- it's about intention. A zero-based budget gives you permission to spend on what matters most to you while ensuring nothing falls through the cracks.",
      },
      {
        title: "The Envelope System",
        description:
          "One of the most effective budgeting methods for controlling variable spending. Whether you use physical cash envelopes or a digital equivalent, this system makes overspending physically difficult. We'll walk through setting up your first set of envelopes.",
      },
      {
        title: "Budget Busters & Fixes",
        description:
          "The most common reasons budgets fail -- and how to prevent each one. From underestimating irregular expenses to forgetting about subscriptions, we cover the traps and give you specific workarounds.",
      },
    ],
    activities: [
      {
        title: "Build Your Zero-Based Budget",
        description:
          "Using your Financial Snapshot from Week 1 and your spending data from the past two weeks, create a complete budget for next month. Assign every dollar a category.",
        type: "worksheet",
      },
      {
        title: "Envelope Setup",
        description:
          "Choose 3-5 variable spending categories (groceries, dining out, entertainment, etc.) and set up envelopes -- physical or digital -- with a fixed monthly amount.",
        type: "exercise",
      },
      {
        title: "Budget Review Discussion",
        description:
          "Share your budget with a partner or group. Get feedback on blind spots and celebrate wins from the first two weeks of tracking.",
        type: "discussion",
      },
    ],
    actionItems: [
      "Complete your zero-based budget for next month",
      "Set up at least 3 spending envelopes",
      "Identify your top 3 'budget busters' and write a plan for each",
      "Schedule a weekly 15-minute budget review on your calendar",
    ],
    toolLink: "/tools/debt-calculator",
    toolLabel: "Debt Payoff Calculator",
  },
  {
    week: 4,
    title: "Destroying Debt",
    subtitle: "Snowball, avalanche, and the psychology of getting free",
    keyQuote: "Debt is the slavery of the free.",
    quoteAuthor: "Publilius Syrus",
    overview:
      "Debt is the single biggest obstacle between most people and financial freedom. This week gets tactical. You'll list every debt, choose a payoff strategy, and build a specific plan with target dates. We cover both the math and the psychology -- because getting out of debt is as much about behavior as it is about numbers.",
    objectives: [
      "List all debts with balances, interest rates, and minimum payments",
      "Understand the Snowball vs. Avalanche payoff methods",
      "Choose a strategy and calculate your debt-free date",
      "Learn how to negotiate lower interest rates",
    ],
    keyTopics: [
      {
        title: "The Debt Inventory",
        description:
          "Before you can destroy debt, you need to face it. Create a complete list of every debt -- credit cards, student loans, car payments, personal loans, medical bills. Include the balance, interest rate, and minimum payment for each.",
      },
      {
        title: "Snowball vs. Avalanche",
        description:
          "The Snowball method (pay off smallest balance first) builds momentum through quick wins. The Avalanche method (pay off highest interest first) saves the most money. Both work -- the best one is the one you'll stick with. We'll help you choose.",
      },
      {
        title: "Accelerating Payoff",
        description:
          "Beyond choosing a strategy, there are concrete tactics to speed up your debt elimination: finding extra money in your budget, selling items, negotiating rates, balance transfers, and the power of even small extra payments.",
      },
    ],
    activities: [
      {
        title: "Debt Inventory Worksheet",
        description:
          "List every debt with its balance, interest rate, minimum payment, and current status. Organize them by both balance (for Snowball) and rate (for Avalanche) to compare strategies.",
        type: "worksheet",
      },
      {
        title: "Use the Debt Payoff Calculator",
        description:
          "Enter your debts into our interactive calculator to compare Snowball vs. Avalanche outcomes. See your projected debt-free date and total interest saved.",
        type: "exercise",
      },
      {
        title: "Debt-Free Vision",
        description:
          "Write a short paragraph describing your life without debt payments. What would you do with that money? How would it feel? This vision becomes your motivation when the process gets hard.",
        type: "reflection",
      },
    ],
    actionItems: [
      "Complete the Debt Inventory worksheet",
      "Use the Debt Payoff Calculator to compare strategies",
      "Choose Snowball or Avalanche and commit to it",
      "Call one creditor this week to ask for a lower interest rate",
      "Find at least $50 extra in your budget to put toward debt",
    ],
    toolLink: "/tools/debt-calculator",
    toolLabel: "Debt Payoff Calculator",
  },
  {
    week: 5,
    title: "Saving & Giving Back",
    subtitle: "Emergency funds, future planning, and the power of generosity",
    keyQuote: "No one has ever become poor by giving.",
    quoteAuthor: "Anne Frank",
    overview:
      "Once you have a budget and a debt plan, it's time to look forward. This week covers the two things most people put off: saving for emergencies and giving to others. Both require the same muscle -- the ability to prioritize tomorrow over today. You'll build a realistic savings plan and explore how generosity, even in small amounts, transforms both giver and receiver.",
    objectives: [
      "Understand the 3 levels of emergency savings",
      "Create a plan to build your first emergency fund",
      "Learn the psychology and practical benefits of generosity",
      "Set up automatic savings (even if it's $10/month)",
    ],
    keyTopics: [
      {
        title: "The Emergency Fund Ladder",
        description:
          "Level 1: $500-$1,000 starter fund (covers minor emergencies). Level 2: One month of expenses (covers job loss buffer). Level 3: 3-6 months of expenses (full financial resilience). We'll build a realistic timeline for reaching each level based on your budget.",
      },
      {
        title: "Automating Your Future",
        description:
          "The most reliable way to save is to make it automatic. We cover how to set up automatic transfers, choose the right savings account, and create a system where saving happens before spending -- not after.",
      },
      {
        title: "The Generosity Principle",
        description:
          "Research consistently shows that generous people report higher life satisfaction, stronger social connections, and even better physical health. Generosity isn't about the amount -- it's about the habit. We explore practical ways to give back at every income level.",
      },
    ],
    activities: [
      {
        title: "Emergency Fund Plan",
        description:
          "Calculate your Level 1 target ($500-$1,000), determine how much you can save monthly, and set a target date to reach it. Then map out Levels 2 and 3.",
        type: "worksheet",
      },
      {
        title: "Generosity Brainstorm",
        description:
          "List 5 ways you can be generous this month -- with money, time, skills, or possessions. Choose at least one and commit to it this week.",
        type: "exercise",
      },
      {
        title: "Group Discussion: What Generosity Means to You",
        description:
          "Share a time when someone's generosity made a difference in your life. Discuss how giving and saving can coexist, even on a tight budget.",
        type: "discussion",
      },
    ],
    actionItems: [
      "Open a dedicated savings account (or designate one for emergencies)",
      "Set up an automatic transfer for savings (any amount)",
      "Complete one act of generosity this week",
      "Update your budget to include savings and giving categories",
    ],
  },
  {
    week: 6,
    title: "Multiply Your Impact",
    subtitle: "Teaching others and building a lasting legacy",
    keyQuote: "The greatest use of a life is to spend it on something that will outlast it.",
    quoteAuthor: "William James",
    overview:
      "The final week is about taking everything you've learned and passing it on. Financial literacy has a multiplier effect -- when you teach one person, they teach another, and the impact spreads. You'll review your progress, create a plan for continued growth, and learn how to be a resource for your family, friends, and community.",
    objectives: [
      "Review your 6-week progress and celebrate wins",
      "Learn the basics of teaching financial concepts to others",
      "Create a 90-day financial action plan for continued growth",
      "Understand how to become a facilitator or mentor",
    ],
    keyTopics: [
      {
        title: "The Multiplication Effect",
        description:
          "When one person learns to budget, manage debt, and save, the impact doesn't stop with them. They teach their spouse, their children, their coworkers, their neighbors. One financially literate person can change an entire household -- and eventually, an entire community.",
      },
      {
        title: "Teaching What You've Learned",
        description:
          "You don't need to be an expert to help someone else take their first step. We cover simple frameworks for sharing financial concepts with friends and family -- no lecture required. The best teachers are people who recently walked the same path.",
      },
      {
        title: "Your 90-Day Plan",
        description:
          "The course is ending, but your financial journey is just beginning. Create a specific 90-day plan with milestones for debt payoff, savings targets, and one way you'll share what you've learned with someone else.",
      },
    ],
    activities: [
      {
        title: "Progress Review",
        description:
          "Compare your Week 1 Financial Snapshot to where you are now. Document every change -- budget created, debt plan in place, savings started, habits changed.",
        type: "worksheet",
      },
      {
        title: "Teach-Back Exercise",
        description:
          "Choose one concept from this course and explain it to someone who hasn't taken the course. Practice making it simple, practical, and encouraging.",
        type: "exercise",
      },
      {
        title: "Graduation Discussion",
        description:
          "Share your biggest takeaway from the course, your 90-day plan, and how you plan to help at least one other person with their finances.",
        type: "discussion",
      },
    ],
    actionItems: [
      "Complete your 90-Day Financial Action Plan",
      "Teach one financial concept to a friend or family member this week",
      "Share your course experience (leave a testimonial or tell a friend)",
      "Consider becoming a volunteer facilitator for future cohorts",
    ],
  },
];

export const tenWeekOverview: TenWeekOverview[] = [
  {
    phase: "Foundation (Weeks 1-2)",
    weeks: [
      {
        week: 1,
        title: "The Journey Begins",
        focus: "Personal Financial Snapshot, ownership mindset, and understanding where you stand today",
      },
      {
        week: 2,
        title: "Ownership & Identity",
        focus: "Separating self-worth from net worth, identifying competing priorities, and building a healthy money mindset",
      },
    ],
  },
  {
    phase: "Work & Spending (Weeks 3-4)",
    weeks: [
      {
        week: 3,
        title: "Work & Income",
        focus: "Maximizing your career potential, skill development, and creating additional income streams",
      },
      {
        week: 4,
        title: "Control Your Spending",
        focus: "Zero-based budgeting, the envelope system, and building a spending plan that works for real life",
      },
    ],
  },
  {
    phase: "Debt & Saving (Weeks 5-6)",
    weeks: [
      {
        week: 5,
        title: "Destroying Debt",
        focus: "Snowball vs. Avalanche strategies, negotiating rates, and creating your debt elimination timeline",
      },
      {
        week: 6,
        title: "Saving & Investing",
        focus: "Emergency fund ladder, automating savings, and understanding basic investment principles",
      },
    ],
  },
  {
    phase: "Generosity & Integrity (Weeks 7-8)",
    weeks: [
      {
        week: 7,
        title: "Generosity & Giving Back",
        focus: "The psychology of generosity, practical giving at every income level, and community impact",
      },
      {
        week: 8,
        title: "Honesty & Integrity",
        focus: "Building trust through financial transparency, ethical decision-making, and integrity in business",
      },
    ],
  },
  {
    phase: "Crisis & Legacy (Weeks 9-10)",
    weeks: [
      {
        week: 9,
        title: "Crisis Management",
        focus: "Financial resilience strategies, navigating setbacks, and emergency planning for tough times",
      },
      {
        week: 10,
        title: "Finishing Well & Legacy",
        focus: "Teaching others, building generational wealth habits, and creating your long-term financial vision",
      },
    ],
  },
];
