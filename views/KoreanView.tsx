
import React, { useState } from 'react';
import { Copy, Check, Languages } from 'lucide-react';

interface Phrase {
    kor: string;
    rom: string;
    chi: string;
}

const PHRASES: Record<string, Phrase[]> = {
    '基本': [
        { kor: 'Hola', rom: 'O-la', chi: '你好' },
        { kor: 'Gracias', rom: 'Gra-si-as', chi: '謝謝' },
        { kor: 'Perdón', rom: 'Per-don', chi: '對唔住 / 唔該 (借過)' },
        { kor: 'Por favor', rom: 'Por fa-vor', chi: '唔該 (Please)' },
        { kor: 'Sí / No', rom: 'Si / No', chi: '係 / 唔係' },
    ],
    '購物': [
        { kor: '¿Cuánto cuesta?', rom: 'Kwan-to kwes-ta?', chi: '幾多錢？' },
        { kor: 'Es muy caro', rom: 'Es mui ka-ro', chi: '好貴' },
        { kor: 'Quiero esto', rom: 'Kie-ro es-to', chi: '我要呢個' },
        { kor: 'Tax Free?', rom: 'Tax Free?', chi: '有冇得退稅？' },
    ],
    '餐廳': [
        { kor: 'La cuenta, por favor', rom: 'La kwen-ta, por fa-vor', chi: '埋單，唔該' },
        { kor: 'Una mesa para dos', rom: 'U-na me-sa pa-ra dos', chi: '兩位，唔該' },
        { kor: 'Agua', rom: 'A-gwa', chi: '水' },
        { kor: '¡Está muy bueno!', rom: 'Es-ta mui bwe-no', chi: '好好食！' },
    ],
    '交通': [
        { kor: '¿Dónde está...?', rom: 'Don-de es-ta...?', chi: '...喺邊度？' },
        { kor: 'La estación de metro', rom: 'La es-ta-sion de me-tro', chi: '地鐵站' },
        { kor: 'Aeropuerto', rom: 'A-e-ro-pwer-to', chi: '機場' },
        { kor: 'Taxi', rom: 'Tak-si', chi: '的士' },
    ]
};

export const SpanishView: React.FC = () => {
    const [activeTab, setActiveTab] = useState('基本');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text).catch(() => {});
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const handleTranslate = (text: string) => {
        const url = `https://translate.google.com/?sl=es&tl=zh-TW&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="p-4 pt-6 pb-20">
            <h1 className="text-4xl font-bold font-display mb-6 text-text-primary">實用西班牙文</h1>
            
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-2">
                {Object.keys(PHRASES).map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                            activeTab === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-text-secondary border border-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {PHRASES[activeTab].map((phrase, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-card border border-gray-100 relative">
                        <div className="flex justify-between items-start">
                            <div className="flex-1 pr-2">
                                <h3 className="text-xl font-bold text-text-primary mb-1">{phrase.kor}</h3>
                                <p className="text-sm text-primary font-medium mb-1">{phrase.rom}</p>
                                <p className="text-sm text-text-secondary">{phrase.chi}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleTranslate(phrase.kor)} className="p-2 bg-gray-50 rounded-full text-text-tertiary hover:text-blue-600">
                                    <Languages className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleCopy(phrase.kor, idx)} className="p-2 bg-gray-50 rounded-full text-text-tertiary hover:text-primary">
                                    {copiedIndex === idx ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
