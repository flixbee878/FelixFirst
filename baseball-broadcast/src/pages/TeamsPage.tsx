import { useStore, computeStandings, battingAvg, formatAvg } from '../store';

export function TeamsPage() {
  const { data } = useStore();
  const standings = computeStandings(data);
  const recordOf = (teamId: string) => {
    const s = standings.find((x) => x.team.id === teamId);
    return s ? `${s.wins}-${s.losses}${s.ties ? `-${s.ties}` : ''}` : '0-0';
  };

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl tracking-wide">🧢 Teams &amp; Rosters</h1>

      {data.teams.length === 0 && (
        <p className="rounded-2xl border-4 border-dashed border-black bg-white p-6 text-center font-bold">
          No teams yet! Add some in the 🎛️ Score Booth.
        </p>
      )}

      {data.teams.map((team) => {
        const roster = data.players.filter((p) => p.teamId === team.id);
        return (
          <section key={team.id} className="rounded-3xl border-4 border-black bg-white shadow-cartoon">
            <div
              className="flex flex-wrap items-center justify-between gap-2 rounded-t-2xl border-b-4 border-black p-4"
              style={{ backgroundColor: team.color }}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{team.emoji}</span>
                <div>
                  <h2 className="font-display text-3xl tracking-wide text-white drop-shadow-[2px_2px_0_#000]">
                    {team.name}
                  </h2>
                  <p className="text-sm font-bold text-white/90">“{team.motto}”</p>
                </div>
              </div>
              <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-sm font-bold">
                Record: {recordOf(team.id)}
              </span>
            </div>

            {roster.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">No players on this team yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Player</th>
                      <th className="px-3 py-2">Pos</th>
                      <th className="px-3 py-2 text-center">AVG</th>
                      <th className="px-3 py-2 text-center">H</th>
                      <th className="px-3 py-2 text-center">HR</th>
                      <th className="px-3 py-2 text-center">RBI</th>
                      <th className="px-3 py-2 text-center">SB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roster.map((p, i) => (
                      <tr key={p.id} className={i % 2 ? 'bg-gray-50' : ''}>
                        <td className="px-3 py-2 font-bold text-gray-400">{p.number}</td>
                        <td className="px-3 py-2 font-bold">{p.name}</td>
                        <td className="px-3 py-2 text-gray-600">{p.position}</td>
                        <td className="px-3 py-2 text-center font-bold">{formatAvg(battingAvg(p.stats))}</td>
                        <td className="px-3 py-2 text-center">{p.stats.hits}</td>
                        <td className="px-3 py-2 text-center">{p.stats.homeRuns}</td>
                        <td className="px-3 py-2 text-center">{p.stats.rbi}</td>
                        <td className="px-3 py-2 text-center">{p.stats.stolenBases}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
