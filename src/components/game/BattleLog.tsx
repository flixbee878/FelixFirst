import type { BattleLogEntry } from '../../types';

interface BattleLogProps {
  entries: BattleLogEntry[];
}

const LOG_COLORS: Record<BattleLogEntry['type'], string> = {
  player_attack: '#34C759',
  robot_attack: '#FF3B30',
  miss: '#FF8C00',
  system: '#FFE234',
};

export const BattleLog = ({ entries }: BattleLogProps) => {
  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.85)',
        border: '3px solid #000',
        borderRadius: '12px',
        padding: '10px',
        minHeight: '80px',
        maxHeight: '120px',
        overflowY: 'auto',
      }}
    >
      {entries.length === 0 ? (
        <p style={{ color: '#666', fontFamily: '"Fredoka One", cursive', fontSize: '0.9rem', margin: 0, textAlign: 'center' }}>
          Battle log will appear here...
        </p>
      ) : (
        [...entries].reverse().map((entry) => (
          <div
            key={entry.id}
            style={{
              fontFamily: '"Fredoka One", cursive',
              fontSize: '0.85rem',
              color: LOG_COLORS[entry.type],
              padding: '2px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {entry.message}
          </div>
        ))
      )}
    </div>
  );
};
