import { useState, useMemo } from 'react';
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

export const AvatarCreator = ({
  config, tokens, unlockedItems, onSave, onUnlock,
}: AvatarCreatorProps) => {
  // draft = what gets saved (owned items only)
  const [draft, setDraft] = useState<AvatarConfig>(config);
  // liveConfig = what the avatar displays (may include previewed locked items)
  const [liveConfig, setLiveConfig] = useState<AvatarConfig>(config);
  const [activeCategory, setActiveCategory] = useState('skinTone');
  const [saved, setSaved] = useState(false);

  const isOwned = (id: string, cost: number) =>
    cost === 0 || unlockedItems.includes(id);

  // ── Detect which fields are being previewed (live ≠ draft) ───────────────
  const isPreviewing = useMemo(() => {
    return (Object.keys(draft) as (keyof AvatarConfig)[]).some(k => liveConfig[k] !== draft[k]);
  }, [liveConfig, draft]);

  const clearPreview = () => setLiveConfig(draft);

  // ── Select an owned item → update both draft and live ───────────────────
  const selectOwned = (key: keyof AvatarConfig, value: string) => {
    setDraft(prev => ({ ...prev, [key]: value }));
    setLiveConfig(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  // ── Preview a locked item → update live only ──────────────────────────
  const previewLocked = (key: keyof AvatarConfig, value: string) => {
    setLiveConfig(prev => ({ ...prev, [key]: value }));
  };

  // ── Buy a locked item → unlock, then treat as owned ──────────────────
  const buyLocked = (key: keyof AvatarConfig, value: string, cost: number) => {
    onUnlock(value, cost);
    setDraft(prev => ({ ...prev, [key]: value }));
    setLiveConfig(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // Only save the owned config, not the preview
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const activeTab = AVATAR_CATEGORIES.find(c => c.key === activeCategory)!;

  // ── Previewing info for hair/eye colors ────────────────────────────────
  const previewedHairColor = HAIR_COLORS.find(hc => hc.hex === liveConfig.hairColor);
  const isPreviewingHairColor = liveConfig.hairColor !== draft.hairColor;
  const previewedEyeColor = EYE_COLORS.find(ec => ec.hex === liveConfig.eyeColor);
  const isPreviewingEyeColor = liveConfig.eyeColor !== draft.eyeColor;

  const btnBase: React.CSSProperties = {
    fontFamily: '"Fredoka One", cursive',
    fontSize: '0.75rem',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '2px 2px 0px #000',
    flex: 1,
  };

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

      {/* ── Left: Avatar preview ─────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', minWidth: '180px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 60%, #4CAF50 100%)',
            border: `4px solid ${isPreviewing ? '#3B82F6' : '#000'}`,
            borderRadius: '16px',
            padding: '16px',
            boxShadow: isPreviewing ? '4px 4px 0px #3B82F6' : '4px 4px 0px #000',
          }}>
            <AvatarSVG config={liveConfig} size={150} animate="idle" />
          </div>
          {/* Preview banner */}
          {isPreviewing && (
            <div style={{
              position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)',
              background: '#3B82F6', color: '#fff', border: '2px solid #000',
              borderRadius: '12px', padding: '2px 12px',
              fontFamily: '"Fredoka One", cursive', fontSize: '0.75rem', whiteSpace: 'nowrap',
              boxShadow: '2px 2px 0px #000',
            }}>
              🔍 PREVIEW MODE
            </div>
          )}
        </div>

        {/* Clear preview button */}
        {isPreviewing && (
          <button
            onClick={clearPreview}
            style={{ ...btnBase, background: '#6B7280', color: '#fff', width: '100%', fontSize: '0.85rem', flex: 'none' }}
          >
            ✕ Clear Preview
          </button>
        )}

        {/* Token balance */}
        <div style={{
          background: '#FFE234', border: '3px solid #000', borderRadius: '12px',
          padding: '8px 16px', boxShadow: '3px 3px 0px #000',
          fontFamily: '"Bangers", cursive', fontSize: '1.3rem', letterSpacing: '1px',
        }}>
          🪙 {tokens} Tokens
        </div>

        {/* ── Color pickers ──────────────────────────────────────────── */}
        <div style={{ width: '100%' }}>
          <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', color: '#444', marginBottom: '4px' }}>
            Hair Color:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
            {HAIR_COLORS.map(hc => {
              const owned = isOwned(hc.id, hc.tokenCost);
              const selected = liveConfig.hairColor === hc.hex;
              return (
                <div
                  key={hc.id}
                  title={hc.name + (owned ? '' : ` — ${hc.tokenCost}🪙`)}
                  onClick={() => {
                    if (owned) {
                      selectOwned('hairColor', hc.hex);
                    } else {
                      // Always preview, even if can't afford
                      previewLocked('hairColor', hc.hex);
                    }
                  }}
                  style={{
                    width: '28px', height: '28px', background: hc.hex,
                    border: selected
                      ? (owned ? '3px solid #000' : '3px solid #3B82F6')
                      : '2px solid #666',
                    borderRadius: '8px', cursor: 'pointer',
                    boxShadow: selected ? '2px 2px 0px #000' : 'none',
                    position: 'relative',
                    opacity: !owned && tokens < hc.tokenCost ? 0.6 : 1,
                  }}
                >
                  {!owned && (
                    <span style={{ position: 'absolute', top: '-2px', right: '-2px', fontSize: '8px' }}>🔒</span>
                  )}
                </div>
              );
            })}
          </div>
          {/* Buy banner for previewed hair color */}
          {isPreviewingHairColor && previewedHairColor && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.75rem', color: '#3B82F6' }}>
                🔍 Previewing {previewedHairColor.name}
              </span>
              {tokens >= previewedHairColor.tokenCost ? (
                <button
                  onClick={() => {
                    onUnlock(previewedHairColor.id, previewedHairColor.tokenCost);
                    selectOwned('hairColor', previewedHairColor.hex);
                  }}
                  style={{ ...btnBase, background: '#34C759', color: '#fff', flex: 'none' }}
                >
                  🪙 Buy {previewedHairColor.tokenCost}
                </button>
              ) : (
                <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.72rem', color: '#999' }}>
                  Need {previewedHairColor.tokenCost}🪙
                </span>
              )}
            </div>
          )}

          <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', color: '#444', marginBottom: '4px' }}>
            Eye Color:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
            {EYE_COLORS.map(ec => {
              const owned = isOwned(ec.id, ec.tokenCost);
              const selected = liveConfig.eyeColor === ec.hex;
              return (
                <div
                  key={ec.id}
                  title={ec.name + (owned ? '' : ` — ${ec.tokenCost}🪙`)}
                  onClick={() => {
                    if (owned) {
                      selectOwned('eyeColor', ec.hex);
                    } else {
                      previewLocked('eyeColor', ec.hex);
                    }
                  }}
                  style={{
                    width: '28px', height: '28px', background: ec.hex,
                    border: selected
                      ? (owned ? '3px solid #000' : '3px solid #3B82F6')
                      : '2px solid #666',
                    borderRadius: '8px', cursor: 'pointer',
                    boxShadow: selected ? '2px 2px 0px #000' : 'none',
                    position: 'relative',
                    opacity: !owned && tokens < ec.tokenCost ? 0.6 : 1,
                  }}
                >
                  {!owned && (
                    <span style={{ position: 'absolute', top: '-2px', right: '-2px', fontSize: '8px' }}>🔒</span>
                  )}
                </div>
              );
            })}
          </div>
          {/* Buy banner for previewed eye color */}
          {isPreviewingEyeColor && previewedEyeColor && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.75rem', color: '#3B82F6' }}>
                🔍 Previewing {previewedEyeColor.name}
              </span>
              {tokens >= previewedEyeColor.tokenCost ? (
                <button
                  onClick={() => {
                    onUnlock(previewedEyeColor.id, previewedEyeColor.tokenCost);
                    selectOwned('eyeColor', previewedEyeColor.hex);
                  }}
                  style={{ ...btnBase, background: '#34C759', color: '#fff', flex: 'none' }}
                >
                  🪙 Buy {previewedEyeColor.tokenCost}
                </button>
              ) : (
                <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.72rem', color: '#999' }}>
                  Need {previewedEyeColor.tokenCost}🪙
                </span>
              )}
            </div>
          )}
        </div>

        <button
          className="cartoon-btn"
          onClick={handleSave}
          style={{ background: saved ? '#34C759' : '#FFE234', width: '100%', fontSize: '1.1rem' }}
        >
          {saved ? '✅ Saved!' : '💾 Save Avatar'}
        </button>
      </div>

      {/* ── Right: Category selector + options ───────────────────────── */}
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
                padding: '6px 14px', fontSize: '0.9rem',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {activeTab && (
          <div>
            <h3 style={{
              fontFamily: '"Bangers", cursive', fontSize: '1.5rem',
              color: '#1A1A2E', margin: '0 0 10px', letterSpacing: '2px',
            }}>
              {activeTab.icon} {activeTab.label}
            </h3>

            {/* ── Skin tones (always free, no preview needed) ─────────── */}
            {activeCategory === 'skinTone' ? (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {activeTab.options.map(opt => {
                  const selected = liveConfig.skinTone === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => selectOwned('skinTone', opt.id)}
                      style={{ width: '60px', cursor: 'pointer', textAlign: 'center' }}
                    >
                      <div style={{
                        width: '50px', height: '50px',
                        background: SKIN_TONES[opt.id],
                        border: selected ? '4px solid #000' : '3px solid #888',
                        borderRadius: '50%',
                        boxShadow: selected ? '3px 3px 0px #000' : 'none',
                        margin: '0 auto 4px', transition: 'all 0.1s',
                      }} />
                      <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.8rem' }}>{opt.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ── All other categories ─────────────────────────────── */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                {activeTab.options.map(opt => {
                  const owned = isOwned(opt.id, opt.tokenCost);
                  const canAfford = tokens >= opt.tokenCost;
                  const key = activeTab.key as keyof AvatarConfig;
                  const liveSelected = liveConfig[key] === opt.id;
                  const draftSelected = draft[key] === opt.id;
                  // Is this the item currently being previewed (live but not in draft)?
                  const beingPreviewed = liveSelected && !draftSelected && !owned;

                  let borderColor = '#ccc';
                  let bgColor = '#f5f5f5';
                  if (draftSelected)   { borderColor = '#FFE234'; bgColor = '#1A1A2E'; }
                  else if (liveSelected && owned) { borderColor = '#000'; bgColor = '#fff'; }
                  else if (beingPreviewed) { borderColor = '#3B82F6'; bgColor = '#eff6ff'; }
                  else if (owned)     { borderColor = '#000'; bgColor = '#fff'; }

                  return (
                    <div
                      key={opt.id}
                      style={{
                        background: bgColor,
                        border: `3px ${beingPreviewed ? 'dashed' : 'solid'} ${borderColor}`,
                        borderRadius: '12px',
                        padding: '10px',
                        textAlign: 'center',
                        boxShadow: draftSelected ? '3px 3px 0px #FFE234' : owned ? '2px 2px 0px #000' : 'none',
                        transition: 'all 0.1s',
                        opacity: !owned && !canAfford ? 0.55 : 1,
                        cursor: owned ? 'pointer' : 'default',
                      }}
                      onClick={() => {
                        if (owned) selectOwned(key, opt.id);
                      }}
                    >
                      <div style={{
                        fontFamily: '"Fredoka One", cursive',
                        fontSize: '0.95rem',
                        fontWeight: 'bold',
                        color: draftSelected ? '#FFE234' : owned ? '#1A1A2E' : '#555',
                        marginBottom: '6px',
                      }}>
                        {opt.name}
                      </div>

                      {owned ? (
                        /* ── Owned ──────────────────────────────────── */
                        <div style={{
                          background: draftSelected ? 'rgba(255,226,52,0.2)' : '#f0f0f0',
                          borderRadius: '6px', padding: '2px 8px', display: 'inline-block',
                        }}>
                          <span style={{
                            fontSize: '0.75rem', fontFamily: '"Fredoka One", cursive',
                            color: draftSelected ? '#FFE234' : '#666',
                          }}>
                            {draftSelected ? '✓ Selected' : '✓ Owned'}
                          </span>
                        </div>
                      ) : (
                        /* ── Locked ─────────────────────────────────── */
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
                          {/* Blue Preview button — always visible for locked items */}
                          <button
                            onClick={e => { e.stopPropagation(); previewLocked(key, opt.id); }}
                            style={{
                              ...btnBase,
                              background: beingPreviewed ? '#1D4ED8' : '#3B82F6',
                              color: '#fff',
                            }}
                          >
                            {beingPreviewed ? '🔍 Previewing' : '🔍 Preview'}
                          </button>

                          {/* Green Buy button — only when can afford */}
                          {canAfford ? (
                            <button
                              onClick={e => { e.stopPropagation(); buyLocked(key, opt.id, opt.tokenCost); }}
                              style={{ ...btnBase, background: '#34C759', color: '#fff' }}
                            >
                              🪙 {opt.tokenCost}
                            </button>
                          ) : (
                            /* Can't afford: just show cost */
                            <div style={{
                              ...btnBase,
                              background: '#e5e7eb', color: '#888',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'not-allowed', boxShadow: 'none',
                            }}>
                              🔒 {opt.tokenCost}
                            </div>
                          )}
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
