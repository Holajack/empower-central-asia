import type { BusinessWeekContent } from './types';

export const week11Content: BusinessWeekContent = {
  week: 11,
  module: { number: 4, title: 'Build Your Traction' },
  title: 'Building Traction',
  subtitle: 'From first customer to sustainable growth',
  keyQuote: 'Traction trumps everything.',
  quoteAuthor: 'Naval Ravikant',
  overview:
    'Having a validated idea and a designed MVP is not the same as having a business. A business is a system that finds customers, delivers value, and generates enough revenue to sustain itself. This week you cross from planning into acquiring — you learn how to get real people to pay you real money, repeatedly. You will explore nineteen distinct traction channels, learn how to identify which channels are most likely to work for businesses in Central Asian markets, apply the Bullseye Framework to focus your limited energy on the highest-yield channels, and build an acquisition funnel that turns strangers into paying customers. By the end of this week, you will have a specific, testable traction plan — not a theory about marketing, but a plan you can execute starting Monday.',
  objectives: [
    'Understand all nineteen traction channels identified in the Bullseye framework and evaluate each for your specific market context',
    'Identify the two or three channels most likely to produce results for Central Asian small businesses given platform usage and cultural norms',
    'Apply the Bullseye Framework to build a focused, testable traction strategy for your first 30 days',
    'Map your acquisition funnel — from awareness through first payment — with measurable metrics at each stage',
    'Set your first revenue milestone and define what "traction" means in concrete numbers for your specific business',
  ],
  keyTopics: [
    {
      title: 'The Nineteen Traction Channels',
      description:
        'Gabriel Weinberg\'s comprehensive taxonomy of every way a business can acquire customers, and an honest assessment of which channels are realistic for local businesses in Kazakhstan, Kyrgyzstan, and Uzbekistan.',
    },
    {
      title: 'The Bullseye Framework',
      description:
        'A three-ring system for moving from channel brainstorm (outer ring) to focused testing (middle ring) to committed execution (inner ring), with specific Central Asian examples of each stage.',
    },
    {
      title: 'Building Your Acquisition Funnel',
      description:
        'The four-stage customer journey from awareness to action, with specific metrics to track at each stage, guidance on when to optimize versus when to scale, and your first revenue milestones.',
    },
  ],
  actionItems: [
    'Rate each of the nineteen traction channels on a 1–5 scale for your business: 5 means this channel is highly accessible and likely effective, 1 means it is inaccessible or clearly inappropriate',
    'Select your top six channels based on your ratings and write one paragraph explaining why each made the list',
    'Choose three channels from your top six to actively test this week, with a specific action plan for each',
    'Build your acquisition funnel diagram with specific numbers: how many people do you need to reach at awareness stage to produce one paying customer?',
    'Set a 30-day revenue milestone — a specific number of customers or amount of revenue you will achieve',
    'Define one metric you will track daily during your traction testing phase',
  ],
  realWorldActivity: {
    title: 'Test One Traction Channel This Week',
    description:
      'Choose one traction channel and execute a real test this week. Not a plan to test it — an actual test. Post in a Telegram group, attend a community event, reach out to five potential partners, show your work to twenty people you know. Record exactly what you did, how many people you reached, and what percentage took the next step. Bring this data to your group next week.',
  },
  lessonSections: [
    {
      id: 'week11-section1',
      heading: 'The Traction Channels',
      content: [
        'Gabriel Weinberg and Justin Mares catalogued nineteen distinct channels through which businesses acquire customers. Most entrepreneurs, when they think about marketing, are thinking about two or three of them — usually social media, word of mouth, and maybe advertising. The remaining channels are often more powerful and far less competitive, precisely because most people have not thought about them. Understanding all nineteen gives you a competitive advantage over entrepreneurs who are fighting for attention in the same crowded spaces.',
        'The nineteen channels are: viral marketing, public relations, unconventional PR, search engine marketing (paid), social and display advertising, offline advertising, search engine optimization, content marketing, email marketing, engineering as marketing (building tools that attract customers), targeting blogs, business development, sales (direct outreach), affiliate programs, existing platforms, trade shows, offline events, speaking engagements, and community building. Each of these has produced enormous business growth in the right context. Each of them is useless in the wrong context. Your job is to find the right context for your business.',
        'For most small businesses operating in urban Central Asia, the channels with the highest near-term potential cluster around personal networks and mobile platforms. Telegram group marketing deserves special attention here. Telegram penetration in Kazakhstan, Kyrgyzstan, and Uzbekistan is extraordinarily high — far higher than in Western markets where most business literature is written. Telegram groups organized around neighborhoods, professional communities, interests, and religious communities function as highly targeted, zero-cost distribution channels. A well-crafted message in the right Telegram group can reach five hundred highly relevant people within an hour.',
        'Word-of-mouth is the channel that most Central Asian businesses actually build their first traction on, even if they do not consciously plan for it. The structure of community life in these regions — where trust flows through personal relationships, where a recommendation from a known person carries enormous weight, and where community gatherings create natural information-sharing moments — makes word-of-mouth disproportionately powerful compared to most Western markets. The implication is strategic: your MVP should be designed to generate stories worth telling. When a customer has an experience that is better than expected, she tells three people. When an experience is significantly better than expected, she tells ten.',
        'Instagram has emerged as a genuine traction channel for visual businesses in Central Asian markets — food, fashion, crafts, home decoration, and services that can be shown through before-and-after imagery. The key insight, which many Central Asian entrepreneurs miss, is that Instagram\'s value is not primarily in building followers. Its value is in allowing potential customers to evaluate your quality before they commit. An Instagram profile with twenty posts showing consistent, excellent work functions as a portfolio that closes sales. Building it requires effort, but it is effort that compounds — every new post adds evidence of reliability and quality.',
        'Bazaar presence and physical community events are traction channels that Western startup literature almost never discusses, but that remain highly effective in markets where in-person commerce is culturally embedded. Setting up a table at a local market, participating in a community fair, or demonstrating your product at a neighborhood gathering generates awareness, immediate feedback, and the opportunity for live sales that digital channels cannot replicate. In smaller cities and rural areas, these channels may be the primary avenue for initial customer acquisition, with digital channels supplementing rather than replacing physical presence.',
        'Business development partnerships — formal or informal agreements with complementary businesses to refer customers to each other — are frequently underutilized by new entrepreneurs who think partnerships are for large companies. In practice, a home-based baker can partner with a tea house to supply desserts. A tailor can partner with a fabric store to receive customer referrals. A tutoring service can partner with a school supplies retailer. These partnerships cost nothing to create, generate warm referrals (the highest-converting lead type), and build community relationships that have value beyond simple customer acquisition.',
        'Community building is the most long-term of the channels but potentially the most powerful. Building or participating in a community organized around shared interests, challenges, or identity creates a platform from which you can serve customers for years. A financial literacy instructor who creates a WhatsApp group for graduates of her course, who then continues to add value through that group with tips and resources, builds an audience that trusts her deeply and refers others generously. The investment is time rather than money, and the returns are relationship-based rather than transaction-based — which is exactly the kind of foundation that sustains small businesses through difficult economic conditions.',
      ],
      callout: {
        type: 'example',
        content:
          'Channel effectiveness varies dramatically by business type. For a home-based food business: Telegram groups, word-of-mouth, and Instagram all work. For a B2B consulting service: direct sales outreach and speaking at local business events may work far better than social media. For a children\'s education service: community events and partnerships with schools or pediatricians may be the highest-yield channels. Match your channel selection to your customer\'s actual daily life.',
      },
      questionsToConsider: [
        'Which of the nineteen channels do you have personal experience or comfort with? Is that the same as the channel most likely to reach your specific customer?',
        'Where do your target customers already spend their time, both digitally and physically? How do you reach them in those spaces?',
        'What channels are your competitors using — and which channels are they ignoring that might be less competitive for you?',
        'Which single channel could you test this week with the resources you currently have?',
      ],
    },
    {
      id: 'week11-section2',
      heading: 'The Bullseye Framework',
      content: [
        'The Bullseye Framework solves a specific and common problem: entrepreneurs who try to pursue too many traction channels simultaneously and succeed with none of them. Spreading limited time and energy across six or seven channels means you never build real momentum in any of them. The Bullseye Framework is a systematic method for moving from broad possibility (all nineteen channels) to sharp focus (the one channel you will master first).',
        'The outer ring of the Bullseye is for brainstorming. In this stage, you consider all nineteen channels without judgment and think of at least one specific way you could use each channel for your particular business. The goal is not to find your answer here — it is to prevent yourself from prematurely dismissing channels that might actually work. Entrepreneurs who skip the outer ring often overlook their best opportunity because it did not feel like the obvious choice. Force yourself to generate at least a rough idea for every channel before moving on.',
        'The middle ring is where testing happens. From your outer ring brainstorm, select the six channels that seem most promising for your business — the ones where you can imagine a plausible path to a paying customer. For each of these six, design a small, cheap, fast experiment. An experiment should take no more than a week to run and no more than a small amount of money to execute. At the end of each experiment, you should have enough data to evaluate whether that channel is worth deeper investment. The metric you are measuring is cost per acquired customer — how much time and money did it take to turn one stranger into one paying customer through this channel?',
        'The inner ring is where you go all-in. Based on your middle ring experiments, identify the one channel that produced the best results — the lowest cost per customer acquisition, the highest conversion rate, or the most scalable path to growth. Then commit to that channel for the next ninety days. This does not mean you will use that channel forever. It means you will get deep enough into it to truly learn what it can do before you add a second channel. Most successful small businesses found their first hundred customers through one primary channel. Once that channel is working reliably, they added a second. Trying to run multiple channels simultaneously before any of them are working is one of the most common traction mistakes.',
        'For Central Asian small businesses, the middle ring experiments typically reveal one of three dominant channel types. The first is network-driven: the business grows through personal relationships, word-of-mouth, and Telegram group recommendations. These businesses convert at very high rates because customers arrive pre-sold by someone they trust, but they are limited by the size of the founder\'s personal network unless deliberate effort is made to systematically expand referral channels. The second is community-driven: the business grows through participation in specific communities — religious communities, professional associations, neighborhood networks, or interest groups. These businesses have lower initial reach but very high loyalty once established. The third is platform-driven: the business grows through consistent presence on a digital platform such as Instagram or a specific Telegram channel, where the content itself creates inbound interest.',
        'Aijan\'s traction story is instructive here. She tested three channels simultaneously: Telegram group posts, Instagram posts with photos of her cakes, and telling her existing social network directly. After two weeks, she tracked her results. Eight orders total. Six came from Telegram groups, one came from Instagram, and one came from a direct conversation with a friend. The data was clear: Telegram groups were producing three times the return per unit of effort compared to Instagram. The correct decision — supported by data — was to invest more effort in Telegram groups and maintain Instagram as a secondary channel rather than treating them equally.',
        'A common mistake in the middle ring is running experiments that are too short to generate meaningful data. A single Telegram post does not tell you whether Telegram groups are a viable channel — it tells you whether that one post worked. You need at least three to five experiments per channel before drawing conclusions, because the variation between individual experiments is often larger than the variation between channels. A post that generates ten responses is not necessarily in a better channel than a post that generates two responses — perhaps the first post happened to go up during a community discussion and the second during a quiet week.',
        'One practical note on measuring channel effectiveness: define "success" before you run the experiment, not after. If you post in a Telegram group, decide in advance what a successful result looks like — perhaps three inquiries, or one order, or ten clicks through to your contact information. Defining success before you run the experiment prevents post-hoc rationalization, where you convince yourself an experiment succeeded because it produced some positive outcome even if that outcome fell far short of what you needed.',
      ],
      callout: {
        type: 'tip',
        content:
          'Run your middle ring experiments in parallel rather than sequentially. Test three channels in the same week rather than one channel each week. This lets you compare results under similar market conditions and reach your inner ring decision much faster.',
      },
      questionsToConsider: [
        'What would a minimum viable traction experiment look like for your top three channels? How much would it cost in time and money?',
        'How will you measure success for each experiment — and will you commit to that definition before running the experiment?',
        'If you had to bet on one channel to produce your first ten customers, which channel would you bet on and why?',
        'What would it take to make that channel produce your first hundred customers?',
      ],
    },
    {
      id: 'week11-section3',
      heading: 'Building Your Acquisition Funnel',
      content: [
        'A funnel is a way of thinking about the customer journey as a sequence of stages, each of which converts some percentage of people into the next stage. Understanding your funnel is essential because it tells you where your business is leaking — where people drop out of the journey to becoming your customer — and therefore where your attention and investment will produce the greatest return. Different funnel leaks require completely different solutions, and confusing them is one of the most expensive mistakes a new entrepreneur can make.',
        'The most useful funnel for a small Central Asian business has four stages: Awareness (people who have encountered your business in some way), Interest (people who have engaged meaningfully — visited your profile, sent an inquiry, asked a question), Decision (people who are seriously considering buying from you — they have asked about price, availability, or timing), and Action (people who have actually paid). Each stage should have a specific number associated with it, even if that number is an estimate based on limited data. Numbers are how you manage a funnel; impressions are not enough.',
        'Calculating your conversion rates at each stage gives you powerful diagnostic information. If you have very low Awareness to Interest conversion (many people see your Telegram post but few inquire), your problem is with your message or your targeting — you are not communicating your value proposition clearly, or you are reaching the wrong people. If you have good Awareness to Interest conversion but low Interest to Decision conversion, your problem is likely with pricing, perceived reliability, or the quality of your response to inquiries. If Decision to Action is low — people are asking about price and availability but not buying — your problem might be in the purchasing process itself, or in some objection you are not addressing.',
        'For a typical home-based Central Asian business, a reasonable starting benchmark for conversion rates might look like this: 10–15% of people who see your Telegram post send an inquiry, 50–60% of people who send an inquiry have a genuine conversation about their needs, and 30–40% of those conversations result in a sale. These numbers will vary significantly by business type, price point, and the quality of your targeting. The point is not to match these benchmarks — it is to know your own numbers so you can identify where improvement is possible.',
        'Revenue milestones are the concrete manifestation of traction. Rather than thinking about traction in vague terms — "I\'m getting good feedback" or "people seem interested" — define it precisely. A useful framework is to work backward from sustainability: what is the minimum monthly revenue that would allow you to consider your business a real business rather than a side project? Then set intermediate milestones that lead there. For a home-based baker, the sustainability target might be thirty orders per month at a net profit of 500 som each — 15,000 som per month in profit. The first milestone might be five orders in the first month. The second might be fifteen orders in the second month. The third might be twenty-five orders. Each milestone is an occasion for assessment: what worked? What did not? What needs to change?',
        'Understanding when to optimize versus when to scale is one of the most consequential decisions in the traction phase. The instinct to scale — to reach more people, to invest more in advertising, to expand into new channels — is powerful and often premature. Scaling a leaky funnel simply means more people drop out at the leak point. Before you scale any channel, you must first optimize the conversion rates within your existing funnel. If only 10% of Telegram inquiries are converting to sales, adding more Telegram reach will produce ten times the inquiries and the same disappointing 10% conversion. Fix the conversion problem first; scale after.',
        'Tracking your acquisition funnel does not require sophisticated software. A simple notebook or a spreadsheet with four columns — Awareness (number of people reached), Interest (number of inquiries), Decision (number of serious conversations), Action (number of purchases) — updated weekly gives you everything you need. Review these numbers at the end of every week and ask: which stage had the lowest conversion? What one thing could I change to improve it? This weekly review habit, maintained consistently, produces more business learning than any course or book.',
        'The most important single indicator of early business traction is repeat customers. A customer who buys once might have been a fluke — the right message at the right moment. A customer who buys twice has made a deliberate choice. A customer who buys three or more times is a loyalist, and loyalists are the foundation of sustainable small businesses. Track your repeat customer rate from your very first month. If you have sold to ten customers and three of them come back for a second purchase, you have a 30% retention rate — an excellent early signal. If none of them come back, that is critical information that must be investigated before you invest more in acquisition.',
      ],
      callout: {
        type: 'warning',
        content:
          'Do not confuse activity with traction. Posting every day on Instagram is activity. Getting three new paying customers from Instagram this week is traction. Traction is always defined in terms of customer behavior — inquiries, sales, repeat purchases — not in terms of your own effort.',
      },
      questionsToConsider: [
        'At which stage of your funnel do you expect the most drop-off, and what specific change could improve conversion at that stage?',
        'What is your sustainability revenue target, and what is the path of milestones that leads from zero to that number?',
        'How will you track your funnel metrics without using sophisticated software? What is the simplest tracking system you will actually maintain?',
        'What does a loyal customer look like for your business — how many purchases, over what time period, at what level of recommendation?',
      ],
      deeperPerspective: {
        title: 'Growth That Serves People',
        content: [
          'There is a version of traction-building that treats customers as numbers to be optimized — conversion rates, cost per acquisition, lifetime value. These metrics are important tools, but they can lead you astray if they become the primary lens through which you see your business. The purpose of building traction is not to acquire customers. It is to find people whose lives your product or service genuinely improves, and to create enough of those connections that your business can sustain itself and grow.',
          'In Central Asian communities, where business relationships are embedded in personal relationships and where trust is built slowly through consistent behavior, the entrepreneur who treats customers as numbers to optimize will eventually be seen for what she is. The entrepreneur who genuinely cares about whether her customer\'s celebration was beautiful, whether her client\'s business improved, whether the child she tutored understood the material — that entrepreneur builds something that cannot be replicated by a competitor with a larger advertising budget.',
          'The most powerful form of traction in these markets is not acquired through channels at all. It is built through reputation — the accumulated evidence of your character demonstrated through consistent excellent work. This does not mean ignoring channels or being passive about customer acquisition. It means understanding that your channel strategy should be in service of your reputation strategy, not a substitute for it.',
        ],
        questions: [
          'How do you want your first ten customers to describe you when they recommend you to others?',
          'What specific things will you do — beyond just delivering the product — to make each customer feel genuinely served?',
          'How does building traction ethically and relationally change your approach to the channels you are considering?',
        ],
      },
    },
  ],
  story: {
    title: "Aijan Finds Her First Customers",
    paragraphs: [
      'Aijan spent the first two days after designing her MVP paralyzed by a fear she had not expected: not the fear of failing, but the fear of succeeding. If she posted in a Telegram group and people actually ordered cakes, she would have to bake them. She would have to show up. The idea of promising something to real people, people who were counting on her for a celebration, felt terrifying in a way that planning had not.',
      'She gave herself a deadline. By Thursday evening, she would post in three Telegram groups she was already a member of: a neighborhood group, a mothers\' group, and a professional women\'s group. The post was simple. A photo of the walnut honey cake she had made for her sister\'s birthday. Three sentences: what she offered, the three flavors, how to order. No promises she could not keep. No prices that would embarrass her when she saw the quality she could actually produce.',
      'The responses came faster than she expected. Within four hours, six people had sent her direct messages. Two were genuinely interested — they asked about price, size, and timing. One placed an order that same evening, a chocolate cake for a child\'s birthday on Saturday. Aijan confirmed the order, then sat down with her hands shaking slightly. She had a customer. She had made a promise.',
      'The Saturday delivery went perfectly. The mother who had ordered was delighted — she sent Aijan a photo of her daughter\'s face when she saw the cake, frosted chocolate with a small ring of walnuts around the edge. That photo became the second image on Aijan\'s Telegram channel. Within a week, she had two more orders from people in the same mothers\' group who had seen the photo.',
      'She also tried Instagram. She posted four photos in two weeks — careful shots of each cake, natural light, minimal staging. She got seventeen likes and one inquiry that did not convert to a sale. The contrast with Telegram was stark. Telegram groups were converting at three times the rate of Instagram, and the conversations felt warmer and more personal. She made a decision: Telegram would be her primary channel for the first three months. Instagram would remain, updated weekly, as a portfolio.',
      'By the end of week two, she had eight completed orders and two more pending. She tracked every number: how many people saw each post, how many sent inquiries, how many placed orders. Her Telegram conversion rate — inquiry to order — was running at about 40%. Her Instagram conversion rate was zero. She was not discouraged by the Instagram number. She was informed by it.',
      'One of her eight customers ordered a second time. One told Aijan that she had shared her Telegram contact with three friends. The acquisition funnel was working, slowly and exactly as designed. Aijan updated her notebook: "Revenue this month: 12,000 som. Target for next month: 20,000 som. One channel working. One channel to optimize. One repeat customer already. This is traction."',
      'She noticed something she had not expected: she was not just building a customer list. She was building a reputation. People in the neighborhood mothers\' group knew her name now. When someone asked where to get a good celebration cake, her name came up. That was not something she could engineer with a channel strategy. It was something she had to earn with every order she delivered exactly as promised.',
    ],
  },
  storyCentralAsia: {
    title: "Aijan Finds Her First Customers",
    paragraphs: [
      "Aijan spent two days after finalizing her MVP unable to post anything. The paralysis was not what she expected — it was not fear of failure, exactly, but fear of specificity. As long as the business was a plan, she could adjust it in her notebook. The moment she posted in a real Telegram group with a real offer, it became a promise. Promises to real people about food for their lunch on a specific day felt heavier than she had anticipated.",
      "She gave herself a deadline: by Thursday evening she would post in three Telegram groups she was already a member of. The neighborhood building association group — 340 members, mostly families and a scattering of small businesses. The group for professional women in Bishkek that a colleague from her accounting job had added her to two years ago — she had never posted. And the group that had formed around the apartment complex two streets away where several of her existing customers lived.",
      "The posts were identical: a photograph of that day's manty, taken against the tush kyiz wall hanging. The menu for the following day. The price. The order instruction. Four lines of text in Kyrgyz, with a Russian translation below.",
      "She put her phone face-down after posting and sat with her hands in her lap for forty minutes. When she picked it up, there were eleven messages. Six were from the professional women's group — one a genuine order with a building and floor number, three requests for more information, two people asking if she delivered to a neighborhood she did not serve. She replied to each one personally.",
      "By the end of the first week she had eight completed orders from the new channels and four inquiries that had not converted. She tracked every number in the mountain-cover notebook: how many saw the post (estimated from group member count), how many inquired, how many ordered, how many received the delivery and confirmed it. The professional women's group was converting at roughly twice the rate of the building association group — the association group had more variety of needs, including older residents who were not ordering office lunch.",
      "She also tried one channel she had been skeptical of: a WhatsApp forward. She asked three of her most regular customers to forward her menu image to one person they knew who might be interested. Within forty-eight hours she had two new customers she had never contacted directly, both of whom had received the forward and messaged her without prompting. Her CAC for those two customers was zero in monetary terms and three minutes of her time asking existing customers to share.",
      "By week two she had seventeen active customers and one who had placed a fifth consecutive order. She added that customer's name to a separate list in her notebook — repeat customers, tracked separately from new ones. By the end of the month that list had four names on it.",
      "She wrote in her notebook: 'Telegram groups: best channel. Personal forwards from existing customers: second best and costs nothing. Building association: weak conversion, deprioritize. Professional women group: high conversion, target more specifically.' Then she wrote the numbers: 23 customers in month one, 6,200 som revenue, 3,100 som in costs, 3,100 som profit. She stared at the profit line for a moment. It was the first time she had written a profit number that was real rather than projected.",
      "That evening she called Temirlan, who was studying economics and had been delivering her orders by bicycle for weeks without a formal agreement. 'I need to pay you properly,' she said. 'We are going to write down what you do, how much I pay you, and what happens if you have class. This is a business now.' Temirlan was quiet for a moment. Then he said: 'Okay, Aijan. It's about time.'",
    ],
  },
  worksheetDef: {
    id: 'business-11',
    title: 'Traction Planner',
    description:
      'Use this worksheet to brainstorm and evaluate all nineteen traction channels, design your Bullseye experiments, map your acquisition funnel, and set your first revenue milestones.',
    sections: [
      {
        title: 'Channel Brainstorm (Outer Ring)',
        description:
          'Rate each of the nineteen traction channels on a scale of 1–5 for your specific business. 5 = highly accessible and likely effective. 1 = inaccessible or clearly inappropriate.',
        fields: [
          {
            id: 'channel-viral',
            label: 'Viral Marketing (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Building incentives into your product so existing customers bring new ones.',
          },
          {
            id: 'channel-pr',
            label: 'Public Relations (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Getting coverage in newspapers, blogs, or online publications.',
          },
          {
            id: 'channel-unconventional-pr',
            label: 'Unconventional PR (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Stunts, unusual approaches, or community stories that generate attention.',
          },
          {
            id: 'channel-sem',
            label: 'Search Engine Marketing / Paid Ads (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Google Ads, Yandex Ads, or paid social advertising.',
          },
          {
            id: 'channel-social-ads',
            label: 'Social and Display Advertising (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Paid ads on Instagram, Facebook, or other social platforms.',
          },
          {
            id: 'channel-offline-ads',
            label: 'Offline Advertising (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Flyers, posters, local newspaper, radio.',
          },
          {
            id: 'channel-seo',
            label: 'Search Engine Optimization (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Appearing in search results organically when people search for what you offer.',
          },
          {
            id: 'channel-content',
            label: 'Content Marketing (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Creating helpful content (videos, articles, posts) that attracts customers.',
          },
          {
            id: 'channel-email',
            label: 'Email Marketing (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Building and messaging an email list of potential or existing customers.',
          },
          {
            id: 'channel-engineering',
            label: 'Engineering as Marketing (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Building free tools or calculators that attract customers.',
          },
          {
            id: 'channel-blogs',
            label: 'Targeting Blogs (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Getting featured in or writing for relevant blogs or online communities.',
          },
          {
            id: 'channel-biz-dev',
            label: 'Business Development (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Partnerships with complementary businesses that send customers your way.',
          },
          {
            id: 'channel-sales',
            label: 'Direct Sales (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Personally reaching out to potential customers and selling to them directly.',
          },
          {
            id: 'channel-affiliate',
            label: 'Affiliate Programs (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Paying others a commission when they send you customers who buy.',
          },
          {
            id: 'channel-platforms',
            label: 'Existing Platforms (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Telegram, Instagram, Olx, or other platforms where your customers already are.',
          },
          {
            id: 'channel-tradeshows',
            label: 'Trade Shows (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Industry events, bazaars, or fairs where you can exhibit.',
          },
          {
            id: 'channel-offline-events',
            label: 'Offline Events (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Community gatherings, pop-up markets, neighborhood events.',
          },
          {
            id: 'channel-speaking',
            label: 'Speaking Engagements (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Speaking at events where your target customers attend.',
          },
          {
            id: 'channel-community',
            label: 'Community Building (1–5)',
            type: 'number',
            placeholder: '1',
            helpText: 'Creating or participating in communities around shared interests or challenges.',
          },
        ],
      },
      {
        title: 'Top Channel Analysis (Middle Ring)',
        description:
          'For your top 3 channels (highest scores above), design a specific, testable experiment.',
        fields: [
          {
            id: 'channel-top1-name',
            label: 'Top Channel #1',
            type: 'text',
            placeholder: 'e.g., Telegram Groups',
          },
          {
            id: 'channel-top1-experiment',
            label: 'Experiment Design for Channel #1',
            type: 'textarea',
            placeholder: 'What specific action will you take? When? What is your success definition?',
            helpText: 'Define success BEFORE you run the experiment.',
          },
          {
            id: 'channel-top1-result',
            label: 'Result of Experiment #1',
            type: 'textarea',
            placeholder: 'What happened? How many people reached? How many inquiries? How many sales?',
          },
          {
            id: 'channel-top2-name',
            label: 'Top Channel #2',
            type: 'text',
            placeholder: 'e.g., Word of Mouth / Direct Network',
          },
          {
            id: 'channel-top2-experiment',
            label: 'Experiment Design for Channel #2',
            type: 'textarea',
            placeholder: 'What specific action will you take? When? What is your success definition?',
          },
          {
            id: 'channel-top2-result',
            label: 'Result of Experiment #2',
            type: 'textarea',
            placeholder: 'What happened?',
          },
          {
            id: 'channel-top3-name',
            label: 'Top Channel #3',
            type: 'text',
            placeholder: 'e.g., Instagram',
          },
          {
            id: 'channel-top3-experiment',
            label: 'Experiment Design for Channel #3',
            type: 'textarea',
            placeholder: 'What specific action will you take? When? What is your success definition?',
          },
          {
            id: 'channel-top3-result',
            label: 'Result of Experiment #3',
            type: 'textarea',
            placeholder: 'What happened?',
          },
          {
            id: 'channel-winner',
            label: 'Inner Ring Decision: Your Primary Channel',
            type: 'textarea',
            placeholder: 'Based on your experiments, which channel will you commit to for the next 90 days and why?',
          },
        ],
      },
      {
        title: 'Acquisition Funnel',
        description:
          'Map out your customer journey from awareness to first purchase and estimate numbers at each stage.',
        fields: [
          {
            id: 'funnel-awareness',
            label: 'Awareness: How many people will you reach per week?',
            type: 'number',
            placeholder: '100',
            helpText: 'Through your primary channel, how many people will see or hear about your business?',
          },
          {
            id: 'funnel-interest',
            label: 'Interest: Estimated conversion rate from Awareness',
            type: 'text',
            placeholder: 'e.g., 10% — about 10 inquiries per week',
            helpText: 'What percentage of people who encounter your business will make contact?',
          },
          {
            id: 'funnel-decision',
            label: 'Decision: Estimated conversion rate from Interest',
            type: 'text',
            placeholder: 'e.g., 50% — about 5 serious conversations per week',
            helpText: 'Of people who inquire, what percentage will seriously consider buying?',
          },
          {
            id: 'funnel-action',
            label: 'Action: Estimated conversion rate from Decision',
            type: 'text',
            placeholder: 'e.g., 40% — about 2 sales per week',
            helpText: 'Of serious conversations, what percentage will actually purchase?',
          },
          {
            id: 'funnel-biggest-leak',
            label: 'Where is your funnel most likely to leak?',
            type: 'textarea',
            placeholder: 'Which stage has the lowest expected conversion? What will you do to improve it?',
          },
        ],
      },
      {
        title: 'Revenue Milestones',
        description: 'Define what traction means in concrete numbers for your business.',
        fields: [
          {
            id: 'revenue-sustainability',
            label: 'Sustainability Revenue Target (Monthly)',
            type: 'currency',
            placeholder: '0',
            helpText: 'What monthly revenue would prove this is a real, sustainable business?',
          },
          {
            id: 'revenue-milestone-1',
            label: 'Month 1 Milestone',
            type: 'textarea',
            placeholder: 'e.g., 5 paying customers, 15,000 som revenue',
            helpText: 'What specific number of customers or revenue will you hit in month 1?',
          },
          {
            id: 'revenue-milestone-2',
            label: 'Month 2 Milestone',
            type: 'textarea',
            placeholder: 'e.g., 12 paying customers, 35,000 som revenue, 2 repeat customers',
          },
          {
            id: 'revenue-milestone-3',
            label: 'Month 3 Milestone',
            type: 'textarea',
            placeholder: 'e.g., 20 paying customers, 60,000 som revenue, 5 repeat customers',
          },
          {
            id: 'traction-daily-metric',
            label: 'Your One Daily Metric',
            type: 'text',
            placeholder: 'The single number you will track every day during traction phase...',
            helpText: 'e.g., "Number of new Telegram inquiries" or "Number of orders placed"',
          },
        ],
      },
    ],
  },
  reflectionQuestions: [
    {
      question: 'What does your channel experiment data tell you that your instincts did not?',
      prompt:
        'Before you ran experiments, you had a gut feeling about which channel would work best. What did the data confirm, and what did it contradict? What does that say about the value of testing versus assuming?',
    },
    {
      question: 'Which stage of your acquisition funnel are you most nervous about, and what does that nervousness tell you?',
      prompt:
        'Anxiety about a specific funnel stage often signals a real problem — with your pricing, your messaging, your product quality, or your ability to follow through. Take the nervousness seriously as information.',
    },
    {
      question: 'What would you need to do differently if your first traction channel stops working?',
      prompt:
        'Traction channels can dry up — a Telegram group changes its rules, a platform changes its algorithm, a partnership ends. How dependent are you on one channel, and what is your backup plan?',
    },
    {
      question: 'What does your first repeat customer tell you about your business?',
      prompt:
        'A repeat customer is a data point of the highest quality. Why did she come back? What did you do that was worth repeating? How do you design your business to produce more repeat customers systematically?',
    },
  ],
};
