# DESIGN.md — Desa Wisata BCA / Social Impact CSR Aggregator

Dokumen ini berisi aturan desain untuk membangun seluruh halaman dashboard admin pada project **Desa Wisata BCA / Social Impact CSR Aggregator**.

Panduan ini dibuat berdasarkan referensi dashboard admin dengan **sidebar biru**, topbar putih, kartu statistik, chart, tabel, panel aktivitas, dan layout enterprise yang clean. Gunakan dokumen ini sebagai acuan konsisten untuk halaman lain seperti Daftar Desa Wisata, Template Survey, Survey Assignment, Review Survey, Dokumen, Laporan, User Management, dan Pengaturan.

> Catatan: guideline ini adalah **BCA-inspired UI direction**, bukan brand guideline resmi BCA. Jangan menggunakan logo/aset resmi BCA kecuali memang memiliki izin dan file resmi.

---

## 1. Design Principles

### 1.1 Clean Corporate
Tampilan harus terasa rapi, profesional, dan terpercaya. Hindari visual yang terlalu ramai, terlalu playful, atau terlalu banyak warna.

### 1.2 Trustworthy Enterprise
Website harus terasa seperti platform enterprise untuk CSR, assessment, dan monitoring. Gunakan layout yang stabil, banyak white space, border halus, dan hierarchy yang jelas.

### 1.3 Data First
Dashboard berisi banyak data: statistik, status survey, progres assessment, dokumen, reviewer, enumerator, dan aktivitas. Desain harus membantu user memahami data dengan cepat.

### 1.4 Consistent Navigation
Sidebar biru menjadi identitas utama. Semua halaman admin harus memakai struktur navigasi yang sama agar user tidak bingung.

### 1.5 Calm Visual Priority
Gunakan warna biru sebagai primary action dan identity. Gunakan hijau, oranye, merah hanya untuk status/feedback. Jangan memakai terlalu banyak aksen di satu halaman.

---

## 2. Brand Personality

Desain harus mencerminkan karakter berikut:

- Corporate
- Modern
- Aman
- Terpercaya
- Bersih
- Terstruktur
- Ramah untuk stakeholder non-teknis
- Cocok untuk dashboard CSR, social impact, assessment, dan monitoring

Hindari karakter berikut:

- Terlalu playful
- Terlalu gelap
- Terlalu ramai
- Terlalu marketplace/e-commerce
- Terlalu neon
- Terlalu banyak gradient
- Terlalu banyak animasi

---

## 3. Color Palette

### 3.1 Primary Colors

```ts
export const colors = {
  bca: {
    blue100: "#F1F5F8",
    blue200: "#AAD2F8",
    blue300: "#63ACF2",
    blue400: "#2FA6FC",
    blue500: "#0066AE",
    blue700: "#093967",
    blue900: "#031120",
  },
  neutral: {
    white: "#FFFFFF",
    background: "#F7F7F7",
    surface: "#FFFFFF",
    border: "#EFEFEF",
    mutedBorder: "#E5E7EB",
    text: "#303030",
    muted: "#7C7C7C",
    softText: "#B0B0B0",
  },
  system: {
    success: "#00893D",
    warning: "#FF944C",
    danger: "#D81313",
    info: "#2FA6FC",
  },
}
```

### 3.2 Color Usage Ratio

Gunakan komposisi warna berikut:

- 60–70% white dan light gray
- 20–25% BCA blue/dark blue pada sidebar dan primary elements
- 5–10% light blue surface untuk highlight
- 5% system color untuk status, alert, dan feedback

### 3.3 Page Background

Gunakan background utama:

```css
background: #F7F7F7;
```

Untuk variasi dashboard yang lebih premium, boleh menggunakan background lembut:

```css
background: linear-gradient(180deg, #F1F5F8 0%, #F7F7F7 260px);
```

Namun jangan membuat page terlalu penuh gradient.

### 3.4 Surface / Card Background

Gunakan:

```css
background: #FFFFFF;
border: 1px solid #EFEFEF;
```

### 3.5 Text Colors

```css
--text-primary: #303030;
--text-secondary: #7C7C7C;
--text-muted: #B0B0B0;
--text-inverse: #FFFFFF;
```

### 3.6 Status Colors

| Status | Background | Text |
|---|---:|---:|
| Draft | `#F7F7F7` | `#7C7C7C` |
| Assigned | `#F1F5F8` | `#0066AE` |
| In Progress | `#EAF7FF` | `#0066AE` |
| Submitted | `#EAF7FF` | `#093967` |
| Approved / Aktif / Selesai | `#EAF8F0` | `#00893D` |
| Need Revision / Perlu Review | `#FFF4EA` | `#C9681E` |
| Rejected / Error | `#FDECEC` | `#D81313` |
| Archived / Diarsipkan | `#F1F5F8` | `#7C7C7C` |

---

## 4. Typography

### 4.1 Font Family

Gunakan font corporate sans-serif:

```css
font-family: "Open Sans", Arial, Helvetica, sans-serif;
```

Jika Open Sans belum tersedia, gunakan fallback:

```css
font-family: Inter, "Open Sans", Arial, Helvetica, sans-serif;
```

### 4.2 Type Scale

| Element | Size | Weight | Color |
|---|---:|---:|---|
| Page Title | 28–32px | 700 | `#303030` |
| Page Subtitle | 14–16px | 400 | `#7C7C7C` |
| Section Title | 18–22px | 600–700 | `#303030` |
| Card Title | 15–17px | 600–700 | `#303030` |
| KPI Number | 28–34px | 700 | `#303030` |
| KPI Label | 13–14px | 600 | `#303030` |
| Body Text | 14–16px | 400 | `#303030` |
| Table Text | 13–14px | 400–500 | `#303030` |
| Helper Text | 12–13px | 400 | `#7C7C7C` |
| Badge Text | 12px | 600 | dynamic |

### 4.3 Typography Rules

- Jangan memakai terlalu banyak ukuran font.
- Gunakan `font-semibold` untuk label penting.
- Gunakan `font-bold` untuk page title dan KPI number.
- Hindari heading yang terlalu besar.
- Pastikan table text tetap mudah dibaca.
- Gunakan line-height lega: `1.4–1.6`.

---

## 5. Layout System

### 5.1 Global Admin Layout

Semua halaman admin menggunakan struktur dasar:

```text
Blue Sidebar
White Topbar
Main Content Area
Page Header
Page Content
```

### 5.2 Desktop Layout

```text
| Sidebar 270px | Main Content |
|               | Topbar 72px  |
|               | Page Content |
```

Spesifikasi:

- Sidebar width: `260px–280px`
- Topbar height: `72px`
- Main content padding: `24px–32px`
- Page gap: `20px–24px`
- Card gap: `16px–24px`

### 5.3 Container

Gunakan full width dengan max content yang nyaman:

```css
.main-content {
  padding: 24px 32px;
}
```

Untuk halaman dengan tabel besar, gunakan full available width.

### 5.4 Grid

Gunakan 12-column mental model:

- KPI dashboard: 4 columns desktop
- Main dashboard: 8 columns kiri, 4 columns kanan
- Form page: 8 columns form, 4 columns helper panel
- Listing page: full width table
- Detail page: 8 columns content, 4 columns summary

---

## 6. Sidebar Design

Sidebar adalah elemen identitas utama dan **wajib berwarna biru**.

### 6.1 Sidebar Container

```css
.sidebar {
  width: 270px;
  background: linear-gradient(180deg, #0066AE 0%, #093967 100%);
  color: #FFFFFF;
}
```

Alternatif solid:

```css
background: #0066AE;
```

### 6.2 Sidebar Padding

```css
padding: 24px 16px;
```

### 6.3 Sidebar Brand

Bagian atas sidebar:

```text
Desa Wisata BCA
CSR Aggregator Platform
```

Style:

- Brand name: 20–22px, bold, white
- Subtitle: 12–13px, semi-transparent white
- Spacing bawah brand: 32px

```css
.brand-title {
  color: #FFFFFF;
  font-size: 22px;
  font-weight: 700;
}

.brand-subtitle {
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
}
```

### 6.4 Sidebar Menu

Menu items:

1. Dashboard
2. Desa Wisata
3. Template Survey
4. Survey Assignment
5. Review Survey
6. Dokumen
7. Laporan
8. User Management
9. Pengaturan

Item style:

```css
.sidebar-item {
  height: 48px;
  padding: 0 14px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.78);
  display: flex;
  align-items: center;
  gap: 14px;
}
```

Hover:

```css
.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.10);
  color: #FFFFFF;
}
```

Active:

```css
.sidebar-item.active {
  background: rgba(255, 255, 255, 0.16);
  color: #FFFFFF;
  font-weight: 600;
}
```

Active indicator:

```css
.sidebar-item.active::before {
  content: "";
  width: 3px;
  height: 24px;
  border-radius: 999px;
  background: #FFFFFF;
}
```

### 6.5 Sidebar Icons

Gunakan `lucide-react`.

- Size: 20px
- Stroke width: 1.8–2
- Default color: `rgba(255,255,255,0.78)`
- Active color: `#FFFFFF`

### 6.6 Sidebar User Card

Terletak di bagian bawah sidebar.

```css
.sidebar-user-card {
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  padding: 12px;
}
```

Isi:

- Avatar bulat
- Name: `Admin CSR`
- Role: `Super Admin`
- Dropdown chevron

Text:

- Name: white, 14px, semibold
- Role: semi-transparent white, 12px

---

## 7. Topbar Design

### 7.1 Topbar Container

```css
.topbar {
  height: 72px;
  background: #FFFFFF;
  border-bottom: 1px solid #EFEFEF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}
```

### 7.2 Search Input

Global search berada di kiri.

```css
.search-input {
  height: 44px;
  width: 420px;
  border: 1px solid #DADDE3;
  border-radius: 12px;
  background: #FFFFFF;
}
```

Placeholder example:

```text
Cari desa, survey, atau dokumen...
```

Focus:

```css
.search-input:focus {
  border-color: #2FA6FC;
  box-shadow: 0 0 0 3px rgba(47, 166, 252, 0.14);
}
```

### 7.3 Topbar Actions

Kanan topbar:

- Notification icon
- Help icon
- User avatar

Icon style:

- Size: 22–24px
- Color: `#303030`
- Hover background: `#F1F5F8`
- Button size: 40px
- Radius: full atau 12px

Notification red dot:

```css
background: #D81313;
width: 8px;
height: 8px;
border-radius: 999px;
```

---

## 8. Page Header

Setiap halaman harus memiliki page header.

### 8.1 Structure

```text
Breadcrumb
Title + Subtitle
Action Buttons
```

### 8.2 Example

```text
Dashboard
Dashboard Admin
Pantau perkembangan assessment, desa wisata binaan, dan aktivitas program CSR.
```

### 8.3 Style

```css
.page-header {
  margin-bottom: 20px;
}

.breadcrumb {
  font-size: 13px;
  color: #7C7C7C;
}

.page-title {
  font-size: 30px;
  font-weight: 700;
  color: #303030;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 15px;
  color: #7C7C7C;
}
```

### 8.4 Page Header Actions

Biasanya maksimal 2 tombol utama:

- Primary action
- Secondary action

Contoh:

- `Buat Assignment`
- `Export Laporan`

---

## 9. Spacing System

Gunakan spacing berbasis 4px/8px.

```ts
spacing: {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "40px",
}
```

### 9.1 Common Spacing Rules

| Area | Spacing |
|---|---:|
| Page padding desktop | 24–32px |
| Page padding tablet | 20–24px |
| Page padding mobile | 16px |
| Section gap | 20–24px |
| Card padding | 20–24px |
| Card gap | 16–24px |
| Table cell padding | 12–16px |
| Form field gap | 12–16px |
| Button gap with icon | 8px |

---

## 10. Border Radius

Gunakan radius halus dan konsisten.

| Component | Radius |
|---|---:|
| Sidebar item | 12px |
| Button | 10–12px |
| Input/select | 10–12px |
| Card | 16px |
| KPI icon wrapper | 12px |
| Badge | 999px |
| Modal | 18–20px |
| Table wrapper | 16px |

Tailwind mapping:

```ts
borderRadius: {
  md: "10px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
}
```

---

## 11. Shadow & Border

### 11.1 Default Card Shadow

Gunakan shadow lembut, jangan terlalu tebal.

```css
box-shadow: 0 4px 12px rgba(3, 17, 32, 0.06);
```

Untuk card utama:

```css
box-shadow: 0 6px 18px rgba(3, 17, 32, 0.08);
```

### 11.2 Border

Default border:

```css
border: 1px solid #EFEFEF;
```

Untuk blue-highlight card/callout:

```css
border: 1px solid #AAD2F8;
```

---

## 12. Button System

### 12.1 Primary Button

```css
.btn-primary {
  height: 44px;
  padding: 0 18px;
  background: #0066AE;
  color: #FFFFFF;
  border-radius: 12px;
  font-weight: 600;
}
```

Hover:

```css
background: #093967;
```

Use for:

- Buat Assignment
- Tambah Desa Wisata
- Buat Template Survey
- Submit Review
- Simpan Perubahan

### 12.2 Secondary Button

```css
.btn-secondary {
  height: 44px;
  padding: 0 18px;
  background: #FFFFFF;
  color: #0066AE;
  border: 1px solid #AAD2F8;
  border-radius: 12px;
  font-weight: 600;
}
```

Hover:

```css
background: #F1F5F8;
```

Use for:

- Export Laporan
- Reset
- Lihat Semua
- Kembali

### 12.3 Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: #303030;
  border-radius: 10px;
}
```

Hover:

```css
background: #F1F5F8;
```

### 12.4 Danger Button

```css
.btn-danger {
  background: #D81313;
  color: #FFFFFF;
}
```

Use only for destructive confirmation.

### 12.5 Warning Button

```css
.btn-warning {
  background: #FF944C;
  color: #FFFFFF;
}
```

Use for archive/revision action.

---

## 13. Card System

### 13.1 Default Card

```css
.card {
  background: #FFFFFF;
  border: 1px solid #EFEFEF;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(3, 17, 32, 0.06);
  padding: 20px;
}
```

### 13.2 Dashboard KPI Card

```css
.kpi-card {
  min-height: 128px;
  padding: 20px;
}
```

Structure:

```text
Icon wrapper
Label
Value
Description / trend
```

KPI icon wrapper:

```css
.kpi-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: #EAF7FF;
  color: #0066AE;
}
```

### 13.3 Chart Card

```css
.chart-card {
  min-height: 260px;
  padding: 20px;
}
```

Rules:

- Title and subtitle at top.
- Chart should not be overly saturated.
- Use blue as main chart color.
- Gridline subtle.
- Label readable.

### 13.4 Side Panel Card

Use for:

- Prioritas Review
- Aktivitas Terbaru
- Quick Actions
- Summary detail
- Helper info

```css
.side-panel-card {
  padding: 18px;
  border-radius: 16px;
}
```

---

## 14. Info Callout

Gunakan info callout untuk memberi konteks ringan.

```css
.info-callout {
  background: #F1F5F8;
  border: 1px solid #AAD2F8;
  color: #303030;
  border-radius: 14px;
  padding: 12px 16px;
}
```

Example:

```text
Dashboard ini menampilkan ringkasan perkembangan desa wisata, status survey, hasil review, dan aktivitas enumerator secara real-time.
```

Icon:

- Circle info icon
- Color: `#0066AE`
- Background: `#0066AE` or transparent depending layout

---

## 15. Table System

Tables are used heavily in this project. Make them clean, readable, and enterprise-grade.

### 15.1 Table Wrapper

```css
.table-card {
  background: #FFFFFF;
  border: 1px solid #EFEFEF;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(3, 17, 32, 0.06);
  overflow: hidden;
}
```

### 15.2 Table Header

```css
thead {
  background: #F1F5F8;
}
```

Header text:

```css
font-size: 13px;
font-weight: 600;
color: #303030;
```

### 15.3 Table Row

```css
tr {
  height: 56px;
  border-bottom: 1px solid #EFEFEF;
}
```

Hover:

```css
tr:hover {
  background: #F7FBFF;
}
```

### 15.4 Cell Padding

```css
td, th {
  padding: 12px 16px;
}
```

### 15.5 Action Column

Use three-dot menu on the right.

Icon:

- `MoreVertical` or `MoreHorizontal`
- Size 18–20px
- Muted color
- Hover background `#F1F5F8`

### 15.6 Empty Table State

```text
Belum ada data
Tambahkan data pertama untuk mulai menggunakan fitur ini.
```

Use icon + short description + primary action.

---

## 16. Badge System

### 16.1 Default Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
}
```

### 16.2 Badge Variants

```ts
const badgeVariants = {
  draft: "bg-[#F7F7F7] text-[#7C7C7C]",
  assigned: "bg-[#F1F5F8] text-[#0066AE]",
  inProgress: "bg-[#EAF7FF] text-[#0066AE]",
  submitted: "bg-[#EAF7FF] text-[#093967]",
  approved: "bg-[#EAF8F0] text-[#00893D]",
  needRevision: "bg-[#FFF4EA] text-[#C9681E]",
  rejected: "bg-[#FDECEC] text-[#D81313]",
  archived: "bg-[#F1F5F8] text-[#7C7C7C]",
}
```

---

## 17. Progress Bar

Use for assessment progress and task completion.

```css
.progress-track {
  height: 8px;
  background: #EFEFEF;
  border-radius: 999px;
}

.progress-fill {
  height: 8px;
  background: #0066AE;
  border-radius: 999px;
}
```

Rules:

- Always show percentage text near progress bar.
- Use blue for normal progress.
- Use green only for completed/approved if needed.
- Use orange for need revision warning if needed.

---

## 18. Form & Filter System

### 18.1 Input

```css
.input {
  height: 44px;
  border: 1px solid #DADDE3;
  border-radius: 12px;
  background: #FFFFFF;
  color: #303030;
  padding: 0 14px;
}
```

Focus:

```css
border-color: #2FA6FC;
box-shadow: 0 0 0 3px rgba(47,166,252,0.14);
```

### 18.2 Select

Same visual as input.

- Height: 44px
- Radius: 12px
- Border: `#DADDE3`
- Background: white

### 18.3 Filter Bar

Used on listing pages.

```css
.filter-card {
  background: #FFFFFF;
  border: 1px solid #EFEFEF;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
```

Filter order:

1. Search input
2. Status filter
3. Location/category/type filter
4. Date/version filter if needed
5. Apply button
6. Reset button

---

## 19. Chart Style

Charts should look analytical but calm.

### 19.1 Chart Colors

```ts
const chartColors = {
  primary: "#0066AE",
  secondary: "#2FA6FC",
  lightBlue: "#AAD2F8",
  success: "#00893D",
  warning: "#FF944C",
  danger: "#D81313",
  gray: "#B0B0B0",
}
```

### 19.2 Chart Rules

- Use clean axis labels.
- Use subtle gridlines: `#EFEFEF`.
- Avoid too many chart colors.
- Use blue as main color.
- Use status colors only when meaningful.
- Avoid 3D charts.
- Avoid heavy shadows inside chart.

### 19.3 Recommended Chart Types

- Bar chart for status distribution
- Line chart for trend
- Donut chart for status composition, but use sparingly
- Area chart for cumulative progress

---

## 20. Iconography

Use `lucide-react`.

### 20.1 Icon Rules

- Style: outline
- Stroke width: 1.75–2
- Sidebar icon: 20px
- Button icon: 16–18px
- KPI icon: 24px
- Empty state icon: 40–56px

### 20.2 Recommended Icons

| Feature | Icon |
|---|---|
| Dashboard | `LayoutDashboard` |
| Desa Wisata | `MapPin`, `MapPinned` |
| Template Survey | `ClipboardList`, `ListChecks` |
| Survey Assignment | `ClipboardCheck` |
| Review Survey | `FileSearch` |
| Dokumen | `FolderOpen` |
| Laporan | `BarChart3` |
| User Management | `Users` |
| Pengaturan | `Settings` |
| Search | `Search` |
| Notification | `Bell` |
| Help | `CircleHelp` |
| Export | `Download` |
| Add | `Plus` |
| Edit | `Pencil` |
| Delete | `Trash2` |
| Archive | `Archive` |
| Detail | `Eye` |

---

## 21. Dropdown Menu

Use for row actions.

### 21.1 Style

```css
.dropdown {
  background: #FFFFFF;
  border: 1px solid #EFEFEF;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(3,17,32,0.12);
  padding: 6px;
}
```

### 21.2 Item

```css
.dropdown-item {
  height: 36px;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 14px;
}
```

Hover:

```css
background: #F1F5F8;
```

Danger item:

```css
color: #D81313;
```

---

## 22. Modal / Dialog

Use for confirmation, delete, archive, submit, review.

### 22.1 Dialog Style

```css
.dialog {
  background: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0 24px 60px rgba(3,17,32,0.18);
  padding: 24px;
}
```

### 22.2 Confirmation Dialog Rules

- Destructive actions must always use confirmation modal.
- Explain what happens to data.
- Primary destructive button uses red.
- Archive action uses warning/orange.
- Cancel button should be secondary/ghost.

### 22.3 Example Archive Modal

```text
Arsipkan Desa Wisata?
Desa wisata ini akan dipindahkan ke arsip dan tidak muncul sebagai desa aktif. Data survey dan dokumen tetap tersimpan.
```

---

## 23. Dashboard Page Pattern

Use this for `Dashboard Admin`.

### 23.1 Sections

```text
Page Header
Info Callout
KPI Cards
Main Grid:
  - Progress Survey Chart
  - Tren Skor Assessment Chart
  - Assignment Survey Table
Right Panels:
  - Prioritas Review
  - Aktivitas Terbaru
  - Quick Actions
```

### 23.2 KPI Examples

- Total Desa Wisata
- Survey Berjalan
- Menunggu Review
- Rata-rata Skor

### 23.3 Chart Examples

- Progress Survey Desa
- Tren Skor Assessment

### 23.4 Right Panel Examples

- Prioritas Review
- Aktivitas Terbaru
- Quick Actions

---

## 24. Listing Page Pattern

Use this for:

- Daftar Desa Wisata
- Daftar Template Survey
- Survey Assignment
- Dokumen
- User Management

### 24.1 Sections

```text
Page Header
Summary Cards
Filter Bar
Data Table
Pagination
Confirmation Dialog
```

### 24.2 Listing Page Rules

- Search must be easy to find.
- Filter must not dominate the page.
- Table should be the main focus.
- Show status badge.
- Show row action dropdown.
- Use pagination.
- Use empty state.
- Use loading skeleton.

---

## 25. Detail Page Pattern

Use this for:

- Detail Desa Wisata
- Detail Assignment
- Detail Template Survey
- Detail Dokumen
- Detail User

### 25.1 Sections

```text
Page Header with actions
Summary / status card
Main detail content
Related table or timeline
Right-side metadata panel
```

### 25.2 Detail Page Rules

- Show important status at the top.
- Use tabs if content is long.
- Use right panel for metadata.
- Use timeline for activity/audit history.

---

## 26. Form Page Pattern

Use this for:

- Tambah/Edit Desa Wisata
- Buat/Edit Template Survey
- Buat Assignment
- Edit User
- Upload Dokumen

### 26.1 Sections

```text
Page Header
Main Form Card
Right Helper Card
Footer Action Bar
```

### 26.2 Form Rules

- Group fields by section.
- Use clear labels.
- Use helper text when needed.
- Required fields should be marked.
- Save button at top right or sticky bottom.
- Cancel button always available.

---

## 27. Review Page Pattern

Use this for review survey.

### 27.1 Sections

```text
Page Header
Assignment Summary
Answer List
Document Evidence Preview
Score Summary
Reviewer Action Panel
```

### 27.2 Review Rules

- Show score and selected rubric clearly.
- Show uploaded documents/evidence.
- Reviewer actions should be prominent:
  - Approve
  - Request Revision
  - Reject
- Use confirmation modal before final decision.

---

## 28. Pagination

Use pagination under tables.

```text
Menampilkan 1–10 dari 128 data
[Previous] [1] [2] [3] [Next]
```

Active page:

```css
background: #0066AE;
color: #FFFFFF;
border-radius: 10px;
```

Inactive page:

```css
background: #FFFFFF;
border: 1px solid #EFEFEF;
color: #303030;
```

---

## 29. Empty State

Use when no data exists.

### 29.1 Structure

```text
Icon
Title
Description
Primary action
```

### 29.2 Style

- Icon wrapper: light blue background
- Icon: blue
- Title: 18px semibold
- Description: 14px muted
- Center aligned inside card

Example:

```text
Belum ada desa wisata
Tambahkan desa wisata pertama untuk mulai mengelola program CSR.
```

---

## 30. Loading State

Use skeleton loading.

### 30.1 Skeleton Rules

- Use for KPI cards, table rows, filter bar, and chart placeholder.
- Background: `#F1F5F8`
- Animation: subtle pulse
- Avoid spinner-only loading for large content.

---

## 31. Responsive Design

### 31.1 Desktop

- Sidebar fixed visible.
- Topbar full width.
- KPI cards 4 columns.
- Dashboard main grid: 2 columns.
- Tables full width.

### 31.2 Tablet

- Sidebar can collapse.
- KPI cards 2 columns.
- Filters wrap.
- Table horizontal scroll.

### 31.3 Mobile

- Sidebar becomes drawer/sheet.
- Topbar search can be compact.
- KPI cards 1 column or 2 columns.
- Filter stack vertical.
- Tables become horizontal scroll or card list.
- Primary actions can become full width.

---

## 32. Accessibility

### 32.1 Contrast

- Ensure text has enough contrast.
- Do not use light blue text on light blue background.
- Sidebar text must remain readable.

### 32.2 Interaction

- Every button must have clear label.
- Click target minimum 40px.
- Focus ring must be visible.
- Destructive actions need confirmation.

### 32.3 Status

Never rely on color only. Always include status text in badge.

---

## 33. Motion & Interaction

Use subtle interaction only.

```css
transition: all 150ms ease;
```

Allowed:

- Button hover
- Sidebar hover
- Card hover for clickable cards
- Dropdown open
- Modal fade/scale
- Table row hover

Avoid:

- Excessive animation
- Parallax
- Bouncy transitions
- Overly playful motion

---

## 34. Tailwind Implementation Guide

### 34.1 Suggested Tailwind Tokens

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
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
        app: {
          background: "#F7F7F7",
          surface: "#FFFFFF",
          border: "#EFEFEF",
          text: "#303030",
          muted: "#7C7C7C",
        },
        success: "#00893D",
        warning: "#FF944C",
        danger: "#D81313",
      },
      fontFamily: {
        sans: ["Open Sans", "Inter", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(3, 17, 32, 0.06)",
        card: "0 6px 18px rgba(3, 17, 32, 0.08)",
        dropdown: "0 12px 28px rgba(3, 17, 32, 0.12)",
      },
      borderRadius: {
        card: "16px",
        button: "12px",
      },
    },
  },
}
```

### 34.2 Common Class Recipes

Sidebar:

```tsx
<aside className="w-[270px] bg-gradient-to-b from-bca-blue500 to-bca-blue700 text-white">
```

Card:

```tsx
<Card className="rounded-card border border-app-border bg-white shadow-soft">
```

Primary button:

```tsx
<Button className="h-11 rounded-button bg-bca-blue500 text-white hover:bg-bca-blue700">
```

Secondary button:

```tsx
<Button variant="outline" className="h-11 rounded-button border-bca-blue200 text-bca-blue500 hover:bg-bca-blue100">
```

Input:

```tsx
<Input className="h-11 rounded-button border-[#DADDE3] focus-visible:ring-bca-blue400/20">
```

Table header:

```tsx
<TableHeader className="bg-bca-blue100">
```

Badge:

```tsx
<Badge className="rounded-full px-2.5 py-1 text-xs font-semibold">
```

---

## 35. shadcn/ui Usage

Recommended components:

- `Button`
- `Card`
- `Input`
- `Select`
- `Badge`
- `Table`
- `DropdownMenu`
- `Dialog`
- `Sheet`
- `Avatar`
- `Progress`
- `Skeleton`
- `Tabs`
- `Separator`
- `Tooltip`

### 35.1 shadcn Styling Rule

Use shadcn as base component, but override styling with Tailwind classes to match this design system.

Do not use default shadcn gray-heavy look without adapting colors, radius, and spacing.

---

## 36. Page-Specific Navigation Active State

Every page must set sidebar active item correctly:

| Page | Active Menu |
|---|---|
| Dashboard Admin | Dashboard |
| Daftar Desa Wisata | Desa Wisata |
| Detail Desa Wisata | Desa Wisata |
| Daftar Template Survey | Template Survey |
| Detail Template Survey | Template Survey |
| Survey Assignment | Survey Assignment |
| Review Survey | Review Survey |
| Dokumen | Dokumen |
| Laporan | Laporan |
| User Management | User Management |
| Pengaturan | Pengaturan |

---

## 37. Content Tone

Use Bahasa Indonesia for UI copy.

Tone:

- Jelas
- Profesional
- Singkat
- Tidak terlalu teknis
- Ramah untuk admin, reviewer, dan stakeholder CSR

Examples:

- `Pantau perkembangan assessment desa wisata.`
- `Kelola data desa wisata binaan.`
- `Survey siap ditinjau reviewer.`
- `Dokumen pendukung belum diverifikasi.`
- `Buat Assignment`
- `Export Laporan`

Avoid:

- Slang
- Copy terlalu panjang
- Terlalu banyak istilah teknis tanpa konteks

---

## 38. Do & Don't

### Do

- Gunakan sidebar biru konsisten.
- Gunakan white cards di atas background light gray.
- Gunakan shadow lembut.
- Gunakan spacing lega.
- Gunakan status badge.
- Gunakan table yang readable.
- Gunakan icon outline.
- Gunakan BCA blue untuk primary action.
- Gunakan confirmation dialog untuk destructive action.

### Don't

- Jangan gunakan sidebar putih untuk admin layout utama.
- Jangan gunakan terlalu banyak warna.
- Jangan gunakan gradient selain sidebar kecuali sangat halus.
- Jangan gunakan shadow terlalu tebal.
- Jangan membuat card terlalu padat.
- Jangan menggunakan warna merah kecuali error/destructive.
- Jangan memakai animasi berlebihan.
- Jangan menghapus data tanpa modal konfirmasi.
- Jangan menggunakan logo resmi BCA tanpa izin.

---

## 39. Recommended File Structure

```text
resources/js/
├── Components/
│   └── Admin/
│       ├── AdminLayout.tsx
│       ├── AdminSidebar.tsx
│       ├── AdminTopbar.tsx
│       ├── PageHeader.tsx
│       ├── StatCard.tsx
│       ├── StatusBadge.tsx
│       ├── DataTable.tsx
│       ├── FilterBar.tsx
│       ├── EmptyState.tsx
│       └── ConfirmDialog.tsx
├── Pages/
│   └── Admin/
│       ├── Dashboard/
│       │   └── Index.tsx
│       ├── Villages/
│       │   ├── Index.tsx
│       │   ├── Show.tsx
│       │   └── Form.tsx
│       ├── SurveyTemplates/
│       │   ├── Index.tsx
│       │   ├── Show.tsx
│       │   └── Form.tsx
│       ├── SurveyAssignments/
│       │   ├── Index.tsx
│       │   └── Show.tsx
│       └── ReviewSurvey/
│           └── Index.tsx
```

---

## 40. Design Checklist Before Shipping

Use this checklist for every page:

- [ ] Sidebar uses blue gradient.
- [ ] Active sidebar menu is correct.
- [ ] Topbar is white with search and actions.
- [ ] Page header has breadcrumb, title, subtitle, and actions.
- [ ] Cards use white background, radius 16px, soft border, soft shadow.
- [ ] Main content uses light gray background.
- [ ] Typography follows Open Sans/corporate scale.
- [ ] Primary action uses `#0066AE`.
- [ ] Dangerous action uses confirmation modal.
- [ ] Status uses badge with text label.
- [ ] Tables have readable row height and clear header.
- [ ] Filters are easy to use and not overcrowded.
- [ ] Empty state and loading state exist.
- [ ] Responsive behavior is considered.
- [ ] UI copy uses Bahasa Indonesia.
- [ ] No unauthorized official BCA asset is used.

---

## 41. Example Page Blueprint

### Dashboard Admin

```text
AdminLayout
├── Sidebar active="Dashboard"
├── Topbar
└── Main
    ├── PageHeader
    │   ├── Breadcrumb: Dashboard
    │   ├── Title: Dashboard Admin
    │   ├── Subtitle
    │   ├── Button: Buat Assignment
    │   └── Button: Export Laporan
    ├── InfoCallout
    ├── KPIGrid
    ├── ContentGrid
    │   ├── LeftColumn
    │   │   ├── ProgressSurveyChart
    │   │   ├── ScoreTrendChart
    │   │   └── AssignmentSurveyTable
    │   └── RightColumn
    │       ├── PrioritasReview
    │       ├── AktivitasTerbaru
    │       └── QuickActions
```

### Listing Page

```text
AdminLayout
├── Sidebar active="{current module}"
├── Topbar
└── Main
    ├── PageHeader
    ├── SummaryCards
    ├── FilterBar
    ├── TableCard
    └── Pagination
```

---

## 42. Final UI Direction

All pages should look like one unified system:

- Blue sidebar as strong brand identity
- White topbar and white cards
- Light gray dashboard background
- Clean enterprise dashboard layout
- Calm BCA-inspired blue accents
- Clear data hierarchy
- Reusable components
- Professional CSR/social impact tone

This design system should be used as the baseline for every admin page in the Desa Wisata BCA / Social Impact CSR Aggregator platform.
