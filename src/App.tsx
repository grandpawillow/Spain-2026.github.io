
import React, { useState, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { ItineraryView } from './views/ItineraryView';
import { WeatherView } from './views/WeatherView';
import { FlightView } from './views/FlightView';
import { SpanishView } from './views/KoreanView'; // Keeping filename but changed component
import { BookmarksView } from './views/BookmarksView';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab]);

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
