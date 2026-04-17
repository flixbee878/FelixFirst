import { supabase } from './supabase';
import type { PlayerProfile } from '../types';
import type { AvatarConfig } from '../types/avatar';
import { DEFAULT_AVATAR } from '../types/avatar';
import { VIP_USERNAMES, FLIXBEE_USERNAME, FLIXBEE_MONTHLY_TOKENS, PRO_MONTHLY_TOKENS } from '../constants/avatarParts';

const toEmail = (username: string) => `${username.toLowerCase()}@typeknight.game`;

export type RegisterResult = 'ok' | 'taken' | 'error';
export type LoginResult = 'ok' | 'error';

const buildDefaultProfile = (username: string): PlayerProfile => {
  const isFlixbee = username.toLowerCase() === FLIXBEE_USERNAME.toLowerCase();
  const isVip     = VIP_USERNAMES.some(v => v.toLowerCase() === username.toLowerCase());
  const now = Date.now();
  return {
    username,
    rank: 1, winsInCurrentRank: 0, totalWins: 0, totalLosses: 0,
    tokens: isFlixbee ? FLIXBEE_MONTHLY_TOKENS : isVip ? PRO_MONTHLY_TOKENS : 0,
    unlockedItems: [],
    isPro: isVip,
    proExpiresAt: isVip ? now + 3650 * 24 * 60 * 60 * 1000 : null,
    proLastMonthlyGrant: isVip ? now : null,
    proMonthlyTokenAmount: isFlixbee ? FLIXBEE_MONTHLY_TOKENS : PRO_MONTHLY_TOKENS,
  };
};

const profileToRow = (id: string, p: PlayerProfile) => ({
  id,
  username: p.username,
  rank: p.rank,
  wins_in_current_rank: p.winsInCurrentRank,
  total_wins: p.totalWins,
  total_losses: p.totalLosses,
  tokens: p.tokens,
  unlocked_items: p.unlockedItems,
  is_pro: p.isPro,
  pro_expires_at: p.proExpiresAt ? new Date(p.proExpiresAt).toISOString() : null,
  pro_last_monthly_grant: p.proLastMonthlyGrant ? new Date(p.proLastMonthlyGrant).toISOString() : null,
  pro_monthly_token_amount: p.proMonthlyTokenAmount,
});

const rowToProfile = (row: Record<string, unknown>): PlayerProfile => ({
  username:             row.username as string,
  rank:                 row.rank as number,
  winsInCurrentRank:    row.wins_in_current_rank as number,
  totalWins:            row.total_wins as number,
  totalLosses:          row.total_losses as number,
  tokens:               row.tokens as number,
  unlockedItems:        (row.unlocked_items as string[]) ?? [],
  isPro:                row.is_pro as boolean,
  proExpiresAt:         row.pro_expires_at ? new Date(row.pro_expires_at as string).getTime() : null,
  proLastMonthlyGrant:  row.pro_last_monthly_grant ? new Date(row.pro_last_monthly_grant as string).getTime() : null,
  proMonthlyTokenAmount: row.pro_monthly_token_amount as number,
});

export const registerUser = async (username: string, password: string): Promise<RegisterResult> => {
  const { data, error } = await supabase.auth.signUp({ email: toEmail(username), password });

  if (error) {
    if (error.message.toLowerCase().includes('already registered')) return 'taken';
    return 'error';
  }
  if (!data.user) return 'error';

  const profile = buildDefaultProfile(username);
  const [profRes, avRes] = await Promise.all([
    supabase.from('profiles').insert(profileToRow(data.user.id, profile)),
    supabase.from('avatars').insert({ id: data.user.id, config: DEFAULT_AVATAR }),
  ]);

  if (profRes.error || avRes.error) return 'error';
  return 'ok';
};

export const loginUser = async (username: string, password: string): Promise<LoginResult> => {
  const { error } = await supabase.auth.signInWithPassword({ email: toEmail(username), password });
  return error ? 'error' : 'ok';
};

export const fetchCurrentUser = async (): Promise<{ profile: PlayerProfile; avatar: AvatarConfig } | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: profRow }, { data: avRow }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('avatars').select('config').eq('id', user.id).single(),
  ]);

  if (!profRow) return null;
  return { profile: rowToProfile(profRow), avatar: avRow?.config ?? DEFAULT_AVATAR };
};

export const dbSaveProfile = async (profile: PlayerProfile): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('profiles').upsert(profileToRow(user.id, profile));
};

export const dbSaveAvatar = async (avatar: AvatarConfig): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('avatars').upsert({ id: user.id, config: avatar });
};

export const dbSignOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};
