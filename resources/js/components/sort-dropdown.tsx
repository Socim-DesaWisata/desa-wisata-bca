import React from 'react';
import { ChevronDown, ArrowDownAZ, ArrowUp10, ArrowDown10, Clock, ActivitySquare } from 'lucide-react';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger, 
    DropdownMenuLabel, 
    DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

export function SortDropdown({ 
    currentSort, 
    currentDirection, 
    onSort, 
    aspects 
}: { 
    currentSort: string, 
    currentDirection: string, 
    onSort: (sort: string, dir: string) => void,
    aspects: string[]
}) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center justify-between min-w-[200px] px-3 py-2 text-sm font-semibold bg-white border border-[#DDE4EC] rounded-lg hover:bg-[#F1F5F8] text-[#303030] shadow-[0_2px_4px_rgba(9,57,103,0.02)] transition-colors active:scale-[0.98]">
                    Urutkan Berdasarkan <ChevronDown className="w-4 h-4 text-[#7C7C7C]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel className="text-xs text-gray-500 font-bold uppercase tracking-wider">Lainnya</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onSort('total_score', 'desc')} className={currentSort === 'total_score' && currentDirection === 'desc' ? 'bg-blue-50 text-blue-700 font-semibold' : ''}>
                        Tertinggi (Total)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSort('total_score', 'asc')} className={currentSort === 'total_score' && currentDirection === 'asc' ? 'bg-blue-50 text-blue-700 font-semibold' : ''}>
                        Terendah (Total)
                    </DropdownMenuItem>
                    
                    {aspects.length > 0 && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-xs text-gray-500 font-bold uppercase tracking-wider">Skor Aspek</DropdownMenuLabel>
                            {aspects.map(aspect => {
                                const sortKey = `aspect:${aspect}`;
                                const isActive = currentSort === sortKey;
                                return (
                                    <DropdownMenuItem key={aspect} onClick={() => onSort(sortKey, 'desc')} className={isActive ? 'bg-blue-50 text-blue-700 font-semibold' : ''}>
                                        {aspect}
                                    </DropdownMenuItem>
                                );
                            })}
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Quick Sort Buttons */}
            <div className="flex flex-wrap items-center gap-2">
                <SortButton active={currentSort === 'total_score' && currentDirection === 'desc'} onClick={() => onSort('total_score', 'desc')} icon={<ArrowUp10 className="w-4 h-4" />}>
                    Total Tertinggi
                </SortButton>
                <SortButton active={currentSort === 'total_score' && currentDirection === 'asc'} onClick={() => onSort('total_score', 'asc')} icon={<ArrowDown10 className="w-4 h-4" />}>
                    Total Terendah
                </SortButton>
                <SortButton active={currentSort === 'name' && currentDirection === 'asc'} onClick={() => onSort('name', 'asc')} icon={<ArrowDownAZ className="w-4 h-4" />}>
                    A-Z
                </SortButton>
                <SortButton active={currentSort === 'updated_at' && currentDirection === 'desc'} onClick={() => onSort('updated_at', 'desc')} icon={<Clock className="w-4 h-4" />}>
                    Terbaru
                </SortButton>
                <SortButton active={currentSort === 'completion' && currentDirection === 'desc'} onClick={() => onSort('completion', 'desc')} icon={<ActivitySquare className="w-4 h-4" />}>
                    Progress Terbanyak
                </SortButton>
            </div>
        </div>
    );
}

function SortButton({ active, onClick, children, icon }: { active: boolean, onClick: () => void, children: React.ReactNode, icon: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition-colors active:scale-95 ${
                active 
                    ? 'bg-[#EAF7FF] text-[#0066AE] border border-[#0066AE]' 
                    : 'bg-white text-[#667085] border border-[#EFEFEF] hover:bg-[#F8FAFC]'
            }`}
        >
            {icon}
            {children}
        </button>
    );
}
