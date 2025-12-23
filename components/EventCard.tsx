import React from 'react';
import { TripEvent } from '../types';
import { MapPin, ExternalLink } from 'lucide-react';

interface EventCardProps {
    event: TripEvent;
    onClick: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
    return (
        <div className="flex relative group">
            {/* Time Column - Fixed 72px width */}
            <div className="w-[72px] flex-shrink-0 text-right pt-4 pr-4">
                <span className="text-lg font-bold font-display text-text-primary block">
                    {event.time}
                </span>
            </div>

            {/* Timeline Dot Column - Fixed 16px width for centering */}
            <div className="w-[16px] flex-shrink-0 relative pt-5 z-10 flex justify-center">
                <div className="w-3 h-3 rounded-full bg-white border-[3px] border-primary shadow-sm group-hover:scale-125 transition-transform duration-200"></div>
            </div>

            {/* Content Card - Flexible width with left padding */}
            <div 
                onClick={onClick}
                className="flex-1 pl-4 bg-white rounded-2xl p-4 shadow-card border border-transparent hover:border-primary/30 transition-all cursor-pointer ml-2"
            >
                <h3 className="font-bold text-text-primary text-base mb-1 leading-snug">
                    {event.description}
                </h3>
                
                <div className="flex items-center text-xs text-text-secondary mb-3">
                    <MapPin className="w-3 h-3 mr-1 text-primary" />
                    <span className="truncate max-w-[150px]">{event.location}</span>
                </div>

                {/* Show details directly if available */}
                {event.details && (
                    <div className="text-sm text-text-secondary bg-gray-50 p-3 rounded-xl leading-relaxed border border-gray-100">
                        {event.details}
                         {/* Link detection for display (simple logic) */}
                        {event.details.includes('http') && (
                            <div className="mt-2 flex items-center text-primary text-xs font-bold">
                                <ExternalLink className="w-3 h-3 mr-1" /> 相關連結
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};