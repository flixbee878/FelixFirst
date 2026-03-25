export const WORD_TIERS = {
  easy: [
    'cat', 'dog', 'run', 'fix', 'the', 'and', 'for', 'has', 'get', 'not',
    'big', 'top', 'bat', 'cup', 'fog', 'hit', 'jet', 'kit', 'log', 'map',
    'net', 'pop', 'rag', 'sat', 'tap', 'van', 'win', 'yes', 'zip', 'box',
  ],
  medium: [
    'brave', 'light', 'storm', 'power', 'flame', 'quick', 'blast', 'crash',
    'drive', 'eagle', 'flash', 'ghost', 'hyper', 'image', 'joker', 'knife',
    'laser', 'magic', 'ninja', 'ocean', 'pizza', 'quest', 'robot', 'sword',
    'tiger', 'ultra', 'valor', 'wrath', 'xenon', 'youth',
  ],
  hard: [
    'quantum', 'eclipse', 'fracture', 'voltage', 'phantom', 'blazing',
    'crystal', 'digital', 'execute', 'futurex', 'gateway', 'hybrids',
    'impulse', 'jupiter', 'kinetic', 'landing', 'maximum', 'network',
    'optimal', 'protect', 'reactor', 'servers', 'tracker', 'upgrade',
    'victory', 'warrior', 'xternal', 'zealous', 'awesome', 'badgers',
  ],
};

export const ROBOT_TAUNTS = [
  'BEEP BOOP! You type slow!',
  'INITIATING VICTORY SEQUENCE!',
  'YOUR KEYBOARD IS WEAK!',
  'CALCULATING YOUR DEFEAT!',
  'ERROR: HUMAN SKILL NOT FOUND!',
  'RESISTANCE IS FUTILE!',
  'PROCESSING... YOUR DOOM!',
  'SYSTEM OVERRIDE IN PROGRESS!',
];

export const getWordsForRank = (rank: number): string[] => {
  if (rank <= 2) return WORD_TIERS.easy;
  if (rank <= 4) return [...WORD_TIERS.easy, ...WORD_TIERS.medium];
  return [...WORD_TIERS.medium, ...WORD_TIERS.hard];
};

export const getRandomWord = (rank: number): string => {
  const words = getWordsForRank(rank);
  return words[Math.floor(Math.random() * words.length)];
};

export const getRandomTaunt = (): string =>
  ROBOT_TAUNTS[Math.floor(Math.random() * ROBOT_TAUNTS.length)];
