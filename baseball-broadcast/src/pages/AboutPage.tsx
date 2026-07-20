export function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl tracking-wide">⭐ About This App</h1>

      <div className="rounded-3xl border-4 border-black bg-cartoon-purple p-6 text-white shadow-cartoon-lg">
        <p className="text-2xl font-bold">Hi, I&apos;m the kid who made House League LIVE! 👋</p>
        <p className="mt-3 text-lg">
          I love baseball and I love broadcasting, so I built this website to give
          house league players their own TV-style show. Kid announcers call the games,
          kid players get their stats tracked, and everyone gets to be a star.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <InfoCard emoji="🎙️" title="Kid Announcers" text="Our crew calls every play just like the pros on TV." />
        <InfoCard emoji="⚾" title="Kid Players" text="Real house league teams, rosters, and highlights." />
        <InfoCard emoji="📊" title="Real Stats" text="I enter the numbers and the app builds the leaderboards." />
      </div>

      <div className="rounded-2xl border-4 border-black bg-white p-5 shadow-cartoon">
        <h2 className="font-display text-2xl tracking-wide">How the stats work 🤓</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
          <li><b>Batting Average</b> = hits ÷ at-bats. Strikeouts count as at-bats, walks do NOT.</li>
          <li><b>On-Base %</b> = (hits + walks) ÷ (at-bats + walks) — walks help this one!</li>
          <li><b>Standings</b> come from every game marked “Final.” Win = 2 more runs than the other team? Nope — just more runs!</li>
          <li>Everything I type saves right in the browser, so it stays even after I close the tab.</li>
        </ul>
      </div>

      <p className="text-center text-sm text-gray-600">Thanks for visiting. Now go play ball! ⚾</p>
    </div>
  );
}

function InfoCard({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border-4 border-black bg-white p-4 text-center shadow-cartoon">
      <div className="text-4xl">{emoji}</div>
      <h3 className="mt-2 font-display text-xl tracking-wide">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{text}</p>
    </div>
  );
}
