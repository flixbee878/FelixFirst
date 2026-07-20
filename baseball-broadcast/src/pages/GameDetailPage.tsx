import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store';

export function GameDetailPage() {
  const { gameId } = useParams();
  const { data } = useStore();
  const game = data.games.find((g) => g.id === gameId);

  if (!game) {
    return (
      <div className="space-y-4">
        <p className="font-bold">That game could not be found.</p>
        <Link to="/broadcasts" className="text-cartoon-blue underline">← Back to broadcasts</Link>
      </div>
    );
  }

  const home = data.teams.find((t) => t.id === game.homeId);
  const away = data.teams.find((t) => t.id === game.awayId);
  const announcers = game.announcerIds
    .map((id) => data.announcers.find((a) => a.id === id))
    .filter(Boolean);
  const played = game.status !== 'upcoming';

  return (
    <div className="space-y-6">
      <Link to="/broadcasts" className="text-sm font-bold text-cartoon-blue underline">
        ← All broadcasts
      </Link>

      {/* Scoreboard */}
      <div className="rounded-3xl border-4 border-black bg-cartoon-dark p-6 text-white shadow-cartoon-lg">
        <div className="mb-2 text-center text-sm font-bold uppercase tracking-widest text-cartoon-yellow">
          {game.status === 'live' ? '🔴 On Air' : game.status === 'final' ? 'Final' : 'Upcoming'} · {game.inning}
        </div>
        <div className="flex items-center justify-around">
          <TeamScore emoji={away?.emoji} name={away?.name} score={played ? game.awayScore : null} />
          <span className="font-display text-3xl text-gray-400">vs</span>
          <TeamScore emoji={home?.emoji} name={home?.name} score={played ? game.homeScore : null} />
        </div>
        <p className="mt-4 text-center text-sm text-gray-300">📍 {game.field}</p>
      </div>

      {/* Announcers */}
      {announcers.length > 0 && (
        <div className="rounded-2xl border-4 border-black bg-cartoon-yellow p-4 shadow-cartoon">
          <h2 className="mb-2 font-display text-2xl">🎙️ In the Booth</h2>
          <div className="flex flex-wrap gap-3">
            {announcers.map((a) => (
              <span key={a!.id} className="rounded-full border-2 border-black bg-white px-3 py-1 text-sm font-bold">
                {a!.emoji} {a!.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Play by play */}
      <div>
        <h2 className="mb-3 font-display text-3xl tracking-wide">📣 Play-by-Play</h2>
        {game.playByPlay.length === 0 ? (
          <p className="rounded-2xl border-4 border-dashed border-black bg-white p-4 font-bold">
            No calls yet. The announcers will add plays here as the game happens!
          </p>
        ) : (
          <ol className="space-y-3">
            {game.playByPlay.map((p, i) => (
              <li key={i} className="flex gap-3 rounded-2xl border-4 border-black bg-white p-4 shadow-cartoon-sm">
                <span className="shrink-0 rounded-lg border-2 border-black bg-cartoon-cyan px-2 py-1 text-xs font-bold">
                  {p.inning}
                </span>
                <span>{p.text}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function TeamScore({ emoji, name, score }: { emoji?: string; name?: string; score: number | null }) {
  return (
    <div className="text-center">
      <div className="text-4xl">{emoji ?? '⚾'}</div>
      <div className="mt-1 max-w-[8rem] text-sm font-bold">{name ?? 'TBD'}</div>
      <div className="font-display text-5xl">{score === null ? '—' : score}</div>
    </div>
  );
}
