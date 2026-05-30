import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

type FlashPageProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
        warning?: string | null;
        info?: string | null;
        toast?: FlashToast | null;
    };
};

function normalizeFlash(flash: FlashPageProps['flash']): FlashToast | null {
    if (flash?.toast) {
        return flash.toast;
    }

    if (flash?.success) {
        return { type: 'success', message: flash.success };
    }

    if (flash?.error) {
        return { type: 'error', message: flash.error };
    }

    if (flash?.warning) {
        return { type: 'warning', message: flash.warning };
    }

    if (flash?.info) {
        return { type: 'info', message: flash.info };
    }

    return null;
}

export function useFlashToast(): void {
    const { flash } = usePage<FlashPageProps>().props;
    const shownToast = useRef<string | null>(null);

    function showToast(data: FlashToast | null | undefined): void {
        if (!data) {
            return;
        }

        const toastKey = `${data.type}:${data.message}`;

        if (shownToast.current === toastKey) {
            return;
        }

        shownToast.current = toastKey;

        toast[data.type](data.message, {
            closeButton: true,
            duration: 1000,
        });
    }

    useEffect(() => {
        showToast(normalizeFlash(flash));
    }, [flash]);

    useEffect(() => {
        return router.on('flash', (event) => {
            const flash = (event as CustomEvent).detail?.flash;
            showToast(normalizeFlash(flash));
        });
    }, []);
}
