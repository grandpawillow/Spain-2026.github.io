
import React, { useState, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { ItineraryView } from './views/ItineraryView';
import { WeatherView } from './views/WeatherView';
import { FlightView } from './views/FlightView';
import { SpanishView } from './views/KoreanView'; 
import { BookmarksView } from './views/BookmarksView';
import { Lock, Unlock, UtensilsCrossed } from 'lucide-react';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if previously unlocked
    const savedStatus = localStorage.getItem('trip_unlocked');
    if (savedStatus === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab]);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (password.toLowerCase() === 'spain2026') {
      setIsUnlocked(true);
      localStorage.setItem('trip_unlocked', 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
      // Shake effect or feedback can be added here
    }
  };

  const renderView = () => {
    switch (currentTab) {
      case 'home': return <HomeView />;
      case 'weather': return <WeatherView />;
      case 'flight': return <FlightView />;
      case 'spanish': return <SpanishView />;
      case 'bookmarks': return <BookmarksView />;
      default: return <ItineraryView />;
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-app-bg flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
            <UtensilsCrossed className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-bold font-display text-text-primary mb-2">
            2026 西班牙之旅
          </h1>
          <p className="text-text-tertiary text-sm mb-8 font-medium">
            請輸入密碼解鎖行程表 🇪🇸
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full bg-gray-50 border ${error ? 'border-red-500 animate-bounce' : 'border-gray-200'} rounded-2xl py-4 px-6 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-xs font-bold mt-2">密碼錯誤，請再試一次！</p>
              )}
            </div>
            
            <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              解鎖行程 <Unlock className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-[10px] text-text-tertiary uppercase tracking-widest font-black opacity-40">
            Tapas are waiting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-xl mx-auto bg-app-bg relative">
      <div className="h-2"></div>
      <div className="animate-fade-in">
        {renderView()}
      </div>
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default App;
