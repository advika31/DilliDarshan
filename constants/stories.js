export const STORY_MODES = [
  {
    id: 'quick',
    title: '30-sec Quick Story',
    duration: '30 seconds',
    pointsRequired: 20,
    unlocked: false,
  },
  {
    id: 'immersive',
    title: '2-min Immersive Story',
    duration: '2 minutes',
    pointsRequired: 50,
    unlocked: false,
  },
  {
    id: 'kid-friendly',
    title: 'Kid-friendly Story',
    duration: '1 minute',
    pointsRequired: 30,
    unlocked: false,
  },
  {
    id: 'elder-friendly',
    title: 'Elder-friendly Story',
    duration: '1.5 minutes',
    pointsRequired: 30,
    unlocked: false,
  },
];

export const MOCK_STORIES = {
  '1': {
    quick: 'India Gate stands as a memorial to 70,000 Indian soldiers who died in World War I. Every evening, the Amar Jawan Jyoti burns in their honor.',
    immersive: 'As you stand before India Gate, imagine the year 1931. This 42-meter archway was designed by Sir Edwin Lutyens to honor the brave soldiers who never returned home. The eternal flame, Amar Jawan Jyoti, was added in 1971. Families from across India visit here, sharing stories of their ancestors. The surrounding lawns, once exclusive, now welcome everyone—a true symbol of democratic India.',
    'kid-friendly': 'India Gate is like a giant door that remembers heroes! Long ago, brave soldiers protected our country. Now, a special flame burns day and night to say "thank you" to them. Many families come here to have fun and remember these heroes.',
    'elder-friendly': 'India Gate is a peaceful memorial honoring our nation\'s heroes. The structure is easily accessible, with wide pathways. The eternal flame represents our gratitude. It\'s a serene place for reflection, especially in the early morning hours.',
  },
  '2': {
    quick: 'Qutub Minar, built in 1193, is the world\'s tallest brick minaret at 73 meters. It represents the beginning of Muslim rule in Delhi.',
    immersive: 'Step back to 1193 AD. Qutub-ud-din Aibak began this tower to celebrate his victory. Each of the five stories tells a different chapter—some built by him, others by his successors. The intricate carvings mix Arabic calligraphy with Indian motifs. Notice the iron pillar that hasn\'t rusted in 1600 years—a metallurgical marvel that still puzzles scientists today.',
    'kid-friendly': 'Qutub Minar is like a super tall tower! It was built a very long time ago—almost 800 years! There\'s a magic iron pillar that never gets rusty. Can you count the five floors?',
    'elder-friendly': 'Qutub Minar stands as a testament to Delhi\'s rich history. Built in stages over centuries, it showcases remarkable architecture. The site is well-maintained with seating areas and shade, making it comfortable for extended visits.',
  },
};
