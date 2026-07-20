import { GameCard } from '../components/GameCard';
import { useStore } from '../store';

export function BroadcastsPage() {
  const { data } = useStore();
  const order = { live: 0, upcoming: 1, final: 2 } as const;
  const games = [...data.games].sort((a, b) => order[a.status] - order[b.status]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl tracking-wide">⚾ All Broadcasts</h1>
      {games.length === 0 ? (
        <p className="rounded-2xl border-4 border-dashed border-black bg-white p-6 text-center font-bold">
          No games yet! Head to the 🎛️ Score Booth to add one.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </div>
  );
}
