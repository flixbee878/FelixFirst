export interface AvatarConfig {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  eyeStyle: string;
  eyeColor: string;
  shirt: string;
  pants: string;
  shoes: string;
  accessory: string;
}

export interface AvatarPartOption {
  id: string;
  name: string;
  tokenCost: number;
}

export interface AvatarCategory {
  key: keyof AvatarConfig;
  label: string;
  icon: string;
  options: AvatarPartOption[];
}

export const DEFAULT_AVATAR: AvatarConfig = {
  skinTone: 'light',
  hairStyle: 'short',
  hairColor: '#4a2c0a',
  eyeStyle: 'anime',
  eyeColor: '#3b82f6',
  shirt: 'tee-blue',
  pants: 'jeans',
  shoes: 'sneakers',
  accessory: 'none',
};
