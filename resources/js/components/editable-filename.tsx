import { useForm, usePage } from '@inertiajs/react';
import { Check, Edit2, Loader2, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function EditableFileName({
    fileName,
    updateUrl,
    className,
}: {
    fileName: string;
    updateUrl: string;
    className?: string;
}) {
    const { auth } = usePage().props as unknown as {
        auth: { user: { role: string } | null };
    };
    const isAdmin = auth.user?.role === 'admin';

    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data, setData, patch, processing, errors, reset, clearErrors } =
        useForm({
            file_name: fileName,
        });

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            // Select text before extension
            const lastDotIndex = data.file_name.lastIndexOf('.');
            if (lastDotIndex > 0) {
                inputRef.current.setSelectionRange(0, lastDotIndex);
            } else {
                inputRef.current.select();
            }
        }
    }, [isEditing]);

    const handleSave = () => {
        if (!data.file_name.trim() || data.file_name === fileName) {
            setIsEditing(false);
            reset();
            clearErrors();
            return;
        }

        patch(updateUrl, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setIsEditing(false);
                clearErrors();
            },
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
        clearErrors();
    };

    if (!isAdmin) {
        return <p className={`${className || ''} truncate`}>{fileName}</p>;
    }

    if (isEditing) {
        return (
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                    <input
                        ref={inputRef}
                        type="text"
                        value={data.file_name}
                        onChange={(e) => setData('file_name', e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') handleCancel();
                        }}
                        disabled={processing}
                        className="h-6 w-full rounded border border-[#0066AE] px-1.5 py-0 text-xs font-bold text-[#303030] ring-0 outline-none focus:border-[#0066AE] focus:ring-1 focus:ring-[#0066AE]"
                    />
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={processing}
                        className="flex size-6 shrink-0 items-center justify-center rounded bg-[#EAF8F0] text-[#00893D] hover:bg-[#D5F1E1] disabled:opacity-50"
                        aria-label="Simpan nama file"
                    >
                        {processing ? (
                            <Loader2 size={12} className="animate-spin" />
                        ) : (
                            <Check size={12} strokeWidth={3} />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={processing}
                        className="flex size-6 shrink-0 items-center justify-center rounded bg-[#FDECEC] text-[#D81313] hover:bg-[#FAD9D9] disabled:opacity-50"
                        aria-label="Batal ubah nama file"
                    >
                        <X size={12} strokeWidth={3} />
                    </button>
                </div>
                {errors.file_name && (
                    <p className="text-[10px] text-red-500">
                        {errors.file_name}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="group flex items-center gap-1.5">
            <p className={`${className || ''} truncate`}>{fileName}</p>
            <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex size-5 shrink-0 items-center justify-center rounded text-[#7C7C7C] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100 hover:text-[#0066AE]"
                aria-label="Ubah nama file"
            >
                <Edit2 size={12} />
            </button>
        </div>
    );
}
