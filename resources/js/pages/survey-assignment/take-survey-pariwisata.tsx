import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    ChevronRight,
    CloudUpload,
    ClipboardList,
    Eye,
    FileText,
    MapPin,
    Save,
    Trash2,
    UserRound,
} from 'lucide-react';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { show as showAssignment } from '@/routes/survey-assignments';
import { store as storePariwisataSurveyDraft } from '@/routes/survey-assignments/pariwisata/take-survey';
import { destroy as destroyPariwisataSurveyDocument } from '@/routes/survey-assignments/pariwisata/take-survey/documents';

type SurveyOption = {
    id: number;
    score: number;
    level: string;
    label: string;
    description: string;
    sort_order: number;
};

type SurveyDocument = {
    id: number;
    file_name: string;
    file_url: string;
    mime_type: string | null;
    file_size: number | null;
    file_size_label: string;
};

type SurveyQuestion = {
    id: number;
    category_code: string | null;
    category_name: string | null;
    sub_category_code: string | null;
    sub_category_name: string | null;
    criteria_code: string | null;
    criteria_name: string | null;
    criteria_description: string | null;
    indicator_code: string;
    indicator_name: string;
    indicator_description: string | null;
    supporting_evidence: string | null;
    document_required: boolean;
    document_hint: string | null;
    sort_order: number;
    answer: {
        id: number;
        selected_option_id: number;
        score: number;
        notes: string | null;
        documents: SurveyDocument[];
    } | null;
    options: SurveyOption[];
};

type SurveySubCategory = {
    sub_category_code: string;
    sub_category_name: string;
    category_code: string | null;
    category_name: string | null;
    question_count: number;
    answered_count: number;
    questions: SurveyQuestion[];
};

type TakePariwisataSurveyProps = {
    assignment: {
        id: number;
        code: string;
        status: string;
        status_label: string;
        assigned_at: string;
        started_at: string;
        last_saved_at: string;
        village: {
            id: number | null;
            code: string | null;
            name: string;
            location: string;
        };
        assigned_by: {
            id: string | null;
            name: string;
            email: string | null;
        };
    };
    template: {
        id: number;
        title: string;
        description: string | null;
        status: string | null;
        published_at: string;
    } | null;
    sub_categories: SurveySubCategory[];
    summary: {
        total_sub_categories: number;
        total_questions: number;
        answered_questions: number;
        total_options: number;
    };
};

type SurveyDraftContextValue = {
    selectedOptions: Record<number, number>;
    notes: Record<number, string>;
    documents: Record<number, File[]>;
    dirtyQuestionIds: Set<number>;
    hasUnsavedChanges: boolean;
    selectOption: (questionId: number, optionId: number) => void;
    setNote: (questionId: number, note: string) => void;
    setQuestionFiles: (questionId: number, files: File[]) => void;
    removeQuestionFile: (questionId: number, file: File) => void;
    clearPendingFiles: () => void;
    clearSavedChanges: () => void;
};

const SurveyDraftContext = createContext<SurveyDraftContextValue | null>(null);

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function getInitialSelectedOptions(subCategories: SurveySubCategory[]) {
    return Object.fromEntries(
        subCategories
            .flatMap((subCategory) => subCategory.questions)
            .filter((question) => question.answer)
            .map((question) => [
                question.id,
                question.answer?.selected_option_id,
            ]),
    ) as Record<number, number>;
}

function getInitialNotes(subCategories: SurveySubCategory[]) {
    return Object.fromEntries(
        subCategories
            .flatMap((subCategory) => subCategory.questions)
            .filter((question) => question.answer?.notes)
            .map((question) => [question.id, question.answer?.notes ?? '']),
    ) as Record<number, string>;
}

function SurveyDraftProvider({
    initialSelectedOptions,
    initialNotes,
    children,
}: {
    initialSelectedOptions: Record<number, number>;
    initialNotes: Record<number, string>;
    children: React.ReactNode;
}) {
    const [selectedOptions, setSelectedOptions] = useState<
        Record<number, number>
    >(() => ({ ...initialSelectedOptions }));
    const [notes, setNotes] = useState<Record<number, string>>(() => ({
        ...initialNotes,
    }));
    const [documents, setDocuments] = useState<Record<number, File[]>>({});
    const [dirtyQuestionIds, setDirtyQuestionIds] = useState<Set<number>>(
        () => new Set(),
    );

    const hasUnsavedChanges = dirtyQuestionIds.size > 0;

    const selectOption = useCallback((questionId: number, optionId: number) => {
        setSelectedOptions((current) => ({
            ...current,
            [questionId]: optionId,
        }));
        setDirtyQuestionIds((current) => new Set(current).add(questionId));
    }, []);

    const setNote = useCallback((questionId: number, note: string) => {
        setNotes((current) => ({ ...current, [questionId]: note }));
        setDirtyQuestionIds((current) => new Set(current).add(questionId));
    }, []);

    const setQuestionFiles = useCallback(
        (questionId: number, files: File[]) => {
            if (files.length === 0) {
                return;
            }

            setDocuments((current) => ({
                ...current,
                [questionId]: [...(current[questionId] ?? []), ...files],
            }));

            setDirtyQuestionIds((current) => new Set(current).add(questionId));
        },
        [],
    );

    const removeQuestionFile = useCallback((questionId: number, file: File) => {
        setDocuments((current) => ({
            ...current,
            [questionId]: (current[questionId] ?? []).filter(
                (item) =>
                    item.name !== file.name ||
                    item.lastModified !== file.lastModified ||
                    item.size !== file.size,
            ),
        }));
        setDirtyQuestionIds((current) => new Set(current).add(questionId));
    }, []);

    const clearPendingFiles = useCallback(() => {
        setDocuments({});
    }, []);

    const clearSavedChanges = useCallback(() => {
        setDocuments({});
        setDirtyQuestionIds(new Set());
    }, []);

    return (
        <SurveyDraftContext.Provider
            value={{
                selectedOptions,
                notes,
                documents,
                dirtyQuestionIds,
                hasUnsavedChanges,
                selectOption,
                setNote,
                setQuestionFiles,
                removeQuestionFile,
                clearPendingFiles,
                clearSavedChanges,
            }}
        >
            {children}
        </SurveyDraftContext.Provider>
    );
}

function useSurveyDraft() {
    const context = useContext(SurveyDraftContext);

    if (!context) {
        throw new Error(
            'useSurveyDraft must be used within SurveyDraftProvider',
        );
    }

    return context;
}

function statusClass(status: string) {
    return (
        {
            assigned: 'bg-[#F1F5F8] text-[#0066AE]',
            in_progress: 'bg-[#EAF7FF] text-[#0066AE]',
            submitted: 'bg-[#EAF3FF] text-[#093967]',
            approved: 'bg-[#EAF8F0] text-[#00893D]',
            need_revision: 'bg-[#FFF4EA] text-[#C9681E]',
            rejected: 'bg-[#FDECEC] text-[#D81313]',
        }[status] ?? 'bg-[#F1F5F8] text-[#7C7C7C]'
    );
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center text-[#0066AE]">
                {icon}
            </span>
            <span className="min-w-0">
                <span className="block text-[11px] font-medium text-[#7C7C7C]">
                    {label}
                </span>
                <span className="block truncate text-sm font-semibold text-[#303030]">
                    {value}
                </span>
            </span>
        </div>
    );
}

function QuestionCard({
    question,
    questionNumber,
    selectedOptionId,
    note,
    files,
    onSelectOption,
    onNoteChange,
    onFilesChange,
    onPreviewFile,
    onRemoveFile,
    onDeleteDocument,
}: {
    question: SurveyQuestion;
    questionNumber: number;
    selectedOptionId?: number;
    note: string;
    files: File[];
    onSelectOption: (optionId: number) => void;
    onNoteChange: (note: string) => void;
    onFilesChange: (files: File[]) => void;
    onPreviewFile: (file: File) => void;
    onRemoveFile: (file: File) => void;
    onDeleteDocument: (document: SurveyDocument) => void;
}) {
    const localChanged =
        Boolean(selectedOptionId) &&
        selectedOptionId !== question.answer?.selected_option_id;
    const draftStatus = !selectedOptionId
        ? 'Belum diisi'
        : !question.answer
          ? 'Draft lokal'
          : localChanged ||
              files.length > 0 ||
              note !== (question.answer.notes ?? '')
            ? 'Diubah lokal'
            : 'Tersimpan database';

    return (
        <article className="rounded-2xl border border-[#EFEFEF] bg-white px-4 py-5 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#F1F5F8] px-2.5 py-1 text-xs font-semibold text-[#093967]">
                    {question.indicator_code}
                </span>
                <span
                    className={classNames(
                        'rounded-md px-2.5 py-1 text-xs font-bold',
                        draftStatus === 'Tersimpan database' &&
                            'bg-[#EAF8F0] text-[#00893D]',
                        draftStatus === 'Belum diisi' &&
                            'bg-[#F7F7F7] text-[#7C7C7C]',
                        draftStatus !== 'Tersimpan database' &&
                            draftStatus !== 'Belum diisi' &&
                            'bg-[#FFF4EA] text-[#C9681E]',
                    )}
                >
                    {draftStatus}
                </span>
            </div>

            <p className="mt-5 text-sm font-semibold text-[#0066AE]">
                Pertanyaan survey
            </p>
            <h2 className="mt-2 max-w-3xl text-2xl leading-tight font-bold text-[#303030] sm:text-[26px]">
                {questionNumber}. {question.indicator_name}
            </h2>
            {question.indicator_description && (
                <p className="mt-3 max-w-3xl text-sm leading-6 font-medium text-[#7C7C7C] sm:text-[15px]">
                    {question.indicator_description}
                </p>
            )}
            <div className="mt-3 grid gap-2 text-xs font-semibold text-[#7C7C7C] sm:grid-cols-2">
                <p className="rounded-lg bg-[#F8FBFF] px-3 py-2">
                    Kriteria: {question.criteria_code ?? '-'} ·{' '}
                    {question.criteria_name ?? '-'}
                </p>
                <p className="rounded-lg bg-[#F8FBFF] px-3 py-2">
                    Kategori: {question.category_name ?? '-'}
                </p>
            </div>

            <div className="mt-6 border-t border-[#EFEFEF] pt-5">
                <h3 className="text-base font-bold text-[#0066AE]">
                    Pilih skor
                </h3>
                <div className="mt-3 divide-y divide-[#EFEFEF]">
                    {question.options.map((option) => {
                        const selected = selectedOptionId === option.id;

                        return (
                            <label
                                key={option.id}
                                className={classNames(
                                    'flex cursor-pointer items-start gap-3 py-3 transition active:scale-[0.995]',
                                    selected && 'rounded-xl bg-[#F1F5F8] px-3',
                                )}
                            >
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={option.id}
                                    checked={selected}
                                    onChange={() => onSelectOption(option.id)}
                                    className="sr-only"
                                />
                                <span
                                    className={classNames(
                                        'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2',
                                        selected
                                            ? 'border-[#0066AE]'
                                            : 'border-[#D1D8E0]',
                                    )}
                                >
                                    {selected && (
                                        <span className="size-3 rounded-full bg-[#0066AE]" />
                                    )}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span
                                        className={classNames(
                                            'block text-sm leading-5 font-bold',
                                            selected
                                                ? 'text-[#0066AE]'
                                                : 'text-[#303030]',
                                        )}
                                    >
                                        {option.label}
                                    </span>
                                    <span className="mt-1 block text-xs leading-5 font-semibold text-[#7C7C7C]">
                                        {option.description}
                                    </span>
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 border-t border-[#EFEFEF] pt-5">
                <h3 className="text-base font-bold text-[#0066AE]">
                    Dokumen pendukung
                </h3>
                <p className="mt-1 text-xs font-medium text-[#7C7C7C]">
                    {question.document_hint ??
                        question.supporting_evidence ??
                        'Unggah bukti jika tersedia.'}
                </p>

                <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#F1F5F8] px-4 py-4 text-left transition hover:bg-[#EAF3FF] active:scale-[0.995]">
                    <CloudUpload
                        size={32}
                        strokeWidth={2.1}
                        className="shrink-0 text-[#0066AE]"
                    />
                    <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-[#0066AE]">
                            Unggah foto atau dokumen
                        </span>
                        <span className="block text-xs font-medium text-[#7C7C7C]">
                                            JPG, PNG, WEBP, atau PDF. Maksimal 50 MB per file.
                        </span>
                    </span>
                    <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        onChange={(event) =>
                            onFilesChange(Array.from(event.target.files ?? []))
                        }
                        className="sr-only"
                    />
                </label>

                <div className="mt-3 space-y-2">
                    {question.answer?.documents.map((document) => (
                        <div
                            key={document.id}
                            className="flex items-center gap-3 rounded-xl border border-[#EFEFEF] bg-white px-3 py-2 text-sm font-semibold text-[#303030]"
                        >
                            <FileText className="size-5 shrink-0 text-[#0066AE]" />
                            <span className="min-w-0 flex-1 truncate">
                                {document.file_name}
                            </span>
                            <span className="rounded-md bg-[#EAF8F0] px-2 py-1 text-xs font-bold text-[#00893D]">
                                Database
                            </span>
                            <button
                                type="button"
                                onClick={() =>
                                    window.open(
                                        document.file_url,
                                        '_blank',
                                        'noopener,noreferrer',
                                    )
                                }
                                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#EAF3FF]"
                            >
                                <Eye className="size-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => onDeleteDocument(document)}
                                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    ))}
                    {files.map((file) => (
                        <div
                            key={`${file.name}-${file.lastModified}`}
                            className="flex items-center gap-3 rounded-xl border border-[#AAD2F8] bg-[#F8FBFF] px-3 py-2 text-sm font-semibold text-[#303030]"
                        >
                            <FileText className="size-5 shrink-0 text-[#0066AE]" />
                            <span className="min-w-0 flex-1 truncate">
                                {file.name}
                            </span>
                            <span className="rounded-md bg-[#FFF4EA] px-2 py-1 text-xs font-bold text-[#C9681E]">
                                Draft lokal
                            </span>
                            <button
                                type="button"
                                onClick={() => onPreviewFile(file)}
                                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#EAF3FF]"
                            >
                                <Eye className="size-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => onRemoveFile(file)}
                                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 border-t border-[#EFEFEF] pt-5">
                <label className="text-base font-bold text-[#0066AE]">
                    Catatan survey
                </label>
                <textarea
                    value={note}
                    onChange={(event) => onNoteChange(event.target.value)}
                    className="mt-3 min-h-28 w-full rounded-xl border border-[#DDE4EC] bg-white px-4 py-3 text-sm font-semibold text-[#303030] transition outline-none focus:border-[#0066AE]"
                    placeholder="Tulis catatan lapangan untuk indikator ini..."
                />
            </div>
        </article>
    );
}

export default function TakeSurveyPariwisata({
    assignment,
    template,
    sub_categories,
    summary,
}: TakePariwisataSurveyProps) {
    const initialSelectedOptions = useMemo(
        () => getInitialSelectedOptions(sub_categories),
        [sub_categories],
    );
    const initialNotes = useMemo(
        () => getInitialNotes(sub_categories),
        [sub_categories],
    );

    return (
        <SurveyDraftProvider
            initialSelectedOptions={initialSelectedOptions}
            initialNotes={initialNotes}
        >
            <TakeSurveyPariwisataContent
                assignment={assignment}
                template={template}
                sub_categories={sub_categories}
                summary={summary}
            />
        </SurveyDraftProvider>
    );
}

function TakeSurveyPariwisataContent({
    assignment,
    template,
    sub_categories,
    summary,
}: TakePariwisataSurveyProps) {
    const [activeSubCategoryIndex, setActiveSubCategoryIndex] = useState(0);
    const [processing, setProcessing] = useState(false);
    const isSubmittingRef = useRef(false);
    const {
        selectedOptions,
        notes,
        documents,
        dirtyQuestionIds,
        hasUnsavedChanges,
        selectOption,
        setNote,
        setQuestionFiles,
        removeQuestionFile,
        clearSavedChanges,
    } = useSurveyDraft();

    const activeSubCategory = sub_categories[activeSubCategoryIndex] ?? null;
    const hasSubCategories = sub_categories.length > 0;
    const progress = hasSubCategories
        ? Math.round(
              ((activeSubCategoryIndex + 1) / sub_categories.length) * 100,
          )
        : 0;
    const currentStartNumber = useMemo(
        () =>
            sub_categories
                .slice(0, activeSubCategoryIndex)
                .reduce(
                    (total, subCategory) =>
                        total + subCategory.questions.length,
                    0,
                ),
        [activeSubCategoryIndex, sub_categories],
    );

    useEffect(() => {
        if (!hasUnsavedChanges) {
            return;
        }

        const warnBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isSubmittingRef.current) {
                return;
            }

            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', warnBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', warnBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    function previousSubCategory() {
        setActiveSubCategoryIndex((current) => Math.max(current - 1, 0));
    }

    function nextSubCategory() {
        setActiveSubCategoryIndex((current) =>
            Math.min(current + 1, sub_categories.length - 1),
        );
    }

    function previewFile(file: File) {
        const url = URL.createObjectURL(file);

        window.open(url, '_blank', 'noopener,noreferrer');
        window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    }

    function deleteStoredDocument(document: SurveyDocument) {
        router.delete(
            destroyPariwisataSurveyDocument.url({
                assignment: assignment.code,
                document: document.id,
            }),
            { preserveScroll: true },
        );
    }

    function submitDraft() {
        const selectedQuestionIds = Array.from(dirtyQuestionIds).filter(
            (questionId) => selectedOptions[questionId],
        );

        if (selectedQuestionIds.length === 0) {
            return;
        }

        const formData = new FormData();

        selectedQuestionIds.forEach((questionId, index) => {
            formData.append(
                `answers[${index}][question_id]`,
                String(questionId),
            );
            formData.append(
                `answers[${index}][pariwisata_suvey_option_id]`,
                String(selectedOptions[questionId]),
            );
            formData.append(
                `answers[${index}][notes]`,
                notes[questionId] ?? '',
            );

            (documents[questionId] ?? []).forEach((file) => {
                formData.append(`answers[${index}][documents][]`, file);
            });
        });

        setProcessing(true);
        isSubmittingRef.current = true;

        router.post(
            storePariwisataSurveyDraft.url({
                assignment: assignment.code,
            }),
            formData,
            {
                forceFormData: true,
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    isSubmittingRef.current = false;
                },
                onSuccess: clearSavedChanges,
            },
        );
    }

    return (
        <>
            <Head title={`Survey Pariwisata - ${assignment.village.name}`} />

            <div className="min-h-[100dvh] bg-[#F7F7F7] font-sans text-[#303030]">
                <header className="fixed inset-x-0 top-0 z-50 border-b border-[#EFEFEF] bg-white/95 shadow-[0_8px_24px_rgba(9,57,103,0.08)] backdrop-blur-md lg:left-[232px]">
                    <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-4 sm:px-6">
                        <div className="flex min-w-0 items-center gap-3">
                            <Link
                                href={showAssignment.url(assignment.code)}
                                aria-label="Kembali"
                                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-95"
                            >
                                <ArrowLeft size={23} strokeWidth={2.2} />
                            </Link>
                            <div className="min-w-0">
                                <h1 className="truncate text-xl leading-tight font-bold text-[#303030]">
                                    Isi Survey Pariwisata
                                </h1>
                                <p className="truncate text-sm font-medium text-[#7C7C7C]">
                                    {template?.title ??
                                        'Template belum tersedia'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-[#0066AE]">
                            <span
                                className={classNames(
                                    'hidden rounded-full px-3 py-1.5 text-xs font-bold sm:inline-flex',
                                    hasUnsavedChanges
                                        ? 'bg-[#FFF4EA] text-[#C9681E]'
                                        : 'bg-[#EAF8F0] text-[#00893D]',
                                )}
                            >
                                {hasUnsavedChanges
                                    ? 'Ada perubahan belum disimpan'
                                    : 'Semua perubahan tersimpan'}
                            </span>
                            <button
                                type="button"
                                aria-label="Simpan"
                                disabled={processing}
                                onClick={submitDraft}
                                className="flex size-9 items-center justify-center rounded-lg transition hover:bg-[#F1F5F8] active:scale-95 disabled:opacity-50"
                            >
                                <Save size={22} strokeWidth={2.1} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-4xl px-4 pt-24 pb-6 sm:px-6 sm:pt-24">
                    <nav className="mb-4 flex items-center gap-2 text-sm font-semibold">
                        <Link
                            href={showAssignment.url(assignment.code)}
                            className="text-[#0066AE]"
                        >
                            Assignment
                        </Link>
                        <ChevronRight
                            size={16}
                            strokeWidth={2.4}
                            className="text-[#B0B0B0]"
                        />
                        <span className="text-[#303030]">
                            {activeSubCategory?.sub_category_code ?? 'Survey'}
                        </span>
                    </nav>

                    <section className="rounded-t-3xl bg-white px-4 pt-5 pb-4 sm:px-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex min-w-0 gap-3">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1F5F8] text-[#0066AE]">
                                    <Building2 size={26} strokeWidth={2.1} />
                                </span>
                                <div className="min-w-0">
                                    <h2 className="truncate text-lg leading-tight font-bold text-[#303030] sm:text-xl">
                                        Survey Pariwisata Desa
                                    </h2>
                                    <p className="mt-1 text-sm font-medium text-[#7C7C7C]">
                                        {assignment.village.name} ·{' '}
                                        {assignment.village.location}
                                    </p>
                                </div>
                            </div>

                            <span
                                className={classNames(
                                    'inline-flex h-8 w-fit items-center gap-2 rounded-full px-3 text-sm font-bold',
                                    statusClass(assignment.status),
                                )}
                            >
                                <span className="size-2.5 rounded-full bg-current" />
                                {assignment.status_label}
                            </span>
                        </div>

                        <div className="mt-5 grid gap-3 border-t border-[#EFEFEF] pt-4 sm:grid-cols-3">
                            <InfoRow
                                icon={
                                    <ClipboardList
                                        size={20}
                                        strokeWidth={2.1}
                                    />
                                }
                                label="Kode Assignment"
                                value={assignment.code}
                            />
                            <InfoRow
                                icon={<UserRound size={20} strokeWidth={2.1} />}
                                label="Enumerator"
                                value={assignment.assigned_by.name}
                            />
                            <InfoRow
                                icon={<MapPin size={20} strokeWidth={2.1} />}
                                label="Lokasi"
                                value={assignment.village.location}
                            />
                        </div>
                    </section>

                    <section className="bg-white px-4 pb-5 sm:px-6">
                        <div className="flex flex-col gap-3 border-t border-[#EFEFEF] pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-bold text-[#303030]">
                                    Sub kategori{' '}
                                    {hasSubCategories
                                        ? activeSubCategoryIndex + 1
                                        : 0}{' '}
                                    dari {summary.total_sub_categories}
                                </p>
                                <p className="mt-0.5 text-xs font-medium text-[#7C7C7C]">
                                    {summary.answered_questions} /{' '}
                                    {summary.total_questions} pertanyaan
                                    tersimpan
                                </p>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F5F8] sm:w-72">
                                <div
                                    className="h-full rounded-full bg-[#0066AE]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white px-4 pb-5 sm:px-6">
                        <div className="border-t border-[#EFEFEF] pt-5">
                            <h2 className="text-base font-bold text-[#0066AE]">
                                Sub Kategori Survey
                            </h2>
                            <p className="mt-1 text-xs font-medium text-[#7C7C7C]">
                                Satu halaman menampilkan pertanyaan dengan
                                sub_category_code yang sama.
                            </p>
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                                {sub_categories.map((subCategory, index) => (
                                    <button
                                        key={subCategory.sub_category_code}
                                        type="button"
                                        onClick={() =>
                                            setActiveSubCategoryIndex(index)
                                        }
                                        className={classNames(
                                            'h-9 shrink-0 rounded-lg px-3 text-xs font-bold transition active:scale-[0.98]',
                                            index === activeSubCategoryIndex
                                                ? 'bg-[#0066AE] text-white'
                                                : 'bg-[#F1F5F8] text-[#0066AE]',
                                        )}
                                    >
                                        {subCategory.sub_category_code} ·{' '}
                                        {subCategory.answered_count}/
                                        {subCategory.question_count}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4 bg-white px-4 pb-5 sm:px-6">
                        {activeSubCategory?.questions.map((question, index) => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                questionNumber={currentStartNumber + index + 1}
                                selectedOptionId={selectedOptions[question.id]}
                                note={notes[question.id] ?? ''}
                                files={documents[question.id] ?? []}
                                onSelectOption={(optionId) =>
                                    selectOption(question.id, optionId)
                                }
                                onNoteChange={(value) =>
                                    setNote(question.id, value)
                                }
                                onFilesChange={(files) =>
                                    setQuestionFiles(question.id, files)
                                }
                                onPreviewFile={previewFile}
                                onRemoveFile={(file) =>
                                    removeQuestionFile(question.id, file)
                                }
                                onDeleteDocument={deleteStoredDocument}
                            />
                        ))}

                        {!activeSubCategory && (
                            <div className="rounded-2xl border border-dashed border-[#AAD2F8] bg-[#F8FBFF] px-6 py-12 text-center">
                                <FileText className="mx-auto size-12 text-[#0066AE]" />
                                <h2 className="mt-4 text-lg font-bold text-[#303030]">
                                    Template survey pariwisata belum memiliki
                                    pertanyaan
                                </h2>
                                <p className="mt-1 text-sm font-medium text-[#7C7C7C]">
                                    Jalankan seeder atau publish template
                                    pariwisata terlebih dahulu.
                                </p>
                            </div>
                        )}
                    </section>

                    <section className="rounded-b-3xl bg-white px-4 pb-5 sm:px-6">
                        <div className="border-t border-[#EFEFEF] pt-5">
                            <h2 className="text-base font-bold text-[#0066AE]">
                                Informasi survey
                            </h2>
                            <div className="mt-3 grid gap-2.5 text-sm">
                                {[
                                    ['Template', template?.title ?? '-'],
                                    [
                                        'Status template',
                                        template?.status ?? '-',
                                    ],
                                    [
                                        'Published at',
                                        template?.published_at ?? '-',
                                    ],
                                    ['Assigned at', assignment.assigned_at],
                                    ['Last saved at', assignment.last_saved_at],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="grid grid-cols-[28px_1fr_auto] items-center gap-2.5"
                                    >
                                        <span className="flex size-7 items-center justify-center text-[#0066AE]">
                                            <FileText
                                                size={20}
                                                strokeWidth={2.1}
                                            />
                                        </span>
                                        <span className="font-medium text-[#7C7C7C]">
                                            {label}
                                        </span>
                                        <span className="text-right font-semibold text-[#303030]">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <footer className="mt-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
                        <button
                            type="button"
                            disabled={
                                !hasSubCategories ||
                                activeSubCategoryIndex === 0
                            }
                            onClick={previousSubCategory}
                            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            <ArrowLeft size={20} strokeWidth={2.2} />
                            Sebelumnya
                        </button>

                        <button
                            type="button"
                            disabled={processing}
                            onClick={submitDraft}
                            className="h-11 rounded-xl px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Draft'}
                        </button>

                        <button
                            type="button"
                            disabled={
                                !hasSubCategories ||
                                activeSubCategoryIndex ===
                                    sub_categories.length - 1
                            }
                            onClick={nextSubCategory}
                            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.16)] transition hover:bg-[#093967] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Berikutnya
                            <ChevronRight size={20} strokeWidth={2.2} />
                        </button>
                    </footer>
                </main>
            </div>
        </>
    );
}
