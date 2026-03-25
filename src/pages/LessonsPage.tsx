import { useState } from 'react';
import { LESSONS } from '../constants/lessons';
import { LessonCard } from '../components/lessons/LessonCard';
import { LessonPractice } from '../components/lessons/LessonPractice';
import type { Lesson } from '../types';

const CATEGORIES = [
  { key: 'all', label: '🌟 All Lessons' },
  { key: 'home_row', label: '⌨️ Home Row' },
  { key: 'common_words', label: '📝 Common Words' },
  { key: 'speed_drill', label: '⚡ Speed Drills' },
] as const;

export const LessonsPage = () => {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | Lesson['category']>('all');

  const filtered = activeCategory === 'all'
    ? LESSONS
    : LESSONS.filter((l) => l.category === activeCategory);

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '3rem',
          color: '#1A1A2E',
          margin: '0 0 4px',
          letterSpacing: '3px',
          textShadow: '3px 3px 0px rgba(0,0,0,0.2)',
        }}>
          📚 TYPING LESSONS
        </h1>
        <p style={{
          fontFamily: '"Fredoka One", cursive',
          fontSize: '1rem',
          color: '#444',
          margin: 0,
        }}>
          Master your keyboard skills step by step!
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            className="cartoon-btn"
            onClick={() => setActiveCategory(key as typeof activeCategory)}
            style={{
              background: activeCategory === key ? '#1A1A2E' : '#fff',
              color: activeCategory === key ? '#FFE234' : '#1A1A2E',
              fontSize: '0.9rem',
              padding: '8px 16px',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: activeLesson ? '280px 1fr' : 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        alignItems: 'start',
      }}>
        {/* Lesson cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: activeLesson ? '1fr' : 'subgrid',
          ...(activeLesson ? {} : { gridColumn: '1 / -1' }),
          gap: '12px',
          ...(activeLesson ? {} : { gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }),
        }}>
          {filtered.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isActive={activeLesson?.id === lesson.id}
              onClick={() => setActiveLesson(activeLesson?.id === lesson.id ? null : lesson)}
            />
          ))}
        </div>

        {/* Practice panel */}
        {activeLesson && (
          <div
            style={{
              background: '#fff',
              border: '4px solid #000',
              borderRadius: '16px',
              boxShadow: '5px 5px 0px #000',
              overflow: 'hidden',
            }}
          >
            {/* Panel header */}
            <div style={{
              background: '#1A1A2E',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '1.5rem' }}>{activeLesson.icon}</span>
                <span style={{
                  fontFamily: '"Bangers", cursive',
                  fontSize: '1.4rem',
                  color: '#FFE234',
                  marginLeft: '8px',
                  letterSpacing: '1px',
                }}>
                  {activeLesson.title}
                </span>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                style={{
                  background: '#333',
                  border: '2px solid #666',
                  borderRadius: '8px',
                  color: '#fff',
                  fontFamily: '"Fredoka One", cursive',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                ✕ Close
              </button>
            </div>

            <LessonPractice key={activeLesson.id} lesson={activeLesson} />
          </div>
        )}
      </div>

      {!activeLesson && (
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          padding: '16px',
          background: 'rgba(255,255,255,0.6)',
          border: '3px solid #ccc',
          borderRadius: '12px',
          fontFamily: '"Fredoka One", cursive',
          color: '#666',
          fontSize: '0.95rem',
        }}>
          👆 Click a lesson to start practicing!
        </div>
      )}
    </div>
  );
};
