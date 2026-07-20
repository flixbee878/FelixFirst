import { useState } from 'react';
import { useStore, battingAvg, onBasePct, formatAvg } from '../store';
import { emptyStats, type PlayerStats } from '../data/league';

type Tab = 'players' | 'teams' | 'games';

export function ScoreBoothPage() {
  const [tab, setTab] = useState<Tab>('players');
  const { resetAll } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl tracking-wide">🎛️ Score Booth</h1>
        <p className="mt-1 text-sm text-gray-700">
          This is your control room. Add teams and players, then type in each player&apos;s
          stats after a game. Averages, standings, and leaderboards update automatically and save
          in your browser.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['players', 'teams', 'games'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border-2 border-black px-4 py-1 text-sm font-bold shadow-cartoon-sm ${
              tab === t ? 'bg-cartoon-blue text-white' : 'bg-white'
            }`}
          >
            {t === 'players' ? '⚾ Players & Stats' : t === 'teams' ? '🧢 Teams' : '📺 Games'}
          </button>
        ))}
      </div>

      {tab === 'players' && <PlayersTab />}
      {tab === 'teams' && <TeamsTab />}
      {tab === 'games' && <GamesTab />}

      <div className="border-t-4 border-dashed border-black pt-4">
        <button
          onClick={() => {
            if (confirm('Reset ALL data back to the starting sample teams and players? This cannot be undone.')) {
              resetAll();
            }
          }}
          className="rounded-full border-2 border-black bg-cartoon-red px-4 py-1 text-sm font-bold text-white shadow-cartoon-sm"
        >
          ♻️ Reset everything to sample data
        </button>
      </div>
    </div>
  );
}

// ---------- shared little inputs ----------

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="flex flex-col items-center text-xs font-bold">
      <span className="text-gray-500">{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
        className="w-16 rounded-lg border-2 border-black px-1 py-1 text-center"
      />
    </label>
  );
}

const inputClass = 'rounded-lg border-2 border-black px-2 py-1 text-sm';

// ---------- Players tab ----------

function PlayersTab() {
  const { data, addPlayer, updatePlayerStats, updatePlayer, removePlayer } = useStore();
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  const [teamId, setTeamId] = useState(data.teams[0]?.id ?? '');
  const [position, setPosition] = useState('');

  const statKeys: { key: keyof PlayerStats; label: string }[] = [
    { key: 'atBats', label: 'AB' },
    { key: 'hits', label: 'H' },
    { key: 'walks', label: 'BB' },
    { key: 'runs', label: 'R' },
    { key: 'rbi', label: 'RBI' },
    { key: 'homeRuns', label: 'HR' },
    { key: 'stolenBases', label: 'SB' },
    { key: 'strikeouts', label: 'K' },
  ];

  const submit = () => {
    if (!name.trim() || !teamId) return;
    addPlayer({ name: name.trim(), number, teamId, position: position.trim() || 'Player', stats: emptyStats() });
    setName('');
    setNumber(0);
    setPosition('');
  };

  return (
    <div className="space-y-6">
      {/* Add player */}
      <div className="rounded-2xl border-4 border-black bg-white p-4 shadow-cartoon">
        <h2 className="mb-2 font-display text-2xl">➕ Add a Player</h2>
        {data.teams.length === 0 ? (
          <p className="text-sm text-gray-500">Add a team first on the Teams tab.</p>
        ) : (
          <div className="flex flex-wrap items-end gap-2">
            <input className={inputClass} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={`${inputClass} w-16`} type="number" min={0} placeholder="#" value={number || ''} onChange={(e) => setNumber(Math.max(0, Math.floor(Number(e.target.value) || 0)))} />
            <input className={inputClass} placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
            <select className={inputClass} value={teamId} onChange={(e) => setTeamId(e.target.value)}>
              {data.teams.map((t) => (
                <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
              ))}
            </select>
            <button onClick={submit} className="rounded-full border-2 border-black bg-cartoon-green px-4 py-1 text-sm font-bold text-white shadow-cartoon-sm">
              Add
            </button>
          </div>
        )}
      </div>

      {/* Per-team stat entry */}
      {data.teams.map((team) => {
        const roster = data.players.filter((p) => p.teamId === team.id);
        if (roster.length === 0) return null;
        return (
          <div key={team.id} className="rounded-2xl border-4 border-black bg-white p-4 shadow-cartoon">
            <h3 className="mb-3 font-display text-2xl">{team.emoji} {team.name}</h3>
            <div className="space-y-3">
              {roster.map((p) => (
                <div key={p.id} className="rounded-xl border-2 border-black bg-gray-50 p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold">#{p.number} {p.name} <span className="text-xs text-gray-500">({p.position})</span></span>
                    <span className="flex items-center gap-3 text-sm">
                      <span className="rounded-lg border-2 border-black bg-cartoon-yellow px-2 py-0.5 font-bold">
                        AVG {formatAvg(battingAvg(p.stats))}
                      </span>
                      <span className="rounded-lg border-2 border-black bg-cartoon-cyan px-2 py-0.5 font-bold">
                        OBP {formatAvg(onBasePct(p.stats))}
                      </span>
                      <button onClick={() => removePlayer(p.id)} className="text-cartoon-red underline">remove</button>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {statKeys.map(({ key, label }) => (
                      <NumField
                        key={key}
                        label={label}
                        value={p.stats[key]}
                        onChange={(n) => updatePlayerStats(p.id, { [key]: n })}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <button onClick={() => { const nm = prompt('Player name', p.name); if (nm) updatePlayer(p.id, { name: nm }); }} className="underline">rename</button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              AB = at-bats (not walks) · H = hits · BB = walks · R = runs · RBI · HR · SB = steals · K = strikeouts
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Teams tab ----------

const EMOJI_CHOICES = ['⚾', '☄️', '⚡', '🦊', '🦈', '🐯', '🦅', '🐍', '🐺', '🔥', '⭐', '🚀', '🐲', '🦁', '🐻'];
const COLOR_CHOICES = ['#FF3B30', '#007AFF', '#FF8C00', '#00C8FF', '#34C759', '#AF52DE', '#FF2D92', '#1A1A2E'];

function TeamsTab() {
  const { data, addTeam, updateTeam, removeTeam } = useStore();
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('⚾');
  const [color, setColor] = useState(COLOR_CHOICES[0]);
  const [motto, setMotto] = useState('');

  const submit = () => {
    if (!name.trim()) return;
    addTeam({ name: name.trim(), emoji, color, motto: motto.trim() || 'Play hard, have fun!' });
    setName('');
    setMotto('');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-4 border-black bg-white p-4 shadow-cartoon">
        <h2 className="mb-2 font-display text-2xl">➕ Add a Team</h2>
        <div className="flex flex-wrap items-end gap-2">
          <input className={inputClass} placeholder="Team name" value={name} onChange={(e) => setName(e.target.value)} />
          <select className={inputClass} value={emoji} onChange={(e) => setEmoji(e.target.value)}>
            {EMOJI_CHOICES.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-12 rounded-lg border-2 border-black" />
          <input className={inputClass} placeholder="Motto" value={motto} onChange={(e) => setMotto(e.target.value)} />
          <button onClick={submit} className="rounded-full border-2 border-black bg-cartoon-green px-4 py-1 text-sm font-bold text-white shadow-cartoon-sm">
            Add
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {data.teams.map((t) => (
          <div key={t.id} className="rounded-2xl border-4 border-black bg-white p-4 shadow-cartoon">
            <div className="flex items-center gap-2">
              <select value={t.emoji} onChange={(e) => updateTeam(t.id, { emoji: e.target.value })} className="rounded-lg border-2 border-black px-1 py-1">
                {EMOJI_CHOICES.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
              <input className={`${inputClass} flex-1`} value={t.name} onChange={(e) => updateTeam(t.id, { name: e.target.value })} />
              <input type="color" value={t.color} onChange={(e) => updateTeam(t.id, { color: e.target.value })} className="h-8 w-10 rounded border-2 border-black" />
            </div>
            <input className={`${inputClass} mt-2 w-full`} value={t.motto} onChange={(e) => updateTeam(t.id, { motto: e.target.value })} />
            <button
              onClick={() => { if (confirm(`Delete ${t.name}? Their players and games will be removed too.`)) removeTeam(t.id); }}
              className="mt-2 text-xs text-cartoon-red underline"
            >
              delete team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Games tab ----------

function GamesTab() {
  const { data, addGame, updateGame, removeGame, addPlay } = useStore();
  const [homeId, setHomeId] = useState(data.teams[0]?.id ?? '');
  const [awayId, setAwayId] = useState(data.teams[1]?.id ?? '');
  const [field, setField] = useState('');

  const submit = () => {
    if (!homeId || !awayId || homeId === awayId) return;
    addGame({
      homeId, awayId, homeScore: 0, awayScore: 0, status: 'upcoming',
      inning: 'Scheduled', field: field.trim() || 'Home Field', announcerIds: [],
    });
    setField('');
  };

  const teamName = (id: string) => data.teams.find((t) => t.id === id);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-4 border-black bg-white p-4 shadow-cartoon">
        <h2 className="mb-2 font-display text-2xl">➕ Add a Game</h2>
        {data.teams.length < 2 ? (
          <p className="text-sm text-gray-500">Add at least two teams first.</p>
        ) : (
          <div className="flex flex-wrap items-end gap-2">
            <select className={inputClass} value={awayId} onChange={(e) => setAwayId(e.target.value)}>
              {data.teams.map((t) => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
            </select>
            <span className="font-bold">@</span>
            <select className={inputClass} value={homeId} onChange={(e) => setHomeId(e.target.value)}>
              {data.teams.map((t) => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
            </select>
            <input className={inputClass} placeholder="Field" value={field} onChange={(e) => setField(e.target.value)} />
            <button onClick={submit} className="rounded-full border-2 border-black bg-cartoon-green px-4 py-1 text-sm font-bold text-white shadow-cartoon-sm">
              Add
            </button>
          </div>
        )}
      </div>

      {data.games.map((g) => (
        <div key={g.id} className="rounded-2xl border-4 border-black bg-white p-4 shadow-cartoon">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold">{teamName(g.awayId)?.emoji} {teamName(g.awayId)?.name}</span>
            <NumberBox value={g.awayScore} onChange={(n) => updateGame(g.id, { awayScore: n })} />
            <span className="font-bold">@ {teamName(g.homeId)?.emoji} {teamName(g.homeId)?.name}</span>
            <NumberBox value={g.homeScore} onChange={(n) => updateGame(g.id, { homeScore: n })} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <select className={inputClass} value={g.status} onChange={(e) => updateGame(g.id, { status: e.target.value as 'live' | 'final' | 'upcoming' })}>
              <option value="upcoming">Upcoming</option>
              <option value="live">🔴 Live</option>
              <option value="final">Final</option>
            </select>
            <input className={`${inputClass} w-32`} value={g.inning} onChange={(e) => updateGame(g.id, { inning: e.target.value })} placeholder="Inning / time" />
            <input className={`${inputClass} flex-1`} value={g.field} onChange={(e) => updateGame(g.id, { field: e.target.value })} placeholder="Field" />
          </div>

          {/* announcers */}
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {data.announcers.map((a) => {
              const on = g.announcerIds.includes(a.id);
              return (
                <button
                  key={a.id}
                  onClick={() => updateGame(g.id, { announcerIds: on ? g.announcerIds.filter((x) => x !== a.id) : [...g.announcerIds, a.id] })}
                  className={`rounded-full border-2 border-black px-2 py-0.5 font-bold ${on ? 'bg-cartoon-yellow' : 'bg-white'}`}
                >
                  {a.emoji} {a.name.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* add play-by-play */}
          <PlayAdder onAdd={(inning, text) => addPlay(g.id, inning, text)} />
          {g.playByPlay.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs text-gray-600">
              {g.playByPlay.slice(0, 3).map((p, i) => (
                <li key={i}><b>{p.inning}:</b> {p.text}</li>
              ))}
            </ul>
          )}

          <button onClick={() => { if (confirm('Delete this game?')) removeGame(g.id); }} className="mt-2 text-xs text-cartoon-red underline">
            delete game
          </button>
        </div>
      ))}
    </div>
  );
}

function NumberBox({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <input
      type="number"
      min={0}
      value={value}
      onChange={(e) => onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
      className="w-16 rounded-lg border-2 border-black px-2 py-1 text-center font-bold"
    />
  );
}

function PlayAdder({ onAdd }: { onAdd: (inning: string, text: string) => void }) {
  const [inning, setInning] = useState('');
  const [text, setText] = useState('');
  return (
    <div className="mt-2 flex flex-wrap items-end gap-2">
      <input className={`${inputClass} w-24`} placeholder="Inning" value={inning} onChange={(e) => setInning(e.target.value)} />
      <input className={`${inputClass} flex-1`} placeholder="What happened? (play-by-play)" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => { if (text.trim()) { onAdd(inning.trim() || 'Play', text.trim()); setText(''); setInning(''); } }}
        className="rounded-full border-2 border-black bg-cartoon-blue px-3 py-1 text-xs font-bold text-white shadow-cartoon-sm"
      >
        Add call
      </button>
    </div>
  );
}
