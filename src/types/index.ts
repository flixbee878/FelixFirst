export type TurnPhase =
  | 'idle'
  | 'player_turn'
  | 'player_attack_anim'
  | 'robot_turn'
  | 'robot_attack_anim'
  | 'victory'
  | 'defeat';

export interface BattleLogEntry {
  id: string;
  message: string;
  type: 'player_attack' | 'robot_attack' | 'miss' | 'system';
}

export interface BattleState {
  playerHP: number;
  playerMaxHP: number;
  robotHP: number;
  robotMaxHP: number;
  currentWord: string;
  phase: TurnPhase;
  timeRemaining: number;
  turnCount: number;
  battleLog: BattleLogEntry[];
  lastDamage: number;
  lastPlayerDamage: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'home_row' | 'common_words' | 'speed_drill';
  words: string[];
  targetWPM?: number;
}

export interface PlayerProfile {
  rank: number;
  winsInCurrentRank: number;
  totalWins: number;
  totalLosses: number;
  tokens: number;
  unlockedItems: string[];
}

export interface TypingResult {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
}

export interface CharStatus {
  char: string;
  status: 'pending' | 'correct' | 'incorrect';
}
