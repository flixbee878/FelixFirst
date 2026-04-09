import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider, useGame } from './store/GameContext';
import { NavBar } from './components/layout/NavBar';
import { WelcomePage } from './pages/WelcomePage';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';
import { GamePage } from './pages/GamePage';
import { ProfilePage } from './pages/ProfilePage';
import { AvatarPage } from './pages/AvatarPage';
import { ProPage } from './pages/ProPage';

// Inner component so it can read from GameContext
function AppContent() {
  const { profile } = useGame();

  // Gate the entire app behind the username screen
  if (!profile.username) {
    return <WelcomePage />;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/pro" element={<ProPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
