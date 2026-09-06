import type { BusinessWeekContent } from './types';

export const week6Content: BusinessWeekContent = {
  week: 6,
  module: { number: 2, title: 'Shape Your Business Model' },
  title: 'Customer Discovery',
  subtitle: 'Turn guesses into facts by talking to real people',
  keyQuote: 'Get out of the building.',
  quoteAuthor: 'Steve Blank',
  overview:
    'Everything you built in Weeks 4 and 5 — your Business Model Canvas, your Customer Profile, your Value Map — is made of assumptions. Some of those assumptions are educated guesses based on your experience in your community. Others are wishful thinking dressed up as insight. The only way to know the difference is to go talk to real people. Customer discovery is the discipline of replacing assumptions with facts through structured conversation. This week you will learn how to design good interviews, how to avoid the conversations that feel productive but mislead you, and how to synthesize what you hear into updates to your business model.',
  objectives: [
    'Understand Rob Fitzpatrick\'s "Mom Test" and apply its principles to avoid misleading customer feedback',
    'Design a customer discovery interview script with good questions and a productive conversation flow',
    'Conduct at least three customer discovery interviews before the Four Hats Checkpoint',
    'Synthesize interview findings into an Empathy Map and use them to update your Business Model Canvas and Value Proposition Canvas',
  ],
  keyTopics: [
    {
      title: 'The Mom Test',
      description:
        'Three rules for asking questions that produce honest, useful information rather than polite agreement — and how to recognize the three types of misleading data that ruin most customer interviews.',
    },
    {
      title: 'Designing Your Interview',
      description:
        'How to build a practical interview script, how to use the "why?" chain to go deeper, how many interviews you need, and how to adapt Western interview techniques to Central Asian conversational culture.',
    },
    {
      title: 'The Empathy Map',
      description:
        'A synthesis tool with four quadrants — Says, Thinks, Does, Feels — that helps you move from raw interview notes to structured insight, and then back into updates to your BMC and Value Proposition Canvas.',
    },
  ],
  actionItems: [
    'Write out your top five business model assumptions and rank them by risk — which ones, if wrong, would most threaten your business?',
    'Write a customer discovery interview script with 6-8 good questions, tested against the Mom Test principles',
    'Conduct at least 3 customer discovery interviews with people who represent your target segment',
    'Complete an Empathy Map based on your interview notes and update at least one block of your Business Model Canvas based on what you learned',
  ],
  realWorldActivity: {
    title: 'Conduct Discovery Interviews Over Tea',
    description:
      'In Kyrgyzstan, Kazakhstan, and Uzbekistan, the most natural setting for honest conversation is often over tea. Invite a potential customer or two for tea at your home or theirs — not as a business meeting, but as a genuine visit. Let the conversation be warm and unhurried. Arrive with your discovery questions in mind, but do not pull out a notebook or script. Listen. Only after the visit, write down everything you heard. Notice what they said, what they complained about, what lit up their faces, what they seemed to downplay. You will be surprised how much honest information emerges when the conversation feels like friendship rather than a survey.',
  },

  lessonSections: [
    {
      id: 'mom-test',
      heading: 'The Mom Test',
      content: [
        'Most entrepreneurs, when they finally work up the courage to talk to potential customers, end up with interviews that feel encouraging but teach them almost nothing. They ask "Would you buy this?" and the customer, not wanting to be unkind, says "Yes, I think so." They ask "Is this a good idea?" and the customer, seeing the entrepreneur\'s enthusiasm, says "Yes, definitely." They walk away feeling validated, but they have not learned a single fact. This is the problem Rob Fitzpatrick identified in his book The Mom Test: the way most people conduct customer interviews is fundamentally broken, because it produces polite agreement instead of honest information.',
        'The Mom Test gets its name from a simple observation: even your mother, who loves you and wants you to succeed, can give you useless feedback if you ask her the wrong questions. If you ask "Mom, do you think my business idea is good?" she will say yes. But if you ask "Mom, when you last ordered a cake for a celebration, what was the most stressful part of the whole experience?" she might tell you something real. The difference is not in the person you are asking — it is in the question itself. Good questions cannot be answered politely. They require the other person to think and respond from their actual experience.',
        'Fitzpatrick offers three rules for The Mom Test. First: talk about their life, not your idea. Your idea is irrelevant until you understand the customer\'s current reality. Ask about what they do today, how they solve the problem today, what frustrates them today. Never pitch in a discovery interview. The moment you say "I\'m building a bakery that delivers fresh cakes via Telegram," the customer\'s brain shifts from honest reporting to polite evaluation. You have lost access to their unfiltered experience. Second: ask about specifics in the past, not generalities or opinions about the future. "Would you use this?" is a worthless question — nobody knows what they would hypothetically do. "Tell me about the last time you ordered a cake for a celebration" is powerful because it accesses a real memory with real details.',
        'Third: listen more than you talk. Most people feel uncomfortable with silence in an interview and rush to fill it. When a customer finishes a sentence, pause. Count silently to five before you respond. Customers often reveal their most important insight in the second or third sentence after you stop talking. They are testing whether you are really listening. If you jump immediately to your next question, they conclude that you are going through a script, not genuinely curious. If you wait, they often continue — and what they say next is usually more honest than what came first.',
        'Beyond bad questions, there are three types of misleading data that Fitzpatrick calls the "three bad data types." The first is compliments. A customer who says "Oh, this is brilliant, I love it!" has given you nothing useful. Compliments feel like validation, but they contain no information about whether the customer actually has the problem you are solving, how severe it is, or whether they would pay to solve it. The second is fluff — generic, hypothetical statements about what the customer usually does or would do. "I always try to buy local" sounds informative but tells you nothing about this specific purchase decision. The third is ideas. Customers who trust you will often start generating ideas for your business: "You know what you should do? You should also offer gluten-free options." These feel like gifts, but they are distractions. Your job is not to collect feature requests — it is to understand the customer\'s world deeply enough to know what to build.',
        'A good discovery interview has a specific structure. You begin by getting context: what is the customer\'s current situation, and what are they currently doing to address the problem you care about? You explore their experience: tell me about the last time you did X. What happened? What did you try first? Where did it break down? You ask about impact: how did that affect you? What would it have meant if it had gone differently? And you probe for motivation: why did you decide to try that approach rather than another? Understanding the "why" is where the most valuable insights live.',
        'The single most powerful question in customer discovery is not a question — it is a follow-up: "Why?" When a customer says "The ordering process was frustrating," do not move to the next question. Ask: "Why was it frustrating? What specifically made it feel that way?" When they answer, ask "why" again. Three or four levels deep in the "why" chain, you often discover the real underlying concern — the one that drives behavior, not just the surface symptom that first presented itself. A customer who says "The delivery was unreliable" might reveal, after four "why" questions, that the real issue is that she felt embarrassed in front of her guests when the cake arrived late to her daughter\'s party. That emotional reality — public embarrassment — is the real pain, and it demands a very different response than "improving logistics."',
        'One final caution: the goal of customer discovery is not to confirm your existing idea. It is to discover the truth, whatever that turns out to be. Some of the most important discoveries entrepreneurs make is that the problem they assumed was urgent is actually minor, or that the customer they assumed was their primary segment is actually a poor fit, or that the product they were building solves the wrong problem entirely. These discoveries feel painful in the moment but are priceless — they save months or years of building something nobody wants. The entrepreneur who discovers early that their assumption was wrong is far better positioned than one who discovers it after investing all their savings.',
      ],
      callout: {
        type: 'warning',
        content:
          'Never ask: "Would you buy this?" "Do you like this idea?" "Do you think this would work?" These questions feel important but produce only politeness. Ask instead: "Tell me about the last time you dealt with this problem." "What did you try?" "Why did that not work?" "What did it cost you when it failed?"',
      },
      questionsToConsider: [
        'Think about your own business idea. What is the one question you most want to ask a potential customer? Now rewrite it according to the Mom Test rules.',
        'What do you expect customers to say in your interviews? What assumption are you most hoping to confirm?',
        'What would you do if your interviews showed that your core assumption was wrong?',
      ],
    },
    {
      id: 'designing-interview',
      heading: 'Designing Your Interview',
      content: [
        'A good customer discovery interview does not happen by accident. It is designed. Like any skilled practitioner — a doctor taking a patient history, a journalist conducting an investigation, a mediator building understanding between parties — the effective interviewer arrives with a clear intent, a flexible structure, and the discipline to stay in the listening role rather than the presenting role. Designing your interview before you conduct it is not about having a rigid script to read from. It is about being so prepared that you can be genuinely present and curious in the conversation itself.',
        'Begin with your assumptions. Before you design your questions, write down every significant assumption embedded in your business model. What do you assume about your customer\'s problem? What do you assume about how severe it is? What do you assume about how they currently solve it? What do you assume about what they would pay, how they would prefer to receive the product, what they would value most? Every assumption is a risk. The goal of customer discovery is to test the riskiest assumptions first — the ones where, if you are wrong, the entire business model collapses.',
        'A discovery interview script typically has five phases. The warm-up phase opens with permission and context — you are not selling anything, you are trying to learn. In Central Asian culture this phase is longer and more relational than in Western business settings: you might spend the first several minutes simply connecting as people before any questions begin. The exploration phase asks open questions about the customer\'s current situation and behavior: "Tell me about the last time you had to [solve this problem]. What happened?" The deep-dive phase follows the most interesting threads with "why" questions and specific follow-ups. The specifics phase probes for concrete data: "How often does this happen? How much does it cost you? What have you tried?" The wrap-up phase ends with gratitude and one crucial question: "Is there anything I should have asked that I didn\'t?"',
        'The number of interviews needed depends on what you are trying to learn. For early-stage customer discovery — testing whether your basic assumptions about the problem are correct — research consistently shows that 5-15 interviews within a specific customer segment is sufficient to identify the major patterns. Fewer than 5 and you may be reacting to individual variation rather than true patterns. More than 20 with the same segment, and you are likely hearing the same things repeated without new insight. The goal is not quantity but pattern recognition — the moment you stop hearing anything genuinely new, you have enough data for this phase of discovery.',
        'In practice, finding customers to interview can itself be an exercise in creativity. In Central Asian communities, the most natural approach is through existing relationships: neighbors, relatives, members of your local community, contacts of contacts. Warm introductions produce more honest conversations than cold outreach. Do not introduce yourself as an entrepreneur with a business to sell. Introduce yourself as someone who is learning about a specific problem and genuinely wants to understand how people experience it. This framing removes the social pressure of a sales encounter and enables the kind of honest, reflective conversation that produces real insight.',
        'Adapt the interview technique to the cultural context. In Kyrgyz, Kazakh, and Uzbek culture, direct questioning about problems or failures can feel rude or presumptuous — particularly when speaking with elders or people you do not know well. The most effective discovery conversations in Central Asian contexts often happen indirectly: embedded in the flow of normal conversation, structured around storytelling rather than question-and-answer, and built on the foundation of genuine hospitality and relationship. Bringing tea, listening patiently, asking about the person\'s work and family before approaching the business topic — these are not social niceties to be dispensed with quickly. They are the actual mechanism through which trust is built, and trust is the precondition for honest disclosure.',
        'Take notes during or immediately after the interview, not during. Writing during a conversation signals that you are conducting a survey, not having a conversation, and most people respond by giving shorter, more formal answers. Instead, hold the conversation naturally, then spend thirty minutes immediately afterward writing down everything you can remember: direct quotes, stories they told, emotions you observed, things they seemed to downplay or avoid. The goal of your notes is not a transcript but a record of the three or four most important things you learned — the surprises, the contradictions, the vivid details that will stick.',
        'After five interviews, look for patterns. What do the respondents have in common? What appears in every interview? What was said by multiple people in almost identical language — a sign that you are touching something real and widespread? What surprised you compared to your original assumptions? And equally important: what did multiple people specifically not mention, even though you expected them to? Silence around a topic you expected to be central is itself data — it may mean the problem is not as important to customers as you assumed, or that they have already adapted to it in ways you did not anticipate.',
      ],
      callout: {
        type: 'tip',
        content:
          'In Central Asian culture, the best discovery conversations happen over tea with no agenda visible. Come as a guest, not as a researcher. Ask about their work, their family, how things have been lately. Let the conversation find its way naturally to the topic you care about. You will learn more in one genuine conversation than in ten formal interviews.',
      },
      questionsToConsider: [
        'Who are the three specific people you will interview this week, and how will you get access to them?',
        'What is the assumption in your business model that you are most afraid to test? That is the one you should test first.',
        'How will you take notes in a way that does not interrupt the conversational flow?',
      ],
    },
    {
      id: 'empathy-map',
      heading: 'Synthesizing What You Learned: The Empathy Map',
      content: [
        'You have conducted your interviews. You have pages of notes, fragments of conversation, a few surprising quotes, and probably some confusion about how all of it connects. The challenge now is synthesis: moving from raw, messy, human data to structured insight that can drive decisions about your business model. The Empathy Map is one of the most effective tools available for this transition. Developed by the design firm XPLANE and popularized through design thinking curricula worldwide, the Empathy Map gives you a framework for organizing what you heard into patterns that reveal the real shape of your customer\'s experience.',
        'The Empathy Map has four quadrants, each capturing a different dimension of your customer\'s experience. "Says" captures direct quotes — the specific words and phrases customers used that struck you as significant, revealing, or repeated across multiple interviews. Direct quotes are important because they give you the actual language of your customer\'s world, which you can use in your own marketing to create immediate recognition. "Thinks" captures what you believe the customer is thinking but not saying out loud — the beliefs, concerns, or judgments that seemed to operate beneath the surface of what they expressed explicitly. This quadrant requires interpretation and inference, but it is often where the most important insights live.',
        '"Does" captures the customer\'s actual behaviors — what they do in response to the problem, how they currently solve it, what workarounds they have developed, what they have tried and abandoned. Behavior is often the most honest data because people do not always know why they do what they do, but they always know what they do. A customer who says they value quality but consistently buys the cheapest option is telling you something important through their behavior that their words obscure. The "Does" quadrant is where you record what customers actually do, not what they say they do or intend to do. "Feels" captures the emotional undercurrent — the anxieties, frustrations, excitements, and satisfactions that animated the conversations. Note both what customers seemed to feel and what they explicitly said about how situations made them feel.',
        'Building your Empathy Map works best as a physical exercise. Get a large sheet of paper or whiteboard and draw the four quadrants. Then go through your interview notes and write each piece of data on a separate sticky note, placing it in the appropriate quadrant. You will quickly notice some quadrants filling up while others remain sparse — that sparseness tells you something about where your interviews went deep and where they stayed superficial. You may also notice that what customers "say" and what they "think" are sometimes in tension, or that what they "do" contradicts what they "feel." These tensions are not problems to resolve; they are the most interesting and revealing data points you have.',
        'Once your Empathy Map is complete, the next step is to use it to update your business documents. Return to your Business Model Canvas from Week 4. Look at each block and ask: what did I learn in my interviews that confirms, challenges, or changes what I wrote here? Perhaps your Customer Segments block needs to be redefined — your interviews revealed that the customers you thought were your target segment are actually poor fits, and a different group you interviewed incidentally turned out to be far more interested and motivated. Perhaps your Channels block needs to change — interviews revealed that your planned channel is one customers rarely use, while a channel you had not considered is central to how they discover and buy products in your category.',
        'Your Value Proposition Canvas from Week 5 should also be revisited in light of the interviews. Did the pains you listed match what customers actually complained about? Were the gains you planned to create the ones customers actually cared about? In some cases, customer discovery confirms your assumptions strongly — and that confirmation is valuable, because it gives you evidence-based confidence rather than hope-based confidence. In other cases, discovery overturns your assumptions completely. Both outcomes are wins. The only bad outcome is conducting interviews so poorly designed that they produce neither confirmation nor correction.',
        'There is an important emotional dimension to this process that deserves acknowledgment. Having your assumptions challenged by customer discovery can feel deeply discouraging, especially if you have invested significant hope and identity in your business idea. Many entrepreneurs react to disconfirming feedback with defensiveness or rationalization: "That person didn\'t really understand what I was offering," or "They were just one customer, I shouldn\'t change my whole plan based on that." These reactions are natural but dangerous. The point of customer discovery is precisely to find out where your assumptions are wrong before you invest money, not after. Being wrong in your assumptions — and discovering it early — is the most valuable outcome the process can produce.',
        'End this week with a specific, written commitment: based on your interviews and your updated Empathy Map, name one concrete change you will make to your Business Model Canvas or your Value Proposition Canvas. It does not have to be large. It could be as simple as removing a customer segment you thought was important, or adding a channel you had not considered, or revising the language of your value proposition to match the words your customers actually used when describing the problem. The practice of making evidence-based updates to your business model — small, specific, traceable to actual customer feedback — is the discipline that separates entrepreneurs who build what the market needs from those who build what they assumed the market needed.',
      ],
      callout: {
        type: 'example',
        content:
          'After interviewing five potential customers, an entrepreneur building a food delivery service fills in her Empathy Map. Under "Says" she writes: "I don\'t trust delivery — food is always cold." Under "Thinks" she writes: "Probably assumes I\'ll just order and be disappointed again." Under "Does": "Currently picks up food herself even when tired." Under "Feels": "Frustrated, resigned, doesn\'t believe delivery can be different." Her entire product strategy shifts: the most important thing she must prove is not speed but temperature guarantee and reliability — before anything else.',
      },
      questionsToConsider: [
        'After building your Empathy Map, what is the single most important thing you learned that you did not know before?',
        'Which block of your Business Model Canvas most needs to be updated based on your customer discovery findings?',
        'What assumption did your interviews confirm? What assumption did they challenge?',
      ],
      deeperPerspective: {
        title: 'The Courage to Hear Hard Things',
        content: [
          'There is a particular kind of courage required in customer discovery that is different from the courage of starting a business. The courage to start is about action — moving forward despite uncertainty. The courage required in customer discovery is almost the opposite: it is the courage to stop, listen, and allow what you hear to change your direction.',
          'In many cultures, including many Central Asian business contexts, changing your mind can be seen as weakness or inconsistency. The person who sets a course and stays on it is admired as resolute. But in the world of early-stage business, the entrepreneur who updates their assumptions based on evidence is not weak — they are wise. They are doing what scientists do: forming hypotheses, testing them, and revising based on results. The ones who never revise are not resolute; they are simply unwilling to learn.',
          'There is also a humility in good customer discovery that is deeply relational. When you sit across from another person and say, in essence, "I want to understand your world better than I currently do" — you are making yourself a student. You are acknowledging that this person knows something you do not. That posture of genuine curiosity and honest humility is not just a business technique. It is the foundation of any relationship built on real understanding rather than projection.',
        ],
        insightStory:
          'There is an ancient principle: the person who answers before listening -- that is their folly. The best entrepreneurs are the ones who listen twice as long as they speak.',
        questions: [
          'What would it mean for you personally to discover that your core business assumption was wrong? How would you respond?',
          'Is there someone in your life who will tell you the truth about your business idea, even when it is uncomfortable? Who is it, and have you asked them?',
        ],
      },
    },
  ],

  story: {
    title: "The Telegram Revelation",
    paragraphs: [
      'Aijan had a plan. She had a Business Model Canvas. She had a Value Proposition Canvas. She had even, tentatively, told her sister-in-law that she was going to start a cake business in the spring. She felt ready to begin. Then her facilitator assigned the customer discovery interviews.',
      'She was nervous. Approaching strangers and asking about their problems felt presumptuous and strange. Her facilitator reminded her: do not ask about your idea. Ask about their life. She decided to start with women she already knew — neighbors and acquaintances who had hosted celebrations in the past year. She invited three of them for tea on a Tuesday morning.',
      'She had prepared good questions. She did not show them her business plan. She simply asked: "Tell me about the last celebration you organized. What was the most stressful part?" By the end of the first conversation, she had filled three pages of notes.',
      'The discoveries came quickly. Every woman she spoke to mentioned ordering: not the cake itself, but the process of ordering it. One woman had tried to order through Instagram DMs and never received a response until two days before the party. Another had ordered by phone and then could not reach the baker to confirm details. A third said she had given up and bought a supermarket cake after being unable to confirm her order was accepted. None of them said they wanted more elaborate designs. All three mentioned wanting to order at least three days in advance — not the morning of the event. And every single one mentioned Telegram as the communication tool they most trusted and used most often.',
      'Aijan went home and looked at her Business Model Canvas. Under Channels she had written: "Instagram and word of mouth." Under Customer Relationships she had written: "Personal, one-on-one." She had not mentioned Telegram once. Her Revenue Streams block mentioned "per-cake pricing" — but none of her interviews had touched on price at all. The customers\' burning issue was reliability and ease of ordering, not price.',
      'She rewrote her Channels block: Telegram group for orders, with 2-hour confirmation policy. She updated her Key Activities block to include: "Manage order queue and confirmations daily." She added a new Key Partner: a customer who would help her run the Telegram group in exchange for a discount. The canvas that had felt complete two weeks ago looked different now — not worse, but more honest. It was built on something her original canvas had lacked entirely: facts about real people.',
      'When she presented her updated canvas at the Four Hats Checkpoint, she told the group: "I thought I was building a cake business. I was actually building a trust-and-reliability business that sells cakes. The cake is almost secondary." Her facilitator nodded. "That," he said, "is what customer discovery is for."',
    ],
  },

  storyCentralAsia: {
    title: "The Telegram Revelation",
    paragraphs: [
      "Aijan had twelve customers on her WhatsApp list and had never sat down with any of them for a real conversation about the business. She knew their orders. She knew their building floors. She knew that Nurlan always added 'if possible' to his requests and that Ainura from the accounting firm ordered light on Wednesdays. But she had never asked any of them to tell her, in their own words, what the experience of ordering from her was actually like.",
      "Her facilitator told her not to call it a business meeting and not to pull out a notebook. She invited three customers to tea on a Tuesday afternoon, in the same small conference room the office manager had made available. She brought her own tea and a plate of kak — the sweet pressed sugar her mother shipped from Tokmok — and she let the conversation find its own way.",
      "She had prepared questions. She did not ask a single one in the order she had written them. Instead she asked only: 'When you order lunch from me, what part of the whole experience — from the moment you decide to order to the moment you finish eating — causes you the most trouble?' Then she sat still.",
      "What came back was not what she had expected. Every person at the table mentioned ordering — not the food, not the delivery, not the price. The process of ordering. One woman said she had missed two orders that week because she kept forgetting to send a WhatsApp message by ten in the morning during her meeting. Another said she often did not know what was available until Aijan's morning message arrived, and by then she had already bought something from the cafeteria downstairs out of uncertainty. Nurlan said he found the WhatsApp conversation slightly awkward because it felt like texting a friend rather than placing an order through a service — he was never sure how formal to be.",
      "Aijan had five pages of notes by the time the tea was gone. She added two more interviews the following day — a woman who had stopped ordering after two weeks without telling Aijan why, and a man who ordered every day without fail. The woman who had stopped said the ordering process had felt unreliable: she once sent a message and received no reply for two hours, and by then she had already eaten. The man who ordered every day said he used Telegram for everything and would immediately order from a Telegram channel if Aijan had one.",
      "Telegram. The word appeared in four out of five conversations. Every person she spoke to used Telegram more than WhatsApp for anything business-related. She used WhatsApp because it was what she personally used for family communication. She had assumed her customers were the same. They were not.",
      "She went home and created a Telegram channel called 'Aijan's Kitchen.' She set up automatic morning posts for the day's menu at 7:30 a.m. She added an order pinned message with instructions: send a message by 9:30 the evening before or by 9:00 the morning of. She set the order confirmation to automatic: every message received an instant reply confirming receipt.",
      "Within one week, three of her twelve customers had switched to Telegram without being asked. By the end of the second week she had seventeen subscribers on the channel — four of them were people she had never met who had seen the channel shared in a neighborhood Telegram group. She had not paid for a single advertisement.",
      "At the Four Hats Checkpoint she told the group what she had learned: she had built her ordering system around her own habits, not her customers'. The discovery interviews had not improved her food. They had changed every channel she used to communicate with the people who ate it.",
    ],
  },

  worksheetDef: {
    id: 'business-6',
    title: 'Customer Discovery Kit',
    description:
      'Use this worksheet to plan your customer discovery interviews, record what you learn, synthesize findings into an Empathy Map, and track the specific updates you will make to your business model based on evidence.',
    sections: [
      {
        title: 'Interview Planning',
        description: 'Before you talk to anyone, get clear on what you need to learn.',
        fields: [
          {
            id: 'disc-top-assumptions',
            label: 'Your top 3 riskiest assumptions',
            type: 'textarea',
            placeholder: 'List the 3 assumptions in your business model that, if wrong, would most hurt your business',
            helpText:
              'These are the assumptions you most need to test. Rank them by risk — which one being wrong would be most damaging?',
          },
          {
            id: 'disc-customer-profile',
            label: 'Who you will interview',
            type: 'textarea',
            placeholder: 'Describe the type of person who represents your target customer segment',
            helpText:
              'Be specific. What situation are they in? What experience do they need to have had to give you useful information?',
          },
          {
            id: 'disc-interview-count',
            label: 'Number of interviews planned',
            type: 'number',
            placeholder: '5',
            helpText: 'Plan for at least 5 interviews within the same customer segment before drawing conclusions.',
          },
        ],
      },
      {
        title: 'Interview Script',
        description: 'Write your discovery questions — tested against the Mom Test rules.',
        fields: [
          {
            id: 'script-opener',
            label: 'Opening (permission and context)',
            type: 'textarea',
            placeholder: 'How you will introduce yourself and the purpose of the conversation',
            helpText:
              'Do NOT mention your business idea. Frame this as learning about their experience. "I\'m trying to understand how people in our community handle [problem area]."',
          },
          {
            id: 'script-q1',
            label: 'Question 1 — recent experience',
            type: 'textarea',
            placeholder: 'Tell me about the last time you had to [deal with this problem]...',
            helpText:
              'Ask about a specific past experience. Never ask hypothetical questions about what they "would" do.',
          },
          {
            id: 'script-q2',
            label: 'Question 2 — current solution',
            type: 'textarea',
            placeholder: 'What do you do today when [this situation] comes up?',
            helpText: 'Understand their current behavior and workarounds before you think about your solution.',
          },
          {
            id: 'script-q3',
            label: 'Question 3 — frustrations',
            type: 'textarea',
            placeholder: 'What\'s most frustrating about the way you currently handle it?',
            helpText:
              'Open-ended questions about frustration often yield the most useful pain data. Listen for severity and frequency.',
          },
          {
            id: 'script-q4',
            label: 'Question 4 — previous attempts',
            type: 'textarea',
            placeholder: 'Have you tried other ways to solve this? What happened?',
            helpText:
              'Understanding what they have already tried (and why it failed) reveals the true nature of the problem.',
          },
          {
            id: 'script-q5',
            label: 'Question 5 — impact',
            type: 'textarea',
            placeholder: 'How did that affect you? What happened because of it?',
            helpText:
              'Understanding the consequences of the problem reveals how severe and important it actually is.',
          },
          {
            id: 'script-followup',
            label: 'Your "why" chain follow-up',
            type: 'textarea',
            placeholder: 'When they give an interesting answer, how will you go deeper?',
            helpText:
              'Write a reminder to ask "why?" at least 3 times after any interesting answer. Each "why" typically goes one level deeper toward the real motivation.',
          },
          {
            id: 'script-closer',
            label: 'Closing question',
            type: 'textarea',
            placeholder: 'Is there anything important about this topic that I didn\'t ask about?',
            helpText:
              'Always end with an open invitation for anything you missed. Customers often share the most important thing at the very end.',
          },
        ],
      },
      {
        title: 'Interview Notes',
        description: 'Record your findings after each interview — do this within 30 minutes of finishing.',
        fields: [
          {
            id: 'notes-interview1',
            label: 'Interview 1 — key findings',
            type: 'textarea',
            placeholder: 'Who was this person (type, not name)? What were the 3 most important things you heard?',
            helpText: 'Note direct quotes when possible. Focus on surprises and things you did not expect.',
          },
          {
            id: 'notes-interview2',
            label: 'Interview 2 — key findings',
            type: 'textarea',
            placeholder: 'Who was this person? What were the 3 most important things you heard?',
            helpText: 'Note anything that confirmed or contradicted what you heard in interview 1.',
          },
          {
            id: 'notes-interview3',
            label: 'Interview 3 — key findings',
            type: 'textarea',
            placeholder: 'Who was this person? What were the 3 most important things you heard?',
            helpText: 'Note patterns — things appearing for the third time are almost certainly real.',
          },
          {
            id: 'notes-patterns',
            label: 'Patterns across all interviews',
            type: 'textarea',
            placeholder: 'What did multiple customers say in almost identical terms? What surprised you most?',
            helpText:
              'Patterns that repeat across multiple interviews are strong signals. List them explicitly.',
          },
        ],
      },
      {
        title: 'Empathy Map',
        description:
          'Synthesize your interviews into four quadrants representing your customer\'s complete experience.',
        fields: [
          {
            id: 'empathy-says',
            label: 'SAYS — direct quotes and explicit statements',
            type: 'textarea',
            placeholder: 'Write the exact words and phrases customers used repeatedly or that struck you as significant',
            helpText:
              'Use the customer\'s actual language. These quotes may become the language of your marketing later.',
          },
          {
            id: 'empathy-thinks',
            label: 'THINKS — what they believe but do not say out loud',
            type: 'textarea',
            placeholder: 'What concerns, judgments, or beliefs seemed to operate beneath the surface of what they said?',
            helpText:
              'This quadrant requires interpretation. What did their tone, hesitation, or emphasis suggest they were thinking but not saying?',
          },
          {
            id: 'empathy-does',
            label: 'DOES — their actual behaviors and workarounds',
            type: 'textarea',
            placeholder: 'What do they actually do today to deal with this problem? What have they tried?',
            helpText:
              'Behavior is often the most honest data. What people do frequently reveals more than what they say they value.',
          },
          {
            id: 'empathy-feels',
            label: 'FEELS — emotional undercurrents',
            type: 'textarea',
            placeholder: 'What emotions animated the conversations? What frustrated them? What excited them?',
            helpText:
              'Note both the emotions they named explicitly and the ones you observed in their voice, face, or energy during the conversation.',
          },
        ],
      },
      {
        title: 'Business Model Update Log',
        description: 'Based on your interviews and Empathy Map, document the specific changes you are making to your business model.',
        fields: [
          {
            id: 'update-confirmed',
            label: 'Assumptions confirmed by your interviews',
            type: 'textarea',
            placeholder: 'List the assumptions your interviews supported — and note what evidence supports them',
            helpText:
              'Confirmed assumptions give you evidence-based confidence rather than hope-based confidence.',
          },
          {
            id: 'update-challenged',
            label: 'Assumptions challenged or overturned',
            type: 'textarea',
            placeholder: 'List the assumptions your interviews challenged — and describe what you learned instead',
            helpText:
              'These are your most valuable discoveries. Be honest and specific about what needs to change.',
          },
          {
            id: 'update-bmc-changes',
            label: 'Changes to your Business Model Canvas',
            type: 'textarea',
            placeholder: 'Which blocks are changing, and how? e.g., "Channels: removing Instagram, adding Telegram"',
            helpText:
              'Name the specific block and the specific change. Vague intentions are not enough — write the new content.',
          },
          {
            id: 'update-vpc-changes',
            label: 'Changes to your Value Proposition Canvas',
            type: 'textarea',
            placeholder: 'Which pains, gains, or jobs are you revising based on what you heard?',
            helpText:
              'Were the pains you listed in Week 5 the real pains? Did interviews reveal gains you had not anticipated?',
          },
          {
            id: 'update-next-questions',
            label: 'Questions your interviews raised that need further investigation',
            type: 'textarea',
            placeholder: 'What do you still not know? What new questions emerged from what you heard?',
            helpText:
              'Good discovery does not just answer questions — it surfaces new ones. List the things you still need to learn.',
          },
        ],
      },
    ],
  },

  reflectionQuestions: [
    {
      question: 'What is the most important thing you learned from your customer discovery interviews that changed your business model?',
      prompt:
        'Be specific. Name the assumption that was challenged and describe the concrete change you made as a result. If nothing changed, ask yourself honestly whether you conducted the interviews in a way that allowed you to hear hard truths.',
    },
    {
      question: 'Which block of your Business Model Canvas is still built entirely on assumption rather than evidence?',
      prompt:
        'After interviews and Empathy Mapping, look at each block and rate it: is this block based on (a) confirmed evidence from real customers, (b) educated guess based on community knowledge, or (c) pure assumption? What would you need to do to move your weakest block from (c) to (a)?',
    },
    {
      question: 'How did the cultural context of your interviews affect what you were able to learn?',
      prompt:
        'Did customers open up easily or were they guarded? Did the relationship-building required in your cultural context give you access to more honest information, or did it make certain topics harder to address directly? What would you do differently in your next round of interviews?',
    },
  ],

  fourHatsCheckpoint: {
    checkpointNumber: 2,
    pitchPrompt:
      'Present your complete Business Model Canvas — all nine blocks — and explain how the customer discovery work of Weeks 5 and 6 has shaped it. Show us which blocks you updated based on evidence and which blocks still rest on assumptions.',
    evaluationPrompt:
      'Do the nine blocks of this Business Model Canvas hold together as a coherent system? Where is the model strongest — where does the evidence most clearly support the choices? Where is it weakest — where do the biggest gaps, contradictions, or untested assumptions remain?',
    whiteHatPrompt:
      'What specific data from your customer discovery interviews supports each block of your Business Model Canvas? Which blocks are backed by direct customer quotes or observed behavior? Which blocks are still assumptions? How many interviews did you conduct and what pattern of evidence emerged?',
    blackHatPrompt:
      'Which blocks of this model are most vulnerable? Where does the entrepreneur have the least evidence and the most hope? What assumptions remain completely untested? What is the single biggest risk in this model — the thing that, if wrong, would collapse the whole system?',
    yellowHatPrompt:
      'What is the strongest part of this business model? Where does the entrepreneur have the clearest customer insight, the most compelling value proposition, or the most realistic operational plan? What specific evidence gives you confidence that this model could actually work?',
    goldHatPrompt:
      'Challenge yourself to think entirely differently: what is one completely different business model that could solve the same customer problem identified in the discovery interviews? Could the same problem be solved through a subscription rather than per-unit sales? Through a community platform rather than a direct service? Through a partnership model rather than a standalone business? What does exploring an alternative model reveal about the assumptions embedded in the current one?',
  },
};
