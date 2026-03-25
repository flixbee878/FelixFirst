import type { Lesson } from '../../types';

interface LessonCardProps {
  lesson: Lesson;
  isActive: boolean;
  onClick: () => void;
}

const CATEGORY_COLORS: Record<Lesson['category'], string> = {
  home_row: '#007AFF',
  common_words: '#34C759',
  speed_drill: '#FF3B30',
};

const CATEGORY_LABELS: Record<Lesson['category'], string> = {
  home_row: '⌨️ Home Row',
  common_words: '📝 Common Words',
  speed_drill: '⚡ Speed Drill',
};

export const LessonCard = ({ lesson, isActive, onClick }: LessonCardProps) => {
  const color = CATEGORY_COLORS[lesson.category];

  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? color : '#fff',
        border: `4px solid ${isActive ? '#000' : '#333'}`,
        borderRadius: '14px',
        padding: '16px',
        cursor: 'pointer',
        boxShadow: isActive ? `4px 4px 0px #000` : '2px 2px 0px #888',
        transition: 'all 0.1s',
        transform: isActive ? 'translate(-2px, -2px)' : undefined,
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '6px' }}>{lesson.icon}</div>
      <h3
        style={{
          fontFamily: '"Fredoka One", cursive',
          fontSize: '1rem',
          margin: '0 0 4px',
          color: isActive ? '#fff' : '#1A1A2E',
        }}
      >
        {lesson.title}
      </h3>
      <p
        style={{
          fontFamily: '"Fredoka One", cursive',
          fontSize: '0.8rem',
          color: isActive ? 'rgba(255,255,255,0.85)' : '#666',
          margin: '0 0 8px',
          lineHeight: 1.3,
        }}
      >
        {lesson.description}
      </p>
      <span
        style={{
          background: isActive ? 'rgba(0,0,0,0.2)' : color,
          color: '#fff',
          fontFamily: '"Fredoka One", cursive',
          fontSize: '0.7rem',
          padding: '2px 8px',
          borderRadius: '10px',
          border: '2px solid #000',
        }}
      >
        {CATEGORY_LABELS[lesson.category]}
      </span>
    </div>
  );
};
