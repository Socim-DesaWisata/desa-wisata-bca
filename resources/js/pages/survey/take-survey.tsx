import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    ChevronRight,
    ClipboardList,
    FileText,
    MapPin,
    MoreVertical,
    Save,
    UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { surveyAssignments } from '@/routes';

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
    options: SurveyOption[];
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

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
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

function QuestionCard({
    aspect,
    question,
    questionNumber,
    selectedOptionId,
    onSelectOption,
}: {
    aspect: string;
    question: SurveyQuestion;
    questionNumber: number;
    selectedOptionId?: number;
    onSelectOption: (optionId: number) => void;
}) {
    return (
        <article className="rounded-2xl border border-[#EFEFEF] bg-white px-4 py-5 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#F1F5F8] px-2.5 py-1 text-xs font-bold text-[#0066AE]">
                    {aspect}
                </span>
                <span className="rounded-md bg-[#F1F5F8] px-2.5 py-1 text-xs font-semibold text-[#093967]">
                    {question.code ?? `Q-${questionNumber}`}
                </span>
                <span className="rounded-md bg-[#FDECEC] px-2.5 py-1 text-xs font-bold text-[#D81313]">
                    Wajib isi
                </span>
            </div>

            <p className="mt-5 text-sm font-semibold text-[#0066AE]">
                Pertanyaan survey
            </p>
            <h2 className="mt-2 max-w-3xl text-2xl leading-tight font-bold text-[#303030] sm:text-[26px]">
                {question.question_text}
            </h2>
            {question.document_hint && (
                <p className="mt-3 max-w-2xl text-sm leading-6 font-medium text-[#7C7C7C] sm:text-[15px]">
                    {question.document_hint}
                </p>
            )}

            <div className="mt-6 border-t border-[#EFEFEF] pt-5">
                <SectionTitle
                    title="Pilih skor"
                    subtitle="Pilih satu nilai yang paling sesuai kondisi lapangan."
                />

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
                                </span>
                            </label>
                        );
                    })}
                </div>
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
    const [activeAspectIndex, setActiveAspectIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<
        Record<number, number>
    >({});

    const activeAspect = aspects[activeAspectIndex] ?? null;
    const hasAspects = aspects.length > 0;
    const progress = hasAspects
        ? Math.round(((activeAspectIndex + 1) / aspects.length) * 100)
        : 0;
    const currentStartNumber = useMemo(
        () =>
            aspects
                .slice(0, activeAspectIndex)
                .reduce((total, aspect) => total + aspect.questions.length, 0),
        [activeAspectIndex, aspects],
    );

    function selectOption(questionId: number, optionId: number) {
        setSelectedOptions((current) => ({
            ...current,
            [questionId]: optionId,
        }));
    }

    function previousAspect() {
        setActiveAspectIndex((current) => Math.max(current - 1, 0));
    }

    function nextAspect() {
        setActiveAspectIndex((current) =>
            Math.min(current + 1, aspects.length - 1),
        );
    }

    return (
        <>
            <Head title={`Isi Survey - ${template.title}`} />

            <div
                className="min-h-[100dvh] font-sans text-[#303030]"
                style={{ backgroundColor: colors.background }}
            >
                <header className="bg-white">
                    <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-4 sm:px-6">
                        <div className="flex min-w-0 items-center gap-3">
                            <Link
                                href={surveyAssignments.url()}
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
                            <button
                                type="button"
                                aria-label="Simpan"
                                className="flex size-9 items-center justify-center rounded-lg transition hover:bg-[#F1F5F8] active:scale-95"
                            >
                                <Save size={22} strokeWidth={2.1} />
                            </button>
                            <button
                                type="button"
                                aria-label="Menu"
                                className="flex size-9 items-center justify-center rounded-lg transition hover:bg-[#F1F5F8] active:scale-95"
                            >
                                <MoreVertical size={22} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-4xl px-4 pt-4 pb-6 sm:px-6 sm:pt-6">
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
                        {activeAspect?.questions.map((question, index) => (
                            <QuestionCard
                                key={question.id}
                                aspect={activeAspect.name}
                                question={question}
                                questionNumber={currentStartNumber + index + 1}
                                selectedOptionId={selectedOptions[question.id]}
                                onSelectOption={(optionId) =>
                                    selectOption(question.id, optionId)
                                }
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

                    <section className="rounded-b-3xl bg-white px-4 pb-5 sm:px-6">
                        <div className="border-t border-[#EFEFEF] pt-5">
                            <SectionTitle title="Informasi survey" />

                            <div className="mt-3 grid gap-2.5 text-sm">
                                {[
                                    ['Template', template.title],
                                    ['Status template', template.status ?? '-'],
                                    ['Published at', template.published_at],
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
                            disabled={!hasAspects || activeAspectIndex === 0}
                            onClick={previousAspect}
                            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            <ArrowLeft size={20} strokeWidth={2.2} />
                            Sebelumnya
                        </button>

                        <button
                            type="button"
                            className="h-11 rounded-xl px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98]"
                        >
                            Simpan Draft
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
