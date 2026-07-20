import { Link } from 'react-router-dom';
import type { Game, Team } from '../data/league';
import { useStore } from '../store';

const statusStyle: Record<Game['status'], string> = {
  live: 'bg-cartoon-red text-white animate-pulse',
  final: 'bg-cartoon-dark text-white',
  upcoming: 'bg-cartoon-yellow text-black',
};

const statusLabel: Record<Game['status'], string> = {
  live: '🔴 ON AIR',
  final: 'FINAL',
  upcoming: 'UPCOMING',
};

export function GameCard({ game }: { game: Game }) {
  const { data } = useStore();
  const home = data.teams.find((t) => t.id === game.homeId);
  const away = data.teams.find((t) => t.id === game.awayId);
  const played = game.status !== 'upcoming';

  return (
    <Link
      to={`/broadcasts/${game.id}`}
      className="block rounded-2xl border-4 border-black bg-white p-4 shadow-cartoon transition-transform hover:-translate-y-1"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className={`rounded-full border-2 border-black px-3 py-0.5 text-xs font-bold ${statusStyle[game.status]}`}>
          {statusLabel[game.status]}
        </span>
        <span className="text-xs font-bold text-gray-500">{game.inning}</span>
      </div>

      <div className="space-y-2">
        <TeamRow team={away} score={played ? game.awayScore : null} />
        <TeamRow team={home} score={played ? game.homeScore : null} />
      </div>

      <p className="mt-3 text-xs font-bold text-gray-500">📍 {game.field}</p>
    </Link>
  );
}

function TeamRow({ team, score }: { team: Team | undefined; score: number | null }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 font-bold">
        <span className="text-2xl">{team?.emoji ?? '⚾'}</span>
        {team?.name ?? 'Unknown Team'}
      </span>
      <span className="font-display text-2xl">{score === null ? '—' : score}</span>
    </div>
  );
}
