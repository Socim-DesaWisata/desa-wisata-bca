const fs = require('fs');

function refactorFile(path, isPariwisata) {
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

  // 3. Update DocumentBadge signature and usage
  code = code.replace(
    /function DocumentBadge\(\{ document \}: \{ document: SurveyDocument \}\) \{/,
    "function DocumentBadge({ document, assignmentId }: { document: SurveyDocument, assignmentId: number }) {"
  );
  
  const updateUrl = isPariwisata 
    ? 'updatePariwisataSurveyDocument.url({ assignment: assignmentId, document: document.id })'
    : 'updateSurveyDocument.url({ assignment: assignmentId, document: document.id })';

  code = code.replace(
    /<p className="truncate text-xs font-bold text-\[\#303030\]">\s*\{document\.file_name\}\s*<\/p>/,
    `<EditableFileName
                    fileName={document.file_name}
                    updateUrl={${updateUrl}}
                    className="text-xs font-bold text-[#303030]"
                />`
  );

  // 4. Update QuestionRow
  code = code.replace(
    /function QuestionRow\(\{\n    question,\n    number,\n    onViewDetail,\n    onViewHistory,\n    onEditData,\n    isViewer,\n\}: \{/g,
    "function QuestionRow({\n    question,\n    number,\n    onViewDetail,\n    onViewHistory,\n    onEditData,\n    isViewer,\n    assignmentId,\n}: {"
  );
  code = code.replace(
    /isViewer: boolean;\n\}\)/g,
    "isViewer: boolean;\n    assignmentId: number;\n})"
  );
  code = code.replace(
    /<DocumentBadge key=\{document\.id\} document=\{document\} \/>/g,
    "<DocumentBadge key={document.id} document={document} assignmentId={assignmentId} />"
  );
  code = code.replace(
    /<QuestionRow\n                                                        key=\{question\.id\}/g,
    "<QuestionRow\n                                                        key={question.id}\n                                                        assignmentId={assignment.id}"
  );

  // 5. Update PariwisataQuestionRow
  code = code.replace(
    /function PariwisataQuestionRow\(\{\n    question,\n    number,\n    onViewDetail,\n    onViewHistory,\n    onEditData,\n    isViewer,\n\}: \{/g,
    "function PariwisataQuestionRow({\n    question,\n    number,\n    onViewDetail,\n    onViewHistory,\n    onEditData,\n    isViewer,\n    assignmentId,\n}: {"
  );
  code = code.replace(
    /<PariwisataQuestionRow\n                                    key=\{question\.id\}/g,
    "<PariwisataQuestionRow\n                                    key={question.id}\n                                    assignmentId={assignment.id}"
  );

  // 6. Update Modals
  code = code.replace(
    /function PariwisataAnswerDetailModal\(\{\n    question,\n    open,\n    onOpenChange,\n\}: \{/g,
    "function PariwisataAnswerDetailModal({\n    question,\n    open,\n    onOpenChange,\n    assignmentId,\n}: {"
  );
  code = code.replace(
    /onOpenChange: \(open: boolean\) => void;\n\}\)/g,
    "onOpenChange: (open: boolean) => void;\n    assignmentId: number;\n})"
  );

  code = code.replace(
    /function PariwisataAnswerEditModal\(\{\n    question,\n    open,\n    onOpenChange,\n\}: \{/g,
    "function PariwisataAnswerEditModal({\n    question,\n    open,\n    onOpenChange,\n    assignmentId,\n}: {"
  );

  code = code.replace(
    /function AnswerDetailModal\(\{\n    question,\n    open,\n    onOpenChange,\n\}: \{/g,
    "function AnswerDetailModal({\n    question,\n    open,\n    onOpenChange,\n    assignmentId,\n}: {"
  );
  code = code.replace(
    /function SurveyAnswerEditModal\(\{\n    question,\n    open,\n    onOpenChange,\n\}: \{/g,
    "function SurveyAnswerEditModal({\n    question,\n    open,\n    onOpenChange,\n    assignmentId,\n}: {"
  );

  // Add assignmentId to modal renders
  code = code.replace(
    /<PariwisataAnswerDetailModal\n                                    question=\{selectedQuestion!\}\n                                    open=\{showDetailModal\}/g,
    "<PariwisataAnswerDetailModal\n                                    question={selectedQuestion!}\n                                    open={showDetailModal}\n                                    assignmentId={assignment.id}"
  );
  code = code.replace(
    /<PariwisataAnswerEditModal\n                                    question=\{selectedQuestion!\}\n                                    open=\{showEditModal\}/g,
    "<PariwisataAnswerEditModal\n                                    question={selectedQuestion!}\n                                    open={showEditModal}\n                                    assignmentId={assignment.id}"
  );
  code = code.replace(
    /<AnswerDetailModal\n                                    question=\{selectedQuestion!\}\n                                    open=\{showDetailModal\}/g,
    "<AnswerDetailModal\n                                    question={selectedQuestion!}\n                                    open={showDetailModal}\n                                    assignmentId={assignment.id}"
  );

  fs.writeFileSync(path, code);
}

refactorFile('resources/js/pages/survey-assignment/show.tsx', false);
refactorFile('resources/js/pages/survey-assignment/show-pariwisata.tsx', true);
