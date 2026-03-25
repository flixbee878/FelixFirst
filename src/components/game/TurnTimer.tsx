interface TurnTimerProps {
  progress: number; // 1 = full, 0 = empty
  timeRemaining: number;
}

export const TurnTimer = ({ progress, timeRemaining }: TurnTimerProps) => {
  const secs = Math.ceil(timeRemaining / 1000);
  const color = progress > 0.5 ? '#34C759' : progress > 0.25 ? '#FF8C00' : '#FF3B30';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          flex: 1,
          height: '16px',
          background: '#ddd',
          border: '3px solid #000',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '2px 2px 0px #000',
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: '100%',
            background: color,
            transition: 'width 0.05s linear, background 0.3s',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '1.5rem',
          color,
          minWidth: '32px',
          textAlign: 'right',
          textShadow: '1px 1px 0px #000',
        }}
      >
        {secs}s
      </span>
    </div>
  );
};
