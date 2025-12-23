import React, { useEffect, useState } from 'react';
import { Plane, Calendar, Copy, ArrowRight, Clock, Smartphone, RefreshCcw } from 'lucide-react';
import { fetchFlightStatus } from '../services/api';
import { FlightResponse, FlightInfo } from '../types';

export const FlightView: React.FC = () => {
    const [flights, setFlights] = useState<FlightResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchFlightStatus();
            setFlights(data);
        } catch (error) {
            console.error("Failed to load flight data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="p-4 pt-6 pb-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold font-display text-text-primary">航班資訊</h1>
                <button 
                    onClick={loadData} 
                    disabled={loading}
                    className="p-2 rounded-full bg-white border border-gray-200 text-text-secondary hover:text-primary hover:border-primary transition-all disabled:opacity-50 active:scale-95 shadow-sm"
                    aria-label="Refresh flight status"
                >
                    <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {loading && !flights ? (
                <div className="p-8 text-center text-text-tertiary">載入航班資訊...</div>
            ) : (
                <>
                    <div className="space-y-6">
                        {flights && <FlightTicket info={flights.outbound} type="outbound" />}
                        {flights && <FlightTicket info={flights.inbound} type="inbound" />}
                    </div>

                    <a 
                        href="itms-apps://apps.apple.com/hk/app/hk-express/id1069758898" 
                        target="_blank" 
                        rel="noreferrer"
                        className="mt-8 w-full py-3 bg-white border border-gray-200 text-text-secondary rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 hover:text-primary transition-colors text-sm"
                    >
                        <Smartphone className="w-4 h-4" /> 開啟 HK Express App
                    </a>
                </>
            )}
        </div>
    );
};

const FlightTicket: React.FC<{ info: FlightInfo, type: 'outbound' | 'inbound' }> = ({ info, type }) => {
    const isOutbound = type === 'outbound';
    
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100 relative">
            {/* Header / Airline Bar */}
            <div className={`px-6 py-4 flex justify-between items-center ${isOutbound ? 'bg-primary text-white' : 'bg-gray-800 text-white'}`}>
                <div className="flex items-center gap-2">
                    <Plane className={`w-5 h-5 ${!isOutbound && 'rotate-180'}`} />
                    <span className="font-bold text-lg tracking-wide">{info.flightNumber}</span>
                </div>
                <div className="text-xs font-bold bg-white/20 px-2 py-1 rounded-md">
                    {info.date}
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                {/* Route Codes */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-left">
                        <div className="text-3xl font-black text-text-primary">{info.departureCode}</div>
                        <div className="text-xs text-text-secondary font-medium">{info.departureCity}</div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center px-4">
                        <div className="text-xs text-text-tertiary font-bold mb-1">{info.duration}</div>
                        <div className="w-full h-px bg-gray-300 relative">
                            <Plane className="w-3 h-3 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90" />
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-3xl font-black text-text-primary">{info.arrivalCode}</div>
                        <div className="text-xs text-text-secondary font-medium">{info.arrivalCity}</div>
                    </div>
                </div>

                {/* Times */}
                <div className="flex justify-between items-center mb-6 bg-gray-50 rounded-xl p-4">
                    <div className="text-left">
                        <div className="text-xs text-text-tertiary font-bold uppercase mb-1">Departure</div>
                        <div className="text-xl font-bold text-text-primary">{info.departureTime}</div>
                    </div>
                     <div className="text-center">
                        <ArrowRight className="w-5 h-5 text-gray-300" />
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-text-tertiary font-bold uppercase mb-1">Arrival</div>
                        <div className="text-xl font-bold text-text-primary">{info.arrivalTime}</div>
                    </div>
                </div>

                {/* Footer Details */}
                <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                    <div>
                        <div className="text-xs text-text-secondary">Terminal</div>
                        <div className="font-bold text-text-primary">{info.terminal || '-'}</div>
                    </div>
                    <div>
                        <div className="text-xs text-text-secondary">Airline</div>
                        <div className="font-bold text-text-primary">{info.airline}</div>
                    </div>
                    <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            {info.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};