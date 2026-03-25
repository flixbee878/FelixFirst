import { useState, useCallback } from 'react';
import type { PlayerProfile } from '../types';
import { WINS_PER_RANK } from '../constants/ranks';

const STORAGE_KEY = 'type_master_profile';

const defaultProfile: PlayerProfile = {
  rank: 1,
  winsInCurrentRank: 0,
  totalWins: 0,
  totalLosses: 0,
};

const loadProfile = (): PlayerProfile => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return defaultProfile;
};

const saveProfile = (profile: PlayerProfile) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
};

export const usePlayerProfile = () => {
  const [profile, setProfile] = useState<PlayerProfile>(loadProfile);

  const recordWin = useCallback(() => {
    setProfile((prev) => {
      const newWins = prev.winsInCurrentRank + 1;
      const rankUp = newWins >= WINS_PER_RANK;
      const updated: PlayerProfile = {
        rank: rankUp ? prev.rank + 1 : prev.rank,
        winsInCurrentRank: rankUp ? 0 : newWins,
        totalWins: prev.totalWins + 1,
        totalLosses: prev.totalLosses,
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

  const resetProfile = useCallback(() => {
    saveProfile(defaultProfile);
    setProfile(defaultProfile);
  }, []);

  return { profile, recordWin, recordLoss, resetProfile };
};
