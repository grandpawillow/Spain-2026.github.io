import React, { useState, useEffect } from 'react';
import { ITINERARY_DATA } from '../constants';
import { TabNav } from '../components/TabNav';
import { EventCard } from '../components/EventCard';
import { EventDetail } from '../components/EventDetail';
import { TripEvent, WeatherData } from '../types';
import { fetchWeather } from '../services/api';
import { Sun, Cloud, CloudRain, Snowflake, CloudSun, Map as MapIcon } from 'lucide-react';

interface ItineraryViewProps {
    // Empty props as notes are removed
}

const WeatherIcon: React.FC<{ icon: string, className?: string }> = ({ icon, className }) => {
    switch(icon) {
        case 'sun': return <Sun className={className} />;
        case 'cloud': return <Cloud className={className} />;
        case 'rain': return <CloudRain className={className} />;
        case 'snowflake': return <Snowflake className={className} />;
        default: return <CloudSun className={className} />;
    }
};

export const ItineraryView: React.FC<ItineraryViewProps> = () => {
    const [activeDay, setActiveDay] = useState<number>(1);
    const [selectedEvent, setSelectedEvent] = useState<TripEvent | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const currentItinerary = ITINERARY_DATA.find(d => d.day === activeDay);

    useEffect(() => {
        const loadWeather = async () => {
            try {
                const data = await fetchWeather();
                setWeather(data);
            } catch (e) {
                console.error("Failed to load weather in Itinerary", e);
            }
        };
        loadWeather();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const dayForecast = weather?.forecast.find(f => currentItinerary && currentItinerary.date.startsWith(f.date));

    return (
        <div className="pt-4">
            <div className="flex justify-between items-center px-4 mb-4">
                <h1 className="text-4xl font-bold font-display text-text-primary">行程表</h1>
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=Seoul" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-white border border-gray-200 rounded-full text-text-secondary shadow-sm hover:bg-gray-50 hover:text-primary transition-colors"
                    aria-label="Open Google Maps"
                >
                    <MapIcon className="w-6 h-6" />
                </a>
            </div>
            
            {/* Day Nav with Scroll Effect */}
            <div className={`sticky top-0 z-20 py-3 mb-4 transition-all duration-300 ${
                isScrolled ? 'bg-white/85 backdrop-blur-md shadow-sm rounded-b-3xl' : ''
            }`}>
                <TabNav days={ITINERARY_DATA} activeDay={activeDay} onSelectDay={setActiveDay} />
            </div>

            {/* Timeline List */}
            <div className="px-4 pb-20">
                {currentItinerary && (
                    <div className="animate-fade-in relative">
                        <div className="mb-6 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold font-display text-text-primary">
                                    {currentItinerary.title}
                                </h2>
                                <p className="text-sm text-text-secondary">
                                    Day {currentItinerary.day} • {currentItinerary.date}
                                </p>
                            </div>
                            
                            {/* Weather Display for the day */}
                            {dayForecast && (
                                <div className="flex flex-col items-end">
                                    <WeatherIcon icon={dayForecast.icon} className="w-8 h-8 text-primary mb-1" />
                                    <span className="text-sm font-bold text-text-primary">
                                        {dayForecast.tempHigh}° <span className="text-text-tertiary text-xs">/ {dayForecast.tempLow}°</span>
                                    </span>
                                </div>
                            )}
                        </div>
                        
                        {/* Timeline Vertical Line 
                            Position Calculation:
                            Time Column Width (72px) + Dot Column Width (16px) / 2 = 80px (Center)
                            Line Width (2px/w-0.5). Left Position = 80px - 1px = 79px.
                        */}
                        <div className="absolute left-[79px] top-16 bottom-0 w-0.5 bg-gray-200" />

                        <div className="space-y-6 relative">
                            {currentItinerary.events.map((event) => (
                                <EventCard 
                                    key={event.id} 
                                    event={event} 
                                    onClick={() => setSelectedEvent(event)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedEvent && (
                <EventDetail 
                    event={selectedEvent}
                    isOpen={!!selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};