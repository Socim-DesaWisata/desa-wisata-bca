import { Head, Link, router, useForm } from '@inertiajs/react';
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
import { show as showQuestionTemplate } from '@/routes/questions';

type TemplateSummary = {
    id: number;
    title: string;
    description: string | null;
    type: 'village' | 'umkm' | 'pariwisata';
    type_label: string;
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
    raw_type: 'village' | 'umkm' | 'pariwisata';
    required: boolean;
    options: QuestionOption[];
    options_count: number;
    description: string | null;
    supporting_evidence: string | null;
    weight_label: string | null;
    max_score_label: string | null;
    updated_at: string | null;
    updated_date: string | null;
    editable: VillageQuestionEditable | UmkmQuestionEditable | PariwisataQuestionEditable;
};

type QuestionOption = {
    id: number;
    score: number;
    level?: string | null;
    label: string;
    description: string | null;
    sort_order?: number | null;
};

type VillageQuestionEditable = {
    aspect: string;
    code: string | null;
    question_text: string;
    document_hint: string | null;
    sort_order: number | null;
    options: Array<{ id: number; score: number; label: string }>;
};

type UmkmQuestionEditable = {
    criteria_code: string;
    criteria_name: string;
    criteria_weight_percent: string | number;
    question_number: number;
    question_text: string;
    question_weight_percent: string | number;
    max_score: string | number;
    help_text: string | null;
    sort_order: number | null;
    is_active: boolean;
};

type PariwisataQuestionEditable = {
    category_code: string;
    category_name: string;
    sub_category_code: string;
    sub_category_name: string;
    criteria_code: string;
    criteria_name: string;
    criteria_description: string | null;
    indicator_code: string;
    indicator_name: string;
    indicator_description: string | null;
    supporting_evidence: string | null;
    input_type: string;
    document_required: boolean;
    document_hint: string | null;
    sort_order: number | null;
    is_active: boolean;
    options: QuestionOption[];
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
    search: string;
    aspect: string;
    per_page: number;
};

type QuestionsIndexProps = {
    template: TemplateSummary;
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

type UmkmQuestionForm = {
    criteria_code: string;
    criteria_name: string;
    criteria_weight_percent: string;
    question_number: string;
    question_text: string;
    question_weight_percent: string;
    max_score: string;
    help_text: string;
    sort_order: string;
    is_active: boolean;
};

type PariwisataOptionForm = {
    id: string;
    score: string;
    level: string;
    label: string;
    description: string;
    sort_order: string;
};

type PariwisataQuestionForm = {
    category_code: string;
    category_name: string;
    sub_category_code: string;
    sub_category_name: string;
    criteria_code: string;
    criteria_name: string;
    criteria_description: string;
    indicator_code: string;
    indicator_name: string;
    indicator_description: string;
    supporting_evidence: string;
    input_type: string;
    document_required: boolean;
    document_hint: string;
    sort_order: string;
    is_active: boolean;
    options: PariwisataOptionForm[];
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

function TypeBadge({ label }: { label: string }) {
    return (
        <span className="inline-flex h-6 items-center rounded-md bg-[#EAF3FF] px-2 text-[11px] font-bold text-[#0066AE]">
            {label}
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
        title: template.title,
        description: template.description ?? '',
        status: template.status,
    });

    const questionForm = useForm<QuestionForm>({
        survey_template_id: template.id.toString(),
        aspect: filters.aspect || aspects[0] || '',
        code: '',
        question_text: '',
        document_hint: '',
        sort_order: '',
        options: ['', '', '', ''],
    });

    const umkmQuestionForm = useForm<UmkmQuestionForm>({
        criteria_code: '',
        criteria_name: '',
        criteria_weight_percent: '',
        question_number: '',
        question_text: '',
        question_weight_percent: '',
        max_score: '',
        help_text: '',
        sort_order: '',
        is_active: true,
    });

    const pariwisataQuestionForm = useForm<PariwisataQuestionForm>({
        category_code: '',
        category_name: '',
        sub_category_code: '',
        sub_category_name: '',
        criteria_code: '',
        criteria_name: '',
        criteria_description: '',
        indicator_code: '',
        indicator_name: '',
        indicator_description: '',
        supporting_evidence: '',
        input_type: 'radio',
        document_required: false,
        document_hint: '',
        sort_order: '',
        is_active: true,
        options: [],
    });

    const isVillageTemplate = template.type === 'village';
    const aspectLabel =
        template.type === 'umkm'
            ? 'Kriteria'
            : template.type === 'pariwisata'
              ? 'Kategori'
              : 'Aspek';

    const templateStats = [
        { label: 'Pertanyaan', value: String(template.questions_count) },
        { label: aspectLabel, value: String(template.aspects_count) },
        {
            label: 'Assignment',
            value: String(template.assignments_count),
        },
        { label: 'Update', value: template.updated_at ?? '-' },
    ];

    function applyFilters(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        router.get(
            showQuestionTemplate.url(template.id),
            {
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
            search: '',
            aspect: '',
            per_page: filters.per_page?.toString() ?? '10',
        });

        router.get(
            showQuestionTemplate.url(template.id),
            {
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
            survey_template_id: template.id.toString(),
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
        if (question.raw_type === 'umkm') {
            const editable = question.editable as UmkmQuestionEditable;

            umkmQuestionForm.setData({
                criteria_code: editable.criteria_code ?? '',
                criteria_name: editable.criteria_name ?? '',
                criteria_weight_percent:
                    editable.criteria_weight_percent?.toString() ?? '',
                question_number: editable.question_number?.toString() ?? '',
                question_text: editable.question_text ?? '',
                question_weight_percent:
                    editable.question_weight_percent?.toString() ?? '',
                max_score: editable.max_score?.toString() ?? '',
                help_text: editable.help_text ?? '',
                sort_order: editable.sort_order?.toString() ?? '',
                is_active: editable.is_active,
            });
            umkmQuestionForm.clearErrors();
            setEditingQuestion(question);
            setIsQuestionModalOpen(true);

            return;
        }

        if (question.raw_type === 'pariwisata') {
            const editable = question.editable as PariwisataQuestionEditable;

            pariwisataQuestionForm.setData({
                category_code: editable.category_code ?? '',
                category_name: editable.category_name ?? '',
                sub_category_code: editable.sub_category_code ?? '',
                sub_category_name: editable.sub_category_name ?? '',
                criteria_code: editable.criteria_code ?? '',
                criteria_name: editable.criteria_name ?? '',
                criteria_description: editable.criteria_description ?? '',
                indicator_code: editable.indicator_code ?? '',
                indicator_name: editable.indicator_name ?? '',
                indicator_description: editable.indicator_description ?? '',
                supporting_evidence: editable.supporting_evidence ?? '',
                input_type: editable.input_type ?? 'radio',
                document_required: editable.document_required,
                document_hint: editable.document_hint ?? '',
                sort_order: editable.sort_order?.toString() ?? '',
                is_active: editable.is_active,
                options: editable.options.map((option) => ({
                    id: option.id.toString(),
                    score: option.score.toString(),
                    level: option.level ?? '',
                    label: option.label,
                    description: option.description ?? '',
                    sort_order: option.sort_order?.toString() ?? '',
                })),
            });
            pariwisataQuestionForm.clearErrors();
            setEditingQuestion(question);
            setIsQuestionModalOpen(true);

            return;
        }

        questionForm.setData({
            survey_template_id: template.id.toString(),
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

    function updatePariwisataOption(
        index: number,
        key: keyof PariwisataOptionForm,
        value: string,
    ) {
        pariwisataQuestionForm.setData(
            'options',
            pariwisataQuestionForm.data.options.map((option, optionIndex) =>
                optionIndex === index ? { ...option, [key]: value } : option,
            ),
        );
    }

    function addPariwisataOption() {
        pariwisataQuestionForm.setData('options', [
            ...pariwisataQuestionForm.data.options,
            {
                id: '',
                score: '',
                level: '',
                label: '',
                description: '',
                sort_order: (
                    pariwisataQuestionForm.data.options.length + 1
                ).toString(),
            },
        ]);
    }

    function removePariwisataOption(index: number) {
        pariwisataQuestionForm.setData(
            'options',
            pariwisataQuestionForm.data.options.filter(
                (_option, optionIndex) => optionIndex !== index,
            ),
        );
    }

    function submitTemplate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

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
            if (editingQuestion.raw_type === 'umkm') {
                umkmQuestionForm.patch(
                    SurveyQuestionController.updateUmkm.url(editingQuestion.id),
                    options,
                );

                return;
            }

            if (editingQuestion.raw_type === 'pariwisata') {
                pariwisataQuestionForm.patch(
                    SurveyQuestionController.updatePariwisata.url(
                        editingQuestion.id,
                    ),
                    options,
                );

                return;
            }

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
    const umkmQuestionErrors = umkmQuestionForm.errors as Partial<
        Record<keyof UmkmQuestionForm, string>
    >;
    const pariwisataQuestionErrors = pariwisataQuestionForm.errors as Partial<
        Record<
            | keyof PariwisataQuestionForm
            | `options.${number}.score`
            | `options.${number}.level`
            | `options.${number}.label`
            | `options.${number}.description`
            | `options.${number}.sort_order`,
            string
        >
    >;
    const isQuestionProcessing =
        questionForm.processing ||
        umkmQuestionForm.processing ||
        pariwisataQuestionForm.processing;

    return (
        <>
            <Head title="Detail Template Survey" />
            <main className="min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-5 text-[#303030] sm:px-5 lg:px-6">
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
                            <Link
                                href={questionsRoute.url()}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#AAD2F8] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                            >
                                Kembali
                            </Link>
                            {isVillageTemplate && (
                                <button
                                    type="button"
                                    onClick={openCreateQuestionModal}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Plus className="size-4" />
                                    Tambah Pertanyaan
                                </button>
                            )}
                        </div>
                    </header>

                    <section className="rounded-xl border border-[#EFEFEF] bg-white px-4 py-3 shadow-[0_4px_14px_rgba(3,17,32,0.05)]">
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
                                            <TypeBadge
                                                label={template.type_label}
                                            />
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
                                    {aspectLabel}
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
                                    <option value="">Semua {aspectLabel}</option>
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
                                            aspectLabel,
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
                                                {question.description && (
                                                    <p className="mt-1 text-xs leading-5 text-[#64748B]">
                                                        {question.description}
                                                    </p>
                                                )}
                                                {question.supporting_evidence &&
                                                    question.supporting_evidence !==
                                                        question.document_hint && (
                                                        <p className="mt-1 text-xs leading-5 text-[#7C7C7C]">
                                                            Bukti pendukung:{' '}
                                                            {
                                                                question.supporting_evidence
                                                            }
                                                        </p>
                                                    )}
                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                    <span className="rounded-md bg-[#F1F5F8] px-2 py-1 text-[11px] font-bold text-[#0066AE]">
                                                        {question.type}
                                                    </span>
                                                    {question.weight_label && (
                                                        <span className="rounded-md bg-[#EAF8F0] px-2 py-1 text-[11px] font-bold text-[#00893D]">
                                                            Bobot:{' '}
                                                            {
                                                                question.weight_label
                                                            }
                                                        </span>
                                                    )}
                                                    {question.max_score_label && (
                                                        <span className="rounded-md bg-[#FFF4EA] px-2 py-1 text-[11px] font-bold text-[#C9681E]">
                                                            Maks:{' '}
                                                            {
                                                                question.max_score_label
                                                            }
                                                        </span>
                                                    )}
                                                </div>
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
                                                    <DropdownMenuTrigger asChild>
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
                                                        {isVillageTemplate && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="gap-2 text-xs font-semibold text-[#D81313]">
                                                                    <Trash2 className="size-4 text-[#D81313]" />
                                                                    Hapus Pertanyaan
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
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
                                    {question.description && (
                                        <p className="mt-2 text-xs leading-5 text-[#64748B]">
                                            {question.description}
                                        </p>
                                    )}
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        <span className="rounded-md bg-[#F1F5F8] px-2 py-1 text-[11px] font-bold text-[#0066AE]">
                                            {question.type}
                                        </span>
                                        {question.weight_label && (
                                            <span className="rounded-md bg-[#EAF8F0] px-2 py-1 text-[11px] font-bold text-[#00893D]">
                                                Bobot: {question.weight_label}
                                            </span>
                                        )}
                                        {question.max_score_label && (
                                            <span className="rounded-md bg-[#FFF4EA] px-2 py-1 text-[11px] font-bold text-[#C9681E]">
                                                Maks: {question.max_score_label}
                                            </span>
                                        )}
                                    </div>
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
                                                showQuestionTemplate.url(
                                                    template.id,
                                                ),
                                                {
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
                        {(!editingQuestion ||
                            editingQuestion.raw_type === 'village') && (
                            <>
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
                            </>
                        )}

                        {editingQuestion?.raw_type === 'umkm' && (
                            <>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <TextField
                                        label="Kode Kriteria"
                                        value={umkmQuestionForm.data.criteria_code}
                                        onChange={(value) =>
                                            umkmQuestionForm.setData(
                                                'criteria_code',
                                                value,
                                            )
                                        }
                                        error={umkmQuestionErrors.criteria_code}
                                    />
                                    <TextField
                                        label="Nomor Pertanyaan"
                                        type="number"
                                        value={umkmQuestionForm.data.question_number}
                                        onChange={(value) =>
                                            umkmQuestionForm.setData(
                                                'question_number',
                                                value,
                                            )
                                        }
                                        error={umkmQuestionErrors.question_number}
                                    />
                                    <TextField
                                        label="Urutan"
                                        type="number"
                                        value={umkmQuestionForm.data.sort_order}
                                        onChange={(value) =>
                                            umkmQuestionForm.setData(
                                                'sort_order',
                                                value,
                                            )
                                        }
                                        error={umkmQuestionErrors.sort_order}
                                    />
                                </div>
                                <TextField
                                    label="Nama Kriteria"
                                    value={umkmQuestionForm.data.criteria_name}
                                    onChange={(value) =>
                                        umkmQuestionForm.setData(
                                            'criteria_name',
                                            value,
                                        )
                                    }
                                    error={umkmQuestionErrors.criteria_name}
                                />
                                <TextAreaField
                                    label="Pertanyaan"
                                    value={umkmQuestionForm.data.question_text}
                                    onChange={(value) =>
                                        umkmQuestionForm.setData(
                                            'question_text',
                                            value,
                                        )
                                    }
                                    error={umkmQuestionErrors.question_text}
                                />
                                <TextAreaField
                                    label="Bantuan / Dokumen Pendukung"
                                    value={umkmQuestionForm.data.help_text}
                                    onChange={(value) =>
                                        umkmQuestionForm.setData(
                                            'help_text',
                                            value,
                                        )
                                    }
                                    error={umkmQuestionErrors.help_text}
                                    rows={3}
                                />
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <TextField
                                        label="Bobot Kriteria (%)"
                                        type="number"
                                        value={
                                            umkmQuestionForm.data
                                                .criteria_weight_percent
                                        }
                                        onChange={(value) =>
                                            umkmQuestionForm.setData(
                                                'criteria_weight_percent',
                                                value,
                                            )
                                        }
                                        error={
                                            umkmQuestionErrors.criteria_weight_percent
                                        }
                                    />
                                    <TextField
                                        label="Bobot Pertanyaan (%)"
                                        type="number"
                                        value={
                                            umkmQuestionForm.data
                                                .question_weight_percent
                                        }
                                        onChange={(value) =>
                                            umkmQuestionForm.setData(
                                                'question_weight_percent',
                                                value,
                                            )
                                        }
                                        error={
                                            umkmQuestionErrors.question_weight_percent
                                        }
                                    />
                                    <TextField
                                        label="Skor Maksimal"
                                        type="number"
                                        value={umkmQuestionForm.data.max_score}
                                        onChange={(value) =>
                                            umkmQuestionForm.setData(
                                                'max_score',
                                                value,
                                            )
                                        }
                                        error={umkmQuestionErrors.max_score}
                                    />
                                </div>
                                <CheckField
                                    label="Pertanyaan aktif"
                                    checked={umkmQuestionForm.data.is_active}
                                    onChange={(checked) =>
                                        umkmQuestionForm.setData(
                                            'is_active',
                                            checked,
                                        )
                                    }
                                />
                            </>
                        )}

                        {editingQuestion?.raw_type === 'pariwisata' && (
                            <>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <TextField label="Kode Kategori" value={pariwisataQuestionForm.data.category_code} onChange={(value) => pariwisataQuestionForm.setData('category_code', value)} error={pariwisataQuestionErrors.category_code} />
                                    <TextField label="Nama Kategori" value={pariwisataQuestionForm.data.category_name} onChange={(value) => pariwisataQuestionForm.setData('category_name', value)} error={pariwisataQuestionErrors.category_name} />
                                    <TextField label="Kode Sub Kategori" value={pariwisataQuestionForm.data.sub_category_code} onChange={(value) => pariwisataQuestionForm.setData('sub_category_code', value)} error={pariwisataQuestionErrors.sub_category_code} />
                                    <TextField label="Nama Sub Kategori" value={pariwisataQuestionForm.data.sub_category_name} onChange={(value) => pariwisataQuestionForm.setData('sub_category_name', value)} error={pariwisataQuestionErrors.sub_category_name} />
                                    <TextField label="Kode Kriteria" value={pariwisataQuestionForm.data.criteria_code} onChange={(value) => pariwisataQuestionForm.setData('criteria_code', value)} error={pariwisataQuestionErrors.criteria_code} />
                                    <TextField label="Nama Kriteria" value={pariwisataQuestionForm.data.criteria_name} onChange={(value) => pariwisataQuestionForm.setData('criteria_name', value)} error={pariwisataQuestionErrors.criteria_name} />
                                </div>
                                <TextAreaField label="Deskripsi Kriteria" value={pariwisataQuestionForm.data.criteria_description} onChange={(value) => pariwisataQuestionForm.setData('criteria_description', value)} error={pariwisataQuestionErrors.criteria_description} rows={3} />
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <TextField label="Kode Indikator" value={pariwisataQuestionForm.data.indicator_code} onChange={(value) => pariwisataQuestionForm.setData('indicator_code', value)} error={pariwisataQuestionErrors.indicator_code} />
                                    <TextField label="Tipe Input" value={pariwisataQuestionForm.data.input_type} onChange={(value) => pariwisataQuestionForm.setData('input_type', value)} error={pariwisataQuestionErrors.input_type} />
                                    <TextField label="Urutan" type="number" value={pariwisataQuestionForm.data.sort_order} onChange={(value) => pariwisataQuestionForm.setData('sort_order', value)} error={pariwisataQuestionErrors.sort_order} />
                                </div>
                                <TextAreaField label="Pertanyaan Utama / Indikator" value={pariwisataQuestionForm.data.indicator_name} onChange={(value) => pariwisataQuestionForm.setData('indicator_name', value)} error={pariwisataQuestionErrors.indicator_name} />
                                <TextAreaField label="Deskripsi Indikator" value={pariwisataQuestionForm.data.indicator_description} onChange={(value) => pariwisataQuestionForm.setData('indicator_description', value)} error={pariwisataQuestionErrors.indicator_description} rows={3} />
                                <TextAreaField label="Bukti Pendukung" value={pariwisataQuestionForm.data.supporting_evidence} onChange={(value) => pariwisataQuestionForm.setData('supporting_evidence', value)} error={pariwisataQuestionErrors.supporting_evidence} rows={3} />
                                <TextAreaField label="Dokumen Pendukung" value={pariwisataQuestionForm.data.document_hint} onChange={(value) => pariwisataQuestionForm.setData('document_hint', value)} error={pariwisataQuestionErrors.document_hint} rows={3} />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <CheckField label="Dokumen wajib" checked={pariwisataQuestionForm.data.document_required} onChange={(checked) => pariwisataQuestionForm.setData('document_required', checked)} />
                                    <CheckField label="Pertanyaan aktif" checked={pariwisataQuestionForm.data.is_active} onChange={(checked) => pariwisataQuestionForm.setData('is_active', checked)} />
                                </div>
                                <div className="space-y-3 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] p-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-bold text-[#303030]">Opsi Skor ISTC</p>
                                            <p className="text-[11px] text-[#7C7C7C]">Score, level, label, dan deskripsi opsi.</p>
                                        </div>
                                        <button type="button" onClick={addPariwisataOption} className="h-8 rounded-lg border border-[#0066AE] px-3 text-xs font-bold text-[#0066AE]">Tambah Opsi</button>
                                    </div>
                                    {pariwisataQuestionForm.data.options.map((option, index) => (
                                        <div key={`${option.id}-${index}`} className="space-y-2 rounded-lg border border-[#DDE4EC] bg-white p-3">
                                            <div className="grid gap-2 sm:grid-cols-4">
                                                <TextField label="Skor" type="number" value={option.score} onChange={(value) => updatePariwisataOption(index, 'score', value)} error={pariwisataQuestionErrors[`options.${index}.score`]} />
                                                <TextField label="Level" value={option.level} onChange={(value) => updatePariwisataOption(index, 'level', value)} error={pariwisataQuestionErrors[`options.${index}.level`]} />
                                                <TextField label="Label" value={option.label} onChange={(value) => updatePariwisataOption(index, 'label', value)} error={pariwisataQuestionErrors[`options.${index}.label`]} />
                                                <TextField label="Urutan" type="number" value={option.sort_order} onChange={(value) => updatePariwisataOption(index, 'sort_order', value)} error={pariwisataQuestionErrors[`options.${index}.sort_order`]} />
                                            </div>
                                            <TextAreaField label="Deskripsi Opsi" value={option.description} onChange={(value) => updatePariwisataOption(index, 'description', value)} error={pariwisataQuestionErrors[`options.${index}.description`]} rows={2} />
                                            {pariwisataQuestionForm.data.options.length > 1 && (
                                                <button type="button" onClick={() => removePariwisataOption(index)} className="text-xs font-bold text-[#D81313]">Hapus opsi</button>
                                            )}
                                        </div>
                                    ))}
                                    <FieldError message={pariwisataQuestionErrors.options} />
                                </div>
                            </>
                        )}

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
                                disabled={isQuestionProcessing}
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

function TextField({
    label,
    value,
    onChange,
    error,
    type = 'text',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    type?: 'text' | 'number';
}) {
    return (
        <label className="space-y-1.5">
            <span className="text-xs font-bold text-[#303030]">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
            />
            <FieldError message={error} />
        </label>
    );
}

function TextAreaField({
    label,
    value,
    onChange,
    error,
    rows = 4,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    rows?: number;
}) {
    return (
        <label className="space-y-1.5">
            <span className="text-xs font-bold text-[#303030]">{label}</span>
            <textarea
                value={value}
                rows={rows}
                onChange={(event) => onChange(event.target.value)}
                className="w-full resize-none rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
            />
            <FieldError message={error} />
        </label>
    );
}

function CheckField({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <label className="flex h-10 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#303030]">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="size-4 accent-[#0066AE]"
            />
            {label}
        </label>
    );
}

QuestionsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Template Survey', href: questionsRoute() },
        { title: 'Detail Template', href: '#' },
    ],
};
