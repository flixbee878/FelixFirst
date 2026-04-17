import { Link, useLocation } from 'react-router-dom';
import { useGame } from '../../store/GameContext';
import { getRankName, getRankColor } from '../../constants/ranks';
import { WINS_PER_RANK } from '../../constants/ranks';
import { AvatarSVG } from '../avatar/AvatarSVG';

export const NavBar = () => {
  const { profile, avatarConfig, isPro, signOut } = useGame();
  const location = useLocation();
  const rankColor = getRankColor(profile.rank);

  const navLinks = [
    { to: '/', label: '🏠 Home' },
    { to: '/lessons', label: '📚 Lessons' },
    { to: '/game', label: '⚔️ Battle!' },
    { to: '/minigames', label: '🎮 Mini Games' },
    { to: '/avatar', label: '🎨 Avatar' },
    { to: '/profile', label: '👤 Profile' },
    { to: '/pro', label: isPro ? '⚔️ PRO ✅' : '⚔️ Go Pro!' },
  ];

  return (
    <nav style={{
      background: '#1A1A2E',
      borderBottom: '4px solid #000',
      padding: '6px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '1.8rem',
          color: '#FFE234',
          letterSpacing: '2px',
          textShadow: '2px 2px 0px #000, -1px -1px 0px #FF8C00',
        }}>
          TYPE KNIGHT
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {navLinks.map(({ to, label }) => {
          const isActive = location.pathname === to;
          const isProLink = to === '/pro';
          return (
            <Link key={to} to={to} style={{
              textDecoration: 'none',
              fontFamily: '"Fredoka One", cursive',
              fontSize: '0.9rem',
              padding: '5px 12px',
              border: '3px solid',
              borderRadius: '10px',
              borderColor: isActive ? '#FFE234' : isProLink ? (isPro ? '#34C759' : '#a78bfa') : '#555',
              background: isActive ? '#FFE234' : isProLink ? (isPro ? '#052e16' : '#2e1065') : '#2a2a4a',
              color: isActive ? '#000' : isProLink ? (isPro ? '#34C759' : '#c4b5fd') : '#fff',
              boxShadow: isActive ? '2px 2px 0px #000' : 'none',
            }}>
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right: username + tokens + rank + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Username chip */}
        <div style={{
          background: isPro ? 'linear-gradient(135deg,#1a3a1a,#0a2a0a)' : '#2a2a4a',
          border: `3px solid ${isPro ? '#34C759' : '#555'}`,
          borderRadius: '10px',
          padding: '3px 10px',
          fontFamily: '"Fredoka One", cursive',
          fontSize: '0.85rem',
          color: isPro ? '#34C759' : '#ccc',
          boxShadow: '2px 2px 0px #000',
          whiteSpace: 'nowrap' as const,
        }}>
          {isPro ? '⚔️ ' : ''}{profile.username}
        </div>

        {/* Token count */}
        <div style={{
          background: '#FFE234',
          border: '3px solid #000',
          borderRadius: '10px',
          padding: '3px 10px',
          boxShadow: '2px 2px 0px #000',
          fontFamily: '"Bangers", cursive',
          fontSize: '1rem',
          color: '#000',
        }}>
          🪙 {profile.tokens}
        </div>

        {/* Rank badge */}
        <div style={{
          background: rankColor,
          border: '3px solid #000',
          borderRadius: '10px',
          padding: '3px 10px',
          boxShadow: '2px 2px 0px #000',
          fontFamily: '"Fredoka One", cursive',
          fontSize: '0.8rem',
          color: '#000',
        }}>
          {getRankName(profile.rank)} {profile.winsInCurrentRank}/{WINS_PER_RANK}⭐
        </div>

        {/* Sign out */}
        <button onClick={() => signOut()} style={{
          background: '#2a2a4a', border: '2px solid #555', borderRadius: '8px',
          padding: '4px 10px', fontFamily: '"Fredoka One", cursive', fontSize: '0.8rem',
          color: '#aaa', cursor: 'pointer',
        }}>
          🚪 Out
        </button>

        {/* Mini avatar */}
        <Link to="/avatar" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{
            width: '44px',
            height: '44px',
            border: '3px solid #FFE234',
            borderRadius: '50%',
            overflow: 'hidden',
            background: '#87CEEB',
            boxShadow: '2px 2px 0px #000',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
            <AvatarSVG config={avatarConfig} size={52} animate="none" />
          </div>
        </Link>
      </div>
    </nav>
  );
};
