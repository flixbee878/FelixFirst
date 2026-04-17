import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../store/GameContext';
import { getRankName, getRankColor, RANK_NAMES, WINS_PER_RANK, RANK_COLORS } from '../constants/ranks';
import { AvatarSVG } from '../components/avatar/AvatarSVG';
import type { AvatarConfig } from '../types/avatar';
import type { PlayerProfile } from '../types';

export const ProfilePage = () => {
  const { profile, avatarConfig, resetProfile, importSave, signOut } = useGame();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = JSON.stringify({ profile, avatarConfig }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `typeknight-save-${profile.username}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed.profile && parsed.avatarConfig) {
          importSave(parsed.profile as PlayerProfile, parsed.avatarConfig as AvatarConfig);
          alert('Save imported successfully!');
        } else {
          alert('Invalid save file.');
        }
      } catch { alert('Could not read save file.'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };
  const rankColor = getRankColor(profile.rank);
  const winRate = profile.totalWins + profile.totalLosses > 0
    ? Math.round((profile.totalWins / (profile.totalWins + profile.totalLosses)) * 100)
    : 0;

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '3rem',
          color: '#1A1A2E',
          margin: '0 0 4px',
          letterSpacing: '3px',
          textShadow: '3px 3px 0px rgba(0,0,0,0.2)',
        }}>
          👤 MY PROFILE
        </h1>
      </div>

      {/* Avatar + rank card */}
      <div style={{
        background: rankColor,
        border: '4px solid #000',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: '6px 6px 0px #000',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {/* Avatar preview */}
        <div style={{
          background: 'linear-gradient(180deg, #87CEEB, #4CAF50)',
          border: '3px solid #000',
          borderRadius: '16px',
          padding: '8px 12px 0',
          boxShadow: '3px 3px 0px #000',
        }}>
          <AvatarSVG config={avatarConfig} size={110} animate="idle" />
        </div>
        <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>🏆</div>
        <div style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '1.2rem',
          color: '#000',
          letterSpacing: '2px',
          marginBottom: '4px',
        }}>
          RANK {profile.rank}
        </div>
        <div style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '2.2rem',
          color: '#000',
          letterSpacing: '2px',
          textShadow: '2px 2px 0px rgba(255,255,255,0.3)',
          marginBottom: '16px',
        }}>
          {getRankName(profile.rank)}
        </div>

        {/* Progress stars */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.9rem', color: '#000', marginBottom: '8px', fontWeight: 'bold' }}>
            Progress to next rank ({profile.winsInCurrentRank}/{WINS_PER_RANK} wins)
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {Array.from({ length: WINS_PER_RANK }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '48px',
                  height: '48px',
                  background: i < profile.winsInCurrentRank ? '#FFE234' : 'rgba(0,0,0,0.2)',
                  border: '3px solid #000',
                  borderRadius: '12px',
                  boxShadow: i < profile.winsInCurrentRank ? '3px 3px 0px #000' : 'inset 2px 2px 0px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  transition: 'all 0.3s',
                }}
              >
                {i < profile.winsInCurrentRank ? '⭐' : '○'}
              </div>
            ))}
          </div>
        </div>
        </div>{/* end textAlign center */}
      </div>

      {/* Token balance */}
      <div style={{
        background: '#FFE234',
        border: '4px solid #000',
        borderRadius: '14px',
        padding: '12px 20px',
        marginBottom: '20px',
        boxShadow: '4px 4px 0px #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.6rem', letterSpacing: '1px' }}>
          🪙 {profile.tokens} Tokens
        </div>
        <Link to="/avatar">
          <button className="cartoon-btn" style={{ background: '#1A1A2E', color: '#FFE234', fontSize: '0.9rem' }}>
            🎨 Customize Avatar →
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <StatBox label="Total Wins" value={profile.totalWins} color="#34C759" icon="🏆" />
        <StatBox label="Total Losses" value={profile.totalLosses} color="#FF3B30" icon="💀" />
        <StatBox label="Win Rate" value={`${winRate}%`} color="#007AFF" icon="📊" />
      </div>

      {/* Rank ladder */}
      <div style={{
        background: '#fff',
        border: '4px solid #000',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '4px 4px 0px #000',
        marginBottom: '20px',
      }}>
        <h2 style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '1.8rem',
          color: '#1A1A2E',
          margin: '0 0 16px',
          letterSpacing: '2px',
        }}>
          🪜 RANK LADDER
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {RANK_NAMES.map((name, i) => {
            const rank = i + 1;
            const isCurrent = rank === profile.rank;
            const isPast = rank < profile.rank;
            return (
              <div
                key={rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  background: isCurrent ? RANK_COLORS[i] : isPast ? 'rgba(52,199,89,0.1)' : '#f5f5f5',
                  border: `3px solid ${isCurrent ? '#000' : isPast ? '#34C759' : '#ddd'}`,
                  borderRadius: '10px',
                  boxShadow: isCurrent ? '3px 3px 0px #000' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontFamily: '"Bangers", cursive', fontSize: '1rem', minWidth: '32px', color: isCurrent ? '#000' : '#666' }}>
                  #{rank}
                </span>
                <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '1rem', flex: 1, color: isCurrent ? '#000' : '#333', fontWeight: isCurrent ? 'bold' : 'normal' }}>
                  {name}
                </span>
                <span style={{ fontSize: '1.1rem' }}>
                  {isCurrent ? '👉 YOU' : isPast ? '✅' : '🔒'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save transfer */}
      <div style={{
        background: '#16213E', border: '4px solid #555', borderRadius: '16px',
        padding: '20px', marginBottom: '20px', boxShadow: '4px 4px 0px #000',
      }}>
        <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: '1.6rem', color: '#FFE234', letterSpacing: '2px', margin: '0 0 6px' }}>
          💾 TRANSFER SAVE
        </h2>
        <p style={{ fontFamily: '"Fredoka One", cursive', color: '#888', fontSize: '0.85rem', margin: '0 0 14px' }}>
          Moving between devices? Export your save at home, import it at school — or vice versa!
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="cartoon-btn" onClick={handleExport} style={{ background: '#34C759', color: '#fff', flex: 1 }}>
            ⬇️ Export Save
          </button>
          <button className="cartoon-btn" onClick={() => fileInputRef.current?.click()} style={{ background: '#007AFF', color: '#fff', flex: 1 }}>
            ⬆️ Import Save
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
        </div>
      </div>

      {/* Sign out + Reset */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <button
          className="cartoon-btn"
          onClick={() => signOut()}
          style={{ background: '#1A1A2E', border: '3px solid #FFE234', color: '#FFE234', fontSize: '1.05rem', padding: '12px 32px', width: '100%' }}
        >
          🚪 Sign Out
        </button>
        <button
          className="cartoon-btn"
          onClick={() => {
            if (window.confirm('Reset all progress? This cannot be undone!')) resetProfile();
          }}
          style={{ background: '#FF3B30', color: '#fff', fontSize: '0.95rem' }}
        >
          🗑️ Reset Progress
        </button>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color, icon }: { label: string; value: string | number; color: string; icon: string }) => (
  <div style={{
    background: color,
    border: '4px solid #000',
    borderRadius: '14px',
    padding: '16px 12px',
    textAlign: 'center',
    boxShadow: '4px 4px 0px #000',
  }}>
    <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{icon}</div>
    <div style={{ fontFamily: '"Bangers", cursive', fontSize: '2rem', color: '#fff', lineHeight: 1, textShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}>
      {value}
    </div>
    <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)', marginTop: '2px' }}>
      {label}
    </div>
  </div>
);
