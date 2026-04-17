import { useState, useCallback, useMemo } from 'react';
import type { PlayerProfile } from '../types';
import { WINS_PER_RANK } from '../constants/ranks';
import { BATTLE_TOKEN_BASE, BATTLE_TOKEN_PER_RANK, PRO_MONTHLY_TOKENS } from '../constants/avatarParts';
import type { AvatarConfig } from '../types/avatar';
import { DEFAULT_AVATAR } from '../types/avatar';
import {
  registerUser, loginUser, fetchCurrentUser,
  dbSaveProfile, dbSaveAvatar, dbSignOut,
  type RegisterResult, type LoginResult,
} from '../lib/authService';

const DEFAULT_PROFILE = (): PlayerProfile => ({
  username: '',
  rank: 1, winsInCurrentRank: 0, totalWins: 0, totalLosses: 0,
  tokens: 0, unlockedItems: [],
  isPro: false, proExpiresAt: null, proLastMonthlyGrant: null,
  proMonthlyTokenAmount: PRO_MONTHLY_TOKENS,
});

export const usePlayerProfile = () => {
  const [profile, setProfile]           = useState<PlayerProfile>(DEFAULT_PROFILE());
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [loading, setLoading]           = useState(false);

  const isPro = useMemo(
    () => profile.isPro && profile.proExpiresAt !== null && profile.proExpiresAt > Date.now(),
    [profile.isPro, profile.proExpiresAt],
  );

  const canClaimMonthly = useMemo(() => {
    if (!isPro) return false;
    return Date.now() - (profile.proLastMonthlyGrant ?? 0) >= 30 * 24 * 60 * 60 * 1000;
  }, [isPro, profile.proLastMonthlyGrant]);

  const setUsername = useCallback(async (username: string, password: string): Promise<RegisterResult> => {
    setLoading(true);
    const result = await registerUser(username, password);
    if (result === 'ok') {
      const data = await fetchCurrentUser();
      if (data) { setProfile(data.profile); setAvatarConfig(data.avatar); }
    }
    setLoading(false);
    return result;
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<LoginResult> => {
    setLoading(true);
    const result = await loginUser(username, password);
    if (result === 'ok') {
      const data = await fetchCurrentUser();
      if (data) { setProfile(data.profile); setAvatarConfig(data.avatar); }
    }
    setLoading(false);
    return result;
  }, []);

  const applyAndSave = useCallback((updater: (prev: PlayerProfile) => PlayerProfile) => {
    setProfile(prev => {
      const updated = updater(prev);
      dbSaveProfile(updated);
      return updated;
    });
  }, []);

  const recordWin = useCallback((tokensEarned?: number) => {
    applyAndSave(prev => {
      const newWins = prev.winsInCurrentRank + 1;
      const rankUp  = newWins >= WINS_PER_RANK;
      const earned  = tokensEarned ?? (BATTLE_TOKEN_BASE + prev.rank * BATTLE_TOKEN_PER_RANK);
      return { ...prev, rank: rankUp ? Math.min(prev.rank + 1, 7) : prev.rank, winsInCurrentRank: rankUp ? 0 : newWins, totalWins: prev.totalWins + 1, tokens: prev.tokens + earned };
    });
  }, [applyAndSave]);

  const recordLoss = useCallback(() => {
    applyAndSave(prev => ({ ...prev, totalLosses: prev.totalLosses + 1 }));
  }, [applyAndSave]);

  const unlockItem = useCallback((itemId: string, cost: number) => {
    applyAndSave(prev => {
      if (prev.tokens < cost || prev.unlockedItems.includes(itemId)) return prev;
      return { ...prev, tokens: prev.tokens - cost, unlockedItems: [...prev.unlockedItems, itemId] };
    });
  }, [applyAndSave]);

  const updateAvatar = useCallback((config: AvatarConfig) => {
    setAvatarConfig(config);
    dbSaveAvatar(config);
  }, []);

  const resetProfile = useCallback(() => {
    const blank = { ...DEFAULT_PROFILE(), username: profile.username };
    setProfile(blank);
    setAvatarConfig(DEFAULT_AVATAR);
    dbSaveProfile(blank);
    dbSaveAvatar(DEFAULT_AVATAR);
  }, [profile.username]);

  const activatePro = useCallback((days: number) => {
    applyAndSave(prev => ({ ...prev, isPro: true, proExpiresAt: Date.now() + days * 24 * 60 * 60 * 1000 }));
  }, [applyAndSave]);

  const claimMonthlyTokens = useCallback(() => {
    applyAndSave(prev => {
      const now = Date.now();
      if (now - (prev.proLastMonthlyGrant ?? 0) < 30 * 24 * 60 * 60 * 1000) return prev;
      const amount = prev.proMonthlyTokenAmount ?? PRO_MONTHLY_TOKENS;
      return { ...prev, tokens: prev.tokens + amount, proLastMonthlyGrant: now };
    });
  }, [applyAndSave]);

  const importSave = useCallback((savedProfile: PlayerProfile, savedAvatar: AvatarConfig) => {
    const merged = { ...savedProfile, username: profile.username };
    setProfile(merged);
    setAvatarConfig(savedAvatar);
    dbSaveProfile(merged);
    dbSaveAvatar(savedAvatar);
  }, [profile.username]);

  const signOut = useCallback(async () => {
    await dbSignOut();
    setProfile(DEFAULT_PROFILE());
    setAvatarConfig(DEFAULT_AVATAR);
  }, []);

  return {
    profile, avatarConfig, loading,
    isPro, canClaimMonthly,
    setUsername, login, signOut,
    recordWin, recordLoss, unlockItem, updateAvatar, resetProfile,
    activatePro, claimMonthlyTokens, importSave,
  };
};
