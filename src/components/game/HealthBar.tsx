interface HealthBarProps {
  hp: number;
  maxHp: number;
  label: string;
}

export const HealthBar = ({ hp, maxHp, label }: HealthBarProps) => {
  const pct = Math.max(0, hp / maxHp);
  const barColor = pct > 0.5 ? '#34C759' : pct > 0.25 ? '#FF8C00' : '#FF3B30';

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: '"Fredoka One", cursive', fontWeight: 'bold', fontSize: '0.9rem' }}>
          {label}
        </span>
        <span style={{ fontFamily: '"Fredoka One", cursive', fontWeight: 'bold', fontSize: '0.9rem', color: barColor }}>
          {hp}/{maxHp}
        </span>
      </div>
      <div
        style={{
          background: '#ddd',
          border: '3px solid #000',
          borderRadius: '8px',
          height: '24px',
          overflow: 'hidden',
          boxShadow: '2px 2px 0px #000',
        }}
      >
        <div
          style={{
            width: `${pct * 100}%`,
            height: '100%',
            background: `linear-gradient(to bottom, ${barColor}dd, ${barColor})`,
            borderRight: pct > 0 ? '2px solid #000' : 'none',
            transition: 'width 0.3s ease, background 0.3s ease',
            position: 'relative',
          }}
        >
          {/* Shine effect */}
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: '4px',
              right: '4px',
              height: '6px',
              background: 'rgba(255,255,255,0.4)',
              borderRadius: '3px',
            }}
          />
        </div>
      </div>
    </div>
  );
};
