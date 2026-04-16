import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useGame } from '../store/GameContext';
import { PRO_MONTHLY_TOKENS, PRO_BATTLE_BONUS, VIP_USERNAMES } from '../constants/avatarParts';

// ── Stripe Payment Links ──────────────────────────────────────────────────────
// To wire up real payments:
//  1. Create a Stripe account at stripe.com
//  2. Go to Payment Links → Create new link
//  3. Add a recurring price (e.g. $2.99/month)
//  4. Set the success URL to:  https://flixbee878.github.io/FelixFirst/pro?activated=monthly
//  5. Paste the link URL below and remove the "#" so it's a real URL
const STRIPE_MONTHLY_URL = '#'; // e.g. 'https://buy.stripe.com/xxxx'
const STRIPE_ANNUAL_URL  = '#'; // e.g. 'https://buy.stripe.com/yyyy'

const MONTHLY_PRICE = '$2.99';
const ANNUAL_PRICE  = '$19.99';

const features = [
  { icon: '🪙', text: `${PRO_MONTHLY_TOKENS} free tokens every month` },
  { icon: '⚔️', text: `+${PRO_BATTLE_BONUS} bonus tokens on every battle win` },
  { icon: '🏅', text: 'Shiny PRO badge on your profile' },
  { icon: '🔓', text: 'Unlock legendary items faster' },
  { icon: '🎯', text: '2-week free trial, cancel anytime' },
];

export const ProPage = () => {
  const { profile, isPro, canClaimMonthly, activatePro, claimMonthlyTokens } = useGame();
  const isVip = VIP_USERNAMES.some(v => v.toLowerCase() === profile.username.toLowerCase());
  const [searchParams, setSearchParams] = useSearchParams();
  const [justActivated, setJustActivated] = useState(false);
  const [claimed, setClaimed] = useState(false);

  // Auto-activate when Stripe redirects back with ?activated=monthly|annual|trial
  useEffect(() => {
    const activated = searchParams.get('activated');
    if (activated === 'monthly') { activatePro(30);  setJustActivated(true); }
    if (activated === 'annual')  { activatePro(365); setJustActivated(true); }
    if (activated === 'trial')   { activatePro(14);  setJustActivated(true); }
    if (activated) setSearchParams({}, { replace: true });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleTrial = () => {
    activatePro(14);
    setJustActivated(true);
  };

  const handleClaim = () => {
    claimMonthlyTokens();
    setClaimed(true);
  };

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    const url = plan === 'monthly' ? STRIPE_MONTHLY_URL : STRIPE_ANNUAL_URL;
    if (url !== '#') {
      window.open(url, '_blank');
    }
  };

  const proExpiry = profile.proExpiresAt
    ? new Date(profile.proExpiresAt).toLocaleDateString()
    : null;

  const card = (style: React.CSSProperties) => ({
    border: '4px solid #000',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '6px 6px 0px #000',
    ...style,
  });

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'linear-gradient(135deg, #1A1A2E, #16213E)', padding: '24px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(2.8rem, 8vw, 5rem)',
            color: '#FFE234',
            textShadow: '4px 4px 0px #000, -2px -2px 0px #FF8C00',
            letterSpacing: '4px',
            margin: 0,
          }}>
            ⚔️ TYPE KNIGHT PRO ⚔️
          </h1>
          <p style={{ fontFamily: '"Fredoka One", cursive', color: '#a0b0ff', fontSize: '1.2rem', marginTop: '8px' }}>
            Become the Ultimate Keyboard Knight!
          </p>
        </div>

        {/* Already Pro: status card */}
        {isPro && (
          <div style={{ ...card({ background: 'linear-gradient(135deg, #0a3a0a, #1a6a1a)', borderColor: '#34C759', marginBottom: '28px' }), textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>✅</div>
            <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: '2rem', color: '#34C759', margin: '0 0 6px', letterSpacing: '2px' }}>
              YOU'RE A PRO KNIGHT!
            </h2>
            <p style={{ fontFamily: '"Fredoka One", cursive', color: '#ccc', margin: '0 0 16px' }}>
              Pro active until <strong style={{ color: '#FFE234' }}>{proExpiry}</strong>
            </p>

            {canClaimMonthly && !claimed && (
              <button
                className="cartoon-btn"
                onClick={handleClaim}
                style={{ background: '#FFE234', fontSize: '1.1rem', padding: '12px 28px' }}
              >
                🪙 Claim {PRO_MONTHLY_TOKENS} Monthly Tokens!
              </button>
            )}
            {(claimed || (!canClaimMonthly && profile.proLastMonthlyGrant)) && (
              <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.95rem' }}>
                {claimed ? `🎉 +${PRO_MONTHLY_TOKENS} tokens added to your wallet!` : '✅ Monthly tokens already claimed — come back next month!'}
              </div>
            )}
          </div>
        )}

        {/* Just activated banner */}
        {justActivated && (
          <div style={{ ...card({ background: '#FFE234', borderColor: '#FF8C00', marginBottom: '24px' }), textAlign: 'center' }}>
            <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.8rem', color: '#000', letterSpacing: '2px' }}>
              🎉 WELCOME TO PRO! 🎉
            </div>
            <div style={{ fontFamily: '"Fredoka One", cursive', color: '#333', marginTop: '4px' }}>
              Your Pro features are now active. Go battle some robots!
            </div>
            <Link to="/game" style={{ textDecoration: 'none' }}>
              <button className="cartoon-btn" style={{ background: '#FF3B30', color: '#fff', marginTop: '12px' }}>
                ⚔️ Battle Now!
              </button>
            </Link>
          </div>
        )}

        {/* Features list */}
        <div style={{ ...card({ background: '#16213E', borderColor: '#FFE234', marginBottom: '28px' }) }}>
          <h3 style={{ fontFamily: '"Bangers", cursive', fontSize: '1.6rem', color: '#FFE234', letterSpacing: '2px', margin: '0 0 14px', textAlign: 'center' }}>
            PRO PERKS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {features.map(f => (
              <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: '"Fredoka One", cursive', color: '#e0e0ff', fontSize: '1rem' }}>
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        {!isPro && (
          <>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>

              {/* Monthly card */}
              <div style={{ ...card({ background: '#0f172a', borderColor: '#6366f1', flex: '1 1 260px' }), textAlign: 'center' }}>
                <h3 style={{ fontFamily: '"Bangers", cursive', fontSize: '1.5rem', color: '#6366f1', letterSpacing: '2px', margin: '0 0 4px' }}>
                  MONTHLY
                </h3>
                <div style={{ fontFamily: '"Bangers", cursive', fontSize: '3rem', color: '#fff', lineHeight: 1 }}>
                  {MONTHLY_PRICE}
                </div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#888', fontSize: '0.9rem', marginBottom: '16px' }}>
                  per month
                </div>
                <button
                  className="cartoon-btn"
                  onClick={() => handleSubscribe('monthly')}
                  disabled={STRIPE_MONTHLY_URL === '#' && !isVip}
                  style={{ background: STRIPE_MONTHLY_URL === '#' && !isVip ? '#2a2a4a' : '#6366f1', color: STRIPE_MONTHLY_URL === '#' && !isVip ? '#555' : '#fff', width: '100%', cursor: STRIPE_MONTHLY_URL === '#' && !isVip ? 'not-allowed' : 'pointer' }}
                >
                  {STRIPE_MONTHLY_URL === '#' && !isVip ? '🔒 Coming Soon' : 'Subscribe Monthly'}
                </button>
              </div>

              {/* Annual card (recommended) */}
              <div style={{ ...card({ background: '#0f172a', borderColor: '#FFE234', flex: '1 1 260px' }), textAlign: 'center', position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                  background: '#FFE234', color: '#000', borderRadius: '20px', padding: '2px 14px',
                  fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', fontWeight: 'bold',
                  border: '2px solid #000', whiteSpace: 'nowrap',
                }}>
                  ⭐ BEST VALUE — SAVE 44%
                </div>
                <h3 style={{ fontFamily: '"Bangers", cursive', fontSize: '1.5rem', color: '#FFE234', letterSpacing: '2px', margin: '8px 0 4px' }}>
                  ANNUAL
                </h3>
                <div style={{ fontFamily: '"Bangers", cursive', fontSize: '3rem', color: '#fff', lineHeight: 1 }}>
                  {ANNUAL_PRICE}
                </div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#888', fontSize: '0.9rem', marginBottom: '16px' }}>
                  per year &nbsp;•&nbsp; <span style={{ color: '#34C759' }}>≈ $1.67/mo</span>
                </div>
                <button
                  className="cartoon-btn"
                  onClick={() => handleSubscribe('annual')}
                  disabled={STRIPE_ANNUAL_URL === '#' && !isVip}
                  style={{ background: STRIPE_ANNUAL_URL === '#' && !isVip ? '#2a2a4a' : '#FFE234', color: STRIPE_ANNUAL_URL === '#' && !isVip ? '#555' : '#000', width: '100%', cursor: STRIPE_ANNUAL_URL === '#' && !isVip ? 'not-allowed' : 'pointer' }}
                >
                  {STRIPE_ANNUAL_URL === '#' && !isVip ? '🔒 Coming Soon' : 'Subscribe Annually'}
                </button>
              </div>
            </div>

            {/* Free trial — VIP only until payments are live */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              {isVip ? (
                <>
                  <p style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', marginBottom: '12px' }}>
                    Not sure? Try Pro free for 2 weeks — no payment needed!
                  </p>
                  <button
                    className="cartoon-btn"
                    onClick={handleTrial}
                    style={{ background: '#34C759', color: '#fff', fontSize: '1.1rem', padding: '12px 32px' }}
                  >
                    🎁 Start 14-Day Free Trial
                  </button>
                </>
              ) : (
                <p style={{ fontFamily: '"Fredoka One", cursive', color: '#555', fontSize: '0.9rem' }}>
                  💳 Payments coming soon — stay tuned!
                </p>
              )}
            </div>

            {/* Token comparison */}
            <div style={{ ...card({ background: '#0f172a', borderColor: '#4B5563' }), marginBottom: '24px' }}>
              <h3 style={{ fontFamily: '"Bangers", cursive', fontSize: '1.3rem', color: '#ddd', letterSpacing: '2px', margin: '0 0 12px', textAlign: 'center' }}>
                FREE vs PRO — TOKENS PER MONTH
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, background: '#1e293b', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.1rem', color: '#aaa', letterSpacing: '1px', marginBottom: '6px' }}>FREE</div>
                  <div style={{ fontFamily: '"Bangers", cursive', fontSize: '2rem', color: '#fff' }}>~{(15 + profile.rank * 5) * 20}</div>
                  <div style={{ fontFamily: '"Fredoka One", cursive', color: '#666', fontSize: '0.8rem' }}>≈ 20 battles at rank {profile.rank}</div>
                </div>
                <div style={{ flex: 1, background: '#1e293b', borderRadius: '12px', padding: '14px', textAlign: 'center', border: '2px solid #FFE234' }}>
                  <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.1rem', color: '#FFE234', letterSpacing: '1px', marginBottom: '6px' }}>PRO ⚔️</div>
                  <div style={{ fontFamily: '"Bangers", cursive', fontSize: '2rem', color: '#FFE234' }}>~{(15 + profile.rank * 5 + 5) * 20 + PRO_MONTHLY_TOKENS}</div>
                  <div style={{ fontFamily: '"Fredoka One", cursive', color: '#888', fontSize: '0.8rem' }}>battles + monthly grant!</div>
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ fontFamily: '"Fredoka One", cursive', color: '#666', fontSize: '0.9rem' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
