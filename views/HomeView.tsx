
import React, { useState, useEffect } from 'react';
import { ITINERARY_DATA } from '../constants';
import { MapPin, ArrowRight, CloudSun, Snowflake, Sun, Cloud, CloudRain, Wallet, BedDouble, Copy, Check, Coins, ArrowLeftRight, RefreshCcw, Clock, Building2, Calendar } from 'lucide-react';
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
    { id: 'bcn', name: 'Barcelona', lat: 41.3851, lon: 2.1734, code: 'BCN', hotelIndex: 0 },
    { id: 'svq', name: 'Seville', lat: 37.3891, lon: -5.9845, code: 'SVQ', hotelIndex: 1 },
    { id: 'mad', name: 'Madrid', lat: 40.4168, lon: -3.7038, code: 'MAD', hotelIndex: 2 },
];

const HOTELS = [
    {
        city: "Barcelona",
        name: "Catalunya Central Apt",
        address: "Carrer de Balmes, 103, 08008 Barcelona, Spain",
        dates: "Apr 7 - Apr 12",
        icon: <Building2 className="w-5 h-5" />
    },
    {
        city: "Seville",
        name: "Sevilla Historic Center",
        address: "Calle Sierpes, 45, 41004 Sevilla, Spain",
        dates: "Apr 12 - Apr 15",
        icon: <BedDouble className="w-5 h-5" />
    },
    {
        city: "Madrid",
        name: "Gran Vía Luxury Suites",
        address: "C/ de Gran Vía, 28, Centro, 28013 Madrid, Spain",
        dates: "Apr 15 - Apr 20",
        icon: <MapPin className="w-5 h-5" />
    }
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
    
    // Countdown State
    const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
    // Exchange Rate State (HKD to EUR)
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [hkdAmount, setHkdAmount] = useState<string>('');
    const [eurAmount, setEurAmount] = useState<string>('');

    const activeCity = CITIES.find(c => c.id === activeCityId) || CITIES[0];
    const currentHotel = HOTELS[activeCity.hotelIndex];

    const handleCopyAddress = (address: string) => {
        navigator.clipboard.writeText(address);
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
            } catch (e) {
                setExchangeRate(0.12); // Fallback estimate
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
                setCurrentEvent({
                    event: targetEvent,
                    dayTitle: dayLabel,
                    status: statusLabel
                });
            }
        };

        updateCurrentStatus();
    }, []);

    const getWeatherDisplay = () => {
        if (!weather?.forecast) return { today: null };
        return { today: weather.forecast[0] };
    };

    const { today: todayForecast } = getWeatherDisplay();

    return (
        <div className="p-4 pt-8 pb-20">
            <header className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold font-display text-primary leading-tight mb-4">
                    2026 西班牙之旅 🇪🇸
                </h1>
                
                {/* Countdown Timer Card */}
                <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 mb-6 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            <Clock className="w-4 h-4" />
                        </div>
                        <h2 className="text-sm font-bold text-text-primary">距離出發還有</h2>
                    </div>
                    
                    <div className="flex justify-between items-center text-center px-2">
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-text-primary tabular-nums">{timeLeft.days}</span>
                            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-tighter">天 Days</span>
                        </div>
                        <div className="text-2xl font-black text-gray-200 mb-4">:</div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-text-primary tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
                            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-tighter">時 Hrs</span>
                        </div>
                        <div className="text-2xl font-black text-gray-200 mb-4">:</div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-text-primary tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-tighter">分 Mins</span>
                        </div>
                        <div className="text-2xl font-black text-gray-200 mb-4">:</div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-primary tabular-nums">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-tighter font-display">秒 Secs</span>
                        </div>
                    </div>
                </div>

                {/* Unified Location Hub */}
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-3 px-1">
                        <h2 className="text-lg font-bold font-display text-text-primary flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" /> 目的地概覽
                        </h2>
                        <button 
                            onClick={() => loadWeather(activeCityId)}
                            className="p-1.5 rounded-full text-text-tertiary hover:bg-white transition-all active:scale-95"
                        >
                            <RefreshCcw className={`w-4 h-4 ${loadingWeather ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    {/* Unified Tabs */}
                    <div className="flex gap-1.5 mb-4 p-1 bg-gray-200/50 backdrop-blur-sm rounded-2xl border border-white/50">
                        {CITIES.map(city => (
                            <button
                                key={city.id}
                                onClick={() => setActiveCityId(city.id)}
                                className={`flex-1 py-2 text-[11px] font-black rounded-xl transition-all ${
                                    activeCityId === city.id 
                                        ? 'bg-white text-primary shadow-sm scale-[1.02]' 
                                        : 'text-text-tertiary hover:text-text-secondary'
                                }`}
                            >
                                {city.name.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Combined Destination Info Card */}
                    <div className="space-y-3 animate-fade-in" key={activeCityId}>
                        {/* 1. Weather Data Row */}
                        <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {loadingWeather ? (
                                    <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
                                ) : todayForecast ? (
                                    <SmallWeatherIcon icon={todayForecast.icon} className="w-10 h-10 text-primary" />
                                ) : null}
                                <div>
                                    <div className="text-2xl font-black text-text-primary leading-none mb-1">
                                        {loadingWeather ? '...' : weather?.current.temp}
                                    </div>
                                    <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
                                        {loadingWeather ? 'Loading...' : todayForecast?.condition}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-text-secondary">
                                    {todayForecast?.tempHigh}° / {todayForecast?.tempLow}°
                                </div>
                                <div className="text-[9px] font-black text-accent uppercase bg-accent/5 px-2 py-0.5 rounded-full mt-1">
                                    Feels Like {todayForecast?.feelsLike}°
                                </div>
                            </div>
                        </div>

                        {/* 2. Hotel Info Card */}
                        <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    {currentHotel.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">Stay Details</h3>
                                        <div className="bg-accent/10 text-accent text-[8px] font-black px-1.5 py-0.5 rounded uppercase flex items-center gap-1">
                                            <Calendar className="w-2 h-2" /> {currentHotel.dates}
                                        </div>
                                    </div>
                                    <div className="font-bold text-lg text-text-primary leading-tight">{currentHotel.name}</div>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleCopyAddress(currentHotel.address)}
                                className="w-full bg-gray-50 rounded-2xl p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors text-left"
                            >
                                <div className="flex-1 pr-4">
                                    <span className="block text-[10px] font-black text-text-tertiary mb-1 uppercase tracking-tighter">Google Maps Address</span>
                                    <div className="text-xs font-bold text-text-secondary line-clamp-1">{currentHotel.address}</div>
                                </div>
                                <div className={`p-2.5 rounded-xl transition-all ${addressCopied ? 'bg-green-100 text-green-600 scale-110' : 'bg-white text-text-tertiary group-hover:text-primary shadow-sm'}`}>
                                    {addressCopied ? <Check className="w-4 h-4" strokeWidth={3} /> : <Copy className="w-4 h-4" strokeWidth={2.5} />}
                                </div>
                            </button>
                            
                            {/* Decorative Background Accent */}
                            <div className="absolute -bottom-6 -right-4 text-7xl font-black text-gray-50/50 pointer-events-none select-none -z-0">
                                {activeCity.code}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Currency Exchange */}
            <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-bold text-text-secondary flex items-center gap-2">
                        <Coins className="w-4 h-4" /> 匯率換算 (Euro)
                    </h2>
                    {exchangeRate && (
                        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">
                            1 HKD ≈ {exchangeRate.toFixed(4)} EUR
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 border border-transparent focus-within:border-primary/50 transition-colors">
                        <label className="text-[10px] font-bold text-text-tertiary block mb-1">HKD</label>
                        <input type="number" value={hkdAmount} onChange={handleHkdChange} placeholder="100" className="w-full bg-transparent text-lg font-bold text-text-primary focus:outline-none" />
                    </div>
                    <ArrowLeftRight className="w-4 h-4 text-text-tertiary" />
                    <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 border border-transparent focus-within:border-primary/50 transition-colors">
                        <label className="text-[10px] font-bold text-text-tertiary block mb-1">EUR</label>
                        <input type="number" value={eurAmount} onChange={handleEurChange} placeholder="12.00" className="w-full bg-transparent text-lg font-bold text-text-primary focus:outline-none" />
                    </div>
                </div>
            </div>

            {/* Itinerary Highlight */}
            <div>
                <h2 className="text-lg font-bold font-display text-text-primary mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                    亮點行程
                </h2>
                {currentEvent ? (
                    <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
                        <div className="inline-block px-3 py-1 bg-gray-100 text-text-secondary rounded-full text-xs font-bold mb-4">
                            {currentEvent.status} • {currentEvent.dayTitle}
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary mb-2">{currentEvent.event.description}</h3>
                        <div className="text-primary font-bold text-lg mb-4">{currentEvent.event.time}</div>
                        {currentEvent.event.location && (
                            <div className="flex items-start gap-2 text-text-secondary bg-gray-50 p-3 rounded-xl mb-4">
                                <MapPin className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                                <span className="text-sm">{currentEvent.event.location}</span>
                            </div>
                        )}
                        <button className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2">
                            查看詳情 <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100 flex items-center justify-center text-text-tertiary font-bold uppercase tracking-widest text-xs">No Scheduled Events</div>
                )}
            </div>
        </div>
    );
};
