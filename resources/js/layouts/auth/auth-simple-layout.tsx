import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-[#F7F7F7] px-4 py-8 font-bca text-[#303030] sm:px-6">
            <div className="w-full max-w-[420px] rounded-3xl border border-[#E4EAF0] bg-white px-6 py-7 shadow-[0_18px_46px_rgba(9,57,103,0.10)] sm:px-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-3">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0066AE]">
                                <AppLogoIcon className="size-8 fill-current text-[#0066AE]" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-1.5 text-center">
                            <h1 className="text-xl font-bold text-[#0F172A]">
                                {title}
                            </h1>
                            <p className="text-center text-sm leading-6 text-[#64748B]">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
