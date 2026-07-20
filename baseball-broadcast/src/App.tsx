import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { BroadcastsPage } from './pages/BroadcastsPage';
import { GameDetailPage } from './pages/GameDetailPage';
import { LeaderboardsPage } from './pages/LeaderboardsPage';
import { TeamsPage } from './pages/TeamsPage';
import { AnnouncersPage } from './pages/AnnouncersPage';
import { ScoreBoothPage } from './pages/ScoreBoothPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/broadcasts" element={<BroadcastsPage />} />
            <Route path="/broadcasts/:gameId" element={<GameDetailPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/announcers" element={<AnnouncersPage />} />
            <Route path="/booth" element={<ScoreBoothPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
