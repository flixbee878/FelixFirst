import { createContext, useContext, type ReactNode } from 'react';
import { usePlayerProfile } from '../hooks/usePlayerProfile';
import type { PlayerProfile } from '../types';
import type { AvatarConfig } from '../types/avatar';
import type { RegisterResult, LoginResult } from '../lib/authService';

interface GameContextValue {
  profile: PlayerProfile;
  avatarConfig: AvatarConfig;
  loading: boolean;
  isPro: boolean;
  canClaimMonthly: boolean;
  setUsername: (username: string, password: string) => Promise<RegisterResult>;
  login: (username: string, password: string) => Promise<LoginResult>;
  signOut: () => Promise<void>;
  recordWin: (tokensEarned?: number) => void;
  recordLoss: () => void;
  unlockItem: (itemId: string, cost: number) => void;
  updateAvatar: (config: AvatarConfig) => void;
  resetProfile: () => void;
  activatePro: (days: number) => void;
  claimMonthlyTokens: () => void;
  importSave: (profile: PlayerProfile, avatar: AvatarConfig) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const hook = usePlayerProfile();
  return (
    <GameContext.Provider value={hook}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
