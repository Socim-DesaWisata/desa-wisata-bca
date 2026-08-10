import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

export interface WorkerTypeForm {
    id?: number;
    type: 'full-time' | 'part-time';
    amount: number;
}

export interface WorkerGenderForm {
    id?: number;
    gender: 'male' | 'female' | 'unspecified';
    amount: number;
}

export interface WorkerAgeForm {
    id?: number;
    age_min?: number;
    age_max?: number;
    amount: number;
}

export interface WorkerEducationForm {
    id?: number;
    education:
        | 'tidak_bersekolah'
        | 'sd'
        | 'smp'
        | 'sma'
        | 'd3'
        | 's1/d4'
        | 's2'
        | 's3'
        | string;
    amount: number;
}

interface IndependentPersonnelStatsProps {
    totalPersonnel: number;
    workerTypes: WorkerTypeForm[];
    workerGenders: WorkerGenderForm[];
    workerAges: WorkerAgeForm[];
    workerEducations: WorkerEducationForm[];
    onTotalChange: (val: number) => void;
    onWorkerTypesChange: (types: WorkerTypeForm[]) => void;
    onWorkerGendersChange: (genders: WorkerGenderForm[]) => void;
    onWorkerAgesChange: (ages: WorkerAgeForm[]) => void;
    onWorkerEducationsChange: (educations: WorkerEducationForm[]) => void;
    errors?: Partial<Record<string, string>>;
}

export default function IndependentPersonnelStats({
    totalPersonnel,
    workerTypes,
    workerGenders,
    workerAges,
    workerEducations,
    onTotalChange,
    onWorkerTypesChange,
    onWorkerGendersChange,
    onWorkerAgesChange,
    onWorkerEducationsChange,
    errors = {},
}: IndependentPersonnelStatsProps) {
    const sumTypes = workerTypes.reduce(
        (acc, curr) => acc + (curr.amount || 0),
        0,
    );
    const sumGenders = workerGenders.reduce(
        (acc, curr) => acc + (curr.amount || 0),
        0,
    );
    const sumAges = workerAges.reduce(
        (acc, curr) => acc + (curr.amount || 0),
        0,
    );
    const sumEducations = workerEducations.reduce(
        (acc, curr) => acc + (curr.amount || 0),
        0,
    );

    const typeOptions = [
        { value: 'full-time', label: 'Penuh Waktu' },
        { value: 'part-time', label: 'Paruh Waktu' },
    ];
    const genderOptions = [
        { value: 'male', label: 'Laki-laki' },
        { value: 'female', label: 'Perempuan' },
        { value: 'unspecified', label: 'Belum Ditentukan' },
    ];
    const educationOptions = [
        { value: 'tidak_bersekolah', label: 'Tidak Bersekolah' },
        { value: 'sd', label: 'SD' },
        { value: 'smp', label: 'SMP' },
        { value: 'sma', label: 'SMA' },
        { value: 'd3', label: 'D3' },
        { value: 's1/d4', label: 'S1/D4' },
        { value: 's2', label: 'S2' },
        { value: 's3', label: 'S3' },
    ];

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Label className="text-base font-semibold">
                    Jumlah Total Tenaga Kerja & Pengurus
                </Label>
                <p className="mb-2 text-sm text-gray-500">
                    Total ini menjadi acuan untuk setiap pembagian kategori di
                    bawah.
                </p>
                <Input
                    type="number"
                    min="0"
                    value={totalPersonnel}
                    onChange={(e) =>
                        onTotalChange(parseInt(e.target.value) || 0)
                    }
                    className="w-full md:w-1/3"
                />
                {errors.total_personnel && (
                    <p className="text-sm text-red-500">
                        {errors.total_personnel}
                    </p>
                )}
            </div>

            {/* Tipe Pekerja */}
            <CategorySection
                title="Tipe Pekerja"
                items={workerTypes}
                sum={sumTypes}
                total={totalPersonnel}
                onAdd={() =>
                    onWorkerTypesChange([
                        ...workerTypes,
                        { type: 'full-time', amount: 0 },
                    ])
                }
                onUpdate={(idx, val) => {
                    const newItems = [...workerTypes];
                    newItems[idx] = val;
                    onWorkerTypesChange(newItems);
                }}
                onRemove={(idx) =>
                    onWorkerTypesChange(workerTypes.filter((_, i) => i !== idx))
                }
                renderItem={(item, idx, update) => (
                    <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-end">
                        <div className="w-full flex-1 space-y-1">
                            <Label>Tipe</Label>
                            <Select
                                value={item.type}
                                onValueChange={(val: any) =>
                                    update(idx, { ...item, type: val })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    {typeOptions.map((opt) => (
                                        <SelectItem
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full flex-1 space-y-1">
                            <Label>Jumlah</Label>
                            <Input
                                type="number"
                                min="0"
                                value={item.amount || ''}
                                onChange={(e) =>
                                    update(idx, {
                                        ...item,
                                        amount: parseInt(e.target.value) || 0,
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
            />

            {/* Gender */}
            <CategorySection
                title="Gender"
                items={workerGenders}
                sum={sumGenders}
                total={totalPersonnel}
                onAdd={() =>
                    onWorkerGendersChange([
                        ...workerGenders,
                        { gender: 'male', amount: 0 },
                    ])
                }
                onUpdate={(idx, val) => {
                    const newItems = [...workerGenders];
                    newItems[idx] = val;
                    onWorkerGendersChange(newItems);
                }}
                onRemove={(idx) =>
                    onWorkerGendersChange(
                        workerGenders.filter((_, i) => i !== idx),
                    )
                }
                renderItem={(item, idx, update) => (
                    <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-end">
                        <div className="w-full flex-1 space-y-1">
                            <Label>Gender</Label>
                            <Select
                                value={item.gender}
                                onValueChange={(val: any) =>
                                    update(idx, { ...item, gender: val })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genderOptions.map((opt) => (
                                        <SelectItem
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full flex-1 space-y-1">
                            <Label>Jumlah</Label>
                            <Input
                                type="number"
                                min="0"
                                value={item.amount || ''}
                                onChange={(e) =>
                                    update(idx, {
                                        ...item,
                                        amount: parseInt(e.target.value) || 0,
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
            />

            {/* Rentang Umur */}
            <CategorySection
                title="Rentang Umur"
                items={workerAges}
                sum={sumAges}
                total={totalPersonnel}
                onAdd={() => onWorkerAgesChange([...workerAges, { amount: 0 }])}
                onUpdate={(idx, val) => {
                    const newItems = [...workerAges];
                    newItems[idx] = val;
                    onWorkerAgesChange(newItems);
                }}
                onRemove={(idx) =>
                    onWorkerAgesChange(workerAges.filter((_, i) => i !== idx))
                }
                renderItem={(item, idx, update) => (
                    <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-end">
                        <div className="w-full flex-1 space-y-1">
                            <Label>Umur Min</Label>
                            <Input
                                type="number"
                                min="0"
                                value={item.age_min ?? ''}
                                onChange={(e) =>
                                    update(idx, {
                                        ...item,
                                        age_min: e.target.value
                                            ? parseInt(e.target.value)
                                            : undefined,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full flex-1 space-y-1">
                            <Label>Umur Max</Label>
                            <Input
                                type="number"
                                min="0"
                                value={item.age_max ?? ''}
                                onChange={(e) =>
                                    update(idx, {
                                        ...item,
                                        age_max: e.target.value
                                            ? parseInt(e.target.value)
                                            : undefined,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full flex-1 space-y-1">
                            <Label>Jumlah</Label>
                            <Input
                                type="number"
                                min="0"
                                value={item.amount || ''}
                                onChange={(e) =>
                                    update(idx, {
                                        ...item,
                                        amount: parseInt(e.target.value) || 0,
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
            />

            {/* Pendidikan */}
            <CategorySection
                title="Pendidikan Pengurus"
                items={workerEducations}
                sum={sumEducations}
                total={totalPersonnel}
                onAdd={() =>
                    onWorkerEducationsChange([
                        ...workerEducations,
                        { education: 'sma', amount: 0 },
                    ])
                }
                onUpdate={(idx, val) => {
                    const newItems = [...workerEducations];
                    newItems[idx] = val;
                    onWorkerEducationsChange(newItems);
                }}
                onRemove={(idx) =>
                    onWorkerEducationsChange(
                        workerEducations.filter((_, i) => i !== idx),
                    )
                }
                renderItem={(item, idx, update) => (
                    <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-end">
                        <div className="w-full flex-1 space-y-1">
                            <Label>Pendidikan</Label>
                            <Select
                                value={item.education}
                                onValueChange={(val: any) =>
                                    update(idx, { ...item, education: val })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Pendidikan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {educationOptions.map((opt) => (
                                        <SelectItem
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full flex-1 space-y-1">
                            <Label>Jumlah</Label>
                            <Input
                                type="number"
                                min="0"
                                value={item.amount || ''}
                                onChange={(e) =>
                                    update(idx, {
                                        ...item,
                                        amount: parseInt(e.target.value) || 0,
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

function CategorySection({
    title,
    items,
    sum,
    total,
    onAdd,
    onUpdate,
    onRemove,
    renderItem,
}: {
    title: string;
    items: any[];
    sum: number;
    total: number;
    onAdd: () => void;
    onUpdate: (idx: number, val: any) => void;
    onRemove: (idx: number) => void;
    renderItem: (
        item: any,
        idx: number,
        update: (idx: number, val: any) => void,
    ) => React.ReactNode;
}) {
    const isExceeded = sum > total;

    return (
        <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/50 p-6 shadow-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {title}
                    </h3>
                    <p
                        className={`text-sm ${isExceeded ? 'font-medium text-red-500' : 'text-gray-500'}`}
                    >
                        Total Terbagi: {sum} / {total}
                    </p>
                </div>
                <Button type="button" variant="outline" onClick={onAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Data
                </Button>
            </div>

            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="relative flex items-end gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                >
                    {renderItem(item, idx, onUpdate)}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mb-0.5 shrink-0 text-red-500 hover:bg-red-50 hover:text-red-700"
                        onClick={() => onRemove(idx)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}

            {isExceeded && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <p>
                        Total pembagian {title} ({sum}) melebihi Jumlah Total (
                        {total}).
                    </p>
                </div>
            )}
        </div>
    );
}
