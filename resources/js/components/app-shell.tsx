import type { ReactNode } from 'react';
import type { AppVariant } from '@/types';

type Props = {
    children: ReactNode;
    variant?: AppVariant;
};

export function AppShell({ children, variant = 'sidebar' }: Props) {
    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-[#f7f8fb] font-sans text-[#111827]">
            {children}
        </div>
    );
}
