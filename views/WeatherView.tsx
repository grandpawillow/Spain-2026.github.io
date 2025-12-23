import React, { useEffect, useState } from 'react';
import { CloudSun, Droplets, Thermometer, Wind, Cloud, Sun, Snowflake, CloudRain, ExternalLink, RefreshCcw } from 'lucide-react';
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

export const WeatherView: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchWeather();
            setWeather(data);
        } catch (error) {
            console.error("Failed to load weather data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="p-4 pt-6 pb-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold font-display text-text-primary">天氣</h1>
                <button 
                    onClick={loadData} 
                    disabled={loading}
                    className="p-2 rounded-full bg-white border border-gray-200 text-text-secondary hover:text-primary hover:border-primary transition-all disabled:opacity-50 active:scale-95 shadow-sm"
                    aria-label="Refresh weather"
                >
                    <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            
            <div className="space-y-3">
                {loading && !weather ? (
                    <div className="text-center py-8 text-text-tertiary">載入天氣資訊...</div>
                ) : (
                    weather?.forecast.map((day, index) => (
                        <ForecastRow key={index} data={day} />
                    ))
                )}
            </div>
            
            {!loading && weather && (
                <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-100 flex gap-3">
                    <Thermometer className="w-5 h-5 text-orange-500 shrink-0" />
                    <div className="text-sm text-text-secondary">
                        <span className="font-bold text-orange-700 block mb-1">天氣提示</span>
                        請根據實時天氣預報準備合適衣物。如遇降雨或降雪，請帶備雨具。
                    </div>
                </div>
            )}

            <div className="space-y-3 mt-6">
                 <a 
                    href="weather://?city=Seoul%2C%20South%20Korea" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-3 bg-white border border-gray-200 text-text-secondary rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 hover:text-primary transition-colors text-sm"
                >
                    天氣app <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                    href="https://www.kma.go.kr/nchn/index.do" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-white border border-gray-200 text-text-secondary rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 hover:text-primary transition-colors text-sm"
                >
                    查看韓國氣象廳官網 <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
};

const ForecastRow: React.FC<{ data: DailyForecast }> = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center justify-between">
            {/* Date */}
            <div className="w-16">
                <div className="font-bold text-text-primary">{data.date}</div>
                <div className="text-xs text-text-tertiary font-bold">({data.dayOfWeek})</div>
            </div>

            {/* Icon & Condition */}
            <div className="flex flex-col items-center flex-1 px-2">
                <WeatherIcon icon={data.icon} className="w-6 h-6 text-primary mb-1" />
                <span className="text-[10px] font-bold text-text-secondary text-center leading-tight">{data.condition}</span>
            </div>

            {/* Temp Range */}
            <div className="flex flex-col items-end w-20">
                <div className="text-sm font-bold text-text-primary">
                    <span className="text-blue-600">{data.tempLow}°</span> / <span className="text-red-500">{data.tempHigh}°</span>
                </div>
                <div className="text-[10px] text-text-tertiary flex items-center gap-1 mt-1">
                    <Droplets className="w-3 h-3" /> {data.humidity}%
                </div>
            </div>
            
            {/* Feels Like (Rightmost column for emphasis) */}
            <div className="w-16 text-right pl-2 border-l border-gray-100 ml-2">
                <div className="text-[10px] text-text-tertiary">體感</div>
                <div className="text-sm font-bold text-text-primary">{data.feelsLike}°</div>
            </div>
        </div>
    );
};