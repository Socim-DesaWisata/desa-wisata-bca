import React from 'react';
import { SurveyScoreBadge } from './survey-score-badge';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export function SurveyAspectRow({ name, score, isHovered }: { name: string; score: number; isHovered?: boolean }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 group transition-colors">
            <div className="flex items-center min-w-0 pr-3 flex-1">
                <CheckCircle2 className={`w-3.5 h-3.5 mr-2 shrink-0 transition-colors ${score >= 90 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className="text-[13px] font-medium text-gray-700 truncate" title={name}>
                    {name}
                </span>
            </div>
            <div className="flex items-center shrink-0">
                <SurveyScoreBadge score={score} />
            </div>
        </div>
    );
}
