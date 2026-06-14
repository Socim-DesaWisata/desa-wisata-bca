<?php

namespace Database\Seeders\Concerns;

use PhpOffice\PhpSpreadsheet\IOFactory;
use RuntimeException;

trait ReadsExcelWorksheetRows
{
    /**
     * @param  list<string>  $requiredHeaders
     * @return list<array<string, mixed>>
     */
    protected function readWorksheetRows(string $relativePath, array $requiredHeaders): array
    {
        $filePath = database_path($relativePath);

        if (! is_file($filePath)) {
            throw new RuntimeException("Excel source file not found: {$filePath}");
        }

        $rows = IOFactory::load($filePath)->getSheet(0)->toArray(null, true, true, false);
        $header = array_shift($rows);

        if (! is_array($header)) {
            throw new RuntimeException("Excel source file has no header row: {$filePath}");
        }

        $header = array_map(
            fn ($value): string => trim((string) ($value ?? '')),
            $header,
        );

        $missingHeaders = array_values(array_diff($requiredHeaders, $header));

        if ($missingHeaders !== []) {
            throw new RuntimeException(
                'Excel source file is missing required headers: '.implode(', ', $missingHeaders),
            );
        }

        $mappedRows = [];

        foreach ($rows as $row) {
            if (! is_array($row)) {
                continue;
            }

            $row = array_pad($row, count($header), null);
            $mappedRow = array_combine($header, array_slice($row, 0, count($header)));

            if (! is_array($mappedRow)) {
                continue;
            }

            $mappedRow = array_map(function ($value) {
                if (is_string($value)) {
                    $value = trim($value);

                    return $value === '' ? null : $value;
                }

                return $value;
            }, $mappedRow);

            $hasValue = collect($mappedRow)->contains(fn ($value) => $value !== null && $value !== '');

            if (! $hasValue) {
                continue;
            }

            $mappedRows[] = $mappedRow;
        }

        return $mappedRows;
    }

    protected function stringValue(mixed $value): string
    {
        return trim((string) ($value ?? ''));
    }

    protected function nullableStringValue(mixed $value): ?string
    {
        $value = trim((string) ($value ?? ''));

        return $value === '' ? null : $value;
    }

    protected function intValue(mixed $value, int $fallback = 0): int
    {
        if ($value === null || $value === '') {
            return $fallback;
        }

        return (int) $value;
    }

    protected function floatValue(mixed $value, float $fallback = 0): float
    {
        if ($value === null || $value === '') {
            return $fallback;
        }

        return (float) $value;
    }

    protected function yesNoBoolean(mixed $value): bool
    {
        return strcasecmp($this->stringValue($value), 'Ya') === 0;
    }
}
