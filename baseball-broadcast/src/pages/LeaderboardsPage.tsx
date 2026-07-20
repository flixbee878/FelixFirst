import { useStore, leaderCategories, topPlayers, type LeaderCategory } from '../store';
import type { Player } from '../data/league';

export function LeaderboardsPage() {
  const { data } = useStore();
  const teamName = (id: string) => data.teams.find((t) => t.id === id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl tracking-wide">🏆 League Leaders</h1>
        <p className="mt-1 text-sm text-gray-700">
          Top players in every category. Numbers update the moment you enter stats in the 🎛️ Score Booth.
          Batting Average and On-Base % need at least 5 at-bats to appear.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {leaderCategories.map((cat) => (
          <LeaderCard key={cat.key} cat={cat} players={data.players} teamOf={teamName} />
        ))}
      </div>
    </div>
  );
}

function LeaderCard({
  cat,
  players,
  teamOf,
}: {
  cat: LeaderCategory;
  players: Player[];
  teamOf: (id: string) => { emoji: string; name: string } | undefined;
}) {
  const leaders = topPlayers(players, cat, 5);
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="rounded-2xl border-4 border-black bg-white p-4 shadow-cartoon">
      <h2 className="mb-3 font-display text-2xl tracking-wide">
        {cat.emoji} {cat.label}
      </h2>
      {leaders.length === 0 ? (
        <p className="text-sm text-gray-500">No stats entered yet.</p>
      ) : (
        <ol className="space-y-1">
          {leaders.map((p, i) => (
            <li
              key={p.id}
              className={`flex items-center justify-between rounded-lg px-2 py-1 ${
                i === 0 ? 'bg-cartoon-yellow' : i % 2 ? 'bg-gray-50' : ''
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-6 text-center">{medals[i] ?? i + 1}</span>
                <span className="font-bold">
                  #{p.number} {p.name}
                </span>
                <span className="text-xs text-gray-500">{teamOf(p.teamId)?.emoji}</span>
              </span>
              <span className="font-display text-xl">{cat.display(p)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
