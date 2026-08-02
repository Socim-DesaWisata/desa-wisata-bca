const fs = require('fs');
let code = fs.readFileSync('resources/js/pages/villages/edit.tsx', 'utf8');
code = code.replace(
  "import { update as updateVillage } from '@/actions/App/Http/Controllers/TourismVillageController';",
  "import { update as updateVillage } from '@/actions/App/Http/Controllers/TourismVillageController';\nimport { RichTextField } from '@/components/ui/rich-text-field';"
);
fs.writeFileSync('resources/js/pages/villages/edit.tsx', code);
