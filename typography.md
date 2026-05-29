# TYPOGRAPHY.md — BCA Sans

Panduan typography ini dibuat untuk menjaga konsistensi tampilan antarmuka web yang terinspirasi dari design system BCA.co.id, dengan penyesuaian utama: font menggunakan **BCA Sans** sebagai typeface utama.

> Catatan: Referensi ukuran font mengikuti struktur Type Stack BCA.co.id, namun nama font diubah dari Open Sans menjadi **BCA Sans** sesuai kebutuhan project.

---

## 1. Typography Principle

Typography harus terasa:

- Clean dan profesional
- Mudah dibaca di desktop dan mobile
- Modern, corporate, dan terpercaya
- Konsisten untuk dashboard, landing page, form, tabel, dan komponen UI
- Tidak terlalu dekoratif agar tetap sesuai dengan karakter enterprise/CSR/financial-style platform

Gunakan typography untuk membangun hierarchy visual yang jelas antara judul utama, section title, body text, helper text, warning, dan link.

---

## 2. Font Family

### Primary Font

```css
font-family: "BCA Sans", "Open Sans", Arial, sans-serif;
```

### Fallback Font

Jika **BCA Sans** belum tersedia di environment development atau production, gunakan fallback berikut:

```css
font-family: "Open Sans", Arial, Helvetica, sans-serif;
```

### Font Loading Recommendation

Jika file font BCA Sans tersedia secara legal untuk project internal, load menggunakan `@font-face`:

```css
@font-face {
  font-family: "BCA Sans";
  src: url("/fonts/BCASans-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "BCA Sans";
  src: url("/fonts/BCASans-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "BCA Sans";
  src: url("/fonts/BCASans-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

> Jangan gunakan font file tanpa lisensi yang jelas. Jika BCA Sans tidak tersedia untuk publik, gunakan Open Sans atau Inter sebagai fallback aman.

---

## 3. Desktop Type Scale

| Token | Usage | Font Size | Line Height | Weight | Letter Spacing |
|---|---:|---:|---:|---:|---:|
| `text-hero` | Hero headline, landing page headline | 56px | 64px | 700 | -0.02em |
| `text-title` | Page title, major section title | 32px | 40px | 700 | -0.01em |
| `text-subtitle` | Section subtitle, card headline besar | 24px | 32px | 600 | -0.01em |
| `text-paragraph` | Lead paragraph, intro text | 18px | 30px | 400 | 0em |
| `text-body` | Body text, table content, form label | 16px | 24px | 400 | 0em |
| `text-small` | Helper text, metadata, secondary text | 14px | 20px | 400 | 0em |
| `text-micro` | Caption, badge text, tiny note | 12px | 16px | 400 | 0.01em |

---

## 4. Mobile Type Scale

Untuk mobile, ukuran desktop perlu diturunkan agar tetap nyaman dibaca dan tidak membuat layout terasa penuh.

| Token | Usage | Font Size | Line Height | Weight |
|---|---:|---:|---:|---:|
| `text-hero-mobile` | Mobile hero headline | 36px | 44px | 700 |
| `text-title-mobile` | Mobile page title | 28px | 36px | 700 |
| `text-subtitle-mobile` | Mobile section title | 22px | 30px | 600 |
| `text-paragraph-mobile` | Mobile lead paragraph | 17px | 28px | 400 |
| `text-body-mobile` | Mobile body text | 16px | 24px | 400 |
| `text-small-mobile` | Mobile helper text | 14px | 20px | 400 |
| `text-micro-mobile` | Mobile caption | 12px | 16px | 400 |

---

## 5. Special Text Styles

Mengikuti struktur special text pada referensi BCA, gunakan ukuran kecil untuk teks fungsional seperti link, warning, dan confirmation.

| Token | Usage | Font Size | Line Height | Weight | Recommended Color |
|---|---:|---:|---:|---:|---:|
| `text-link` | Text link, inline CTA | 12px | 16px | 600 | `#0066AE` |
| `text-warning` | Warning message, validation warning | 12px | 16px | 600 | `#D81313` |
| `text-confirmation` | Success/confirmation text | 12px | 16px | 600 | `#00893D` |
| `text-label` | Form label | 14px | 20px | 600 | `#303030` |
| `text-placeholder` | Input placeholder | 14px | 20px | 400 | `#7C7C7C` |
| `text-table-header` | Table column header | 13px | 18px | 700 | `#303030` |
| `text-badge` | Badge/status label | 12px | 16px | 600 | contextual |

---

## 6. Font Weight Usage

Gunakan font weight secara hemat agar desain tetap clean dan tidak terlalu berat.

| Weight | Name | Usage |
|---:|---|---|
| 400 | Regular | Body text, paragraph, description, table cell |
| 500 | Medium | Secondary heading, navigation item, menu text |
| 600 | SemiBold | Card title, button label, form label, link |
| 700 | Bold | Hero, page title, high-priority heading |

### Rule of Thumb

- Gunakan `400` untuk mayoritas teks.
- Gunakan `600` untuk elemen yang butuh emphasis.
- Gunakan `700` hanya untuk headline utama.
- Hindari terlalu banyak teks bold dalam satu section.

---

## 7. Recommended Text Colors

| Token | Color | Usage |
|---|---|---|
| `text-primary` | `#303030` | Heading dan body utama |
| `text-secondary` | `#7C7C7C` | Deskripsi, helper text, metadata |
| `text-muted` | `#B0B0B0` | Disabled text, placeholder ringan |
| `text-inverse` | `#FFFFFF` | Text di atas background biru/gelap |
| `text-brand` | `#0066AE` | Link, active state, brand text |
| `text-info` | `#2FA6FC` | Informasi ringan |
| `text-danger` | `#D81313` | Error/warning |
| `text-success` | `#00893D` | Success/confirmation |

---

## 8. Heading Guidelines

### Hero Heading

Gunakan untuk halaman marketing atau public-facing page.

```css
.hero-title {
  font-family: "BCA Sans", "Open Sans", Arial, sans-serif;
  font-size: 56px;
  line-height: 64px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #303030;
}
```

### Page Title

Gunakan untuk judul halaman dashboard/admin.

```css
.page-title {
  font-family: "BCA Sans", "Open Sans", Arial, sans-serif;
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #303030;
}
```

### Section Title

```css
.section-title {
  font-family: "BCA Sans", "Open Sans", Arial, sans-serif;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #303030;
}
```

### Body Text

```css
.body-text {
  font-family: "BCA Sans", "Open Sans", Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #303030;
}
```

---

## 9. UI Component Typography

### Button

```css
.button-label {
  font-family: "BCA Sans", "Open Sans", Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: 0em;
}
```

Rules:

- Gunakan sentence case, bukan uppercase penuh.
- Label harus menjelaskan aksi: `Simpan`, `Lihat Detail`, `Ajukan Review`, `Arsipkan Desa`.
- Hindari label terlalu panjang.

### Input Label

```css
.input-label {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #303030;
}
```

### Input Text

```css
.input-text {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #303030;
}
```

### Helper Text

```css
.helper-text {
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #7C7C7C;
}
```

### Table Header

```css
.table-header {
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  color: #303030;
}
```

### Table Cell

```css
.table-cell {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #303030;
}
```

### Sidebar Navigation

```css
.sidebar-nav {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}

.sidebar-nav-active {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}
```

---

## 10. Tailwind CSS Configuration

Tambahkan konfigurasi berikut pada `tailwind.config.ts`.

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["BCA Sans", "Open Sans", "Arial", "sans-serif"],
        bca: ["BCA Sans", "Open Sans", "Arial", "sans-serif"],
      },
      fontSize: {
        hero: ["56px", { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "700" }],
        title: ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        subtitle: ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        paragraph: ["18px", { lineHeight: "30px", fontWeight: "400" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        small: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        micro: ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "400" }],
      },
      colors: {
        bca: {
          blue100: "#F1F5F8",
          blue200: "#AAD2F8",
          blue300: "#63ACF2",
          blue400: "#2FA6FC",
          blue500: "#0066AE",
          blue700: "#093967",
          blue900: "#031120",
        },
        ink: {
          primary: "#303030",
          secondary: "#7C7C7C",
          muted: "#B0B0B0",
        },
        system: {
          danger: "#D81313",
          success: "#00893D",
        },
      },
    },
  },
};

export default config;
```

---

## 11. CSS Variables

Untuk project yang menggunakan design token atau shadcn/ui, definisikan typography dengan CSS variables.

```css
:root {
  --font-bca: "BCA Sans", "Open Sans", Arial, sans-serif;

  --text-hero-size: 56px;
  --text-hero-line-height: 64px;
  --text-hero-weight: 700;

  --text-title-size: 32px;
  --text-title-line-height: 40px;
  --text-title-weight: 700;

  --text-subtitle-size: 24px;
  --text-subtitle-line-height: 32px;
  --text-subtitle-weight: 600;

  --text-paragraph-size: 18px;
  --text-paragraph-line-height: 30px;
  --text-paragraph-weight: 400;

  --text-body-size: 16px;
  --text-body-line-height: 24px;
  --text-body-weight: 400;

  --text-small-size: 14px;
  --text-small-line-height: 20px;
  --text-small-weight: 400;

  --text-micro-size: 12px;
  --text-micro-line-height: 16px;
  --text-micro-weight: 400;
}
```

---

## 12. shadcn/ui Usage Recommendation

Gunakan class utility yang konsisten agar seluruh halaman terasa satu system.

### Page Header

```tsx
<div className="space-y-2">
  <h1 className="font-bca text-title text-ink-primary">
    Daftar Desa Wisata
  </h1>
  <p className="font-bca text-body text-ink-secondary">
    Kelola data desa wisata, status kurasi, lokasi, dan informasi profil desa.
  </p>
</div>
```

### Card Title

```tsx
<CardHeader>
  <CardTitle className="font-bca text-subtitle text-ink-primary">
    Ringkasan Survey
  </CardTitle>
  <CardDescription className="font-bca text-small text-ink-secondary">
    Pantau progress pengisian survey setiap desa wisata.
  </CardDescription>
</CardHeader>
```

### Form Label

```tsx
<Label className="font-bca text-sm font-semibold text-ink-primary">
  Nama Desa Wisata
</Label>
```

### Helper Text

```tsx
<p className="font-bca text-micro text-ink-secondary">
  Masukkan nama resmi desa wisata sesuai data administrasi.
</p>
```

---

## 13. Accessibility Guidelines

- Body text minimal 16px untuk konten utama.
- Hindari paragraph yang terlalu panjang; gunakan line-height 24px–30px.
- Pastikan contrast teks memenuhi standar keterbacaan.
- Jangan menggunakan warna biru saja untuk membedakan link; tambahkan underline pada hover/focus.
- Gunakan heading secara berurutan: `h1`, `h2`, `h3`, bukan hanya berdasarkan ukuran visual.
- Untuk dashboard, hindari heading terlalu besar agar area kerja tetap efisien.

---

## 14. Do and Don't

### Do

- Gunakan BCA Sans secara konsisten.
- Gunakan hierarchy yang jelas: hero > title > subtitle > body > small > micro.
- Gunakan weight 600 untuk emphasis secukupnya.
- Gunakan warna teks utama `#303030` untuk keterbacaan.
- Gunakan warna brand `#0066AE` untuk link dan active state.

### Don't

- Jangan mencampur terlalu banyak font family.
- Jangan memakai heading bold besar di semua card.
- Jangan menggunakan uppercase untuk semua tombol atau heading.
- Jangan menggunakan font size di bawah 12px untuk informasi penting.
- Jangan menggunakan warna abu-abu terlalu terang untuk body text.

---

## 15. Recommended Implementation Pattern

Untuk project Laravel Inertia React TypeScript + Tailwind + shadcn/ui:

1. Definisikan `fontFamily.bca` di `tailwind.config.ts`.
2. Set `body` menggunakan `font-bca`.
3. Buat reusable component untuk heading, page title, section title, dan helper text.
4. Hindari inline style untuk font size.
5. Gunakan typography token yang sama di semua halaman admin dan public page.

Contoh global CSS:

```css
body {
  font-family: "BCA Sans", "Open Sans", Arial, sans-serif;
  color: #303030;
  background-color: #ffffff;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 16. Typography Summary

| Level | Desktop | Mobile | Weight | Common Usage |
|---|---:|---:|---:|---|
| Hero | 56/64 | 36/44 | 700 | Landing hero |
| Title | 32/40 | 28/36 | 700 | Page title |
| Subtitle | 24/32 | 22/30 | 600 | Section title |
| Paragraph | 18/30 | 17/28 | 400 | Intro paragraph |
| Body | 16/24 | 16/24 | 400 | Main content |
| Small | 14/20 | 14/20 | 400 | Helper, metadata |
| Micro | 12/16 | 12/16 | 400/600 | Caption, status, validation |

---

## 17. Source Reference

This guide is adapted from the public BCA.co.id design system page: `https://www.bca.co.id/id/Icon-system-bcacoid`, specifically the Type Stack section that defines text hierarchy for Hero, Title, Subtitle, Paragraph, Body, Small, Micro, and special text styles.
