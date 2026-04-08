import { useState, useCallback } from 'react';
import type { PlayerProfile } from '../types';
import { WINS_PER_RANK } from '../constants/ranks';
import { BATTLE_TOKEN_BASE, BATTLE_TOKEN_PER_RANK } from '../constants/avatarParts';
import type { AvatarConfig } from '../types/avatar';
import { DEFAULT_AVATAR } from '../types/avatar';

const STORAGE_KEY = 'type_knight_profile';
const AVATAR_KEY = 'type_knight_avatar';

const defaultProfile: PlayerProfile = {
  rank: 1,
  winsInCurrentRank: 0,
  totalWins: 0,
  totalLosses: 0,
  tokens: 0,
  unlockedItems: [],
};

const loadProfile = (): PlayerProfile => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const p = JSON.parse(stored);
      // migrate old saves that don't have tokens/unlockedItems
      return {
        ...defaultProfile,
        ...p,
        tokens: p.tokens ?? 0,
        unlockedItems: p.unlockedItems ?? [],
      };
    }
  } catch { /* ignore */ }
  return defaultProfile;
};

const loadAvatar = (): AvatarConfig => {
  try {
    const stored = localStorage.getItem(AVATAR_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return DEFAULT_AVATAR;
};

const saveProfile = (profile: PlayerProfile) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); } catch { /* ignore */ }
};

const saveAvatar = (config: AvatarConfig) => {
  try { localStorage.setItem(AVATAR_KEY, JSON.stringify(config)); } catch { /* ignore */ }
};

export const usePlayerProfile = () => {
  const [profile, setProfile] = useState<PlayerProfile>(loadProfile);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(loadAvatar);

  const recordWin = useCallback((tokensEarned?: number) => {
    setProfile((prev) => {
      const newWins = prev.winsInCurrentRank + 1;
      const rankUp = newWins >= WINS_PER_RANK;
      const earned = tokensEarned ?? (BATTLE_TOKEN_BASE + prev.rank * BATTLE_TOKEN_PER_RANK);
      const updated: PlayerProfile = {
        ...prev,
        rank: rankUp ? prev.rank + 1 : prev.rank,
        winsInCurrentRank: rankUp ? 0 : newWins,
        totalWins: prev.totalWins + 1,
        tokens: prev.tokens + earned,
      };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const recordLoss = useCallback(() => {
    setProfile((prev) => {
      const updated = { ...prev, totalLosses: prev.totalLosses + 1 };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const unlockItem = useCallback((itemId: string, cost: number) => {
    setProfile((prev) => {
      if (prev.tokens < cost || prev.unlockedItems.includes(itemId)) return prev;
      const updated = {
        ...prev,
        tokens: prev.tokens - cost,
        unlockedItems: [...prev.unlockedItems, itemId],
      };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const updateAvatar = useCallback((config: AvatarConfig) => {
    saveAvatar(config);
    setAvatarConfig(config);
  }, []);

  const resetProfile = useCallback(() => {
    saveProfile(defaultProfile);
    saveAvatar(DEFAULT_AVATAR);
    setProfile(defaultProfile);
    setAvatarConfig(DEFAULT_AVATAR);
  }, []);

  return { profile, avatarConfig, recordWin, recordLoss, unlockItem, updateAvatar, resetProfile };
};
