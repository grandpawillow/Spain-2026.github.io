
import React, { useState, useEffect } from 'react';
import { ITINERARY_DATA } from '../constants';
import { MapPin, ArrowRight, CloudSun, Snowflake, Sun, Cloud, CloudRain, Wallet, BedDouble, Copy, Check, Coins, ArrowLeftRight } from 'lucide-react';
import { TripEvent, WeatherData } from '../types';
import { fetchWeather, fetchExchangeRate } from '../services/api';

const SmallWeatherIcon: React.FC<{ icon: string, className?: string }> = ({ icon, className }) => {
    switch(icon) {
        case 'sun': return <Sun className={className} />;
        case 'cloud': return <Cloud className={className} />;
        case 'rain': return <CloudRain className={className} />;
        case 'snowflake': return <Snowflake className={className} />;
        default: return <CloudSun className={className} />;
    }
};

export const HomeView: React.FC = () => {
    const [currentEvent, setCurrentEvent] = useState<{ event: TripEvent, dayTitle: string, status: string } | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loadingWeather, setLoadingWeather] = useState(true);
    const [addressCopied, setAddressCopied] = useState(false);
    
    // Exchange Rate State (HKD to EUR)
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [hkdAmount, setHkdAmount] = useState<string>('');
    const [eurAmount, setEurAmount] = useState<string>('');

    const HOTEL_ADDRESS = "Barcelona, Spain (Multiple Locations)";

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(HOTEL_ADDRESS);
        setAddressCopied(true);
        setTimeout(() => setAddressCopied(false), 2000);
    };

    // Load Weather (Using Barcelona as default)
    useEffect(() => {
        const loadWeather = async () => {
            try {
                const data = await fetchWeather();
                setWeather(data);
            } catch (e) {
                console.error("Weather load error", e);
            } finally {
                setLoadingWeather(false);
            }
        };
        loadWeather();
    }, []);

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
                    Roylow 2025 西班牙之旅 🇪🇸
                </h1>
                
                <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 relative overflow-hidden mb-6">
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-3">
                             <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <BedDouble className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-0.5">主要住宿</h2>
                                <div className="font-bold text-lg text-text-primary leading-tight">Barcelona / Seville / Madrid</div>
                            </div>
                        </div>
                        <MapPin className="w-5 h-5 text-accent" />
                    </div>

                    <button 
                        onClick={handleCopyAddress}
                        className="w-full bg-gray-50 rounded-xl p-3 flex items-center justify-between group hover:bg-gray-100 transition-colors relative z-10 text-left"
                    >
                        <div>
                            <span className="block text-[10px] font-bold text-text-tertiary mb-0.5 uppercase">Address</span>
                            <div className="text-sm font-bold text-text-secondary">{HOTEL_ADDRESS}</div>
                        </div>
                        <div className={`p-2 rounded-full transition-colors ${addressCopied ? 'bg-green-100 text-green-600' : 'text-text-tertiary group-hover:text-primary'}`}>
                            {addressCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </div>
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-bold text-text-secondary flex items-center gap-2">
                        <CloudSun className="w-4 h-4" /> 當地天氣 (BCN)
                    </h2>
                    {loadingWeather ? (
                        <span className="text-xs text-text-tertiary">更新中...</span>
                    ) : (
                        <span className="text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-full font-bold">
                            {weather?.current.temp}
                        </span>
                    )}
                </div>

                {todayForecast && (
                    <div className="flex items-center gap-4">
                        <SmallWeatherIcon icon={todayForecast.icon} className="w-10 h-10 text-primary" />
                        <div>
                            <div className="text-xl font-bold text-text-primary">
                                {todayForecast.tempHigh}° / {todayForecast.tempLow}°
                            </div>
                            <span className="text-xs font-medium text-text-secondary">{todayForecast.condition}</span>
                        </div>
                    </div>
                )}
            </div>

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
                    <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100 flex items-center justify-center text-text-tertiary">暫無行程</div>
                )}
            </div>
        </div>
    );
};
