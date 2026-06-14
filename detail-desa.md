# Design Reference — Website Desa Wisata

## Overview

Website Desa Wisata ini menggunakan pendekatan visual **natural tourism landing page**: latar dominan putih-krem (`{colors.canvas}` — #f5f3ee), aksen hijau alam sebagai identitas utama (`{colors.primary}` — #1f4d2e), dan sentuhan coklat keemasan (`{colors.accent-gold}` — #c47a2c) untuk ikon, CTA sekunder, harga, rating, dan highlight kecil. Sistem desain terasa hangat, asri, ramah, dan lokal, dengan fokus utama pada **foto alam, sawah, gunung, aktivitas budaya, homestay, dan kehidupan masyarakat desa**.

Tampilan halaman menggabungkan nuansa **desa wisata otentik** dengan kualitas UI modern: hero visual besar, headline serif yang emosional, kartu paket wisata bersih, statistik ringkas, section tentang desa, atraksi, galeri, testimoni, FAQ, artikel, CTA banner, dan footer informatif. Website tidak terlihat seperti portal pemerintahan yang padat, melainkan seperti landing page promosi wisata yang rapi, kredibel, dan mudah digunakan wisatawan.

Energi visual utama berasal dari **fotografi desa**: gunung, hamparan sawah, rumah joglo / pendopo, warga lokal, kesenian tradisional, kegiatan edukasi, dan suasana alam. UI chrome tetap sederhana: card putih, border tipis, ikon kecil, typography jelas, dan spacing konsisten.

**Key Characteristics:**
- Latar utama soft cream / off-white (`{colors.canvas}` — #f5f3ee) agar website terasa hangat dan natural.
- Warna utama hijau tua (`{colors.primary}` — #1f4d2e) untuk logo, CTA utama, status, headline kecil, dan elemen identitas desa.
- Heading besar menggunakan serif display yang hangat dan editorial, bukan sans-serif korporat.
- Body, navigasi, label, dan metadata menggunakan sans-serif modern agar tetap mudah dibaca.
- Foto wisata menjadi elemen visual utama; card dan container hanya mendukung konten.
- Card menggunakan radius besar dan shadow halus untuk kesan modern, ramah, dan tidak kaku.
- Layout padat tetapi tetap rapi: banyak informasi dalam satu homepage, namun hierarchy tetap jelas.
- CTA menggunakan bahasa langsung seperti “Jelajahi Wisata”, “Hubungi Kami”, “Reservasi”, dan “Pesan Sekarang”.
- Ikon bernuansa outline dengan aksen coklat / hijau agar terasa natural dan tidak terlalu digital.

## Colors

### Brand & Accent
- **Primary Green** (`{colors.primary}` — #1f4d2e): Warna utama brand desa wisata. Digunakan untuk logo, tombol utama, angka statistik, price highlight, label penting, dan elemen aktif.
- **Deep Forest** (`{colors.deep-forest}` — #173820): Varian hijau lebih gelap untuk footer logo, heading penting, overlay foto, dan state aktif yang membutuhkan kontras tinggi.
- **Leaf Green** (`{colors.leaf}` — #4f7a36): Aksen hijau natural untuk ikon, badge, small highlight, dan elemen eco-tourism.
- **Moss Green** (`{colors.moss}` — #63713a): Aksen hijau lembut untuk ilustrasi, tag kategori, dan detail ornamental kecil.
- **Accent Gold** (`{colors.accent-gold}` — #c47a2c): Warna aksen hangat untuk CTA sekunder, rating star, ikon paket, harga, link “Lihat Semua”, dan highlight budaya.
- **Earth Brown** (`{colors.earth}` — #8f682a): Digunakan untuk nuansa budaya, ikon tradisi, garis kecil, dan elemen yang berhubungan dengan lokal / heritage.

### Surface
- **Canvas** (`{colors.canvas}` — #f5f3ee): Latar utama halaman. Memberi kesan hangat seperti kertas natural / tourism brochure.
- **Surface** (`{colors.surface}` — #ffffff): Card, navbar, statistik, FAQ accordion, testimonial, artikel, dan input newsletter.
- **Surface Warm** (`{colors.surface-warm}` — #efe8db): Section footer, background subtle, area low-emphasis, dan band transisi.
- **Surface Soft Green** (`{colors.surface-soft-green}` — #eef4e8): Background lembut untuk badge hijau, icon container, dan highlight ramah lingkungan.
- **CTA Overlay Green** (`{colors.cta-overlay}` — #21472b): Overlay gelap pada banner foto CTA agar teks putih tetap terbaca.

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — #e3d8c8): Border utama untuk card, accordion, input, dan divider halus.
- **Hairline Strong** (`{colors.hairline-strong}` — #d0c2ac): Border lebih kuat untuk section yang butuh struktur, seperti card paket dan footer.
- **Image Stroke** (`{colors.image-stroke}` — #f0e7d8): Border tipis di sekitar gambar kecil agar tetap menyatu dengan canvas.

### Text
- **Ink** (`{colors.ink}` — #26311f): Headline utama, nav aktif, title card, dan teks penting.
- **Body** (`{colors.body}` — #59564c): Body paragraph, deskripsi paket, FAQ answer, dan informasi footer.
- **Body Strong** (`{colors.body-strong}` — #3f4235): Lead paragraph, section intro, dan konten yang perlu penekanan.
- **Muted** (`{colors.muted}` — #8a8577): Metadata, tanggal artikel, label kecil, alamat, copyright, dan secondary information.
- **On Dark** (`{colors.on-dark}` — #ffffff): Teks di atas overlay hijau gelap atau foto gelap.
- **On CTA** (`{colors.on-cta}` — #ffffff): Label tombol utama di atas hijau tua.

### Semantic
- **Success** (`{colors.success}` — #2e7d32): Status positif, eco badge, rating high score, dan verifikasi.
- **Warning** (`{colors.warning}` — #f4b44f): Rating stars, limited promo, dan highlight event.
- **Error** (`{colors.error}` — #b94a3a): State error pada form atau validasi reservasi.
- **Info** (`{colors.info}` — #4f8fa8): Info ringan, link peta, dan label edukasi.

## Typography

### Font Family
Sistem typography menggabungkan serif editorial untuk headline dan sans-serif modern untuk UI.

- **Display / Headline:** `Playfair Display`, `Lora`, `Georgia`, serif.
- **Body / UI:** `Inter`, `Plus Jakarta Sans`, `Nunito Sans`, `system-ui`, sans-serif.

Serif display memberi kesan hangat, cerita, dan heritage desa. Sans-serif UI menjaga keterbacaan untuk navigasi, harga, rating, FAQ, dan data paket wisata.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---:|---:|---:|---:|---|
| `{typography.display-xl}` | 48px | 700 | 1.05 | -0.5px | Hero headline utama |
| `{typography.display-lg}` | 36px | 700 | 1.1 | -0.3px | Section besar / CTA banner |
| `{typography.display-md}` | 28px | 700 | 1.15 | 0 | About title, section heading utama |
| `{typography.display-sm}` | 22px | 700 | 1.2 | 0 | Card group title, footer logo text |
| `{typography.title-lg}` | 18px | 700 | 1.3 | 0 | Title card paket, atraksi, artikel |
| `{typography.title-md}` | 16px | 700 | 1.35 | 0 | FAQ question, testimonial name, feature title |
| `{typography.title-sm}` | 14px | 700 | 1.35 | 0 | Label statistik, price title, nav active |
| `{typography.body-lg}` | 16px | 400 | 1.6 | 0 | Lead paragraph hero / about |
| `{typography.body-md}` | 14px | 400 | 1.55 | 0 | Body paragraph default |
| `{typography.body-sm}` | 12px | 400 | 1.45 | 0 | Description card, metadata, footer body |
| `{typography.caption}` | 11px | 500 | 1.35 | 0.2px | Rating, duration, date, category |
| `{typography.button}` | 13px | 700 | 1.0 | 0.2px | Button label |
| `{typography.nav-link}` | 13px | 600 | 1.2 | 0 | Top navigation |
| `{typography.stat-number}` | 20px | 800 | 1.0 | 0 | Angka statistik seperti 28+, 15+, 10.000+ |

### Principles
Heading utama harus terasa seperti kalimat promosi wisata yang emosional dan mudah diingat. Gunakan serif display untuk headline seperti “Rasakan Pengalaman Wisata Desa yang Otentik, Asri, dan Berkesan”. Hindari uppercase penuh pada headline besar karena akan menghilangkan nuansa ramah dan storytelling.

Body text harus pendek, informatif, dan mudah dipindai. Website ini bukan artikel panjang; mayoritas konten muncul sebagai ringkasan section, deskripsi kartu, label statistik, dan CTA. Gunakan paragraph maksimal 2–3 baris pada area card.

### Note on Font Substitutes
Jika `Playfair Display` tidak tersedia, gunakan `Lora` untuk headline agar tetap terasa natural dan editorial. Jika `Inter` tidak tersedia, gunakan `Plus Jakarta Sans` atau `Nunito Sans` untuk menjaga kesan modern dan ramah Indonesia.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 72px.
- **Section padding vertical:** 48–72px pada desktop, 40–56px pada tablet, 32–40px pada mobile.
- **Card padding:** 16–20px untuk card kecil, 24px untuk card utama, 32px untuk hero / CTA content.
- **Gutters:** 16px untuk grid card, 24px untuk section 2-column, 32px untuk hero layout.
- **Hero internal padding:** 80px top dan 72px bottom agar hero terasa lapang.

### Grid & Container
- **Max content width:** 1180px centered.
- **Hero:** 2-column editorial composition: text di kiri, foto/collage di kanan atau background image penuh dengan content overlay.
- **Stats strip:** 4-up horizontal card yang overlap bagian bawah hero.
- **About section:** 2-column layout; foto besar kiri, teks dan highlight feature kanan.
- **Paket wisata:** 4-up card grid di desktop, 2-up tablet, 1-up mobile.
- **Why choose us:** horizontal icon feature row, tidak perlu card besar agar section terasa ringan.
- **Atraksi wisata:** compact 6-up image cards di desktop.
- **Gallery + Testimonial:** 2-column asymmetric layout; gallery visual lebih dominan, testimonial lebih text-based.
- **FAQ + Artikel:** 2-column layout; FAQ accordion kiri, artikel card kanan.
- **Footer:** 4-column layout pada desktop: brand, tautan cepat, informasi, newsletter.

### Whitespace Philosophy
Whitespace harus terasa seperti ruang napas di pedesaan: hangat, terbuka, dan tidak padat. Walaupun homepage memuat banyak section, setiap area harus dipisahkan dengan heading yang jelas, spacing antar section, dan card yang ringan. Jangan membuat semua konten dalam card tebal; gunakan kombinasi antara image block, icon row, dan text group.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, canvas background | Section dasar, area teks, footer top |
| Soft Surface | White card, 1px hairline, subtle shadow | Paket wisata, testimonial, FAQ, artikel |
| Floating | White card, shadow medium, overlap hero | Statistik hero strip |
| Image Depth | Foto dengan radius besar dan subtle overlay | Hero, about, gallery, CTA banner |
| Dark Overlay | Gradient hijau gelap di atas foto | CTA banner, hero text overlay jika perlu |

Depth didapat dari kombinasi card putih di atas canvas krem, foto natural yang kaya detail, dan shadow halus. Jangan gunakan shadow keras, glassmorphism, neon, atau gradient SaaS yang berlebihan.

### Decorative Depth
- **Natural icon badge:** Icon kecil dalam lingkaran / rounded square warna warm cream atau soft green.
- **Photo collage:** Hero menggunakan kombinasi foto sawah, gunung, pendopo, wisatawan, dan budaya lokal.
- **Soft organic shadow:** Card menggunakan shadow sangat halus untuk memberi layer tanpa terasa digital berlebihan.
- **Green overlay banner:** CTA banner menggunakan foto alam dengan overlay hijau tua agar teks putih terbaca.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---:|---|
| `{rounded.none}` | 0px | Divider, hairline, table-like info rows |
| `{rounded.xs}` | 4px | Small badge, rating tag, micro label |
| `{rounded.sm}` | 8px | Input, small button, FAQ accordion |
| `{rounded.md}` | 12px | Card kecil, article card, testimonial |
| `{rounded.lg}` | 16px | Package card, gallery image, stat strip |
| `{rounded.xl}` | 24px | Hero image, about image, CTA banner |
| `{rounded.full}` | 9999px | Pill button, icon circle, avatar |

Radius besar memberi kesan ramah dan modern. Namun radius tidak boleh terlalu ekstrem seperti aplikasi anak-anak; tetap elegan dan natural.

### Photography Geometry
- Hero visual menggunakan crop landscape lebar, menampilkan sawah / gunung / aktivitas budaya.
- About image menggunakan aspect ratio 4:3 dengan radius `{rounded.xl}`.
- Package card image menggunakan 4:3 atau 16:10.
- Atraksi card image menggunakan 1:1 atau 4:3 compact.
- Gallery menggunakan masonry / asymmetric grid untuk memberi dinamika visual.
- Testimonial avatar menggunakan lingkaran kecil `{rounded.full}`.

## Components

### Top Navigation

**`top-nav`** — Navbar putih / cream setinggi 64px dengan logo di kiri, menu horizontal di tengah, dan CTA `Reservasi` di kanan. Background `{colors.surface}` dengan shadow sangat halus atau hairline bawah. Menu menggunakan `{typography.nav-link}` dan warna `{colors.ink}`. Active menu menggunakan underline hijau kecil atau text `{colors.primary}`.

**Logo treatment:** logo desa wisata kecil dengan ilustrasi gunung / daun / sawah. Nama desa ditulis dua baris: “Desa Wisata” dan nama lokasi. Warna utama hijau tua dengan aksen coklat atau orange kecil.

### Buttons

**`button-primary`** — Tombol utama hijau tua. Background `{colors.primary}`, text `{colors.on-cta}`, rounded `{rounded.full}` atau `{rounded.sm}`, height 42–46px, padding 12px × 20px, font `{typography.button}`. Digunakan untuk “Reservasi”, “Jelajahi Wisata”, dan “Pesan Sekarang”.

**`button-secondary`** — Tombol putih dengan border `{colors.hairline-strong}`, text `{colors.ink}`, rounded `{rounded.full}`, height 42–46px. Digunakan untuk “Hubungi Kami” di hero.

**`button-ghost-link`** — Link kecil tanpa background, text `{colors.accent-gold}` atau `{colors.primary}`, font `{typography.caption}` / `{typography.title-sm}`. Digunakan untuk “Lihat Semua Paket”, “Lihat Semua Atraksi”, dan “Lihat Semua Artikel”.

**`button-icon`** — Tombol icon kecil berbentuk lingkaran 36–40px. Background `{colors.surface-soft-green}` atau `{colors.surface}`. Icon hijau tua atau earth brown.

### Hero

**`hero-tourism-band`** — Section pembuka dengan background foto alam desa. Komposisi visual: teks hero di kiri, foto besar / scenic collage di kanan. Hero harus menampilkan gunung, sawah, dan aktivitas budaya agar langsung menjelaskan konteks desa wisata.

Content hero:
- Eyebrow kecil: “Desa Wisata Pentingsari” atau nama desa.
- H1 serif besar: “Rasakan Pengalaman Wisata Desa yang Otentik, Asri, dan Berkesan”.
- Body 2–3 baris tentang keindahan alam, pelayanan budaya lokal, dan keramahan masyarakat.
- CTA row: `Jelajahi Wisata` dan `Hubungi Kami`.

**`hero-stat-strip`** — Card putih mengambang di bawah hero. Layout 4 kolom: `28+ Paket Wisata`, `15+ Atraksi Lokal`, `10.000+ Pengunjung`, `100% Berbasis Masyarakat`. Icon menggunakan aksen earth brown, angka menggunakan hijau tua. Rounded `{rounded.lg}`, shadow halus, padding 20px.

### About Section

**`about-split`** — Layout 2 kolom. Kiri foto wisatawan di sawah / jembatan / alam. Kanan heading “Tentang Desa Wisata”, body paragraph, dan 3 highlight compact.

**`about-highlight-item`** — Icon circle dengan warna hijau / coklat, title bold, body pendek. Contoh: `Alami Cepat`, `Pengalaman Edukasi`, `Keringan & Keluarga` atau disesuaikan menjadi `Alam Asri`, `Budaya Lokal`, `Ramah Keluarga`.

### Package Cards

**`package-card`** — Card putih dengan image top, title, duration, location, rating, dan harga. Rounded `{rounded.md}`, hairline border, shadow halus. Card harus ringkas agar 4 card muat dalam satu baris.

Struktur:
- Image 4:3.
- Title `{typography.title-sm}`.
- Metadata row: duration, location.
- Rating: star warna `{colors.warning}` dan angka rating kecil.
- Price: text hijau atau earth brown.
- Optional button kecil: “Detail” atau “Reservasi”.

Contoh card:
- Paket Jelajah Desa
- Paket Edukasi & Budaya
- Paket Alam & Petualangan
- Paket Homestay

### Why Choose Us

**`why-feature-row`** — Baris icon feature 5 kolom atau 4 kolom. Tidak perlu card besar; cukup icon, title, dan deskripsi pendek. Section ini harus terasa ringan dan memperkuat kepercayaan.

Feature contoh:
- Berbasis Masyarakat
- Otentik & Bermakna
- Ramah Lingkungan
- Akomodasi Nyaman
- Kuliner Lokal

### Attraction Cards

**`attraction-card`** — Compact image card dengan foto kecil di atas dan title di bawah. Digunakan untuk atraksi seperti `Persawahan & Pemandangan Merapi`, `Upacara & Kesenian Tradisional`, `Belajar Membatik & Kerajinan`, `Agrowisata & Kebun Organik`, `Jelajah Sungai & Susur Alam`, `Pasar & Produk UMKM`.

Card harus lebih sederhana dari package-card. Fokusnya visual discovery, bukan transaksi.

### Gallery

**`gallery-preview-grid`** — Masonry / asymmetric grid dengan satu foto besar dan beberapa foto kecil. Menampilkan sawah, warga, budaya, kuliner, homestay, dan aktivitas outdoor. Image menggunakan rounded `{rounded.md}` dan gap 8–12px.

### Testimonials

**`testimonial-card`** — Card putih horizontal compact dengan avatar kecil, nama, lokasi/role, rating star, testimonial pendek, dan chevron arrow. Cocok untuk menampilkan 2 testimonial di samping gallery.

Tone testimonial harus natural dan personal, misalnya:
- “Pengalaman seru, masyarakatnya ramah, suasana indah, dan kegiatannya berkesan.”
- “Anak-anak belajar budaya langsung dari warga lokal.”

### FAQ

**`faq-accordion`** — Accordion putih dengan border halus, radius `{rounded.sm}`, dan icon chevron kanan. Pertanyaan pendek, answer tersembunyi atau ringkas. FAQ ditempatkan kiri pada section bawah.

Pertanyaan contoh:
- Bagaimana cara menuju Desa Wisata?
- Apakah ada fasilitas homestay?
- Apakah cocok untuk anak-anak dan lansia?
- Apakah bisa rombongan sekolah atau komunitas?

### Articles

**`article-card`** — Card artikel kecil dengan image top, category, date, dan title. Digunakan untuk “Artikel & Cerita Desa”. Layout 3-up compact di kanan FAQ atau full-width pada halaman artikel.

Contoh artikel:
- Mengenal Tradisi Welcoming Desa Pentingsari
- Manfaat Bertani Organik untuk Masa Depan
- UMKM Desa Pentingsari: Karya Lokal, Bangga Lokal

### CTA Banner

**`cta-photo-banner`** — Banner lebar sebelum footer dengan foto alam / sawah / kegiatan desa dan overlay hijau gelap. Rounded `{rounded.xl}`. Teks putih di kiri, tombol gold / orange di kanan. Memberi penutup yang kuat sebelum footer.

Content contoh:
- Headline: “Siap Menjelajahi Keindahan dan Keaslian Desa?”
- Body: “Rencanakan perjalanan Anda sekarang dan rasakan pengalaman tak terlupakan di Desa Wisata Pentingsari.”
- Button: “Pesan Sekarang”.

### Footer

**`footer`** — Footer cream hangat dengan 4 kolom: brand description, tautan cepat, informasi kontak, newsletter. Background `{colors.surface-warm}`. Logo di kiri, social icons kecil, text muted. Bottom row berisi copyright, kebijakan privasi, dan syarat & ketentuan.

Footer tidak boleh terlalu gelap; pertahankan suasana hangat dan natural sampai akhir halaman.

### Forms

**`newsletter-input`** — Input email putih dengan border `{colors.hairline}`, rounded `{rounded.sm}`, height 42px. Button langganan hijau tua di sebelah kanan atau di bawah pada mobile.

**`reservation-contact-link`** — Link WhatsApp / kontak menggunakan tombol hijau atau ghost link gold. Harus terlihat mudah diakses dari hero, package, CTA banner, dan footer.

## Do's and Don'ts

### Do
- Gunakan foto asli desa, alam, sawah, budaya, homestay, UMKM, dan aktivitas masyarakat sebagai daya tarik utama.
- Gunakan heading serif untuk menciptakan nuansa storytelling dan heritage.
- Pertahankan warna hijau tua sebagai identitas utama website desa wisata.
- Gunakan cream / off-white sebagai canvas agar halaman terasa hangat dan tidak terlalu corporate.
- Buat CTA jelas dan mudah ditemukan: Reservasi, Hubungi Kami, Jelajahi Wisata.
- Gunakan card putih dengan border tipis dan shadow halus untuk paket, testimoni, FAQ, dan artikel.
- Susun konten agar bisa dipindai cepat oleh wisatawan: headline, gambar, ringkasan, rating, harga, CTA.
- Pakai ikon natural seperti daun, gunung, rumah, kalender, orang, peta, dan keranjang UMKM.
- Jaga semua gambar memiliki radius dan tone warna yang konsisten.

### Don't
- Jangan membuat desain seperti portal berita pemerintahan yang penuh teks dan tabel.
- Jangan menggunakan warna neon, biru SaaS dominan, atau gradient digital berlebihan.
- Jangan membuat semua section dalam card besar; kombinasikan image, text, dan icon row agar tidak monoton.
- Jangan memakai typography terlalu modern-futuristik karena tidak cocok dengan nuansa desa wisata.
- Jangan menggunakan headline uppercase penuh; desain ini membutuhkan tone ramah dan natural.
- Jangan membuat CTA terlalu banyak warna. Gunakan hijau utama dan gold/orange sebagai aksen terbatas.
- Jangan menaruh terlalu banyak teks panjang di card paket wisata.
- Jangan memakai foto generik kota / hotel modern; visual harus tetap desa, alam, budaya, dan masyarakat lokal.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---:|---|
| Mobile | < 768px | Navbar jadi hamburger; hero 1-column; stats jadi 2-up atau stacked; paket 1-up; gallery stack; footer 1-column |
| Tablet | 768–1024px | Hero tetap 2-column ringan; paket 2-up; atraksi 3-up; FAQ + artikel stack bila sempit |
| Desktop | 1024–1440px | Full navbar; hero 2-column; paket 4-up; atraksi 6-up; footer 4-column |
| Wide | > 1440px | Max container tetap 1180–1240px; foto hero bisa lebih lebar dengan crop lebih sinematik |

### Touch Targets
- Button utama minimal height 44px.
- Icon button minimal 40×40px.
- FAQ accordion minimal 44px height.
- Card clickable area harus jelas pada package, attraction, dan article.
- Newsletter input minimal height 42px.

### Collapsing Strategy
- Top navigation collapse ke hamburger pada mobile; CTA “Reservasi” tetap terlihat sebagai tombol utama atau masuk ke menu drawer.
- Hero text muncul di atas image atau sebelum image pada mobile agar pesan utama tidak hilang.
- Stats strip tidak perlu overlap hero pada mobile; letakkan sebagai card normal setelah hero.
- Package cards stack 1 per row dengan image tetap 16:10.
- Gallery masonry berubah menjadi grid 2 kolom atau stack vertikal.
- FAQ dan artikel menjadi section terpisah agar tidak terlalu padat.
- Footer newsletter menjadi full-width input + button di bawahnya.

### Image Behavior
- Hero image crop responsif: desktop landscape, mobile portrait / vertical crop.
- Hindari wajah atau objek penting terpotong saat crop mobile.
- Semua gambar harus menggunakan object-fit: cover.
- Gunakan overlay hanya ketika teks berada langsung di atas foto.
- Optimalkan gambar agar tetap tajam tetapi ringan untuk website tourism.

## Iteration Guide

1. Mulai dari `{component.hero-tourism-band}` karena hero menentukan tone keseluruhan website.
2. Pastikan `{colors.primary}` hijau tua menjadi identitas utama, bukan sekadar aksen kecil.
3. Gunakan `{colors.canvas}` sebagai background utama dan `{colors.surface}` untuk card.
4. Heading besar menggunakan serif display, sedangkan UI dan body tetap sans-serif.
5. Buat semua card menggunakan radius `{rounded.md}` atau `{rounded.lg}` agar terasa modern dan ramah.
6. Jangan menambah dekorasi berlebihan; prioritaskan foto desa dan hierarchy konten.
7. Setiap section harus memiliki satu tujuan: promosi, edukasi, kepercayaan, atau konversi.
8. Untuk halaman turunan seperti paket wisata, galeri, dan artikel, gunakan komponen yang sama dari homepage agar identitas visual konsisten.
9. Jika ingin membuat versi mobile, pertahankan CTA `Reservasi` dan `Hubungi Kami` di area atas.
10. Ketika ragu, pilih foto yang lebih kuat daripada menambah ornamen UI.

## Known Gaps

- Referensi ini dibuat berdasarkan satu screenshot landing page; state hover, active, loading, dan error belum terlihat.
- Detail ukuran font dan spacing adalah estimasi visual dari screenshot, bukan hasil inspect CSS asli.
- Warna token diambil dari pendekatan visual screenshot dan sampling dominan gambar; bisa disesuaikan setelah implementasi brand final.
- Tidak ada contoh halaman detail paket, halaman booking, atau halaman artikel penuh dalam screenshot.
- Tidak ada desain mobile dalam screenshot; responsive behavior dibuat sebagai rekomendasi desain.
- Icon set spesifik tidak teridentifikasi; gunakan icon outline yang konsisten, misalnya Lucide, Phosphor, atau Heroicons.
- Foto asli sangat menentukan kualitas desain. Jika menggunakan foto stok yang tidak relevan dengan desa, sistem visual akan terasa kurang otentik.
