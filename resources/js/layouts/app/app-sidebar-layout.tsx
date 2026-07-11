import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { GlobalSurveySelector } from '@/components/global-survey-selector';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({ children }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <div className="sticky top-0 z-[1050] flex flex-col">
                    <GlobalSurveySelector />
                </div>
                {children}
            </AppContent>
        </AppShell>
    );
}
