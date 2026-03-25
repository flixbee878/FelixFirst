import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './store/GameContext';
import { NavBar } from './components/layout/NavBar';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';
import { GamePage } from './pages/GamePage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
