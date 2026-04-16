import { useState, useCallback, useMemo } from 'react';
import type { PlayerProfile } from '../types';
import { WINS_PER_RANK } from '../constants/ranks';
import {
  BATTLE_TOKEN_BASE, BATTLE_TOKEN_PER_RANK,
  PRO_MONTHLY_TOKENS, FLIXBEE_MONTHLY_TOKENS, FLIXBEE_USERNAME,
} from '../constants/avatarParts';
import type { AvatarConfig } from '../types/avatar';
import { DEFAULT_AVATAR } from '../types/avatar';

const STORAGE_KEY   = 'type_knight_profile';
const AVATAR_KEY    = 'type_knight_avatar';
const ACCOUNTS_KEY  = 'type_knight_accounts'; // {username, hash}[]

// ── Simple FNV-1a hash (not cryptographic, fine for a kids' game) ──────────
const hashPassword = (password: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < password.length; i++) {
    h ^= password.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
};

// ── Account list helpers ──────────────────────────────────────────────────
interface AccountEntry { username: string; hash: string; }

const getAccounts = (): AccountEntry[] => {
  try {
    const s = localStorage.getItem(ACCOUNTS_KEY);
    if (!s) return [];
    const parsed = JSON.parse(s);
    // Migration: if old format was string[] — discard it
    if (!Array.isArray(parsed) || (parsed.length > 0 && typeof parsed[0] === 'string')) {
      localStorage.removeItem(ACCOUNTS_KEY);
      return [];
    }
    return parsed as AccountEntry[];
  } catch { return []; }
};

const saveAccounts = (accounts: AccountEntry[]) => {
  try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)); } catch { /* ignore */ }
};

const findAccount = (username: string): AccountEntry | undefined =>
  getAccounts().find(a => a.username.toLowerCase() === username.toLowerCase());

// ── Default profile ───────────────────────────────────────────────────────
const defaultProfile: PlayerProfile = {
  username: '',
  rank: 1,
  winsInCurrentRank: 0,
  totalWins: 0,
  totalLosses: 0,
  tokens: 0,
  unlockedItems: [],
  isPro: false,
  proExpiresAt: null,
  proLastMonthlyGrant: null,
  proMonthlyTokenAmount: PRO_MONTHLY_TOKENS,
};

const loadProfile = (): PlayerProfile => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const p = JSON.parse(stored);
      if (p.username) {
        // If this username has no password account yet → wipe it (old password-less account)
        if (!findAccount(p.username)) {
          localStorage.removeItem(STORAGE_KEY);
          return defaultProfile;
        }
      }
      return {
        ...defaultProfile,
        ...p,
        tokens: p.tokens ?? 0,
        unlockedItems: p.unlockedItems ?? [],
        isPro: p.isPro ?? false,
        proExpiresAt: p.proExpiresAt ?? null,
        proLastMonthlyGrant: p.proLastMonthlyGrant ?? null,
        proMonthlyTokenAmount: p.proMonthlyTokenAmount ?? PRO_MONTHLY_TOKENS,
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

// ── Hook ──────────────────────────────────────────────────────────────────
export const usePlayerProfile = () => {
  const [profile, setProfile] = useState<PlayerProfile>(loadProfile);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(loadAvatar);

  const isPro = useMemo(
    () => profile.isPro && profile.proExpiresAt !== null && profile.proExpiresAt > Date.now(),
    [profile.isPro, profile.proExpiresAt],
  );

  const canClaimMonthly = useMemo(() => {
    if (!isPro) return false;
    const last = profile.proLastMonthlyGrant ?? 0;
    return Date.now() - last >= 30 * 24 * 60 * 60 * 1000;
  }, [isPro, profile.proLastMonthlyGrant]);

  // Returns 'ok' | 'taken'
  const setUsername = useCallback((username: string, password: string): 'ok' | 'taken' => {
    if (findAccount(username)) return 'taken';

    const isFlixbee = username.toLowerCase() === FLIXBEE_USERNAME.toLowerCase();
    const now = Date.now();
    const hash = hashPassword(password);

    // Register account
    const accounts = getAccounts();
    saveAccounts([...accounts, { username, hash }]);

    setProfile((prev) => {
      const updated: PlayerProfile = {
        ...prev,
        username,
        isPro: isFlixbee ? true : prev.isPro,
        proExpiresAt: isFlixbee ? now + 3650 * 24 * 60 * 60 * 1000 : prev.proExpiresAt,
        proMonthlyTokenAmount: isFlixbee ? FLIXBEE_MONTHLY_TOKENS : prev.proMonthlyTokenAmount,
        tokens: isFlixbee ? prev.tokens + FLIXBEE_MONTHLY_TOKENS : prev.tokens,
        proLastMonthlyGrant: isFlixbee ? now : prev.proLastMonthlyGrant,
      };
      saveProfile(updated);
      return updated;
    });
    return 'ok';
  }, []);

  const recordWin = useCallback((tokensEarned?: number) => {
    setProfile((prev) => {
      const newWins = prev.winsInCurrentRank + 1;
      const rankUp = newWins >= WINS_PER_RANK;
      const earned = tokensEarned ?? (BATTLE_TOKEN_BASE + prev.rank * BATTLE_TOKEN_PER_RANK);
      const updated: PlayerProfile = {
        ...prev,
        rank: rankUp ? Math.min(prev.rank + 1, 7) : prev.rank,
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

  const activatePro = useCallback((days: number) => {
    setProfile((prev) => {
      const updated: PlayerProfile = {
        ...prev,
        isPro: true,
        proExpiresAt: Date.now() + days * 24 * 60 * 60 * 1000,
      };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const claimMonthlyTokens = useCallback(() => {
    setProfile((prev) => {
      const now = Date.now();
      const last = prev.proLastMonthlyGrant ?? 0;
      if (now - last < 30 * 24 * 60 * 60 * 1000) return prev;
      const amount = prev.proMonthlyTokenAmount ?? PRO_MONTHLY_TOKENS;
      const updated = {
        ...prev,
        tokens: prev.tokens + amount,
        proLastMonthlyGrant: now,
      };
      saveProfile(updated);
      return updated;
    });
  }, []);

  return {
    profile, avatarConfig,
    isPro, canClaimMonthly,
    setUsername,
    recordWin, recordLoss, unlockItem, updateAvatar, resetProfile,
    activatePro, claimMonthlyTokens,
  };
};
