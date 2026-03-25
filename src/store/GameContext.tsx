import { createContext, useContext, type ReactNode } from 'react';
import { usePlayerProfile } from '../hooks/usePlayerProfile';
import type { PlayerProfile } from '../types';

interface GameContextValue {
  profile: PlayerProfile;
  recordWin: () => void;
  recordLoss: () => void;
  resetProfile: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { profile, recordWin, recordLoss, resetProfile } = usePlayerProfile();

  return (
    <GameContext.Provider value={{ profile, recordWin, recordLoss, resetProfile }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
