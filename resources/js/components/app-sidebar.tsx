import { Link } from '@inertiajs/react';
import type { ComponentType } from 'react';
import {
    BarChart3,
    ChevronDown,
    ClipboardList,
    ClipboardCheck,
    FileSearch,
    FolderOpen,
    Landmark,
    LayoutDashboard,
    MapPinned,
    Settings,
    Users,
} from 'lucide-react';

import { dashboard } from '@/routes';

type SidebarNavItem = {
    title: string;
    href: ReturnType<typeof dashboard> | string;
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
    active?: boolean;
    badge?: string;
    warning?: boolean;
};

type SidebarNavGroup = {
    label: string;
    items: SidebarNavItem[];
};

const navGroups: SidebarNavGroup[] = [
    {
        label: 'Overview',
        items: [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutDashboard,
                active: true,
            },
        ],
    },
    {
        label: 'Program',
        items: [
            { title: 'Desa Wisata', href: '#', icon: MapPinned },
            { title: 'Template Survey', href: '#', icon: ClipboardList },
            { title: 'Survey Assignment', href: '#', icon: ClipboardCheck },
            {
                title: 'Review Survey',
                href: '#',
                icon: FileSearch,
                badge: '18',
            },
        ],
    },
    {
        label: 'Management',
        items: [
            {
                title: 'Dokumen',
                href: '#',
                icon: FolderOpen,
                badge: '3',
                warning: true,
            },
            { title: 'Laporan', href: '#', icon: BarChart3 },
            { title: 'User Management', href: '#', icon: Users },
            { title: 'Pengaturan', href: '#', icon: Settings },
        ],
    },
];

export function AdminSidebarContent({
    onNavigate,
}: {
    onNavigate?: () => void;
}) {
    return (
        <div className="relative flex h-full flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(47,166,252,0.45),transparent_34%),linear-gradient(180deg,#0066AE_0%,#00508F_42%,#093967_100%)] px-4 py-4 text-white shadow-[inset_-1px_0_0_rgba(255,255,255,0.12)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_28%,rgba(255,255,255,0.04)_100%)]" />

            <div className="relative">
                <Link
                    href={dashboard()}
                    prefetch
                    onClick={onNavigate}
                    className="flex items-center gap-3 px-2 pt-1 pb-4"
                >
                    <span className="flex size-[38px] shrink-0 items-center justify-center rounded-xl border border-white/18 bg-white/14 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                        <Landmark className="size-[20px]" strokeWidth={1.9} />
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-[15px] leading-5 font-bold tracking-[-0.01em]">
                            Desa Wisata BCA
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] leading-4 text-white/68">
                            CSR Aggregator Platform
                        </span>
                    </span>
                </Link>
                <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)]" />
            </div>

            <nav className="relative flex-1 [scrollbar-width:none] overflow-y-auto py-2 [&::-webkit-scrollbar]:hidden">
                {navGroups.map((group, groupIndex) => (
                    <div
                        key={group.label}
                        className={groupIndex === 0 ? 'mt-1' : 'mt-4'}
                    >
                        <div className="mb-2 px-2.5 text-[10px] font-bold tracking-[0.08em] text-white/45 uppercase">
                            {group.label}
                        </div>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        prefetch={item.href !== '#'}
                                        onClick={onNavigate}
                                        className={[
                                            'group relative flex h-[42px] items-center gap-2.5 rounded-xl px-3 text-[13.5px] leading-5 transition-all duration-150',
                                            item.active
                                                ? 'bg-gradient-to-r from-white/22 to-white/12 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_20px_rgba(3,17,32,0.16)]'
                                                : 'font-medium text-white/72 hover:translate-x-0.5 hover:bg-white/10 hover:text-white',
                                        ].join(' ')}
                                    >
                                        {item.active && (
                                            <>
                                                <span className="absolute left-0 h-[22px] w-[3px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
                                                <span className="pointer-events-none absolute right-2 size-8 rounded-full bg-[#2FA6FC]/18 blur-md" />
                                            </>
                                        )}
                                        <Icon
                                            className="relative size-[18px] shrink-0"
                                            strokeWidth={1.9}
                                        />
                                        <span className="relative min-w-0 flex-1 truncate">
                                            {item.title}
                                        </span>
                                        {item.badge && (
                                            <span
                                                className={[
                                                    'relative ml-auto inline-flex h-5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white',
                                                    item.warning
                                                        ? 'bg-[#FF944C]'
                                                        : 'bg-white/16',
                                                ].join(' ')}
                                            >
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="relative pt-3">
                <div className="mb-2 px-2 text-[10px] font-semibold tracking-[0.08em] text-white/45 uppercase">
                    CSR Dashboard
                </div>
                <button className="flex w-full items-center gap-2.5 rounded-2xl border border-white/16 bg-white/12 p-2.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur transition duration-150 hover:bg-white/16">
                    <span className="relative flex size-[34px] shrink-0 items-center justify-center rounded-full border-2 border-white/35 bg-gradient-to-br from-white to-[#AAD2F8] text-[13px] font-bold text-[#0066AE] shadow-[0_6px_16px_rgba(3,17,32,0.16)]">
                        A
                        <span className="absolute right-[-1px] bottom-[-1px] size-2 rounded-full border-2 border-[#093967] bg-[#22c55e]" />
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] leading-4 font-bold text-white">
                            Admin CSR
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] leading-4 text-white/65">
                            Super Admin
                        </span>
                    </span>
                    <ChevronDown
                        className="size-4 text-white/70"
                        strokeWidth={1.8}
                    />
                </button>
                <div className="mt-2 px-2 text-[10px] leading-4 text-white/40">
                    v1.0.0
                </div>
            </div>
        </div>
    );
}

export function AppSidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-[232px] overflow-hidden lg:block">
            <AdminSidebarContent />
        </aside>
    );
}
