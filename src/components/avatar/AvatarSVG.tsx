import type { AvatarConfig } from '../../types/avatar';
import { SKIN_TONES } from '../../constants/avatarParts';

interface AvatarSVGProps {
  config: AvatarConfig;
  size?: number;
  animate?: 'idle' | 'attack' | 'hurt' | 'none';
}

// ─── Hair back layer ───────────────────────────────────────────────────────
function HairBack({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'long':
      return (
        <g>
          <rect x="26" y="28" width="6" height="42" rx="3" fill={color} stroke="#000" strokeWidth="1.5" />
          <rect x="68" y="28" width="6" height="42" rx="3" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'ponytail':
      return (
        <g>
          <rect x="66" y="30" width="10" height="36" rx="4" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="71" cy="68" r="5" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'twin-tails':
      return (
        <g>
          <rect x="22" y="30" width="8" height="32" rx="4" fill={color} stroke="#000" strokeWidth="1.5" />
          <ellipse cx="26" cy="64" rx="6" ry="8" fill={color} stroke="#000" strokeWidth="1.5" />
          <rect x="70" y="30" width="8" height="32" rx="4" fill={color} stroke="#000" strokeWidth="1.5" />
          <ellipse cx="74" cy="64" rx="6" ry="8" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    default:
      return null;
  }
}

// ─── Head ──────────────────────────────────────────────────────────────────
function Head({ skinColor }: { skinColor: string }) {
  return (
    <g>
      {/* Neck */}
      <rect x="44" y="56" width="12" height="10" rx="3" fill={skinColor} stroke="#000" strokeWidth="1.5" />
      {/* Head */}
      <ellipse cx="50" cy="36" rx="22" ry="24" fill={skinColor} stroke="#000" strokeWidth="2" />
      {/* Ears */}
      <ellipse cx="28" cy="38" rx="4" ry="5" fill={skinColor} stroke="#000" strokeWidth="1.5" />
      <ellipse cx="72" cy="38" rx="4" ry="5" fill={skinColor} stroke="#000" strokeWidth="1.5" />
    </g>
  );
}

// ─── Eyes ──────────────────────────────────────────────────────────────────
function Eyes({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'anime':
      return (
        <g>
          {/* Left eye */}
          <ellipse cx="39" cy="36" rx="7" ry="9" fill="white" stroke="#000" strokeWidth="1.5" />
          <ellipse cx="39" cy="37" rx="5" ry="6" fill={color} />
          <circle cx="39" cy="36" r="3" fill="#1a1a2e" />
          <circle cx="41" cy="33" r="1.5" fill="white" />
          <circle cx="37" cy="38" r="0.8" fill="white" />
          {/* Right eye */}
          <ellipse cx="61" cy="36" rx="7" ry="9" fill="white" stroke="#000" strokeWidth="1.5" />
          <ellipse cx="61" cy="37" rx="5" ry="6" fill={color} />
          <circle cx="61" cy="36" r="3" fill="#1a1a2e" />
          <circle cx="63" cy="33" r="1.5" fill="white" />
          <circle cx="59" cy="38" r="0.8" fill="white" />
          {/* Lashes */}
          <line x1="32" y1="29" x2="35" y2="27" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="27" x2="37" y2="25" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="54" y1="27" x2="55" y2="25" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="58" y1="27" x2="61" y2="26" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );
    case 'round':
      return (
        <g>
          <circle cx="39" cy="36" r="7" fill="white" stroke="#000" strokeWidth="1.5" />
          <circle cx="39" cy="36" r="4.5" fill={color} />
          <circle cx="39" cy="36" r="2.5" fill="#1a1a2e" />
          <circle cx="41" cy="34" r="1.2" fill="white" />
          <circle cx="61" cy="36" r="7" fill="white" stroke="#000" strokeWidth="1.5" />
          <circle cx="61" cy="36" r="4.5" fill={color} />
          <circle cx="61" cy="36" r="2.5" fill="#1a1a2e" />
          <circle cx="63" cy="34" r="1.2" fill="white" />
        </g>
      );
    case 'cool':
      return (
        <g>
          <path d="M32 34 Q39 30 46 34 Q39 38 32 34Z" fill="white" stroke="#000" strokeWidth="1.2" />
          <ellipse cx="39" cy="34" rx="4" ry="3.5" fill={color} />
          <ellipse cx="39" cy="34" rx="2.5" ry="2" fill="#1a1a2e" />
          <circle cx="40" cy="33" r="0.8" fill="white" />
          <path d="M54 34 Q61 30 68 34 Q61 38 54 34Z" fill="white" stroke="#000" strokeWidth="1.2" />
          <ellipse cx="61" cy="34" rx="4" ry="3.5" fill={color} />
          <ellipse cx="61" cy="34" rx="2.5" ry="2" fill="#1a1a2e" />
          <circle cx="62" cy="33" r="0.8" fill="white" />
          {/* Cool brow */}
          <line x1="32" y1="29" x2="46" y2="27" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
          <line x1="54" y1="27" x2="68" y2="29" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case 'happy':
      return (
        <g>
          <path d="M32 35 Q39 28 46 35" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="39" cy="34" rx="5" ry="3" fill={color} />
          <path d="M54 35 Q61 28 68 35" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="61" cy="34" rx="5" ry="3" fill={color} />
          {/* Rosy cheeks */}
          <ellipse cx="30" cy="43" rx="5" ry="3" fill="#FF8A80" opacity="0.5" />
          <ellipse cx="70" cy="43" rx="5" ry="3" fill="#FF8A80" opacity="0.5" />
        </g>
      );
    case 'star':
      return (
        <g>
          <circle cx="39" cy="36" r="7" fill="white" stroke="#000" strokeWidth="1.5" />
          <text x="39" y="40" textAnchor="middle" fontSize="10" fill={color}>★</text>
          <circle cx="61" cy="36" r="7" fill="white" stroke="#000" strokeWidth="1.5" />
          <text x="61" y="40" textAnchor="middle" fontSize="10" fill={color}>★</text>
        </g>
      );
    case 'heart':
      return (
        <g>
          <circle cx="39" cy="36" r="7" fill="white" stroke="#000" strokeWidth="1.5" />
          <text x="39" y="41" textAnchor="middle" fontSize="11" fill={color}>♥</text>
          <circle cx="61" cy="36" r="7" fill="white" stroke="#000" strokeWidth="1.5" />
          <text x="61" y="41" textAnchor="middle" fontSize="11" fill={color}>♥</text>
        </g>
      );
    default:
      return null;
  }
}

// ─── Mouth ─────────────────────────────────────────────────────────────────
function Mouth(_: { skinColor: string }) {
  return (
    <g>
      <path d="M43 49 Q50 54 57 49" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M45 49 Q50 52 55 49" fill="#FF9999" opacity="0.5" />
    </g>
  );
}

// ─── Hair front layer ──────────────────────────────────────────────────────
// All caps use: outer arc (top of head, y≈8-10) + inner hairline arc (y≈28-32)
// to form a solid filled shape instead of a thin crescent.
function HairFront({ style, color }: { style: string; color: string }) {
  const s = { stroke: '#000' as const, strokeWidth: '1.8' };
  // Reusable solid cap: outer arc over head, inner arc along hairline
  const CAP = `M 28 30 C 24 18, 36 8, 50 8 C 64 8, 76 18, 72 30 C 66 28, 58 26, 50 26 C 42 26, 34 28, 28 30 Z`;

  switch (style) {
    case 'short':
      return (
        <g>
          <path d={CAP} fill={color} {...s} />
        </g>
      );
    case 'medium-straight':
      return (
        <g>
          <path d={CAP} fill={color} {...s} />
          {/* Side panels hanging down */}
          <path d="M 26 28 C 22 36, 22 48, 24 54 C 28 50, 30 38, 30 28 Z" fill={color} stroke="#000" strokeWidth="1.5" />
          <path d="M 74 28 C 78 36, 78 48, 76 54 C 72 50, 70 38, 70 28 Z" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'spiky':
      return (
        <g>
          {/* Base cap */}
          <path d="M 28 32 C 24 20, 36 10, 50 10 C 64 10, 76 20, 72 32 C 66 28, 58 26, 50 26 C 42 26, 34 28, 28 32 Z" fill={color} {...s} />
          {/* Spikes */}
          <polygon points="36,24 40,4 46,24" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="46,22 50,2 54,22" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="54,24 60,4 64,24" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'long':
      return (
        <g>
          <path d={CAP} fill={color} {...s} />
          {/* Front strand hints at shoulders */}
          <path d="M 26 28 C 22 38, 22 50, 24 56 C 28 52, 30 40, 30 28 Z" fill={color} stroke="#000" strokeWidth="1.5" />
          <path d="M 74 28 C 78 38, 78 50, 76 56 C 72 52, 70 40, 70 28 Z" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'ponytail':
      return (
        <g>
          <path d={CAP} fill={color} {...s} />
          {/* Hair tie */}
          <circle cx="68" cy="28" r="5" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'anime-wild':
      return (
        <g>
          {/* Large base cap */}
          <path d="M 24 34 C 18 18, 32 6, 50 6 C 68 6, 82 18, 76 34 C 68 28, 60 24, 50 24 C 40 24, 32 28, 24 34 Z" fill={color} {...s} />
          {/* Many spikes */}
          <polygon points="32,22 36,2 42,20" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="42,18 47,0 53,18" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="53,18 57,0 63,18" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="62,22 66,2 72,22" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="20,30 14,12 28,26" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="80,30 86,12 72,26" fill={color} stroke="#000" strokeWidth="1.5" />
          {/* Wide side pieces */}
          <path d="M 24 34 C 18 44, 18 54, 20 58 C 26 54, 28 44, 26 34 Z" fill={color} stroke="#000" strokeWidth="1.5" />
          <path d="M 76 34 C 82 44, 82 54, 80 58 C 74 54, 72 44, 74 34 Z" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'curly':
      return (
        <g>
          {/* Base cap */}
          <path d={CAP} fill={color} {...s} />
          {/* Curl clusters along top hairline */}
          <circle cx="32" cy="22" r="8" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="42" cy="16" r="8" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="52" cy="14" r="8" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="62" cy="16" r="8" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="70" cy="22" r="8" fill={color} stroke="#000" strokeWidth="1.5" />
          {/* Side curls */}
          <circle cx="24" cy="32" r="7" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="76" cy="32" r="7" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'bun':
      return (
        <g>
          {/* Base cap */}
          <path d="M 30 32 C 26 22, 38 14, 50 14 C 62 14, 74 22, 70 32 C 64 28, 58 26, 50 26 C 42 26, 36 28, 30 32 Z" fill={color} {...s} />
          {/* Bun */}
          <circle cx="50" cy="12" r="13" fill={color} stroke="#000" strokeWidth="2" />
          {/* Hair band */}
          <ellipse cx="50" cy="22" rx="13" ry="4" fill="#333" stroke="#000" strokeWidth="1.2" />
        </g>
      );
    case 'mohawk':
      return (
        <g>
          {/* Shaved side patches */}
          <path d="M 28 30 C 28 24, 32 22, 36 26 C 34 24, 30 24, 28 30 Z" fill={color} {...s} />
          <path d="M 72 30 C 72 24, 68 22, 64 26 C 66 24, 70 24, 72 30 Z" fill={color} {...s} />
          {/* Mohawk strip — solid filled band */}
          <path d="M 42 28 C 42 18, 46 8, 50 4 C 54 8, 58 18, 58 28 C 55 18, 52 12, 50 10 C 48 12, 45 18, 42 28 Z" fill={color} {...s} />
        </g>
      );
    case 'twin-tails':
      return (
        <g>
          <path d="M 30 30 C 26 18, 36 8, 50 8 C 64 8, 74 18, 70 30 C 64 28, 58 26, 50 26 C 42 26, 36 28, 30 30 Z" fill={color} {...s} />
        </g>
      );
    default:
      return null;
  }
}

// ─── Shirt ──────────────────────────────────────────────────────────────────
const SHIRT_CONFIGS: Record<string, { main: string; accent?: string; label?: string }> = {
  'tee-blue': { main: '#007AFF' },
  'tee-red': { main: '#FF3B30' },
  'tee-green': { main: '#34C759' },
  'hoodie-grey': { main: '#9CA3AF', accent: '#6B7280' },
  'hoodie-black': { main: '#1f2937', accent: '#111827' },
  'jacket-orange': { main: '#FF8C00', accent: '#FF6000' },
  'tank-pink': { main: '#FF2D92' },
  'ninja-black': { main: '#1a1a1a', accent: '#2a2a2a' },
  'armor': { main: '#607D8B', accent: '#455A64' },
};

function Shirt({ shirtId, skinColor }: { shirtId: string; skinColor: string }) {
  const cfg = SHIRT_CONFIGS[shirtId] ?? { main: '#007AFF' };
  const isHoodie = shirtId.startsWith('hoodie');
  const isNinja = shirtId === 'ninja-black';
  const isArmor = shirtId === 'armor';

  return (
    <g>
      {/* Body */}
      <rect x="28" y="66" width="44" height="38" rx="6" fill={cfg.main} stroke="#000" strokeWidth="2" />

      {/* Hoodie pocket */}
      {isHoodie && (
        <rect x="39" y="84" width="22" height="14" rx="4" fill={cfg.accent} stroke="#000" strokeWidth="1.5" />
      )}

      {/* Armor plates */}
      {isArmor && (
        <>
          <rect x="32" y="70" width="16" height="20" rx="3" fill={cfg.accent} stroke="#000" strokeWidth="1.5" />
          <rect x="52" y="70" width="16" height="20" rx="3" fill={cfg.accent} stroke="#000" strokeWidth="1.5" />
          <circle cx="50" cy="78" r="5" fill="#00C8FF" stroke="#000" strokeWidth="1.5" />
        </>
      )}

      {/* Ninja symbol */}
      {isNinja && (
        <text x="50" y="88" textAnchor="middle" fontSize="12" fill="#FFD700">忍</text>
      )}

      {/* Left arm */}
      <rect x="10" y="66" width="18" height="30" rx="5" fill={cfg.main} stroke="#000" strokeWidth="2" />
      {/* Left hand */}
      <circle cx="19" cy="98" r="6" fill={skinColor} stroke="#000" strokeWidth="1.5" />

      {/* Right arm */}
      <rect x="72" y="66" width="18" height="30" rx="5" fill={cfg.main} stroke="#000" strokeWidth="2" />
      {/* Right hand */}
      <circle cx="81" cy="98" r="6" fill={skinColor} stroke="#000" strokeWidth="1.5" />
    </g>
  );
}

// ─── Pants ──────────────────────────────────────────────────────────────────
const PANTS_CONFIGS: Record<string, { main: string; accent?: string }> = {
  'jeans': { main: '#1e40af', accent: '#1d4ed8' },
  'shorts-red': { main: '#DC2626' },
  'pants-black': { main: '#1f2937' },
  'shorts-camo': { main: '#4B5320', accent: '#6B7280' },
  'skirt-plaid': { main: '#7C3AED', accent: '#6D28D9' },
  'ninja-pants': { main: '#1a1a1a', accent: '#000' },
};

function Pants({ pantsId }: { pantsId: string }) {
  const cfg = PANTS_CONFIGS[pantsId] ?? { main: '#1e40af' };
  const isShorts = pantsId.startsWith('shorts');
  const isSkirt = pantsId === 'skirt-plaid';
  const height = isShorts ? 16 : 28;

  return (
    <g>
      {isSkirt ? (
        <path d="M28 104 Q50 108 72 104 L76 132 Q50 136 24 132Z" fill={cfg.main} stroke="#000" strokeWidth="2" />
      ) : (
        <rect x="28" y="104" width="44" height={height} rx="3" fill={cfg.main} stroke="#000" strokeWidth="2" />
      )}
      {/* Seam */}
      {!isSkirt && <line x1="50" y1="104" x2="50" y2={104 + height} stroke="#000" strokeWidth="1" opacity="0.3" />}
      {/* Camo spots */}
      {pantsId === 'shorts-camo' && (
        <>
          <circle cx="36" cy="110" r="3" fill={cfg.accent} opacity="0.6" />
          <circle cx="44" cy="116" r="2" fill="#3a4a20" opacity="0.6" />
          <circle cx="56" cy="110" r="3" fill={cfg.accent} opacity="0.6" />
          <circle cx="64" cy="115" r="2" fill="#3a4a20" opacity="0.6" />
        </>
      )}
    </g>
  );
}

// ─── Shoes ──────────────────────────────────────────────────────────────────
const SHOE_CONFIGS: Record<string, { main: string; accent?: string }> = {
  'sneakers': { main: '#e5e7eb', accent: '#007AFF' },
  'boots-brown': { main: '#8B4513', accent: '#6B3410' },
  'shoes-red': { main: '#DC2626', accent: '#991B1B' },
  'ninja-boots': { main: '#1a1a1a', accent: '#333' },
};

function Shoes({ shoeId, pantsId }: { shoeId: string; pantsId: string }) {
  const cfg = SHOE_CONFIGS[shoeId] ?? { main: '#e5e7eb' };
  const isShorts = pantsId.startsWith('shorts');
  const isSkirt = pantsId === 'skirt-plaid';
  const legTop = isShorts ? 120 : (isSkirt ? 132 : 132);

  // Legs
  return (
    <g>
      {!isSkirt && (
        <>
          <rect x="30" y={legTop} width="16" height="14" rx="3" fill={PANTS_CONFIGS[pantsId]?.main ?? '#1e40af'} stroke="#000" strokeWidth="2" />
          <rect x="54" y={legTop} width="16" height="14" rx="3" fill={PANTS_CONFIGS[pantsId]?.main ?? '#1e40af'} stroke="#000" strokeWidth="2" />
        </>
      )}
      {/* Left shoe */}
      <rect x="26" y="142" width="24" height="10" rx="5" fill={cfg.main} stroke="#000" strokeWidth="2" />
      {cfg.accent && <rect x="26" y="142" width="24" height="4" rx="2" fill={cfg.accent} opacity="0.6" />}
      {/* Right shoe */}
      <rect x="50" y="142" width="24" height="10" rx="5" fill={cfg.main} stroke="#000" strokeWidth="2" />
      {cfg.accent && <rect x="50" y="142" width="24" height="4" rx="2" fill={cfg.accent} opacity="0.6" />}
    </g>
  );
}

// ─── Accessory ─────────────────────────────────────────────────────────────
function Accessory({ id, hairColor }: { id: string; hairColor: string }) {
  switch (id) {
    case 'glasses':
      return (
        <g>
          <circle cx="39" cy="36" r="8" fill="none" stroke="#1a1a2e" strokeWidth="2" />
          <circle cx="61" cy="36" r="8" fill="none" stroke="#1a1a2e" strokeWidth="2" />
          <line x1="47" y1="36" x2="53" y2="36" stroke="#1a1a2e" strokeWidth="2" />
          <line x1="31" y1="36" x2="27" y2="34" stroke="#1a1a2e" strokeWidth="1.5" />
          <line x1="69" y1="36" x2="73" y2="34" stroke="#1a1a2e" strokeWidth="1.5" />
        </g>
      );
    case 'headband':
      return (
        <rect x="28" y="22" width="44" height="7" rx="3" fill="#FF3B30" stroke="#000" strokeWidth="1.5" />
      );
    case 'cat-ears':
      return (
        <g>
          <polygon points="28,22 22,6 36,16" fill={hairColor} stroke="#000" strokeWidth="1.5" />
          <polygon points="30,20 26,10 34,16" fill="#FFB6C1" />
          <polygon points="72,22 78,6 64,16" fill={hairColor} stroke="#000" strokeWidth="1.5" />
          <polygon points="70,20 74,10 66,16" fill="#FFB6C1" />
        </g>
      );
    case 'crown':
      return (
        <g>
          <path d="M30 20 L30 10 L40 16 L50 8 L60 16 L70 10 L70 20Z" fill="#FFD700" stroke="#000" strokeWidth="1.5" />
          <circle cx="50" cy="10" r="3" fill="#FF3B30" />
          <circle cx="35" cy="13" r="2" fill="#007AFF" />
          <circle cx="65" cy="13" r="2" fill="#007AFF" />
        </g>
      );
    case 'halo':
      return (
        <ellipse cx="50" cy="8" rx="18" ry="5" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.9" />
      );
    case 'devil-horns':
      return (
        <g>
          <polygon points="32,24 28,6 40,20" fill="#FF3B30" stroke="#000" strokeWidth="1.5" />
          <polygon points="68,24 72,6 60,20" fill="#FF3B30" stroke="#000" strokeWidth="1.5" />
        </g>
      );
    default:
      return null;
  }
}

// ─── Main AvatarSVG ─────────────────────────────────────────────────────────
export const AvatarSVG = ({ config, size = 140, animate = 'none' }: AvatarSVGProps) => {
  const skinColor = SKIN_TONES[config.skinTone] ?? SKIN_TONES.light;

  const animStyle: React.CSSProperties = {
    animation:
      animate === 'idle' ? 'bounce_slow 2s ease-in-out infinite'
      : animate === 'attack' ? 'attack_player 0.4s ease-in-out'
      : animate === 'hurt' ? 'shake 0.5s ease-in-out'
      : undefined,
    display: 'inline-block',
  };

  return (
    <div style={animStyle}>
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 100 155"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Hair back */}
        <HairBack style={config.hairStyle} color={config.hairColor} />

        {/* Layer 2: Body */}
        <Shoes shoeId={config.shoes} pantsId={config.pants} />
        <Pants pantsId={config.pants} />
        <Shirt shirtId={config.shirt} skinColor={skinColor} />

        {/* Layer 3: Head */}
        <Head skinColor={skinColor} />

        {/* Layer 4: Face features */}
        <Eyes style={config.eyeStyle} color={config.eyeColor} />
        <Mouth skinColor={skinColor} />

        {/* Layer 5: Hair front */}
        <HairFront style={config.hairStyle} color={config.hairColor} />

        {/* Layer 6: Accessory */}
        <Accessory id={config.accessory} hairColor={config.hairColor} />
      </svg>
    </div>
  );
};
