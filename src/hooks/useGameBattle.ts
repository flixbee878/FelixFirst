import { useReducer, useCallback, useRef, useEffect } from 'react';
import type { BattleState, TurnPhase, TypingResult, BattleLogEntry } from '../types';
import { getRandomWord, getRandomTaunt } from '../constants/words';

interface GameBattleOptions {
  playerRank: number;
  onWin: () => void;
  onLose: () => void;
}

type Action =
  | { type: 'START_BATTLE'; word: string }
  | { type: 'PLAYER_ATTACK'; damage: number; word: string; phase: TurnPhase }
  | { type: 'PLAYER_MISS'; damage: number; word: string }
  | { type: 'ROBOT_ATTACK'; damage: number }
  | { type: 'SET_PHASE'; phase: TurnPhase }
  | { type: 'SET_WORD'; word: string }
  | { type: 'RESET' };

function makeid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function createInitialState(): BattleState {
  return {
    playerHP: 100,
    playerMaxHP: 100,
    robotHP: 100,
    robotMaxHP: 100,
    currentWord: '',
    phase: 'idle',
    timeRemaining: 5000,
    turnCount: 0,
    battleLog: [],
    lastDamage: 0,
    lastPlayerDamage: 0,
  };
}

function reducer(state: BattleState, action: Action): BattleState {
  switch (action.type) {
    case 'START_BATTLE':
      return {
        ...createInitialState(),
        currentWord: action.word,
        phase: 'player_turn',
        battleLog: [{ id: makeid(), message: '⚔️ Battle begins! Type to attack!', type: 'system' }],
      };

    case 'PLAYER_ATTACK': {
      const newRobotHP = Math.max(0, state.robotHP - action.damage);
      const entry: BattleLogEntry = {
        id: makeid(),
        message: `💥 You dealt ${action.damage} damage!`,
        type: 'player_attack',
      };
      return {
        ...state,
        robotHP: newRobotHP,
        phase: action.phase,
        currentWord: action.word,
        lastDamage: action.damage,
        battleLog: [...state.battleLog.slice(-4), entry],
        turnCount: state.turnCount + 1,
      };
    }

    case 'PLAYER_MISS': {
      const missDamage = action.damage;
      const newPlayerHP = Math.max(0, state.playerHP - missDamage);
      const entry: BattleLogEntry = {
        id: makeid(),
        message: `⏱️ Too slow! Robot hits you for ${missDamage}!`,
        type: 'miss',
      };
      return {
        ...state,
        playerHP: newPlayerHP,
        phase: 'robot_attack_anim',
        currentWord: action.word,
        lastPlayerDamage: missDamage,
        battleLog: [...state.battleLog.slice(-4), entry],
        turnCount: state.turnCount + 1,
      };
    }

    case 'ROBOT_ATTACK': {
      const newPlayerHP = Math.max(0, state.playerHP - action.damage);
      const entry: BattleLogEntry = {
        id: makeid(),
        message: `🤖 Robot attacks for ${action.damage} damage!`,
        type: 'robot_attack',
      };
      return {
        ...state,
        playerHP: newPlayerHP,
        phase: 'robot_attack_anim',
        lastPlayerDamage: action.damage,
        battleLog: [...state.battleLog.slice(-4), entry],
      };
    }

    case 'SET_PHASE':
      return { ...state, phase: action.phase };

    case 'SET_WORD':
      return { ...state, currentWord: action.word };

    case 'RESET':
      return createInitialState();

    default:
      return state;
  }
}

export const useGameBattle = ({ playerRank, onWin, onLose }: GameBattleOptions) => {
  const [state, dispatch] = useReducer(reducer, createInitialState());
  const mountedRef = useRef(true);
  const onWinRef = useRef(onWin);
  const onLoseRef = useRef(onLose);
  onWinRef.current = onWin;
  onLoseRef.current = onLose;

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

  const startBattle = useCallback(() => {
    const word = getRandomWord(playerRank);
    dispatch({ type: 'START_BATTLE', word });
  }, [playerRank]);

  const submitWord = useCallback(async (result: TypingResult) => {
    const damage = Math.min(45, Math.max(8, Math.floor((result.wpm / 30) * 20 + (result.accuracy / 100) * 15)));
    const nextWord = getRandomWord(playerRank);

    dispatch({ type: 'PLAYER_ATTACK', damage, word: nextWord, phase: 'player_attack_anim' });
    await delay(600);
    if (!mountedRef.current) return;

    // Check victory
    const newRobotHP = Math.max(0, state.robotHP - damage);
    if (newRobotHP <= 0) {
      dispatch({ type: 'SET_PHASE', phase: 'victory' });
      onWinRef.current();
      return;
    }

    // Robot's turn
    dispatch({ type: 'SET_PHASE', phase: 'robot_turn' });
    await delay(1500);
    if (!mountedRef.current) return;

    const robotDamage = Math.floor(Math.random() * 16) + 10;
    dispatch({ type: 'ROBOT_ATTACK', damage: robotDamage });
    await delay(700);
    if (!mountedRef.current) return;

    const newPlayerHP = Math.max(0, state.playerHP - robotDamage);
    if (newPlayerHP <= 0) {
      dispatch({ type: 'SET_PHASE', phase: 'defeat' });
      onLoseRef.current();
      return;
    }

    dispatch({ type: 'SET_PHASE', phase: 'player_turn' });
  }, [playerRank, state.robotHP, state.playerHP]);

  const handleMiss = useCallback(async () => {
    const missDamage = Math.floor(Math.random() * 10) + 8;
    const nextWord = getRandomWord(playerRank);

    dispatch({ type: 'PLAYER_MISS', damage: missDamage, word: nextWord });
    await delay(700);
    if (!mountedRef.current) return;

    const newPlayerHP = Math.max(0, state.playerHP - missDamage);
    if (newPlayerHP <= 0) {
      dispatch({ type: 'SET_PHASE', phase: 'defeat' });
      onLoseRef.current();
      return;
    }

    dispatch({ type: 'SET_PHASE', phase: 'player_turn' });
  }, [playerRank, state.playerHP]);

  const resetBattle = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return { state, startBattle, submitWord, handleMiss, resetBattle, getRandomTaunt };
};
