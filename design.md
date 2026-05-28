# DESIGN.md — BCA-Inspired Web Design System

> Dokumen ini berisi aturan desain website yang disusun berdasarkan observasi dan referensi publik dari website **BCA.co.id** serta halaman design system/brand assets BCA yang tersedia secara publik. Dokumen ini **bukan brand guideline resmi BCA**. Untuk penggunaan logo, aset, nama, dan identitas BCA secara komersial atau publik, ikuti guideline resmi dan izin dari PT Bank Central Asia Tbk.

---

## 1. Tujuan Desain

Design system ini digunakan sebagai panduan UI untuk website yang ingin memiliki nuansa visual seperti BCA.co.id: modern, profesional, bersih, terpercaya, mudah dibaca, dan ramah untuk pengguna Indonesia.

Untuk project **Desa Wisata BCA / Social Impact CSR Aggregator**, arah desain yang disarankan adalah:

- Terpercaya seperti platform perbankan.
- Bersih dan informatif seperti dashboard korporat.
- Humanis dan optimistis seperti program CSR/social impact.
- Mudah digunakan oleh admin, reviewer, enumerator, dan stakeholder non-teknis.
- Responsif untuk desktop, tablet, dan mobile.

---

## 2. Prinsip Visual Utama

### 2.1 Clean Corporate

Gunakan layout yang rapi, banyak ruang kosong, hierarchy jelas, dan komponen yang tidak terlalu ramai. Hindari tampilan terlalu playful atau terlalu dekoratif.

### 2.2 Trust First

Karena konteksnya dekat dengan institusi finansial dan data CSR, desain harus terasa aman, kredibel, dan stabil.

Aturan:

- Gunakan warna biru sebagai warna dominan.
- Gunakan teks gelap untuk informasi penting.
- Gunakan border dan shadow halus, bukan efek berlebihan.
- Gunakan status warna secara konsisten.
- Gunakan bahasa UI yang jelas, singkat, dan tidak ambigu.

### 2.3 Human & Optimistic

Untuk halaman publik, CSR, atau desa wisata, gunakan foto/ilustrasi yang terasa natural, positif, dan dekat dengan kehidupan sehari-hari.

Aturan:

- Gunakan imagery yang autentik dan relatable.
- Hindari visual yang terlalu artificial atau terlalu luxury.
- Gunakan nuansa biru, putih, abu muda, dan aksen hangat secukupnya.

---

## 3. Brand & Legal Usage

### 3.1 Penggunaan Logo

Logo BCA harus digunakan secara hati-hati.

Aturan:

- Jangan mengubah, mengadaptasi, men-stretch, memotong, atau mentransformasi logo.
- Gunakan logo biru di background putih atau terang.
- Gunakan logo putih di background berwarna/gelap.
- Pastikan logo memiliki clear space yang cukup.
- Jangan menggunakan logo untuk kebutuhan komersial tanpa izin.
- Cantumkan sumber/pemilik aset jika diwajibkan.

### 3.2 Clear Space Logo

Recommended implementation:

- Beri jarak minimal `16px` di sekitar logo kecil.
- Beri jarak minimal `24px–32px` di sekitar logo pada header/hero.
- Jangan menempatkan logo terlalu dekat dengan button, teks padat, atau elemen dekoratif.

### 3.3 Ukuran Logo

Recommended implementation:

| Context | Height |
|---|---:|
| Header desktop | 32–40px |
| Header mobile | 28–32px |
| Footer | 36–48px |
| Login/auth page | 48–64px |
| Splash/empty state | 64–96px |

---

## 4. Color Palette

Warna berikut disusun dari halaman publik design system BCA.co.id.

### 4.1 Primary Colors

| Token | HEX | Usage |
|---|---|---|
| `bca-blue-500` | `#0066AE` | Primary brand, primary button, active nav, link utama |
| `bca-blue-400` | `#2FA6FC` | Hover, highlight, secondary accent |
| `bca-blue-300` | `#63ACF2` | Soft accent, chart, icon background |
| `bca-blue-200` | `#AAD2F8` | Light background, info surface |
| `bca-blue-100` | `#F1F5F8` | Page background, card tint, section surface |

### 4.2 Secondary Blue

| Token | HEX | Usage |
|---|---|---|
| `bca-blue-700` | `#093967` | Dark header/footer, strong emphasis, sidebar |
| `bca-blue-900` | `#031120` | Very dark text/background, footer base |

### 4.3 Accent Colors

| Token | HEX | Usage |
|---|---|---|
| `bca-orange` | `#FF944C` | CTA accent, promo badge, warning-like highlight |
| `bca-tosca` | `#2ECACC` | Secondary accent, subsidiary/product highlight |
| `bca-webform-blue` | `#28B4E8` | Webform/myBCA related accent |

> Catatan: Pada referensi publik BCA, `#FF944C` muncul sebagai warna orange dan juga disebut pada bagian “WEBFORM button”. Untuk implementasi, gunakan sebagai aksen, bukan warna dominan.

### 4.4 Neutral Colors

| Token | HEX | Usage |
|---|---|---|
| `neutral-900` | `#303030` | Main text |
| `neutral-600` | `#7C7C7C` | Secondary text, placeholder, muted label |
| `neutral-400` | `#B0B0B0` | Border strong, disabled text |
| `neutral-200` | `#EFEFEF` | Border, divider, disabled surface |
| `neutral-100` | `#F7F7F7` | Page background, subtle section |
| `white` | `#FFFFFF` | Card, modal, navbar surface |

### 4.5 System Colors

| Token | HEX | Usage |
|---|---|---|
| `danger` | `#D81313` | Error, rejected, failed, destructive action |
| `success` | `#00893D` | Success, approved, completed |
| `warning` | `#FF944C` | Warning, pending attention, draft review |
| `info` | `#2FA6FC` | Informational status |

### 4.6 Recommended Color Usage Ratio

Gunakan komposisi warna berikut agar UI tetap clean:

- 60% white / light neutral background.
- 25% BCA blue and light blue surfaces.
- 10% dark blue / dark text.
- 5% orange/tosca/system color accents.

### 4.7 CSS Variables

```css
:root {
  --bca-blue-100: #F1F5F8;
  --bca-blue-200: #AAD2F8;
  --bca-blue-300: #63ACF2;
  --bca-blue-400: #2FA6FC;
  --bca-blue-500: #0066AE;
  --bca-blue-700: #093967;
  --bca-blue-900: #031120;

  --bca-orange: #FF944C;
  --bca-tosca: #2ECACC;
  --bca-webform-blue: #28B4E8;

  --neutral-900: #303030;
  --neutral-600: #7C7C7C;
  --neutral-400: #B0B0B0;
  --neutral-200: #EFEFEF;
  --neutral-100: #F7F7F7;
  --white: #FFFFFF;

  --danger: #D81313;
  --success: #00893D;
  --warning: #FF944C;
  --info: #2FA6FC;
}
```

---

## 5. Typography

### 5.1 Font Family

Gunakan **Open Sans** sebagai font utama.

```css
body {
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
}
```

Fallback:

1. Open Sans
2. Arial
3. Helvetica
4. sans-serif

### 5.2 Font Weight

| Token | Weight | Usage |
|---|---:|---|
| `regular` | 400 | Body, paragraph, form input |
| `semibold` | 600 | Label, card title, tab active |
| `bold` | 700 | Heading, hero title, important number |

### 5.3 Desktop Type Scale

| Token | Size | Line Height | Usage |
|---|---:|---:|---|
| `hero` | 56px | 64px | Hero title / landing headline |
| `title` | 32px | 40px | Page title, section title |
| `subtitle` | 24px | 32px | Subheading, dashboard section |
| `paragraph-lg` | 18px | 30px | Hero paragraph, intro copy |
| `body` | 16px | 26px | Main content |
| `small` | 14px | 22px | Table text, metadata, helper text |
| `micro` | 12px | 18px | Badge, caption, warning, textlink |

### 5.4 Mobile Type Scale

| Token | Size | Line Height | Usage |
|---|---:|---:|---|
| `hero-mobile` | 36px | 44px | Mobile hero title |
| `title-mobile` | 28px | 36px | Mobile page title |
| `subtitle-mobile` | 22px | 30px | Mobile section title |
| `body-mobile` | 16px | 26px | Main content |
| `small-mobile` | 14px | 22px | Metadata/helper |
| `micro-mobile` | 12px | 18px | Caption/badge |

### 5.5 Typography Rules

- Jangan gunakan terlalu banyak variasi font size dalam satu halaman.
- Gunakan `font-semibold` untuk label penting, bukan selalu bold.
- Gunakan warna `#303030` untuk teks utama.
- Gunakan `#7C7C7C` untuk teks sekunder.
- Link menggunakan `#0066AE`, hover `#2FA6FC`.
- Hindari teks abu-abu muda untuk konten penting.
- Pastikan line-height cukup lega agar mudah dibaca.

---

## 6. Spacing System

Gunakan sistem spacing berbasis kelipatan 4px/8px agar konsisten dengan UI modern.

### 6.1 Spacing Tokens

| Token | Value | Usage |
|---|---:|---|
| `space-1` | 4px | Micro gap, icon-text tight gap |
| `space-2` | 8px | Small gap, badge padding |
| `space-3` | 12px | Compact component gap |
| `space-4` | 16px | Default padding mobile/card kecil |
| `space-5` | 20px | Form field vertical rhythm |
| `space-6` | 24px | Card padding, grid gap |
| `space-8` | 32px | Section inner gap |
| `space-10` | 40px | Large card/hero internal padding |
| `space-12` | 48px | Section spacing tablet |
| `space-16` | 64px | Section spacing desktop |
| `space-20` | 80px | Landing page block spacing |
| `space-24` | 96px | Hero/major section spacing |

### 6.2 Page Spacing

| Area | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Page horizontal padding | 32px | 24px | 16px |
| Section vertical padding | 64–96px | 48–64px | 32–48px |
| Card padding | 24–32px | 20–24px | 16–20px |
| Grid gap | 24px | 20px | 16px |
| Form field gap | 16–20px | 16px | 14–16px |

### 6.3 Density Rules

- Public landing page: spacious, use `64–96px` section spacing.
- Dashboard/admin page: efficient, use `24–48px` spacing.
- Table-heavy page: compact but readable, use `12–16px` row padding.
- Mobile page: avoid cramped UI, minimum page padding `16px`.

---

## 7. Grid & Layout

### 7.1 Container

Recommended implementation:

```css
.container-bca {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
}

@media (min-width: 768px) {
  .container-bca {
    padding-inline: 24px;
  }
}

@media (min-width: 1024px) {
  .container-bca {
    padding-inline: 32px;
  }
}
```

### 7.2 Breakpoints

| Token | Width | Usage |
|---|---:|---|
| `sm` | 640px | Large mobile |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Wide desktop |

### 7.3 Column Rules

- Desktop: 12-column grid.
- Tablet: 8-column grid.
- Mobile: 4-column grid.
- Dashboard: sidebar + content layout.
- Landing page: hero can use 2-column layout on desktop and stacked layout on mobile.

### 7.4 Layout Patterns

#### Public Landing Page

```text
Top Utility Nav
Main Header / Navbar
Hero Banner
Quick Access / Highlight Cards
Main Content Sections
Promo / News / Feature Cards
CTA Section
Footer
```

#### Admin Dashboard

```text
Sidebar
Topbar
Page Header
KPI Cards
Filters
Content Card / Table / Chart
Pagination
```

#### Survey Page

```text
Topbar
Progress Summary
Question Navigation
Question Card
Score Options
Supporting Document Upload
Save Draft / Submit Actions
```

---

## 8. Border Radius

BCA.co.id uses modern rounded UI treatment. For implementation, use rounded corners consistently.

| Token | Value | Usage |
|---|---:|---|
| `radius-sm` | 6px | Badge, small input addon |
| `radius-md` | 8px | Input, dropdown, small button |
| `radius-lg` | 12px | Button, alert, compact card |
| `radius-xl` | 16px | Default card, modal |
| `radius-2xl` | 24px | Hero card, feature card |
| `radius-full` | 999px | Pills, avatar, status badge |

Rules:

- Button: `8–12px`.
- Card: `16–24px`.
- Input: `8–12px`.
- Badge: `999px`.
- Modal: `16–24px`.

---

## 9. Shadows & Elevation

Shadows harus halus. Hindari shadow tebal seperti marketplace atau gaming UI.

### 9.1 Shadow Tokens

```css
:root {
  --shadow-xs: 0 1px 2px rgba(3, 17, 32, 0.06);
  --shadow-sm: 0 4px 12px rgba(3, 17, 32, 0.08);
  --shadow-md: 0 8px 24px rgba(3, 17, 32, 0.10);
  --shadow-lg: 0 16px 40px rgba(3, 17, 32, 0.12);
}
```

### 9.2 Usage

| Shadow | Usage |
|---|---|
| `shadow-xs` | Input, small floating element |
| `shadow-sm` | Card default |
| `shadow-md` | Dropdown, popover, sticky header |
| `shadow-lg` | Modal, drawer, hero floating card |

Rules:

- Default card sebaiknya memakai border `#EFEFEF` + `shadow-xs/sm`.
- Gunakan shadow lebih kuat hanya untuk overlay/modal.
- Jangan gunakan shadow dengan warna hitam pekat.

---

## 10. Header & Navigation

### 10.1 Header Structure

BCA.co.id memiliki pola navigasi berlapis:

1. Segment navigation: Individu, Bisnis, Tentang BCA, Karir.
2. Language selector: ID/EN.
3. Main navigation: Produk, Layanan, Promo, Webform BCA, Chat.
4. Login/action area.

Untuk project Desa Wisata BCA, struktur yang disarankan:

```text
Logo / Project Name
Dashboard
Desa Wisata
Survey
Dokumen
Laporan
Pengaturan
User Menu
```

### 10.2 Header Rules

- Background header: `#FFFFFF`.
- Border bottom: `1px solid #EFEFEF`.
- Height desktop: `72px`.
- Height mobile: `64px`.
- Active nav: text `#0066AE`, optional underline/bottom border.
- Hover nav: text `#2FA6FC` atau background `#F1F5F8`.
- Sticky header boleh digunakan untuk dashboard.

### 10.3 Sidebar Dashboard

Recommended implementation:

- Width desktop: `260px–280px`.
- Background: `#FFFFFF` atau `#F7F7F7`.
- Active item: background `#F1F5F8`, text `#0066AE`.
- Icon size: `20px` atau `24px`.
- Border right: `1px solid #EFEFEF`.

---

## 11. Buttons

BCA.co.id mendokumentasikan beberapa button style: primary, secondary, text, next button, social media, search, dan switch/filter.

### 11.1 Button Anatomy

Button terdiri dari:

- Container.
- Label aksi yang jelas.
- Optional icon.
- State: active, hover, focus, disabled, loading.

### 11.2 Button Sizes

| Size | Height | Padding | Font |
|---|---:|---:|---:|
| `sm` | 36px | 12px 16px | 14px |
| `md` | 44px | 14px 20px | 14–16px |
| `lg` | 52px | 16px 24px | 16px |

### 11.3 Primary Button

Usage:

- Submit survey.
- Save important form.
- Login.
- Main CTA.

Style:

```css
.btn-primary {
  background: #0066AE;
  color: #FFFFFF;
  border: 1px solid #0066AE;
  border-radius: 12px;
  font-weight: 600;
}

.btn-primary:hover {
  background: #093967;
  border-color: #093967;
}

.btn-primary:disabled {
  background: #B0B0B0;
  border-color: #B0B0B0;
  cursor: not-allowed;
}
```

### 11.4 Secondary Button

Usage:

- Cancel.
- Back.
- View detail.
- Secondary action.

Style:

```css
.btn-secondary {
  background: #FFFFFF;
  color: #0066AE;
  border: 1px solid #AAD2F8;
  border-radius: 12px;
  font-weight: 600;
}

.btn-secondary:hover {
  background: #F1F5F8;
  border-color: #2FA6FC;
}
```

### 11.5 Text Button

Usage:

- Inline action.
- Low priority action.
- Link-like CTA.

Style:

```css
.btn-text {
  background: transparent;
  color: #0066AE;
  border: none;
  font-weight: 600;
}

.btn-text:hover {
  color: #2FA6FC;
  text-decoration: underline;
}
```

### 11.6 Destructive Button

Usage:

- Delete.
- Reject.
- Remove file.

Style:

```css
.btn-danger {
  background: #D81313;
  color: #FFFFFF;
  border: 1px solid #D81313;
  border-radius: 12px;
  font-weight: 600;
}
```

### 11.7 Button Copywriting

Gunakan label aksi yang spesifik:

| Hindari | Gunakan |
|---|---|
| OK | Simpan Perubahan |
| Submit | Kirim Survey |
| Next | Lanjutkan |
| Delete | Hapus Dokumen |
| Process | Proses Review |

---

## 12. Forms & Inputs

BCA.co.id memiliki pola input text, dropdown, error input, checkbox, dan form fields.

### 12.1 Input Field

```css
.input {
  height: 48px;
  border: 1px solid #B0B0B0;
  border-radius: 12px;
  padding: 0 16px;
  background: #FFFFFF;
  color: #303030;
  font-size: 14px;
}

.input:hover {
  border-color: #63ACF2;
}

.input:focus {
  border-color: #0066AE;
  box-shadow: 0 0 0 3px rgba(0, 102, 174, 0.12);
  outline: none;
}

.input::placeholder {
  color: #7C7C7C;
}
```

### 12.2 Error State

```css
.input-error {
  border-color: #D81313;
}

.helper-error {
  color: #D81313;
  font-size: 12px;
  line-height: 18px;
}
```

Rules:

- Tampilkan error message di bawah field.
- Jangan hanya mengandalkan warna; gunakan icon/text error.
- Gunakan bahasa error yang jelas.

Contoh:

```text
Email tidak boleh kosong.
Format email tidak valid.
Dokumen pendukung wajib diunggah untuk skor ini.
```

### 12.3 Label & Helper Text

- Label: 14px, semibold, `#303030`.
- Optional marker: 12px, regular, `#7C7C7C`.
- Helper text: 12px, `#7C7C7C`.
- Error text: 12px, `#D81313`.

### 12.4 Select / Dropdown

Rules:

- Height: 48px.
- Use chevron icon.
- Placeholder: `Pilih salah satu`.
- Dropdown surface: white.
- Dropdown shadow: `shadow-md`.
- Option hover: `#F1F5F8`.
- Selected option: text `#0066AE`, font semibold.

### 12.5 Checkbox / Radio

Rules:

- Size: 16–20px.
- Active color: `#0066AE`.
- Border default: `#B0B0B0`.
- Label clickable.
- Minimum target size: 40px height.

### 12.6 File Upload

Untuk survey Desa Wisata:

- Gunakan upload card dengan border dashed `#AAD2F8`.
- Background hover `#F1F5F8`.
- Icon upload warna `#0066AE`.
- Tampilkan file name, size, upload progress, dan remove action.
- Tampilkan accepted formats: PDF, JPG, PNG, DOCX jika diperlukan.

---

## 13. Cards

### 13.1 Default Card

```css
.card {
  background: #FFFFFF;
  border: 1px solid #EFEFEF;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(3, 17, 32, 0.08);
  padding: 24px;
}
```

### 13.2 Card Variants

| Variant | Usage | Style |
|---|---|---|
| Default | General content | White + border + subtle shadow |
| Highlight | KPI / important summary | Light blue background |
| Interactive | Clickable card | Hover border blue |
| Warning | Needs attention | Light orange tint |
| Success | Completed | Light green tint |

### 13.3 Card Rules

- Jangan memasukkan terlalu banyak informasi dalam satu card.
- Gunakan title 16–18px semibold.
- Gunakan metadata 12–14px muted.
- Gunakan icon untuk mempercepat scanning.
- Gunakan border dan spacing untuk grouping, bukan garis berlebihan.

---

## 14. Badges & Status

### 14.1 Status Badges

| Status | Background | Text | Usage |
|---|---|---|---|
| Draft | `#F7F7F7` | `#7C7C7C` | Belum final |
| Assigned | `#F1F5F8` | `#0066AE` | Survey ditugaskan |
| In Progress | `#AAD2F8` | `#093967` | Sedang dikerjakan |
| Submitted | `#EAF7FF` | `#0066AE` | Menunggu review |
| Approved | `#EAF8F0` | `#00893D` | Disetujui |
| Rejected | `#FDECEC` | `#D81313` | Ditolak |
| Need Revision | `#FFF4EA` | `#C9681E` | Perlu revisi |

### 14.2 Badge Rules

- Border radius: full pill.
- Font size: 12px.
- Font weight: 600.
- Padding: 4px 10px.
- Jangan gunakan warna system sebagai background solid untuk badge kecil; gunakan tint.

---

## 15. Tables

Dashboard CSR kemungkinan menggunakan banyak data tabel. Buat tabel yang clean dan mudah discan.

### 15.1 Table Style

- Header background: `#F7F7F7` atau `#F1F5F8`.
- Header text: 12–14px semibold, uppercase optional.
- Body text: 14px.
- Row height: 56–64px.
- Border bottom: `1px solid #EFEFEF`.
- Hover row: `#F1F5F8`.
- Action column sticky jika tabel lebar.

### 15.2 Empty Table

Gunakan empty state dengan:

- Icon/illustration sederhana.
- Title jelas.
- Deskripsi singkat.
- CTA jika diperlukan.

Contoh:

```text
Belum ada data survey
Mulai tambahkan desa wisata atau buat assignment survey baru.
```

---

## 16. Icons

BCA.co.id mendokumentasikan sistem ikon dalam beberapa ukuran: 16px, 24px, 32px, dan 64px.

### 16.1 Icon Size Usage

| Size | Usage |
|---:|---|
| 16px | Inline text, table action, small indicator |
| 20px | Default dashboard nav icon |
| 24px | Button icon, menu icon, card icon |
| 32px | Feature icon, KPI card icon |
| 64px | Hero visual, empty state, illustration-like icon |

### 16.2 Icon Style

- Gunakan outline/simple icon untuk dashboard.
- Gunakan icon filled/illustrative untuk landing page atau empty state.
- Icon harus memiliki stroke yang konsisten.
- Warna default icon: `#303030` atau `#7C7C7C`.
- Icon aktif: `#0066AE`.
- Icon success/error gunakan system color.

---

## 17. Illustration & Imagery

### 17.1 Image Ratios

BCA.co.id menyebut penggunaan 3 rasio gambar utama:

| Ratio | Usage |
|---|---|
| 1:1 | Card thumbnail, profile, promo compact |
| 16:9 | Hero, banner, news card, video-like content |
| 4:3 | Article image, feature image, gallery |

### 17.2 Photography Style

- Authentic.
- Relatable.
- Optimistic.
- Natural daily settings.
- Human-centered, tetapi hindari eksploitasi wajah jika tidak perlu.
- Untuk subjek manusia, referensi BCA menyarankan menghindari wajah agar pengguna bisa lebih mudah memproyeksikan dirinya ke visual tersebut.

### 17.3 Desa Wisata Imagery Direction

Untuk project Desa Wisata BCA:

- Gunakan foto desa, alam, UMKM, budaya lokal, pelatihan, dan aktivitas masyarakat.
- Hindari visual terlalu gelap atau dramatis.
- Gunakan tone hangat tetapi tetap bersih.
- Pastikan foto tidak menutupi keterbacaan teks.
- Gunakan overlay biru gelap transparan jika teks berada di atas gambar.

Example overlay:

```css
.hero-image-overlay {
  background: linear-gradient(
    90deg,
    rgba(3, 17, 32, 0.72) 0%,
    rgba(3, 17, 32, 0.36) 55%,
    rgba(3, 17, 32, 0.08) 100%
  );
}
```

---

## 18. Page Component Guidelines

### 18.1 Public Homepage

Recommended sections:

1. Header navigation.
2. Hero with image/banner.
3. Program summary.
4. KPI impact cards.
5. Desa wisata highlight.
6. Assessment process explanation.
7. News/features/articles.
8. CTA.
9. Footer.

Hero rules:

- Use 16:9 visual on desktop.
- Use title max 2 lines.
- Use one primary CTA and one secondary CTA.
- Keep hero content left aligned.
- Use BCA Blue as CTA color.

### 18.2 Login Page

Rules:

- Use white card on light blue background.
- Card width: 420–480px.
- Logo at top.
- Input height: 48px.
- Primary button full width.
- Add security/support note at bottom.

### 18.3 Admin Dashboard

Rules:

- Use clean white/gray background.
- KPI cards at top.
- Use filter bar before table.
- Keep actions predictable: Detail, Edit, Review, Export.
- Use status badges consistently.
- Avoid too many colors in charts.

### 18.4 Survey Assignment Page

Rules:

- Show survey status clearly.
- Show progress: answered / total questions.
- Group questions by aspect/category stored in `survey_questions`.
- Score options should be card/radio style.
- Supporting document upload appears under each answer.
- Sticky footer action on mobile: Save Draft / Submit.

### 18.5 Review Page

Rules:

- Show submitted answer, selected score option, document evidence, and answer history.
- Reviewer actions: Approve, Request Revision, Reject.
- Use warning color for revision.
- Use danger color for reject.
- Require reason/comment for rejection or revision.

---

## 19. Accessibility

### 19.1 Contrast

Rules:

- Main text should use `#303030` on white/light background.
- Avoid using `#B0B0B0` for important text.
- White text on `#0066AE`, `#093967`, or `#031120` is acceptable.
- Use orange mainly for accent, not long text.

### 19.2 Focus State

All interactive elements must have visible focus.

```css
.focus-ring:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 102, 174, 0.24);
}
```

### 19.3 Touch Target

- Minimum clickable area: 40px.
- Recommended mobile button height: 44–52px.
- Checkbox/radio label should be clickable.

### 19.4 Form Accessibility

- Every input must have label.
- Error message must be associated with field.
- Do not rely on placeholder as label.
- Use aria attributes for invalid fields.

---

## 20. Motion & Interaction

Gunakan motion yang subtle.

### 20.1 Duration

| Motion | Duration |
|---|---:|
| Hover | 120–180ms |
| Dropdown open | 160–220ms |
| Modal open | 200–280ms |
| Page transition | 250–320ms |

### 20.2 Easing

```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
```

### 20.3 Interaction Rules

- Hover card: slight translateY `-2px` + border blue.
- Button hover: darken background.
- Loading button: spinner + disabled state.
- Avoid excessive animation on dashboard/admin pages.

---

## 21. Data Visualization

Untuk dashboard CSR:

### 21.1 Chart Colors

Use limited palette:

```text
Primary: #0066AE
Secondary: #2FA6FC
Light Blue: #AAD2F8
Success: #00893D
Warning: #FF944C
Danger: #D81313
Neutral: #B0B0B0
```

### 21.2 Chart Rules

- Maksimal 5–6 warna dalam satu chart.
- Gunakan label langsung jika memungkinkan.
- Jangan hanya mengandalkan warna; gunakan legend/text.
- Untuk trend, gunakan line chart.
- Untuk komposisi status, gunakan donut/bar chart.
- Untuk ranking desa, gunakan horizontal bar chart.

---

## 22. Content Tone & Microcopy

### 22.1 Voice

- Profesional.
- Jelas.
- Ramah.
- Tidak terlalu formal.
- Tidak menggunakan istilah teknis berlebihan.

### 22.2 Bahasa

Gunakan Bahasa Indonesia sebagai default. Untuk istilah teknis, boleh gunakan English jika umum di dashboard.

Contoh:

| Context | Recommended Copy |
|---|---|
| Save draft | Simpan Draft |
| Submit survey | Kirim Survey |
| Review | Review Jawaban |
| Approve | Setujui |
| Reject | Tolak |
| Revision | Minta Revisi |
| Upload | Unggah Dokumen |
| Empty state | Belum ada data |
| Error | Terjadi kesalahan. Silakan coba lagi. |

### 22.3 Error Message

Error harus menjelaskan masalah dan solusi.

Bad:

```text
Error.
Invalid.
Failed.
```

Good:

```text
Dokumen gagal diunggah. Pastikan format file PDF, JPG, atau PNG dan ukuran maksimal 5MB.
```

---

## 23. Responsive Rules

### 23.1 Desktop

- Use sidebar for admin.
- Use 12-column grid.
- Table can show more columns.
- Header navigation visible.

### 23.2 Tablet

- Sidebar can collapse.
- Use 2-column cards.
- Keep filters in wrapped layout.

### 23.3 Mobile

- Use bottom/sticky action for form-heavy survey pages.
- Hide non-essential table columns.
- Use card list instead of wide table.
- Header uses hamburger/menu drawer.
- CTA buttons can be full width.

---

## 24. shadcn/ui Implementation Mapping

Recommended component mapping:

| Need | shadcn/ui Component |
|---|---|
| Button | `Button` |
| Card | `Card`, `CardHeader`, `CardContent` |
| Input | `Input` |
| Select | `Select` |
| Textarea | `Textarea` |
| Checkbox | `Checkbox` |
| Radio score option | `RadioGroup` |
| Dialog | `Dialog` |
| Sheet/sidebar mobile | `Sheet` |
| Badge status | `Badge` |
| Table | `Table` |
| Tabs | `Tabs` |
| Toast | `Sonner` |
| Dropdown menu | `DropdownMenu` |
| Upload | Custom component |

### 24.1 shadcn Theme Suggestion

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 19%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 19%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 19%;

    --primary: 205 100% 34%;
    --primary-foreground: 0 0% 100%;

    --secondary: 204 59% 96%;
    --secondary-foreground: 209 84% 22%;

    --muted: 0 0% 97%;
    --muted-foreground: 0 0% 49%;

    --accent: 204 96% 96%;
    --accent-foreground: 205 100% 34%;

    --destructive: 0 84% 46%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 94%;
    --input: 0 0% 69%;
    --ring: 205 100% 34%;

    --radius: 0.75rem;
  }
}
```

---

## 25. Tailwind Config Suggestion

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        bca: {
          blue: {
            100: "#F1F5F8",
            200: "#AAD2F8",
            300: "#63ACF2",
            400: "#2FA6FC",
            500: "#0066AE",
            700: "#093967",
            900: "#031120",
          },
          orange: "#FF944C",
          tosca: "#2ECACC",
          webform: "#28B4E8",
        },
        neutralBca: {
          100: "#F7F7F7",
          200: "#EFEFEF",
          400: "#B0B0B0",
          600: "#7C7C7C",
          900: "#303030",
        },
        system: {
          danger: "#D81313",
          success: "#00893D",
          warning: "#FF944C",
          info: "#2FA6FC",
        },
      },
      boxShadow: {
        bcaXs: "0 1px 2px rgba(3, 17, 32, 0.06)",
        bcaSm: "0 4px 12px rgba(3, 17, 32, 0.08)",
        bcaMd: "0 8px 24px rgba(3, 17, 32, 0.10)",
        bcaLg: "0 16px 40px rgba(3, 17, 32, 0.12)",
      },
      borderRadius: {
        bca: "0.75rem",
        bcaCard: "1rem",
        bcaHero: "1.5rem",
      },
    },
  },
};

export default config;
```

---

## 26. Example Component Rules for Desa Wisata BCA

### 26.1 KPI Card

```text
Card background: white
Border: #EFEFEF
Radius: 16px
Padding: 24px
Icon container: #F1F5F8
Icon color: #0066AE
Value: 32px / bold / #303030
Label: 14px / #7C7C7C
Trend badge: success/warning/danger tint
```

### 26.2 Survey Question Card

```text
Card background: white
Question title: 18px / semibold
Aspect badge: blue tint
Score option: radio card
Selected option: border #0066AE, background #F1F5F8
Document upload: dashed border #AAD2F8
Action area: sticky bottom on mobile
```

### 26.3 Village Detail Page

```text
Hero/header: light blue section
Village name: 32px / bold
Location metadata: 14px muted
Status badge: pill
Tabs: Overview, Survey, Dokumen, Riwayat, Laporan
Content cards: white with subtle shadow
```

### 26.4 Review Panel

```text
Left: answer/question detail
Right: review action panel
Document preview card
History timeline
Approve button: primary/success
Revision button: warning outline
Reject button: danger
```

---

## 27. Do & Don’t

### Do

- Use BCA blue as main identity color.
- Use Open Sans.
- Use clean white/light blue surfaces.
- Use consistent spacing and border radius.
- Use subtle shadows.
- Make status clear with badge and text.
- Use authentic social impact imagery.
- Keep dashboard readable and efficient.

### Don’t

- Do not stretch or modify BCA logo.
- Do not overuse orange as primary color.
- Do not use too many gradients.
- Do not use playful fonts.
- Do not use low contrast text.
- Do not make admin tables too dense.
- Do not rely only on color for status.
- Do not use heavy shadows or glossy effects.

---

## 28. Source References

Public references used to create this guideline:

- BCA homepage: `https://www.bca.co.id/`
- BCA Brand Assets: `https://www.bca.co.id/id/tentang-bca/media-riset/pressroom/Brand-Assets`
- BCA Icon System / Design System page: `https://www.bca.co.id/id/Icon-system-bcacoid`

