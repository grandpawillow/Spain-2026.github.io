import React from 'react';
import { Bell, User, Mail } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center py-4 mb-2">
            <div className="flex items-center">
                <h1 className="font-bold text-2xl tracking-tight text-text-header">
                    SeoulTrip<span className="text-soft-blue">.</span>
                </h1>
            </div>
            
            <div className="flex items-center gap-4">
                <button className="relative text-text-header hover:opacity-70 transition-opacity">
                    <Mail className="w-6 h-6 stroke-[1.5]" />
                </button>
                <button className="relative text-text-header hover:opacity-70 transition-opacity">
                    <Bell className="w-6 h-6 stroke-[1.5]" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-base"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                    <img src="https://i.pravatar.cc/100?img=33" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>
    );
};