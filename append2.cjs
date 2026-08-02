const fs = require('fs');
fs.appendFileSync('resources/css/app.css', `
@layer components {
    .rich-text-content p { margin-bottom: 0.5em; }
    .rich-text-content strong { font-weight: bold; }
    .rich-text-content em { font-style: italic; }
    .rich-text-content u { text-decoration: underline; }
    .rich-text-content s { text-decoration: line-through; }
    .rich-text-content ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 0.5em; }
    .rich-text-content ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 0.5em; }
    .rich-text-content li { margin-bottom: 0.25em; }
    .rich-text-content h1 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; }
    .rich-text-content h2 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; }
    .rich-text-content h3 { font-size: 1.17em; font-weight: bold; margin-bottom: 0.5em; }
    .rich-text-content a { color: #0066AE; text-decoration: underline; }
}
`);
