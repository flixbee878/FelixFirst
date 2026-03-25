import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../store/GameContext';
import { useGameBattle } from '../../hooks/useGameBattle';
import { RobotSprite } from './RobotSprite';
import { PlayerSprite } from './PlayerSprite';
import { HealthBar } from './HealthBar';
import { AttackWord } from './AttackWord';
import { BattleLog } from './BattleLog';
import { VictoryScreen } from './VictoryScreen';
import { SpeechBubble } from './SpeechBubble';
import { getRandomTaunt } from '../../constants/words';

const ROBOT_COLORS = ['#607D8B', '#f44336', '#9C27B0', '#FF9800', '#009688', '#E91E63'];

export const BattleArena = () => {
  const navigate = useNavigate();
  const { profile, recordWin, recordLoss } = useGame();
  const robotColor = ROBOT_COLORS[(profile.rank - 1) % ROBOT_COLORS.length];
  const [taunt, setTaunt] = useState(getRandomTaunt());
  const recordedRef = useRef(false);

  const { state, startBattle, submitWord, handleMiss, resetBattle } = useGameBattle({
    playerRank: profile.rank,
    onWin: () => {
      if (!recordedRef.current) {
        recordedRef.current = true;
        recordWin();
      }
    },
    onLose: () => {
      if (!recordedRef.current) {
        recordedRef.current = true;
        recordLoss();
      }
    },
  });

  useEffect(() => {
    if (state.phase === 'robot_turn') {
      setTaunt(getRandomTaunt());
    }
  }, [state.phase]);

  const handlePlayAgain = () => {
    recordedRef.current = false;
    resetBattle();
    setTimeout(() => startBattle(), 100);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const playerSpriteState =
    state.phase === 'player_attack_anim' ? 'attacking'
    : state.phase === 'robot_attack_anim' ? 'hurt'
    : state.phase === 'defeat' ? 'defeated'
    : 'idle';

  const robotSpriteState =
    state.phase === 'robot_turn' || state.phase === 'robot_attack_anim' ? 'attacking'
    : state.phase === 'player_attack_anim' ? 'hurt'
    : state.phase === 'victory' ? 'defeated'
    : 'idle';

  const isVictory = state.phase === 'victory';
  const isDefeat = state.phase === 'defeat';
  const isPlayerTurn = state.phase === 'player_turn';

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #4CAF50 100%)',
        border: '4px solid #000',
        borderRadius: '20px',
        padding: '20px',
        position: 'relative',
        minHeight: '560px',
        boxShadow: '6px 6px 0px #000',
      }}
    >
      {/* Decorative clouds */}
      <div style={{ position: 'absolute', top: '10px', left: '20px', opacity: 0.7 }}>
        <div style={{
          width: '80px', height: '30px', background: '#fff',
          borderRadius: '20px', border: '2px solid #ddd',
        }} />
      </div>
      <div style={{ position: 'absolute', top: '20px', right: '40px', opacity: 0.6 }}>
        <div style={{
          width: '60px', height: '22px', background: '#fff',
          borderRadius: '15px', border: '2px solid #ddd',
        }} />
      </div>

      {/* Battle area */}
      {state.phase === 'idle' ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '480px', gap: '24px' }}>
          <h2 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: '2.5rem',
            color: '#1A1A2E',
            textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
            letterSpacing: '3px',
            margin: 0,
          }}>
            ⚔️ ROBOT BATTLE MODE ⚔️
          </h2>
          <div style={{ animation: 'float 3s ease-in-out infinite' }}>
            <RobotSprite state="idle" color={robotColor} size={180} />
          </div>
          <p style={{
            fontFamily: '"Fredoka One", cursive',
            fontSize: '1.1rem',
            color: '#333',
            textAlign: 'center',
            maxWidth: '360px',
            margin: 0,
          }}>
            Evil robots are invading! Type words to defeat them and save the world!
          </p>
          <button
            className="cartoon-btn"
            onClick={startBattle}
            style={{
              background: '#FF3B30',
              color: '#fff',
              fontSize: '1.3rem',
              padding: '14px 32px',
              animation: 'bounce_slow 2s ease-in-out infinite',
            }}
          >
            ⚔️ START BATTLE!
          </button>
        </div>
      ) : (
        <>
          {/* HP Bars */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <HealthBar hp={state.playerHP} maxHp={state.playerMaxHP} label="🧑 YOU" />
            </div>
            <div style={{ flex: 1 }}>
              <HealthBar hp={state.robotHP} maxHp={state.robotMaxHP} label="🤖 ROBOT" />
            </div>
          </div>

          {/* Sprites Area */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0 20px',
              marginBottom: '16px',
              minHeight: '200px',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1))',
              borderRadius: '12px',
            }}
          >
            {/* Player side */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <PlayerSprite state={playerSpriteState} size={130} />
              {state.phase === 'player_attack_anim' && state.lastDamage > 0 && (
                <div style={{
                  fontFamily: '"Bangers", cursive',
                  fontSize: '1.5rem',
                  color: '#FFE234',
                  textShadow: '2px 2px 0px #000',
                  animation: 'damage_float 1.2s ease-out forwards',
                }}>
                  -{state.lastDamage}
                </div>
              )}
            </div>

            {/* VS / Status text */}
            <div style={{ textAlign: 'center' }}>
              {state.phase === 'robot_turn' ? (
                <div>
                  <div style={{
                    fontFamily: '"Bangers", cursive',
                    fontSize: '1.8rem',
                    color: '#FF3B30',
                    textShadow: '2px 2px 0px #000',
                    animation: 'bounce_slow 1s ease-in-out infinite',
                  }}>
                    ROBOT<br/>ATTACKS!
                  </div>
                </div>
              ) : state.phase === 'player_turn' ? (
                <div style={{
                  fontFamily: '"Bangers", cursive',
                  fontSize: '1.5rem',
                  color: '#34C759',
                  textShadow: '2px 2px 0px #000',
                }}>
                  YOUR<br/>TURN!
                </div>
              ) : (
                <div style={{
                  fontFamily: '"Bangers", cursive',
                  fontSize: '1.8rem',
                  color: '#FFE234',
                  textShadow: '2px 2px 0px #000',
                }}>
                  VS
                </div>
              )}
            </div>

            {/* Robot side */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              {(state.phase === 'robot_turn' || state.phase === 'robot_attack_anim') && (
                <SpeechBubble text={taunt} side="right" />
              )}
              <div style={{ marginTop: state.phase === 'robot_turn' ? '16px' : '0' }}>
                <RobotSprite state={robotSpriteState} color={robotColor} size={150} />
              </div>
              {state.phase === 'robot_attack_anim' && state.lastPlayerDamage > 0 && (
                <div style={{
                  fontFamily: '"Bangers", cursive',
                  fontSize: '1.5rem',
                  color: '#FF3B30',
                  textShadow: '2px 2px 0px #000',
                  animation: 'damage_float 1.2s ease-out forwards',
                }}>
                  -{state.lastPlayerDamage}
                </div>
              )}
            </div>
          </div>

          {/* Attack Input */}
          <div style={{ marginBottom: '12px' }}>
            <AttackWord
              word={state.currentWord}
              active={isPlayerTurn}
              onComplete={submitWord}
              onExpire={handleMiss}
              timeLimit={Math.max(3000, 6000 - profile.rank * 300)}
            />
          </div>

          {/* Battle Log */}
          <BattleLog entries={state.battleLog} />
        </>
      )}

      {/* Victory/Defeat overlay */}
      {(isVictory || isDefeat) && (
        <VictoryScreen
          won={isVictory}
          onPlayAgain={handlePlayAgain}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
};
