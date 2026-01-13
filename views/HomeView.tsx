import React, { useState, useEffect } from 'react';
import { ITINERARY_DATA } from '../constants';
import { MapPin, ArrowRight, CloudSun, Snowflake, Sun, Cloud, CloudRain, BedDouble, Copy, Check, Coins, ArrowLeftRight, RefreshCcw, Clock } from 'lucide-react';
import { TripEvent, WeatherData } from '../types';
import { fetchWeather } from '../services/api';

const SmallWeatherIcon: React.FC<{ icon: string, className?: string }> = ({ icon, className }) => {
    switch(icon) {
        case 'sun': return < Sun className={className} />;
        case 'cloud': return <Cloud className={className} />;
        case 'rain': return <CloudRain className={className} />;
        case 'snowflake': return <Snowflake className={className} />;
        default: return <CloudSun className={className} />;
    }
};

const CITIES = [
    { id: 'bcn', name: 'Barcelona', lat: 41.3851, lon: 2.1734, code: 'BCN' },
    { id: 'svq', name: 'Seville', lat: 37.3891, lon: -5.9845, code: 'SVQ' },
    { id: 'mad', name: 'Madrid', lat: 40.4168, lon: -3.7038, code: 'MAD' },
];

interface CountdownTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const HomeView: React.FC = () => {
    const [currentEvent, setCurrentEvent] = useState<{ event: TripEvent, dayTitle: string, status: string } | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loadingWeather, setLoadingWeather] = useState(true);
    const [activeCityId, setActiveCityId] = useState(CITIES[0].id);
    const [addressCopied, setAddressCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
    // Exchange Rate State
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [hkdAmount, setHkdAmount] = useState<string>('100');
    const [eurAmount, setEurAmount] = useState<string>('12.00');

    const HOTEL_ADDRESS = "Barcelona, Spain (Multiple Locations)";

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(HOTEL_ADDRESS);
        setAddressCopied(true);
        setTimeout(() => setAddressCopied(false), 2000);
    };

    // Countdown Logic
    useEffect(() => {
        const targetDate = new Date("2026-04-07T00:00:00+08:00").getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Load Weather
    const loadWeather = async (cityId: string) => {
        setLoadingWeather(true);
        const city = CITIES.find(c => c.id === cityId) || CITIES[0];
        try {
            const data = await fetchWeather(city.lat, city.lon);
            setWeather(data);
        } catch (e) {
            console.error("Weather load error", e);
        } finally {
            setLoadingWeather(false);
        }
    };

    useEffect(() => {
        loadWeather(activeCityId);
    }, [activeCityId]);

    // Load Exchange Rate
    useEffect(() => {
        const loadRate = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/HKD');
                if (!response.ok) return;
                const data = await response.json();
                setExchangeRate(data.rates.EUR);
                // Initialize values
                setEurAmount((100 * data.rates.EUR).toFixed(2));
            } catch (e) {
                setExchangeRate(0.12);
            }
        };
        loadRate();
    }, []);

    const handleHkdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setHkdAmount(val);
        if (exchangeRate && val && !isNaN(parseFloat(val))) {
            setEurAmount((parseFloat(val) * exchangeRate).toFixed(2));
        } else {
            setEurAmount('');
        }
    };

    const handleEurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEurAmount(val);
        if (exchangeRate && val && !isNaN(parseFloat(val))) {
            setHkdAmount((parseFloat(val) / exchangeRate).toFixed(2));
        } else {
            setHkdAmount('');
        }
    };

    useEffect(() => {
        const updateCurrentStatus = () => {
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentDate = now.getDate();
            const dateStr = `${currentMonth}/${currentDate}`;
            let targetDay = ITINERARY_DATA.find(d => d.date.includes(dateStr));
            let statusLabel = "當前行程";
            let targetEvent: TripEvent | null = null;
            let dayLabel = "";
            if (targetDay) {
                targetEvent = targetDay.events[0];
                statusLabel = "今日重點";
                dayLabel = `${targetDay.date}`;
            } else {
                const day0 = ITINERARY_DATA.find(d => d.day === 0);
                if (day0) {
                    targetEvent = day0.events[0];
                    statusLabel = "準備出發";
                    dayLabel = "行程準備";
                }
            }
            if (targetEvent) {
                setCurrentEvent({ event: targetEvent, dayTitle: dayLabel, status: statusLabel });
            }
        };
        updateCurrentStatus();
    }, []);

    const { today: todayForecast } = weather?.forecast ? { today: weather.forecast[0] } : { today: null };

    return (
        <div className="p-4 pt-8 pb-32 max-w-xl mx-auto min-h-screen animate-fade-in">
            {/* Header with Title */}
            <h1 className="text-4xl font-black font-display text-primary leading-tight mb-8">
                2026 西班牙之旅 🇪🇸
            </h1>
            
            {/* Countdown Timer Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-6 relative">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#fffbeb] flex items-center justify-center text-[#d69e2e]">
                        <Clock className="w-5 h-5" />
                    </div>
                    <h2 className="text-[13px] font-black text-text-primary tracking-tight">距離出發還有</h2>
                </div>
                
                <div className="flex justify-between items-center text-center text-text-primary px-2">
                    <div className="flex flex-col flex-1">
                        <span className="text-3xl font-black tabular-nums tracking-tighter">{timeLeft.days}</span>
                        <span className="text-[10px] font-black text-text-tertiary uppercase tracking-tighter mt-1">天 DAYS</span>
                    </div>
                    <div className="text-2xl font-black text-gray-200 pb-4">:</div>
                    <div className="flex flex-col flex-1">
                        <span className="text-3xl font-black tabular-nums tracking-tighter">{timeLeft.hours.toString().padStart(2, '0')}</span>
                        <span className="text-[10px] font-black text-text-tertiary uppercase tracking-tighter mt-1">時 HRS</span>
                    </div>
                    <div className="text-2xl font-black text-gray-200 pb-4">:</div>
                    <div className="flex flex-col flex-1">
                        <span className="text-3xl font-black tabular-nums tracking-tighter">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                        <span className="text-[10px] font-black text-text-tertiary uppercase tracking-tighter mt-1">分 MINS</span>
                    </div>
                    <div className="text-2xl font-black text-gray-200 pb-4">:</div>
                    <div className="flex flex-col flex-1">
                        <span className="text-3xl font-black tabular-nums tracking-tighter text-primary">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        <span className="text-[10px] font-black text-text-tertiary uppercase tracking-tighter mt-1 font-display">秒 SECS</span>
                    </div>
                </div>
            </div>

            {/* Currency Exchange Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[13px] font-black text-text-secondary flex items-center gap-2 tracking-tight">
                        <Coins className="w-4 h-4 text-text-tertiary" /> 匯率換算 (Euro)
                    </h2>
                    {exchangeRate && (
                        <span className="text-[10px] bg-[#fffbeb] text-[#d69e2e] px-3 py-1 rounded-full font-black">
                            1 HKD ≈ {exchangeRate.toFixed(4)} EUR
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-50 rounded-2xl p-4 transition-colors">
                        <label className="text-[10px] font-black text-text-tertiary block mb-1 uppercase tracking-tighter">HKD</label>
                        <input 
                            type="number" 
                            value={hkdAmount} 
                            onChange={handleHkdChange} 
                            className="w-full bg-transparent text-xl font-black text-text-primary focus:outline-none" 
                        />
                    </div>
                    <div className="text-text-tertiary">
                        <ArrowLeftRight className="w-4 h-4" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-2xl p-4 transition-colors">
                        <label className="text-[10px] font-black text-text-tertiary block mb-1 uppercase tracking-tighter">EUR</label>
                        <input 
                            type="number" 
                            value={eurAmount} 
                            onChange={handleEurChange} 
                            className="w-full bg-transparent text-xl font-black text-text-primary focus:outline-none" 
                        />
                    </div>
                </div>
            </div>

            {/* Hotel Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-6 relative">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm">
                            <BedDouble className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-[11px] font-black text-text-tertiary uppercase tracking-widest mb-0.5">主要住宿</h3>
                            <div className="font-black text-lg text-text-primary leading-tight">Barcelona / Seville / Madrid</div>
                        </div>
                    </div>
                    <MapPin className="w-5 h-5 text-accent" />
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between group transition-all text-left mt-2">
                    <div className="flex-1">
                        <span className="block text-[10px] font-black text-text-tertiary mb-1 uppercase tracking-tight">ADDRESS</span>
                        <div className="text-sm font-black text-text-secondary leading-tight">{HOTEL_ADDRESS}</div>
                    </div>
                    <button 
                        onClick={handleCopyAddress}
                        className={`p-2.5 rounded-xl transition-all shadow-sm ${addressCopied ? 'bg-green-100 text-green-600' : 'bg-white text-text-tertiary active:scale-90'}`}
                    >
                        {addressCopied ? <Check className="w-4 h-4" strokeWidth={3} /> : <Copy className="w-4 h-4" strokeWidth={2.5} />}
                    </button>
                </div>
            </div>

            {/* Weather Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-8">
                <div className="flex justify-between items-center mb-6 px-1">
                    <h2 className="text-[13px] font-black text-text-secondary flex items-center gap-2 tracking-tight">
                        <CloudSun className="w-5 h-5 text-text-tertiary" /> 當地天氣 ({activeCityId.toUpperCase()})
                    </h2>
                    <button 
                        onClick={() => loadWeather(activeCityId)}
                        className="p-1.5 rounded-full text-text-tertiary hover:bg-gray-100 transition-all active:scale-90"
                    >
                        <RefreshCcw className={`w-4 h-4 ${loadingWeather ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* City Tabs */}
                <div className="flex gap-1.5 mb-8 p-1 bg-gray-50 rounded-2xl">
                    {CITIES.map(city => (
                        <button
                            key={city.id}
                            onClick={() => setActiveCityId(city.id)}
                            className={`flex-1 py-2.5 text-[11px] font-black rounded-xl transition-all duration-300 ${
                                activeCityId === city.id 
                                    ? 'bg-white text-primary shadow-sm scale-[1.02]' 
                                    : 'text-text-tertiary hover:text-text-secondary'
                            }`}
                        >
                            {city.name}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        {loadingWeather ? (
                            <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
                        ) : (
                            <SmallWeatherIcon icon={todayForecast?.icon || 'cloud-sun'} className="w-12 h-12 text-primary" />
                        )}
                        <div>
                            <div className="text-3xl font-black text-text-primary leading-none">
                                {loadingWeather ? '--' : `${todayForecast?.tempHigh}° / ${todayForecast?.tempLow}°`}
                            </div>
                            <div className="text-[11px] font-black text-text-tertiary mt-2 uppercase tracking-widest">
                                {loadingWeather ? 'Loading...' : todayForecast?.condition}
                            </div>
                        </div>
                    </div>
                    {!loadingWeather && (
                        <div className="bg-[#fff4f2] text-primary px-4 py-1.5 rounded-full text-sm font-black shadow-sm">
                            {weather?.current.temp}
                        </div>
                    )}
                </div>
            </div>

            {/* Itinerary Highlight */}
            <div className="mb-10">
                <h2 className="text-xl font-black font-display text-text-primary mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                    亮點行程
                </h2>
                {currentEvent ? (
                    <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 animate-fade-in relative overflow-hidden group">
                        <div className="inline-block px-4 py-1.5 bg-gray-50 text-text-secondary rounded-full text-[10px] font-black mb-6 uppercase tracking-widest">
                            {currentEvent.status} • {currentEvent.dayTitle}
                        </div>
                        <h3 className="text-3xl font-black text-text-primary mb-3 leading-tight tracking-tight group-hover:text-primary transition-colors">
                            {currentEvent.event.description}
                        </h3>
                        <div className="text-primary font-black text-lg mb-8">{currentEvent.event.time}</div>
                        
                        <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-[0.98] transition-all">
                            查看詳情 <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-2xl p-12 flex flex-col items-center justify-center text-text-tertiary font-black uppercase tracking-widest text-[11px] gap-3 border border-dashed border-gray-200">
                        暫無行程
                    </div>
                )}
            </div>
        </div>
    );
};
