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
function HairFront({ style, color }: { style: string; color: string }) {
  const stroke = { stroke: '#000', strokeWidth: '1.8' };
  switch (style) {
    case 'short':
      return (
        <g>
          <path d="M28 28 Q50 10 72 28 Q68 22 50 18 Q32 22 28 28Z" fill={color} {...stroke} />
          <path d="M28 28 Q26 36 28 42 Q30 34 28 28Z" fill={color} {...stroke} />
          <path d="M72 28 Q74 36 72 42 Q70 34 72 28Z" fill={color} {...stroke} />
        </g>
      );
    case 'medium-straight':
      return (
        <g>
          <path d="M28 28 Q50 10 72 28 Q68 22 50 18 Q32 22 28 28Z" fill={color} {...stroke} />
          <path d="M28 28 Q24 38 26 52 Q28 40 28 28Z" fill={color} {...stroke} />
          <path d="M72 28 Q76 38 74 52 Q72 40 72 28Z" fill={color} {...stroke} />
          {/* Side bangs */}
          <path d="M30 24 Q28 32 32 28 Q34 22 30 24Z" fill={color} stroke="#000" strokeWidth="1.2" />
        </g>
      );
    case 'spiky':
      return (
        <g>
          {/* Base */}
          <path d="M28 32 Q50 14 72 32 Q68 24 50 20 Q32 24 28 32Z" fill={color} {...stroke} />
          {/* Spikes */}
          <polygon points="38,22 42,6 46,22" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="46,20 50,4 54,20" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="54,22 58,6 62,22" fill={color} stroke="#000" strokeWidth="1.5" />
          <path d="M28 32 Q26 38 28 44 Q30 38 28 32Z" fill={color} {...stroke} />
          <path d="M72 32 Q74 38 72 44 Q70 38 72 32Z" fill={color} {...stroke} />
        </g>
      );
    case 'long':
      return (
        <g>
          <path d="M28 28 Q50 10 72 28 Q68 22 50 18 Q32 22 28 28Z" fill={color} {...stroke} />
          {/* Front strands */}
          <path d="M30 26 Q28 34 30 30 Q34 22 30 26Z" fill={color} stroke="#000" strokeWidth="1.2" />
          <path d="M70 26 Q72 34 70 30 Q66 22 70 26Z" fill={color} stroke="#000" strokeWidth="1.2" />
        </g>
      );
    case 'ponytail':
      return (
        <g>
          <path d="M28 28 Q50 10 72 28 Q68 22 50 18 Q32 22 28 28Z" fill={color} {...stroke} />
          {/* Tie */}
          <circle cx="68" cy="28" r="4" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'anime-wild':
      return (
        <g>
          {/* Massive spiky anime hair */}
          <path d="M24 36 Q50 8 76 36 Q70 20 50 15 Q30 20 24 36Z" fill={color} {...stroke} />
          <polygon points="32,24 36,4 42,22" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="42,18 47,1 52,18" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="52,18 57,1 63,18" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="60,22 66,4 70,24" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="22,30 18,14 28,28" fill={color} stroke="#000" strokeWidth="1.5" />
          <polygon points="78,30 82,14 72,28" fill={color} stroke="#000" strokeWidth="1.5" />
          {/* Side pieces */}
          <path d="M24 36 Q20 44 22 52 Q24 44 24 36Z" fill={color} {...stroke} />
          <path d="M76 36 Q80 44 78 52 Q76 44 76 36Z" fill={color} {...stroke} />
          {/* Bangs */}
          <path d="M36 22 Q38 30 42 26 Q40 20 36 22Z" fill={color} stroke="#000" strokeWidth="1.2" />
        </g>
      );
    case 'curly':
      return (
        <g>
          <path d="M28 30 Q50 10 72 30 Q68 22 50 18 Q32 22 28 30Z" fill={color} {...stroke} />
          {/* Curls */}
          <circle cx="32" cy="26" r="6" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="42" cy="20" r="6" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="52" cy="18" r="6" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="62" cy="20" r="6" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="70" cy="26" r="6" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="27" cy="36" r="5" fill={color} stroke="#000" strokeWidth="1.5" />
          <circle cx="73" cy="36" r="5" fill={color} stroke="#000" strokeWidth="1.5" />
        </g>
      );
    case 'bun':
      return (
        <g>
          <path d="M30 32 Q50 18 70 32 Q66 24 50 22 Q34 24 30 32Z" fill={color} {...stroke} />
          {/* Bun on top */}
          <circle cx="50" cy="14" r="11" fill={color} stroke="#000" strokeWidth="2" />
          {/* Hair band */}
          <ellipse cx="50" cy="22" rx="10" ry="3" fill="#333" stroke="#000" strokeWidth="1.2" />
        </g>
      );
    case 'mohawk':
      return (
        <g>
          {/* Shaved sides */}
          <path d="M28 28 Q34 22 38 28 Q36 24 28 28Z" fill={color} {...stroke} />
          <path d="M72 28 Q66 22 62 28 Q64 24 72 28Z" fill={color} {...stroke} />
          {/* Mohawk strip */}
          <path d="M40 28 Q42 8 50 4 Q58 8 60 28 Q55 16 50 12 Q45 16 40 28Z" fill={color} {...stroke} />
        </g>
      );
    case 'twin-tails':
      return (
        <g>
          <path d="M30 28 Q50 12 70 28 Q66 20 50 18 Q34 20 30 28Z" fill={color} {...stroke} />
          {/* Bangs */}
          <path d="M36 22 Q38 30 42 26 Q40 20 36 22Z" fill={color} stroke="#000" strokeWidth="1.2" />
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
