interface SpeechBubbleProps {
  text: string;
  side?: 'left' | 'right';
}

export const SpeechBubble = ({ text, side = 'left' }: SpeechBubbleProps) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', maxWidth: '200px' }}>
      <div
        style={{
          background: '#fff',
          border: '3px solid #000',
          borderRadius: '14px',
          padding: '8px 12px',
          fontFamily: '"Fredoka One", cursive',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          color: '#1A1A2E',
          boxShadow: '3px 3px 0px #000',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
      {/* Tail */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12px',
          [side === 'left' ? 'left' : 'right']: '20px',
          width: '0',
          height: '0',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '12px solid #000',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-8px',
          [side === 'left' ? 'left' : 'right']: '21px',
          width: '0',
          height: '0',
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop: '10px solid #fff',
        }}
      />
    </div>
  );
};
