import React from 'react';

export const MapSection: React.FC = () => {
    return (
        <section className="bg-white rounded-3xl p-6 shadow-soft">
            <h2 className="font-bold text-xl mb-2 text-text-header">Map View</h2>
            <p className="text-sm text-text-sub mb-4">
                Hongdae • Mangwon • Seongsu
            </p>
            
            <div className="w-full h-[300px] rounded-2xl overflow-hidden bg-gray-100 relative border border-gray-100">
                 <iframe 
                    title="Seoul Map"
                    src="https://maps.google.com/maps?q=Hongdae%2C%20Seoul%2C%20South%20Korea&z=12&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    );
};