
import React, { useState, useEffect } from 'react';
import { TripEvent } from '../types';
import { X, MapPin, ExternalLink, AlignLeft, Image as ImageIcon, ZoomIn, Ticket, Globe } from 'lucide-react';

interface EventDetailProps {
    event: TripEvent;
    isOpen: boolean;
    onClose: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, isOpen, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | undefined>(event.imageUrl);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setIsZoomed(false); 
            setImgSrc(event.imageUrl); // Reset src when event changes
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, event.imageUrl]);

    const handleImageError = () => {
        // Fallback to a nice Spain landscape if specific image fails
        setImgSrc("https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=1000&q=80");
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none`}>
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div 
                className={`
                    w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl pointer-events-auto transform transition-transform duration-300
                    ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-10 sm:scale-95'}
                    max-h-[90vh] overflow-y-auto relative z-50
                `}
            >
                {/* Drag Handle (Mobile) */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />

                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-2">
                            {event.time}
                        </div>
                        <h2 className="text-2xl font-bold font-display text-text-primary leading-tight">
                            {event.description}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-text-secondary" />
                    </button>
                </div>

                {/* Actions Grid */}
                <div className="flex flex-col gap-3 mb-6">
                    {event.location && (
                        <a 
                            href={event.mapUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-text-secondary font-medium">位置</div>
                                <div className="text-text-primary font-bold">{event.location}</div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-primary" />
                        </a>
                    )}

                    {event.websiteUrl && (
                        <a 
                            href={event.websiteUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-3 p-4 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-800 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div className="flex-1 font-bold">官方網站</div>
                            <ExternalLink className="w-4 h-4 text-white/80" />
                        </a>
                    )}

                    {event.bookingLink && (
                        <a 
                            href={event.bookingLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-3 p-4 bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                                <Ticket className="w-5 h-5" />
                            </div>
                            <div className="flex-1 font-bold">查看預訂 / 優惠券</div>
                            <ExternalLink className="w-4 h-4 text-white/80" />
                        </a>
                    )}
                </div>

                {/* Image Section */}
                {imgSrc && (
                    <div className="mb-6">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-text-secondary mb-3 uppercase tracking-wider">
                            <ImageIcon className="w-4 h-4" /> 景點實境
                        </h4>
                        <div 
                            className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer group bg-gray-50"
                            onClick={() => setIsZoomed(true)}
                        >
                            <img 
                                src={imgSrc} 
                                alt={event.description} 
                                className="w-full h-64 object-cover object-center group-hover:opacity-95 transition-opacity"
                                onError={handleImageError}
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                <span className="bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                                    <ZoomIn className="w-3 h-3" /> 查看大圖
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Details Section */}
                {event.details && (
                    <div className="mb-6">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-text-secondary mb-3 uppercase tracking-wider">
                            <AlignLeft className="w-4 h-4" /> 背景資訊
                        </h4>
                        <div className="text-text-primary leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
                            {event.details}
                        </div>
                    </div>
                )}
                
                <div className="h-6" />
            </div>

            {/* Lightbox */}
            {isZoomed && imgSrc && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in pointer-events-auto"
                    onClick={() => setIsZoomed(false)}
                >
                    <button 
                        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 z-[101]"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsZoomed(false);
                        }}
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <img 
                        src={imgSrc} 
                        alt="Full View" 
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onError={handleImageError}
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            )}
        </div>
    );
};
