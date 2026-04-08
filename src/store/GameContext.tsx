import { createContext, useContext, type ReactNode } from 'react';
import { usePlayerProfile } from '../hooks/usePlayerProfile';
import type { PlayerProfile } from '../types';
import type { AvatarConfig } from '../types/avatar';

interface GameContextValue {
  profile: PlayerProfile;
  avatarConfig: AvatarConfig;
  recordWin: (tokensEarned?: number) => void;
  recordLoss: () => void;
  unlockItem: (itemId: string, cost: number) => void;
  updateAvatar: (config: AvatarConfig) => void;
  resetProfile: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { profile, avatarConfig, recordWin, recordLoss, unlockItem, updateAvatar, resetProfile } =
    usePlayerProfile();

  return (
    <GameContext.Provider value={{ profile, avatarConfig, recordWin, recordLoss, unlockItem, updateAvatar, resetProfile }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
