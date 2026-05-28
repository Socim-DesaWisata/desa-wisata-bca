# PRD — SocialImpact: Aggregator Desa Wisata BCA

**Versi:** 1.0  
**Tanggal:** 28 Mei 2026  
**Produk:** SocialImpact  
**Jenis Produk:** Website CSR / Aggregator Desa Wisata  
**Target Pengguna:** Admin CSR dan Enumerator Lapangan  
**Tech Stack:** Laravel, Inertia.js, React, TypeScript, shadcn/ui, Tailwind CSS, MySQL, Redis  

---

## 1. Ringkasan Produk

SocialImpact adalah website CSR yang berfungsi sebagai platform agregator, manajemen, dan monitoring data Desa Wisata BCA.

Platform ini digunakan untuk:

1. Mengelola data desa wisata binaan.
2. Mendokumentasikan profil dan potensi desa wisata.
3. Mengelola program CSR.
4. Menugaskan enumerator ke desa wisata.
5. Membuat template survey penilaian desa.
6. Melakukan survey berbasis skor angka dan dokumen pendukung opsional.
7. Mendukung pengisian survey secara kolaboratif oleh beberapa enumerator dalam satu desa.
8. Melihat hasil penilaian, progress survey, dan histori perubahan data.

---

## 2. Latar Belakang

Dalam program pendampingan Desa Wisata BCA, data desa, potensi wisata, fasilitas, produk lokal, dan hasil survey sering kali tersebar di berbagai dokumen atau media komunikasi. Hal ini menyulitkan admin CSR dalam melakukan monitoring, evaluasi, dan pengambilan keputusan.

SocialImpact hadir sebagai sistem terpusat untuk mengumpulkan, mengelola, dan mengevaluasi data desa wisata secara lebih terstruktur. Sistem ini juga memungkinkan enumerator lapangan mengisi data secara bertahap, menyimpan draft, dan melanjutkan pengisian survey secara kolaboratif.

---

## 3. Tujuan Produk

Tujuan utama SocialImpact adalah:

1. Menyediakan sistem terpusat untuk data desa wisata BCA.
2. Memudahkan admin membuat dan mengelola desa wisata.
3. Memudahkan enumerator melengkapi data profil desa wisata.
4. Memudahkan admin membuat template survey dengan rubrik skor berbeda per pertanyaan.
5. Memungkinkan survey satu desa dikerjakan bersama oleh beberapa enumerator.
6. Menyediakan audit trail untuk aktivitas survey dan perubahan jawaban.
7. Menyediakan dashboard monitoring status desa, progress survey, dan hasil skor.

---

## 4. Ruang Lingkup MVP

### 4.1 Termasuk dalam MVP

MVP mencakup:

1. Authentication dan authorization.
2. Role admin dan enumerator.
3. Manajemen user.
4. Manajemen program CSR.
5. Manajemen desa wisata.
6. Assignment enumerator ke desa wisata.
7. Manajemen media desa.
8. Manajemen kategori item profil desa.
9. Manajemen item profil desa.
10. Manajemen media item profil desa.
11. Manajemen template survey.
12. Manajemen pertanyaan survey.
13. Manajemen opsi skor per pertanyaan.
14. Assignment survey ke desa.
15. Pengisian survey kolaboratif.
16. Upload dokumen pendukung jawaban survey.
17. Save draft survey.
18. Submit survey.
19. Review survey.
20. Return survey.
21. Audit log status survey.
22. History perubahan jawaban survey.
23. Dashboard admin.
24. Dashboard enumerator.

### 4.2 Tidak Termasuk dalam MVP

Fitur berikut tidak masuk MVP tahap awal:

1. Public website untuk wisatawan.
2. Booking paket wisata.
3. Transaksi produk lokal.
4. Payment gateway.
5. Chat atau komentar antar user.
6. Mobile app native.
7. Offline-first survey.
8. AI recommendation.
9. Integrasi Google Maps API secara penuh.
10. Export laporan PDF otomatis.
11. Multi-sponsor selain BCA secara kompleks.

---

## 5. Role dan Hak Akses

## 5.1 Admin

Admin adalah pengguna yang mengelola sistem secara keseluruhan.

Admin dapat:

1. Login ke dashboard.
2. Membuat, mengedit, dan menonaktifkan user.
3. Membuat dan mengelola program CSR.
4. Membuat dan mengelola desa wisata.
5. Menugaskan enumerator ke desa wisata.
6. Mengelola kategori profil desa.
7. Melihat, mengedit, dan memvalidasi data profil desa.
8. Membuat template survey.
9. Membuat pertanyaan survey.
10. Membuat opsi skor per pertanyaan.
11. Menugaskan template survey ke desa.
12. Melihat progress pengisian survey.
13. Mereview survey yang sudah disubmit.
14. Mengembalikan survey untuk diperbaiki.
15. Melihat log aktivitas survey.
16. Melihat histori perubahan jawaban survey.
17. Melihat dashboard ringkasan desa dan survey.

## 5.2 Enumerator

Enumerator adalah pengguna lapangan yang bertugas mengisi data desa dan survey.

Enumerator dapat:

1. Login ke dashboard enumerator.
2. Melihat desa yang ditugaskan kepadanya.
3. Mengisi dan mengedit profil desa.
4. Mengupload foto, video, atau dokumen desa.
5. Menambah item profil desa seperti objek wisata, fasilitas, produk lokal, kuliner, budaya, event, homestay, atau paket wisata.
6. Mengisi survey desa yang ditugaskan.
7. Memilih opsi skor untuk setiap pertanyaan survey.
8. Mengupload dokumen pendukung pada jawaban survey.
9. Menyimpan survey sebagai draft.
10. Melanjutkan survey yang sudah dikerjakan enumerator lain.
11. Submit survey jika seluruh pertanyaan wajib sudah terisi.
12. Melihat status survey miliknya.

---

## 6. Konsep Data Utama

## 6.1 Desa Wisata

Desa wisata adalah entitas utama dalam sistem.

Data utama desa meliputi:

1. Kode desa.
2. Nama desa.
3. Slug.
4. Deskripsi.
5. Provinsi.
6. Kota/kabupaten.
7. Kecamatan.
8. Kelurahan/desa.
9. Alamat.
10. Kode pos.
11. Latitude.
12. Longitude.
13. Google Maps URL.
14. Nama pengelola.
15. Nomor telepon pengelola.
16. Email pengelola.
17. Status desa.

## 6.2 Program CSR

Program CSR digunakan untuk mengelompokkan desa ke dalam program tertentu.

Contoh:

1. Desa Wisata BCA 2026.
2. Program Digitalisasi Desa Wisata.
3. Program Pendampingan UMKM Desa Wisata.

Satu program dapat memiliki banyak desa. Satu desa juga dapat masuk ke beberapa program.

## 6.3 Profil Desa

Data profil desa yang bersifat fleksibel disimpan dalam konsep item profil desa.

Contoh kategori item profil desa:

1. Objek wisata.
2. Fasilitas.
3. Produk lokal.
4. Kuliner.
5. Akomodasi.
6. Budaya.
7. Event.
8. Paket wisata.
9. Lainnya.

Setiap item profil desa dapat memiliki media berupa image, video, atau dokumen.

---

## 7. Konsep Survey

## 7.1 Template Survey

Template survey dibuat oleh admin.

Satu template survey memiliki banyak pertanyaan. Setiap pertanyaan memiliki aspek langsung pada tabel pertanyaan.

Contoh aspek:

1. Kelembagaan.
2. Kemitraan.
3. Atraksi wisata.
4. Aksesibilitas.
5. Amenitas.
6. Digitalisasi.
7. Lingkungan.
8. Dampak ekonomi.

## 7.2 Pertanyaan Survey

Setiap pertanyaan memiliki:

1. Survey template.
2. Aspect.
3. Kode pertanyaan.
4. Teks pertanyaan.
5. Hint dokumen pendukung.
6. Urutan pertanyaan.

Sistem tidak menggunakan tabel `survey_aspects` terpisah. Aspect disimpan langsung di `survey_questions.aspect`.

## 7.3 Opsi Skor Pertanyaan

Setiap pertanyaan memiliki opsi skor sendiri.

Contoh pertanyaan:

> Apakah desa memiliki struktur organisasi pengelola wisata?

Opsi skor:

| Skor | Label |
|---:|---|
| 1 | Tidak tersedia |
| 2 | Tersedia tetapi belum aktif |
| 3 | Cukup aktif |
| 4 | Aktif dan terdokumentasi |
| 5 | Sangat aktif dan dievaluasi rutin |

Pertanyaan lain dapat memiliki label opsi yang berbeda walaupun nilai skornya sama.

## 7.4 Jawaban Survey

Jawaban survey hanya terdiri dari:

1. Opsi skor yang dipilih.
2. Nilai skor.
3. Dokumen pendukung opsional.

Tidak ada input teks bebas, catatan, foto khusus, pilihan ganda, atau jenis input lain untuk jawaban survey.

## 7.5 Survey Kolaboratif Per Desa

Aturan utama:

> Satu desa hanya memiliki satu data survey utama, yaitu satu `village_survey_assignments`.

Dalam satu survey desa, beberapa enumerator dapat mengisi pertanyaan yang berbeda.

Contoh:

1. Satu desa memiliki 20 pertanyaan.
2. Enumerator A mengisi 5 pertanyaan.
3. Enumerator A menyimpan survey sebagai draft.
4. Enumerator B membuka survey yang sama.
5. Enumerator B melanjutkan 15 pertanyaan lainnya.
6. Survey tetap berada dalam satu `village_survey_assignments`.

---

## 8. Workflow Utama

## 8.1 Workflow Admin Membuat Desa

1. Admin login.
2. Admin membuka menu Desa Wisata.
3. Admin klik Tambah Desa.
4. Admin mengisi data dasar desa.
5. Admin menyimpan data.
6. Sistem membuat record di `tourism_villages`.
7. Status awal desa adalah `draft`.

## 8.2 Workflow Admin Menugaskan Enumerator ke Desa

1. Admin membuka detail desa.
2. Admin memilih enumerator.
3. Admin klik Assign.
4. Sistem membuat record di `village_enumerator_assignments`.
5. Enumerator dapat melihat desa tersebut di dashboardnya.

## 8.3 Workflow Enumerator Mengisi Profil Desa

1. Enumerator login.
2. Enumerator membuka daftar desa yang ditugaskan.
3. Enumerator membuka detail desa.
4. Enumerator mengisi atau memperbarui data profil desa.
5. Enumerator menambah item profil desa.
6. Enumerator mengupload media desa atau media item profil.
7. Sistem menyimpan perubahan dengan `created_by` atau `uploaded_by`.

## 8.4 Workflow Admin Membuat Template Survey

1. Admin membuka menu Survey Templates.
2. Admin membuat template survey.
3. Admin menambah pertanyaan.
4. Admin menentukan aspect pada setiap pertanyaan.
5. Admin menambah opsi skor pada setiap pertanyaan.
6. Admin publish template.
7. Template siap digunakan untuk assignment survey desa.

## 8.5 Workflow Admin Membuat Survey Assignment Desa

1. Admin membuka detail desa.
2. Admin memilih template survey.
3. Admin membuat survey assignment.
4. Sistem membuat record di `village_survey_assignments`.
5. `village_id` bersifat unique agar satu desa hanya memiliki satu survey assignment aktif.
6. Sistem menyimpan `assigned_by` dan `assigned_at`.

## 8.6 Workflow Enumerator Mengisi Survey Draft

1. Enumerator membuka survey desa.
2. Sistem menampilkan daftar pertanyaan dari template survey.
3. Enumerator memilih opsi skor untuk pertanyaan tertentu.
4. Sistem menyimpan data ke `survey_answers`.
5. Jika jawaban baru dibuat, sistem menyimpan:
   - `answered_by`
   - `last_edited_by`
   - `answered_at`
   - `last_edited_at`
6. Jika jawaban lama diedit, sistem memperbarui:
   - `last_edited_by`
   - `last_edited_at`
7. Sistem menyimpan snapshot:
   - `aspect_snapshot`
   - `question_text_snapshot`
   - `option_label_snapshot`
8. Sistem menyimpan history ke `survey_answer_histories`.
9. Enumerator dapat upload dokumen pendukung opsional.
10. Enumerator klik Save Draft.
11. Sistem memperbarui `last_saved_at`.
12. Sistem membuat log `saved_draft`.

## 8.7 Workflow Survey Dilanjutkan Enumerator Lain

1. Enumerator B membuka survey desa yang sama.
2. Sistem menampilkan pertanyaan yang sudah dijawab dan belum dijawab.
3. Enumerator B mengisi pertanyaan yang belum terisi.
4. Jika Enumerator B mengubah jawaban Enumerator A, sistem:
   - memperbarui row yang sama di `survey_answers`
   - mengubah `last_edited_by`
   - membuat record di `survey_answer_histories`
5. Survey tetap satu assignment, bukan submission baru.

## 8.8 Workflow Submit Survey

1. Enumerator membuka survey.
2. Sistem memvalidasi seluruh pertanyaan wajib sudah dijawab.
3. Enumerator klik Submit.
4. Sistem mengubah status assignment menjadi `submitted`.
5. Sistem menyimpan `submitted_by` dan `submitted_at`.
6. Sistem membuat log `submitted`.

## 8.9 Workflow Review Survey

1. Admin membuka survey yang statusnya `submitted`.
2. Admin melihat seluruh jawaban dan dokumen pendukung.
3. Admin dapat melakukan review.
4. Jika valid, admin mengubah status menjadi `reviewed`.
5. Sistem menyimpan `reviewed_by` dan `reviewed_at`.
6. Sistem membuat log `reviewed`.

## 8.10 Workflow Return Survey

1. Admin membuka survey yang perlu diperbaiki.
2. Admin klik Return.
3. Sistem mengubah status menjadi `returned`.
4. Sistem membuat log `returned`.
5. Enumerator dapat memperbaiki jawaban.
6. Setelah diperbaiki, survey dapat disubmit ulang.

---

## 9. Business Rules

## 9.1 User dan Role

1. Email user harus unik.
2. User hanya memiliki satu role utama.
3. Role yang tersedia hanya `admin` dan `enumerator`.
4. User inactive tidak boleh login.

## 9.2 Desa Wisata

1. Kode desa harus unik.
2. Slug desa harus unik.
3. Desa dapat memiliki banyak media.
4. Desa dapat memiliki banyak item profil.
5. Desa dapat memiliki banyak enumerator.
6. Desa hanya memiliki satu survey assignment utama.

## 9.3 Program CSR

1. Satu program dapat memiliki banyak desa.
2. Satu desa dapat masuk ke banyak program.
3. Kombinasi `program_id` dan `village_id` harus unik.

## 9.4 Assignment Enumerator Desa

1. Satu enumerator dapat ditugaskan ke banyak desa.
2. Satu desa dapat memiliki banyak enumerator.
3. Kombinasi `village_id` dan `enumerator_id` harus unik.
4. Hanya enumerator yang aktif yang dapat mengisi data desa dan survey.

## 9.5 Template Survey

1. Template survey dapat berstatus `draft`, `published`, atau `archived`.
2. Template hanya dapat digunakan untuk assignment jika statusnya `published`.
3. Pertanyaan survey harus memiliki aspect.
4. Pertanyaan survey harus memiliki minimal satu opsi skor.

## 9.6 Survey Assignment

1. Satu desa hanya boleh memiliki satu record `village_survey_assignments`.
2. Status awal assignment adalah `assigned`.
3. Status dapat berubah menjadi:
   - `in_progress`
   - `submitted`
   - `reviewed`
   - `returned`
4. Survey yang sudah `reviewed` tidak boleh diedit oleh enumerator.
5. Survey `returned` dapat diedit ulang oleh enumerator.
6. Perubahan status wajib dicatat di `village_survey_assignment_logs`.

## 9.7 Jawaban Survey

1. Satu pertanyaan hanya boleh memiliki satu jawaban final dalam satu assignment.
2. Kombinasi `village_survey_assignment_id` dan `survey_question_id` harus unik.
3. Jawaban harus memilih salah satu `survey_question_options`.
4. Skor disalin dari opsi yang dipilih.
5. Dokumen pendukung bersifat opsional.
6. Setiap perubahan jawaban wajib dicatat di `survey_answer_histories`.
7. Jawaban menyimpan snapshot agar data historis tetap aman walaupun pertanyaan atau opsi diubah.

## 9.8 Dokumen Survey

1. Satu jawaban dapat memiliki nol, satu, atau banyak dokumen.
2. File dokumen harus memiliki nama file, path, mime type, dan ukuran file.
3. Upload dokumen mencatat `uploaded_by`.
4. Dokumen yang dihapus menggunakan soft delete.

---

## 10. Data Model Summary

## 10.1 Tabel User dan Program

| Tabel | Fungsi |
|---|---|
| `users` | Menyimpan akun admin dan enumerator |
| `csr_programs` | Menyimpan program CSR |
| `program_villages` | Pivot program CSR dan desa wisata |

## 10.2 Tabel Desa Wisata

| Tabel | Fungsi |
|---|---|
| `tourism_villages` | Data utama desa wisata |
| `village_enumerator_assignments` | Penugasan enumerator ke desa |
| `village_media` | Media utama desa |
| `village_profile_item_categories` | Master kategori item profil desa |
| `village_profile_items` | Data fleksibel profil desa |
| `village_profile_item_media` | Media untuk item profil desa |

## 10.3 Tabel Survey

| Tabel | Fungsi |
|---|---|
| `survey_templates` | Template survey |
| `survey_questions` | Pertanyaan survey beserta aspect |
| `survey_question_options` | Opsi skor per pertanyaan |
| `village_survey_assignments` | Satu data survey utama per desa |
| `survey_answers` | Jawaban survey per pertanyaan |
| `survey_answer_documents` | Dokumen pendukung jawaban |
| `village_survey_assignment_logs` | Log perubahan status survey |
| `survey_answer_histories` | History perubahan jawaban |

---

## 11. Halaman dan Fitur Frontend

## 11.1 Admin Layout

Admin menggunakan layout dashboard dengan sidebar.

Menu admin:

1. Dashboard.
2. Users.
3. CSR Programs.
4. Desa Wisata.
5. Kategori Profil Desa.
6. Survey Templates.
7. Survey Assignments.
8. Review Survey.
9. Audit Logs.
10. Settings.

## 11.2 Enumerator Layout

Enumerator menggunakan layout dashboard sederhana.

Menu enumerator:

1. Dashboard.
2. Desa Saya.
3. Survey Saya.
4. Profil Saya.

---

## 12. Detail Halaman Admin

## 12.1 Admin Dashboard

Menampilkan:

1. Total desa wisata.
2. Total program CSR.
3. Total enumerator aktif.
4. Total survey assigned.
5. Total survey in progress.
6. Total survey submitted.
7. Total survey reviewed.
8. Desa terbaru.
9. Progress survey per desa.
10. Aktivitas terbaru.

Komponen shadcn/ui:

1. `Card`
2. `Table`
3. `Badge`
4. `Progress`
5. `Button`
6. `DropdownMenu`

## 12.2 User Management

Fitur:

1. List user.
2. Search user.
3. Filter role.
4. Filter status.
5. Create user.
6. Edit user.
7. Activate/deactivate user.
8. Reset password.

Field user:

1. Name.
2. Email.
3. Phone.
4. Role.
5. Status.
6. Avatar.

## 12.3 CSR Program Management

Fitur:

1. List program.
2. Create program.
3. Edit program.
4. Archive program.
5. Assign desa ke program.
6. Remove desa dari program.

Field program:

1. Name.
2. Sponsor name.
3. Description.
4. Year.
5. Status.

## 12.4 Desa Wisata Management

Fitur:

1. List desa.
2. Search desa.
3. Filter status.
4. Filter provinsi/kota.
5. Create desa.
6. Edit desa.
7. Delete desa.
8. Detail desa.
9. Assign enumerator.
10. Upload media desa.
11. Manage profile items.
12. Create survey assignment.

Field desa:

1. Code.
2. Name.
3. Slug.
4. Description.
5. Province.
6. City.
7. District.
8. Subdistrict.
9. Address.
10. Postal code.
11. Latitude.
12. Longitude.
13. Maps URL.
14. Manager name.
15. Manager phone.
16. Manager email.
17. Status.

## 12.5 Kategori Profil Desa

Fitur:

1. List kategori.
2. Create kategori.
3. Edit kategori.
4. Set active/inactive.
5. Sort kategori.

Contoh kategori:

1. Objek Wisata.
2. Fasilitas.
3. Produk Lokal.
4. Kuliner.
5. Akomodasi.
6. Budaya.
7. Event.
8. Paket Wisata.
9. Lainnya.

## 12.6 Survey Template Builder

Fitur:

1. List template.
2. Create template.
3. Edit template.
4. Publish template.
5. Archive template.
6. Add question.
7. Edit question.
8. Delete question.
9. Reorder question.
10. Add score option.
11. Edit score option.
12. Delete score option.
13. Reorder score option.

Form template:

1. Title.
2. Description.
3. Status.

Form question:

1. Aspect.
2. Code.
3. Question text.
4. Document hint.
5. Sort order.

Form option:

1. Score.
2. Label.
3. Sort order.

## 12.7 Survey Assignment Detail

Menampilkan:

1. Desa.
2. Template survey.
3. Status.
4. Assigned by.
5. Submitted by.
6. Reviewed by.
7. Assigned at.
8. Started at.
9. Last saved at.
10. Submitted at.
11. Reviewed at.
12. Progress jawaban.
13. List jawaban.
14. List dokumen.
15. Activity logs.
16. Answer histories.

Aksi admin:

1. Review survey.
2. Return survey.
3. View history.
4. Download dokumen pendukung.

---

## 13. Detail Halaman Enumerator

## 13.1 Enumerator Dashboard

Menampilkan:

1. Total desa yang ditugaskan.
2. Survey assigned.
3. Survey in progress.
4. Survey returned.
5. Survey submitted.
6. Daftar desa terbaru yang perlu diisi.

## 13.2 Desa Saya

Menampilkan daftar desa yang ditugaskan ke enumerator.

Kolom:

1. Nama desa.
2. Lokasi.
3. Status profil.
4. Status survey.
5. Last saved.
6. Aksi.

## 13.3 Form Profil Desa

Enumerator dapat:

1. Edit deskripsi desa.
2. Edit alamat.
3. Edit koordinat.
4. Edit kontak pengelola.
5. Upload foto/video desa.
6. Tambah item profil.
7. Upload media item profil.

## 13.4 Form Survey

Fitur:

1. Tampilkan pertanyaan berdasarkan aspect.
2. Tampilkan opsi skor per pertanyaan.
3. Pilih opsi skor.
4. Upload dokumen pendukung opsional.
5. Simpan per jawaban.
6. Save draft.
7. Submit survey.
8. Tampilkan progress jumlah pertanyaan terjawab.
9. Tampilkan siapa yang menjawab dan terakhir mengedit.
10. Lock form jika status `reviewed`.

---

## 14. UI/UX Requirements

## 14.1 Design Direction

Desain harus terasa:

1. Profesional.
2. Modern.
3. Bersih.
4. Cocok untuk platform CSR dan monitoring.
5. Mudah digunakan enumerator lapangan.
6. Responsif untuk desktop dan tablet.
7. Tetap nyaman digunakan di mobile browser.

## 14.2 Visual Style

Rekomendasi style:

1. Background: white atau warm off-white.
2. Primary color: hijau/biru corporate.
3. Accent: soft emerald, blue, atau teal.
4. Card dengan rounded corners.
5. Border tipis.
6. Shadow halus.
7. Typography jelas.
8. Tabel rapi dan mudah dibaca.

## 14.3 Komponen shadcn/ui

Gunakan komponen:

1. `Button`
2. `Input`
3. `Textarea`
4. `Select`
5. `Combobox`
6. `Dialog`
7. `AlertDialog`
8. `Sheet`
9. `Card`
10. `Table`
11. `Badge`
12. `Tabs`
13. `Accordion`
14. `Progress`
15. `DropdownMenu`
16. `Toast`
17. `Form`
18. `Breadcrumb`
19. `Pagination`
20. `Skeleton`

---

## 15. Technical Requirements

## 15.1 Backend

Framework:

1. Laravel.
2. PHP 8.3 atau versi stabil terbaru.
3. MySQL sebagai database utama.
4. Redis untuk cache, queue, session, atau rate limiting.
5. Laravel Storage untuk file upload.
6. Laravel Queue untuk proses berat seperti upload processing atau export.

Rekomendasi package:

1. Laravel Breeze Inertia atau Laravel Jetstream Inertia.
2. Spatie Laravel Permission jika ingin role/permission lebih fleksibel.
3. Laravel Sanctum jika nanti butuh API mobile.
4. Laravel Telescope untuk debugging development.
5. Laravel Pint untuk code style.
6. Pest atau PHPUnit untuk testing.

## 15.2 Frontend

Framework:

1. Inertia.js.
2. React.
3. TypeScript.
4. shadcn/ui.
5. Tailwind CSS.
6. Vite.

Rekomendasi library:

1. `react-hook-form`
2. `zod`
3. `@hookform/resolvers`
4. `lucide-react`
5. `date-fns`
6. `recharts` untuk chart dashboard
7. `sonner` untuk toast

## 15.3 Database

Database menggunakan MySQL.

Karakteristik database:

1. Menggunakan foreign key.
2. Menggunakan soft delete pada data penting.
3. Menggunakan unique index untuk menjaga konsistensi.
4. Menggunakan JSON pada `metadata` untuk data item profil desa yang fleksibel.
5. Menggunakan history table untuk audit trail.

## 15.4 Redis

Redis digunakan untuk:

1. Cache dashboard summary.
2. Queue jobs.
3. Session jika dibutuhkan.
4. Rate limiting.
5. Temporary progress state untuk upload atau background process.

## 15.5 File Storage

File yang diupload:

1. Village media.
2. Village profile item media.
3. Survey answer documents.
4. Avatar user.

Penyimpanan MVP:

1. Local storage Laravel untuk development.
2. Public disk untuk file publik.
3. Private disk untuk dokumen survey yang sensitif.

Future-ready:

1. S3-compatible storage.
2. MinIO.
3. Cloud storage.

---

## 16. Suggested Laravel Architecture

## 16.1 Folder Backend

Contoh struktur:

```text
app/
├── Actions/
│   ├── Villages/
│   ├── Surveys/
│   └── Media/
├── Enums/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/
│   │   └── Enumerator/
│   ├── Requests/
│   └── Resources/
├── Models/
├── Policies/
├── Services/
│   ├── SurveyScoringService.php
│   ├── SurveyAuditService.php
│   └── FileUploadService.php
└── Jobs/
```

## 16.2 Suggested Models

Model utama:

1. `User`
2. `CsrProgram`
3. `TourismVillage`
4. `ProgramVillage`
5. `VillageEnumeratorAssignment`
6. `VillageMedia`
7. `VillageProfileItemCategory`
8. `VillageProfileItem`
9. `VillageProfileItemMedia`
10. `SurveyTemplate`
11. `SurveyQuestion`
12. `SurveyQuestionOption`
13. `VillageSurveyAssignment`
14. `SurveyAnswer`
15. `SurveyAnswerDocument`
16. `VillageSurveyAssignmentLog`
17. `SurveyAnswerHistory`

## 16.3 Suggested Services

### SurveyScoringService

Bertanggung jawab untuk:

1. Menghitung total pertanyaan.
2. Menghitung jumlah pertanyaan terjawab.
3. Menghitung average score.
4. Menghitung progress per aspect.
5. Memvalidasi apakah survey siap submit.

### SurveyAuditService

Bertanggung jawab untuk:

1. Membuat log assignment.
2. Membuat history jawaban.
3. Menyimpan perubahan status.
4. Menyimpan perubahan skor.

### FileUploadService

Bertanggung jawab untuk:

1. Validasi file.
2. Menyimpan file.
3. Membuat path.
4. Menghapus file jika dibutuhkan.
5. Mengembalikan metadata file.

---

## 17. Suggested Inertia Pages

## 17.1 Admin Pages

```text
resources/js/Pages/Admin/Dashboard/Index.tsx
resources/js/Pages/Admin/Users/Index.tsx
resources/js/Pages/Admin/Users/Create.tsx
resources/js/Pages/Admin/Users/Edit.tsx

resources/js/Pages/Admin/CsrPrograms/Index.tsx
resources/js/Pages/Admin/CsrPrograms/Create.tsx
resources/js/Pages/Admin/CsrPrograms/Edit.tsx
resources/js/Pages/Admin/CsrPrograms/Show.tsx

resources/js/Pages/Admin/Villages/Index.tsx
resources/js/Pages/Admin/Villages/Create.tsx
resources/js/Pages/Admin/Villages/Edit.tsx
resources/js/Pages/Admin/Villages/Show.tsx

resources/js/Pages/Admin/VillageProfileItemCategories/Index.tsx

resources/js/Pages/Admin/SurveyTemplates/Index.tsx
resources/js/Pages/Admin/SurveyTemplates/Create.tsx
resources/js/Pages/Admin/SurveyTemplates/Edit.tsx
resources/js/Pages/Admin/SurveyTemplates/Builder.tsx

resources/js/Pages/Admin/SurveyAssignments/Index.tsx
resources/js/Pages/Admin/SurveyAssignments/Show.tsx
resources/js/Pages/Admin/SurveyAssignments/Review.tsx

resources/js/Pages/Admin/AuditLogs/Index.tsx
```

## 17.2 Enumerator Pages

```text
resources/js/Pages/Enumerator/Dashboard/Index.tsx
resources/js/Pages/Enumerator/Villages/Index.tsx
resources/js/Pages/Enumerator/Villages/Show.tsx
resources/js/Pages/Enumerator/Villages/EditProfile.tsx
resources/js/Pages/Enumerator/Surveys/Index.tsx
resources/js/Pages/Enumerator/Surveys/Fill.tsx
resources/js/Pages/Enumerator/Profile/Edit.tsx
```

---

## 18. Suggested Routes

## 18.1 Admin Routes

```php
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');

        Route::resource('users', AdminUserController::class);
        Route::resource('csr-programs', AdminCsrProgramController::class);
        Route::resource('villages', AdminVillageController::class);
        Route::resource('village-profile-item-categories', AdminVillageProfileItemCategoryController::class);

        Route::resource('survey-templates', AdminSurveyTemplateController::class);
        Route::get('survey-templates/{surveyTemplate}/builder', [AdminSurveyTemplateBuilderController::class, 'edit'])->name('survey-templates.builder');
        Route::post('survey-templates/{surveyTemplate}/questions', [AdminSurveyQuestionController::class, 'store'])->name('survey-templates.questions.store');
        Route::post('survey-questions/{surveyQuestion}/options', [AdminSurveyQuestionOptionController::class, 'store'])->name('survey-questions.options.store');

        Route::resource('survey-assignments', AdminSurveyAssignmentController::class)->only(['index', 'show', 'store']);
        Route::post('survey-assignments/{assignment}/review', [AdminSurveyReviewController::class, 'review'])->name('survey-assignments.review');
        Route::post('survey-assignments/{assignment}/return', [AdminSurveyReviewController::class, 'return'])->name('survey-assignments.return');
    });
```

## 18.2 Enumerator Routes

```php
Route::middleware(['auth', 'role:enumerator'])
    ->prefix('enumerator')
    ->name('enumerator.')
    ->group(function () {
        Route::get('/dashboard', EnumeratorDashboardController::class)->name('dashboard');

        Route::get('/villages', [EnumeratorVillageController::class, 'index'])->name('villages.index');
        Route::get('/villages/{village}', [EnumeratorVillageController::class, 'show'])->name('villages.show');
        Route::put('/villages/{village}/profile', [EnumeratorVillageProfileController::class, 'update'])->name('villages.profile.update');

        Route::get('/surveys', [EnumeratorSurveyController::class, 'index'])->name('surveys.index');
        Route::get('/surveys/{assignment}/fill', [EnumeratorSurveyController::class, 'fill'])->name('surveys.fill');
        Route::post('/surveys/{assignment}/answers', [EnumeratorSurveyAnswerController::class, 'store'])->name('surveys.answers.store');
        Route::put('/surveys/{assignment}/answers/{answer}', [EnumeratorSurveyAnswerController::class, 'update'])->name('surveys.answers.update');
        Route::post('/surveys/{assignment}/save-draft', [EnumeratorSurveyController::class, 'saveDraft'])->name('surveys.save-draft');
        Route::post('/surveys/{assignment}/submit', [EnumeratorSurveyController::class, 'submit'])->name('surveys.submit');
    });
```

---

## 19. Validation Rules

## 19.1 User

1. Name required.
2. Email required, valid email, unique.
3. Role required, must be admin or enumerator.
4. Password required on create.
5. Password optional on update.
6. Status required.

## 19.2 Desa

1. Code required and unique.
2. Name required.
3. Slug required and unique.
4. Latitude nullable numeric.
5. Longitude nullable numeric.
6. Manager email nullable valid email.

## 19.3 Village Profile Item

1. Village required.
2. Category required.
3. Name required.
4. Price min nullable numeric.
5. Price max nullable numeric.
6. Metadata nullable JSON.

## 19.4 Survey Template

1. Title required.
2. Status required.
3. Cannot publish if no question.
4. Cannot publish if a question has no option.

## 19.5 Survey Question

1. Survey template required.
2. Aspect required.
3. Question text required.
4. Code nullable but should be unique within template if filled.
5. Sort order numeric.

## 19.6 Survey Question Option

1. Survey question required.
2. Score required numeric.
3. Label required.
4. Score unique per question.
5. Sort order numeric.

## 19.7 Survey Answer

1. Village survey assignment required.
2. Survey question required.
3. Survey question option required.
4. Option must belong to the selected question.
5. Score copied from selected option.
6. User must be assigned to the village.
7. Cannot update if assignment status is `reviewed`.

## 19.8 Survey Answer Document

1. Survey answer required.
2. File required.
3. Allowed MIME types should include PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG.
4. File size should be limited by system configuration.
5. Uploaded by required.

---

## 20. Dashboard Metrics

## 20.1 Admin Dashboard Metrics

1. Total desa wisata.
2. Total desa by status.
3. Total active programs.
4. Total enumerator active.
5. Total survey assigned.
6. Total survey in progress.
7. Total survey submitted.
8. Total survey reviewed.
9. Average survey score overall.
10. Desa dengan survey belum selesai.
11. Recent survey activities.

## 20.2 Enumerator Dashboard Metrics

1. Total desa assigned.
2. Total survey assigned.
3. Total survey in progress.
4. Total survey returned.
5. Total survey submitted.
6. Last saved survey.
7. Pending questions per survey.

---

## 21. Survey Scoring Logic

## 21.1 Average Score

Average score dihitung dari seluruh jawaban dalam satu `village_survey_assignments`.

Formula:

```text
average_score = total_score / answered_questions
```

## 21.2 Progress Survey

Progress survey dihitung dari jumlah pertanyaan yang sudah dijawab dibanding total pertanyaan dari template.

Formula:

```text
progress_percentage = answered_questions / total_questions * 100
```

## 21.3 Aspect Summary

Aspect summary dapat dihitung langsung dari:

```text
survey_answers
JOIN survey_questions
GROUP BY survey_questions.aspect
```

Pada MVP, aspect summary bisa dihitung on-demand. Jika dashboard terasa lambat, dapat ditambahkan tabel summary/cache seperti `survey_aspect_scores`.

---

## 22. Audit Trail

## 22.1 Assignment Logs

Setiap perubahan status survey dicatat di `village_survey_assignment_logs`.

Contoh action:

1. `assigned`
2. `started`
3. `saved_draft`
4. `submitted`
5. `reviewed`
6. `returned`
7. `status_changed`

Data yang dicatat:

1. Assignment ID.
2. Actor ID.
3. Action.
4. From status.
5. To status.
6. Description.
7. Metadata.
8. Created at.

## 22.2 Answer Histories

Setiap perubahan jawaban survey dicatat di `survey_answer_histories`.

Contoh action:

1. `created`
2. `updated`
3. `document_uploaded`
4. `document_deleted`

Data yang dicatat:

1. Survey answer ID.
2. Assignment ID.
3. Question ID.
4. Actor ID.
5. Action.
6. Old option.
7. New option.
8. Old score.
9. New score.
10. Old option label.
11. New option label.
12. Created at.

---

## 23. Security Requirements

1. Semua halaman wajib menggunakan authentication.
2. Role admin dan enumerator wajib dipisahkan.
3. Enumerator hanya dapat melihat desa yang ditugaskan.
4. Enumerator hanya dapat mengisi survey desa yang ditugaskan.
5. Admin dapat melihat seluruh data.
6. Dokumen survey tidak boleh diakses publik tanpa otorisasi.
7. File upload wajib divalidasi.
8. Input form wajib divalidasi server-side.
9. Gunakan CSRF protection bawaan Laravel.
10. Gunakan policy untuk akses model penting.
11. Gunakan rate limiting untuk endpoint upload dan auth.
12. Password disimpan menggunakan hashing Laravel.
13. Soft delete digunakan untuk data penting.

---

## 24. Performance Requirements

1. List data harus menggunakan pagination.
2. Dashboard summary dapat dicache di Redis.
3. Query list desa harus mendukung search dan filter.
4. Query survey detail harus eager load relasi penting.
5. Upload file besar dapat diproses dengan queue jika diperlukan.
6. Tabel history harus diberi index pada assignment, answer, question, dan actor.
7. Dashboard tidak boleh melakukan query agregasi berat berulang tanpa caching.

---

## 25. Error Handling

Sistem harus menangani error berikut:

1. User tidak memiliki akses ke desa.
2. User tidak memiliki akses ke survey.
3. Survey sudah reviewed dan tidak dapat diedit.
4. Pertanyaan tidak ditemukan.
5. Opsi skor tidak sesuai pertanyaan.
6. File terlalu besar.
7. Format file tidak didukung.
8. Survey belum lengkap saat submit.
9. Assignment survey untuk desa sudah ada.
10. Data sudah dihapus atau tidak aktif.

---

## 26. Acceptance Criteria

## 26.1 Authentication

- User dapat login.
- User diarahkan ke dashboard sesuai role.
- User inactive tidak dapat login.

## 26.2 Admin Desa Wisata

- Admin dapat membuat desa.
- Admin dapat mengedit desa.
- Admin dapat menghapus desa.
- Admin dapat assign enumerator.
- Admin dapat melihat detail desa.

## 26.3 Enumerator Desa Wisata

- Enumerator hanya melihat desa yang ditugaskan.
- Enumerator dapat mengedit profil desa yang ditugaskan.
- Enumerator dapat menambah item profil desa.
- Enumerator dapat upload media desa.

## 26.4 Survey Template

- Admin dapat membuat template survey.
- Admin dapat menambah pertanyaan.
- Admin dapat mengisi aspect pada pertanyaan.
- Admin dapat menambah opsi skor per pertanyaan.
- Admin tidak dapat publish template jika pertanyaan belum punya opsi.

## 26.5 Survey Assignment

- Admin dapat membuat survey assignment untuk desa.
- Satu desa hanya boleh memiliki satu survey assignment.
- Assignment menyimpan `assigned_by` dan `assigned_at`.

## 26.6 Survey Fill

- Enumerator dapat memilih opsi skor.
- Sistem menyimpan score dari opsi.
- Enumerator dapat upload dokumen opsional.
- Enumerator dapat save draft.
- Survey dapat dilanjutkan enumerator lain.
- Satu pertanyaan hanya memiliki satu jawaban final per assignment.

## 26.7 Survey Submit

- Survey tidak dapat submit jika pertanyaan wajib belum lengkap.
- Survey yang lengkap dapat disubmit.
- Sistem menyimpan `submitted_by` dan `submitted_at`.
- Sistem mencatat log `submitted`.

## 26.8 Survey Review

- Admin dapat review survey submitted.
- Admin dapat return survey.
- Survey reviewed tidak dapat diedit enumerator.
- Semua perubahan status tercatat di log.

## 26.9 Audit Trail

- Perubahan jawaban tercatat di `survey_answer_histories`.
- Perubahan status assignment tercatat di `village_survey_assignment_logs`.
- Admin dapat melihat riwayat perubahan.

---

## 27. Milestone Development

## Milestone 1 — Project Setup

1. Setup Laravel Inertia React TypeScript.
2. Setup shadcn/ui dan Tailwind CSS.
3. Setup MySQL.
4. Setup Redis.
5. Setup authentication.
6. Setup role middleware.

## Milestone 2 — User dan Master Data

1. User management.
2. CSR program management.
3. Desa wisata management.
4. Enumerator assignment.
5. Village media upload.

## Milestone 3 — Profil Desa

1. Kategori item profil desa.
2. CRUD item profil desa.
3. Upload media item profil.
4. Enumerator village profile page.

## Milestone 4 — Survey Template

1. CRUD survey template.
2. CRUD survey question.
3. CRUD survey question option.
4. Publish/archive survey template.

## Milestone 5 — Survey Assignment dan Fill

1. Create survey assignment.
2. Enumerator survey fill page.
3. Save answer.
4. Upload document.
5. Save draft.
6. Collaborative survey editing.

## Milestone 6 — Review dan Audit

1. Submit survey.
2. Review survey.
3. Return survey.
4. Assignment logs.
5. Answer histories.
6. Admin review page.

## Milestone 7 — Dashboard dan Polish

1. Admin dashboard.
2. Enumerator dashboard.
3. Filter/search.
4. UI polish.
5. Validation polish.
6. Testing.
7. Deployment preparation.

---

## 28. Future Enhancements

1. Export laporan PDF.
2. Export Excel.
3. Public profile page untuk desa wisata.
4. Map-based dashboard.
5. Grafik skor per aspek.
6. Multi-period survey.
7. Offline survey support.
8. Mobile app enumerator.
9. Notification system.
10. AI summary untuk hasil survey.
11. Approval bertingkat.
12. Versioning template survey.
13. S3/MinIO storage.
14. Integration dengan Google Maps.
15. Public tourism catalog.

---

## 29. Notes for Developer

1. Gunakan policy untuk semua akses desa dan survey.
2. Jangan izinkan enumerator mengakses desa yang bukan assignment-nya.
3. Pastikan `village_survey_assignments.village_id` unique agar satu desa hanya memiliki satu survey utama.
4. Pastikan `survey_answers` memiliki unique index pada `village_survey_assignment_id` dan `survey_question_id`.
5. Simpan snapshot jawaban untuk menjaga histori.
6. Simpan history jawaban setiap create/update.
7. Simpan assignment log setiap perubahan status.
8. Gunakan transaction saat menyimpan jawaban dan history.
9. Gunakan transaction saat submit survey.
10. Gunakan Redis cache untuk dashboard jika query mulai berat.
