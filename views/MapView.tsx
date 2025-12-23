import React from 'react';
import { MapSection } from '../components/MapSection';

export const MapView: React.FC = () => {
    return (
        <div className="p-4 pt-6 pb-20 h-screen flex flex-col">
            <h1 className="text-2xl font-bold font-display mb-4 text-text-primary">地圖概覽</h1>
            <div className="flex-1 rounded-3xl overflow-hidden shadow-card border border-white">
                <iframe 
                    title="Seoul Map"
                    src="https://maps.google.com/maps?q=Hongdae%2C%20Seoul%2C%20South%20Korea&z=13&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                />
            </div>
        </div>
    );
};