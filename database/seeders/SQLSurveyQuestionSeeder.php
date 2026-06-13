<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use RuntimeException;

class SQLSurveyQuestionSeeder extends Seeder
{
    /**
     * @var list<string>
     */
    private array $importOrder = [
        'survey_templates',
        'survey_questions',
        'survey_question_options',
        'umkm_survey_questions',
        'pariwisata_survey_questions',
        'pariwisata_suvey_options',
    ];

    public function run(): void
    {
        $sqlPath = database_path('survey-question.sql');

        if (! is_file($sqlPath)) {
            throw new RuntimeException("SQL source file not found: {$sqlPath}");
        }

        $sql = file_get_contents($sqlPath);

        if ($sql === false) {
            throw new RuntimeException("Unable to read SQL source file: {$sqlPath}");
        }

        $insertStatements = $this->extractInsertStatements($sql);

        if ($insertStatements === []) {
            throw new RuntimeException("No INSERT statements found in SQL source file: {$sqlPath}");
        }

        DB::transaction(function () use ($insertStatements): void {
            $this->ensureSqlSeederUser();
            $this->resetQuestionTables();

            foreach ($insertStatements as $statement) {
                DB::unprepared($this->normalizeStatement($statement));
            }
        });
    }

    /**
     * @return list<string>
     */
    private function extractInsertStatements(string $sql): array
    {
        $statements = [];
        $currentStatement = '';
        $capturing = false;
        $inString = false;
        $length = strlen($sql);

        for ($index = 0; $index < $length; $index++) {
            $character = $sql[$index];
            $nextCharacter = $index + 1 < $length ? $sql[$index + 1] : null;

            if (! $capturing) {
                if (strncasecmp(substr($sql, $index, 11), 'INSERT INTO', 11) !== 0) {
                    continue;
                }

                $capturing = true;
                $currentStatement = 'INSERT INTO';
                $index += 10;

                continue;
            }

            $currentStatement .= $character;

            if ($character === "'" && ! $this->isEscaped($currentStatement)) {
                if ($inString && $nextCharacter === "'") {
                    $currentStatement .= $nextCharacter;
                    $index++;

                    continue;
                }

                $inString = ! $inString;

                continue;
            }

            if (! $inString && $character === ';') {
                $statements[] = trim($currentStatement);
                $currentStatement = '';
                $capturing = false;
            }
        }

        return $this->sortStatementsByDependency($statements);
    }

    private function isEscaped(string $value): bool
    {
        $backslashCount = 0;
        $index = strlen($value) - 2;

        while ($index >= 0 && $value[$index] === '\\') {
            $backslashCount++;
            $index--;
        }

        return $backslashCount % 2 === 1;
    }

    private function normalizeStatement(string $statement): string
    {
        if (DB::getDriverName() !== 'sqlite') {
            return $statement;
        }

        return str_replace("\\'", "''", $statement);
    }

    /**
     * @param  list<string>  $statements
     * @return list<string>
     */
    private function sortStatementsByDependency(array $statements): array
    {
        $groupedStatements = [];
        $remainingStatements = [];

        foreach ($statements as $statement) {
            if (! preg_match('/INSERT INTO\s+`(?<table>[^`]+)`/i', $statement, $matches)) {
                $remainingStatements[] = $statement;

                continue;
            }

            $table = $matches['table'];

            if (! in_array($table, $this->importOrder, true)) {
                $remainingStatements[] = $statement;

                continue;
            }

            $groupedStatements[$table][] = $statement;
        }

        $orderedStatements = [];

        foreach ($this->importOrder as $table) {
            foreach ($groupedStatements[$table] ?? [] as $statement) {
                $orderedStatements[] = $statement;
            }
        }

        return [...$orderedStatements, ...$remainingStatements];
    }

    private function ensureSqlSeederUser(): void
    {
        DB::table('users')->updateOrInsert(
            ['id' => 3],
            [
                'name' => 'Admin SQL Seeder',
                'email' => 'admin-sql-seeder@desa-wisata-bca.test',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ],
        );
    }

    private function resetQuestionTables(): void
    {
        Schema::disableForeignKeyConstraints();

        try {
            DB::table('pariwisata_survey_answer_documents')->delete();
            DB::table('pariwisata_survey_answers')->delete();
            DB::table('umkm_survey_answers')->delete();
            DB::table('survey_answer_documents')->delete();
            DB::table('survey_answer_histories')->delete();
            DB::table('survey_answers')->delete();
            DB::table('village_survey_assignment_logs')->delete();
            DB::table('village_survey_assignments')->delete();
            DB::table('pariwisata_suvey_options')->delete();
            DB::table('pariwisata_survey_questions')->delete();
            DB::table('survey_question_options')->delete();
            DB::table('survey_questions')->delete();
            DB::table('umkm_survey_questions')->delete();
            DB::table('survey_templates')->delete();
        } finally {
            Schema::enableForeignKeyConstraints();
        }
    }
}
