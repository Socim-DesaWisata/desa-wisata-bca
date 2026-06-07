import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    ClipboardCheck,
    ClipboardList,
    LayoutDashboard,
    BarChart3,
    UserCog,
    Users,
    MapPinned,
} from 'lucide-react';
import { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarLogo } from '@/components/ui/sidebar';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import {
    dashboard,
    questions,
    pariwisata,
    surveyAssignments,
    umkm,
    users as usersRoute,
    villages,
} from '@/routes';
import profile from '@/routes/profile';
import type { NavItem } from '@/types';

type SidebarNavItem = NavItem & {
    badge?: string;
    warning?: boolean;
    children?: Array<Pick<NavItem, 'title' | 'href'>>;
    roles?: Array<'admin' | 'enumerator'>;
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
            },
            {
                title: 'Desa',
                href: villages(),
                icon: MapPinned,
                roles: ['admin'],
            },
        ],
    },
    {
        label: 'Program',
        items: [
            {
                title: 'Laporan',
                href: '#',
                icon: BarChart3,
                roles: ['admin'],
                children: [
                    { title: 'UMKM', href: umkm() },
                    { title: 'ISTC', href: pariwisata() },
                ],
            },
            {
                title: 'Template Survey',
                href: questions(),
                icon: ClipboardList,
                roles: ['admin'],
            },
            {
                title: 'Survey Assignment',
                href: surveyAssignments(),
                icon: ClipboardCheck,
            },
        ],
    },
    {
        label: 'Management',
        items: [
            {
                title: 'User Management',
                href: usersRoute(),
                icon: Users,
                roles: ['admin'],
            },
        ],
    },
    {
        label: 'Pengaturan',
        items: [
            {
                title: 'Profile',
                href: profile.edit(),
                icon: UserCog,
            },
        ],
    },
];

export function AdminSidebarContent({
    onNavigate,
}: {
    onNavigate?: () => void;
}) {
    const { auth } = usePage().props;
    const { isCurrentOrParentUrl, isCurrentUrl } = useCurrentUrl();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const userRole = auth.user?.role === 'admin' ? 'admin' : 'enumerator';
    const visibleNavGroups = navGroups
        .map((group) => ({
            ...group,
            items: group.items.filter(
                (item) => !item.roles || item.roles.includes(userRole),
            ),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <div className="relative flex h-full flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(47,166,252,0.45),transparent_34%),linear-gradient(180deg,#0066AE_0%,#00508F_42%,#093967_100%)] px-4 py-4 text-white shadow-[inset_-1px_0_0_rgba(255,255,255,0.12)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_28%,rgba(255,255,255,0.04)_100%)]" />

            <div className="relative">
                <Link
                    href={dashboard()}
                    prefetch
                    onClick={onNavigate}
                    className="flex items-center justify-center pt-1 pr-5 pb-5"
                    aria-label="BCA"
                >
                    <SidebarLogo className="h-auto max-h-none w-[100px]" />
                </Link>
                <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)]" />
            </div>

            <nav className="relative flex-1 [scrollbar-width:none] overflow-y-auto py-2 [&::-webkit-scrollbar]:hidden">
                {visibleNavGroups.map((group, groupIndex) => (
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
                                const hasChildren = Boolean(
                                    item.children?.length,
                                );
                                const isPlaceholder =
                                    item.href === '#' && !hasChildren;
                                const href =
                                    !isPlaceholder &&
                                    !hasChildren &&
                                    typeof item.href !== 'string'
                                        ? item.href
                                        : null;
                                const childHrefs = item.children?.filter(
                                    (child) => typeof child.href !== 'string',
                                );
                                const hasActiveChild = Boolean(
                                    childHrefs?.some((child) =>
                                        isCurrentUrl(child.href),
                                    ),
                                );
                                const isOpen = Boolean(openMenus[item.title]);
                                const isActive = hasActiveChild
                                    ? true
                                    : href && href.url === questions().url
                                      ? isCurrentOrParentUrl(href)
                                      : href
                                        ? isCurrentUrl(href)
                                        : false;

                                const content = (
                                    <>
                                        {isActive && (
                                            <>
                                                <span className="absolute left-0 h-[22px] w-[3px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
                                                <span className="pointer-events-none absolute right-2 size-8 rounded-full bg-[#2FA6FC]/18 blur-md" />
                                            </>
                                        )}
                                        {Icon && (
                                            <Icon
                                                className="relative size-[18px] shrink-0"
                                                strokeWidth={1.9}
                                            />
                                        )}
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
                                        {hasChildren && (
                                            <ChevronDown
                                                className={[
                                                    'relative size-4 shrink-0 text-white/70 transition-transform duration-150',
                                                    isOpen ? 'rotate-180' : '',
                                                ].join(' ')}
                                                strokeWidth={1.8}
                                            />
                                        )}
                                    </>
                                );

                                const className = [
                                    'group relative flex h-[42px] items-center gap-2.5 rounded-xl px-3 text-[13.5px] leading-5 transition-all duration-150',
                                    isActive || isOpen
                                        ? 'bg-gradient-to-r from-white/22 to-white/12 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_20px_rgba(3,17,32,0.16)]'
                                        : isPlaceholder
                                          ? 'cursor-default font-medium text-white/42'
                                          : 'font-medium text-white/72 hover:translate-x-0.5 hover:bg-white/10 hover:text-white',
                                ].join(' ');

                                if (hasChildren) {
                                    return (
                                        <div key={item.title}>
                                            <button
                                                type="button"
                                                className={className}
                                                aria-expanded={isOpen}
                                                onClick={() =>
                                                    setOpenMenus((current) => ({
                                                        ...current,
                                                        [item.title]:
                                                            !current[
                                                                item.title
                                                            ],
                                                    }))
                                                }
                                            >
                                                {content}
                                            </button>
                                            {isOpen && (
                                                <div className="mt-1 ml-5 space-y-1 border-l border-white/14 pl-3">
                                                    {item.children?.map(
                                                        (child) => (
                                                            <Link
                                                                key={
                                                                    child.title
                                                                }
                                                                href={
                                                                    child.href
                                                                }
                                                                onClick={
                                                                    onNavigate
                                                                }
                                                                className="flex h-9 items-center rounded-lg px-3 text-[13px] font-medium text-white/68 transition hover:bg-white/10 hover:text-white"
                                                            >
                                                                {child.title}
                                                            </Link>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                return isPlaceholder ? (
                                    <div
                                        key={item.title}
                                        className={className}
                                        aria-disabled="true"
                                    >
                                        {content}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        prefetch
                                        onClick={onNavigate}
                                        className={className}
                                        aria-current={
                                            isActive ? 'page' : undefined
                                        }
                                    >
                                        {content}
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
                {auth.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex w-full items-center gap-2.5 rounded-2xl border border-white/16 bg-white/12 p-2.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur transition duration-150 hover:bg-white/16">
                                <span className="relative flex size-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/35 bg-gradient-to-br from-white to-[#AAD2F8] text-[13px] font-bold text-[#0066AE] shadow-[0_6px_16px_rgba(3,17,32,0.16)]">
                                    {auth.user.avatar ? (
                                        <img
                                            src={auth.user.avatar}
                                            alt={auth.user.name}
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        auth.user.name.charAt(0).toUpperCase()
                                    )}
                                    <span className="absolute right-[-1px] bottom-[-1px] size-2 rounded-full border-2 border-[#093967] bg-[#22c55e]" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-[13px] leading-4 font-bold text-white">
                                        {auth.user.name}
                                    </span>
                                    <span className="mt-0.5 block truncate text-[11px] leading-4 text-white/65">
                                        {auth.user.email}
                                    </span>
                                </span>
                                <ChevronDown
                                    className="size-4 text-white/70"
                                    strokeWidth={1.8}
                                />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56 rounded-xl"
                            side="top"
                            align="end"
                        >
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
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
