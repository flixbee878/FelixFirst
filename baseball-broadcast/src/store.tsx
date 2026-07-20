import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  seedData,
  emptyStats,
  makeId,
  type LeagueData,
  type Team,
  type Player,
  type Game,
  type PlayerStats,
} from './data/league';

const STORAGE_KEY = 'houseLeagueLIVE_v1';

function load(): LeagueData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as LeagueData;
  } catch {
    // ignore bad data and fall back to seed
  }
  return seedData;
}

type Store = {
  data: LeagueData;
  // teams
  addTeam: (t: Omit<Team, 'id'>) => void;
  updateTeam: (id: string, patch: Partial<Team>) => void;
  removeTeam: (id: string) => void;
  // players
  addPlayer: (p: Omit<Player, 'id' | 'stats'> & { stats?: PlayerStats }) => void;
  updatePlayer: (id: string, patch: Partial<Player>) => void;
  updatePlayerStats: (id: string, stats: Partial<PlayerStats>) => void;
  removePlayer: (id: string) => void;
  // games
  addGame: (g: Omit<Game, 'id' | 'playByPlay'> & { playByPlay?: Game['playByPlay'] }) => void;
  updateGame: (id: string, patch: Partial<Game>) => void;
  removeGame: (id: string) => void;
  addPlay: (gameId: string, inning: string, text: string) => void;
  // misc
  resetAll: () => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<LeagueData>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const store = useMemo<Store>(
    () => ({
      data,
      addTeam: (t) =>
        setData((d) => ({ ...d, teams: [...d.teams, { ...t, id: makeId('team') }] })),
      updateTeam: (id, patch) =>
        setData((d) => ({
          ...d,
          teams: d.teams.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),
      removeTeam: (id) =>
        setData((d) => ({
          ...d,
          teams: d.teams.filter((t) => t.id !== id),
          players: d.players.filter((p) => p.teamId !== id),
          games: d.games.filter((g) => g.homeId !== id && g.awayId !== id),
        })),
      addPlayer: (p) =>
        setData((d) => ({
          ...d,
          players: [...d.players, { ...p, id: makeId('p'), stats: p.stats ?? emptyStats() }],
        })),
      updatePlayer: (id, patch) =>
        setData((d) => ({
          ...d,
          players: d.players.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      updatePlayerStats: (id, stats) =>
        setData((d) => ({
          ...d,
          players: d.players.map((p) =>
            p.id === id ? { ...p, stats: { ...p.stats, ...stats } } : p,
          ),
        })),
      removePlayer: (id) =>
        setData((d) => ({ ...d, players: d.players.filter((p) => p.id !== id) })),
      addGame: (g) =>
        setData((d) => ({
          ...d,
          games: [...d.games, { ...g, id: makeId('g'), playByPlay: g.playByPlay ?? [] }],
        })),
      updateGame: (id, patch) =>
        setData((d) => ({
          ...d,
          games: d.games.map((g) => (g.id === id ? { ...g, ...patch } : g)),
        })),
      removeGame: (id) =>
        setData((d) => ({ ...d, games: d.games.filter((g) => g.id !== id) })),
      addPlay: (gameId, inning, text) =>
        setData((d) => ({
          ...d,
          games: d.games.map((g) =>
            g.id === gameId ? { ...g, playByPlay: [{ inning, text }, ...g.playByPlay] } : g,
          ),
        })),
      resetAll: () => setData(seedData),
    }),
    [data],
  );

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}

// ---- Computed helpers (derived data) ----

// Batting average = hits / at-bats. Walks are NOT at-bats, so they don't count here.
export const battingAvg = (stats: PlayerStats): number =>
  stats.atBats > 0 ? stats.hits / stats.atBats : 0;

// On-base percentage = (hits + walks) / (at-bats + walks).
export const onBasePct = (stats: PlayerStats): number => {
  const denom = stats.atBats + stats.walks;
  return denom > 0 ? (stats.hits + stats.walks) / denom : 0;
};

export const formatAvg = (avg: number): string =>
  avg.toFixed(3).replace(/^0/, ''); // .375 style

export type Standing = {
  team: Team;
  wins: number;
  losses: number;
  ties: number;
  runsFor: number;
  runsAgainst: number;
};

export function computeStandings(data: LeagueData): Standing[] {
  const table = new Map<string, Standing>();
  for (const team of data.teams) {
    table.set(team.id, { team, wins: 0, losses: 0, ties: 0, runsFor: 0, runsAgainst: 0 });
  }
  for (const g of data.games) {
    if (g.status !== 'final') continue;
    const home = table.get(g.homeId);
    const away = table.get(g.awayId);
    if (!home || !away) continue;
    home.runsFor += g.homeScore;
    home.runsAgainst += g.awayScore;
    away.runsFor += g.awayScore;
    away.runsAgainst += g.homeScore;
    if (g.homeScore > g.awayScore) {
      home.wins++;
      away.losses++;
    } else if (g.homeScore < g.awayScore) {
      away.wins++;
      home.losses++;
    } else {
      home.ties++;
      away.ties++;
    }
  }
  return [...table.values()].sort(
    (a, b) => b.wins - a.wins || a.losses - b.losses || b.runsFor - a.runsFor,
  );
}

export type LeaderCategory = {
  key: string;
  label: string;
  emoji: string;
  // value getter + how to display it
  value: (p: Player) => number;
  display: (p: Player) => string;
  minAtBats?: number;
};

export const leaderCategories: LeaderCategory[] = [
  { key: 'avg', label: 'Batting Average', emoji: '🎯', value: (p) => battingAvg(p.stats), display: (p) => formatAvg(battingAvg(p.stats)), minAtBats: 5 },
  { key: 'obp', label: 'On-Base %', emoji: '🧤', value: (p) => onBasePct(p.stats), display: (p) => formatAvg(onBasePct(p.stats)), minAtBats: 5 },
  { key: 'homeRuns', label: 'Home Runs', emoji: '💥', value: (p) => p.stats.homeRuns, display: (p) => String(p.stats.homeRuns) },
  { key: 'rbi', label: 'Runs Batted In', emoji: '🏃', value: (p) => p.stats.rbi, display: (p) => String(p.stats.rbi) },
  { key: 'hits', label: 'Hits', emoji: '🏏', value: (p) => p.stats.hits, display: (p) => String(p.stats.hits) },
  { key: 'runs', label: 'Runs Scored', emoji: '🏠', value: (p) => p.stats.runs, display: (p) => String(p.stats.runs) },
  { key: 'walks', label: 'Walks', emoji: '🚶', value: (p) => p.stats.walks, display: (p) => String(p.stats.walks) },
  { key: 'stolenBases', label: 'Stolen Bases', emoji: '💨', value: (p) => p.stats.stolenBases, display: (p) => String(p.stats.stolenBases) },
];

export function topPlayers(players: Player[], cat: LeaderCategory, limit = 5): Player[] {
  return [...players]
    .filter((p) => (cat.minAtBats ? p.stats.atBats >= cat.minAtBats : true))
    .filter((p) => cat.value(p) > 0)
    .sort((a, b) => cat.value(b) - cat.value(a))
    .slice(0, limit);
}
