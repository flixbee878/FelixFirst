interface PlayerSpriteProps {
  state: 'idle' | 'attacking' | 'hurt' | 'defeated';
  size?: number;
}

export const PlayerSprite = ({ state, size = 140 }: PlayerSpriteProps) => {
  const isAttacking = state === 'attacking';
  const isHurt = state === 'hurt';
  const isDefeated = state === 'defeated';

  return (
    <div
      style={{
        display: 'inline-block',
        animation: isHurt
          ? 'shake 0.5s ease-in-out'
          : isAttacking
          ? 'attack_player 0.4s ease-in-out'
          : 'bounce_slow 2s ease-in-out infinite',
        opacity: isDefeated ? 0.4 : 1,
        transform: isDefeated ? 'rotate(-90deg)' : undefined,
        transition: 'transform 0.5s, opacity 0.5s',
      }}
    >
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 100 130"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hair */}
        <ellipse cx="50" cy="11" rx="24" ry="10" fill="#5D4037" stroke="#000" strokeWidth="2" />
        <rect x="26" y="10" width="48" height="8" fill="#5D4037" />

        {/* Head */}
        <ellipse cx="50" cy="25" rx="22" ry="20" fill="#FFCCBC" stroke="#000" strokeWidth="3" />

        {/* Eyes */}
        <circle cx="40" cy="22" r="5" fill="#fff" stroke="#000" strokeWidth="1.5" />
        <circle cx="60" cy="22" r="5" fill="#fff" stroke="#000" strokeWidth="1.5" />
        <circle cx={isAttacking ? 42 : 40} cy="22" r="2.5" fill="#333" />
        <circle cx={isAttacking ? 62 : 60} cy="22" r="2.5" fill="#333" />

        {/* Eyebrows */}
        {isAttacking && (
          <>
            <line x1="35" y1="15" x2="45" y2="17" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="65" y1="15" x2="55" y2="17" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* Smile */}
        <path
          d={isAttacking ? 'M 42 32 Q 50 38 58 32' : 'M 42 33 Q 50 37 58 33'}
          stroke="#333"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Blush */}
        {!isAttacking && (
          <>
            <ellipse cx="33" cy="28" rx="5" ry="3" fill="#FF8A80" opacity="0.5" />
            <ellipse cx="67" cy="28" rx="5" ry="3" fill="#FF8A80" opacity="0.5" />
          </>
        )}

        {/* Neck */}
        <rect x="43" y="44" width="14" height="10" fill="#FFCCBC" stroke="#000" strokeWidth="2" />

        {/* Body / shirt */}
        <rect x="20" y="54" width="60" height="42" rx="8" fill="#007AFF" stroke="#000" strokeWidth="3" />

        {/* Star on shirt */}
        <text x="44" y="82" fontSize="18" fill="#FFE234">★</text>

        {/* Belt */}
        <rect x="20" y="90" width="60" height="8" fill="#FF8C00" stroke="#000" strokeWidth="2" />
        <rect x="44" y="89" width="12" height="10" rx="2" fill="#FFE234" stroke="#000" strokeWidth="2" />

        {/* Left arm */}
        <rect
          x={isAttacking ? "-2" : "4"}
          y="55"
          width="16"
          height="35"
          rx="6"
          fill="#007AFF"
          stroke="#000"
          strokeWidth="3"
        />
        {/* Left hand */}
        <circle cx={isAttacking ? "6" : "12"} cy="92" r="7" fill="#FFCCBC" stroke="#000" strokeWidth="2" />

        {/* Keyboard in left hand when attacking */}
        {isAttacking && (
          <g transform="translate(-15, 85)">
            <rect x="0" y="0" width="24" height="14" rx="2" fill="#333" stroke="#000" strokeWidth="1.5" />
            <rect x="2" y="2" width="4" height="3" rx="1" fill="#666" />
            <rect x="8" y="2" width="4" height="3" rx="1" fill="#666" />
            <rect x="14" y="2" width="4" height="3" rx="1" fill="#666" />
            <rect x="2" y="7" width="4" height="3" rx="1" fill="#666" />
            <rect x="8" y="7" width="4" height="3" rx="1" fill="#FFE234" />
            <rect x="14" y="7" width="4" height="3" rx="1" fill="#666" />
          </g>
        )}

        {/* Right arm */}
        <rect x="80" y="55" width="16" height="35" rx="6" fill="#007AFF" stroke="#000" strokeWidth="3" />
        {/* Right hand */}
        <circle cx="88" cy="92" r="7" fill="#FFCCBC" stroke="#000" strokeWidth="2" />

        {/* Pants */}
        <rect x="22" y="96" width="56" height="18" rx="4" fill="#1A237E" stroke="#000" strokeWidth="2" />

        {/* Legs */}
        <rect x="25" y="112" width="20" height="16" rx="4" fill="#1A237E" stroke="#000" strokeWidth="3" />
        <rect x="55" y="112" width="20" height="16" rx="4" fill="#1A237E" stroke="#000" strokeWidth="3" />

        {/* Shoes */}
        <rect x="20" y="123" width="28" height="7" rx="4" fill="#212121" stroke="#000" strokeWidth="2" />
        <rect x="52" y="123" width="28" height="7" rx="4" fill="#212121" stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );
};
