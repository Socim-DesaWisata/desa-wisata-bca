import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { router, usePage } from '@inertiajs/react';
import { MapPin, Map, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type Desa = {
    code: string;
    name: string;
};

type Pariwisata = {
    id: number;
    name: string;
};

export function GlobalSurveySelector() {
    const { url } = usePage();
    const [desaList, setDesaList] = useState<Desa[]>([]);
    const [pariwisataList, setPariwisataList] = useState<Pariwisata[]>([]);

    const [selectedDesa, setSelectedDesa] = useState<string>('');
    const [selectedPariwisata, setSelectedPariwisata] = useState<string>('');

    const [loadingDesa, setLoadingDesa] = useState(true);
    const [loadingPariwisata, setLoadingPariwisata] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (desaList.length === 0) {
            setLoadingDesa(true);
            fetch('/api/dashboard/desa')
                .then((res) => res.json())
                .then((data: Desa[]) => {
                    if (isMounted) {
                        setDesaList(data);
                        setLoadingDesa(false);
                    }
                })
                .catch(() => {
                    if (isMounted) setLoadingDesa(false);
                });
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        // Sync with URL or LocalStorage
        const urlMatch = url.match(
            /\/survey-assignments\/([^\/?#]+)(?:\/pariwisata\/(\d+))?/,
        );
        let currentDesaCode =
            urlMatch?.[1] || localStorage.getItem('selected_desa_code') || '';
        let currentPariwisataId =
            urlMatch?.[2] ||
            localStorage.getItem('selected_pariwisata_id') ||
            '';

        // If URL explicitly matched, force local storage to sync
        if (urlMatch?.[1]) {
            localStorage.setItem('selected_desa_code', urlMatch[1]);
        }
        if (urlMatch?.[2]) {
            localStorage.setItem('selected_pariwisata_id', urlMatch[2]);
        } else if (urlMatch?.[1]) {
            // URL explicitly matched desa but NO pariwisata => clear pariwisata
            localStorage.removeItem('selected_pariwisata_id');
            currentPariwisataId = '';
        }

        if (currentDesaCode && currentDesaCode !== selectedDesa) {
            setSelectedDesa(currentDesaCode);
            fetchPariwisata(currentDesaCode, currentPariwisataId);
        } else if (
            currentPariwisataId &&
            currentPariwisataId !== selectedPariwisata
        ) {
            setSelectedPariwisata(currentPariwisataId);
        }
    }, [url, desaList.length]);

    const fetchPariwisata = (desaCode: string, preselectId?: string) => {
        setLoadingPariwisata(true);
        fetch(`/api/dashboard/desa/${desaCode}/pariwisata`)
            .then((res) => res.json())
            .then((data: Pariwisata[]) => {
                setPariwisataList(data);
                setLoadingPariwisata(false);

                if (
                    preselectId &&
                    data.some((p) => p.id.toString() === preselectId)
                ) {
                    setSelectedPariwisata(preselectId);
                } else if (!preselectId) {
                    setSelectedPariwisata('');
                }
            })
            .catch(() => setLoadingPariwisata(false));
    };

    const handleDesaChange = (code: string) => {
        setSelectedDesa(code);
        localStorage.setItem('selected_desa_code', code);

        setSelectedPariwisata('');
        localStorage.removeItem('selected_pariwisata_id');

        setPariwisataList([]);
        fetchPariwisata(code);

        router.visit(`/survey-assignments/${code}`);
    };

    const handlePariwisataChange = (id: string) => {
        setSelectedPariwisata(id);
        localStorage.setItem('selected_pariwisata_id', id);

        if (selectedDesa) {
            router.visit(
                `/survey-assignments/${selectedDesa}/pariwisata/${id}`,
            );
        }
    };

    return (
        <div className="flex w-full flex-col gap-4 border-b border-[#E5E7EB] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-end sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                    <div className="relative w-48 sm:w-56">
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
                                    <SelectItem
                                        key={desa.code}
                                        value={desa.code}
                                    >
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

                    <div className="relative w-48 sm:w-56">
                        <Select
                            value={selectedPariwisata}
                            onValueChange={handlePariwisataChange}
                            disabled={!selectedDesa || loadingPariwisata}
                        >
                            <SelectTrigger
                                className="w-full bg-[#F8FBFE] focus:ring-1 focus:ring-[#0066AE]"
                                aria-label="Pariwisata"
                            >
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <Map className="h-4 w-4 shrink-0 text-[#7C7C7C]" />
                                    {loadingPariwisata ? (
                                        <Loader2 className="h-4 w-4 animate-spin text-[#7C7C7C]" />
                                    ) : (
                                        <SelectValue placeholder="Pariwisata" />
                                    )}
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {pariwisataList.map((pariwisata) => (
                                    <SelectItem
                                        key={pariwisata.id}
                                        value={pariwisata.id.toString()}
                                    >
                                        {pariwisata.name}
                                    </SelectItem>
                                ))}
                                {pariwisataList.length === 0 &&
                                    !loadingPariwisata &&
                                    selectedDesa && (
                                        <div className="px-2 py-2 text-sm text-gray-500">
                                            Tidak ada pariwisata
                                        </div>
                                    )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}
