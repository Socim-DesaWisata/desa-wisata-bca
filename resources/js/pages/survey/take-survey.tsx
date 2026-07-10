import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    CloudUpload,
    ChevronRight,
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
import { store as storeSurveyDraft } from '@/routes/survey-assignments/take-survey';
import { destroy as destroySurveyDocument } from '@/routes/survey-assignments/take-survey/documents';

const MAX_UPLOAD_FILE_SIZE_MB = 50;
const MAX_UPLOAD_FILE_SIZE_BYTES = MAX_UPLOAD_FILE_SIZE_MB * 1024 * 1024;

type SurveyOption = {
    id: number;
    score: number;
    label: string;
    sort_order: number;
};

type SurveyQuestion = {
    id: number;
    code: string | null;
    question_text: string;
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

type SurveyDocument = {
    id: number;
    file_name: string;
    file_url: string;
    mime_type: string | null;
    file_size: number | null;
};

type SurveyAspect = {
    name: string;
    questions: SurveyQuestion[];
};

type TakeSurveyProps = {
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
            id: number | null;
            name: string;
            email: string | null;
        };
    };
    template: {
        id: number | null;
        title: string;
        description: string | null;
        status: string | null;
        published_at: string;
    };
    aspects: SurveyAspect[];
    summary: {
        total_aspects: number;
        total_questions: number;
        total_options: number;
    };
};

const colors = {
    background: '#F7F7F7',
};

type SurveyDraftContextValue = {
    selectedOptions: Record<number, number>;
    documents: Record<number, File[]>;
    notes: Record<number, string>;
    dirtyQuestionIds: Set<number>;
    hasUnsavedChanges: boolean;
    selectOption: (questionId: number, optionId: number) => void;
    setQuestionFiles: (questionId: number, files: File[]) => void;
    updateQuestionNotes: (questionId: number, notes: string) => void;
    removeQuestionFile: (questionId: number, file: File) => void;
    clearPendingFiles: () => void;
    clearSavedChanges: () => void;
};

type QuestionDraftStatus = {
    label: string;
    description: string;
    className: string;
};

const SurveyDraftContext = createContext<SurveyDraftContextValue | null>(null);

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function fileSizeLabel(bytes: number) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getInitialSelectedOptions(aspects: SurveyAspect[]) {
    return Object.fromEntries(
        aspects
            .flatMap((aspect) => aspect.questions)
            .filter((question) => question.answer)
            .map((question) => [
                question.id,
                question.answer?.selected_option_id,
            ]),
    ) as Record<number, number>;
}

function getInitialNotes(aspects: SurveyAspect[]) {
    return Object.fromEntries(
        aspects
            .flatMap((aspect) => aspect.questions)
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
    const [documents, setDocuments] = useState<Record<number, File[]>>({});
    const [notes, setNotes] = useState<Record<number, string>>(() => ({
        ...initialNotes,
    }));
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

    const updateQuestionNotes = useCallback(
        (questionId: number, value: string) => {
            setNotes((current) => ({
                ...current,
                [questionId]: value,
            }));
            setDirtyQuestionIds((current) => new Set(current).add(questionId));
        },
        [],
    );

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
                documents,
                notes,
                dirtyQuestionIds,
                hasUnsavedChanges,
                selectOption,
                setQuestionFiles,
                updateQuestionNotes,
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

function SectionTitle({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div>
            <h2 className="text-base font-bold text-[#0066AE]">{title}</h2>
            {subtitle && (
                <p className="mt-1 text-xs font-medium text-[#7C7C7C]">
                    {subtitle}
                </p>
            )}
        </div>
    );
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

function getQuestionDraftStatus(
    question: SurveyQuestion,
    selectedOptionId: number | undefined,
    localFilesCount: number,
    noteValue: string,
): QuestionDraftStatus {
    if (!selectedOptionId && localFilesCount === 0) {
        return {
            label: 'Belum diisi',
            description: 'Belum ada jawaban',
            className: 'bg-[#F7F7F7] text-[#7C7C7C]',
        };
    }

    if (!question.answer) {
        return {
            label: 'Draft lokal',
            description: 'Aktif di halaman ini, belum masuk database',
            className: 'bg-[#FFF4EA] text-[#C9681E]',
        };
    }

    if (selectedOptionId !== question.answer.selected_option_id) {
        return {
            label: 'Diubah lokal',
            description: 'Berbeda dari jawaban database, belum disimpan',
            className: 'bg-[#FDECEC] text-[#D81313]',
        };
    }

    if ((question.answer?.notes ?? '') !== noteValue) {
        return {
            label: 'Diubah lokal',
            description: 'Catatan berbeda dari data database, belum disimpan',
            className: 'bg-[#FDECEC] text-[#D81313]',
        };
    }

    if (localFilesCount > 0) {
        return {
            label: 'Ada draft lokal',
            description: 'Ada dokumen baru di halaman ini, belum disimpan',
            className: 'bg-[#FFF4EA] text-[#C9681E]',
        };
    }

    return {
        label: 'Tersimpan database',
        description: 'Jawaban sudah tersimpan di database',
        className: 'bg-[#EAF8F0] text-[#00893D]',
    };
}

function QuestionCard({
    aspect,
    question,
    selectedOptionId,
    files,
    onSelectOption,
    onFilesChange,
    onPreviewFile,
    onRemoveFile,
    onDeleteDocument,
    noteValue,
    onNotesChange,
}: {
    aspect: string;
    question: SurveyQuestion;
    selectedOptionId?: number;
    files: File[];
    onSelectOption: (optionId: number) => void;
    onFilesChange: (files: File[]) => void;
    onPreviewFile: (file: File) => void;
    onRemoveFile: (file: File) => void;
    onDeleteDocument: (document: SurveyDocument) => void;
    noteValue: string;
    onNotesChange: (value: string) => void;
}) {
    const [fileError, setFileError] = useState('');
    const hasDocuments =
        (question.answer?.documents.length ?? 0) > 0 || files.length > 0;
    const draftStatus = getQuestionDraftStatus(
        question,
        selectedOptionId,
        files.length,
        noteValue,
    );

    function handleFilesChange(fileList: FileList | null) {
        const selectedFiles = Array.from(fileList ?? []);

        if (selectedFiles.length === 0) {
            return;
        }

        const oversizedFiles = selectedFiles.filter(
            (file) => file.size > MAX_UPLOAD_FILE_SIZE_BYTES,
        );
        const acceptedFiles = selectedFiles.filter(
            (file) => file.size <= MAX_UPLOAD_FILE_SIZE_BYTES,
        );

        if (oversizedFiles.length > 0) {
            setFileError(
                `File ${oversizedFiles
                    .map((file) => `${file.name} (${fileSizeLabel(file.size)})`)
                    .join(
                        ', ',
                    )} melebihi batas ${MAX_UPLOAD_FILE_SIZE_MB} MB per file.`,
            );
        } else {
            setFileError('');
        }

        if (acceptedFiles.length > 0) {
            onFilesChange(acceptedFiles);
        }
    }

    return (
        <article className="rounded-2xl border border-[#EFEFEF] bg-white px-4 py-5 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#F1F5F8] px-2.5 py-1 text-xs font-bold text-[#0066AE]">
                    {aspect}
                </span>
                <span
                    className={classNames(
                        'rounded-md px-2.5 py-1 text-xs font-bold',
                        draftStatus.className,
                    )}
                    title={draftStatus.description}
                >
                    {draftStatus.label}
                </span>
            </div>

            <p className="mt-5 text-sm font-semibold text-[#0066AE]">
                Pertanyaan survey
            </p>
            <h2 className="mt-2 max-w-3xl text-lg leading-tight font-bold text-[#303030] sm:text-xl">
                {question.question_text}
            </h2>
            {question.document_hint && (
                <p className="mt-2 max-w-2xl text-[13px] leading-5 font-medium text-[#7C7C7C] sm:text-sm sm:leading-6">
                    {question.document_hint}
                </p>
            )}
            <p
                className={classNames(
                    'mt-3 inline-flex rounded-lg px-3 py-2 text-xs font-semibold',
                    draftStatus.className,
                )}
            >
                {draftStatus.description}
            </p>

            <div className="mt-6 border-t border-[#EFEFEF] pt-5">
                <SectionTitle
                    title="Pilih skor"
                    subtitle="Pilih satu nilai yang paling sesuai kondisi lapangan."
                />

                <div className="mt-3 divide-y divide-[#EFEFEF]">
                    {question.options.map((option) => {
                        const selected = selectedOptionId === option.id;
                        const isDatabaseAnswer =
                            question.answer?.selected_option_id === option.id;

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
                                    aria-hidden="true"
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
                                        {option.score} - {option.label}
                                    </span>
                                    {selected && (
                                        <span
                                            className={classNames(
                                                'mt-1 inline-flex rounded-md px-2 py-0.5 text-[11px] font-bold',
                                                isDatabaseAnswer
                                                    ? 'bg-[#EAF8F0] text-[#00893D]'
                                                    : question.answer
                                                      ? 'bg-[#FDECEC] text-[#D81313]'
                                                      : 'bg-[#FFF4EA] text-[#C9681E]',
                                            )}
                                        >
                                            {isDatabaseAnswer
                                                ? 'Jawaban database'
                                                : question.answer
                                                  ? 'Perubahan lokal'
                                                  : 'Draft lokal'}
                                        </span>
                                    )}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 border-t border-[#EFEFEF] pt-5">
                <SectionTitle
                    title="Catatan"
                    subtitle="Tambahkan catatan singkat untuk konteks jawaban bila diperlukan."
                />
                <textarea
                    value={noteValue}
                    onChange={(event) => onNotesChange(event.target.value)}
                    rows={4}
                    placeholder="Tulis catatan jawaban di sini"
                    className="mt-3 w-full rounded-2xl border border-[#DDE4EC] bg-white px-4 py-3 text-sm font-medium text-[#303030] transition outline-none placeholder:text-[#A0A0A0] focus:border-[#0066AE]"
                />
            </div>

            <div className="mt-6 border-t border-[#EFEFEF] pt-5">
                <SectionTitle
                    title="Dokumen pendukung"
                    subtitle="Unggah foto atau dokumen pendukung setelah memilih opsi jawaban."
                />

                <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#F1F5F8] px-4 py-4 text-left transition hover:bg-[#EAF3FF] active:scale-[0.995]">
                    <CloudUpload
                        size={32}
                        strokeWidth={2.1}
                        className="shrink-0 text-[#0066AE]"
                    />
                    <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-[#0066AE]">
                            Unggah foto atau dokumen pendukung
                        </span>
                        <span className="block text-xs font-medium text-[#7C7C7C]">
                            JPG, PNG, WEBP, atau PDF. Maksimal 50 MB per file.
                        </span>
                    </span>
                    <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        onChange={(event) => {
                            handleFilesChange(event.target.files);
                            event.target.value = '';
                        }}
                        className="sr-only"
                    />
                </label>
                {fileError && (
                    <p className="mt-2 rounded-lg bg-[#FDECEC] px-3 py-2 text-xs font-semibold text-[#D81313]">
                        {fileError}
                    </p>
                )}

                {hasDocuments && (
                    <div className="mt-3 space-y-2">
                        {question.answer?.documents.map((document) => (
                            <div
                                key={document.id}
                                className="flex items-center gap-3 rounded-xl border border-[#EFEFEF] bg-white px-3 py-2 text-sm font-semibold text-[#303030] transition hover:border-[#AAD2F8] hover:bg-[#F8FBFF]"
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
                                    aria-label={`Preview ${document.file_name}`}
                                >
                                    <Eye className="size-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDeleteDocument(document)}
                                    className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]"
                                    aria-label={`Hapus ${document.file_name}`}
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
                                    aria-label={`Preview ${file.name}`}
                                >
                                    <Eye className="size-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onRemoveFile(file)}
                                    className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]"
                                    aria-label={`Hapus ${file.name}`}
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}

export default function TakeSurvey({
    assignment,
    template,
    aspects,
    summary,
}: TakeSurveyProps) {
    const initialSelectedOptions = useMemo(
        () => getInitialSelectedOptions(aspects),
        [aspects],
    );
    const initialNotes = useMemo(() => getInitialNotes(aspects), [aspects]);

    return (
        <SurveyDraftProvider
            initialSelectedOptions={initialSelectedOptions}
            initialNotes={initialNotes}
        >
            <TakeSurveyContent
                assignment={assignment}
                template={template}
                aspects={aspects}
                summary={summary}
            />
        </SurveyDraftProvider>
    );
}

function TakeSurveyContent({
    assignment,
    template,
    aspects,
    summary,
}: TakeSurveyProps) {
    const [activeAspectIndex, setActiveAspectIndex] = useState(0);
    const [processing, setProcessing] = useState(false);
    const isSubmittingRef = useRef(false);
    const {
        selectedOptions,
        documents,
        notes,
        dirtyQuestionIds,
        hasUnsavedChanges,
        selectOption,
        setQuestionFiles,
        updateQuestionNotes,
        removeQuestionFile,
        clearSavedChanges,
    } = useSurveyDraft();

    const activeAspect = aspects[activeAspectIndex] ?? null;
    const hasAspects = aspects.length > 0;
    const progress = hasAspects
        ? Math.round(((activeAspectIndex + 1) / aspects.length) * 100)
        : 0;
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

    function previousAspect() {
        setActiveAspectIndex((current) => Math.max(current - 1, 0));
    }

    function nextAspect() {
        setActiveAspectIndex((current) =>
            Math.min(current + 1, aspects.length - 1),
        );
    }

    function previewFile(file: File) {
        const url = URL.createObjectURL(file);

        window.open(url, '_blank', 'noopener,noreferrer');
        window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    }

    function deleteStoredDocument(document: SurveyDocument) {
        router.delete(
            destroySurveyDocument.url({
                assignment: assignment.code,
                document: document.id,
            }),
            {
                preserveScroll: true,
            },
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
                `answers[${index}][survey_question_option_id]`,
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

        router.post(storeSurveyDraft.url(assignment.code), formData, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => {
                setProcessing(false);
                isSubmittingRef.current = false;
            },
            onSuccess: clearSavedChanges,
        });
    }

    return (
        <>
            <Head title={`Isi Survey - ${template.title}`} />

            <div
                className="min-h-[100dvh] font-sans text-[#303030]"
                style={{ backgroundColor: colors.background }}
            >
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
                                    Isi Survey
                                </h1>
                                <p className="truncate text-sm font-medium text-[#7C7C7C]">
                                    {template.title}
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
                                className="flex size-9 items-center justify-center rounded-lg transition hover:bg-[#F1F5F8] active:scale-95"
                            >
                                <Save size={22} strokeWidth={2.1} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-4xl px-4 pt-24 pb-6 sm:px-6 sm:pt-24">
                    <nav
                        aria-label="Breadcrumb"
                        className="mb-4 flex items-center gap-2 text-sm font-semibold"
                    >
                        <span className="text-[#0066AE]">Survey</span>
                        <ChevronRight
                            size={16}
                            strokeWidth={2.4}
                            className="text-[#B0B0B0]"
                        />
                        <span className="text-[#303030]">
                            {activeAspect?.name ?? 'Belum Ada Aspect'}
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
                                        {assignment.village.name}
                                    </h2>
                                    <p className="mt-1 text-sm font-medium text-[#7C7C7C]">
                                        {template.title}
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
                                    Aspect{' '}
                                    {hasAspects ? activeAspectIndex + 1 : 0}{' '}
                                    dari {summary.total_aspects}
                                </p>
                                <p className="mt-0.5 text-xs font-medium text-[#7C7C7C]">
                                    {summary.total_questions} pertanyaan dari{' '}
                                    {summary.total_options} pilihan jawaban
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
                            <SectionTitle
                                title="Aspect Survey"
                                subtitle={
                                    activeAspect
                                        ? activeAspect.name
                                        : 'Template survey belum memiliki pertanyaan.'
                                }
                            />
                            <div className="mt-3 flex flex-wrap gap-2">
                                {aspects.map((aspect, index) => (
                                    <button
                                        key={aspect.name}
                                        type="button"
                                        onClick={() =>
                                            setActiveAspectIndex(index)
                                        }
                                        className={classNames(
                                            'h-9 rounded-lg px-3 text-xs font-bold transition active:scale-[0.98]',
                                            index === activeAspectIndex
                                                ? 'bg-[#0066AE] text-white'
                                                : 'bg-[#F1F5F8] text-[#0066AE]',
                                        )}
                                    >
                                        {index + 1}. {aspect.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4 bg-white px-4 pb-5 sm:px-6">
                        {activeAspect?.questions.map((question) => (
                            <QuestionCard
                                key={question.id}
                                aspect={activeAspect.name}
                                question={question}
                                selectedOptionId={selectedOptions[question.id]}
                                files={documents[question.id] ?? []}
                                noteValue={
                                    notes[question.id] ??
                                    question.answer?.notes ??
                                    ''
                                }
                                onSelectOption={(optionId) =>
                                    selectOption(question.id, optionId)
                                }
                                onFilesChange={(files) =>
                                    setQuestionFiles(question.id, files)
                                }
                                onNotesChange={(value) =>
                                    updateQuestionNotes(question.id, value)
                                }
                                onPreviewFile={previewFile}
                                onRemoveFile={(file) =>
                                    removeQuestionFile(question.id, file)
                                }
                                onDeleteDocument={deleteStoredDocument}
                            />
                        ))}

                        {!activeAspect && (
                            <div className="rounded-2xl border border-dashed border-[#AAD2F8] bg-[#F8FBFF] px-6 py-12 text-center">
                                <FileText className="mx-auto size-12 text-[#0066AE]" />
                                <h2 className="mt-4 text-lg font-bold text-[#303030]">
                                    Template survey belum memiliki pertanyaan
                                </h2>
                                <p className="mt-1 text-sm font-medium text-[#7C7C7C]">
                                    Tambahkan pertanyaan pada template ini
                                    sebelum survey diisi.
                                </p>
                            </div>
                        )}
                    </section>

                    <footer className="mt-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
                        <button
                            type="button"
                            disabled={!hasAspects || activeAspectIndex === 0}
                            onClick={previousAspect}
                            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            <ArrowLeft size={20} strokeWidth={2.2} />
                            Sebelumnya
                        </button>

                        <button
                            type="button"
                            disabled={processing}
                            onClick={submitDraft}
                            className="h-11 rounded-xl px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98]"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Draft'}
                        </button>

                        <button
                            type="button"
                            disabled={
                                !hasAspects ||
                                activeAspectIndex === aspects.length - 1
                            }
                            onClick={nextAspect}
                            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.16)] transition hover:bg-[#093967] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {activeAspectIndex === aspects.length - 1
                                ? 'Selesai'
                                : 'Selanjutnya'}
                            <ChevronRight size={20} strokeWidth={2.3} />
                        </button>
                    </footer>
                </main>
            </div>
        </>
    );
}

TakeSurvey.layout = null;
