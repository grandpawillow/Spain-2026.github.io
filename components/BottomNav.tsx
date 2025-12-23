
import React from 'react';
import { Calendar, CloudSun, Languages, Home, Plane } from 'lucide-react';

interface BottomNavProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
    const tabs = [
        { id: 'home', label: '首頁', icon: Home },
        { id: 'itinerary', label: '行程', icon: Calendar },
        { id: 'flight', label: '航班', icon: Plane },
        { id: 'weather', label: '天氣', icon: CloudSun },
        { id: 'spanish', label: '西文', icon: Languages },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-divider pb-safe pt-2 px-2 z-40 shadow-nav">
            <div className="flex justify-between items-end max-w-xl mx-auto pb-4 sm:pb-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = currentTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex flex-col items-center gap-1 flex-1 min-w-[50px] transition-all duration-200 group ${isActive ? 'text-primary' : 'text-text-tertiary hover:text-text-secondary'}`}
                        >
                            <div className={`p-1 rounded-full transition-all duration-200 ${isActive ? '-translate-y-1 bg-primary/5' : ''}`}>
                                <Icon className="w-6 h-6" strokeWidth={2} />
                            </div>
                            <span className={`text-[10px] font-bold ${isActive ? 'text-primary' : 'text-text-tertiary'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
