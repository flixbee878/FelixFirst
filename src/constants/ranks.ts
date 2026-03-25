export const RANK_NAMES = [
  'Rookie Typist',
  'Key Cadet',
  'Word Warrior',
  'Type Knight',
  'Keyboard Champion',
  'Grand Master',
  'Cyber Legend',
];

export const WINS_PER_RANK = 4;

export const RANK_COLORS = [
  '#95a5a6',
  '#3498db',
  '#2ecc71',
  '#e67e22',
  '#9b59b6',
  '#e74c3c',
  '#FFE234',
];

export const getRankName = (rank: number): string =>
  RANK_NAMES[Math.min(rank - 1, RANK_NAMES.length - 1)] || 'Type God';

export const getRankColor = (rank: number): string =>
  RANK_COLORS[Math.min(rank - 1, RANK_COLORS.length - 1)] || '#FFD700';
