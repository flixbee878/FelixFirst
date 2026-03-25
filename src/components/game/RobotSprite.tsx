interface RobotSpriteProps {
  state: 'idle' | 'attacking' | 'hurt' | 'defeated';
  color?: string;
  size?: number;
}

export const RobotSprite = ({ state, color = '#607D8B', size = 160 }: RobotSpriteProps) => {
  const isShaking = state === 'hurt';
  const isAttacking = state === 'attacking';
  const isDefeated = state === 'defeated';

  return (
    <div
      style={{
        display: 'inline-block',
        animation: isShaking
          ? 'shake 0.5s ease-in-out'
          : isAttacking
          ? 'attack_robot 0.4s ease-in-out'
          : 'float 3s ease-in-out infinite',
        opacity: isDefeated ? 0.4 : 1,
        transform: isDefeated ? 'rotate(90deg)' : undefined,
        transition: 'transform 0.5s, opacity 0.5s',
      }}
    >
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 100 130"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna */}
        <line x1="50" y1="10" x2="50" y2="2" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="2" r="4" fill="#FF3B30" stroke="#000" strokeWidth="2" />

        {/* Head */}
        <rect x="25" y="10" width="50" height="40" rx="8" fill={color} stroke="#000" strokeWidth="3" />

        {/* Eyes */}
        <circle cx="37" cy="27" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="63" cy="27" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle
          cx={isAttacking ? 40 : 37}
          cy="27"
          r="4"
          fill={state === 'hurt' ? '#FF3B30' : '#1A1A2E'}
        />
        <circle
          cx={isAttacking ? 66 : 63}
          cy="27"
          r="4"
          fill={state === 'hurt' ? '#FF3B30' : '#1A1A2E'}
        />

        {/* Angry brows when attacking */}
        {isAttacking && (
          <>
            <line x1="29" y1="18" x2="45" y2="22" stroke="#FF3B30" strokeWidth="3" strokeLinecap="round" />
            <line x1="71" y1="18" x2="55" y2="22" stroke="#FF3B30" strokeWidth="3" strokeLinecap="round" />
          </>
        )}

        {/* Mouth */}
        <rect
          x="35"
          y="42"
          width="30"
          height={isAttacking ? 8 : 5}
          rx="2"
          fill={isAttacking ? '#FF3B30' : '#1A1A2E'}
          stroke="#000"
          strokeWidth="1.5"
        />
        {isAttacking && (
          <>
            <line x1="42" y1="42" x2="42" y2="50" stroke="#fff" strokeWidth="2" />
            <line x1="50" y1="42" x2="50" y2="50" stroke="#fff" strokeWidth="2" />
            <line x1="58" y1="42" x2="58" y2="50" stroke="#fff" strokeWidth="2" />
          </>
        )}

        {/* Neck */}
        <rect x="43" y="50" width="14" height="10" fill={color} stroke="#000" strokeWidth="2" />

        {/* Body */}
        <rect x="18" y="60" width="64" height="45" rx="6" fill={color} stroke="#000" strokeWidth="3" />

        {/* Chest core */}
        <circle cx="50" cy="80" r="10" fill={isAttacking ? '#FF3B30' : '#00C8FF'} stroke="#000" strokeWidth="2" />
        <circle cx="50" cy="80" r="6" fill={isAttacking ? '#FF8C00' : '#fff'} opacity="0.8" />

        {/* Chest bolts */}
        <circle cx="28" cy="68" r="3" fill="#455A64" stroke="#000" strokeWidth="1.5" />
        <circle cx="72" cy="68" r="3" fill="#455A64" stroke="#000" strokeWidth="1.5" />
        <circle cx="28" cy="98" r="3" fill="#455A64" stroke="#000" strokeWidth="1.5" />
        <circle cx="72" cy="98" r="3" fill="#455A64" stroke="#000" strokeWidth="1.5" />

        {/* Left arm */}
        <rect
          x={isAttacking ? "-5" : "2"}
          y="60"
          width="16"
          height="35"
          rx="5"
          fill={color}
          stroke="#000"
          strokeWidth="3"
          style={{ transition: 'x 0.3s' }}
        />
        {/* Left claw */}
        <rect x={isAttacking ? "-7" : "0"} y="92" width="7" height="8" rx="2" fill={color} stroke="#000" strokeWidth="2" />
        <rect x={isAttacking ? "-1" : "5"} y="93" width="7" height="8" rx="2" fill={color} stroke="#000" strokeWidth="2" />
        <rect x={isAttacking ? "5" : "11"} y="92" width="7" height="8" rx="2" fill={color} stroke="#000" strokeWidth="2" />

        {/* Right arm */}
        <rect x="82" y="60" width="16" height="35" rx="5" fill={color} stroke="#000" strokeWidth="3" />
        {/* Right claw */}
        <rect x="80" y="92" width="7" height="8" rx="2" fill={color} stroke="#000" strokeWidth="2" />
        <rect x="87" y="93" width="7" height="8" rx="2" fill={color} stroke="#000" strokeWidth="2" />
        <rect x="94" y="92" width="7" height="8" rx="2" fill={color} stroke="#000" strokeWidth="2" />

        {/* Legs */}
        <rect x="25" y="105" width="20" height="22" rx="4" fill={color} stroke="#000" strokeWidth="3" />
        <rect x="55" y="105" width="20" height="22" rx="4" fill={color} stroke="#000" strokeWidth="3" />

        {/* Feet */}
        <rect x="20" y="122" width="28" height="8" rx="4" fill="#37474F" stroke="#000" strokeWidth="2" />
        <rect x="52" y="122" width="28" height="8" rx="4" fill="#37474F" stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );
};
