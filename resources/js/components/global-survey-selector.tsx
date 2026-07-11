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
import { Loader2, MapPin, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

type Desa = {
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
        const urlMatch = url.match(/\/survey-assignments\/([^\/?#]+)/);
        const currentDesaCode =
            urlMatch?.[1] || localStorage.getItem('selected_desa_code') || '';

        if (urlMatch?.[1]) {
            localStorage.setItem('selected_desa_code', urlMatch[1]);
        }

        if (currentDesaCode && currentDesaCode !== selectedDesa) {
            setSelectedDesa(currentDesaCode);
        }
    }, [url, desaList.length]);

    const handleDesaChange = (code: string) => {
        setSelectedDesa(code);
        localStorage.setItem('selected_desa_code', code);

        router.visit(`/survey-assignments/${code}`);
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
                        className="w-full bg-[#F8FBFE] focus:ring-1 focus:ring-[#0066AE]"
                        aria-label="Desa Wisata"
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <MapPin className="h-4 w-4 shrink-0 text-[#7C7C7C]" />
                            {loadingDesa ? (
                                <Loader2 className="h-4 w-4 animate-spin text-[#7C7C7C]" />
                            ) : (
                                <SelectValue placeholder="Desa Wisata" />
                            )}
                        </div>
                    </SelectTrigger>
                    <SelectContent>
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
