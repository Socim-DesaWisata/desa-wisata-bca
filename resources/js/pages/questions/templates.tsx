import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CalendarDays,
    ClipboardList,
    FileText,
    Layers3,
} from 'lucide-react';

import { dashboard } from '@/routes';
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

type TemplateIndexProps = {
    templates: TemplateSummary[];
    summary: {
        total_templates: number;
        published_templates: number;
        draft_templates: number;
        total_questions: number;
    };
};

function statusClass(status: string) {
    return status === 'published'
        ? 'bg-[#EAF8F0] text-[#00893D]'
        : 'bg-[#F1F5F8] text-[#303030]';
}

export default function QuestionTemplates({
    templates,
    summary,
}: TemplateIndexProps) {
    const stats = [
        { label: 'Total Template', value: summary.total_templates },
        { label: 'Published', value: summary.published_templates },
        { label: 'Draft', value: summary.draft_templates },
        { label: 'Total Pertanyaan', value: summary.total_questions },
    ];

    return (
        <>
            <Head title="Template Survey" />
            <main className="min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-5 text-[#303030] sm:px-5 lg:px-6">
                <div className="mx-auto max-w-[1500px] space-y-4">
                    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                            <nav className="mb-2 flex items-center gap-2 text-xs font-bold text-[#0066AE]">
                                <span>Dashboard</span>
                                <span className="text-[#7C7C7C]">/</span>
                                <span className="text-[#7C7C7C]">
                                    Template Survey
                                </span>
                            </nav>
                            <h1 className="text-[26px] leading-8 font-bold tracking-[-0.01em] text-[#303030] md:text-[30px] md:leading-9">
                                Template Survey
                            </h1>
                            <p className="mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]">
                                Pilih template survey untuk melihat dan
                                mengelola daftar pertanyaan assessment.
                            </p>
                        </div>
                    </header>

                    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => (
                            <article
                                key={stat.label}
                                className="rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_14px_rgba(3,17,32,0.05)]"
                            >
                                <p className="text-xs font-semibold text-[#7C7C7C]">
                                    {stat.label}
                                </p>
                                <p className="mt-2 text-2xl font-bold text-[#0066AE]">
                                    {stat.value}
                                </p>
                            </article>
                        ))}
                    </section>

                    <section className="rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)]">
                        <div className="border-b border-[#EFEFEF] px-5 py-4">
                            <h2 className="text-xl leading-7 font-bold text-[#303030]">
                                Daftar Template Survey
                            </h2>
                            <p className="text-sm leading-5 text-[#7C7C7C]">
                                Semua template survey yang tersedia di database.
                            </p>
                        </div>

                        <div className="grid gap-3 p-4 lg:grid-cols-2 xl:grid-cols-3">
                            {templates.map((template) => (
                                <article
                                    key={template.id}
                                    className="flex min-h-[220px] flex-col rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_12px_rgba(3,17,32,0.04)]"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE]">
                                            <ClipboardList className="size-5" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="line-clamp-2 text-base leading-6 font-bold text-[#303030]">
                                                    {template.title}
                                                </h3>
                                                <span
                                                    className={`inline-flex h-6 items-center rounded-md px-2 text-[11px] font-semibold ${statusClass(template.status)}`}
                                                >
                                                    {template.status}
                                                </span>
                                                <span className="inline-flex h-6 items-center rounded-md bg-[#EAF3FF] px-2 text-[11px] font-bold text-[#0066AE]">
                                                    {template.type_label}
                                                </span>
                                            </div>
                                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#7C7C7C]">
                                                {template.description ??
                                                    'Tidak ada deskripsi template.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        <div className="rounded-lg bg-[#F7F7F7] px-3 py-2">
                                            <FileText className="mb-1 size-4 text-[#0066AE]" />
                                            <p className="text-xs font-bold text-[#303030]">
                                                {template.questions_count}
                                            </p>
                                            <p className="text-[10px] font-semibold text-[#7C7C7C]">
                                                Pertanyaan
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-[#F7F7F7] px-3 py-2">
                                            <Layers3 className="mb-1 size-4 text-[#0066AE]" />
                                            <p className="text-xs font-bold text-[#303030]">
                                                {template.aspects_count}
                                            </p>
                                            <p className="text-[10px] font-semibold text-[#7C7C7C]">
                                                Aspek
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-[#F7F7F7] px-3 py-2">
                                            <CalendarDays className="mb-1 size-4 text-[#0066AE]" />
                                            <p className="truncate text-xs font-bold text-[#303030]">
                                                {template.updated_at ?? '-'}
                                            </p>
                                            <p className="text-[10px] font-semibold text-[#7C7C7C]">
                                                Update
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4">
                                        <Link
                                            href={showQuestionTemplate.url(
                                                template.id,
                                            )}
                                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white transition hover:bg-[#093967]"
                                        >
                                            Lihat Detail
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {templates.length === 0 && (
                            <div className="px-6 py-14 text-center">
                                <p className="text-sm font-bold text-[#303030]">
                                    Belum ada template survey.
                                </p>
                                <p className="mt-1 text-xs text-[#7C7C7C]">
                                    Data template survey akan muncul setelah
                                    seeder atau input data tersedia.
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}

QuestionTemplates.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Template Survey', href: '/questions' },
    ],
};
