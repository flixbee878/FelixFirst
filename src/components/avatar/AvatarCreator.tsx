import { useState } from 'react';
import type { AvatarConfig } from '../../types/avatar';
import { AVATAR_CATEGORIES, HAIR_COLORS, EYE_COLORS, SKIN_TONES } from '../../constants/avatarParts';
import { AvatarSVG } from './AvatarSVG';

interface AvatarCreatorProps {
  config: AvatarConfig;
  tokens: number;
  unlockedItems: string[];
  onSave: (config: AvatarConfig) => void;
  onUnlock: (itemId: string, cost: number) => void;
}

export const AvatarCreator = ({ config, tokens, unlockedItems, onSave, onUnlock }: AvatarCreatorProps) => {
  const [draft, setDraft] = useState<AvatarConfig>(config);
  const [activeCategory, setActiveCategory] = useState('skinTone');
  const [saved, setSaved] = useState(false);

  const isUnlocked = (cost: number, id: string) =>
    cost === 0 || unlockedItems.includes(id);

  const handleSelect = (key: keyof AvatarConfig, value: string, cost: number, id: string) => {
    if (!isUnlocked(cost, id)) return;
    setDraft(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const activeTab = AVATAR_CATEGORIES.find(c => c.key === activeCategory)!;

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

      {/* Left: Avatar preview */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        minWidth: '180px',
      }}>
        <div style={{
          background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 60%, #4CAF50 100%)',
          border: '4px solid #000',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '4px 4px 0px #000',
        }}>
          <AvatarSVG config={draft} size={150} animate="idle" />
        </div>

        {/* Token balance */}
        <div style={{
          background: '#FFE234',
          border: '3px solid #000',
          borderRadius: '12px',
          padding: '8px 16px',
          boxShadow: '3px 3px 0px #000',
          fontFamily: '"Bangers", cursive',
          fontSize: '1.3rem',
          letterSpacing: '1px',
        }}>
          🪙 {tokens} Tokens
        </div>

        {/* Color pickers inline */}
        <div style={{ width: '100%' }}>
          <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', color: '#444', marginBottom: '4px' }}>Hair Color:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {HAIR_COLORS.map(hc => {
              const unlocked = isUnlocked(hc.tokenCost, hc.id);
              const selected = draft.hairColor === hc.hex;
              return (
                <div
                  key={hc.id}
                  title={hc.name + (unlocked ? '' : ` (${hc.tokenCost}🪙)`)}
                  onClick={() => {
                    if (unlocked) {
                      setDraft(prev => ({ ...prev, hairColor: hc.hex }));
                      setSaved(false);
                    } else if (tokens >= hc.tokenCost) {
                      onUnlock(hc.id, hc.tokenCost);
                      setDraft(prev => ({ ...prev, hairColor: hc.hex }));
                      setSaved(false);
                    }
                  }}
                  style={{
                    width: '28px',
                    height: '28px',
                    background: hc.hex,
                    border: selected ? '3px solid #000' : '2px solid #666',
                    borderRadius: '8px',
                    cursor: unlocked ? 'pointer' : tokens >= hc.tokenCost ? 'pointer' : 'not-allowed',
                    boxShadow: selected ? '2px 2px 0px #000' : 'none',
                    position: 'relative',
                    opacity: !unlocked && tokens < hc.tokenCost ? 0.5 : 1,
                  }}
                >
                  {!unlocked && <span style={{ position: 'absolute', top: '-2px', right: '-2px', fontSize: '8px' }}>🔒</span>}
                </div>
              );
            })}
          </div>

          <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', color: '#444', marginBottom: '4px' }}>Eye Color:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {EYE_COLORS.map(ec => {
              const unlocked = isUnlocked(ec.tokenCost, ec.id);
              const selected = draft.eyeColor === ec.hex;
              return (
                <div
                  key={ec.id}
                  title={ec.name + (unlocked ? '' : ` (${ec.tokenCost}🪙)`)}
                  onClick={() => {
                    if (unlocked) {
                      setDraft(prev => ({ ...prev, eyeColor: ec.hex }));
                      setSaved(false);
                    } else if (tokens >= ec.tokenCost) {
                      onUnlock(ec.id, ec.tokenCost);
                      setDraft(prev => ({ ...prev, eyeColor: ec.hex }));
                      setSaved(false);
                    }
                  }}
                  style={{
                    width: '28px',
                    height: '28px',
                    background: ec.hex,
                    border: selected ? '3px solid #000' : '2px solid #666',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: selected ? '2px 2px 0px #000' : 'none',
                    position: 'relative',
                    opacity: !unlocked && tokens < ec.tokenCost ? 0.5 : 1,
                  }}
                >
                  {!unlocked && <span style={{ position: 'absolute', top: '-2px', right: '-2px', fontSize: '8px' }}>🔒</span>}
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="cartoon-btn"
          onClick={handleSave}
          style={{
            background: saved ? '#34C759' : '#FFE234',
            width: '100%',
            fontSize: '1.1rem',
          }}
        >
          {saved ? '✅ Saved!' : '💾 Save Avatar'}
        </button>
      </div>

      {/* Right: Category selector + options */}
      <div style={{ flex: 1, minWidth: '280px' }}>
        {/* Category tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {AVATAR_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className="cartoon-btn"
              onClick={() => setActiveCategory(cat.key)}
              style={{
                background: activeCategory === cat.key ? '#1A1A2E' : '#fff',
                color: activeCategory === cat.key ? '#FFE234' : '#1A1A2E',
                padding: '6px 14px',
                fontSize: '0.9rem',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Options grid */}
        {activeTab && (
          <div>
            <h3 style={{
              fontFamily: '"Bangers", cursive',
              fontSize: '1.5rem',
              color: '#1A1A2E',
              margin: '0 0 10px',
              letterSpacing: '2px',
            }}>
              {activeTab.icon} {activeTab.label}
            </h3>

            {activeCategory === 'skinTone' ? (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {activeTab.options.map(opt => {
                  const selected = draft.skinTone === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelect('skinTone', opt.id, 0, opt.id)}
                      style={{
                        width: '60px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: SKIN_TONES[opt.id],
                        border: selected ? '4px solid #000' : '3px solid #888',
                        borderRadius: '50%',
                        boxShadow: selected ? '3px 3px 0px #000' : 'none',
                        margin: '0 auto 4px',
                        transition: 'all 0.1s',
                      }} />
                      <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.8rem' }}>{opt.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                {activeTab.options.map(opt => {
                  const unlocked = isUnlocked(opt.tokenCost, opt.id);
                  const canAfford = tokens >= opt.tokenCost;
                  const currentVal = draft[activeTab.key];
                  const selected = currentVal === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        if (unlocked) {
                          handleSelect(activeTab.key, opt.id, opt.tokenCost, opt.id);
                        } else if (canAfford) {
                          onUnlock(opt.id, opt.tokenCost);
                          handleSelect(activeTab.key, opt.id, 0, opt.id);
                        }
                      }}
                      style={{
                        background: selected ? '#1A1A2E' : unlocked ? '#fff' : '#f5f5f5',
                        border: `3px solid ${selected ? '#FFE234' : unlocked ? '#000' : '#ccc'}`,
                        borderRadius: '12px',
                        padding: '10px',
                        cursor: unlocked || canAfford ? 'pointer' : 'not-allowed',
                        textAlign: 'center',
                        boxShadow: selected ? '3px 3px 0px #FFE234' : unlocked ? '2px 2px 0px #000' : 'none',
                        transition: 'all 0.1s',
                        opacity: !unlocked && !canAfford ? 0.5 : 1,
                        position: 'relative',
                      }}
                    >
                      {/* Preview mini-avatar for certain categories */}
                      <div style={{
                        fontFamily: '"Fredoka One", cursive',
                        fontSize: '1rem',
                        color: selected ? '#FFE234' : unlocked ? '#1A1A2E' : '#888',
                        marginBottom: '4px',
                        fontWeight: 'bold',
                      }}>
                        {opt.name}
                      </div>

                      {unlocked ? (
                        <div style={{
                          background: selected ? 'rgba(255,226,52,0.2)' : '#f0f0f0',
                          borderRadius: '6px',
                          padding: '2px 6px',
                          display: 'inline-block',
                        }}>
                          <span style={{ fontSize: '0.75rem', color: selected ? '#FFE234' : '#666', fontFamily: '"Fredoka One", cursive' }}>
                            {selected ? '✓ Selected' : 'Free'}
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{
                            background: canAfford ? '#FFE234' : '#e5e7eb',
                            border: '2px solid #000',
                            borderRadius: '8px',
                            padding: '3px 8px',
                            display: 'inline-block',
                            boxShadow: canAfford ? '2px 2px 0px #000' : 'none',
                          }}
                        >
                          <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            🪙 {opt.tokenCost}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
