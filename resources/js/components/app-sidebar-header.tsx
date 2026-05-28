import { useState } from 'react';
import { Bell, CircleHelp, Menu, Search } from 'lucide-react';

import { AdminSidebarContent } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-3 border-b border-[#d9dee7] bg-white px-3 sm:px-4 lg:h-[60px] lg:px-5 xl:px-6">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-9 shrink-0 rounded-lg text-[#303030] lg:hidden"
                        aria-label="Buka menu"
                    >
                        <Menu className="size-5" strokeWidth={2} />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="w-[280px] max-w-[85vw] border-0 bg-transparent p-0"
                >
                    <AdminSidebarContent
                        onNavigate={() => setIsSidebarOpen(false)}
                    />
                </SheetContent>
            </Sheet>

            <div className="flex h-9 min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-[#c8d0da] bg-white px-3 text-[#6b7280] shadow-[0_1px_2px_rgba(3,17,32,0.04)] sm:max-w-[420px]">
                <Search className="size-4.5" strokeWidth={1.8} />
                <span className="truncate text-[13px] leading-5 sm:hidden">
                    Cari...
                </span>
                <span className="hidden truncate text-[13px] leading-5 sm:inline">
                    Cari desa, survey, atau dokumen...
                </span>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5 xl:gap-4">
                <button
                    type="button"
                    className="relative flex size-8 items-center justify-center rounded-full text-[#111827] transition hover:bg-[#f1f5f8]"
                    aria-label="Notifikasi"
                >
                    <Bell className="size-4.5" strokeWidth={1.8} />
                    <span className="absolute top-1 right-1 size-2 rounded-full bg-[#d81313] ring-2 ring-white" />
                </button>
                <button
                    type="button"
                    className="hidden size-8 items-center justify-center rounded-full text-[#111827] transition hover:bg-[#f1f5f8] sm:flex"
                    aria-label="Bantuan"
                >
                    <CircleHelp className="size-5" strokeWidth={1.8} />
                </button>
                <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-full bg-[#0066ae] text-white shadow-[0_4px_10px_rgba(0,102,174,0.24)]"
                    aria-label={breadcrumbs[0]?.title ?? 'Akun admin'}
                >
                    <span className="size-5 rounded-full bg-white" />
                </button>
            </div>
        </header>
    );
}
