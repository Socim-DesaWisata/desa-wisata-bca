const fs = require('fs');

let path = 'resources/js/pages/survey-assignment/show-pariwisata.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Add EditableFileName import
code = code.replace(/import \{ ToggleGroup, ToggleGroupItem \} from '@\/components\/ui\/toggle-group';/, "import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';\nimport { EditableFileName } from '@/components/editable-filename';");

// 2. Add update url import
code = code.replace(
  /import \{ store as storePariwisataSurveyDraft \} from '@\/routes\/survey-assignments\/pariwisata\/take-survey';/,
  "import { store as storePariwisataSurveyDraft } from '@/routes/survey-assignments/pariwisata/take-survey';\nimport { update as updatePariwisataSurveyDocument } from '@/routes/survey-assignments/pariwisata/take-survey/documents';"
);

// 3. Update DocumentBadge to use usePage
code = code.replace(
  /function DocumentBadge\(\{ document \}: \{ document: SurveyDocument \}\) \{/,
  "function DocumentBadge({ document }: { document: SurveyDocument }) {\n    const { assignment } = usePage<any>().props;"
);

const updateUrl = 'updatePariwisataSurveyDocument.url({ assignment: assignment.id, document: document.id })';

code = code.replace(
  /<p className="truncate text-xs font-bold text-\[\#303030\]">\s*\{document\.file_name\}\s*<\/p>/,
  `<EditableFileName
                    fileName={document.file_name}
                    updateUrl={${updateUrl}}
                    className="text-xs font-bold text-[#303030]"
                />`
);

fs.writeFileSync(path, code);
