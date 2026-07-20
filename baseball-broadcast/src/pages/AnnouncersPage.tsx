import { useStore } from '../store';

export function AnnouncersPage() {
  const { data } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl tracking-wide">🎙️ The Announcer Crew</h1>
        <p className="mt-1 text-sm text-gray-700">
          Meet the kids who bring every house league game to life!
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {data.announcers.map((a) => {
          const team = data.teams.find((t) => t.id === a.favoriteTeamId);
          return (
            <div key={a.id} className="rounded-2xl border-4 border-black bg-white p-5 shadow-cartoon">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{a.emoji}</span>
                <div>
                  <h2 className="font-display text-2xl leading-tight tracking-wide">{a.name}</h2>
                  <p className="text-sm font-bold text-cartoon-blue">{a.role}</p>
                  <p className="text-xs text-gray-500">Age {a.age}</p>
                </div>
              </div>
              <p className="mt-3 rounded-xl border-2 border-black bg-cartoon-yellow px-3 py-2 text-sm font-bold italic">
                “{a.catchphrase}”
              </p>
              <p className="mt-3 text-sm text-gray-700">{a.bio}</p>
              {team && (
                <p className="mt-3 text-xs font-bold text-gray-500">
                  Favorite team: {team.emoji} {team.name}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
