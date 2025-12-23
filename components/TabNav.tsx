import React, { useRef, useEffect } from 'react';
import { DayItinerary } from '../types';

interface TabNavProps {
    days: DayItinerary[];
    activeDay: number;
    onSelectDay: (day: number) => void;
}

export const TabNav: React.FC<TabNavProps> = ({ days, activeDay, onSelectDay }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const activeBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (activeBtnRef.current && scrollRef.current) {
            const container = scrollRef.current;
            const btn = activeBtnRef.current;
            const scrollPos = btn.offsetLeft - (container.offsetWidth / 2) + (btn.offsetWidth / 2);
            container.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
    }, [activeDay]);

    return (
        <div 
            ref={scrollRef}
            className="flex overflow-x-auto space-x-2 no-scrollbar scroll-smooth py-3 px-4"
        >
            {days.map((dayData) => {
                const isActive = activeDay === dayData.day;
                // Get date part "12/14" from "12/14 (六)"
                const dateStr = dayData.date.split(' ')[0];
                return (
                    <button
                        key={dayData.day}
                        ref={isActive ? activeBtnRef : null}
                        onClick={() => onSelectDay(dayData.day)}
                        className={`
                            flex flex-col items-center justify-center min-w-[4.5rem] py-2 rounded-2xl transition-all duration-200 flex-shrink-0
                            ${isActive 
                                ? 'bg-primary text-white shadow-md scale-105' 
                                : 'bg-white text-text-tertiary border border-gray-100 hover:border-gray-200'
                            }
                        `}
                    >
                        <span className="text-sm font-bold font-display leading-tight">Day {dayData.day}</span>
                        <span className="text-[10px] font-medium opacity-80">{dateStr}</span>
                    </button>
                );
            })}
        </div>
    );
};