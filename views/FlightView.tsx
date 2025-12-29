
import React, { useEffect, useState } from 'react';
import { Plane, Info, Smartphone, RefreshCcw, MapPin, Clock, Ticket, User, Train } from 'lucide-react';
import { fetchFlightStatus, TripTransportData } from '../services/api';
import { FlightInfo, FlightJourney } from '../types';

type TransportTab = 'outbound' | 'domestic1' | 'domestic2' | 'inbound';

export const FlightView: React.FC = () => {
    const [transportData, setTransportData] = useState<TripTransportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TransportTab>('outbound');

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchFlightStatus();
            setTransportData(data);
        } catch (error) {
            console.error("Failed to load flight data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const tabs = [
        { id: 'outbound' as TransportTab, label: 'HKG ➔ BCN' },
        { id: 'domestic1' as TransportTab, label: 'BCN ➔ SVQ' },
        { id: 'domestic2' as TransportTab, label: 'SVQ ➔ MAD' },
        { id: 'inbound' as TransportTab, label: 'MAD ➔ HKG' },
    ];

    const currentJourney = transportData ? transportData[activeTab] : null;

    return (
        <div className="p-4 pt-6 pb-20">
            <div className="flex justify-between items-center mb-6 px-1">
                <h1 className="text-4xl font-bold font-display text-text-primary">交通資訊</h1>
                <button 
                    onClick={loadData} 
                    disabled={loading}
                    className="p-2 rounded-full bg-white border border-gray-200 text-text-secondary hover:text-primary transition-all shadow-sm"
                >
                    <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Segment Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar -mx-1 px-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                            activeTab === tab.id 
                                ? 'bg-primary text-white border-primary shadow-md scale-105' 
                                : 'bg-white text-text-tertiary border-gray-100 hover:border-gray-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {loading && !transportData ? (
                <div className="p-12 text-center text-text-tertiary animate-pulse font-bold uppercase tracking-widest">
                    Updating Schedule...
                </div>
            ) : (
                <div className="space-y-12">
                    {currentJourney && (
                        <JourneyCard 
                            journey={currentJourney} 
                            themeColor={activeTab.includes('domestic') ? "bg-accent" : (activeTab === 'inbound' ? "bg-slate-800" : "bg-primary")} 
                            accentColor={activeTab.includes('domestic') ? "text-accent" : (activeTab === 'inbound' ? "text-slate-800" : "text-primary")}
                            ticketLabel={activeTab === 'domestic2' ? "Train Ticket" : "Boarding Pass"}
                            headerTagColor={activeTab.includes('domestic') ? "bg-accent/10 border-accent/20" : (activeTab === 'inbound' ? "bg-slate-100 border-slate-200" : "bg-primary/10 border-primary/20")}
                            legHeaderBg={activeTab.includes('domestic') ? "bg-accent" : (activeTab === 'inbound' ? "bg-slate-800" : "bg-primary")}
                            isDarkHeader={true}
                        />
                    )}
                    
                    <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                        <div className="flex items-center gap-2 text-primary font-bold mb-2">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                <Info className="w-3.5 h-3.5" />
                            </div>
                            溫馨提示
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {activeTab === 'domestic2' 
                                ? 'Renfe AVE 火車請於開車前至少 30 分鐘抵達月台進行安檢。行李需經過掃描，建議提早出門。' 
                                : '國際航班請在起飛前至少 3 小時抵達機場。於蘇黎世 (ZRH) 轉機時，請隨時留意登機門更動資訊。'}
                        </p>
                    </div>

                    <a 
                        href={activeTab === 'domestic2' ? "https://www.renfe.com/" : "https://www.swiss.com/"} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full py-4 bg-white border border-gray-200 text-text-secondary rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 hover:text-primary transition-colors text-sm"
                    >
                        <Smartphone className="w-4 h-4" /> 開啟官方 App / 網頁
                    </a>
                </div>
            )}
        </div>
    );
};

interface JourneyCardProps {
    journey: FlightJourney;
    themeColor: string;
    accentColor: string;
    ticketLabel: string;
    headerTagColor: string;
    legHeaderBg: string;
    isDarkHeader: boolean;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ journey, themeColor, accentColor, ticketLabel, headerTagColor, legHeaderBg, isDarkHeader }) => {
    return (
        <div className="relative animate-fade-in">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl font-bold font-display text-text-primary flex items-center gap-2">
                    <div className={`w-2 h-6 rounded-full ${themeColor}`}></div>
                    {journey.title}
                </h2>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${headerTagColor} ${accentColor}`}>
                    <Ticket className="w-3 h-3" />
                    {ticketLabel}
                </div>
            </div>
            
            <div className="space-y-6">
                {journey.legs.map((leg, idx) => (
                    <FlightLegCard 
                        key={leg.flightNumber} 
                        leg={leg} 
                        idx={idx}
                        accentColor={accentColor}
                        themeColor={themeColor}
                        headerBg={legHeaderBg}
                        isDarkHeader={isDarkHeader}
                    />
                ))}
            </div>
        </div>
    );
};

const FlightLegCard: React.FC<{ leg: FlightInfo, idx: number, accentColor: string, themeColor: string, headerBg: string, isDarkHeader: boolean }> = ({ leg, idx, accentColor, themeColor, headerBg, isDarkHeader }) => {
    const isTrain = leg.airline.includes('Renfe');
    
    return (
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 transition-all relative">
            {/* Top Branding Section */}
            <div className={`px-6 py-4 flex justify-between items-center ${headerBg}`}>
                <div className="flex items-center gap-3">
                    <div className="bg-white p-1 rounded-lg shadow-sm flex items-center justify-center w-8 h-8">
                        {isTrain ? (
                            <Train className="w-5 h-5 text-accent" />
                        ) : (
                            <img 
                                src={`https://logo.clearbit.com/${leg.airline.toLowerCase().includes('iberia') ? 'iberia.com' : 'swiss.com'}`} 
                                className="w-5 h-5 object-contain" 
                                alt={leg.airline} 
                                onError={(e) => {
                                    e.currentTarget.src = "https://www.google.com/s2/favicons?sz=128&domain=" + (leg.airline.includes('Iberia') ? 'iberia.com' : 'swiss.com');
                                }}
                            />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-black text-sm tracking-tighter leading-none ${isDarkHeader ? 'text-white' : 'text-text-primary'}`}>
                            {isTrain ? 'TICKET STUB' : 'BOARDING PASS'}
                        </span>
                        <span className={`text-[10px] font-bold opacity-80 ${isDarkHeader ? 'text-white' : 'text-text-secondary'}`}>{leg.airline}</span>
                    </div>
                </div>
                <div className={`text-xs font-black uppercase ${isDarkHeader ? 'bg-white/20 text-white' : 'bg-gray-100 text-text-tertiary'} px-3 py-1 rounded-lg border border-transparent shadow-sm`}>
                    {leg.date}
                </div>
            </div>

            {/* Main Boarding Pass Body */}
            <div className="flex relative">
                {/* Main Content (Left) */}
                <div className="flex-[2.2] p-6 pr-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-left">
                            <div className="text-4xl font-black text-text-primary tracking-tighter mb-1">{leg.departureCode}</div>
                            <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">{leg.departureCity}</div>
                            <div className="text-sm font-black text-text-tertiary mt-1">{leg.departureTime}</div>
                        </div>
                        
                        <div className="flex-1 px-4 flex flex-col items-center">
                            <div className="text-[10px] text-text-tertiary font-black mb-2 uppercase tracking-widest">{leg.flightNumber}</div>
                            <div className="w-full flex items-center gap-2">
                                <div className="h-[2px] flex-1 bg-gray-100 rounded-full"></div>
                                {isTrain ? <Train className={`w-4 h-4 ${accentColor}`} /> : <Plane className={`w-4 h-4 ${accentColor} rotate-90`} />}
                                <div className="h-[2px] flex-1 bg-gray-100 rounded-full"></div>
                            </div>
                            <div className="text-[10px] text-text-tertiary font-bold mt-2">{leg.duration}</div>
                        </div>

                        <div className="text-right">
                            <div className="text-4xl font-black text-text-primary tracking-tighter mb-1">{leg.arrivalCode}</div>
                            <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">{leg.arrivalCity}</div>
                            <div className={`text-sm font-black mt-1 ${accentColor}`}>{leg.arrivalTime}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-text-tertiary uppercase tracking-widest mb-1">
                                {isTrain ? 'Coach' : 'Gate'}
                            </span>
                            <span className="text-lg font-black text-text-primary">{leg.gate || '--'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-text-tertiary uppercase tracking-widest mb-1">
                                {isTrain ? 'Plat' : 'Term'}
                            </span>
                            <span className="text-lg font-black text-text-primary">{leg.terminal || 'T1'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-text-tertiary uppercase tracking-widest mb-1">Seat</span>
                            <span className="text-lg font-black text-text-primary">{isTrain ? '05D' : 'TBD'}</span>
                        </div>
                    </div>
                </div>

                {/* Vertical Perforation Line with Punch Holes */}
                <div className="relative w-px">
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-app-bg rounded-full border border-gray-100 shadow-inner"></div>
                    <div className="h-full border-l-2 border-dashed border-gray-200"></div>
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-app-bg rounded-full border border-gray-100 shadow-inner"></div>
                </div>

                {/* Stub (Right) */}
                <div className="flex-1 p-6 flex flex-col justify-between bg-gray-50/30">
                    <div className="flex flex-col gap-5">
                        <div>
                            <span className="text-[9px] font-black text-text-tertiary uppercase tracking-widest block">
                                {isTrain ? 'DEPARTURE' : 'BOARDING'}
                            </span>
                            <span className="text-xl font-black text-text-primary">{leg.departureTime}</span>
                        </div>
                        <div>
                            <span className="text-[9px] font-black text-text-tertiary uppercase tracking-widest block">
                                ARRIVAL
                            </span>
                            <span className="text-xl font-black text-text-primary">{leg.arrivalTime}</span>
                        </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-200 flex flex-col items-center">
                         <div className={`w-2 h-2 rounded-full mb-1 ${themeColor.includes('primary') ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                         <span className="text-[9px] font-black text-text-tertiary uppercase">{leg.status}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Security Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100 border-dashed">
                <div className="flex items-center gap-4 text-text-tertiary">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase tracking-widest">Passenger</span>
                        <span className="text-[10px] font-bold text-text-primary flex items-center gap-1">
                            <User className="w-2.5 h-2.5" /> TRAVELER / SPAIN2026
                        </span>
                    </div>
                </div>
                <div className="text-[9px] font-black text-text-tertiary uppercase opacity-40 italic">
                    {isTrain ? 'Valid with ID/Passport' : 'Travel Document Required at Gate'}
                </div>
            </div>
        </div>
    );
};
