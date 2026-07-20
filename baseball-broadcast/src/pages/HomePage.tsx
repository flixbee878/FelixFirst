import { Link } from 'react-router-dom';
import { GameCard } from '../components/GameCard';
import { useStore, computeStandings } from '../store';

export function HomePage() {
  const { data } = useStore();
  const liveGame = data.games.find((g) => g.status === 'live');
  const upcoming = data.games.filter((g) => g.status === 'upcoming');
  const standings = computeStandings(data);

  const announcerName = (id: string) => data.announcers.find((a) => a.id === id)?.name ?? id;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-3xl border-4 border-black bg-cartoon-blue p-6 text-center text-white shadow-cartoon-lg">
        <h1 className="font-display text-4xl tracking-wide drop-shadow-[3px_3px_0_#000] sm:text-5xl">
          Welcome to House League LIVE! ⚾
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg">
          The #1 broadcast home for house league baseball. Kid announcers, kid
          players, real stats and leaderboards. Grab your popcorn!
        </p>
      </section>

      {/* Live now */}
      {liveGame && (
        <section>
          <h2 className="mb-3 font-display text-3xl tracking-wide">🔴 On Air Now</h2>
          <div className="rounded-3xl border-4 border-black bg-white p-5 shadow-cartoon">
            <GameCard game={liveGame} />
            <div className="mt-4 rounded-2xl border-2 border-black bg-cartoon-yellow p-3">
              <p className="text-sm font-bold">🎙️ Calling the game:</p>
              <p className="text-sm">{liveGame.announcerIds.map(announcerName).join(' & ')}</p>
            </div>
            <Link
              to={`/broadcasts/${liveGame.id}`}
              className="mt-4 inline-block rounded-full border-2 border-black bg-cartoon-red px-5 py-2 font-bold text-white shadow-cartoon-sm transition-transform hover:-translate-y-0.5"
            >
              ▶ Watch the play-by-play
            </Link>
          </div>
        </section>
      )}

      {/* Coming up */}
      {upcoming.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-3xl tracking-wide">📅 Coming Up</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {upcoming.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}

      {/* Standings */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-3xl tracking-wide">🏆 Standings</h2>
          <Link to="/leaderboards" className="text-sm font-bold text-cartoon-blue underline">
            See player leaders →
          </Link>
        </div>
        <div className="overflow-x-auto rounded-2xl border-4 border-black bg-white shadow-cartoon">
          <table className="w-full text-left">
            <thead className="bg-cartoon-dark text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Team</th>
                <th className="px-4 py-2 text-center">W</th>
                <th className="px-4 py-2 text-center">L</th>
                <th className="px-4 py-2 text-center">T</th>
                <th className="px-4 py-2 text-center">Runs</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s, i) => (
                <tr key={s.team.id} className={i % 2 ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-2 font-bold text-gray-400">{i + 1}</td>
                  <td className="px-4 py-2 font-bold">
                    {s.team.emoji} {s.team.name}
                  </td>
                  <td className="px-4 py-2 text-center font-bold text-cartoon-green">{s.wins}</td>
                  <td className="px-4 py-2 text-center font-bold text-cartoon-red">{s.losses}</td>
                  <td className="px-4 py-2 text-center font-bold text-gray-500">{s.ties}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-500">
                    {s.runsFor}-{s.runsAgainst}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-600">
          Standings update automatically from games you mark as “Final” in the Score Booth.
        </p>
      </section>
    </div>
  );
}
