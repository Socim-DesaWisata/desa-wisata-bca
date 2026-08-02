const fs = require('fs');
fs.appendFileSync('resources/css/app.css', `
@layer components {
    .rich-text-editor .quill {
        @apply w-full rounded-lg border border-[#DDE4EC] bg-white text-sm leading-5 text-[#303030] transition focus-within:border-[#2FA6FC] focus-within:ring-2 focus-within:ring-[#2FA6FC]/15;
    }
    .rich-text-editor.has-error .quill {
        @apply border-red-500 focus-within:border-red-500 focus-within:ring-red-500/15;
    }
    .rich-text-editor .ql-toolbar.ql-snow {
        @apply rounded-t-lg border-0 border-b border-[#DDE4EC] bg-[#F7F7F7] px-3 py-2;
    }
    .rich-text-editor .ql-container.ql-snow {
        @apply rounded-b-lg border-0 min-h-24 text-sm leading-5;
    }
    .rich-text-editor .ql-editor {
        @apply min-h-24 px-3 py-2;
    }
    .rich-text-editor .ql-editor.ql-blank::before {
        @apply text-[#7C7C7C] font-normal not-italic left-3;
    }
}
`);
