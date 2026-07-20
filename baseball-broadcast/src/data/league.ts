// ⚾ Data model + starting sample data for House League LIVE.
// You can change all of this later right inside the app (Score Booth page),
// and it saves automatically in your browser.

export type PlayerStats = {
  atBats: number; // times up to bat, NOT counting walks (strikeouts DO count)
  hits: number;
  walks: number; // bases on balls — do not count as at-bats
  runs: number;
  rbi: number;
  homeRuns: number;
  stolenBases: number;
  strikeouts: number; // times the batter struck out
};

export type Player = {
  id: string;
  name: string;
  number: number;
  teamId: string;
  position: string;
  stats: PlayerStats;
};

export type Team = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  motto: string;
};

export type PlayByPlay = {
  inning: string;
  text: string;
};

export type Game = {
  id: string;
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'final' | 'upcoming';
  inning: string; // e.g. "Bottom 6th" or "Sat 10:00 AM"
  field: string;
  announcerIds: string[];
  playByPlay: PlayByPlay[];
};

export type Announcer = {
  id: string;
  name: string;
  age: number;
  emoji: string;
  role: string;
  catchphrase: string;
  favoriteTeamId: string;
  bio: string;
};

export type LeagueData = {
  teams: Team[];
  players: Player[];
  games: Game[];
  announcers: Announcer[];
};

export const emptyStats = (): PlayerStats => ({
  atBats: 0,
  hits: 0,
  walks: 0,
  runs: 0,
  rbi: 0,
  homeRuns: 0,
  stolenBases: 0,
  strikeouts: 0,
});

// A tiny helper to make unique ids.
export const makeId = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// ---- Starting sample data (you can edit or delete all of it) ----

const s = (o: Partial<PlayerStats>): PlayerStats => ({ ...emptyStats(), ...o });

export const seedData: LeagueData = {
  teams: [
    { id: 'comets', name: 'Comet Crushers', emoji: '☄️', color: '#FF3B30', motto: 'We hit it out of this world!' },
    { id: 'thunder', name: 'Thunder Ducks', emoji: '⚡', color: '#007AFF', motto: 'Quack loud, swing loud!' },
    { id: 'foxes', name: 'Fire Foxes', emoji: '🦊', color: '#FF8C00', motto: 'Sneaky fast, super smart!' },
    { id: 'sharks', name: 'Sluggin Sharks', emoji: '🦈', color: '#00C8FF', motto: 'Big bites, big hits!' },
  ],
  players: [
    { id: 'p1', name: 'Maya R.', number: 7, teamId: 'comets', position: 'Pitcher', stats: s({ atBats: 34, hits: 14, walks: 6, runs: 10, rbi: 12, homeRuns: 3, stolenBases: 4, strikeouts: 5 }) },
    { id: 'p2', name: 'Leo P.', number: 12, teamId: 'comets', position: 'Catcher', stats: s({ atBats: 31, hits: 11, walks: 4, runs: 7, rbi: 15, homeRuns: 5, stolenBases: 1, strikeouts: 8 }) },
    { id: 'p3', name: 'Ava T.', number: 3, teamId: 'comets', position: 'Shortstop', stats: s({ atBats: 30, hits: 12, walks: 9, runs: 14, rbi: 6, homeRuns: 1, stolenBases: 18, strikeouts: 3 }) },
    { id: 'p4', name: 'Ethan W.', number: 1, teamId: 'thunder', position: 'Pitcher', stats: s({ atBats: 28, hits: 8, walks: 3, runs: 6, rbi: 5, homeRuns: 1, stolenBases: 2, strikeouts: 9 }) },
    { id: 'p5', name: 'Zoe L.', number: 24, teamId: 'thunder', position: 'Second Base', stats: s({ atBats: 33, hits: 13, walks: 7, runs: 11, rbi: 9, homeRuns: 2, stolenBases: 9, strikeouts: 6 }) },
    { id: 'p6', name: 'Kai B.', number: 15, teamId: 'thunder', position: 'Left Field', stats: s({ atBats: 29, hits: 9, walks: 5, runs: 8, rbi: 11, homeRuns: 4, stolenBases: 3, strikeouts: 11 }) },
    { id: 'p7', name: 'Emma S.', number: 17, teamId: 'foxes', position: 'Catcher', stats: s({ atBats: 30, hits: 11, walks: 8, runs: 9, rbi: 10, homeRuns: 2, stolenBases: 5, strikeouts: 4 }) },
    { id: 'p8', name: 'Olivia G.', number: 6, teamId: 'foxes', position: 'Center Field', stats: s({ atBats: 32, hits: 10, walks: 10, runs: 12, rbi: 7, homeRuns: 3, stolenBases: 12, strikeouts: 7 }) },
    { id: 'p9', name: 'Max J.', number: 13, teamId: 'sharks', position: 'Left Field', stats: s({ atBats: 31, hits: 12, walks: 5, runs: 9, rbi: 14, homeRuns: 6, stolenBases: 2, strikeouts: 10 }) },
    { id: 'p10', name: 'Lily O.', number: 10, teamId: 'sharks', position: 'Third Base', stats: s({ atBats: 30, hits: 10, walks: 6, runs: 8, rbi: 20, homeRuns: 3, stolenBases: 4, strikeouts: 9 }) },
  ],
  announcers: [
    { id: 'jordan', name: 'Jordan "The Voice" B.', age: 12, emoji: '🎙️', role: 'Play-by-Play Announcer', catchphrase: 'And it is OUTTA HERE, folks!', favoriteTeamId: 'comets', bio: 'Jordan calls every pitch like it is the World Series. Loud, fun, and always excited!' },
    { id: 'priya', name: 'Priya "Stats" K.', age: 11, emoji: '📊', role: 'Color Commentator', catchphrase: 'Now HERE is a fun fact...', favoriteTeamId: 'foxes', bio: 'Priya knows every batting average and loves teaching fans the smart parts of the game.' },
    { id: 'marcus', name: 'Marcus "Hustle" T.', age: 13, emoji: '🏃', role: 'On-the-Field Reporter', catchphrase: 'I am down here with the champs!', favoriteTeamId: 'thunder', bio: 'Marcus runs to the dugout to interview players right after the big plays.' },
  ],
  games: [
    {
      id: 'g1', homeId: 'comets', awayId: 'thunder', homeScore: 6, awayScore: 5, status: 'live',
      inning: 'Bottom 6th', field: 'Sunnydale Diamond #2', announcerIds: ['jordan', 'priya'],
      playByPlay: [
        { inning: 'Bot 6th', text: 'Maya R. steps up with 2 on base... and CRUSHES it to deep center! Comet Crushers take the lead 6-5!' },
        { inning: 'Top 6th', text: 'Thunder Ducks tie it up on a sneaky bunt from Zoe L. What a play!' },
        { inning: 'Bot 5th', text: 'Leo P. throws a runner out at second. Defense wins games!' },
      ],
    },
    {
      id: 'g2', homeId: 'foxes', awayId: 'sharks', homeScore: 9, awayScore: 4, status: 'final',
      inning: 'Final', field: 'Riverside Field #1', announcerIds: ['marcus', 'priya'],
      playByPlay: [
        { inning: 'Final', text: 'Fire Foxes win 9-4! Emma S. named player of the game with 3 hits.' },
        { inning: 'Bot 5th', text: 'Olivia G. robs a home run at the wall! The crowd goes wild!' },
      ],
    },
    {
      id: 'g3', homeId: 'thunder', awayId: 'foxes', homeScore: 0, awayScore: 0, status: 'upcoming',
      inning: 'Sat 10:00 AM', field: 'Sunnydale Diamond #1', announcerIds: ['jordan', 'marcus'], playByPlay: [],
    },
  ],
};
