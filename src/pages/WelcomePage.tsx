import { useState, type FormEvent } from 'react';
import { useGame } from '../store/GameContext';
import { FLIXBEE_USERNAME, FLIXBEE_MONTHLY_TOKENS } from '../constants/avatarParts';

const isAlphanumeric = (s: string) => /^[a-zA-Z0-9]+$/.test(s);

const passwordStrength = (pw: string): { label: string; color: string; bars: number } => {
  if (pw.length === 0) return { label: '', color: '#555', bars: 0 };
  if (pw.length < 6)   return { label: 'Too short', color: '#EF4444', bars: 1 };
  if (pw.length < 9)   return { label: 'OK', color: '#FBBF24', bars: 2 };
  if (pw.length < 12)  return { label: 'Good', color: '#34C759', bars: 3 };
  return { label: 'Strong!', color: '#22d3ee', bars: 4 };
};

export const WelcomePage = () => {
  const { setUsername, login } = useGame();
  const [mode, setMode]       = useState<'create' | 'login'>('create');
  const [name, setName]       = useState('');
  const [pass, setPass]       = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]     = useState('');

  const isFlixbee = name.toLowerCase() === FLIXBEE_USERNAME.toLowerCase();
  const strength  = passwordStrength(pass);

  const switchMode = (m: 'create' | 'login') => {
    setMode(m);
    setName('');
    setPass('');
    setConfirm('');
    setError('');
  };

  const validateCreate = (): string => {
    const n = name.trim();
    if (n.length < 2)  return 'Username must be at least 2 characters!';
    if (n.length > 20) return 'Username must be 20 characters or less!';
    if (!/^[a-zA-Z0-9_-]+$/.test(n)) return 'Username: only letters, numbers, _ and - allowed!';
    if (pass.length < 6) return 'Password must be at least 6 characters!';
    if (!isAlphanumeric(pass)) return 'Password: only letters and numbers allowed!';
    if (pass !== confirm) return 'Passwords do not match!';
    return '';
  };

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const err = validateCreate();
    if (err) { setError(err); return; }
    const result = setUsername(name.trim(), pass);
    if (result === 'taken') {
      setError(`"${name.trim()}" is already taken — pick another name!`);
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) { setError('Enter your username!'); return; }
    if (!pass) { setError('Enter your password!'); return; }
    const result = login(n, pass);
    if (result === 'not_found')    setError(`No account found for "${n}" — check spelling or create one!`);
    if (result === 'wrong_password') setError('Wrong password — try again!');
  };

  // Input style helper
  const inputStyle = (hasContent: boolean, invalid: boolean): React.CSSProperties => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 16px',
    fontSize: '1.1rem',
    fontFamily: '"Fredoka One", cursive',
    border: `3px solid ${invalid ? '#EF4444' : hasContent ? '#FFE234' : '#444'}`,
    borderRadius: '12px',
    background: '#0d1117',
    color: '#fff',
    outline: 'none',
    textAlign: 'center' as const,
    letterSpacing: '1px',
    transition: 'border-color 0.2s',
  });

  const passInvalid    = mode === 'create' && pass.length > 0 && pass.length < 6;
  const confirmInvalid = mode === 'create' && confirm.length > 0 && pass !== confirm;
  const canCreate = name.trim().length >= 2 && pass.length >= 6 && pass === confirm && isAlphanumeric(pass);
  const canLogin  = name.trim().length >= 1 && pass.length >= 1;

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
      {['⚔️', '🤖', '⌨️', '🏆'].map((icon, i) => (
        <div key={i} style={{
          position: 'fixed',
          top: i < 2 ? `${10 + i * 12}%` : undefined,
          bottom: i >= 2 ? `${15 + (i - 2) * 8}%` : undefined,
          left:  i % 2 === 0 ? `${5 + i}%` : undefined,
          right: i % 2 === 1 ? `${6 + i}%` : undefined,
          fontSize: '1.8rem', opacity: 0.12,
          animation: `bounce_slow ${3 + i * 0.5}s ease-in-out infinite ${i * 0.5}s`,
        }}>{icon}</div>
      ))}

      <div style={{
        background: '#16213E',
        border: '4px solid #FFE234',
        borderRadius: '24px',
        padding: '32px 28px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '8px 8px 0px #000',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <h1 style={{
          fontFamily: '"Bangers", cursive',
          fontSize: 'clamp(2.2rem, 7vw, 3.4rem)',
          color: '#FFE234',
          textShadow: '4px 4px 0px #000, -2px -2px 0px #FF8C00',
          letterSpacing: '4px',
          margin: '0 0 4px', lineHeight: 1,
        }}>
          ⚔️ TYPE KNIGHT ⚔️
        </h1>
        <p style={{ fontFamily: '"Fredoka One", cursive', color: '#a0b0ff', fontSize: '1rem', margin: '0 0 18px' }}>
          Battle Evil Robots With Your Keyboard!
        </p>
        <div style={{ fontSize: '2rem', marginBottom: '16px', letterSpacing: '6px' }}>🤖⚔️🧑</div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {(['create', 'login'] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              style={{
                flex: 1,
                padding: '10px',
                fontFamily: '"Bangers", cursive',
                fontSize: '1.1rem',
                letterSpacing: '2px',
                borderRadius: '10px',
                border: `3px solid ${mode === m ? '#FFE234' : '#333'}`,
                background: mode === m ? '#FFE234' : '#0d1117',
                color: mode === m ? '#000' : '#666',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {m === 'create' ? '⚔️ NEW ACCOUNT' : '🔑 SIGN IN'}
            </button>
          ))}
        </div>

        {mode === 'create' ? (
          <>
            <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: '1.5rem', color: '#fff', letterSpacing: '2px', margin: '0 0 4px' }}>
              CREATE YOUR ACCOUNT
            </h2>
            <p style={{ fontFamily: '"Fredoka One", cursive', color: '#666', fontSize: '0.85rem', margin: '0 0 14px' }}>
              Pick a unique knight name + password to save your progress!
            </p>

            {/* Flixbee VIP hint */}
            {isFlixbee && name.length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #0a3a0a, #1a6a1a)',
                border: '3px solid #34C759', borderRadius: '12px',
                padding: '10px 14px', marginBottom: '16px',
                fontFamily: '"Fredoka One", cursive', color: '#34C759', fontSize: '0.9rem',
                animation: 'pop_in 0.3s ease-out',
              }}>
                👑 Welcome, <strong>{FLIXBEE_USERNAME}</strong>! You get free Pro + <strong>{FLIXBEE_MONTHLY_TOKENS} tokens</strong> right now!
              </div>
            )}

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Username */}
              <div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.82rem', marginBottom: '4px', textAlign: 'left' }}>
                  Knight Name
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setError(''); }}
                  placeholder="e.g. CoolKnight99"
                  maxLength={20}
                  autoFocus
                  style={inputStyle(name.length > 0, false)}
                />
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#444', fontSize: '0.75rem', textAlign: 'right', marginTop: '2px' }}>
                  {name.length}/20
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.82rem', marginBottom: '4px', textAlign: 'left' }}>
                  Password <span style={{ color: '#555' }}>(6+ letters or numbers)</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={pass}
                    onChange={e => { setPass(e.target.value); setError(''); }}
                    placeholder="••••••"
                    maxLength={32}
                    style={inputStyle(pass.length > 0, passInvalid)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    style={{
                      position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem',
                    }}
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
                {pass.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[1, 2, 3, 4].map(n => (
                        <div key={n} style={{
                          width: '24px', height: '6px', borderRadius: '3px',
                          background: n <= strength.bars ? strength.color : '#333',
                          transition: 'background 0.2s',
                        }} />
                      ))}
                    </div>
                    <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.75rem', color: strength.color }}>
                      {strength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.82rem', marginBottom: '4px', textAlign: 'left' }}>
                  Confirm Password
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setError(''); }}
                  placeholder="••••••"
                  maxLength={32}
                  style={inputStyle(confirm.length > 0, confirmInvalid)}
                />
                {confirm.length > 0 && !confirmInvalid && (
                  <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.75rem', color: '#34C759', marginTop: '2px', textAlign: 'right' }}>
                    ✓ Passwords match
                  </div>
                )}
              </div>

              {error && (
                <div style={{
                  background: '#3a0a0a', border: '2px solid #EF4444',
                  borderRadius: '10px', padding: '8px 12px',
                  fontFamily: '"Fredoka One", cursive', color: '#FF6B6B', fontSize: '0.88rem',
                  animation: 'pop_in 0.2s ease-out',
                }}>
                  ❌ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!canCreate}
                className="cartoon-btn"
                style={{
                  width: '100%', fontSize: '1.2rem', padding: '13px', marginTop: '4px',
                  background: !canCreate ? '#2a2a4a' : isFlixbee ? '#34C759' : '#FFE234',
                  color: !canCreate ? '#555' : '#000',
                  cursor: canCreate ? 'pointer' : 'not-allowed',
                  border: `3px solid ${canCreate ? '#000' : '#444'}`,
                }}
              >
                {isFlixbee ? '👑 ENTER, FLIXBEE!' : '⚔️ JOIN THE BATTLE!'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: '1.5rem', color: '#fff', letterSpacing: '2px', margin: '0 0 4px' }}>
              WELCOME BACK!
            </h2>
            <p style={{ fontFamily: '"Fredoka One", cursive', color: '#666', fontSize: '0.85rem', margin: '0 0 14px' }}>
              Sign in to restore your progress and rank!
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Username */}
              <div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.82rem', marginBottom: '4px', textAlign: 'left' }}>
                  Knight Name
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setError(''); }}
                  placeholder="Your username"
                  maxLength={20}
                  autoFocus
                  style={inputStyle(name.length > 0, false)}
                />
              </div>

              {/* Password */}
              <div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.82rem', marginBottom: '4px', textAlign: 'left' }}>
                  Password
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={pass}
                    onChange={e => { setPass(e.target.value); setError(''); }}
                    placeholder="••••••"
                    maxLength={32}
                    style={inputStyle(pass.length > 0, false)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    style={{
                      position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem',
                    }}
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{
                  background: '#3a0a0a', border: '2px solid #EF4444',
                  borderRadius: '10px', padding: '8px 12px',
                  fontFamily: '"Fredoka One", cursive', color: '#FF6B6B', fontSize: '0.88rem',
                  animation: 'pop_in 0.2s ease-out',
                }}>
                  ❌ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!canLogin}
                className="cartoon-btn"
                style={{
                  width: '100%', fontSize: '1.2rem', padding: '13px', marginTop: '4px',
                  background: !canLogin ? '#2a2a4a' : '#a855f7',
                  color: !canLogin ? '#555' : '#fff',
                  cursor: canLogin ? 'pointer' : 'not-allowed',
                  border: `3px solid ${canLogin ? '#000' : '#444'}`,
                }}
              >
                🔑 SIGN IN
              </button>
            </form>
          </>
        )}

        <p style={{ fontFamily: '"Fredoka One", cursive', color: '#333', fontSize: '0.75rem', marginTop: '18px', marginBottom: 0 }}>
          Your account and progress are saved on this device.
        </p>
      </div>
    </div>
  );
};
