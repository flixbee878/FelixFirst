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
  { id: '#1a1a1a', name: 'Black', hex: '#1a1a1a', tokenCost: 0 },
  { id: '#c8a45a', name: 'Blonde', hex: '#c8a45a', tokenCost: 0 },
  { id: '#8B2500', name: 'Auburn', hex: '#8B2500', tokenCost: 0 },
  { id: '#a0522d', name: 'Brown', hex: '#a0522d', tokenCost: 0 },
  { id: '#FF69B4', name: 'Pink', hex: '#FF69B4', tokenCost: 30 },
  { id: '#4169E1', name: 'Blue', hex: '#4169E1', tokenCost: 30 },
  { id: '#9B59B6', name: 'Purple', hex: '#9B59B6', tokenCost: 30 },
  { id: '#FF4500', name: 'Flame Red', hex: '#FF4500', tokenCost: 50 },
  { id: '#00CED1', name: 'Teal', hex: '#00CED1', tokenCost: 50 },
  { id: '#FFD700', name: 'Gold', hex: '#FFD700', tokenCost: 75 },
  { id: '#f0f0f0', name: 'White', hex: '#f0f0f0', tokenCost: 75 },
];

export const EYE_COLORS: Array<{ id: string; name: string; hex: string; tokenCost: number }> = [
  { id: '#3b82f6', name: 'Blue', hex: '#3b82f6', tokenCost: 0 },
  { id: '#22c55e', name: 'Green', hex: '#22c55e', tokenCost: 0 },
  { id: '#8B4513', name: 'Brown', hex: '#8B4513', tokenCost: 0 },
  { id: '#6b7280', name: 'Grey', hex: '#6b7280', tokenCost: 0 },
  { id: '#9B59B6', name: 'Purple', hex: '#9B59B6', tokenCost: 40 },
  { id: '#FF69B4', name: 'Pink', hex: '#FF69B4', tokenCost: 40 },
  { id: '#FF4500', name: 'Red', hex: '#FF4500', tokenCost: 60 },
  { id: '#FFD700', name: 'Gold', hex: '#FFD700', tokenCost: 80 },
];

export const AVATAR_CATEGORIES: AvatarCategory[] = [
  {
    key: 'skinTone',
    label: 'Skin',
    icon: '✋',
    options: [
      { id: 'light', name: 'Light', tokenCost: 0 },
      { id: 'tan', name: 'Tan', tokenCost: 0 },
      { id: 'medium', name: 'Medium', tokenCost: 0 },
      { id: 'dark', name: 'Dark', tokenCost: 0 },
      { id: 'deep', name: 'Deep', tokenCost: 0 },
    ],
  },
  {
    key: 'hairStyle',
    label: 'Hair',
    icon: '💇',
    options: [
      { id: 'short', name: 'Short', tokenCost: 0 },
      { id: 'medium-straight', name: 'Medium', tokenCost: 0 },
      { id: 'spiky', name: 'Spiky', tokenCost: 0 },
      { id: 'long', name: 'Long', tokenCost: 0 },
      { id: 'ponytail', name: 'Ponytail', tokenCost: 20 },
      { id: 'anime-wild', name: 'Anime Wild', tokenCost: 40 },
      { id: 'curly', name: 'Curly', tokenCost: 40 },
      { id: 'bun', name: 'Bun', tokenCost: 50 },
      { id: 'mohawk', name: 'Mohawk', tokenCost: 60 },
      { id: 'twin-tails', name: 'Twin Tails', tokenCost: 75 },
    ],
  },
  {
    key: 'eyeStyle',
    label: 'Eyes',
    icon: '👀',
    options: [
      { id: 'anime', name: 'Anime', tokenCost: 0 },
      { id: 'round', name: 'Round', tokenCost: 0 },
      { id: 'cool', name: 'Cool', tokenCost: 0 },
      { id: 'happy', name: 'Happy', tokenCost: 20 },
      { id: 'star', name: 'Star', tokenCost: 60 },
      { id: 'heart', name: 'Heart', tokenCost: 80 },
    ],
  },
  {
    key: 'shirt',
    label: 'Shirt',
    icon: '👕',
    options: [
      { id: 'tee-blue', name: 'Blue Tee', tokenCost: 0 },
      { id: 'tee-red', name: 'Red Tee', tokenCost: 0 },
      { id: 'tee-green', name: 'Green Tee', tokenCost: 0 },
      { id: 'hoodie-grey', name: 'Grey Hoodie', tokenCost: 30 },
      { id: 'hoodie-black', name: 'Black Hoodie', tokenCost: 30 },
      { id: 'jacket-orange', name: 'Orange Jacket', tokenCost: 50 },
      { id: 'tank-pink', name: 'Pink Tank', tokenCost: 50 },
      { id: 'ninja-black', name: 'Ninja Top', tokenCost: 100 },
      { id: 'armor', name: 'Battle Armor', tokenCost: 150 },
    ],
  },
  {
    key: 'pants',
    label: 'Pants',
    icon: '👖',
    options: [
      { id: 'jeans', name: 'Jeans', tokenCost: 0 },
      { id: 'shorts-red', name: 'Red Shorts', tokenCost: 0 },
      { id: 'pants-black', name: 'Black Pants', tokenCost: 20 },
      { id: 'shorts-camo', name: 'Camo Shorts', tokenCost: 40 },
      { id: 'skirt-plaid', name: 'Plaid Skirt', tokenCost: 40 },
      { id: 'ninja-pants', name: 'Ninja Pants', tokenCost: 100 },
    ],
  },
  {
    key: 'shoes',
    label: 'Shoes',
    icon: '👟',
    options: [
      { id: 'sneakers', name: 'Sneakers', tokenCost: 0 },
      { id: 'boots-brown', name: 'Boots', tokenCost: 20 },
      { id: 'shoes-red', name: 'Red Shoes', tokenCost: 30 },
      { id: 'ninja-boots', name: 'Ninja Boots', tokenCost: 80 },
    ],
  },
  {
    key: 'accessory',
    label: 'Extras',
    icon: '🎩',
    options: [
      { id: 'none', name: 'None', tokenCost: 0 },
      { id: 'glasses', name: 'Glasses', tokenCost: 30 },
      { id: 'headband', name: 'Headband', tokenCost: 40 },
      { id: 'cat-ears', name: 'Cat Ears', tokenCost: 60 },
      { id: 'crown', name: 'Crown', tokenCost: 100 },
      { id: 'halo', name: 'Halo', tokenCost: 120 },
      { id: 'devil-horns', name: 'Devil Horns', tokenCost: 120 },
    ],
  },
];

// Token reward config
export const BATTLE_TOKEN_BASE = 15;
export const BATTLE_TOKEN_PER_RANK = 5;
