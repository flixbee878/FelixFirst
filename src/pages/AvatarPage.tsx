import { useGame } from '../store/GameContext';
import { AvatarCreator } from '../components/avatar/AvatarCreator';

export const AvatarPage = () => {
  const { profile, avatarConfig, unlockItem, updateAvatar } = useGame();

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '20px', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '3rem',
          color: '#1A1A2E',
          margin: '0 0 4px',
          letterSpacing: '3px',
          textShadow: '3px 3px 0px rgba(0,0,0,0.2)',
        }}>
          🎨 MY AVATAR
        </h1>
        <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: '1rem', color: '#444', margin: 0 }}>
          Customize your character! Earn 🪙 tokens by winning battles to unlock cool stuff!
        </p>
      </div>

      {/* Token tips */}
      <div style={{
        background: '#1A1A2E',
        border: '3px solid #000',
        borderRadius: '12px',
        padding: '10px 16px',
        marginBottom: '20px',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        boxShadow: '3px 3px 0px #000',
      }}>
        <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', color: '#FFE234' }}>
          🪙 How to earn tokens:
        </span>
        <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', color: '#aaa' }}>
          ⚔️ Win a battle = 15+ tokens
        </span>
        <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', color: '#aaa' }}>
          📈 Higher rank = more tokens per win
        </span>
        <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', color: '#aaa' }}>
          🔒 Locked items unlock instantly when you tap them if you can afford it!
        </span>
      </div>

      <AvatarCreator
        config={avatarConfig}
        tokens={profile.tokens}
        unlockedItems={profile.unlockedItems}
        onSave={updateAvatar}
        onUnlock={unlockItem}
      />
    </div>
  );
};
