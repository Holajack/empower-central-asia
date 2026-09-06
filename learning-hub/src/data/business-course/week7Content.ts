import type { BusinessWeekContent } from './types';

export const week7Content: BusinessWeekContent = {
  week: 7,
  module: { number: 3, title: 'Validate Your Assumptions' },
  title: 'Numbers Speak',
  subtitle: 'The financial metrics that determine if your business can survive',
  keyQuote: 'Revenue is vanity, profit is sanity, cash is reality.',
  quoteAuthor: 'Unknown',
  overview:
    'This week, we stop talking in feelings and start talking in numbers. Many entrepreneurs know their product is good but have never done the math to find out if their business is financially viable. Unit economics, break-even analysis, and burn rate are not accounting jargon reserved for MBAs — they are the three core questions every business owner must be able to answer before they can grow with confidence. By the end of this week you will know whether your business math actually works.',
  objectives: [
    'Calculate your Customer Acquisition Cost (CAC) and Lifetime Value (LTV) and understand what the ratio means',
    'Complete a break-even analysis using your real fixed and variable cost numbers',
    'Determine your current burn rate and how many months of runway you have',
    'Identify at least one financial lever you can pull to improve your numbers',
  ],
  keyTopics: [
    {
      title: 'Unit Economics',
      description:
        'The profit or loss you make on a single sale — before scale. CAC tells you how much it costs to acquire one customer. LTV tells you how much that customer is worth over their lifetime. The ratio between them tells you whether growth will make you richer or faster broke.',
    },
    {
      title: 'Break-Even Analysis',
      description:
        'The exact point at which your revenue covers all your costs — and you stop losing money on every sale. Every business has a break-even number. Most business owners have never calculated it. This calculation tells you exactly how many units you must sell each month before you earn your first real profit.',
    },
    {
      title: 'Burn Rate and Runway',
      description:
        'Burn rate is how much money you spend every month running your business. Runway is how many months you can survive at that burn rate before you run out of money. Together they answer the most urgent question in early business: how long do I have before I must be profitable — or find more capital?',
    },
    {
      title: 'Pricing as a Strategic Decision',
      description:
        'Most entrepreneurs price their products by copying competitors or guessing what feels fair. Real pricing starts with your unit economics and works backward: what price do I need to charge so that the math works? Often the answer is higher than what feels comfortable — and that discomfort is important data.',
    },
  ],
  actionItems: [
    'Calculate your CAC and LTV using real numbers from the last 30 days',
    'Complete the break-even formula with your actual fixed and variable costs',
    'Calculate your current monthly burn rate and divide your cash on hand by that number to find your runway',
    'Identify whether the problem is your price, your costs, or your customer volume — and write down one specific action to address it',
  ],
  realWorldActivity: {
    title: 'Calculate Your Break-Even Point',
    description:
      'Using your real numbers — not estimates — complete a full break-even analysis for your business. You need three inputs: your selling price per unit, your variable cost per unit, and your total fixed costs per month. The formula is: Fixed Costs divided by (Selling Price minus Variable Cost). The result is the number of units you must sell each month to cover all your costs. If that number feels impossible at your current volume, that is exactly the insight you need. Bring your calculation to the group and be prepared to discuss what it reveals.',
  },

  lessonSections: [
    {
      id: 'unit-economics',
      heading: 'Unit Economics: Does Your Business Math Work?',
      content: [
        'Unit economics is the simplest and most powerful financial concept for early-stage businesses. Strip away all the complexity and it comes down to this: on a single sale, do you make money or lose it? Not after a great month. Not in some imagined future when you have scale. Right now, on the next transaction you complete, does your business model generate value or destroy it? Most entrepreneurs are shocked by what they find when they actually calculate this.',
        'Customer Acquisition Cost — CAC — is the total amount you spend to bring in one new paying customer. This includes every marketing expense, every hour of sales time, every social media ad, every free sample you hand out at the bazaar, divided by the number of new customers those efforts produced. If you spent 10,000 som last month on marketing and got 20 new customers, your CAC is 500 som per customer. That number does not exist to make you feel bad. It exists so you can compare it to the next number: how much those customers are actually worth.',
        'Customer Lifetime Value — LTV — is the total revenue you expect to earn from a single customer over the entire duration of your relationship with them. For a one-time purchase business, LTV is simply the average sale amount minus the cost of goods sold. For a repeat-purchase business like a bakery or a cleaning service, you multiply the average transaction value by the average number of purchases per year and then by the average number of years a customer stays with you. That calculation suddenly makes loyal customers look very different from random one-time buyers.',
        'The ratio of LTV to CAC is the single most important number in unit economics. As a general rule, your LTV should be at least three times your CAC — a 3:1 ratio. If it is below 3:1, you are spending more to acquire customers than those customers are worth to you. Growing that business faster does not fix the problem — it accelerates it. A business losing money on every customer does not become profitable through volume. It becomes bankrupt faster.',
        'In a Central Asian context, these calculations have real texture. A seamstress in Bishkek who charges 1,500 som for an alteration and spends two hours posting on Instagram and visiting a cloth market to find one new customer has a CAC that includes the value of those hours. A tea vendor in Almaty who relies entirely on word-of-mouth has a near-zero CAC and extremely high LTV because his customers buy from him daily for years. These are radically different business models, and the unit economics of each tell a completely different story about sustainability.',
        'Many entrepreneurs operating in tenge or som find these calculations feel abstract because they have been thinking in daily cash flow rather than unit economics. The shift required is to start thinking in per-customer profitability. Every time you acquire a new customer, your business either becomes stronger or weaker depending on whether that customer\'s LTV exceeds their CAC. Tracking this forces a discipline that casual daily cash management never achieves.',
        'The good news is that you do not need complex software to calculate unit economics. You need your actual marketing spending for last month, the number of new customers it produced, your gross margin per sale, and an honest estimate of how often and how long your average customer stays with you. Put those numbers in the worksheet and let them speak. Whatever they reveal is better information than the stories you have been telling yourself about how the business is doing.',
        'If your LTV:CAC ratio is below 3:1, you have essentially three levers to pull. You can reduce your acquisition costs — find cheaper ways to reach customers. You can increase your average transaction value — raise prices or introduce higher-margin add-ons. Or you can increase repeat purchase frequency — create loyalty programs, follow up actively, give customers reasons to return. The unit economics framework tells you which lever matters most based on your specific situation.',
      ],
      callout: {
        type: 'tip',
        content:
          'Quick CAC calculation: Take everything you spent on marketing and sales last month (ads, materials, your own time at a fair hourly rate) and divide by the number of NEW paying customers you gained. That single number tells you the price of growth.',
      },
      questionsToConsider: [
        'Do you know your CAC? If not, what has been stopping you from calculating it?',
        'How long does the average customer stay with you? Have you ever asked one?',
        'If your LTV:CAC ratio is below 3:1, which of the three levers would be easiest for you to pull first?',
      ],
    },
    {
      id: 'break-even-analysis',
      heading: 'Break-Even Analysis: When Will You Stop Losing Money?',
      content: [
        'Before a business can be profitable, it must first reach break-even — the point where total revenue exactly equals total costs. Below break-even, every transaction generates revenue but the business is still losing money in aggregate. Above break-even, every additional unit sold produces real profit. The break-even point is not a milestone you celebrate and forget. It is the threshold your business must cross every single month just to survive.',
        'To calculate your break-even point, you first need to understand the difference between fixed costs and variable costs. Fixed costs are the expenses that do not change based on how much you sell. They exist whether you sell one unit or one thousand: monthly rent for a workspace, a phone plan, website hosting, a loan repayment, the cost of keeping the lights on. Variable costs are the expenses that increase directly as you sell more: raw materials, packaging, delivery fees, commissions. If you sell twice as many cakes, you buy twice as much flour. That flour cost is variable.',
        'The difference between your selling price and your variable cost per unit is called your contribution margin. This is the amount each sale contributes toward covering your fixed costs — and eventually toward profit. If you sell a product for 500 som and your variable cost to produce it is 300 som, your contribution margin is 200 som. That 200 som does not go to profit yet. First it must cover the fixed costs that exist regardless of how much you sell.',
        'The break-even formula is straightforward: Fixed Costs divided by Contribution Margin per Unit equals Break-Even Units. Take a practical example. A baker in Bishkek sells celebration cakes for 500 som each. The ingredients and packaging — variable costs — run 300 som per cake. Her contribution margin is 200 som. Her fixed costs each month are 20,000 som: a shared commercial kitchen at 12,000 som, a phone and internet plan at 3,000 som, and marketing materials plus delivery costs at 5,000 som. Dividing 20,000 by 200 gives her a break-even point of exactly 100 cakes per month. Until she sells the hundredth cake each month, she is operating at a loss. Cake 101 is her first profitable sale of the month.',
        'That number — 100 cakes — is not discouraging. It is clarifying. Without it, the baker might feel like any month with good revenue is a good month. With it, she knows that 80 cakes feels busy but is still losing money. She knows that 120 cakes feels about the same as 100 but is actually profitable. She knows that the decisions she makes — about pricing, about costs, about how many orders she takes — all connect to that single threshold number.',
        'Break-even analysis also reveals the sensitivity of your business to cost changes. If the commercial kitchen raises its rent from 12,000 som to 16,000 som, the fixed costs jump to 24,000 som and the break-even point rises to 120 cakes. That 33% increase in one fixed cost requires a 20% increase in sales volume just to maintain the same position. Conversely, if the baker can negotiate better ingredient prices and drop her variable cost from 300 to 250 som per cake, her contribution margin rises to 250 and her break-even drops to 80 cakes. The same volume of sales now generates profit two months out of every three instead of zero.',
        'It is worth noting that break-even is a dynamic number, not a static one. As your business grows and takes on new fixed costs — hiring an assistant, renting dedicated space, buying equipment — your break-even point rises. Growing a business without recalculating the break-even point is like adding weight to a plane without checking whether the engine is powerful enough to still take off. Many businesses that appear to be thriving are actually carrying more cost structure than their revenue can support, and they discover this only when a slow month hits.',
        'The discipline of calculating break-even monthly creates a fundamentally different kind of business owner: one who knows at any point in the month whether they are above or below the threshold, who understands which costs are worth cutting and which are worth bearing, and who makes pricing and volume decisions based on math rather than mood. That discipline is what separates businesses that survive from businesses that limp along until they quietly die.',
      ],
      callout: {
        type: 'example',
        content:
          'Bakery break-even example: Selling price 500 som — Variable cost 300 som = Contribution margin 200 som. Fixed costs 20,000 som per month. Break-even: 20,000 ÷ 200 = 100 cakes per month. Below 100: losing money. Above 100: every cake is pure profit.',
      },
      questionsToConsider: [
        'What are your fixed costs each month? Can you list them all without looking anything up?',
        'Do you know your contribution margin per unit? Have you ever calculated it?',
        'What would happen to your break-even point if your biggest fixed cost increased by 25%?',
        'Are you currently above or below break-even? How do you know?',
      ],
    },
    {
      id: 'burn-rate-runway',
      heading: 'Burn Rate and Runway: How Long Can You Survive?',
      content: [
        'Every early-stage business is racing against a clock. The question is not just whether your business model will eventually work — it is whether it will work before you run out of money. Burn rate and runway are the two numbers that answer that question with mathematical clarity. They are the most honest assessment of the urgency facing your business, and entrepreneurs who ignore them often discover the truth too late to do anything about it.',
        'Burn rate is the net amount of money your business consumes each month. If your business brings in 80,000 som in revenue and spends 95,000 som on all costs, your burn rate is 15,000 som per month. That is not an accounting technicality — it is the speed at which your financial reserves are shrinking. A business with a 15,000 som monthly burn rate and 45,000 som in the bank has exactly three months before it either reaches profitability or closes. No exceptions, no extensions.',
        'Runway is calculated by dividing your current cash reserves by your monthly burn rate. If you have 90,000 som saved and your burn rate is 15,000 som per month, your runway is six months. That number represents your window of viability — the amount of time you have to either fix the unit economics, reach break-even, find additional funding, or pivot to something that works better. Six months can feel like a long time. But combined with the time it takes to iterate, test pricing changes, build new customer relationships, and see results, six months passes very quickly.',
        'The critical rule regarding runway is this: if you have fewer than three months of runway remaining, stop everything else and fix this immediately. Not eventually. Not after your next product launch or marketing push. Immediately. A business with two months of runway is in crisis mode, and the appropriate response to crisis mode is to cut every non-essential expense, pursue revenue with singular focus, and have honest conversations with anyone who might extend financial support. The biggest mistake founders make with short runway is continuing normal operations while silently hoping the situation resolves itself.',
        'For entrepreneurs in Central Asia who are often bootstrapping from personal savings or small family loans — sometimes measured in thousands of som or tenge rather than tens of thousands — these calculations are not abstract. A young woman starting a tutoring business with 30,000 som of personal savings and a 10,000 som monthly burn rate has three months. If she spends the first month building a perfect website rather than acquiring students, she has spent 33% of her runway on something that generates no immediate revenue. The runway calculation makes that trade-off visible in a way that feelings never can.',
        'Reducing burn rate and extending runway involves examining every cost with honest scrutiny. Some costs are genuinely necessary to operate: ingredients, basic communications, transportation. Others feel necessary but are actually premature: office space, professional branding, sophisticated software subscriptions. The question is not whether these things would be nice to have but whether they are necessary to acquire the next customer and generate the next sale. During the early validation phase, luxury comes after sustainability, not before it.',
        'Burn rate also creates an important feedback loop with break-even analysis. If your break-even point requires 100 sales per month and you are currently producing 40, and your runway is four months, you have a very specific constraint: you need to close the gap from 40 to 100 sales within four months or find a way to dramatically reduce your fixed costs so the break-even point falls to a number you can actually reach. Seeing both numbers side by side makes the challenge concrete and creates the urgency that theory alone never does.',
        'There is a productive discipline that emerges from tracking burn rate and runway every month. It forces founders to ask whether each cost is pulling its weight, to think honestly about the pace at which they are moving toward sustainability, and to make earlier and better decisions about when to press forward and when to cut losses. The entrepreneurs who handle financial crises gracefully are almost always the ones who saw them coming — not because they were lucky but because they were watching the numbers.',
      ],
      callout: {
        type: 'warning',
        content:
          'Under 3 months of runway: stop everything and fix this now. Cut non-essential costs immediately, pursue every possible near-term revenue source, and have honest conversations with potential investors or supporters. Operating normally with two months of cash left is one of the most common ways promising businesses die.',
      },
      questionsToConsider: [
        'What is your current monthly burn rate? Does that number feel comfortable or alarming to you?',
        'How many months of runway do you have at your current burn rate?',
        'If you had to cut your burn rate by 30% this week, what would you cut first?',
        'What would it take to reach break-even, and does your runway give you enough time to get there?',
      ],
      deeperPerspective: {
        title: 'The Wisdom of Counting the Cost',
        content: [
          'There is an ancient principle that counsels against beginning a project without first calculating whether you have sufficient resources to complete it. The warning is not against ambition — it is against the specific kind of pride that launches boldly without pausing to count. In business, that pride tends to express itself as optimism that is never tested against real numbers.',
          'Burn rate and runway are, in the deepest sense, a discipline of humility. They force you to be honest about the gap between your vision and your current reality. They insist on a conversation you might prefer to avoid. But the entrepreneurs who have built lasting businesses in challenging markets — in Kyrgyzstan, Kazakhstan, and Uzbekistan — consistently report that the habits of financial discipline they developed early were among the most important factors in their survival. Not because they made the work feel smaller, but because they made the risks legible.',
          'There is something worth sitting with here: counting the cost is not a lack of vision. It is wisdom. The resources you have been entrusted with — money, time, relationships — deserve careful thought. The entrepreneur who knows their numbers is not being pessimistic. They are being responsible with what they have been given to work with.',
        ],
        questions: [
          'Have you been avoiding looking at your financial numbers because the reality might be uncomfortable?',
          'What would it mean for your sense of responsibility to know these numbers clearly and act on them?',
          'Is there a version of your business that is more financially honest and sustainable — even if it is smaller or slower than you imagined?',
        ],
      },
    },
  ],

  story: {
    title: "Aijan Counts the Cakes",
    paragraphs: [
      "Aijan had been baking cakes for two years. Friends and family told her they were the best celebration cakes in the neighborhood — soft sponge, real cream, decorated with hand-cut fondant flowers that nobody else in the district could do. She had received compliments at every event where her cakes had appeared. She felt certain that she had a business.",
      "But when her mentor at the local entrepreneurship club asked her a simple question — 'How many cakes do you need to sell each month to break even?' — Aijan went quiet.",
      "She had never calculated it. She knew she charged 500 som per cake. She knew her ingredients cost somewhere around 250 to 300 som, though she had never been exact. She knew she paid 12,000 som per month for access to a shared commercial kitchen, and another few thousand for her phone plan and the packaging she ordered in bulk. But she had never added those numbers together and compared them to what she was actually earning.",
      "That evening she sat down with a notebook. She listed everything: fixed costs — the kitchen, the packaging supply order she paid monthly, her phone — totaling 20,000 som. She decided her variable cost per cake was 300 som when she was honest about every ingredient and every box. That left a contribution margin of 200 som per cake. She divided 20,000 by 200.",
      "One hundred cakes per month.",
      "She read the number twice. Then she looked back at her order records from the last three months. January: 9 cakes. February: 12 cakes. March: 15 cakes. She had felt like she was growing. And she was — but she was nowhere near the number the math required.",
      "Her hands felt strange as she set down the pencil. Not because the situation was hopeless, but because she suddenly understood something clearly that had been blurry for two years. She was not running a business. She was running an expensive hobby that happened to generate some revenue. The gap between 15 cakes and 100 cakes was not a matter of working harder. It was a structural problem that required a structural solution.",
      "The next day she went back to her mentor. 'My price is too low or my costs are too high,' she said, 'and I don't have enough customers regardless.' Her mentor nodded. 'Now you're asking the right questions. So which problem do you want to solve first?'",
      "Aijan looked at her notebook. 'The price. If I raise my price to 700 som per cake, my contribution margin goes to 400. My break-even drops to 50 cakes. That still feels far away, but 50 is something I can actually imagine reaching in the next few months. One hundred felt impossible.'",
      "It was the first financial decision she had ever made with a formula instead of a feeling. It would not be the last.",
    ],
  },

  storyCentralAsia: {
    title: "Aijan Counts the Portions",
    paragraphs: [
      "Aijan had been delivering lunches for six weeks and felt, in a general way, that things were going reasonably well. Her Telegram channel had twenty-two subscribers. She had customers who ordered every day. She was waking at five in the morning, cooking until nine, managing deliveries through Temirlan until noon, and earning somewhere between 3,000 and 5,000 som most weeks. She told her mother this on Sunday phone calls and her mother said 'that's good, that's good' in the cautious tone she used when she was not sure it was good.",
      "Then her facilitator asked the question: 'How many portions do you need to sell each day to break even?' Aijan was quiet for a long moment. She had never calculated it.",
      "She sat down that evening with a notebook her father had bought her years ago — unused, with a faint pattern of mountains on the cover — and she began adding up what she actually spent. Ingredients from Osh bazaar, honestly accounted for: she spent roughly 65 to 70 som per portion when she factored in oil, spice waste, and the portions that came out wrong and were eaten by Temirlan. Containers: 8 som each. Temirlan's transportation costs — he used the bicycle but occasionally needed a marshrutka to cross town for a building she had added to the route: roughly 15 som per delivery run, spread across the portions delivered.",
      "Variable cost: approximately 85 som per portion.",
      "She charged 170 som. That left a contribution margin of 85 som per portion — exactly half her price.",
      "Fixed costs were harder. She did not pay commercial kitchen rent yet — she cooked in her apartment kitchen — but she had a monthly phone plan at 450 som, packaging supply orders she placed roughly monthly at 2,400 som, and the weekly Osh bazaar trip that cost her 300 som in marshrutka fare she had never included in her calculations. Total fixed costs per month: approximately 6,000 som, if she was honest.",
      "She divided 6,000 by 85. Seventy-one portions per month. She flipped back in her order records. In her best week she had delivered twenty-six portions. In a month she had never reached sixty. She read the break-even number again: seventy-one. She was below it every month she had been operating. Every week she had felt busy and productive, she had been losing money.",
      "Her hands felt strange as she set down the pencil. Not because the situation was hopeless — it was not. The math told her exactly what to fix. If she raised her price to 190 som, her contribution margin became 105 som and the break-even dropped to fifty-seven portions — a number she had reached in her best month. If she reduced her bazaar trips to twice weekly instead of three times and organized her shopping list better, her ingredient cost per portion could fall to 60 som and the break-even would fall further.",
      "She called her mother. Not to report good news, but because her mother had been selling lunches at the school canteen in Tokmok for twenty years and knew something about portion costs that Aijan had never thought to ask.",
      "Her mother said, without hesitation: 'You need to know your numbers before you talk about whether the business is working. I learned that the hard way in the first year. How much does it cost you to make one manty?' Aijan did not know the exact answer. 'Find out,' her mother said. 'Then we can talk.'",
    ],
  },

  worksheetDef: {
    id: 'business-7',
    title: 'Financial Dashboard',
    description:
      'Build your core financial picture in one place. These numbers are the foundation for every pricing, spending, and growth decision you will make.',
    sections: [
      {
        title: 'Revenue',
        description: 'Your income per unit and how many units you are currently selling.',
        fields: [
          {
            id: 'revenue-price',
            label: 'Selling price per unit (som / tenge)',
            type: 'currency',
            placeholder: '0',
            helpText: 'The amount a customer pays for one unit of your product or service',
          },
          {
            id: 'revenue-units-month',
            label: 'Units sold per month (current average)',
            type: 'number',
            placeholder: '0',
            helpText: 'How many units you are currently selling on a typical month',
          },
          {
            id: 'revenue-total',
            label: 'Monthly revenue (price × units)',
            type: 'currency',
            placeholder: '0',
            helpText: 'Calculate: selling price multiplied by units sold per month',
          },
        ],
      },
      {
        title: 'Costs',
        description: 'Your fixed and variable costs — the two categories that determine your break-even point.',
        fields: [
          {
            id: 'costs-fixed-rent',
            label: 'Rent / workspace',
            type: 'currency',
            placeholder: '0',
          },
          {
            id: 'costs-fixed-phone',
            label: 'Phone / internet / utilities',
            type: 'currency',
            placeholder: '0',
          },
          {
            id: 'costs-fixed-loan',
            label: 'Loan repayments',
            type: 'currency',
            placeholder: '0',
          },
          {
            id: 'costs-fixed-other',
            label: 'Other fixed costs (equipment, software, etc.)',
            type: 'currency',
            placeholder: '0',
          },
          {
            id: 'costs-fixed-total',
            label: 'Total fixed costs per month',
            type: 'currency',
            placeholder: '0',
            helpText: 'Sum all fixed costs above',
          },
          {
            id: 'costs-variable-unit',
            label: 'Variable cost per unit (materials, packaging, delivery)',
            type: 'currency',
            placeholder: '0',
            helpText: 'Everything that costs you money to produce or deliver one unit',
          },
          {
            id: 'costs-contribution-margin',
            label: 'Contribution margin per unit (price minus variable cost)',
            type: 'currency',
            placeholder: '0',
            helpText: 'Calculate: selling price minus variable cost per unit',
          },
          {
            id: 'costs-break-even',
            label: 'Break-even units per month (fixed costs ÷ contribution margin)',
            type: 'number',
            placeholder: '0',
            helpText: 'The number of units you must sell every month before you earn any profit',
          },
        ],
      },
      {
        title: 'Unit Economics',
        description: 'Your Customer Acquisition Cost and Lifetime Value — the two numbers that reveal whether growth will make you profitable or bankrupt faster.',
        fields: [
          {
            id: 'ue-marketing-spend',
            label: 'Total marketing and sales spend last month',
            type: 'currency',
            placeholder: '0',
            helpText: 'Include ads, materials, market booth fees, your own time at a fair rate',
          },
          {
            id: 'ue-new-customers',
            label: 'New customers acquired last month',
            type: 'number',
            placeholder: '0',
          },
          {
            id: 'ue-cac',
            label: 'Customer Acquisition Cost (marketing spend ÷ new customers)',
            type: 'currency',
            placeholder: '0',
            helpText: 'How much each new customer costs you to acquire',
          },
          {
            id: 'ue-avg-transaction',
            label: 'Average transaction value (what a customer spends per visit)',
            type: 'currency',
            placeholder: '0',
          },
          {
            id: 'ue-gross-margin-pct',
            label: 'Gross margin percentage (contribution margin ÷ price × 100)',
            type: 'number',
            placeholder: '0',
            helpText: 'What percentage of each sale is profit after variable costs',
          },
          {
            id: 'ue-purchases-per-year',
            label: 'Average purchases per customer per year',
            type: 'number',
            placeholder: '0',
          },
          {
            id: 'ue-customer-lifespan',
            label: 'Average customer lifespan (years)',
            type: 'number',
            placeholder: '0',
          },
          {
            id: 'ue-ltv',
            label: 'Customer Lifetime Value (avg transaction × gross margin × purchases per year × lifespan)',
            type: 'currency',
            placeholder: '0',
          },
          {
            id: 'ue-ltv-cac-ratio',
            label: 'LTV:CAC Ratio (LTV ÷ CAC)',
            type: 'number',
            placeholder: '0',
            helpText: 'Should be 3:1 or higher. Below 3:1 means you are losing money on each customer you acquire.',
          },
        ],
      },
      {
        title: 'Burn Rate and Runway',
        description: 'How long your business can survive at its current spending rate.',
        fields: [
          {
            id: 'burn-total-monthly-spend',
            label: 'Total monthly spending (all costs)',
            type: 'currency',
            placeholder: '0',
            helpText: 'Every som that flows out of your business each month',
          },
          {
            id: 'burn-monthly-revenue',
            label: 'Total monthly revenue',
            type: 'currency',
            placeholder: '0',
          },
          {
            id: 'burn-net-burn',
            label: 'Net burn rate (monthly spending minus monthly revenue)',
            type: 'currency',
            placeholder: '0',
            helpText: 'If positive, you are losing this much per month. If negative, you are profitable.',
          },
          {
            id: 'burn-cash-on-hand',
            label: 'Cash on hand right now',
            type: 'currency',
            placeholder: '0',
            helpText: 'All money currently available to the business',
          },
          {
            id: 'burn-runway-months',
            label: 'Runway in months (cash on hand ÷ net burn rate)',
            type: 'number',
            placeholder: '0',
            helpText: 'How many months before the business runs out of money at the current rate',
          },
        ],
      },
    ],
  },

  reflectionQuestions: [
    {
      question: 'What did your break-even calculation reveal that surprised you most?',
      prompt:
        'Was the number higher or lower than you expected? What does that tell you about your current pricing or cost structure?',
    },
    {
      question: 'Is your LTV:CAC ratio above 3:1? If not, which lever will you pull first — reduce CAC, increase LTV, or both?',
      prompt:
        'Think about which change is most within your control right now and what a realistic improvement would look like within the next 30 days.',
    },
    {
      question: 'How much runway do you have, and does that feel comfortable or urgent?',
      prompt:
        'If your runway is under six months, what is the single most important action you need to take before anything else? What has been preventing you from taking it?',
    },
  ],
};
