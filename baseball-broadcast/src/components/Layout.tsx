import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: '📺 Live', end: true },
  { to: '/broadcasts', label: '⚾ Broadcasts' },
  { to: '/leaderboards', label: '🏆 Leaders' },
  { to: '/teams', label: '🧢 Teams' },
  { to: '/announcers', label: '🎙️ Announcers' },
  { to: '/booth', label: '🎛️ Score Booth' },
  { to: '/about', label: '⭐ About' },
];

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cartoon-bg font-body text-cartoon-dark">
      <header className="sticky top-0 z-20 border-b-4 border-black bg-cartoon-red">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-3xl">⚾</span>
            <span className="font-display text-2xl tracking-wide text-white drop-shadow-[2px_2px_0_#000] sm:text-3xl">
              House League LIVE
            </span>
          </NavLink>
          <nav className="flex flex-wrap gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-full border-2 border-black px-3 py-1 text-sm font-bold shadow-cartoon-sm transition-transform hover:-translate-y-0.5 ${
                    isActive ? 'bg-cartoon-yellow text-black' : 'bg-white text-black'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t-4 border-black bg-cartoon-dark py-4 text-center text-sm text-white">
        Made with ⚾ and ❤️ by a kid, for kid baseball fans. Play ball!
      </footer>
    </div>
  );
}
