import { useState } from 'react';
import { Bell, CircleHelp, Menu, Search } from 'lucide-react';

import { AdminSidebarContent } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarLogo } from '@/components/ui/sidebar';
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
        </header>
    );
}
