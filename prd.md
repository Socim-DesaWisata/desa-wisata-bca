# PRD — SocialImpact: Aggregator Desa Wisata BCA

**Versi:** 2.0  
**Tanggal:** 4 Juni 2026  
**Produk:** SocialImpact  
**Jenis Produk:** Website CSR / Aggregator Desa Wisata  
**Target Pengguna:** Admin CSR dan Enumerator Lapangan  
**Tech Stack:** Laravel, Inertia.js, React, TypeScript, shadcn/ui, Tailwind CSS, MySQL, Redis  
**Acuan:** PRD versi sebelumnya dan ERD terbaru yang sudah mencakup modul Desa, UMKM, Pariwisata, Survey Desa, Survey UMKM, dan Survey Pariwisata.

---

## 1. Ringkasan Produk

SocialImpact adalah website CSR yang berfungsi sebagai platform agregator, manajemen, survey, dan monitoring data Desa Wisata BCA.

Platform ini digunakan untuk:

1. Mengelola data desa wisata binaan BCA.
2. Mendokumentasikan profil dan potensi desa wisata.
3. Mengelola program CSR.
4. Menugaskan enumerator ke desa wisata.
5. Mengelola data UMKM di setiap desa.
6. Mengelola data destinasi pariwisata di setiap desa.
7. Membuat dan mengelola template survey desa.
8. Membuat dan mengelola assessment UMKM berbasis kriteria, bobot, dan nilai.
9. Membuat dan mengelola matrix survey pariwisata berbasis kategori, kriteria, indikator, bukti pendukung, dan harkat/peringkat.
10. Mendukung pengisian survey oleh enumerator lapangan.
11. Mendukung upload dokumen pendukung survey.
12. Melihat hasil penilaian, progress survey, data UMKM, data destinasi wisata, dan histori perubahan data.

---

## 2. Latar Belakang

Dalam program pendampingan Desa Wisata BCA, data desa, potensi wisata, UMKM lokal, fasilitas, produk unggulan, dan hasil survey sering kali tersebar dalam dokumen, spreadsheet, foto, dan media komunikasi. Kondisi ini menyulitkan admin CSR dalam melakukan monitoring, evaluasi, validasi, dan pengambilan keputusan berbasis data.

PRD versi sebelumnya sudah mencakup manajemen desa wisata dan survey desa. Namun, kebutuhan terbaru menambahkan dua area penting:

1. **Data dan survey UMKM** — satu desa dapat memiliki banyak UMKM, dan setiap UMKM perlu diprofilkan serta dinilai menggunakan assessment berbobot.
2. **Data dan survey pariwisata** — satu desa dapat memiliki banyak destinasi wisata, dan penilaian pariwisata mengikuti matrix sertifikasi desa wisata dengan kategori, sub kategori, kriteria, indikator, bukti pendukung, dan opsi harkat/peringkat.

SocialImpact versi ini menjadi sistem terpusat untuk mengelola data desa, UMKM, destinasi wisata, survey desa, assessment UMKM, dan survey pariwisata secara lebih terstruktur.

---

## 3. Tujuan Produk

Tujuan utama SocialImpact adalah:

1. Menyediakan sistem terpusat untuk data Desa Wisata BCA.
2. Memudahkan admin membuat dan mengelola desa wisata.
3. Memudahkan enumerator melengkapi data profil desa wisata.
4. Memudahkan enumerator mencatat data UMKM di setiap desa.
5. Memudahkan enumerator mencatat data destinasi pariwisata di setiap desa.
6. Memudahkan admin membuat template survey desa.
7. Memudahkan admin membuat master pertanyaan assessment UMKM berbasis kriteria dan bobot.
8. Memudahkan admin membuat master matrix survey pariwisata berbasis kategori, kriteria, indikator, dan opsi harkat/peringkat.
9. Menyediakan workflow pengisian, submit, review, dan return survey desa.
10. Menyediakan sistem scoring untuk survey desa, assessment UMKM, dan survey pariwisata.
11. Menyediakan audit trail untuk aktivitas survey dan perubahan jawaban.
12. Menyediakan dashboard monitoring status desa, data UMKM, destinasi wisata, progress survey, dan hasil skor.

---

## 4. Ringkasan Perubahan dari PRD Sebelumnya

PRD versi 2.0 memperluas PRD sebelumnya dengan perubahan utama berikut:

| Area | PRD Sebelumnya | PRD Revisi |
|---|---|---|
| Data UMKM | Belum tersedia | Ditambahkan `village_umkms` |
| Survey UMKM | Belum tersedia | Ditambahkan `umkm_survey_questions` dan `umkm_survey_answers` |
| Data Pariwisata | Masih dapat dicatat sebagai item profil desa | Ditambahkan `pariwisata_village_table` dan `pariwisata_village_category` |
| Survey Pariwisata | Belum tersedia | Ditambahkan `pariwisata_survey_questions`, `pariwisata_suvey_options`, `pariwisata_survey_answers`, dan dokumen pendukung |
| Dashboard | Fokus desa dan survey desa | Ditambah metrik UMKM, destinasi wisata, assessment UMKM, dan survey pariwisata |
| Halaman Admin | Fokus desa dan survey desa | Ditambah manajemen UMKM, destinasi wisata, master survey UMKM, dan master survey pariwisata |
| Halaman Enumerator | Fokus profil desa dan survey desa | Ditambah input UMKM, input destinasi wisata, assessment UMKM, dan survey pariwisata |

---

## 5. Ruang Lingkup MVP

### 5.1 Termasuk dalam MVP

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
12. Manajemen pertanyaan survey desa.
13. Manajemen opsi skor survey desa.
14. Assignment survey desa.
15. Pengisian survey desa secara kolaboratif.
16. Upload dokumen pendukung jawaban survey desa.
17. Save draft survey desa.
18. Submit survey desa.
19. Review survey desa.
20. Return survey desa.
21. Audit log status survey desa.
22. History perubahan jawaban survey desa.
23. Manajemen data UMKM desa.
24. Manajemen assessment question UMKM.
25. Pengisian nilai assessment UMKM.
26. Perhitungan normalized score dan weighted score UMKM.
27. Manajemen data destinasi pariwisata desa.
28. Manajemen kategori destinasi pariwisata.
29. Manajemen matrix survey pariwisata.
30. Manajemen opsi harkat/peringkat pariwisata.
31. Pengisian survey pariwisata.
32. Upload dokumen bukti pendukung survey pariwisata.
33. Dashboard admin.
34. Dashboard enumerator.

### 5.2 Tidak Termasuk dalam MVP

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
12. Marketplace UMKM.
13. Sistem inventory produk UMKM.
14. Approval bertingkat untuk survey UMKM dan survey pariwisata.
15. Versioning kompleks untuk template assessment.

---

## 6. Role dan Hak Akses

## 6.1 Admin

Admin adalah pengguna yang mengelola sistem secara keseluruhan.

Admin dapat:

1. Login ke dashboard admin.
2. Membuat, mengedit, dan menonaktifkan user.
3. Membuat dan mengelola program CSR.
4. Membuat dan mengelola desa wisata.
5. Menugaskan enumerator ke desa wisata.
6. Mengelola kategori profil desa.
7. Melihat, mengedit, dan memvalidasi data profil desa.
8. Melihat dan mengelola data UMKM desa.
9. Melihat dan mengelola data destinasi pariwisata desa.
10. Membuat template survey.
11. Membuat pertanyaan survey desa.
12. Membuat opsi skor survey desa.
13. Membuat master pertanyaan assessment UMKM.
14. Membuat master matrix survey pariwisata.
15. Membuat opsi harkat/peringkat survey pariwisata.
16. Menugaskan template survey ke desa.
17. Melihat progress pengisian survey.
18. Melihat hasil assessment UMKM.
19. Melihat hasil survey pariwisata.
20. Mereview survey desa yang sudah disubmit.
21. Mengembalikan survey desa untuk diperbaiki.
22. Melihat log aktivitas survey.
23. Melihat histori perubahan jawaban survey.
24. Melihat dashboard ringkasan desa, UMKM, pariwisata, dan survey.

## 6.2 Enumerator

Enumerator adalah pengguna lapangan yang bertugas mengisi data desa, UMKM, destinasi wisata, dan survey.

Enumerator dapat:

1. Login ke dashboard enumerator.
2. Melihat desa yang ditugaskan kepadanya.
3. Mengisi dan mengedit profil desa.
4. Mengupload foto, video, atau dokumen desa.
5. Menambah item profil desa seperti fasilitas, produk lokal, budaya, event, homestay, atau paket wisata.
6. Menambah dan mengedit data UMKM pada desa yang ditugaskan.
7. Mengisi assessment UMKM.
8. Menambah dan mengedit data destinasi pariwisata pada desa yang ditugaskan.
9. Mengisi survey pariwisata.
10. Mengupload dokumen pendukung survey pariwisata.
11. Mengisi survey desa yang ditugaskan.
12. Memilih opsi skor untuk setiap pertanyaan survey desa.
13. Mengupload dokumen pendukung pada jawaban survey desa.
14. Menyimpan survey sebagai draft.
15. Melanjutkan survey desa yang sudah dikerjakan enumerator lain.
16. Submit survey desa jika seluruh pertanyaan wajib sudah terisi.
17. Melihat status survey miliknya.

---

## 7. Konsep Data Utama

## 7.1 Desa Wisata

Desa wisata adalah entitas utama dalam sistem. Data utama desa disimpan pada `tourism_villages`.

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

## 7.2 Program CSR

Program CSR digunakan untuk mengelompokkan desa ke dalam program tertentu. Data program disimpan di `csr_programs`, sedangkan relasi program dan desa disimpan di `program_villages`.

Contoh program:

1. Desa Wisata BCA 2026.
2. Program Digitalisasi Desa Wisata.
3. Program Pendampingan UMKM Desa Wisata.

## 7.3 Profil Desa

Data profil desa yang fleksibel disimpan di `village_profile_items` dan dikelompokkan menggunakan `village_profile_item_categories`.

Contoh kategori profil desa:

1. Fasilitas.
2. Produk lokal.
3. Kuliner.
4. Akomodasi.
5. Budaya.
6. Event.
7. Paket wisata.
8. Lainnya.

Catatan: destinasi wisata utama sekarang memiliki table khusus `pariwisata_village_table`, sehingga tidak wajib lagi dimasukkan sebagai `village_profile_items`.

## 7.4 UMKM Desa

Satu desa dapat memiliki banyak UMKM. Data UMKM disimpan pada `village_umkms`.

Data UMKM meliputi:

1. Nama pelaku UMKM.
2. Nama desa saat data dikumpulkan.
3. Nama pengumpul data.
4. Nama UMKM.
5. Nama lengkap badan usaha.
6. Tahun berdiri.
7. Website perusahaan.
8. Alamat tempat produksi.
9. Kategori produk.
10. Merk dagang.
11. Omset per tahun.
12. Kapasitas produksi rata-rata per bulan.
13. Kendala yang sedang dihadapi.
14. Sertifikasi yang dimiliki.
15. Legalitas usaha dan sertifikasi.
16. Status peserta UMKM.
17. Kapasitas produksi per tahun.
18. Kelayakan lokasi pabrik.
19. Kanal pemasaran digital.
20. Catatan sustainability.
21. Informasi solusi perbankan.
22. Status ekspor.
23. Negara tujuan ekspor.
24. Foto produk.

## 7.5 Destinasi Pariwisata

Satu desa dapat memiliki banyak destinasi wisata. Data destinasi wisata disimpan pada `pariwisata_village_table`.

Data destinasi wisata meliputi:

1. Nama destinasi wisata.
2. Kategori destinasi wisata.
3. Waktu operasional.
4. Tiket masuk.
5. Alamat destinasi wisata.
6. Nama penanggung jawab destinasi.
7. Nomor telepon penanggung jawab.
8. Alamat penanggung jawab.

Kategori destinasi wisata disimpan di `pariwisata_village_category` dengan enum:

1. `wisata_alam`
2. `wisata_buatan`
3. `wisata_religi`
4. `wisata_budaya`
5. `wisata_kuliner`
6. `wisata_edukasi`

## 7.6 Survey Desa

Survey desa adalah survey utama untuk satu desa. Satu desa hanya memiliki satu `village_survey_assignments` karena `village_id` bersifat unique.

Survey desa menggunakan:

1. `survey_templates`
2. `survey_questions`
3. `survey_question_options`
4. `village_survey_assignments`
5. `survey_answers`
6. `survey_answer_documents`
7. `village_survey_assignment_logs`
8. `survey_answer_histories`

## 7.7 Survey UMKM

Survey UMKM adalah assessment berbasis kriteria, bobot, dan nilai.

Survey UMKM menggunakan:

1. `umkm_survey_questions`
2. `umkm_survey_answers`

Struktur assessment UMKM:

1. `criteria_code` menyimpan kode kelompok, contoh A, B, C.
2. `criteria_name` menyimpan nama kelompok, contoh Kualitas Produk.
3. `criteria_weight_percent` menyimpan bobot total kelompok, contoh 25%.
4. `question_number` menyimpan nomor pertanyaan.
5. `question_text` menyimpan isi pertanyaan.
6. `question_weight_percent` menyimpan bobot pertanyaan, contoh 10%, 8%, 3%, 4%.
7. `max_score` menyimpan nilai maksimal, default 4.
8. `score` pada `umkm_survey_answers` menyimpan nilai yang diisi enumerator.
9. `normalized_score` dan `weighted_score` menyimpan hasil perhitungan nilai.

## 7.8 Survey Pariwisata

Survey pariwisata mengikuti matrix penilaian sertifikasi desa wisata.

Survey pariwisata menggunakan:

1. `pariwisata_survey_questions`
2. `pariwisata_suvey_options`
3. `pariwisata_survey_answers`
4. `pariwisata_survey_answer_documents`

Struktur matrix pariwisata:

1. `category_code` dan `category_name` untuk kategori besar.
2. `sub_category_code` dan `sub_category_name` untuk sub kategori.
3. `criteria_code`, `criteria_name`, dan `criteria_description` untuk kriteria.
4. `indicator_code`, `indicator_name`, dan `indicator_description` untuk indikator.
5. `supporting_evidence` untuk bukti pendukung yang perlu diperiksa atau diupload.
6. `pariwisata_suvey_options` untuk pilihan harkat/peringkat 4, 3, 2, dan 1.
7. `pariwisata_survey_answers` untuk jawaban, score, catatan, dan snapshot.
8. `pariwisata_survey_answer_documents` untuk file bukti pendukung.

---

## 8. Data Model Summary

## 8.1 Tabel User dan Program

| Tabel | Fungsi |
|---|---|
| `users` | Menyimpan akun admin dan enumerator |
| `csr_programs` | Menyimpan program CSR |
| `program_villages` | Pivot program CSR dan desa wisata |

## 8.2 Tabel Desa Wisata

| Tabel | Fungsi |
|---|---|
| `tourism_villages` | Data utama desa wisata |
| `village_enumerator_assignments` | Penugasan enumerator ke desa |
| `village_media` | Media utama desa |
| `village_profile_item_categories` | Master kategori item profil desa |
| `village_profile_items` | Data fleksibel profil desa |
| `village_profile_item_media` | Media untuk item profil desa |

## 8.3 Tabel Survey Desa

| Tabel | Fungsi |
|---|---|
| `survey_templates` | Template survey desa, UMKM, dan pariwisata |
| `survey_questions` | Pertanyaan survey desa berbasis aspek |
| `survey_question_options` | Opsi skor per pertanyaan survey desa |
| `village_survey_assignments` | Satu data survey utama per desa |
| `survey_answers` | Jawaban survey desa per pertanyaan |
| `survey_answer_documents` | Dokumen pendukung jawaban survey desa |
| `village_survey_assignment_logs` | Log perubahan status survey desa |
| `survey_answer_histories` | History perubahan jawaban survey desa |

## 8.4 Tabel UMKM

| Tabel | Fungsi |
|---|---|
| `village_umkms` | Master data UMKM di desa |
| `umkm_survey_questions` | Master pertanyaan assessment UMKM berbasis kriteria dan bobot |
| `umkm_survey_answers` | Jawaban/nilai assessment UMKM |

## 8.5 Tabel Pariwisata

| Tabel | Fungsi |
|---|---|
| `pariwisata_village_table` | Master data destinasi wisata di desa |
| `pariwisata_village_category` | Kategori destinasi wisata, mendukung multi-kategori |
| `pariwisata_survey_questions` | Master matrix survey pariwisata |
| `pariwisata_suvey_options` | Opsi harkat/peringkat untuk survey pariwisata |
| `pariwisata_survey_answers` | Jawaban survey pariwisata |
| `pariwisata_survey_answer_documents` | Dokumen bukti pendukung jawaban survey pariwisata |

---

## 9. Modul dan Fitur Utama

## 9.1 Authentication dan Authorization

Fitur:

1. Login.
2. Logout.
3. Role admin dan enumerator.
4. Middleware berdasarkan role.
5. User inactive tidak dapat login.
6. Enumerator hanya dapat mengakses desa yang ditugaskan.

## 9.2 User Management

Fitur admin:

1. List user.
2. Search user.
3. Filter role.
4. Filter status.
5. Create user.
6. Edit user.
7. Activate/deactivate user.
8. Reset password.

## 9.3 CSR Program Management

Fitur admin:

1. List program.
2. Create program.
3. Edit program.
4. Archive program.
5. Assign desa ke program.
6. Remove desa dari program.

## 9.4 Desa Wisata Management

Fitur admin:

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
12. Manage UMKM desa.
13. Manage destinasi pariwisata desa.
14. Create survey assignment desa.

## 9.5 UMKM Management

Fitur admin dan enumerator:

1. List UMKM per desa.
2. Create UMKM.
3. Edit UMKM.
4. Delete/soft delete UMKM.
5. Search UMKM.
6. Filter berdasarkan kategori produk.
7. Filter berdasarkan status ekspor.
8. Upload atau simpan path foto produk.
9. Lihat detail UMKM.
10. Lihat hasil assessment UMKM.

Field utama UMKM:

1. Nama pelaku UMKM.
2. Nama UMKM.
3. Nama lengkap badan usaha.
4. Tahun berdiri.
5. Website perusahaan.
6. Alamat produksi.
7. Kategori produk.
8. Merk dagang.
9. Omset tahunan.
10. Kapasitas produksi bulanan.
11. Kendala.
12. Sertifikasi.
13. Legalitas.
14. Kanal pemasaran.
15. Sustainability.
16. Perbankan.
17. Ekspor.
18. Foto produk.

## 9.6 Survey UMKM

Fitur admin:

1. Membuat master pertanyaan assessment UMKM.
2. Mengatur kode kriteria.
3. Mengatur nama kriteria.
4. Mengatur bobot kriteria.
5. Mengatur nomor pertanyaan.
6. Mengatur teks pertanyaan.
7. Mengatur bobot pertanyaan.
8. Mengatur nilai maksimal.
9. Mengatur help text.
10. Mengaktifkan/menonaktifkan pertanyaan.

Fitur enumerator:

1. Membuka UMKM yang ditugaskan melalui desa.
2. Melihat daftar pertanyaan assessment UMKM.
3. Mengisi nilai pada setiap pertanyaan.
4. Sistem menyimpan snapshot kriteria, pertanyaan, bobot, dan max score.
5. Sistem menghitung normalized score.
6. Sistem menghitung weighted score.
7. Enumerator dapat memperbarui nilai selama belum dikunci oleh aturan review internal.

## 9.7 Pariwisata Management

Fitur admin dan enumerator:

1. List destinasi wisata per desa.
2. Create destinasi wisata.
3. Edit destinasi wisata.
4. Delete/soft delete destinasi wisata.
5. Pilih kategori destinasi wisata lebih dari satu.
6. Isi waktu operasional.
7. Isi tiket masuk.
8. Isi alamat destinasi.
9. Isi penanggung jawab destinasi.
10. Search dan filter destinasi wisata.

## 9.8 Survey Pariwisata

Fitur admin:

1. Membuat matrix survey pariwisata.
2. Mengatur kategori besar.
3. Mengatur sub kategori.
4. Mengatur kriteria.
5. Mengatur indikator.
6. Mengatur bukti pendukung.
7. Mengatur opsi harkat/peringkat.
8. Mengatur apakah dokumen wajib diupload.
9. Mengatur document hint.
10. Mengaktifkan/menonaktifkan indikator.

Fitur enumerator:

1. Membuka survey pariwisata.
2. Melihat matrix pertanyaan berdasarkan kategori, sub kategori, dan kriteria.
3. Melihat indikator dan bukti pendukung.
4. Memilih salah satu opsi harkat/peringkat.
5. Mengisi catatan pada `notes`.
6. Mengupload dokumen bukti pendukung.
7. Sistem menyimpan snapshot kategori, sub kategori, kriteria, indikator, bukti pendukung, label opsi, dan deskripsi opsi.

---

## 10. Workflow Utama

## 10.1 Workflow Admin Membuat Desa

1. Admin login.
2. Admin membuka menu Desa Wisata.
3. Admin klik Tambah Desa.
4. Admin mengisi data dasar desa.
5. Admin menyimpan data.
6. Sistem membuat record di `tourism_villages`.
7. Status awal desa adalah `draft`.

## 10.2 Workflow Admin Menugaskan Enumerator ke Desa

1. Admin membuka detail desa.
2. Admin memilih enumerator.
3. Admin klik Assign.
4. Sistem membuat record di `village_enumerator_assignments`.
5. Enumerator dapat melihat desa tersebut di dashboardnya.

## 10.3 Workflow Enumerator Mengisi Profil Desa

1. Enumerator login.
2. Enumerator membuka daftar desa yang ditugaskan.
3. Enumerator membuka detail desa.
4. Enumerator mengisi atau memperbarui data profil desa.
5. Enumerator menambah item profil desa.
6. Enumerator mengupload media desa atau media item profil.
7. Sistem menyimpan perubahan dengan `created_by` atau `uploaded_by`.

## 10.4 Workflow Enumerator Menambah Data UMKM

1. Enumerator membuka detail desa.
2. Enumerator membuka tab UMKM.
3. Enumerator klik Tambah UMKM.
4. Enumerator mengisi profil UMKM.
5. Enumerator mengisi data kurasi, pemasaran, sustainability, perbankan, ekspor, dan foto produk.
6. Sistem menyimpan data ke `village_umkms`.
7. UMKM muncul di daftar UMKM desa.

## 10.5 Workflow Enumerator Mengisi Assessment UMKM

1. Enumerator membuka detail UMKM.
2. Enumerator membuka tab Assessment UMKM.
3. Sistem menampilkan pertanyaan dari `umkm_survey_questions` berdasarkan template UMKM.
4. Pertanyaan dikelompokkan berdasarkan `criteria_code` dan `criteria_name`.
5. Enumerator mengisi `score` untuk setiap pertanyaan.
6. Sistem menyimpan jawaban ke `umkm_survey_answers`.
7. Sistem menyimpan snapshot kriteria, pertanyaan, bobot, dan max score.
8. Sistem menghitung `normalized_score`.
9. Sistem menghitung `weighted_score`.
10. Sistem menampilkan total score UMKM.

## 10.6 Workflow Enumerator Menambah Destinasi Pariwisata

1. Enumerator membuka detail desa.
2. Enumerator membuka tab Pariwisata.
3. Enumerator klik Tambah Destinasi.
4. Enumerator mengisi nama destinasi, kategori, operasional, tiket, alamat, dan penanggung jawab.
5. Sistem menyimpan data ke `pariwisata_village_table`.
6. Sistem menyimpan kategori ke `pariwisata_village_category`.
7. Destinasi muncul di daftar destinasi wisata desa.

## 10.7 Workflow Admin Membuat Matrix Survey Pariwisata

1. Admin membuka menu Survey Templates.
2. Admin memilih template survey pariwisata.
3. Admin menambah pertanyaan matrix pariwisata.
4. Admin mengisi kategori, sub kategori, kriteria, indikator, dan bukti pendukung.
5. Admin menambah opsi harkat/peringkat 4, 3, 2, dan 1.
6. Admin publish template.
7. Template siap digunakan untuk survey pariwisata.

## 10.8 Workflow Enumerator Mengisi Survey Pariwisata

1. Enumerator membuka menu Survey Pariwisata.
2. Sistem menampilkan daftar indikator dari `pariwisata_survey_questions`.
3. Enumerator membaca kriteria, indikator, dan bukti pendukung.
4. Enumerator memilih opsi harkat/peringkat dari `pariwisata_suvey_options`.
5. Sistem menyimpan score ke `pariwisata_survey_answers`.
6. Enumerator mengisi catatan pada `notes` jika diperlukan.
7. Enumerator mengupload dokumen bukti pendukung ke `pariwisata_survey_answer_documents`.
8. Sistem menyimpan snapshot pertanyaan dan opsi.

## 10.9 Workflow Admin Membuat Template Survey Desa

1. Admin membuka menu Survey Templates.
2. Admin membuat template survey desa.
3. Admin menambah pertanyaan.
4. Admin menentukan aspect pada setiap pertanyaan.
5. Admin menambah opsi skor pada setiap pertanyaan.
6. Admin publish template.
7. Template siap digunakan untuk assignment survey desa.

## 10.10 Workflow Admin Membuat Survey Assignment Desa

1. Admin membuka detail desa.
2. Admin memilih template survey desa.
3. Admin membuat survey assignment.
4. Sistem membuat record di `village_survey_assignments`.
5. `village_id` bersifat unique agar satu desa hanya memiliki satu survey assignment utama.
6. Sistem menyimpan `assigned_by` dan `assigned_at`.

## 10.11 Workflow Enumerator Mengisi Survey Desa Draft

1. Enumerator membuka survey desa.
2. Sistem menampilkan daftar pertanyaan dari template survey.
3. Enumerator memilih opsi skor untuk pertanyaan tertentu.
4. Sistem menyimpan data ke `survey_answers`.
5. Jika jawaban baru dibuat, sistem menyimpan `answered_by`, `last_edited_by`, `answered_at`, dan `last_edited_at`.
6. Jika jawaban lama diedit, sistem memperbarui `last_edited_by` dan `last_edited_at`.
7. Sistem menyimpan snapshot `aspect_snapshot`, `question_text_snapshot`, dan `option_label_snapshot`.
8. Sistem menyimpan history ke `survey_answer_histories`.
9. Enumerator dapat upload dokumen pendukung opsional.
10. Enumerator klik Save Draft.
11. Sistem memperbarui `last_saved_at`.
12. Sistem membuat log `saved_draft`.

## 10.12 Workflow Submit dan Review Survey Desa

1. Enumerator membuka survey.
2. Sistem memvalidasi seluruh pertanyaan wajib sudah dijawab.
3. Enumerator klik Submit.
4. Sistem mengubah status assignment menjadi `submitted`.
5. Sistem menyimpan `submitted_by` dan `submitted_at`.
6. Sistem membuat log `submitted`.
7. Admin membuka survey yang statusnya `submitted`.
8. Admin melihat seluruh jawaban dan dokumen pendukung.
9. Jika valid, admin mengubah status menjadi `reviewed`.
10. Jika perlu perbaikan, admin mengubah status menjadi `returned`.
11. Sistem membuat log sesuai aksi review.

---

## 11. Business Rules

## 11.1 User dan Role

1. Email user harus unik.
2. User hanya memiliki satu role utama.
3. Role yang tersedia hanya `admin` dan `enumerator`.
4. User inactive tidak boleh login.

## 11.2 Desa Wisata

1. Kode desa harus unik.
2. Slug desa harus unik.
3. Desa dapat memiliki banyak media.
4. Desa dapat memiliki banyak item profil.
5. Desa dapat memiliki banyak enumerator.
6. Desa hanya memiliki satu survey assignment utama untuk survey desa.
7. Desa dapat memiliki banyak UMKM.
8. Desa dapat memiliki banyak destinasi pariwisata.

## 11.3 Program CSR

1. Satu program dapat memiliki banyak desa.
2. Satu desa dapat masuk ke banyak program.
3. Kombinasi `program_id` dan `village_id` harus unik.

## 11.4 Assignment Enumerator Desa

1. Satu enumerator dapat ditugaskan ke banyak desa.
2. Satu desa dapat memiliki banyak enumerator.
3. Kombinasi `village_id` dan `enumerator_id` harus unik.
4. Hanya enumerator aktif yang dapat mengisi data desa, UMKM, pariwisata, dan survey.

## 11.5 Template Survey

1. Template survey dapat berstatus `draft`, `published`, atau `archived`.
2. Template hanya dapat digunakan jika statusnya `published`.
3. Template dapat digunakan untuk survey desa, survey UMKM, atau survey pariwisata sesuai konteks implementasi.
4. Survey desa menggunakan `survey_questions` dan `survey_question_options`.
5. Survey UMKM menggunakan `umkm_survey_questions` dan `umkm_survey_answers`.
6. Survey pariwisata menggunakan `pariwisata_survey_questions`, `pariwisata_suvey_options`, dan `pariwisata_survey_answers`.

## 11.6 UMKM

1. Satu desa dapat memiliki banyak UMKM.
2. Setiap UMKM wajib memiliki `name`.
3. UMKM dapat memiliki data legalitas, produksi, pemasaran, sustainability, perbankan, ekspor, dan foto produk.
4. UMKM yang dihapus menggunakan soft delete.
5. Assessment UMKM hanya dapat diisi oleh enumerator yang ditugaskan ke desa terkait.
6. Satu UMKM hanya boleh memiliki satu jawaban per pertanyaan assessment berdasarkan unique index `(umkm_id, umkm_assessment_question_id)`.

## 11.7 Assessment UMKM

1. Setiap pertanyaan assessment UMKM harus memiliki kriteria.
2. Setiap pertanyaan assessment UMKM harus memiliki bobot pertanyaan.
3. Score tidak boleh melebihi `max_score`.
4. Sistem wajib menyimpan snapshot pertanyaan dan bobot ketika jawaban dibuat.
5. Sistem wajib menghitung `normalized_score` dan `weighted_score`.

## 11.8 Pariwisata

1. Satu desa dapat memiliki banyak destinasi pariwisata.
2. Setiap destinasi pariwisata wajib memiliki `name`.
3. Satu destinasi pariwisata dapat memiliki lebih dari satu kategori.
4. Kategori menggunakan enum `pariwisata_category_type`.
5. Destinasi yang dihapus menggunakan soft delete.

## 11.9 Survey Pariwisata

1. Setiap indikator pariwisata wajib memiliki `indicator_code` dan `indicator_name`.
2. Setiap indikator dapat memiliki bukti pendukung.
3. Opsi harkat/peringkat wajib memiliki score, level, label, dan description.
4. Score pilihan biasanya 4, 3, 2, dan 1.
5. Jawaban survey pariwisata harus memilih salah satu opsi.
6. Sistem wajib menyimpan snapshot pertanyaan dan opsi.
7. Jika `document_required` true, enumerator wajib mengupload dokumen pendukung.
8. Berdasarkan ERD saat ini, unique index pada `pariwisata_survey_answers` adalah `(pariwisata_survey_question_id)`, sehingga satu pertanyaan pariwisata hanya memiliki satu jawaban final secara global. Jika di masa depan survey perlu per destinasi atau per assignment, ERD perlu diperluas dengan foreign key ke assignment atau destinasi.

## 11.10 Survey Desa

1. Satu desa hanya boleh memiliki satu record `village_survey_assignments`.
2. Status awal assignment adalah `assigned`.
3. Status dapat berubah menjadi `in_progress`, `submitted`, `reviewed`, atau `returned`.
4. Survey yang sudah `reviewed` tidak boleh diedit oleh enumerator.
5. Survey `returned` dapat diedit ulang oleh enumerator.
6. Perubahan status wajib dicatat di `village_survey_assignment_logs`.
7. Satu pertanyaan hanya boleh memiliki satu jawaban final dalam satu assignment.
8. Perubahan jawaban wajib dicatat di `survey_answer_histories`.

---

## 12. Validation Rules

## 12.1 User

1. Name required.
2. Email required, valid email, unique.
3. Role required, must be admin or enumerator.
4. Password required on create.
5. Password optional on update.
6. Status required.

## 12.2 Desa

1. Code required and unique.
2. Name required.
3. Slug required and unique.
4. Latitude nullable numeric.
5. Longitude nullable numeric.
6. Manager email nullable valid email.

## 12.3 UMKM

1. Village required.
2. Name required.
3. Established year nullable numeric.
4. Annual revenue nullable numeric.
5. Website URL nullable valid URL.
6. Product category nullable string.
7. Has exported nullable boolean.
8. Product photo nullable file path atau valid upload.

## 12.4 UMKM Survey Question

1. Survey template required.
2. Criteria code required.
3. Criteria name required.
4. Criteria weight percent required numeric.
5. Question number required numeric.
6. Question text required.
7. Question weight percent required numeric.
8. Max score required numeric and greater than zero.
9. Combination `survey_template_id`, `criteria_code`, and `question_number` must be unique.

## 12.5 UMKM Survey Answer

1. UMKM required.
2. UMKM assessment question required.
3. Answered by required.
4. Score required numeric.
5. Score must be less than or equal to max score.
6. System must calculate normalized score.
7. System must calculate weighted score.
8. Combination `umkm_id` and `umkm_assessment_question_id` must be unique.

## 12.6 Pariwisata Destination

1. Village required.
2. Name required.
3. Category optional but recommended.
4. Entrance ticket price nullable numeric.
5. PIC phone nullable string.
6. Operational schedule nullable JSON.

## 12.7 Pariwisata Survey Question

1. Survey template required.
2. Indicator code required.
3. Indicator name required.
4. Input type required.
5. Combination `survey_template_id` and `indicator_code` must be unique.
6. Document hint required if document required is true.

## 12.8 Pariwisata Survey Option

1. Pariwisata survey question required.
2. Score required integer.
3. Level required.
4. Label required.
5. Description required.
6. Score unique per pariwisata survey question.

## 12.9 Pariwisata Survey Answer

1. Pariwisata survey question required.
2. Pariwisata survey option required.
3. Option must belong to the selected question.
4. Score copied from selected option.
5. Answered by required.
6. Notes nullable.
7. Snapshot fields populated from question and option.

## 12.10 Survey Desa Answer

1. Village survey assignment required.
2. Survey question required.
3. Survey question option required.
4. Option must belong to the selected question.
5. Score copied from selected option.
6. User must be assigned to the village.
7. Cannot update if assignment status is `reviewed`.

## 12.11 File Upload

1. File required for upload endpoint.
2. Allowed MIME types should include PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG.
3. File size should be limited by system configuration.
4. Uploaded by required.
5. Private survey documents should not be publicly accessible without authorization.

---

## 13. Scoring Logic

## 13.1 Survey Desa Average Score

Average score dihitung dari seluruh jawaban dalam satu `village_survey_assignments`.

```text
average_score = total_score / answered_questions
```

## 13.2 Survey Desa Progress

Progress survey desa dihitung dari jumlah pertanyaan yang sudah dijawab dibanding total pertanyaan dari template.

```text
progress_percentage = answered_questions / total_questions * 100
```

## 13.3 Survey Desa Aspect Summary

Aspect summary dapat dihitung langsung dari:

```text
survey_answers
JOIN survey_questions
GROUP BY survey_questions.aspect
```

## 13.4 UMKM Weighted Score

Assessment UMKM menggunakan bobot per pertanyaan.

Formula:

```text
normalized_score = score / max_score_snapshot
weighted_score = normalized_score * question_weight_percent_snapshot
```

Contoh:

```text
score = 3
max_score_snapshot = 4
question_weight_percent_snapshot = 10

normalized_score = 3 / 4 = 0.75
weighted_score = 0.75 * 10 = 7.5
```

Jika total seluruh bobot pertanyaan adalah 100, maka total nilai akhir UMKM adalah:

```text
umkm_final_score = SUM(weighted_score)
```

## 13.5 UMKM Criteria Score

Nilai per kriteria UMKM dapat dihitung dengan grouping berdasarkan `criteria_code_snapshot`.

```text
criteria_score = SUM(weighted_score) WHERE criteria_code_snapshot = selected_criteria
```

## 13.6 Pariwisata Survey Score

Score pariwisata berasal dari pilihan harkat/peringkat:

| Score | Label |
|---:|---|
| 4 | Terpenuhi Sepenuhnya |
| 3 | Sebagian Terpenuhi |
| 2 | Kurang Terpenuhi |
| 1 | Tidak Terpenuhi |

Nilai akhir pariwisata dapat dihitung sebagai rata-rata atau total, sesuai kebutuhan dashboard.

```text
average_pariwisata_score = total_score / answered_questions
```

---

## 14. Halaman dan Fitur Frontend

## 14.1 Admin Layout

Menu admin:

1. Dashboard.
2. Users.
3. CSR Programs.
4. Desa Wisata.
5. Kategori Profil Desa.
6. UMKM.
7. Destinasi Pariwisata.
8. Survey Templates.
9. Survey Desa.
10. Survey UMKM.
11. Survey Pariwisata.
12. Review Survey.
13. Audit Logs.
14. Settings.

## 14.2 Enumerator Layout

Menu enumerator:

1. Dashboard.
2. Desa Saya.
3. UMKM Desa.
4. Destinasi Pariwisata.
5. Survey Desa.
6. Assessment UMKM.
7. Survey Pariwisata.
8. Profil Saya.

---

## 15. Detail Halaman Admin

## 15.1 Admin Dashboard

Menampilkan:

1. Total desa wisata.
2. Total desa by status.
3. Total active programs.
4. Total enumerator active.
5. Total UMKM.
6. Total UMKM per desa.
7. Total destinasi wisata.
8. Total destinasi wisata per kategori.
9. Total survey desa assigned.
10. Total survey desa in progress.
11. Total survey desa submitted.
12. Total survey desa reviewed.
13. Average survey desa score.
14. Average assessment UMKM score.
15. Average survey pariwisata score.
16. Desa dengan data belum lengkap.
17. Recent activities.

## 15.2 User Management

Fitur:

1. List user.
2. Search user.
3. Filter role.
4. Filter status.
5. Create user.
6. Edit user.
7. Activate/deactivate user.
8. Reset password.

## 15.3 CSR Program Management

Fitur:

1. List program.
2. Create program.
3. Edit program.
4. Archive program.
5. Assign desa ke program.
6. Remove desa dari program.

## 15.4 Desa Wisata Management

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
12. Manage UMKM.
13. Manage destinasi pariwisata.
14. Create survey assignment desa.

## 15.5 UMKM Management Page

Fitur:

1. List semua UMKM.
2. Filter berdasarkan desa.
3. Filter kategori produk.
4. Filter status ekspor.
5. Search nama UMKM atau pelaku.
6. Detail UMKM.
7. Edit UMKM.
8. Lihat assessment score.
9. Lihat skor per kriteria.

## 15.6 UMKM Assessment Builder

Fitur:

1. List pertanyaan assessment UMKM.
2. Create question.
3. Edit question.
4. Delete/soft delete question.
5. Set criteria code.
6. Set criteria name.
7. Set criteria weight percent.
8. Set question number.
9. Set question text.
10. Set question weight percent.
11. Set max score.
12. Set help text.
13. Reorder question.

## 15.7 Pariwisata Destination Management

Fitur:

1. List destinasi wisata.
2. Filter desa.
3. Filter kategori destinasi.
4. Search nama destinasi.
5. Create destinasi.
6. Edit destinasi.
7. Delete destinasi.
8. Manage kategori destinasi.

## 15.8 Pariwisata Survey Matrix Builder

Fitur:

1. List pertanyaan matrix pariwisata.
2. Create indicator.
3. Edit indicator.
4. Delete/soft delete indicator.
5. Set category code and name.
6. Set sub category code and name.
7. Set criteria code, name, and description.
8. Set indicator code, name, and description.
9. Set supporting evidence.
10. Set document required.
11. Set document hint.
12. Manage opsi harkat/peringkat.
13. Reorder indicator.

## 15.9 Survey Assignment Detail

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

---

## 16. Detail Halaman Enumerator

## 16.1 Enumerator Dashboard

Menampilkan:

1. Total desa yang ditugaskan.
2. Total UMKM yang telah diinput.
3. Total destinasi wisata yang telah diinput.
4. Survey desa assigned.
5. Survey desa in progress.
6. Survey desa returned.
7. Survey desa submitted.
8. Assessment UMKM belum lengkap.
9. Survey pariwisata belum lengkap.
10. Daftar desa terbaru yang perlu diisi.

## 16.2 Desa Saya

Menampilkan daftar desa yang ditugaskan ke enumerator.

Kolom:

1. Nama desa.
2. Lokasi.
3. Status profil.
4. Jumlah UMKM.
5. Jumlah destinasi wisata.
6. Status survey desa.
7. Last saved.
8. Aksi.

## 16.3 Form Profil Desa

Enumerator dapat:

1. Edit deskripsi desa.
2. Edit alamat.
3. Edit koordinat.
4. Edit kontak pengelola.
5. Upload foto/video desa.
6. Tambah item profil.
7. Upload media item profil.

## 16.4 Form UMKM

Enumerator dapat:

1. Tambah UMKM.
2. Edit UMKM.
3. Isi data profil UMKM.
4. Isi data legalitas dan kurasi.
5. Isi data pemasaran digital.
6. Isi sustainability notes.
7. Isi solusi perbankan.
8. Isi status ekspor.
9. Isi foto produk.

## 16.5 Form Assessment UMKM

Fitur:

1. Tampilkan pertanyaan berdasarkan kriteria.
2. Tampilkan bobot kriteria dan bobot pertanyaan.
3. Isi nilai per pertanyaan.
4. Tampilkan normalized score.
5. Tampilkan weighted score.
6. Tampilkan total score UMKM.
7. Save per jawaban.
8. Tampilkan pertanyaan yang belum diisi.

## 16.6 Form Destinasi Pariwisata

Enumerator dapat:

1. Tambah destinasi wisata.
2. Edit destinasi wisata.
3. Pilih kategori destinasi lebih dari satu.
4. Isi waktu operasional.
5. Isi tiket masuk.
6. Isi alamat.
7. Isi penanggung jawab.

## 16.7 Form Survey Pariwisata

Fitur:

1. Tampilkan matrix berdasarkan kategori dan sub kategori.
2. Tampilkan kriteria, indikator, dan bukti pendukung.
3. Tampilkan opsi 4, 3, 2, dan 1.
4. Pilih opsi harkat/peringkat.
5. Isi catatan penilaian.
6. Upload dokumen bukti pendukung.
7. Tampilkan progress pertanyaan terjawab.
8. Tampilkan score rata-rata.

## 16.8 Form Survey Desa

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

## 17. UI/UX Requirements

## 17.1 Design Direction

Desain harus terasa:

1. Profesional.
2. Modern.
3. Bersih.
4. Cocok untuk platform CSR dan monitoring.
5. Mudah digunakan enumerator lapangan.
6. Responsif untuk desktop dan tablet.
7. Tetap nyaman digunakan di mobile browser.

## 17.2 Visual Style

Rekomendasi style:

1. Background white atau warm off-white.
2. Primary color hijau/biru corporate.
3. Accent soft emerald, blue, atau teal.
4. Card dengan rounded corners.
5. Border tipis.
6. Shadow halus.
7. Typography jelas.
8. Tabel matrix rapi dan mudah dibaca.
9. Form survey mobile-friendly.
10. Sticky action bar untuk save draft dan submit.

## 17.3 Komponen shadcn/ui

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
21. `Checkbox`
22. `RadioGroup`
23. `Separator`

---

## 18. Technical Requirements

## 18.1 Backend

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

## 18.2 Frontend

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

## 18.3 Database

Database menggunakan MySQL.

Karakteristik database:

1. Menggunakan foreign key.
2. Menggunakan soft delete pada data penting.
3. Menggunakan unique index untuk menjaga konsistensi.
4. Menggunakan JSON pada `metadata` dan `operational_schedule` untuk data fleksibel.
5. Menggunakan snapshot pada jawaban survey untuk menjaga histori.
6. Menggunakan history table untuk audit trail survey desa.
7. Menggunakan table khusus UMKM dan pariwisata sesuai ERD.

## 18.4 Redis

Redis digunakan untuk:

1. Cache dashboard summary.
2. Queue jobs.
3. Session jika dibutuhkan.
4. Rate limiting.
5. Temporary progress state untuk upload atau background process.

## 18.5 File Storage

File yang diupload:

1. Village media.
2. Village profile item media.
3. Survey answer documents.
4. Pariwisata survey answer documents.
5. Avatar user.
6. Product photo UMKM jika diproses sebagai upload.

Penyimpanan MVP:

1. Local storage Laravel untuk development.
2. Public disk untuk file publik.
3. Private disk untuk dokumen survey yang sensitif.

Future-ready:

1. S3-compatible storage.
2. MinIO.
3. Cloud storage.

---

## 19. Suggested Laravel Architecture

## 19.1 Folder Backend

```text
app/
├── Actions/
│   ├── Villages/
│   ├── Umkms/
│   ├── Pariwisata/
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
│   ├── UmkmAssessmentScoringService.php
│   ├── PariwisataSurveyScoringService.php
│   ├── SurveyAuditService.php
│   └── FileUploadService.php
└── Jobs/
```

## 19.2 Suggested Models

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
18. `VillageUmkm`
19. `UmkmSurveyQuestion`
20. `UmkmSurveyAnswer`
21. `PariwisataVillage`
22. `PariwisataVillageCategory`
23. `PariwisataSurveyQuestion`
24. `PariwisataSuveyOption`
25. `PariwisataSurveyAnswer`
26. `PariwisataSurveyAnswerDocument`

## 19.3 Suggested Services

### SurveyScoringService

Bertanggung jawab untuk:

1. Menghitung total pertanyaan survey desa.
2. Menghitung jumlah pertanyaan survey desa terjawab.
3. Menghitung average score survey desa.
4. Menghitung progress per aspect.
5. Memvalidasi apakah survey desa siap submit.

### UmkmAssessmentScoringService

Bertanggung jawab untuk:

1. Menghitung normalized score.
2. Menghitung weighted score.
3. Menghitung total score UMKM.
4. Menghitung score per kriteria.
5. Memvalidasi bobot pertanyaan.

### PariwisataSurveyScoringService

Bertanggung jawab untuk:

1. Menghitung total pertanyaan matrix pariwisata.
2. Menghitung jumlah pertanyaan terjawab.
3. Menghitung average score pariwisata.
4. Menghitung score per kategori.
5. Menghitung score per kriteria.

### SurveyAuditService

Bertanggung jawab untuk:

1. Membuat log assignment survey desa.
2. Membuat history jawaban survey desa.
3. Menyimpan perubahan status survey desa.
4. Menyimpan perubahan skor.

### FileUploadService

Bertanggung jawab untuk:

1. Validasi file.
2. Menyimpan file.
3. Membuat path.
4. Menghapus file jika dibutuhkan.
5. Mengembalikan metadata file.

---

## 20. Suggested Inertia Pages

## 20.1 Admin Pages

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

resources/js/Pages/Admin/Umkms/Index.tsx
resources/js/Pages/Admin/Umkms/Create.tsx
resources/js/Pages/Admin/Umkms/Edit.tsx
resources/js/Pages/Admin/Umkms/Show.tsx
resources/js/Pages/Admin/Umkms/Assessment.tsx

resources/js/Pages/Admin/Pariwisata/Index.tsx
resources/js/Pages/Admin/Pariwisata/Create.tsx
resources/js/Pages/Admin/Pariwisata/Edit.tsx
resources/js/Pages/Admin/Pariwisata/Show.tsx

resources/js/Pages/Admin/SurveyTemplates/Index.tsx
resources/js/Pages/Admin/SurveyTemplates/Create.tsx
resources/js/Pages/Admin/SurveyTemplates/Edit.tsx
resources/js/Pages/Admin/SurveyTemplates/Builder.tsx

resources/js/Pages/Admin/UmkmSurveyQuestions/Index.tsx
resources/js/Pages/Admin/UmkmSurveyQuestions/Create.tsx
resources/js/Pages/Admin/UmkmSurveyQuestions/Edit.tsx

resources/js/Pages/Admin/PariwisataSurveyQuestions/Index.tsx
resources/js/Pages/Admin/PariwisataSurveyQuestions/Create.tsx
resources/js/Pages/Admin/PariwisataSurveyQuestions/Edit.tsx
resources/js/Pages/Admin/PariwisataSurveyQuestions/Options.tsx

resources/js/Pages/Admin/SurveyAssignments/Index.tsx
resources/js/Pages/Admin/SurveyAssignments/Show.tsx
resources/js/Pages/Admin/SurveyAssignments/Review.tsx

resources/js/Pages/Admin/AuditLogs/Index.tsx
```

## 20.2 Enumerator Pages

```text
resources/js/Pages/Enumerator/Dashboard/Index.tsx
resources/js/Pages/Enumerator/Villages/Index.tsx
resources/js/Pages/Enumerator/Villages/Show.tsx
resources/js/Pages/Enumerator/Villages/EditProfile.tsx

resources/js/Pages/Enumerator/Umkms/Index.tsx
resources/js/Pages/Enumerator/Umkms/Create.tsx
resources/js/Pages/Enumerator/Umkms/Edit.tsx
resources/js/Pages/Enumerator/Umkms/Show.tsx
resources/js/Pages/Enumerator/Umkms/Assessment.tsx

resources/js/Pages/Enumerator/Pariwisata/Index.tsx
resources/js/Pages/Enumerator/Pariwisata/Create.tsx
resources/js/Pages/Enumerator/Pariwisata/Edit.tsx
resources/js/Pages/Enumerator/Pariwisata/Show.tsx
resources/js/Pages/Enumerator/Pariwisata/Survey.tsx

resources/js/Pages/Enumerator/Surveys/Index.tsx
resources/js/Pages/Enumerator/Surveys/Fill.tsx
resources/js/Pages/Enumerator/Profile/Edit.tsx
```

---

## 21. Suggested Routes

## 21.1 Admin Routes

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

        Route::resource('umkms', AdminUmkmController::class);
        Route::get('umkms/{umkm}/assessment', [AdminUmkmAssessmentController::class, 'show'])->name('umkms.assessment.show');

        Route::resource('pariwisata', AdminPariwisataController::class);

        Route::resource('survey-templates', AdminSurveyTemplateController::class);
        Route::get('survey-templates/{surveyTemplate}/builder', [AdminSurveyTemplateBuilderController::class, 'edit'])->name('survey-templates.builder');

        Route::resource('umkm-survey-questions', AdminUmkmSurveyQuestionController::class);
        Route::resource('pariwisata-survey-questions', AdminPariwisataSurveyQuestionController::class);
        Route::post('pariwisata-survey-questions/{question}/options', [AdminPariwisataSurveyOptionController::class, 'store'])->name('pariwisata-survey-questions.options.store');

        Route::resource('survey-assignments', AdminSurveyAssignmentController::class)->only(['index', 'show', 'store']);
        Route::post('survey-assignments/{assignment}/review', [AdminSurveyReviewController::class, 'review'])->name('survey-assignments.review');
        Route::post('survey-assignments/{assignment}/return', [AdminSurveyReviewController::class, 'return'])->name('survey-assignments.return');
    });
```

## 21.2 Enumerator Routes

```php
Route::middleware(['auth', 'role:enumerator'])
    ->prefix('enumerator')
    ->name('enumerator.')
    ->group(function () {
        Route::get('/dashboard', EnumeratorDashboardController::class)->name('dashboard');

        Route::get('/villages', [EnumeratorVillageController::class, 'index'])->name('villages.index');
        Route::get('/villages/{village}', [EnumeratorVillageController::class, 'show'])->name('villages.show');
        Route::put('/villages/{village}/profile', [EnumeratorVillageProfileController::class, 'update'])->name('villages.profile.update');

        Route::resource('umkms', EnumeratorUmkmController::class);
        Route::get('umkms/{umkm}/assessment', [EnumeratorUmkmAssessmentController::class, 'edit'])->name('umkms.assessment.edit');
        Route::post('umkms/{umkm}/assessment/answers', [EnumeratorUmkmAssessmentAnswerController::class, 'store'])->name('umkms.assessment.answers.store');

        Route::resource('pariwisata', EnumeratorPariwisataController::class);
        Route::get('pariwisata-survey', [EnumeratorPariwisataSurveyController::class, 'index'])->name('pariwisata-survey.index');
        Route::post('pariwisata-survey/answers', [EnumeratorPariwisataSurveyAnswerController::class, 'store'])->name('pariwisata-survey.answers.store');
        Route::post('pariwisata-survey/answers/{answer}/documents', [EnumeratorPariwisataSurveyDocumentController::class, 'store'])->name('pariwisata-survey.documents.store');

        Route::get('/surveys', [EnumeratorSurveyController::class, 'index'])->name('surveys.index');
        Route::get('/surveys/{assignment}/fill', [EnumeratorSurveyController::class, 'fill'])->name('surveys.fill');
        Route::post('/surveys/{assignment}/answers', [EnumeratorSurveyAnswerController::class, 'store'])->name('surveys.answers.store');
        Route::put('/surveys/{assignment}/answers/{answer}', [EnumeratorSurveyAnswerController::class, 'update'])->name('surveys.answers.update');
        Route::post('/surveys/{assignment}/save-draft', [EnumeratorSurveyController::class, 'saveDraft'])->name('surveys.save-draft');
        Route::post('/surveys/{assignment}/submit', [EnumeratorSurveyController::class, 'submit'])->name('surveys.submit');
    });
```

---

## 22. Dashboard Metrics

## 22.1 Admin Dashboard Metrics

1. Total desa wisata.
2. Total desa by status.
3. Total active programs.
4. Total enumerator active.
5. Total UMKM.
6. Total UMKM by product category.
7. Total UMKM yang sudah pernah ekspor.
8. Average UMKM assessment score.
9. Total destinasi wisata.
10. Total destinasi wisata by category.
11. Average pariwisata survey score.
12. Total survey desa assigned.
13. Total survey desa in progress.
14. Total survey desa submitted.
15. Total survey desa reviewed.
16. Average survey desa score overall.
17. Desa dengan survey belum selesai.
18. Recent survey activities.

## 22.2 Enumerator Dashboard Metrics

1. Total desa assigned.
2. Total UMKM yang dibuat.
3. Total UMKM assessment belum lengkap.
4. Total destinasi wisata yang dibuat.
5. Total survey pariwisata belum lengkap.
6. Total survey desa assigned.
7. Total survey desa in progress.
8. Total survey desa returned.
9. Total survey desa submitted.
10. Last saved survey.
11. Pending questions per survey.

---

## 23. Security Requirements

1. Semua halaman wajib menggunakan authentication.
2. Role admin dan enumerator wajib dipisahkan.
3. Enumerator hanya dapat melihat desa yang ditugaskan.
4. Enumerator hanya dapat mengisi data UMKM pada desa yang ditugaskan.
5. Enumerator hanya dapat mengisi data destinasi wisata pada desa yang ditugaskan.
6. Enumerator hanya dapat mengisi survey desa yang ditugaskan.
7. Admin dapat melihat seluruh data.
8. Dokumen survey tidak boleh diakses publik tanpa otorisasi.
9. File upload wajib divalidasi.
10. Input form wajib divalidasi server-side.
11. Gunakan CSRF protection bawaan Laravel.
12. Gunakan policy untuk akses model penting.
13. Gunakan rate limiting untuk endpoint upload dan auth.
14. Password disimpan menggunakan hashing Laravel.
15. Soft delete digunakan untuk data penting.

---

## 24. Performance Requirements

1. List data harus menggunakan pagination.
2. Dashboard summary dapat dicache di Redis.
3. Query list desa harus mendukung search dan filter.
4. Query list UMKM harus mendukung search dan filter.
5. Query list destinasi wisata harus mendukung search dan filter kategori.
6. Query survey detail harus eager load relasi penting.
7. Upload file besar dapat diproses dengan queue jika diperlukan.
8. Tabel history harus diberi index pada assignment, answer, question, dan actor.
9. Dashboard tidak boleh melakukan query agregasi berat berulang tanpa caching.
10. Matrix pariwisata harus di-load bertahap atau dikelompokkan agar UI tetap ringan.

---

## 25. Error Handling

Sistem harus menangani error berikut:

1. User tidak memiliki akses ke desa.
2. User tidak memiliki akses ke UMKM.
3. User tidak memiliki akses ke destinasi pariwisata.
4. User tidak memiliki akses ke survey.
5. Survey desa sudah reviewed dan tidak dapat diedit.
6. Pertanyaan tidak ditemukan.
7. Opsi skor tidak sesuai pertanyaan.
8. Score UMKM melebihi max score.
9. File terlalu besar.
10. Format file tidak didukung.
11. Survey desa belum lengkap saat submit.
12. Assignment survey untuk desa sudah ada.
13. Data sudah dihapus atau tidak aktif.
14. Dokumen wajib survey pariwisata belum diupload.
15. Kategori destinasi tidak valid.

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

## 26.4 UMKM Management

- Enumerator dapat menambah UMKM pada desa yang ditugaskan.
- Enumerator dapat mengedit UMKM pada desa yang ditugaskan.
- Admin dapat melihat semua UMKM.
- Sistem menyimpan relasi UMKM ke desa.
- Sistem dapat menampilkan daftar UMKM per desa.

## 26.5 UMKM Assessment

- Admin dapat membuat pertanyaan assessment UMKM.
- Pertanyaan assessment memiliki criteria code, criteria name, criteria weight, question weight, dan max score.
- Enumerator dapat mengisi nilai assessment UMKM.
- Sistem menghitung normalized score.
- Sistem menghitung weighted score.
- Satu UMKM hanya memiliki satu jawaban per pertanyaan assessment.

## 26.6 Pariwisata Management

- Enumerator dapat menambah destinasi wisata pada desa yang ditugaskan.
- Enumerator dapat memilih lebih dari satu kategori destinasi.
- Admin dapat melihat semua destinasi wisata.
- Sistem dapat menampilkan destinasi wisata per desa.
- Sistem dapat memfilter destinasi berdasarkan kategori.

## 26.7 Pariwisata Survey

- Admin dapat membuat matrix survey pariwisata.
- Admin dapat membuat opsi harkat/peringkat untuk setiap indikator.
- Enumerator dapat memilih opsi 4, 3, 2, atau 1.
- Sistem menyimpan score dari opsi.
- Enumerator dapat mengisi notes.
- Enumerator dapat upload dokumen bukti pendukung.
- Sistem menyimpan snapshot pertanyaan dan opsi.

## 26.8 Survey Template Desa

- Admin dapat membuat template survey desa.
- Admin dapat menambah pertanyaan.
- Admin dapat mengisi aspect pada pertanyaan.
- Admin dapat menambah opsi skor per pertanyaan.
- Admin tidak dapat publish template jika pertanyaan belum punya opsi.

## 26.9 Survey Assignment Desa

- Admin dapat membuat survey assignment untuk desa.
- Satu desa hanya boleh memiliki satu survey assignment.
- Assignment menyimpan `assigned_by` dan `assigned_at`.

## 26.10 Survey Fill Desa

- Enumerator dapat memilih opsi skor.
- Sistem menyimpan score dari opsi.
- Enumerator dapat upload dokumen opsional.
- Enumerator dapat save draft.
- Survey dapat dilanjutkan enumerator lain.
- Satu pertanyaan hanya memiliki satu jawaban final per assignment.

## 26.11 Survey Submit Desa

- Survey tidak dapat submit jika pertanyaan wajib belum lengkap.
- Survey yang lengkap dapat disubmit.
- Sistem menyimpan `submitted_by` dan `submitted_at`.
- Sistem mencatat log `submitted`.

## 26.12 Survey Review Desa

- Admin dapat review survey submitted.
- Admin dapat return survey.
- Survey reviewed tidak dapat diedit enumerator.
- Semua perubahan status tercatat di log.

## 26.13 Audit Trail

- Perubahan jawaban survey desa tercatat di `survey_answer_histories`.
- Perubahan status assignment survey desa tercatat di `village_survey_assignment_logs`.
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

## Milestone 4 — UMKM Data

1. CRUD UMKM.
2. Form profil UMKM.
3. Filter/search UMKM.
4. Detail UMKM.
5. Dashboard summary UMKM.

## Milestone 5 — UMKM Assessment

1. CRUD UMKM survey questions.
2. Form assessment UMKM.
3. Save answer UMKM.
4. Calculate normalized score.
5. Calculate weighted score.
6. Display score per criteria.

## Milestone 6 — Pariwisata Data

1. CRUD destinasi wisata.
2. Multi-category destinasi.
3. Filter/search destinasi.
4. Detail destinasi.
5. Dashboard summary destinasi.

## Milestone 7 — Pariwisata Survey

1. CRUD pariwisata survey questions.
2. CRUD pariwisata survey options.
3. Form survey pariwisata.
4. Save survey pariwisata answer.
5. Upload supporting documents.
6. Display score summary.

## Milestone 8 — Survey Desa Template

1. CRUD survey template.
2. CRUD survey question.
3. CRUD survey question option.
4. Publish/archive survey template.

## Milestone 9 — Survey Desa Assignment dan Fill

1. Create survey assignment.
2. Enumerator survey fill page.
3. Save answer.
4. Upload document.
5. Save draft.
6. Collaborative survey editing.

## Milestone 10 — Review dan Audit

1. Submit survey desa.
2. Review survey desa.
3. Return survey desa.
4. Assignment logs.
5. Answer histories.
6. Admin review page.

## Milestone 11 — Dashboard dan Polish

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
4. Public catalog destinasi wisata.
5. Public catalog UMKM.
6. Map-based dashboard.
7. Grafik skor per aspek.
8. Grafik skor UMKM per kriteria.
9. Grafik skor pariwisata per kategori.
10. Multi-period survey.
11. Offline survey support.
12. Mobile app enumerator.
13. Notification system.
14. AI summary untuk hasil survey.
15. Approval bertingkat.
16. Versioning template survey.
17. S3/MinIO storage.
18. Integration dengan Google Maps.
19. Marketplace produk UMKM.
20. Booking paket wisata.
21. Penyesuaian ERD untuk assignment survey pariwisata per destinasi atau per periode.

---

## 29. Notes for Developer

1. Gunakan policy untuk semua akses desa, UMKM, destinasi, dan survey.
2. Jangan izinkan enumerator mengakses desa yang bukan assignment-nya.
3. Pastikan `village_survey_assignments.village_id` unique agar satu desa hanya memiliki satu survey utama.
4. Pastikan `survey_answers` memiliki unique index pada `village_survey_assignment_id` dan `survey_question_id`.
5. Pastikan `umkm_survey_answers` memiliki unique index pada `umkm_id` dan `umkm_assessment_question_id`.
6. Pastikan `pariwisata_survey_answers` mengikuti unique index sesuai ERD saat ini.
7. Simpan snapshot jawaban untuk menjaga histori.
8. Simpan history jawaban survey desa setiap create/update.
9. Simpan assignment log setiap perubahan status survey desa.
10. Gunakan transaction saat menyimpan jawaban dan history.
11. Gunakan transaction saat submit survey desa.
12. Gunakan service khusus untuk scoring survey desa, scoring UMKM, dan scoring pariwisata.
13. Gunakan Redis cache untuk dashboard jika query mulai berat.
14. Untuk survey pariwisata, perhatikan bahwa ERD saat ini belum memiliki assignment atau relasi langsung ke destinasi pada table jawaban. Jika kebutuhan berubah menjadi survey per destinasi/periode, struktur database perlu diperluas.
15. Nama table `pariwisata_suvey_options` mengikuti ERD saat ini. Jika memungkinkan sebelum migrasi production, pertimbangkan koreksi typo menjadi `pariwisata_survey_options` agar konsisten.
