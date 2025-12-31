
import React, { useEffect, useState } from 'react';
import { CloudSun, Droplets, Thermometer, Sun, Cloud, Snowflake, CloudRain, ExternalLink, RefreshCcw, MapPin } from 'lucide-react';
import { fetchWeather } from '../services/api';
import { WeatherData, DailyForecast } from '../types';

const WeatherIcon: React.FC<{ icon: string, className?: string }> = ({ icon, className }) => {
    switch(icon) {
        case 'sun': return <Sun className={className} />;
        case 'cloud': return <Cloud className={className} />;
        case 'rain': return <CloudRain className={className} />;
        case 'snowflake': return <Snowflake className={className} />;
        default: return <CloudSun className={className} />;
    }
};

const CITIES = [
    { id: 'bcn', name: 'Barcelona', lat: 41.3851, lon: 2.1734 },
    { id: 'svq', name: 'Seville', lat: 37.3891, lon: -5.9845 },
    { id: 'mad', name: 'Madrid', lat: 40.4168, lon: -3.7038 },
];

export const WeatherView: React.FC = () => {
    const [activeCityId, setActiveCityId] = useState(CITIES[0].id);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    const activeCity = CITIES.find(c => c.id === activeCityId) || CITIES[0];

    const loadData = async (cityId: string) => {
        setLoading(true);
        const city = CITIES.find(c => c.id === cityId) || CITIES[0];
        try {
            const data = await fetchWeather(city.lat, city.lon);
            setWeather(data);
        } catch (error) {
            console.error("Failed to load weather data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(activeCityId);
    }, [activeCityId]);

    return (
        <div className="p-4 pt-6 pb-20">
            <div className="flex justify-between items-center mb-6 px-1">
                <div>
                    <h1 className="text-4xl font-bold font-display text-text-primary">天氣預報</h1>
                    <p className="text-text-tertiary text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {activeCity.name}, Spain
                    </p>
                </div>
                <button 
                    onClick={() => loadData(activeCityId)} 
                    disabled={loading}
                    className="p-3 rounded-full bg-white border border-gray-200 text-text-secondary hover:text-primary hover:border-primary transition-all disabled:opacity-50 active:scale-95 shadow-sm"
                    aria-label="Refresh weather"
                >
                    <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* City Tabs - Updated to use English Names */}
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-2xl">
                {CITIES.map(city => (
                    <button
                        key={city.id}
                        onClick={() => setActiveCityId(city.id)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                            activeCityId === city.id 
                                ? 'bg-white text-primary shadow-sm scale-[1.02]' 
                                : 'text-text-tertiary hover:text-text-secondary'
                        }`}
                    >
                        {city.name}
                    </button>
                ))}
            </div>
            
            <div className="space-y-3">
                {loading && !weather ? (
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-20 bg-white rounded-2xl animate-pulse border border-gray-100" />
                        ))}
                    </div>
                ) : (
                    weather?.forecast.map((day, index) => (
                        <ForecastRow key={`${activeCityId}-${index}`} data={day} />
                    ))
                )}
            </div>
            
            {!loading && weather && (
                <div className="mt-6 p-5 bg-orange-50 rounded-3xl border border-orange-100 flex gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Thermometer className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-sm text-text-secondary">
                        <span className="font-bold text-orange-800 block mb-1">西班牙旅遊建議</span>
                        {activeCityId === 'svq' ? 'Seville 氣候較為乾燥炎熱，請注意補充水分及防曬。' : 
                         activeCityId === 'mad' ? 'Madrid 日夜溫差較大，建議採用洋蔥式穿法。' : 
                         'Barcelona 受地中海影響，天氣相對溫和但早晚仍有涼意。'}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-3 mt-6">
                <a 
                    href={`https://www.google.com/search?q=weather+${activeCity.name}+spain`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-4 bg-white border border-gray-200 text-text-secondary rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 hover:text-primary transition-colors text-sm"
                >
                    即時詳細預報 <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                    href="https://www.aemet.es/en/portada" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-white border border-gray-200 text-text-secondary rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 hover:text-primary transition-colors text-sm"
                >
                    查看西班牙氣象局 (AEMET) <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
};

const ForecastRow: React.FC<{ data: DailyForecast }> = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center justify-between transition-all hover:border-primary/20">
            {/* Date */}
            <div className="w-16">
                <div className="font-bold text-text-primary">{data.date}</div>
                <div className="text-[10px] text-text-tertiary font-black uppercase tracking-widest">({data.dayOfWeek})</div>
            </div>

            {/* Icon & Condition */}
            <div className="flex flex-col items-center flex-1 px-2">
                <WeatherIcon icon={data.icon} className="w-6 h-6 text-primary mb-1" />
                <span className="text-[10px] font-bold text-text-secondary text-center leading-tight">{data.condition}</span>
            </div>

            {/* Temp Range */}
            <div className="flex flex-col items-end w-20">
                <div className="text-sm font-bold text-text-primary">
                    <span className="text-blue-500">{data.tempLow}°</span> / <span className="text-red-500">{data.tempHigh}°</span>
                </div>
                <div className="text-[10px] text-text-tertiary font-bold flex items-center gap-1 mt-1">
                    <Droplets className="w-3 h-3 text-blue-400" /> {data.humidity}%
                </div>
            </div>
            
            {/* Feels Like */}
            <div className="w-16 text-right pl-3 border-l border-gray-100 ml-2">
                <div className="text-[9px] font-black text-text-tertiary uppercase tracking-tighter">FEELS</div>
                <div className="text-sm font-black text-text-primary">{data.feelsLike}°</div>
            </div>
        </div>
    );
};
