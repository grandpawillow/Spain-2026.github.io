import React, { useEffect, useState } from 'react';
import { Plane, CloudSun, Loader2, ArrowRight } from 'lucide-react';
import { fetchFlightStatus, fetchWeather } from '../services/api';
import { FlightInfo, WeatherData } from '../types';

export const StatusCards: React.FC = () => {
    const [flight, setFlight] = useState<FlightInfo | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [flightData, weatherData] = await Promise.all([
                    fetchFlightStatus(),
                    fetchWeather()
                ]);
                // Fix: flight state expects FlightInfo, but flightData.outbound is FlightJourney.
                // We set it to the first leg of the outbound journey.
                setFlight(flightData.outbound.legs[0] || null);
                setWeather(weatherData);
            } catch (error) {
                console.error("Failed to load status data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Minimal Flight Card */}
            <div className="bg-white rounded-3xl p-5 shadow-soft flex flex-col justify-between h-32 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Plane className="w-16 h-16 transform -rotate-45" />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-text-sub uppercase tracking-wider mb-1">Flight</h4>
                    <p className="font-bold text-lg text-text-header leading-tight">
                        {loading ? '...' : flight?.flightNumber}
                    </p>
                </div>
                <div className="flex items-center text-sm font-medium text-green-600">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                        <>
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                            {flight?.status}
                        </>
                    )}
                </div>
            </div>

            {/* Minimal Weather Card */}
            <div className="bg-white rounded-3xl p-5 shadow-soft flex flex-col justify-between h-32 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CloudSun className="w-16 h-16" />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-text-sub uppercase tracking-wider mb-1">Seoul</h4>
                    <p className="font-bold text-lg text-text-header leading-tight">
                        {loading ? '...' : weather?.current?.temp}
                    </p>
                </div>
                 <div className="text-sm font-medium text-text-body truncate">
                    {loading ? '...' : weather?.current?.condition}
                </div>
            </div>
        </div>
    );
};