import { AdminSidebarContent } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { router, usePage } from '@inertiajs/react';
import { Loader2, Map as MapIcon, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { show as showVillage } from '@/routes/villages';
import { dashboard } from '@/routes';

type Desa = {
    id: number;
    code: string;
    name: string;
};

export function GlobalSurveySelector() {
    const { url } = usePage();
    const [desaList, setDesaList] = useState<Desa[]>([]);
    const [selectedDesa, setSelectedDesa] = useState<string>('');
    const [loadingDesa, setLoadingDesa] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setLoadingDesa(true);
        fetch('/api/dashboard/desa')
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(
                        `Dashboard desa request failed: ${response.status}`,
                    );
                }

                return response.json() as Promise<unknown>;
            })
            .then((payload: unknown) => {
                const rows = Array.isArray(payload)
                    ? payload
                    : payload &&
                        typeof payload === 'object' &&
                        Array.isArray((payload as { data?: unknown }).data)
                      ? (payload as { data: unknown[] }).data
                      : [];
                const uniqueDesa = Array.from(
                    new Map(
                        rows
                            .filter(
                                (row): row is Desa =>
                                    typeof row === 'object' &&
                                    row !== null &&
                                    typeof (row as Desa).id === 'number' &&
                                    typeof (row as Desa).code === 'string' &&
                                    typeof (row as Desa).name === 'string',
                            )
                            .map((row) => [row.code, row]),
                    ).values(),
                );

                if (isMounted) {
                    setDesaList(uniqueDesa);
                }
            })
            .catch(() => {
                if (isMounted) setDesaList([]);
            })
            .finally(() => {
                if (isMounted) setLoadingDesa(false);
            });
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const path = url.split('?')[0].replace(/\/$/, '');
        const isIndexPage = [
            '',
            '/dashboard',
            '/villages',
            '/survey-assignments',
            '/pariwisata',
            '/umkm',
            '/users',
            '/profile'
        ].includes(path);

        if (isIndexPage) {
            setSelectedDesa('');
            localStorage.removeItem('selected_desa_code');
            return;
        }

        const currentDesaCode = localStorage.getItem('selected_desa_code') || '';
        if (currentDesaCode && currentDesaCode !== selectedDesa) {
            setSelectedDesa(currentDesaCode);
        }
    }, [url]);

    const handleDesaChange = (code: string) => {
        if (code === 'unselected') {
            setSelectedDesa('');
            localStorage.removeItem('selected_desa_code');
            router.visit(dashboard.url());
            return;
        }

        const desa = desaList.find((item) => item.code === code);

        if (!desa) {
            return;
        }

        setSelectedDesa(code);
        localStorage.setItem('selected_desa_code', code);

        router.visit(showVillage.url({ village: desa.id }));
    };

    return (
        <header className="flex h-14 w-full items-center justify-between gap-3 border-b border-[#E5E7EB] bg-white px-3 shadow-sm sm:px-6">
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

            <div className="relative ml-auto w-48 sm:w-56">
                <Select
                    value={selectedDesa}
                    onValueChange={handleDesaChange}
                    disabled={loadingDesa}
                >
                    <SelectTrigger
                        className="w-full bg-[#093967] border-0 text-white font-bold focus:ring-1 focus:ring-[#0066AE] hover:bg-[#072d54] data-[placeholder]:text-white"
                        aria-label="Desa Wisata"
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <MapIcon className="h-4 w-4 shrink-0 text-white" />
                            {loadingDesa ? (
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                            ) : (
                                <SelectValue placeholder="Pilih desa..." />
                            )}
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="unselected">
                            Pilih desa...
                        </SelectItem>
                        {desaList.map((desa) => (
                            <SelectItem key={desa.code} value={desa.code}>
                                {desa.name}
                            </SelectItem>
                        ))}
                        {desaList.length === 0 && !loadingDesa && (
                            <div className="px-2 py-2 text-sm text-gray-500">
                                Tidak ada data
                            </div>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </header>
    );
}
