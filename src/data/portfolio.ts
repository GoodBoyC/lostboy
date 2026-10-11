export const profile = {
  name: 'Lost Boy',
  xUrl: 'https://x.com/yrnlost?s=11',
  telegramUrl: 'https://t.me/Lostboyonchain',
  // Add your own portrait at public/images/avatar.jpg to replace the star.
  avatar: '/images/avatar.jpg',
  description:
    'I help KOLs and Web3 projects grow their communities, onboard active users, and build visibility.',
  // Add the owner's verified contact address to enable the email handoff.
  email: '',
};

export const services = [
  {
    id: 'kol-growth',
    number: '01',
    title: 'KOL growth & positioning',
    shortTitle: 'KOL growth',
    note: 'BECOME A VOICE THAT MATTERS',
    description:
      'Build a presence people recognize and a point of view they come back for. Turn your influence into an engaged audience, not just a bigger follower count.',
    deliverables: [
      'Audience & positioning strategy',
      'Content direction & visibility',
      'Partnership & collaboration outreach',
    ],
    cta: 'Grow your influence',
  },
  {
    id: 'community-acquisition',
    number: '02',
    title: 'Community acquisition',
    shortTitle: 'Community acquisition',
    note: 'BRING THE RIGHT PEOPLE IN',
    description:
      'Find the people who connect with what you are building. Create a clear path from first impression to active participation, with community at the center.',
    deliverables: [
      'Audience research & acquisition planning',
      'Community onboarding & activation',
      'Engagement campaigns & feedback loops',
    ],
    cta: 'Build your community',
  },
  {
    id: 'memecoin-marketing',
    number: '03',
    title: 'Memecoin marketing',
    shortTitle: 'Memecoin marketing',
    note: 'CULTURE FIRST. MOMENTUM NEXT.',
    description:
      'Give your project a narrative worth sharing. Connect internet culture, creator outreach, and coordinated promotion to build genuine visibility around your launch.',
    deliverables: [
      'Narrative & launch positioning',
      'KOL outreach & campaign coordination',
      'Culture-led content & promotion',
    ],
    cta: 'Plan your next launch',
  },
];

// Figures transcribed from the metric reference supplied with the portfolio request.
export const impactStats = [
  { id: 'community', label: 'Community\nmembers\nonboarded', value: '500K' },
  { id: 'impressions', label: 'Impressions\ndriven', value: '12M' },
  { id: 'kol', label: 'KOL\nrelationships', value: '350' },
  { id: 'campaigns', label: 'Campaigns\nshipped', value: '100' },
];

export const proofScreenshots = Array.from({ length: 6 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    id: `proof-${number}`,
    label: number,
    src: `/images/proof-of-work/${number}.png`,
  };
});

export const processSteps = [
  {
    id: 'discover',
    number: '01',
    name: 'Find the signal',
    label: 'LISTEN FIRST. GET SPECIFIC.',
    title: 'The right questions.\nA clearer direction.',
    description:
      'Before making noise, understand the people, the project, and the opportunity. We get aligned on where you are, who you want to reach, and what meaningful growth looks like.',
    outputs: ['Audience & channel review', 'Positioning & opportunity map', 'A focused growth plan'],
    takeaway: 'A shared direction, not a one-size-fits-all strategy.',
  },
  {
    id: 'activate',
    number: '02',
    name: 'Make the move',
    label: 'PUT THE PLAN INTO MOTION.',
    title: 'Ideas become action.\nAttention becomes interest.',
    description:
      'Bring the strategy to life with the right content, creators, and community touchpoints. Every campaign connects the story to a clear next step for the audience.',
    outputs: ['Campaign & content rollout', 'Aligned creator outreach', 'Community onboarding journey'],
    takeaway: 'Coordinated execution with a reason behind every move.',
  },
  {
    id: 'compound',
    number: '03',
    name: 'Keep it growing',
    label: 'LEARN. ADAPT. GO AGAIN.',
    title: 'Beyond the first spike.\nInto lasting momentum.',
    description:
      'Look at what people actually do, not just what the numbers seem to say. Keep the conversations going, learn from the response, and put more energy into what works.',
    outputs: ['Engagement & activation review', 'Community feedback loops', 'Next-step recommendations'],
    takeaway: 'A repeatable growth rhythm, not a one-off moment.',
  },
];