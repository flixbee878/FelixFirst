import { useState, useCallback, useMemo } from 'react';
import type { PlayerProfile } from '../types';
import { WINS_PER_RANK } from '../constants/ranks';
import {
  BATTLE_TOKEN_BASE, BATTLE_TOKEN_PER_RANK,
  PRO_MONTHLY_TOKENS, FLIXBEE_MONTHLY_TOKENS, FLIXBEE_USERNAME, VIP_USERNAMES,
} from '../constants/avatarParts';
import type { AvatarConfig } from '../types/avatar';
import { DEFAULT_AVATAR } from '../types/avatar';

// Per-user storage keys
const SESSION_KEY   = 'type_knight_session';          // current username
const ACCOUNTS_KEY  = 'type_knight_accounts';         // [{username, hash}]
const profileKey    = (u: string) => `type_knight_profile_${u}`;
const avatarKey     = (u: string) => `type_knight_avatar_${u}`;

// ── FNV-1a hash ───────────────────────────────────────────────────────────
const hashPassword = (pw: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < pw.length; i++) {
    h ^= pw.charCodeAt(i);
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
    // Migration: discard old string[] format
    if (!Array.isArray(parsed) || (parsed.length > 0 && typeof parsed[0] === 'string')) {
      localStorage.removeItem(ACCOUNTS_KEY);
      return [];
    }
    return parsed as AccountEntry[];
  } catch { return []; }
};

const saveAccounts = (a: AccountEntry[]) => {
  try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(a)); } catch { /* ignore */ }
};

const findAccount = (username: string) =>
  getAccounts().find(a => a.username.toLowerCase() === username.toLowerCase());

// ── Per-user profile/avatar loaders ─────────────────────────────────────
const DEFAULT_PROFILE = (username = ''): PlayerProfile => ({
  username,
  rank: 1, winsInCurrentRank: 0, totalWins: 0, totalLosses: 0,
  tokens: 0, unlockedItems: [],
  isPro: false, proExpiresAt: null, proLastMonthlyGrant: null,
  proMonthlyTokenAmount: PRO_MONTHLY_TOKENS,
});

const loadUserProfile = (username: string): PlayerProfile => {
  try {
    // Migration: if old single-profile key exists for this user, move it
    const oldKey  = 'type_knight_profile';
    const newKey  = profileKey(username);
    const oldData = localStorage.getItem(oldKey);
    if (oldData && !localStorage.getItem(newKey)) {
      const old = JSON.parse(oldData);
      if (old.username === username) {
        localStorage.setItem(newKey, oldData);
        localStorage.removeItem(oldKey);
      }
    }
    const stored = localStorage.getItem(newKey);
    if (stored) {
      const p = JSON.parse(stored);
      return {
        ...DEFAULT_PROFILE(username),
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
  return DEFAULT_PROFILE(username);
};

const loadUserAvatar = (username: string): AvatarConfig => {
  try {
    // Migration: move old avatar key
    const oldKey  = 'type_knight_avatar';
    const newKey  = avatarKey(username);
    const oldData = localStorage.getItem(oldKey);
    if (oldData && !localStorage.getItem(newKey)) {
      localStorage.setItem(newKey, oldData);
      localStorage.removeItem(oldKey);
    }
    const stored = localStorage.getItem(newKey);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return DEFAULT_AVATAR;
};

const saveProfile = (p: PlayerProfile) => {
  if (!p.username) return;
  try {
    localStorage.setItem(profileKey(p.username), JSON.stringify(p));
    localStorage.setItem(SESSION_KEY, p.username);
  } catch { /* ignore */ }
};

const saveAvatar = (username: string, cfg: AvatarConfig) => {
  if (!username) return;
  try { localStorage.setItem(avatarKey(username), JSON.stringify(cfg)); } catch { /* ignore */ }
};

// ── Initial load from session ─────────────────────────────────────────────
const loadSessionProfile = (): PlayerProfile => DEFAULT_PROFILE();
const loadSessionAvatar  = (): AvatarConfig  => DEFAULT_AVATAR;

// ── Hook ──────────────────────────────────────────────────────────────────
export const usePlayerProfile = () => {
  const [profile, setProfile]       = useState<PlayerProfile>(loadSessionProfile);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(loadSessionAvatar);

  const isPro = useMemo(
    () => profile.isPro && profile.proExpiresAt !== null && profile.proExpiresAt > Date.now(),
    [profile.isPro, profile.proExpiresAt],
  );

  const canClaimMonthly = useMemo(() => {
    if (!isPro) return false;
    const last = profile.proLastMonthlyGrant ?? 0;
    return Date.now() - last >= 30 * 24 * 60 * 60 * 1000;
  }, [isPro, profile.proLastMonthlyGrant]);

  // ── Register new account ──────────────────────────────────────────────
  const setUsername = useCallback((username: string, password: string): 'ok' | 'taken' => {
    if (findAccount(username)) return 'taken';

    const isFlixbee = username.toLowerCase() === FLIXBEE_USERNAME.toLowerCase();
    const isVip     = VIP_USERNAMES.some(v => v.toLowerCase() === username.toLowerCase());
    const now = Date.now();
    const hash = hashPassword(password);

    saveAccounts([...getAccounts(), { username, hash }]);
    localStorage.setItem(SESSION_KEY, username);

    const initial = DEFAULT_PROFILE(username);
    const withPerks: PlayerProfile = {
      ...initial,
      isPro:                isVip ? true  : false,
      proExpiresAt:         isVip ? now + 3650 * 24 * 60 * 60 * 1000 : null,
      proMonthlyTokenAmount:isFlixbee ? FLIXBEE_MONTHLY_TOKENS : isVip ? PRO_MONTHLY_TOKENS : PRO_MONTHLY_TOKENS,
      tokens:               isFlixbee ? FLIXBEE_MONTHLY_TOKENS : isVip ? PRO_MONTHLY_TOKENS : 0,
      proLastMonthlyGrant:  isVip ? now : null,
    };
    saveProfile(withPerks);
    setProfile(withPerks);
    setAvatarConfig(DEFAULT_AVATAR);
    return 'ok';
  }, []);

  // ── Log in to existing account ────────────────────────────────────────
  const login = useCallback((username: string, password: string): 'ok' | 'wrong_password' | 'not_found' => {
    const account = findAccount(username);
    if (!account) return 'not_found';
    if (account.hash !== hashPassword(password)) return 'wrong_password';

    const userProfile = loadUserProfile(account.username); // use exact-case stored name
    const userAvatar  = loadUserAvatar(account.username);
    localStorage.setItem(SESSION_KEY, account.username);
    setProfile(userProfile);
    setAvatarConfig(userAvatar);
    return 'ok';
  }, []);

  const recordWin = useCallback((tokensEarned?: number) => {
    setProfile((prev) => {
      const newWins = prev.winsInCurrentRank + 1;
      const rankUp  = newWins >= WINS_PER_RANK;
      const earned  = tokensEarned ?? (BATTLE_TOKEN_BASE + prev.rank * BATTLE_TOKEN_PER_RANK);
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
    saveAvatar(profile.username, config);
    setAvatarConfig(config);
  }, [profile.username]);

  const resetProfile = useCallback(() => {
    const blank = DEFAULT_PROFILE(profile.username);
    saveProfile(blank);
    saveAvatar(profile.username, DEFAULT_AVATAR);
    setProfile(blank);
    setAvatarConfig(DEFAULT_AVATAR);
  }, [profile.username]);

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
      const now  = Date.now();
      const last = prev.proLastMonthlyGrant ?? 0;
      if (now - last < 30 * 24 * 60 * 60 * 1000) return prev;
      const amount = prev.proMonthlyTokenAmount ?? PRO_MONTHLY_TOKENS;
      const updated = { ...prev, tokens: prev.tokens + amount, proLastMonthlyGrant: now };
      saveProfile(updated);
      return updated;
    });
  }, []);

  return {
    profile, avatarConfig,
    isPro, canClaimMonthly,
    setUsername, login,
    recordWin, recordLoss, unlockItem, updateAvatar, resetProfile,
    activatePro, claimMonthlyTokens,
  };
};
