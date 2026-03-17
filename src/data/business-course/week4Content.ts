import type { BusinessWeekContent } from './types';

export const week4Content: BusinessWeekContent = {
  week: 4,
  module: { number: 2, title: 'Shape Your Business Model' },
  title: 'The Business Model Canvas',
  subtitle: 'Your entire business on one page',
  keyQuote:
    'A business model describes the rationale of how an organization creates, delivers, and captures value.',
  quoteAuthor: 'Alexander Osterwalder',
  overview:
    'Before you invest time, money, or energy building anything, you need to see the whole picture of how your business will actually work. The Business Model Canvas is a single-page tool that maps out all nine essential components of a viable business — from the customers you serve to the costs you will carry. This week you will build your first canvas, identify gaps in your thinking, and begin to understand why successful businesses are not just great ideas but great systems.',
  objectives: [
    'Understand and explain all nine blocks of the Business Model Canvas',
    'Complete a first draft of your own Business Model Canvas',
    'Identify which blocks in your model are strongest and which need more work',
    'Recognize how the left side (operations) and right side (customers) of the canvas must connect',
  ],
  keyTopics: [
    {
      title: 'The Nine Building Blocks',
      description:
        'An overview of all nine components — Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, and Cost Structure — and why each one matters.',
    },
    {
      title: 'The Right Side: Value Creation',
      description:
        'The customer-facing half of the canvas — who you serve, what you offer them, how you reach them, how you relate to them, and how you earn money from them.',
    },
    {
      title: 'The Left Side: Value Delivery',
      description:
        'The operational half of the canvas — what resources you need, what activities you must perform, who you must partner with, and what it all costs.',
    },
  ],
  actionItems: [
    'Print or draw a blank Business Model Canvas and fill in all nine blocks for your business idea',
    'Identify the two blocks where you have the least certainty and write down what you need to find out',
    'Find one successful local business and try to sketch their Business Model Canvas based on observation',
    'Share your canvas with one person who knows your community and ask what they think is missing',
  ],
  realWorldActivity: {
    title: 'Observe and Map a Local Business',
    description:
      'Choose a local business you admire — a bakery, pharmacy, tailor, or small market. Without talking to them, observe how they operate for 30 minutes. Then go home and try to fill in all nine blocks of their Business Model Canvas based on what you saw. Where do you have gaps? This exercise trains you to see business as a system, not just a product or service.',
  },

  lessonSections: [
    {
      id: 'one-page-nine-questions',
      heading: 'One Page, Nine Questions',
      content: [
        'Most entrepreneurs, when asked to describe their business, talk about their product. "I make bread." "I give math lessons." "I drive people from one place to another." But a product is not a business. A business is a system — a set of interlocking choices about customers, value, channels, relationships, revenue, resources, activities, partners, and costs. The Business Model Canvas, developed by Alexander Osterwalder and Yves Pigneur, puts all nine of those choices on a single page so you can see the whole system at once.',
        'Imagine a bakery in Bishkek. The baker might think his business is about making excellent bread. But a business model thinker sees it differently. Who are the customers — local families, hotels, or both? What do they value — freshness, price, or variety? How does the bread reach them — do they come to the shop, or does someone deliver? What is the relationship — do they know the baker by name, or is it purely transactional? How does money flow — cash each morning, or bulk orders from restaurants? These are five questions before you have even touched the kitchen.',
        'Then there are four more questions about how the operation works. What physical and human resources are required — an oven, flour suppliers, a delivery person? What activities must happen every day — baking, cleaning, ordering, marketing? Who are the essential partners — the flour mill, the gas company, the landlord? And when you add up everything it costs to run this system, does the money coming in exceed the money going out? Only when you can answer all nine questions do you have a business, not just a job.',
        'The canvas is traditionally drawn as a large rectangle divided into nine zones. The right half — Customer Segments, Value Propositions, Channels, Customer Relationships, and Revenue Streams — represents how the business creates and captures value in the marketplace. The left half — Key Resources, Key Activities, Key Partnerships, and Cost Structure — represents how the business organizes itself to deliver that value. In the center sits the Value Proposition, which connects the left and the right: what you make and how you make it exists to serve what your customer needs.',
        'Consider a tutoring business. At the center is the value proposition: students pass their exams and parents feel confident their children are learning. On the right, the customer segment is middle-school students whose parents are anxious about university entrance exams. The channel is neighbor-to-neighbor word of mouth. The customer relationship is personal — the tutor knows each student\'s weaknesses. Revenue is a weekly fee paid in cash. On the left, the key resource is the tutor\'s knowledge and reputation. The key activity is preparing and delivering lessons. The key partner might be a school that refers struggling students. The cost structure is simple: the tutor\'s time and perhaps printed worksheets.',
        'Consider a local taxi driver. His value proposition is reliable transport on demand. His customer segment is people without cars who need to reach the market, hospital, or airport. His channels are phone calls and standing at a regular corner. His customer relationship is friendly and local — passengers know his face. His revenue is a fare per trip. His key resource is the car. His key activities are driving, maintaining the vehicle, and being available. His key partner might be a mechanic who fixes the car quickly. His costs are fuel, maintenance, and his own time.',
        'The power of the canvas is not that it produces perfect answers on the first attempt. It is that it forces you to confront the questions you have been avoiding. Most first-time entrepreneurs have strong ideas in two or three blocks and vague or empty thinking in the others. That is normal. The point of filling it in today — even imperfectly — is to see the gaps. An empty block is not a failure. It is a signal that you have work to do before you invest real resources into this idea.',
        'Keep your first canvas in pencil, not pen. The canvas is a living document. As you learn more about your customers, your costs, and your market, you will change it. Successful companies revise their business model canvas many times as they grow. What matters is not getting it perfect on day one, but developing the discipline to think about your business as a complete system, not just a single product or service.',
      ],
      callout: {
        type: 'tip',
        content:
          'Use sticky notes when filling in your canvas for the first time. Each block gets its own color. This way you can move and remove ideas without starting over. Think of it as a thinking tool, not a finished document.',
      },
      questionsToConsider: [
        'Which of the nine blocks do you feel most confident about right now?',
        'Which block feels the most unclear or uncertain?',
        'If you removed one block entirely, would the business still work?',
      ],
    },
    {
      id: 'right-side-customers',
      heading: 'The Right Side: Who Are Your Customers and Why Do They Care?',
      content: [
        'The right half of the Business Model Canvas is about your relationship with the market. It starts with Customer Segments — a deceptively simple question. Who are you serving? Answering "everyone" is not an answer. Every successful business serves a specific group of people whose needs, habits, and economic situation are distinct enough to require a tailored approach. The sharper your definition of your customer segment, the better every other decision on the right side of the canvas will become.',
        'There are several types of customer segments. Mass market businesses — like a phone company or a flour mill — serve broad populations with similar needs. Niche market businesses serve a very specific group with very particular needs — a business that only sells hiking equipment for women, or only delivers meals to diabetes patients. Segmented businesses serve two or more distinct groups with slightly different needs — a bank that serves both individual depositors and small businesses. Multi-sided platforms serve two entirely different groups who need each other — a newspaper that serves both readers and advertisers. For most small businesses in Central Asia, you are choosing between mass market and niche, and niche is usually a better starting point because you can serve those customers exceptionally well.',
        'Once you know who your customer is, the next question is your Value Proposition — why they should choose you over any alternative, including doing nothing. A value proposition is not a description of your product. It is a statement of the benefit your customer receives. The baker does not sell bread; she sells the comfort of fresh bread on the table every morning. The tutor does not sell lessons; he sells the relief of a parent who no longer worries about their child\'s future. Ask yourself: what problem does my customer have, and how does my business solve it better than any other option?',
        'Value propositions work through several mechanisms. Some businesses win on newness — they offer something that has never existed in the market. Others win on performance — the same thing others offer, but done significantly better. Some win on customization — the product is tailored to the individual customer\'s exact needs. Some win on price — the same value as a competitor, but cheaper. Some win on convenience or accessibility — making available what was previously difficult to obtain. Most small businesses in early markets win on a combination of convenience, personal relationship, and price. Understanding which mechanism drives your value is essential to how you communicate and market your business.',
        'Channels are how your value proposition reaches your customer. There are two main types: owned channels (your own shop, your delivery person, your social media page) and partner channels (a distributor, a retailer who stocks your product, a referral network). Most small businesses start with direct, owned channels because they are cheaper and give you more control and more customer feedback. The bakery might start by selling directly from her home. The tutor starts by knocking on neighbors\' doors. As the business grows, channels expand. The bakery adds a market stall, then a delivery route, then a partner café that stocks her goods.',
        'Customer Relationships describes how you interact with each customer segment throughout your relationship with them. This ranges from highly personal — the baker who knows every customer\'s name and remembers their preferences — to completely self-service, where customers buy without any human interaction. Between these extremes are automated services (a website that handles orders), communities (a WhatsApp group where customers share recipes and tag the bakery), and co-creation (inviting customers to suggest new flavors). In Central Asian culture, where trust and personal connection drive commerce, many businesses thrive on deeply personal relationships that feel more like friendship than transaction. This is a competitive advantage worth understanding and protecting.',
        'Revenue Streams is where many first-time entrepreneurs go vague. "I will charge for my product" is not enough. How much will you charge? How will customers pay — cash, bank transfer, credit, subscription? Will you charge a fixed price or negotiate each transaction? Will you offer volume discounts? Will you earn one-time revenue each time someone buys, or recurring revenue through a subscription or retainer? Some businesses earn revenue from multiple streams — a tutoring center might charge per student but also charge schools for access to their curriculum. Understanding your revenue logic determines whether the right side of your canvas generates enough income to pay for the left side.',
        'The right side of the canvas must tell a coherent story. Your customer segment has a problem. Your value proposition solves that problem in a specific, meaningful way. Your channels make it easy for that customer to access your solution. Your customer relationship maintains trust and loyalty over time. And your revenue streams capture enough value from that exchange to sustain the business. When all five elements align and reinforce each other, you have a business model that can survive in the real market. When they contradict or ignore each other, you have a product waiting to fail.',
      ],
      callout: {
        type: 'example',
        content:
          'A woman in Osh starts a home-cooked lunch delivery service. Her customer segment is office workers who cannot leave their desk at midday. Her value proposition is warm, home-style food — the kind their mothers would make — delivered to their desk by noon. Her channel is a Telegram group where orders are placed by 9am. Her customer relationship is warm and personal — she remembers who is vegetarian, who avoids spicy food. Her revenue is a daily cash payment per meal. Every block on the right side tells the same story.',
      },
      questionsToConsider: [
        'Is your customer segment narrow enough that you could describe your ideal customer in one specific sentence?',
        'What would your customer do instead of buying from you, and why is your solution better?',
        'Is your revenue model simple enough for a customer to understand in 10 seconds?',
      ],
    },
    {
      id: 'left-side-operations',
      heading: 'The Left Side: How Will You Make It Happen?',
      content: [
        'If the right side of the Business Model Canvas is about market and value, the left side is about execution. It answers the question every investor and every creditor eventually asks: do you actually have the capacity to deliver what you are promising? Many business plans sound beautiful on paper but collapse because the entrepreneur has never seriously thought through whether they have the resources, capabilities, and relationships to make it work in the real world.',
        'Key Resources are the most important assets required to make your business model function. These fall into four categories. Physical resources include machinery, buildings, vehicles, and inventory — the things you can touch. Intellectual resources include your brand, proprietary knowledge, customer databases, and patents. Human resources include specific skilled people — a master tailor, a licensed pharmacist, a driver who knows every road in the city. Financial resources include cash, credit lines, and investment capital. Different business models require different mixes. A manufacturing business is resource-heavy on the physical side. A consulting business is resource-heavy on the human side. A software company is resource-heavy on the intellectual side. Knowing what your business truly runs on helps you protect those resources and avoid the mistake of underinvesting in the thing your whole model depends upon.',
        'Key Activities are the most critical things your business must actually do to operate successfully. Again, these fall into categories. Production activities involve making or delivering your product — baking bread, cleaning carpets, driving cargo. Problem-solving activities involve using expertise to solve unique customer problems — accounting, legal advice, medical diagnosis. Platform and network activities involve managing connections between parties — a marketplace connecting buyers and sellers, or a recruitment firm connecting job seekers with employers. Most small businesses are primarily production-focused. The key is to identify which activities are central to your value proposition and which are peripheral. If you are a bakery, baking is central. Bookkeeping is not. Understanding this distinction helps you prioritize your time and decide what to delegate or outsource.',
        'Key Partnerships are the network of suppliers and partners that make the business model work. There are four types of partnerships worth understanding. Buyer-supplier relationships are basic supply chains — the baker who has a regular supplier of flour and butter, the mechanic who has a reliable source of spare parts. Strategic alliances are partnerships between non-competing businesses that benefit both — the bakery that partners with a local coffee shop so each refers customers to the other. Joint ventures are deeper collaborations where businesses share risk, cost, and reward to pursue a common goal. Co-opetition is the interesting case where competitors collaborate in some areas while competing in others — taxi drivers who share a dispatch radio but compete for individual passengers.',
        'The reasons businesses build partnerships also fall into patterns. Some partnerships exist to optimize costs — it is cheaper to buy from a wholesaler than to manufacture every input yourself. Some partnerships exist to reduce risk — sharing the cost of an expensive piece of equipment that neither party could afford alone. Some partnerships exist to acquire resources or capabilities that you simply do not have — a small bakery partnering with a delivery service because she cannot afford her own vehicle. And some partnerships open doors — a local business partnering with an international organization to access training, certification, or a market it could not reach on its own.',
        'Cost Structure is the final block, and in many ways it is the most sobering. Every decision on the left side of your canvas — every resource you require, every activity you perform, every partnership you build — has a cost. Your cost structure is the complete picture of all the expenses involved in operating your business model. Costs fall into two main types. Fixed costs stay the same regardless of how much you produce — rent, loan repayments, a regular employee salary. Variable costs change in proportion to output — the ingredients in each cake, the fuel for each delivery, the commission paid for each sale. Understanding your cost structure helps you determine your break-even point — the minimum volume of sales you need before the business stops losing money.',
        'Some business models are cost-driven — they are built to minimize costs at every step so they can offer the lowest possible price. A market stall selling basic produce is cost-driven. Other business models are value-driven — they are built to prioritize quality, personalization, or service, and they charge a premium to cover higher costs. A high-end catering company is value-driven. Most small businesses in emerging markets start cost-driven and gradually develop value-driven elements as they build reputation and loyal customers. Knowing which model you are pursuing helps you make consistent decisions about where to invest and where to cut.',
        'The left side of the canvas must connect to the right side. Every key resource you identify should be necessary to deliver your value proposition. Every key activity should be required to serve your customer segments. Every key partnership should help you reach your channels or strengthen your offering. And when you look at your cost structure alongside your revenue streams, the mathematics must eventually work in your favor — revenue must exceed costs for the business to survive. Many first-time entrepreneurs are shocked to discover, when they complete the canvas honestly, that their costs are far higher or their revenue far lower than they had assumed. This is not a reason to give up. It is a reason to redesign your model before you invest real money.',
      ],
      callout: {
        type: 'warning',
        content:
          'The most common mistake on the left side of the canvas is listing resources and activities that sound impressive but are not actually necessary. Every resource costs money and every activity costs time. If a block does not directly support your value proposition or your ability to reach customers, question whether it belongs in your model at all.',
      },
      questionsToConsider: [
        'What is the single most important resource your business cannot operate without?',
        'Which of your key activities could you outsource to a partner without losing quality?',
        'If you list all your monthly costs honestly, do your projected revenues cover them?',
      ],
      deeperPerspective: {
        title: 'Systems and Stewardship',
        content: [
          'There is a long tradition in many cultures, including in Central Asia, of thinking about business in terms of relationships rather than systems. A business is your family\'s livelihood, your neighbor\'s employer, your community\'s bread. This relational way of thinking is not wrong — it is a profound strength. But it can cause entrepreneurs to neglect systems thinking, which is different from but not opposed to relational thinking.',
          'Thinking systemically means asking: if I stepped away for a month, would this business still function? If the answer is no — if everything depends on your personal presence, energy, and relationships — then you have a job, not a business. A system is something that can operate, at least partially, without you. Building systems does not mean removing the human touch. It means documenting processes, training people, building supplier relationships that survive on paper, and creating channels that work even when you are not watching.',
          'The Business Model Canvas is one of the most practical tools for beginning to see your idea as a system. It is also an act of stewardship — taking seriously the responsibility to build something sustainable, not just something that works today. Resources are limited. Time is finite. Building well from the beginning is a form of wisdom.',
        ],
        questions: [
          'Is your current business idea a system, or does it depend entirely on you being present at all times?',
          'What is one step you could take this week to make your business slightly less dependent on your personal daily involvement?',
        ],
      },
    },
  ],

  story: {
    title: "Aijan Fills In the Blanks",
    paragraphs: [
      'Aijan had been baking cakes for family celebrations for three years. Everyone said she should start a business. Last month she finally decided they were right. She had a name, she had a logo a friend had designed for free, and she had a dream of a small cake shop downtown. She felt ready.',
      'Then her program facilitator handed her a blank Business Model Canvas and asked her to fill it in. She looked at the nine boxes and felt, for the first time, slightly unsure of herself. She started with what she knew: Value Proposition. "Beautiful, custom cakes for celebrations." She wrote it confidently. Customer Segments: "Families planning weddings, birthdays, and holidays." Also easy.',
      'Then she moved to Channels. How would customers find her? She wrote "word of mouth" and paused. Was that a channel? Could she really build a business on hope that people would talk about her? She left it partly blank and moved to Revenue Streams. "I charge per cake." But how much? She had never actually calculated the cost of a cake — the eggs, flour, butter, the gas for the oven, the hours of her own time. She had always just charged what felt right.',
      'By the time she reached Key Partnerships, she stopped completely. The box asked her to name the key suppliers and partners she would depend on. She realized she had never secured a regular flour supplier — she bought what was available at the market each week, at whatever price was available. She had no agreement with any delivery service. She had no relationship with any event planner who might refer clients. Her partnerships block was entirely empty.',
      'For the first time, Aijan understood the difference between a hobby and a business. A hobby runs on passion and opportunity. A business runs on systems. The canvas had not discouraged her — it had clarified exactly what she needed to build before she opened her doors. She made a list: find a reliable flour supplier and negotiate a monthly price, reach out to three event planners and offer them a tasting session, open a proper business bank account so she could track revenue from costs. The canvas had not stopped her dream. It had shown her the path.',
      'When she returned the following week with a revised canvas — still imperfect, still with gaps, but now with actual plans instead of vague hopes in each box — her facilitator smiled. "Now you are building a business," he said. "Before, you were just imagining one."',
    ],
  },

  storyCentralAsia: {
    title: "Aijan Fills In the Blanks",
    paragraphs: [
      "Aijan had been delivering lunches to four offices for three weeks. She had a name — Aijan's Kitchen, written in Cyrillic on the side of her thermal bag — she had a WhatsApp number, and she had a growing sense that something about the operation was not working as well as it should. When her facilitator handed her a blank Business Model Canvas at the evening session, she felt, for the first time, the specific discomfort of not being able to answer obvious questions.",
      "She started with what she knew. Value Proposition: fresh home-cooked Kyrgyz food, delivered to your office by 12:30. Customer Segments: office workers within two kilometers of her apartment. She wrote those with confidence. Then she moved to Channels. How were people finding out about her? She wrote 'word of mouth' and paused. Word of mouth was not a channel — it was what happened when she happened to know someone who happened to mention her to someone else. She could not control it, could not scale it, could not predict it.",
      "Revenue Streams was worse. She charged 150 som per portion. She had chosen that number because it felt fair and slightly below what the ashkana charged. She had never calculated whether 150 som per portion, at the volume she was currently producing, could ever cover her costs. She set down her pen and added the numbers she knew: ingredients from Osh bazaar running roughly 80 som per portion when she was honest about waste, containers at 8 som each, and the time she spent — five hours of cooking and packaging each morning — which she had been valuing at nothing.",
      "Key Partnerships was the box that stopped her completely. It asked who her essential suppliers and strategic partners were. She realized she had no regular flour supplier — she bought what was available at Osh bazaar each visit, at whatever price was current that day. She had no relationship with any office manager who could regularize her access to buildings. She had no agreement with Temirlan about when he was available to deliver and when he was not — the arrangement was entirely informal and had already broken down twice when he had an early class.",
      "She sat with the canvas for a long moment. Then she looked at the Cost Structure box and the Key Activities box side by side and understood something she had not seen before: she was spending most of her activity time cooking five different dishes when her customers' orders suggested that two of them — manty and the daily soup — accounted for nearly all the revenue. The other three dishes were consuming 40 percent of her morning for maybe 15 percent of her sales.",
      "The canvas had not discouraged her. It had shown her with uncomfortable clarity where the business was held together with optimism rather than structure. She made a list: negotiate a regular weekly order with one vegetable supplier at Osh bazaar to stabilize her costs, reach out to the office manager in the main building on her route and ask about a standing delivery arrangement, formalize Temirlan's schedule in writing with a small payment so the delivery was reliable. Cut the menu to three items. Price them at 170 som based on her actual cost calculation.",
      "When she returned the following week with a revised canvas — still imperfect, some boxes still uncertain — her facilitator read it slowly and then looked up. 'Now I can see a business,' he said. 'Before, I could only see a plan that hoped things would work out. There is a difference.'",
    ],
  },

  worksheetDef: {
    id: 'business-4',
    title: 'Business Model Canvas',
    description:
      'Map out all nine building blocks of your business on a single page. Be honest about what you know and what you are guessing. Every empty or uncertain box is a signal of work to be done.',
    sections: [
      {
        title: 'Customer Segments',
        description: 'Who are your most important customers?',
        fields: [
          {
            id: 'cs-primary',
            label: 'Primary customer segment',
            type: 'textarea',
            placeholder: 'Describe your main customer group in specific terms',
            helpText:
              'Who exactly are they? Age, location, situation, income level? Avoid "everyone" — the more specific, the better.',
          },
          {
            id: 'cs-secondary',
            label: 'Secondary customer segment (if any)',
            type: 'textarea',
            placeholder: 'Is there a second distinct group you will serve?',
            helpText:
              'If you serve two very different groups with different needs, describe them separately.',
          },
        ],
      },
      {
        title: 'Value Propositions',
        description: 'What value do you deliver to the customer?',
        fields: [
          {
            id: 'vp-main',
            label: 'Your core value proposition',
            type: 'textarea',
            placeholder: 'What problem do you solve and how?',
            helpText:
              'What job does your customer need to get done? How does your product/service do it better, cheaper, or more conveniently than alternatives?',
          },
          {
            id: 'vp-differentiator',
            label: 'What makes you different from alternatives',
            type: 'textarea',
            placeholder: 'Why would a customer choose you over the competition (including doing nothing)?',
            helpText:
              'Be honest. "Better quality" is not specific enough. Describe the concrete difference a customer would experience.',
          },
        ],
      },
      {
        title: 'Channels',
        description: 'How do you reach your Customer Segments?',
        fields: [
          {
            id: 'ch-awareness',
            label: 'How customers learn about you',
            type: 'textarea',
            placeholder: 'e.g., word of mouth, Instagram, market stall, flyers',
            helpText:
              'How will someone who has never heard of you first discover that you exist?',
          },
          {
            id: 'ch-purchase',
            label: 'How customers buy from you',
            type: 'textarea',
            placeholder: 'e.g., WhatsApp order, walk-in, phone call, online form',
            helpText:
              'What is the easiest, most natural way for your customer to make a purchase?',
          },
          {
            id: 'ch-delivery',
            label: 'How you deliver the product or service',
            type: 'textarea',
            placeholder: 'e.g., home delivery, pickup, in-person session',
            helpText: 'How does the product or service actually get to the customer?',
          },
        ],
      },
      {
        title: 'Customer Relationships',
        description: 'What type of relationship does each Customer Segment expect?',
        fields: [
          {
            id: 'cr-type',
            label: 'Type of relationship',
            type: 'textarea',
            placeholder: 'e.g., personal, self-service, community, automated',
            helpText:
              'Is this a relationship where customers know you by name, or is it purely transactional? What level of personal attention can you offer?',
          },
          {
            id: 'cr-retention',
            label: 'How you keep customers coming back',
            type: 'textarea',
            placeholder: 'e.g., loyalty discount, quality, community, regular check-ins',
            helpText:
              'What will make a satisfied customer return to you rather than try a competitor?',
          },
        ],
      },
      {
        title: 'Revenue Streams',
        description: 'For what value are your customers willing to pay?',
        fields: [
          {
            id: 'rs-model',
            label: 'How you earn revenue',
            type: 'textarea',
            placeholder: 'e.g., per-unit sale, monthly subscription, service fee, commission',
            helpText:
              'List every way money comes into the business. Do not assume there is only one way.',
          },
          {
            id: 'rs-pricing',
            label: 'Your pricing approach',
            type: 'textarea',
            placeholder: 'e.g., fixed price, negotiated, volume discount, market rate',
            helpText:
              'How do you decide what to charge? Is pricing consistent, or does it vary by customer or context?',
          },
        ],
      },
      {
        title: 'Key Resources',
        description: 'What Key Resources does your Value Proposition require?',
        fields: [
          {
            id: 'kr-physical',
            label: 'Physical resources',
            type: 'textarea',
            placeholder: 'e.g., oven, delivery vehicle, workspace, tools, inventory',
            helpText:
              'What physical assets are essential to run your business? Which ones do you own vs. need to acquire?',
          },
          {
            id: 'kr-human',
            label: 'Human resources',
            type: 'textarea',
            placeholder: 'e.g., your own skills, employees, contractors',
            helpText:
              'What skills and people are essential? Could the business run without any one person?',
          },
          {
            id: 'kr-intellectual',
            label: 'Intellectual or relationship resources',
            type: 'textarea',
            placeholder: 'e.g., recipes, customer list, brand reputation, supplier contacts',
            helpText:
              'What knowledge, relationships, or brand assets does the business depend on?',
          },
        ],
      },
      {
        title: 'Key Activities',
        description: 'What Key Activities does your Value Proposition require?',
        fields: [
          {
            id: 'ka-core',
            label: 'Core daily activities',
            type: 'textarea',
            placeholder: 'e.g., baking, customer orders, ingredient sourcing, marketing',
            helpText:
              'What must happen every day for the business to function? List the activities that are central to delivering your value.',
          },
          {
            id: 'ka-secondary',
            label: 'Secondary but necessary activities',
            type: 'textarea',
            placeholder: 'e.g., bookkeeping, equipment maintenance, supplier payments',
            helpText:
              'What activities are not directly visible to customers but still essential to the business running smoothly?',
          },
        ],
      },
      {
        title: 'Key Partnerships',
        description: 'Who are your Key Partners and Key Suppliers?',
        fields: [
          {
            id: 'kp-suppliers',
            label: 'Key suppliers',
            type: 'textarea',
            placeholder: 'e.g., flour supplier, packaging supplier, electricity provider',
            helpText:
              'Who provides the inputs your business depends on? Do you have a confirmed relationship with them, or is this still an assumption?',
          },
          {
            id: 'kp-partners',
            label: 'Strategic partners',
            type: 'textarea',
            placeholder: 'e.g., delivery service, referral partners, co-working space',
            helpText:
              'Who outside of your business helps you deliver your value proposition or reach your customers?',
          },
        ],
      },
      {
        title: 'Cost Structure',
        description: 'What are the most important costs inherent in your business model?',
        fields: [
          {
            id: 'cost-fixed',
            label: 'Fixed costs (monthly)',
            type: 'textarea',
            placeholder: 'e.g., rent 15,000 som, phone plan 500 som, loan repayment 5,000 som',
            helpText:
              'List the costs that remain constant regardless of how much you sell. These must be covered even in a slow month.',
          },
          {
            id: 'cost-variable',
            label: 'Variable costs (per unit or per sale)',
            type: 'textarea',
            placeholder: 'e.g., ingredients per cake 300 som, packaging 50 som, delivery 150 som',
            helpText:
              'List the costs that increase as you produce and sell more. What does it actually cost to deliver one unit of your product or service?',
          },
          {
            id: 'cost-most-important',
            label: 'Your single largest cost',
            type: 'text',
            placeholder: 'What costs the most?',
            helpText:
              'Identifying your biggest cost helps you understand where the most financial risk lives in your model.',
          },
        ],
      },
    ],
  },

  reflectionQuestions: [
    {
      question: 'Which block of your Business Model Canvas is most uncertain?',
      prompt:
        'Look at your completed canvas and identify the block where you had the least confidence. What would you need to learn or do to replace that uncertainty with a fact?',
    },
    {
      question: 'Do your revenue streams cover your costs?',
      prompt:
        'Looking at your Revenue Streams and Cost Structure blocks together, does the math make sense? If your projected revenue is lower than your projected costs, what would need to change?',
    },
    {
      question: 'How does the left side of your canvas connect to the right side?',
      prompt:
        'Every resource and activity on the left should exist to serve the value proposition and the customers on the right. Are there any resources or activities in your model that do not connect clearly to what your customer actually needs?',
    },
  ],
};
