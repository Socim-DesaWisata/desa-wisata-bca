import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import {
    ClipboardList,
    Edit3,
    Eye,
    MoreVertical,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SurveyQuestionController from '@/actions/App/Http/Controllers/SurveyQuestionController';
import { dashboard, questions as questionsRoute } from '@/routes';

type TemplateSummary = {
    id: number;
    title: string;
    description: string | null;
    status: string;
    created_by: string;
    published_at: string | null;
    updated_at: string | null;
    questions_count: number;
    aspects_count: number;
    assignments_count: number;
};

type Question = {
    id: number;
    no: number;
    code: string | null;
    question_text: string;
    document_hint: string | null;
    aspect: string;
    type: string;
    required: boolean;
    options: QuestionOption[];
    options_count: number;
    updated_at: string | null;
    updated_date: string | null;
};

type QuestionOption = {
    id: number;
    score: number;
    label: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedQuestions = {
    data: Question[];
    current_page: number;
    from: number | null;
    to: number | null;
    total: number;
    per_page: number;
    links: PaginationLink[];
};

type QuestionFilters = {
    template_id: number | null;
    search: string;
    aspect: string;
    per_page: number;
};

type QuestionsIndexProps = {
    template: TemplateSummary | null;
    aspects: string[];
    questions: PaginatedQuestions;
    filters: QuestionFilters;
};

type TemplateForm = {
    title: string;
    description: string;
    status: string;
};

type QuestionForm = {
    survey_template_id: string;
    aspect: string;
    code: string;
    question_text: string;
    document_hint: string;
    sort_order: string;
    options: string[];
};

const aspectClasses = [
    'bg-[#EAF3FF] text-[#0066AE]',
    'bg-[#EAF8F0] text-[#00893D]',
    'bg-[#FFF4EA] text-[#C9681E]',
    'bg-[#E8FAFA] text-[#0B7778]',
    'bg-[#FDECEC] text-[#D81313]',
    'bg-[#F1EAFF] text-[#6B46C1]',
];

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function aspectClass(aspect: string) {
    const index = Math.abs(
        aspect.split('').reduce((total, char) => total + char.charCodeAt(0), 0),
    );

    return aspectClasses[index % aspectClasses.length];
}

function paginationLabel(label: string) {
    return label
        .replace('&laquo; Previous', 'Previous')
        .replace('Next &raquo;', 'Next');
}

function StatusBadge({
    children,
    muted = false,
}: {
    children: string;
    muted?: boolean;
}) {
    return (
        <span
            className={classNames(
                'inline-flex h-6 min-w-[48px] items-center justify-center rounded-md px-2 text-[11px] font-semibold',
                muted
                    ? 'bg-[#F1F5F8] text-[#303030]'
                    : 'bg-[#EAF8F0] text-[#00893D]',
            )}
        >
            {children}
        </span>
    );
}

export default function QuestionsIndex({
    template,
    aspects,
    questions,
    filters,
}: QuestionsIndexProps) {
    const [filterForm, setFilterForm] = useState({
        template_id: filters.template_id?.toString() ?? '',
        search: filters.search ?? '',
        aspect: filters.aspect ?? '',
        per_page: filters.per_page?.toString() ?? '10',
    });
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(
        null,
    );

    const templateForm = useForm<TemplateForm>({
        title: template?.title ?? '',
        description: template?.description ?? '',
        status: template?.status ?? 'draft',
    });

    const questionForm = useForm<QuestionForm>({
        survey_template_id: template?.id.toString() ?? '',
        aspect: filters.aspect || aspects[0] || '',
        code: '',
        question_text: '',
        document_hint: '',
        sort_order: '',
        options: ['', '', '', ''],
    });

    const templateStats = [
        { label: 'Pertanyaan', value: String(template?.questions_count ?? 0) },
        { label: 'Aspek', value: String(template?.aspects_count ?? 0) },
        {
            label: 'Assignment',
            value: String(template?.assignments_count ?? 0),
        },
        { label: 'Update', value: template?.updated_at ?? '-' },
    ];

    function applyFilters(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        router.get(
            questionsRoute.url(),
            {
                template_id: filterForm.template_id || undefined,
                search: filterForm.search || undefined,
                aspect: filterForm.aspect || undefined,
                per_page: filterForm.per_page || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function resetFilters() {
        setFilterForm({
            template_id: filters.template_id?.toString() ?? '',
            search: '',
            aspect: '',
            per_page: filters.per_page?.toString() ?? '10',
        });

        router.get(
            questionsRoute.url(),
            {
                template_id: filters.template_id || undefined,
                per_page: filters.per_page || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function visitPage(url: string | null) {
        if (!url) {
            return;
        }

        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        });
    }

    function openTemplateModal() {
        if (!template) {
            return;
        }

        templateForm.setData({
            title: template.title,
            description: template.description ?? '',
            status: template.status,
        });
        templateForm.clearErrors();
        setIsTemplateModalOpen(true);
    }

    function openCreateQuestionModal() {
        questionForm.setData({
            survey_template_id: template?.id.toString() ?? '',
            aspect: filters.aspect || aspects[0] || '',
            code: '',
            question_text: '',
            document_hint: '',
            sort_order: '',
            options: ['', '', '', ''],
        });
        questionForm.clearErrors();
        setEditingQuestion(null);
        setIsQuestionModalOpen(true);
    }

    function openEditQuestionModal(question: Question) {
        questionForm.setData({
            survey_template_id: template?.id.toString() ?? '',
            aspect: question.aspect,
            code: question.code ?? '',
            question_text: question.question_text,
            document_hint: question.document_hint ?? '',
            sort_order: question.no?.toString() ?? '',
            options: [1, 2, 3, 4].map(
                (score) =>
                    question.options.find((option) => option.score === score)
                        ?.label ?? '',
            ),
        });
        questionForm.clearErrors();
        setEditingQuestion(question);
        setIsQuestionModalOpen(true);
    }

    function updateOption(index: number, value: string) {
        questionForm.setData(
            'options',
            questionForm.data.options.map((option, optionIndex) =>
                optionIndex === index ? value : option,
            ),
        );
    }

    function submitTemplate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!template) {
            return;
        }

        templateForm.patch(
            SurveyQuestionController.updateTemplate.url(template.id),
            {
                preserveScroll: true,
                onSuccess: () => setIsTemplateModalOpen(false),
            },
        );
    }

    function submitQuestion(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => setIsQuestionModalOpen(false),
        };

        if (editingQuestion) {
            questionForm.patch(
                SurveyQuestionController.update.url(editingQuestion.id),
                options,
            );

            return;
        }

        questionForm.post(SurveyQuestionController.store.url(), options);
    }

    const questionErrors = questionForm.errors as Partial<
        Record<keyof QuestionForm | `options.${number}`, string>
    >;

    return (
        <>
            <Head title="Detail Template Survey" />
            <main
                className="min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-5 text-[#303030] sm:px-5 lg:px-6"
                style={{
                    fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
                }}
            >
                <div className="mx-auto max-w-[1500px] space-y-4">
                    <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0">
                            <nav className="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold text-[#0066AE]">
                                <span>Dashboard</span>
                                <span className="text-[#7C7C7C]">/</span>
                                <span>Template Survey</span>
                                <span className="text-[#7C7C7C]">/</span>
                                <span className="text-[#7C7C7C]">
                                    Detail Template
                                </span>
                            </nav>
                            <h1 className="text-[26px] leading-8 font-bold tracking-[-0.01em] text-[#303030] md:text-[30px] md:leading-9">
                                Detail Template Survey
                            </h1>
                            <p className="mt-1 text-sm leading-6 text-[#7C7C7C]">
                                Lihat informasi template, kelola pertanyaan
                                survey, dan telusuri detail rubrik penilaian.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:flex">
                            <button
                                type="button"
                                onClick={openCreateQuestionModal}
                                disabled={!template}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Plus className="size-4" />
                                Tambah Pertanyaan
                            </button>
                        </div>
                    </header>

                    <section className="rounded-xl border border-[#EFEFEF] bg-white px-4 py-3 shadow-[0_4px_14px_rgba(3,17,32,0.05)]">
                        {template ? (
                            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE]">
                                        <ClipboardList
                                            className="size-5"
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="truncate text-[15px] leading-5 font-bold text-[#303030]">
                                                {template.title}
                                            </h2>
                                            <StatusBadge
                                                muted={
                                                    template.status !==
                                                    'published'
                                                }
                                            >
                                                {template.status}
                                            </StatusBadge>
                                        </div>
                                        <p className="mt-1 line-clamp-1 text-xs leading-5 text-[#7C7C7C]">
                                            {template.description ??
                                                'Template survey untuk assessment Desa/Kampung Wisata.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between xl:justify-end">
                                    <div className="grid grid-cols-2 gap-2 sm:flex">
                                        {templateStats.map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="rounded-lg bg-[#F7F7F7] px-3 py-2"
                                            >
                                                <p className="text-[10px] font-semibold text-[#7C7C7C]">
                                                    {stat.label}
                                                </p>
                                                <p className="text-xs font-bold text-[#303030]">
                                                    {stat.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={openTemplateModal}
                                        className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                                    >
                                        <Edit3 className="size-3.5" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-lg bg-[#F1F5F8] px-4 py-8 text-center">
                                <p className="text-sm font-bold text-[#303030]">
                                    Belum ada template survey berisi pertanyaan.
                                </p>
                                <p className="mt-1 text-xs text-[#7C7C7C]">
                                    Jalankan seeder template question atau buat
                                    template baru terlebih dahulu.
                                </p>
                            </div>
                        )}
                    </section>

                    <form
                        onSubmit={applyFilters}
                        className="rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_14px_rgba(3,17,32,0.05)]"
                    >
                        <div className="grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.4fr)_minmax(170px,0.8fr)_auto_auto]">
                            <label className="space-y-1">
                                <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                    Pencarian
                                </span>
                                <span className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]">
                                    <Search className="size-4" />
                                    <input
                                        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]"
                                        placeholder="Cari pertanyaan survey..."
                                        value={filterForm.search}
                                        onChange={(event) =>
                                            setFilterForm((current) => ({
                                                ...current,
                                                search: event.target.value,
                                            }))
                                        }
                                    />
                                </span>
                            </label>

                            <label className="space-y-1">
                                <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                    Aspek
                                </span>
                                <select
                                    className="h-10 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                                    value={filterForm.aspect}
                                    onChange={(event) =>
                                        setFilterForm((current) => ({
                                            ...current,
                                            aspect: event.target.value,
                                        }))
                                    }
                                >
                                    <option value="">Semua Aspek</option>
                                    {aspects.map((aspect) => (
                                        <option key={aspect} value={aspect}>
                                            {aspect}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <button className="h-10 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_5px_12px_rgba(0,102,174,0.16)]">
                                Terapkan Filter
                            </button>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="h-10 rounded-lg border border-[#AAD2F8] bg-white px-5 text-sm font-bold text-[#0066AE]"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    <section className="rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)]">
                        <div className="flex flex-col gap-3 border-b border-[#EFEFEF] px-5 py-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h2 className="text-xl leading-7 font-bold text-[#303030]">
                                    Daftar Pertanyaan Survey
                                </h2>
                                <p className="text-sm leading-5 text-[#7C7C7C]">
                                    Berikut daftar pertanyaan yang digunakan
                                    dalam template assessment desa wisata ini.
                                </p>
                            </div>
                            <div className="text-sm font-bold text-[#0066AE]">
                                {questions.total} pertanyaan
                            </div>
                        </div>

                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                                <thead className="bg-[#F1F5F8] text-[12px] text-[#0066AE]">
                                    <tr>
                                        {[
                                            'No',
                                            'Kode',
                                            'Pertanyaan',
                                            'Aspek',
                                            'Terakhir Diperbarui',
                                            'Aksi',
                                        ].map((head) => (
                                            <th
                                                key={head}
                                                className="px-3 py-3 font-bold whitespace-nowrap"
                                            >
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#EFEFEF]">
                                    {questions.data.map((question, index) => (
                                        <tr
                                            key={question.id}
                                            className="hover:bg-[#FAFCFF]"
                                        >
                                            <td className="px-3 py-3 align-top font-semibold text-[#303030]">
                                                {question.no ||
                                                    questions.from! + index}
                                            </td>
                                            <td className="px-3 py-3 align-top font-bold text-[#303030]">
                                                {question.code ?? '-'}
                                            </td>
                                            <td className="max-w-[480px] px-3 py-3 align-top">
                                                <p className="leading-5 font-bold text-[#303030]">
                                                    {question.question_text}
                                                </p>
                                                {question.document_hint && (
                                                    <p className="mt-1 text-xs leading-5 text-[#7C7C7C]">
                                                        Dokumen:{' '}
                                                        {question.document_hint}
                                                    </p>
                                                )}
                                            </td>
                                            <td className="px-3 py-3 align-top">
                                                <span
                                                    className={classNames(
                                                        'inline-flex rounded-md px-2.5 py-1 text-[11px] font-semibold',
                                                        aspectClass(
                                                            question.aspect,
                                                        ),
                                                    )}
                                                >
                                                    {question.aspect}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 align-top font-semibold text-[#303030]">
                                                {question.updated_date ?? '-'}
                                            </td>
                                            <td className="px-3 py-3 align-top">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <button className="flex size-8 items-center justify-center rounded-md border border-[#AAD2F8] bg-[#F1F5F8] text-[#0066AE]">
                                                            <MoreVertical className="size-4" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-48 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]"
                                                    >
                                                        <DropdownMenuItem className="gap-2 text-xs font-semibold">
                                                            <Eye className="size-4 text-[#303030]" />
                                                            Lihat Detail
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="gap-2 text-xs"
                                                            onSelect={() =>
                                                                openEditQuestionModal(
                                                                    question,
                                                                )
                                                            }
                                                        >
                                                            <Edit3 className="size-4 text-[#0066AE]" />
                                                            Edit Pertanyaan
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="gap-2 text-xs font-semibold text-[#D81313]">
                                                            <Trash2 className="size-4 text-[#D81313]" />
                                                            Hapus Pertanyaan
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-3 p-4 md:hidden">
                            {questions.data.map((question) => (
                                <article
                                    key={question.id}
                                    className="rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_3px_10px_rgba(3,17,32,0.05)]"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-[#0066AE]">
                                                {question.code ??
                                                    `Q${question.id}`}
                                            </p>
                                            <h3 className="mt-1 text-sm leading-5 font-bold text-[#303030]">
                                                {question.question_text}
                                            </h3>
                                        </div>
                                        <span
                                            className={classNames(
                                                'shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold',
                                                aspectClass(question.aspect),
                                            )}
                                        >
                                            {question.aspect}
                                        </span>
                                    </div>
                                    {question.document_hint && (
                                        <p className="mt-2 text-xs leading-5 text-[#7C7C7C]">
                                            Dokumen: {question.document_hint}
                                        </p>
                                    )}
                                    <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
                                        <div>
                                            <span className="font-bold text-[#303030]">
                                                {question.updated_date ?? '-'}
                                            </span>
                                            <br />
                                            <span className="text-[#7C7C7C]">
                                                Diperbarui
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditQuestionModal(question)
                                            }
                                            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-3 text-xs font-bold text-[#0066AE]"
                                        >
                                            <Edit3 className="size-3.5" />
                                            Edit
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {questions.data.length === 0 && (
                            <div className="border-t border-[#EFEFEF] px-5 py-10 text-center">
                                <p className="text-sm font-bold text-[#303030]">
                                    Pertanyaan tidak ditemukan.
                                </p>
                                <p className="mt-1 text-xs text-[#7C7C7C]">
                                    Ubah filter atau kata kunci pencarian.
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 border-t border-[#EFEFEF] px-5 py-4 text-sm text-[#7C7C7C] xl:flex-row xl:items-center xl:justify-between">
                            <span>
                                Menampilkan {questions.from ?? 0}-
                                {questions.to ?? 0} dari {questions.total}{' '}
                                pertanyaan
                            </span>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                                <label className="flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]">
                                    Per halaman
                                    <select
                                        className="h-9 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030] outline-none focus:border-[#0066AE]"
                                        value={filterForm.per_page}
                                        onChange={(event) => {
                                            const perPage = event.target.value;
                                            setFilterForm((current) => ({
                                                ...current,
                                                per_page: perPage,
                                            }));
                                            router.get(
                                                questionsRoute.url(),
                                                {
                                                    template_id:
                                                        filterForm.template_id ||
                                                        undefined,
                                                    search:
                                                        filterForm.search ||
                                                        undefined,
                                                    aspect:
                                                        filterForm.aspect ||
                                                        undefined,
                                                    per_page: perPage,
                                                },
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                    replace: true,
                                                },
                                            );
                                        }}
                                    >
                                        {[10, 25, 50].map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {questions.links.map((link, index) => (
                                        <button
                                            key={`${link.label}-${index}`}
                                            type="button"
                                            disabled={!link.url}
                                            onClick={() => visitPage(link.url)}
                                            className={classNames(
                                                'h-9 rounded-lg border px-3 text-sm font-semibold',
                                                link.active
                                                    ? 'border-[#0066AE] bg-[#0066AE] text-white'
                                                    : 'border-[#DDE4EC] bg-white text-[#303030]',
                                                !link.url &&
                                                    'cursor-not-allowed opacity-50',
                                            )}
                                        >
                                            {paginationLabel(link.label)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Dialog
                open={isTemplateModalOpen}
                onOpenChange={setIsTemplateModalOpen}
            >
                <DialogContent className="border-[#EFEFEF] bg-white sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-[#303030]">
                            Edit Template Survey
                        </DialogTitle>
                        <DialogDescription>
                            Perbarui judul, deskripsi, dan status template.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitTemplate} className="space-y-4">
                        <label className="space-y-1.5">
                            <span className="text-xs font-bold text-[#303030]">
                                Judul Template
                            </span>
                            <input
                                value={templateForm.data.title}
                                onChange={(event) =>
                                    templateForm.setData(
                                        'title',
                                        event.target.value,
                                    )
                                }
                                className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
                            />
                            <FieldError message={templateForm.errors.title} />
                        </label>

                        <label className="space-y-1.5">
                            <span className="text-xs font-bold text-[#303030]">
                                Deskripsi
                            </span>
                            <textarea
                                value={templateForm.data.description}
                                onChange={(event) =>
                                    templateForm.setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                                rows={4}
                                className="w-full resize-none rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
                            />
                            <FieldError
                                message={templateForm.errors.description}
                            />
                        </label>

                        <label className="space-y-1.5">
                            <span className="text-xs font-bold text-[#303030]">
                                Status
                            </span>
                            <select
                                value={templateForm.data.status}
                                onChange={(event) =>
                                    templateForm.setData(
                                        'status',
                                        event.target.value,
                                    )
                                }
                                className="h-10 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                            <FieldError message={templateForm.errors.status} />
                        </label>

                        <DialogFooter>
                            <button
                                type="button"
                                onClick={() => setIsTemplateModalOpen(false)}
                                className="h-10 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030]"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={templateForm.processing}
                                className="h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60"
                            >
                                Simpan Template
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isQuestionModalOpen}
                onOpenChange={setIsQuestionModalOpen}
            >
                <DialogContent className="max-h-[90dvh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-[#303030]">
                            {editingQuestion
                                ? 'Edit Pertanyaan'
                                : 'Tambah Pertanyaan'}
                        </DialogTitle>
                        <DialogDescription>
                            Isi data pertanyaan dan empat kriteria skor.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitQuestion} className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                            <label className="space-y-1.5 sm:col-span-2">
                                <span className="text-xs font-bold text-[#303030]">
                                    Aspek
                                </span>
                                <input
                                    list="question-aspects"
                                    value={questionForm.data.aspect}
                                    onChange={(event) =>
                                        questionForm.setData(
                                            'aspect',
                                            event.target.value,
                                        )
                                    }
                                    className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
                                />
                                <datalist id="question-aspects">
                                    {aspects.map((aspect) => (
                                        <option key={aspect} value={aspect} />
                                    ))}
                                </datalist>
                                <FieldError message={questionErrors.aspect} />
                            </label>

                            <label className="space-y-1.5">
                                <span className="text-xs font-bold text-[#303030]">
                                    Kode
                                </span>
                                <input
                                    value={questionForm.data.code}
                                    onChange={(event) =>
                                        questionForm.setData(
                                            'code',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Q062"
                                    className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
                                />
                                <FieldError message={questionErrors.code} />
                            </label>
                        </div>

                        <label className="space-y-1.5">
                            <span className="text-xs font-bold text-[#303030]">
                                Pertanyaan
                            </span>
                            <textarea
                                value={questionForm.data.question_text}
                                onChange={(event) =>
                                    questionForm.setData(
                                        'question_text',
                                        event.target.value,
                                    )
                                }
                                rows={4}
                                className="w-full resize-none rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
                            />
                            <FieldError
                                message={questionErrors.question_text}
                            />
                        </label>

                        <label className="space-y-1.5">
                            <span className="text-xs font-bold text-[#303030]">
                                Dokumen yang Disiapkan
                            </span>
                            <textarea
                                value={questionForm.data.document_hint}
                                onChange={(event) =>
                                    questionForm.setData(
                                        'document_hint',
                                        event.target.value,
                                    )
                                }
                                rows={3}
                                className="w-full resize-none rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
                            />
                            <FieldError
                                message={questionErrors.document_hint}
                            />
                        </label>

                        <label className="space-y-1.5">
                            <span className="text-xs font-bold text-[#303030]">
                                Urutan
                            </span>
                            <input
                                type="number"
                                min={1}
                                value={questionForm.data.sort_order}
                                onChange={(event) =>
                                    questionForm.setData(
                                        'sort_order',
                                        event.target.value,
                                    )
                                }
                                placeholder="Otomatis jika kosong"
                                className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
                            />
                            <FieldError message={questionErrors.sort_order} />
                        </label>

                        <div className="space-y-3 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] p-3">
                            <div>
                                <p className="text-xs font-bold text-[#303030]">
                                    Kriteria Skor
                                </p>
                                <p className="text-[11px] text-[#7C7C7C]">
                                    Score otomatis 1 sampai 4 berdasarkan
                                    urutan.
                                </p>
                            </div>
                            {questionForm.data.options.map((option, index) => (
                                <label
                                    key={index}
                                    className="grid gap-2 sm:grid-cols-[72px_minmax(0,1fr)]"
                                >
                                    <span className="flex h-10 items-center text-xs font-bold text-[#0066AE]">
                                        Skor {index + 1}
                                    </span>
                                    <div>
                                        <textarea
                                            value={option}
                                            onChange={(event) =>
                                                updateOption(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                            rows={2}
                                            className="w-full resize-none rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
                                        />
                                        <FieldError
                                            message={
                                                questionErrors[
                                                    `options.${index}`
                                                ]
                                            }
                                        />
                                    </div>
                                </label>
                            ))}
                        </div>

                        <DialogFooter>
                            <button
                                type="button"
                                onClick={() => setIsQuestionModalOpen(false)}
                                className="h-10 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030]"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={questionForm.processing}
                                className="h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60"
                            >
                                {editingQuestion
                                    ? 'Simpan Pertanyaan'
                                    : 'Tambah Pertanyaan'}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <p className="mt-1 text-xs font-semibold text-[#D81313]">{message}</p>
    );
}

QuestionsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Template Survey', href: questionsRoute() },
        { title: 'Detail Template', href: questionsRoute() },
    ],
};
