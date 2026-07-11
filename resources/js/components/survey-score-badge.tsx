import React from 'react';

function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

export function SurveyScoreBadge({ score }: { score: number }) {
    let colorClass = 'bg-[#FDECEC] text-[#D81313]'; // 0-49 Red
    if (score >= 90) {
        colorClass = 'bg-[#EAF8F0] text-[#00893D]'; // Green
    } else if (score >= 70) {
        colorClass = 'bg-[#EAF7FF] text-[#0066AE]'; // Blue
    } else if (score >= 50) {
        colorClass = 'bg-[#FFF4EA] text-[#C9681E]'; // Orange
    }

    return (
        <span className={classNames('inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap', colorClass)}>
            {score.toFixed(1)}%
        </span>
    );
}
