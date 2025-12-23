import React from 'react';

interface ToastProps {
    message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
            <div className="bg-text-dark text-white px-6 py-3 rounded-full shadow-lg font-semibold text-sm flex items-center gap-2">
                <span>{message}</span>
            </div>
        </div>
    );
};