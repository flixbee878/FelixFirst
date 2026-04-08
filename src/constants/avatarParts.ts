import type { AvatarCategory } from '../types/avatar';

export const SKIN_TONES: Record<string, string> = {
  light: '#FFDAB9',
  tan: '#F4A460',
  medium: '#CD853F',
  dark: '#8B4513',
  deep: '#4a2c0a',
};

export const HAIR_COLORS: Array<{ id: string; name: string; hex: string; tokenCost: number }> = [
  { id: '#4a2c0a', name: 'Dark Brown', hex: '#4a2c0a', tokenCost: 0 },
  { id: '#1a1a1a', name: 'Black',      hex: '#1a1a1a', tokenCost: 0 },
  { id: '#c8a45a', name: 'Blonde',     hex: '#c8a45a', tokenCost: 0 },
  { id: '#8B2500', name: 'Auburn',     hex: '#8B2500', tokenCost: 0 },
  { id: '#a0522d', name: 'Brown',      hex: '#a0522d', tokenCost: 0 },
  { id: '#FF69B4', name: 'Pink',       hex: '#FF69B4', tokenCost: 100 },
  { id: '#4169E1', name: 'Blue',       hex: '#4169E1', tokenCost: 100 },
  { id: '#9B59B6', name: 'Purple',     hex: '#9B59B6', tokenCost: 100 },
  { id: '#FF4500', name: 'Flame Red',  hex: '#FF4500', tokenCost: 200 },
  { id: '#00CED1', name: 'Teal',       hex: '#00CED1', tokenCost: 200 },
  { id: '#FFD700', name: 'Gold',       hex: '#FFD700', tokenCost: 350 },
  { id: '#f0f0f0', name: 'White',      hex: '#f0f0f0', tokenCost: 350 },
];

export const EYE_COLORS: Array<{ id: string; name: string; hex: string; tokenCost: number }> = [
  { id: '#3b82f6', name: 'Blue',   hex: '#3b82f6', tokenCost: 0 },
  { id: '#22c55e', name: 'Green',  hex: '#22c55e', tokenCost: 0 },
  { id: '#8B4513', name: 'Brown',  hex: '#8B4513', tokenCost: 0 },
  { id: '#6b7280', name: 'Grey',   hex: '#6b7280', tokenCost: 0 },
  { id: '#9B59B6', name: 'Purple', hex: '#9B59B6', tokenCost: 150 },
  { id: '#FF69B4', name: 'Pink',   hex: '#FF69B4', tokenCost: 150 },
  { id: '#FF4500', name: 'Red',    hex: '#FF4500', tokenCost: 300 },
  { id: '#FFD700', name: 'Gold',   hex: '#FFD700', tokenCost: 400 },
];

export const AVATAR_CATEGORIES: AvatarCategory[] = [
  {
    key: 'skinTone',
    label: 'Skin',
    icon: '✋',
    options: [
      { id: 'light',  name: 'Light',  tokenCost: 0 },
      { id: 'tan',    name: 'Tan',    tokenCost: 0 },
      { id: 'medium', name: 'Medium', tokenCost: 0 },
      { id: 'dark',   name: 'Dark',   tokenCost: 0 },
      { id: 'deep',   name: 'Deep',   tokenCost: 0 },
    ],
  },
  {
    key: 'hairStyle',
    label: 'Hair',
    icon: '💇',
    options: [
      { id: 'short',          name: 'Short',       tokenCost: 0 },
      { id: 'medium-straight',name: 'Medium',      tokenCost: 0 },
      { id: 'spiky',          name: 'Spiky',        tokenCost: 0 },
      { id: 'long',           name: 'Long',         tokenCost: 0 },
      { id: 'ponytail',       name: 'Ponytail',     tokenCost: 80 },
      { id: 'curly',          name: 'Curly',        tokenCost: 150 },
      { id: 'bun',            name: 'Bun',          tokenCost: 200 },
      { id: 'twin-tails',     name: 'Twin Tails',   tokenCost: 250 },
      { id: 'mohawk',         name: 'Mohawk',       tokenCost: 300 },
      { id: 'space-buns',     name: 'Space Buns',   tokenCost: 350 },
      { id: 'dreadlocks',     name: 'Dreadlocks',   tokenCost: 400 },
      { id: 'anime-wild',     name: 'Anime Wild',   tokenCost: 500 },
    ],
  },
  {
    key: 'eyeStyle',
    label: 'Eyes',
    icon: '👀',
    options: [
      { id: 'anime',  name: 'Anime',  tokenCost: 0 },
      { id: 'round',  name: 'Round',  tokenCost: 0 },
      { id: 'cool',   name: 'Cool',   tokenCost: 0 },
      { id: 'happy',  name: 'Happy',  tokenCost: 100 },
      { id: 'star',   name: 'Star',   tokenCost: 250 },
      { id: 'heart',  name: 'Heart',  tokenCost: 400 },
    ],
  },
  {
    key: 'shirt',
    label: 'Shirt',
    icon: '👕',
    options: [
      { id: 'tee-blue',     name: 'Blue Tee',       tokenCost: 0 },
      { id: 'tee-red',      name: 'Red Tee',         tokenCost: 0 },
      { id: 'tee-green',    name: 'Green Tee',       tokenCost: 0 },
      { id: 'tee-yellow',   name: 'Yellow Tee',      tokenCost: 0 },
      { id: 'tee-purple',   name: 'Purple Tee',      tokenCost: 0 },
      { id: 'tank-pink',    name: 'Pink Tank',       tokenCost: 80 },
      { id: 'striped',      name: 'Striped Shirt',   tokenCost: 150 },
      { id: 'hoodie-grey',  name: 'Grey Hoodie',     tokenCost: 200 },
      { id: 'hoodie-black', name: 'Black Hoodie',    tokenCost: 200 },
      { id: 'jacket-denim', name: 'Denim Jacket',    tokenCost: 300 },
      { id: 'jacket-orange',name: 'Orange Jacket',   tokenCost: 300 },
      { id: 'varsity',      name: 'Varsity Jacket',  tokenCost: 450 },
      { id: 'ninja-black',  name: 'Ninja Top',       tokenCost: 550 },
      { id: 'knight-tunic', name: 'Knight Tunic',    tokenCost: 700 },
      { id: 'wizard-robe',  name: 'Wizard Robe',     tokenCost: 900 },
      { id: 'armor',        name: 'Battle Armor',    tokenCost: 1000 },
      { id: 'dragon-suit',  name: 'Dragon Suit',     tokenCost: 1500 },
    ],
  },
  {
    key: 'pants',
    label: 'Pants',
    icon: '👖',
    options: [
      { id: 'jeans',          name: 'Jeans',           tokenCost: 0 },
      { id: 'shorts-red',     name: 'Red Shorts',      tokenCost: 0 },
      { id: 'pants-black',    name: 'Black Pants',     tokenCost: 100 },
      { id: 'cargo-khaki',    name: 'Cargo Pants',     tokenCost: 150 },
      { id: 'shorts-camo',    name: 'Camo Shorts',     tokenCost: 200 },
      { id: 'track-pants',    name: 'Track Pants',     tokenCost: 250 },
      { id: 'skirt-plaid',    name: 'Plaid Skirt',     tokenCost: 250 },
      { id: 'ninja-pants',    name: 'Ninja Pants',     tokenCost: 550 },
      { id: 'knight-leggings',name: 'Knight Leggings', tokenCost: 700 },
    ],
  },
  {
    key: 'shoes',
    label: 'Shoes',
    icon: '👟',
    options: [
      { id: 'sneakers',     name: 'Sneakers',     tokenCost: 0 },
      { id: 'sandals',      name: 'Sandals',      tokenCost: 0 },
      { id: 'boots-brown',  name: 'Boots',        tokenCost: 100 },
      { id: 'shoes-red',    name: 'Red Shoes',    tokenCost: 150 },
      { id: 'high-tops',    name: 'High-Tops',    tokenCost: 250 },
      { id: 'ninja-boots',  name: 'Ninja Boots',  tokenCost: 400 },
      { id: 'knight-boots', name: 'Knight Boots', tokenCost: 600 },
      { id: 'dragon-boots', name: 'Dragon Boots', tokenCost: 900 },
    ],
  },
  {
    key: 'accessory',
    label: 'Extras',
    icon: '🎩',
    options: [
      { id: 'none',          name: 'None',          tokenCost: 0 },
      { id: 'glasses',       name: 'Glasses',       tokenCost: 150 },
      { id: 'headband',      name: 'Headband',      tokenCost: 200 },
      { id: 'scarf',         name: 'Cozy Scarf',    tokenCost: 250 },
      { id: 'cat-ears',      name: 'Cat Ears',      tokenCost: 350 },
      { id: 'robot-visor',   name: 'Robot Visor',   tokenCost: 500 },
      { id: 'crown',         name: 'Crown',         tokenCost: 600 },
      { id: 'halo',          name: 'Halo',          tokenCost: 700 },
      { id: 'devil-horns',   name: 'Devil Horns',   tokenCost: 700 },
      { id: 'wizard-hat',    name: 'Wizard Hat',    tokenCost: 800 },
      { id: 'knight-helmet', name: 'Knight Helmet', tokenCost: 900 },
      { id: 'angel-wings',   name: 'Angel Wings',   tokenCost: 1000 },
      { id: 'dragon-wings',  name: 'Dragon Wings',  tokenCost: 1500 },
    ],
  },
];

// Token reward config
export const BATTLE_TOKEN_BASE = 15;
export const BATTLE_TOKEN_PER_RANK = 5;
export const PRO_BATTLE_BONUS = 5;
export const PRO_MONTHLY_TOKENS = 500;
