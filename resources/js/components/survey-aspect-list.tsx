import React, { useState } from 'react';
import { SurveyAspectRow } from './survey-aspect-row';

type AspectScore = {
    aspect: string;
    score: number;
    max_score: number;
    raw_score: number;
};

export function SurveyAspectList({ aspects }: { aspects: AspectScore[] }) {
    const [expanded, setExpanded] = useState(false);
    
    if (!aspects || aspects.length === 0) {
        return (
            <div className="flex items-center justify-center py-4 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
                <span className="text-sm text-gray-500 font-medium">Belum ada data aspek</span>
            </div>
        );
    }
    
    const displayAspects = expanded ? aspects : aspects.slice(0, 8);
    const hasMore = aspects.length > 8;
    
    return (
        <div className="flex flex-col w-full bg-white rounded-lg border border-gray-100 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col px-3 py-1">
                {displayAspects.map((aspect, idx) => (
                    <SurveyAspectRow key={idx} name={aspect.aspect || 'Umum'} score={aspect.score} />
                ))}
            </div>
            {hasMore && (
                <div className="px-3 pb-2 pt-1 border-t border-gray-50 bg-gray-50/30">
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpanded(!expanded);
                        }} 
                        className="w-full text-xs font-bold text-[#0066AE] hover:text-[#093967] py-1.5 transition-colors flex items-center justify-center gap-1"
                    >
                        {expanded ? 'Tampilkan Lebih Sedikit' : `Lihat Semua Aspek (${aspects.length})`}
                    </button>
                </div>
            )}
        </div>
    );
}
