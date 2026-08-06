import { lazy, Suspense, useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = lazy(() => import('react-quill-new'));

export function RichTextField({
    label,
    value,
    onChange,
    placeholder,
    error,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
}) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
        ],
    };

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="block">
            <span className="mb-1 block text-sm font-bold text-[#303030]">
                {label}
            </span>
            <div className={`rich-text-editor ${error ? 'has-error' : ''}`}>
                {isMounted ? (
                    <Suspense
                        fallback={
                            <div className="h-32 rounded bg-gray-50 border border-gray-200" />
                        }
                    >
                        <ReactQuill
                            theme="snow"
                            value={value || ''}
                            onChange={onChange}
                            modules={modules}
                            placeholder={placeholder}
                            className="bg-white"
                        />
                    </Suspense>
                ) : (
                    <div className="h-32 rounded bg-gray-50 border border-gray-200" />
                )}
            </div>
            {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
        </div>
    );
}
