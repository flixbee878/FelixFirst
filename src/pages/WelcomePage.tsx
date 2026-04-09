import { useState, type FormEvent } from 'react';
import { useGame } from '../store/GameContext';
import { FLIXBEE_USERNAME, FLIXBEE_MONTHLY_TOKENS } from '../constants/avatarParts';

export const WelcomePage = () => {
  const { setUsername } = useGame();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isFlixbee = input.toLowerCase() === FLIXBEE_USERNAME.toLowerCase();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();

    if (trimmed.length < 2) {
      setError('Username must be at least 2 characters!');
      return;
    }
    if (trimmed.length > 20) {
      setError('Username must be 20 characters or less!');
      return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
      setError('Only letters, numbers, _ and - allowed!');
      return;
    }

    setLoading(true);
    const result = setUsername(trimmed);
    setLoading(false);

    if (result === 'taken') {
      setError(`"${trimmed}" is already taken — pick another name!`);
    }
    // 'ok' → profile.username is now set → App renders the real app
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #0d1117 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      {/* Floating decorations */}
      <div style={{ position: 'fixed', top: '10%', left: '5%', fontSize: '2rem', opacity: 0.15, animation: 'bounce_slow 3s ease-in-out infinite' }}>⚔️</div>
      <div style={{ position: 'fixed', top: '20%', right: '8%', fontSize: '1.5rem', opacity: 0.12, animation: 'bounce_slow 4s ease-in-out infinite 1s' }}>🤖</div>
      <div style={{ position: 'fixed', bottom: '15%', left: '10%', fontSize: '1.8rem', opacity: 0.12, animation: 'bounce_slow 3.5s ease-in-out infinite 0.5s' }}>⌨️</div>
      <div style={{ position: 'fixed', bottom: '20%', right: '6%', fontSize: '1.5rem', opacity: 0.12, animation: 'bounce_slow 4.5s ease-in-out infinite 2s' }}>🏆</div>

      <div style={{
        background: '#16213E',
        border: '4px solid #FFE234',
        borderRadius: '24px',
        padding: '36px 28px',
        maxWidth: '440px',
        width: '100%',
        boxShadow: '8px 8px 0px #000',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <h1 style={{
          fontFamily: '"Bangers", cursive',
          fontSize: 'clamp(2.4rem, 8vw, 3.6rem)',
          color: '#FFE234',
          textShadow: '4px 4px 0px #000, -2px -2px 0px #FF8C00',
          letterSpacing: '4px',
          margin: '0 0 4px',
          lineHeight: 1,
        }}>
          ⚔️ TYPE KNIGHT ⚔️
        </h1>
        <p style={{ fontFamily: '"Fredoka One", cursive', color: '#a0b0ff', fontSize: '1rem', margin: '0 0 28px' }}>
          Battle Evil Robots With Your Keyboard!
        </p>

        {/* Robots row */}
        <div style={{ fontSize: '2.4rem', marginBottom: '24px', letterSpacing: '8px' }}>
          🤖⚔️🧑
        </div>

        <h2 style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '1.6rem',
          color: '#fff',
          letterSpacing: '2px',
          margin: '0 0 6px',
        }}>
          CHOOSE YOUR KNIGHT NAME
        </h2>
        <p style={{ fontFamily: '"Fredoka One", cursive', color: '#888', fontSize: '0.9rem', margin: '0 0 20px' }}>
          No password needed — just pick a unique name!
        </p>

        {/* Special Flixbee hint */}
        {isFlixbee && input.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #0a3a0a, #1a6a1a)',
            border: '3px solid #34C759',
            borderRadius: '12px',
            padding: '10px 14px',
            marginBottom: '16px',
            fontFamily: '"Fredoka One", cursive',
            color: '#34C759',
            fontSize: '0.95rem',
            animation: 'pop_in 0.3s ease-out',
          }}>
            👑 Welcome, <strong>{FLIXBEE_USERNAME}</strong>! You get free Pro membership
            + <strong>{FLIXBEE_MONTHLY_TOKENS} tokens</strong> right now!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setError(''); }}
            placeholder="Enter your knight name..."
            maxLength={20}
            autoFocus
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '14px 16px',
              fontSize: '1.2rem',
              fontFamily: '"Fredoka One", cursive',
              border: `3px solid ${error ? '#FF3B30' : input.length > 0 ? '#FFE234' : '#444'}`,
              borderRadius: '12px',
              background: '#0d1117',
              color: '#fff',
              outline: 'none',
              marginBottom: '8px',
              textAlign: 'center',
              letterSpacing: '1px',
              transition: 'border-color 0.2s',
            }}
          />

          {/* Character count */}
          <div style={{ fontFamily: '"Fredoka One", cursive', color: '#555', fontSize: '0.8rem', marginBottom: '12px' }}>
            {input.length}/20
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#3a0a0a',
              border: '2px solid #FF3B30',
              borderRadius: '10px',
              padding: '8px 12px',
              marginBottom: '14px',
              fontFamily: '"Fredoka One", cursive',
              color: '#FF6B6B',
              fontSize: '0.9rem',
              animation: 'pop_in 0.2s ease-out',
            }}>
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || input.trim().length < 2}
            className="cartoon-btn"
            style={{
              width: '100%',
              fontSize: '1.3rem',
              padding: '14px',
              background: input.trim().length < 2 ? '#333' : isFlixbee ? '#34C759' : '#FFE234',
              color: '#000',
              cursor: input.trim().length < 2 ? 'not-allowed' : 'pointer',
              opacity: input.trim().length < 2 ? 0.5 : 1,
            }}
          >
            {loading ? '...' : isFlixbee ? '👑 ENTER, FLIXBEE!' : '⚔️ JOIN THE BATTLE!'}
          </button>
        </form>

        <p style={{ fontFamily: '"Fredoka One", cursive', color: '#444', fontSize: '0.78rem', marginTop: '20px', marginBottom: 0 }}>
          Your progress is saved on this device.
        </p>
      </div>
    </div>
  );
};
