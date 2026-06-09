import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/lib/utils';

export type ChartConfig = Record<
    string,
    {
        label?: React.ReactNode;
        color?: string;
    }
>;

type ChartContextValue = {
    config: ChartConfig;
};

type TooltipPayloadItem = {
    color?: string;
    dataKey?: string | number;
    name?: string | number;
    value?: string | number;
};

type LegendPayloadItem = {
    color?: string;
    dataKey?: string | number;
    value?: string | number;
};

type ChartTooltipContentProps = {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: React.ReactNode;
    hideLabel?: boolean;
    valueFormatter?: (value: number, key: string) => React.ReactNode;
    labelFormatter?: (label: React.ReactNode) => React.ReactNode;
    className?: string;
};

type ChartLegendContentProps = {
    payload?: LegendPayloadItem[];
    className?: string;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
    const context = React.useContext(ChartContext);

    if (!context) {
        throw new Error('useChart must be used within a <ChartContainer />');
    }

    return context;
}

function ChartContainer({
    id,
    className,
    children,
    config,
}: React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<
        typeof RechartsPrimitive.ResponsiveContainer
    >['children'];
}) {
    const chartId = React.useId().replace(/:/g, '');
    const resolvedId = `chart-${id ?? chartId}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-slot="chart"
                data-chart={resolvedId}
                className={cn(
                    'flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-[#8A97A8] [&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-[#E7ECF2] [&_.recharts-curve.recharts-tooltip-cursor]:stroke-[#DDE4EC] [&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-[#E7ECF2] [&_.recharts-reference-line_[stroke="#ccc"]]:stroke-[#DDE4EC]',
                    className,
                )}
            >
                <ChartStyle id={resolvedId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
}

function ChartStyle({
    id,
    config,
}: {
    id: string;
    config: ChartConfig;
}) {
    const colorConfig = Object.entries(config).filter(
        ([, value]) => value.color,
    );

    if (colorConfig.length === 0) {
        return null;
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `[data-chart=${id}] {${colorConfig
                    .map(
                        ([key, value]) => `--color-${key}: ${value.color};`,
                    )
                    .join('')}}`,
            }}
        />
    );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
    active,
    payload,
    label,
    hideLabel = false,
    valueFormatter,
    labelFormatter,
    className,
}: ChartTooltipContentProps) {
    const { config } = useChart();

    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div
            className={cn(
                'rounded-xl border border-[#E7ECF2] bg-white px-3 py-2.5 shadow-[0_10px_25px_rgba(15,23,42,0.08)]',
                className,
            )}
        >
            {!hideLabel && label !== undefined && (
                <p className="mb-2 text-xs font-bold text-[#344256]">
                    {labelFormatter ? labelFormatter(label) : label}
                </p>
            )}
            <div className="space-y-1.5">
                {payload.map((item) => {
                    const key = String(item.dataKey ?? item.name ?? 'value');
                    const color = item.color ?? `var(--color-${key})`;
                    const labelValue = config[key]?.label ?? item.name ?? key;

                    return (
                        <div
                            key={key}
                            className="flex items-center justify-between gap-4"
                        >
                            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#566579]">
                                <span
                                    className="size-2.5 rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                                {labelValue}
                            </span>
                            <span className="text-xs font-bold text-[#172033]">
                                {valueFormatter
                                    ? valueFormatter(Number(item.value ?? 0), key)
                                    : item.value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({ payload, className }: ChartLegendContentProps) {
    const { config } = useChart();

    if (!payload?.length) {
        return null;
    }

    return (
        <div className={cn('flex flex-wrap items-center gap-4', className)}>
            {payload.map((item) => {
                const key = String(item.dataKey ?? item.value ?? 'value');
                const color = item.color ?? `var(--color-${key})`;
                const labelValue = config[key]?.label ?? item.value ?? key;

                return (
                    <div
                        key={key}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#566579]"
                    >
                        <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                        {labelValue}
                    </div>
                );
            })}
        </div>
    );
}

export {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
};
