import React, { useState } from 'react';
import { Bookmark } from '../types';
import { Search, Plus, Image, Link, X, Upload } from 'lucide-react';

export const BookmarksView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Mock data
    const categories = ['All', '購物', '美食', '景點', '交通'];
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([
        { id: '1', title: '弘大羽絨攻略', url: 'https://map.naver.com', category: '購物', tags: ['羽絨', '冬天'], createdAt: Date.now() },
        { id: '2', title: '醬蟹餐廳推介', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400', category: '美食', tags: ['弘大', '晚餐'], createdAt: Date.now() },
    ]);

    const filtered = bookmarks.filter(b => 
        (activeCategory === 'All' || b.category === activeCategory) &&
        (b.title.includes(searchTerm) || b.tags.some(t => t.includes(searchTerm)))
    );

    return (
        <div className="min-h-screen px-4 pt-4 pb-20">
            <h1 className="text-4xl font-bold font-display mb-4 text-text-primary">我的書籤</h1>
            
            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input 
                    type="text"
                    placeholder="搜尋標籤、標題..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                            activeCategory === cat 
                                ? 'bg-primary text-white shadow-sm' 
                                : 'bg-white text-text-secondary border border-gray-100'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3">
                {/* Add New Button */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-text-tertiary hover:border-primary hover:text-primary transition-colors bg-white/50"
                >
                    <Plus className="w-8 h-8" />
                    <span className="text-xs font-bold">新增書籤</span>
                </button>

                {filtered.map(b => (
                    <div key={b.id} className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-50 flex flex-col">
                        {b.imageUrl ? (
                            <div className="aspect-square bg-gray-100 relative">
                                <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                                    {b.category}
                                </div>
                            </div>
                        ) : (
                            <div className="aspect-square bg-gray-50 flex items-center justify-center relative">
                                <Link className="w-8 h-8 text-primary/40" />
                                <div className="absolute top-2 right-2 bg-gray-200 text-text-secondary text-[10px] px-2 py-0.5 rounded-full">
                                    {b.category}
                                </div>
                            </div>
                        )}
                        <div className="p-3">
                            <h4 className="font-bold text-sm text-text-primary line-clamp-1">{b.title}</h4>
                            <div className="flex gap-1 mt-1 flex-wrap">
                                {b.tags.map(t => (
                                    <span key={t} className="text-[10px] text-text-tertiary">#{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">上傳書籤</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <button className="w-full py-3 bg-gray-50 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-text-secondary hover:bg-gray-100">
                                <Link className="w-4 h-4" /> 貼上連結
                            </button>
                            <button className="w-full py-3 bg-gray-50 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-text-secondary hover:bg-gray-100">
                                <Image className="w-4 h-4" /> 上傳相片
                            </button>
                            <div className="border-t pt-4 border-gray-100">
                                <button onClick={() => setIsModalOpen(false)} className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-md">
                                    確認新增
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};