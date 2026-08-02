const fs = require('fs');

function refactorShowFiles(path, isPariwisata) {
  let code = fs.readFileSync(path, 'utf8');

  // 1. Add EditableFileName import
  code = code.replace(/import \{ useEffect, useMemo, useState \} from 'react';/, "import { EditableFileName } from '@/components/editable-filename';\nimport { useEffect, useMemo, useState } from 'react';");
  code = code.replace(/import \{ ToggleGroup, ToggleGroupItem \} from '@\/components\/ui\/toggle-group';/, "import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';\nimport { EditableFileName } from '@/components/editable-filename';");

  // 2. Add update url import
  if (isPariwisata) {
    code = code.replace(
      /import \{ destroy as destroyPariwisataSurveyDocument \} from '@\/routes\/survey-assignments\/pariwisata\/take-survey\/documents';/,
      "import { destroy as destroyPariwisataSurveyDocument, update as updatePariwisataSurveyDocument } from '@/routes/survey-assignments/pariwisata/take-survey/documents';"
    );
  } else {
    code = code.replace(
      /import \{ destroy as destroySurveyDocument \} from '@\/routes\/survey-assignments\/take-survey\/documents';/,
      "import { destroy as destroySurveyDocument, update as updateSurveyDocument } from '@/routes/survey-assignments/take-survey/documents';"
    );
  }

  // 3. Update DocumentBadge to use usePage
  code = code.replace(
    /function DocumentBadge\(\{ document \}: \{ document: SurveyDocument \}\) \{/,
    "function DocumentBadge({ document }: { document: SurveyDocument }) {\n    const { assignment } = usePage<any>().props;"
  );
  
  const updateUrl = isPariwisata 
    ? 'updatePariwisataSurveyDocument.url({ assignment: assignment.id, document: document.id })'
    : 'updateSurveyDocument.url({ assignment: assignment.id, document: document.id })';

  code = code.replace(
    /<p className="truncate text-xs font-bold text-\[\#303030\]">\s*\{document\.file_name\}\s*<\/p>/,
    `<EditableFileName
                    fileName={document.file_name}
                    updateUrl={${updateUrl}}
                    className="text-xs font-bold text-[#303030]"
                />`
  );

  fs.writeFileSync(path, code);
}

function refactorTakeSurveyFiles(path, isPariwisata) {
  let code = fs.readFileSync(path, 'utf8');

  // 1. Add EditableFileName and usePage import
  code = code.replace(
    /import \{ Head, Link, router \} from '@inertiajs\/react';/,
    "import { Head, Link, router, usePage } from '@inertiajs/react';"
  );
  code = code.replace(
    /import \{ destroy as destroySurveyDocument \} from '@\/routes\/survey-assignments\/take-survey\/documents';/,
    "import { destroy as destroySurveyDocument, update as updateSurveyDocument } from '@/routes/survey-assignments/take-survey/documents';\nimport { EditableFileName } from '@/components/editable-filename';"
  );
  code = code.replace(
    /import \{ destroy as destroyPariwisataSurveyDocument \} from '@\/routes\/survey-assignments\/pariwisata\/take-survey\/documents';/,
    "import { destroy as destroyPariwisataSurveyDocument, update as updatePariwisataSurveyDocument } from '@/routes/survey-assignments/pariwisata/take-survey/documents';\nimport { EditableFileName } from '@/components/editable-filename';"
  );

  // 2. Update QuestionCard to use usePage
  const questionCardMatch = code.match(/function QuestionCard\(\{[\s\S]*?\}\) \{/);
  if (questionCardMatch) {
    code = code.replace(
      questionCardMatch[0],
      `${questionCardMatch[0]}\n    const { assignment } = usePage<any>().props;`
    );
  }
  
  const updateUrl = isPariwisata 
    ? 'updatePariwisataSurveyDocument.url({ assignment: assignment.id, document: document.id })'
    : 'updateSurveyDocument.url({ assignment: assignment.id, document: document.id })';

  code = code.replace(
    /<span className="min-w-0 flex-1 truncate">\s*\{document\.file_name\}\s*<\/span>/,
    `<EditableFileName
                                fileName={document.file_name}
                                updateUrl={${updateUrl}}
                                className="min-w-0 flex-1 truncate"
                            />`
  );

  fs.writeFileSync(path, code);
}

refactorShowFiles('resources/js/pages/survey-assignment/show.tsx', false);
refactorShowFiles('resources/js/pages/survey-assignment/show-pariwisata.tsx', true);
refactorTakeSurveyFiles('resources/js/pages/survey/take-survey.tsx', false);
refactorTakeSurveyFiles('resources/js/pages/survey-assignment/take-survey-pariwisata.tsx', true);
