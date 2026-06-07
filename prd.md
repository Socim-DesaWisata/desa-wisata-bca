# PRD — SocialImpact: Aggregator Desa Wisata BCA

**Versi:** 3.0  
**Tanggal:** 7 Juni 2026  
**Produk:** SocialImpact  
**Jenis Produk:** Website CSR / Aggregator Desa Wisata  
**Target Pengguna:** Admin CSR dan Enumerator Lapangan  
**Tech Stack:** Laravel, Inertia.js, React, TypeScript, shadcn/ui, Tailwind CSS, MySQL, Redis  
**Acuan:** PRD versi 2.0 dan ERD terbaru yang mencakup modul Desa, UMKM, Pariwisata, Survey Desa, Survey UMKM, Survey Pariwisata, serta data tahunan sosial-ekonomi dan impact data.

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
7. Mengelola paket wisata pada setiap destinasi pariwisata.
8. Mengelola data omset tahunan UMKM dan pariwisata.
9. Mengelola data pengunjung tahunan pariwisata dan jenis pengunjung tahunan.
10. Mengelola data pekerja tahunan UMKM dan pariwisata berdasarkan usia, jenis kelamin, dan pendidikan.
11. Mengelola data pekerja UMKM dan pariwisata yang mengikuti pelatihan per tahun.
12. Mengelola data masyarakat desa per tahun berdasarkan jenis kelamin, pendidikan, keterampilan, dan mata pencaharian.
13. Mengelola data kelompok rentan desa per tahun.
14. Mengelola data kelompok aktif masyarakat dan kemitraan desa per tahun.
15. Membuat dan mengelola template survey desa.
16. Membuat dan mengelola assessment UMKM berbasis kriteria, bobot, dan nilai.
17. Membuat dan mengelola matrix survey pariwisata berbasis kategori, sub kategori, kriteria, indikator, bukti pendukung, dan harkat/peringkat.
18. Mendukung pengisian survey oleh enumerator lapangan.
19. Mendukung upload dokumen pendukung survey.
20. Melihat dashboard monitoring desa, UMKM, pariwisata, survey, data tahunan, dan impact data.

---

## 2. Latar Belakang

Dalam program pendampingan Desa Wisata BCA, data desa, potensi wisata, UMKM lokal, fasilitas, produk unggulan, pekerja, pengunjung, omset, kelompok masyarakat, dan hasil survey sering tersebar dalam dokumen, spreadsheet, foto, serta media komunikasi. Kondisi ini menyulitkan admin CSR dalam melakukan monitoring, evaluasi, validasi, pelaporan, dan pengambilan keputusan berbasis data.

PRD versi 2.0 sudah mencakup manajemen desa, UMKM, destinasi pariwisata, survey desa, assessment UMKM, dan survey pariwisata. Kebutuhan terbaru menambahkan modul **data tahunan dan impact data**, yaitu:

1. Omset tahunan UMKM dan pariwisata.
2. Pengunjung tahunan pariwisata.
3. Jenis pengunjung tahunan pariwisata.
4. Paket wisata pada destinasi pariwisata.
5. Data pekerja UMKM dan pariwisata per tahun berdasarkan usia, jenis kelamin, dan pendidikan.
6. Data pekerja UMKM dan pariwisata yang mengikuti pelatihan per tahun.
7. Data masyarakat desa per tahun berdasarkan jenis kelamin, pendidikan, keterampilan, dan mata pencaharian.
8. Data kelompok rentan desa per tahun.
9. Data kelompok aktif masyarakat dan kemitraan desa per tahun.

SocialImpact versi 3.0 menjadi sistem terpusat untuk mengelola data operasional desa wisata sekaligus data sosial-ekonomi tahunan untuk kebutuhan monitoring dampak program CSR.

---

## 3. Tujuan Produk

Tujuan utama SocialImpact adalah:

1. Menyediakan sistem terpusat untuk data Desa Wisata BCA.
2. Memudahkan admin membuat dan mengelola desa wisata.
3. Memudahkan enumerator melengkapi data profil desa wisata.
4. Memudahkan enumerator mencatat data UMKM di setiap desa.
5. Memudahkan enumerator mencatat data destinasi pariwisata di setiap desa.
6. Memudahkan enumerator mencatat data paket wisata pada destinasi pariwisata.
7. Memudahkan admin dan enumerator mencatat data tahunan UMKM, pariwisata, pekerja, pengunjung, masyarakat, kelompok rentan, kelompok aktif, dan kemitraan.
8. Memudahkan admin membuat template survey desa.
9. Memudahkan admin membuat master pertanyaan assessment UMKM berbasis kriteria dan bobot.
10. Memudahkan admin membuat master matrix survey pariwisata berbasis kategori, kriteria, indikator, dan opsi harkat/peringkat.
11. Menyediakan workflow pengisian, submit, review, dan return survey desa.
12. Menyediakan sistem scoring untuk survey desa, assessment UMKM, dan survey pariwisata.
13. Menyediakan audit trail untuk aktivitas survey dan perubahan jawaban.
14. Menyediakan dashboard monitoring status desa, data UMKM, destinasi wisata, data tahunan, progress survey, dan hasil skor.
15. Menyediakan data yang siap digunakan untuk analisis dampak sosial-ekonomi program CSR.

---

## 4. Ringkasan Perubahan dari PRD Versi 2.0

| Area | PRD Versi 2.0 | PRD Versi 3.0 |
|---|---|---|
| Data UMKM | Profil UMKM dan assessment | Ditambah omset tahunan, data pekerja tahunan, dan data pelatihan pekerja |
| Data Pariwisata | Destinasi, kategori, dan survey pariwisata | Ditambah omset tahunan, pengunjung tahunan, jenis pengunjung tahunan, paket wisata, data pekerja tahunan, dan data pelatihan pekerja |
| Data Desa | Data utama desa dan profil desa | Ditambah data masyarakat tahunan, kelompok rentan, kelompok aktif masyarakat, dan kemitraan |
| Dashboard | Fokus data desa, UMKM, pariwisata, dan skor survey | Ditambah tren omset, tren pengunjung, tenaga kerja, pelatihan, statistik masyarakat, kelompok rentan, dan kemitraan |
| Data Model | Belum memuat semua data tahunan | Ditambah `annual_turnovers`, `pariwisata_annual_visitors`, `pariwisata_visitor_type_annuals`, `pariwisata_packages`, `annual_worker_stats`, `annual_worker_training_stats`, `village_annual_population_stats`, `village_vulnerable_group_categories`, `village_vulnerable_group_annuals`, `village_active_group_categories`, dan `village_active_group_annuals` |
| Halaman Admin | Manajemen desa, UMKM, pariwisata, dan survey | Ditambah halaman annual data dan impact data |
| Halaman Enumerator | Input data desa, UMKM, pariwisata, dan survey | Ditambah input data tahunan untuk UMKM, pariwisata, pekerja, masyarakat, kelompok rentan, kelompok aktif, dan kemitraan |

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
24. Manajemen omset tahunan UMKM.
25. Manajemen assessment question UMKM.
26. Pengisian nilai assessment UMKM.
27. Perhitungan normalized score dan weighted score UMKM.
28. Manajemen data pekerja UMKM per tahun berdasarkan usia, jenis kelamin, dan pendidikan.
29. Manajemen jumlah pekerja UMKM yang mengikuti pelatihan per tahun.
30. Manajemen data destinasi pariwisata desa.
31. Manajemen kategori destinasi pariwisata.
32. Manajemen paket wisata pada destinasi pariwisata.
33. Manajemen omset tahunan pariwisata.
34. Manajemen total pengunjung tahunan pariwisata.
35. Manajemen jenis pengunjung tahunan pariwisata.
36. Manajemen data pekerja pariwisata per tahun berdasarkan usia, jenis kelamin, dan pendidikan.
37. Manajemen jumlah pekerja pariwisata yang mengikuti pelatihan per tahun.
38. Manajemen matrix survey pariwisata.
39. Manajemen opsi harkat/peringkat pariwisata.
40. Pengisian survey pariwisata.
41. Upload dokumen bukti pendukung survey pariwisata.
42. Manajemen data masyarakat desa per tahun berdasarkan jenis kelamin, pendidikan, keterampilan, dan mata pencaharian.
43. Manajemen master kategori kelompok rentan.
44. Manajemen jumlah kelompok rentan desa per tahun.
45. Manajemen master kategori kelompok aktif masyarakat dan kemitraan.
46. Manajemen jumlah kelompok aktif masyarakat dan kemitraan desa per tahun.
47. Dashboard admin.
48. Dashboard enumerator.
49. Grafik tren tahunan sederhana untuk omset, pengunjung, tenaga kerja, dan data impact.

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
16. Data warehouse terpisah.
17. Integrasi BI eksternal.
18. Prediksi tren otomatis berbasis machine learning.

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
9. Melihat dan mengelola data omset tahunan UMKM.
10. Melihat dan mengelola data pekerja UMKM tahunan.
11. Melihat dan mengelola data pelatihan pekerja UMKM tahunan.
12. Melihat dan mengelola data destinasi pariwisata desa.
13. Melihat dan mengelola paket wisata.
14. Melihat dan mengelola data omset tahunan pariwisata.
15. Melihat dan mengelola data pengunjung tahunan pariwisata.
16. Melihat dan mengelola data jenis pengunjung tahunan pariwisata.
17. Melihat dan mengelola data pekerja pariwisata tahunan.
18. Melihat dan mengelola data pelatihan pekerja pariwisata tahunan.
19. Melihat dan mengelola data masyarakat desa tahunan.
20. Mengelola master kategori kelompok rentan.
21. Melihat dan mengelola data kelompok rentan desa tahunan.
22. Mengelola master kategori kelompok aktif masyarakat dan kemitraan.
23. Melihat dan mengelola data kelompok aktif masyarakat dan kemitraan desa tahunan.
24. Membuat template survey.
25. Membuat pertanyaan survey desa.
26. Membuat opsi skor survey desa.
27. Membuat master pertanyaan assessment UMKM.
28. Membuat master matrix survey pariwisata.
29. Membuat opsi harkat/peringkat survey pariwisata.
30. Menugaskan template survey ke desa.
31. Melihat progress pengisian survey.
32. Melihat hasil assessment UMKM.
33. Melihat hasil survey pariwisata.
34. Mereview survey desa yang sudah disubmit.
35. Mengembalikan survey desa untuk diperbaiki.
36. Melihat log aktivitas survey.
37. Melihat histori perubahan jawaban survey.
38. Melihat dashboard ringkasan desa, UMKM, pariwisata, annual data, impact data, dan survey.

## 6.2 Enumerator

Enumerator adalah pengguna lapangan yang bertugas mengisi data desa, UMKM, destinasi wisata, annual data, impact data, dan survey.

Enumerator dapat:

1. Login ke dashboard enumerator.
2. Melihat desa yang ditugaskan kepadanya.
3. Mengisi dan mengedit profil desa.
4. Mengupload foto, video, atau dokumen desa.
5. Menambah item profil desa seperti fasilitas, produk lokal, budaya, event, homestay, atau paket wisata umum.
6. Menambah dan mengedit data UMKM pada desa yang ditugaskan.
7. Mengisi omset tahunan UMKM.
8. Mengisi data pekerja tahunan UMKM.
9. Mengisi data pelatihan pekerja UMKM.
10. Mengisi assessment UMKM.
11. Menambah dan mengedit data destinasi pariwisata pada desa yang ditugaskan.
12. Mengisi paket wisata destinasi pariwisata.
13. Mengisi omset tahunan pariwisata.
14. Mengisi total pengunjung tahunan pariwisata.
15. Mengisi jenis pengunjung tahunan pariwisata.
16. Mengisi data pekerja tahunan pariwisata.
17. Mengisi data pelatihan pekerja pariwisata.
18. Mengisi data masyarakat desa tahunan.
19. Mengisi jumlah kelompok rentan desa tahunan.
20. Mengisi jumlah kelompok aktif masyarakat dan kemitraan desa tahunan.
21. Mengisi survey pariwisata.
22. Mengupload dokumen pendukung survey pariwisata.
23. Mengisi survey desa yang ditugaskan.
24. Memilih opsi skor untuk setiap pertanyaan survey desa.
25. Mengupload dokumen pendukung pada jawaban survey desa.
26. Menyimpan survey sebagai draft.
27. Melanjutkan survey desa yang sudah dikerjakan enumerator lain.
28. Submit survey desa jika seluruh pertanyaan wajib sudah terisi.
29. Melihat status survey miliknya.

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
7. Paket wisata umum.
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
11. Omset snapshot/latest annual revenue.
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

Catatan: untuk omset tahunan detail, sumber utama adalah `annual_turnovers` dengan `entity_type = umkm`.

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

## 7.6 Paket Wisata

Satu destinasi pariwisata dapat memiliki banyak paket wisata. Data paket disimpan pada `pariwisata_packages`.

Data paket wisata meliputi:

1. Nama paket.
2. Jenis paket.
3. Durasi.
4. Fasilitas.
5. Deskripsi.
6. Harga.
7. Status aktif.

Contoh paket:

1. Paket Edukasi Membatik.
2. Paket Trekking Desa.
3. Paket Wisata Budaya.
4. Paket Kuliner Desa.

## 7.7 Annual Turnover UMKM dan Pariwisata

Omset tahunan UMKM dan pariwisata disimpan pada satu table generic `annual_turnovers`.

Konsep utama:

1. `entity_type` menentukan apakah data milik UMKM atau pariwisata.
2. `umkm_id` diisi jika `entity_type = umkm`.
3. `pariwisata_id` diisi jika `entity_type = pariwisata`.
4. `entity_key` digunakan untuk menjaga unique index lintas entity, contoh `umkm:12` atau `pariwisata:5`.
5. `year` menyimpan tahun data.
6. `value` menyimpan omset dalam Rupiah.

Contoh data:

| entity_type | entity_key | year | value |
|---|---|---:|---:|
| umkm | umkm:12 | 2022 | 120000000 |
| umkm | umkm:12 | 2023 | 180000000 |
| pariwisata | pariwisata:5 | 2022 | 350000000 |
| pariwisata | pariwisata:5 | 2023 | 510000000 |

## 7.8 Data Pengunjung Pariwisata Tahunan

Total pengunjung tahunan destinasi pariwisata disimpan di `pariwisata_annual_visitors`.

Jenis pengunjung tahunan disimpan di `pariwisata_visitor_type_annuals`.

Jenis pengunjung yang didukung:

1. `lokal`
2. `domestik`
3. `mancanegara`
4. `pelajar`
5. `komunitas`

Contoh data jenis pengunjung:

| pariwisata_id | year | visitor_type | value |
|---:|---:|---|---:|
| 5 | 2022 | lokal | 1000 |
| 5 | 2022 | domestik | 500 |
| 5 | 2022 | mancanegara | 120 |
| 5 | 2022 | pelajar | 300 |
| 5 | 2022 | komunitas | 50 |

## 7.9 Data Pekerja UMKM dan Pariwisata Tahunan

Data pekerja UMKM dan pariwisata per tahun disimpan pada `annual_worker_stats`.

Dimensi yang didukung:

1. `age`
2. `gender`
3. `education`

Konsep utama:

1. `entity_type` menentukan apakah data milik UMKM atau pariwisata.
2. `entity_key` menjaga keunikan data per entity.
3. `dimension` menentukan jenis data pekerja.
4. `category_value` menyimpan nilai kategori, misalnya `22 tahun`, `lelaki`, `perempuan`, `S1`, atau `SMA`.
5. `total_people` menyimpan jumlah orang.

Contoh input:

| entity_type | entity_key | year | dimension | category_value | total_people |
|---|---|---:|---|---|---:|
| umkm | umkm:12 | 2022 | age | 22 tahun | 100 |
| umkm | umkm:12 | 2022 | gender | lelaki | 80 |
| pariwisata | pariwisata:5 | 2022 | education | S1 | 25 |

## 7.10 Data Pelatihan Pekerja UMKM dan Pariwisata Tahunan

Data jumlah pekerja yang ikut pelatihan disimpan pada `annual_worker_training_stats`.

Data yang dicatat:

1. Entity type.
2. UMKM atau pariwisata.
3. Tahun.
4. Nama pelatihan opsional.
5. Jumlah orang.
6. Catatan.

Contoh:

| entity_type | entity_key | year | training_name | total_people |
|---|---|---:|---|---:|
| umkm | umkm:12 | 2022 | Pelatihan Digital Marketing | 10 |
| pariwisata | pariwisata:5 | 2022 | Pelatihan Pemandu Wisata | 25 |

## 7.11 Data Masyarakat Desa Tahunan

Data masyarakat desa per tahun disimpan pada `village_annual_population_stats`.

Dimensi yang didukung:

1. `gender`
2. `education`
3. `skill`
4. `livelihood`

`category_value` bersifat fleksibel sehingga dapat menampung data custom.

Contoh:

| village_id | year | dimension | category_value | total_people |
|---:|---:|---|---|---:|
| 1 | 2022 | gender | pria | 50 |
| 1 | 2022 | gender | wanita | 60 |
| 1 | 2022 | education | S2 | 20 |
| 1 | 2022 | skill | pemandu wisata | 15 |
| 1 | 2022 | livelihood | petani | 200 |

## 7.12 Kelompok Rentan Desa Tahunan

Master kategori kelompok rentan disimpan di `village_vulnerable_group_categories`.

Jumlah kelompok rentan per tahun disimpan di `village_vulnerable_group_annuals`.

Seed awal kategori:

1. Lansia.
2. Difabel.
3. Kepala Keluarga Perempuan.
4. Anak Putus Sekolah.

Contoh:

| village_id | year | kategori | total_people |
|---:|---:|---|---:|
| 1 | 2022 | Lansia | 80 |
| 1 | 2022 | Difabel | 10 |
| 1 | 2022 | Kepala Keluarga Perempuan | 25 |

## 7.13 Kelompok Aktif Masyarakat dan Kemitraan Tahunan

Master kategori kelompok aktif masyarakat dan kemitraan disimpan di `village_active_group_categories`.

Jumlah tahunan disimpan di `village_active_group_annuals`.

`type = community_group` digunakan untuk kelompok masyarakat, seperti:

1. Karang Taruna.
2. PKK.
3. Kelompok Adat.

`type = partnership` digunakan untuk kemitraan, seperti:

1. Pemerintah.
2. Kampus.
3. Komunitas.
4. Travel.
5. Hotel.
6. CSR.

Kategori dapat ditambah custom oleh admin menggunakan `is_custom = true`.

Contoh:

| village_id | year | kategori | value |
|---:|---:|---|---:|
| 1 | 2022 | PKK | 20 |
| 1 | 2022 | Karang Taruna | 35 |
| 1 | 2022 | Kampus | 3 |
| 1 | 2022 | CSR | 1 |

## 7.14 Survey Desa

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

## 7.15 Survey UMKM

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

## 7.16 Survey Pariwisata

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
| `pariwisata_packages` | Paket wisata pada destinasi pariwisata |
| `pariwisata_survey_questions` | Master matrix survey pariwisata |
| `pariwisata_suvey_options` | Opsi harkat/peringkat untuk survey pariwisata |
| `pariwisata_survey_answers` | Jawaban survey pariwisata |
| `pariwisata_survey_answer_documents` | Dokumen bukti pendukung jawaban survey pariwisata |

## 8.6 Tabel Annual Data UMKM dan Pariwisata

| Tabel | Fungsi |
|---|---|
| `annual_turnovers` | Omset tahunan UMKM dan pariwisata dalam satu table generic |
| `pariwisata_annual_visitors` | Total pengunjung tahunan destinasi pariwisata |
| `pariwisata_visitor_type_annuals` | Jumlah pengunjung tahunan berdasarkan jenis pengunjung |
| `annual_worker_stats` | Data pekerja tahunan UMKM/pariwisata berdasarkan usia, jenis kelamin, dan pendidikan |
| `annual_worker_training_stats` | Data jumlah pekerja UMKM/pariwisata yang mengikuti pelatihan per tahun |

## 8.7 Tabel Annual Data Desa dan Impact Data

| Tabel | Fungsi |
|---|---|
| `village_annual_population_stats` | Data masyarakat desa per tahun berdasarkan gender, pendidikan, skill, dan livelihood |
| `village_vulnerable_group_categories` | Master kategori kelompok rentan |
| `village_vulnerable_group_annuals` | Jumlah kelompok rentan desa per tahun |
| `village_active_group_categories` | Master kategori kelompok aktif masyarakat dan kemitraan |
| `village_active_group_annuals` | Jumlah kelompok aktif masyarakat dan kemitraan desa per tahun |

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
14. Manage annual village impact data.
15. Create survey assignment desa.

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
11. Kelola omset tahunan UMKM.
12. Kelola data pekerja tahunan UMKM.
13. Kelola data pekerja UMKM yang mengikuti pelatihan.

## 9.6 UMKM Annual Data

Fitur:

1. Input omset UMKM per tahun.
2. Edit omset UMKM per tahun.
3. Hapus/soft delete data omset UMKM per tahun.
4. Input data pekerja UMKM berdasarkan usia per tahun.
5. Input data pekerja UMKM berdasarkan jenis kelamin per tahun.
6. Input data pekerja UMKM berdasarkan pendidikan per tahun.
7. Input jumlah pekerja UMKM yang ikut pelatihan per tahun.
8. Optional input nama pelatihan.
9. Tampilkan grafik tren omset UMKM.
10. Tampilkan ringkasan pekerja UMKM berdasarkan tahun.

## 9.7 Survey UMKM

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

## 9.8 Pariwisata Management

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
11. Kelola paket wisata.
12. Kelola omset tahunan destinasi.
13. Kelola total pengunjung tahunan destinasi.
14. Kelola jenis pengunjung tahunan destinasi.
15. Kelola data pekerja tahunan destinasi.
16. Kelola data pekerja destinasi yang mengikuti pelatihan.

## 9.9 Pariwisata Annual Data

Fitur:

1. Input omset destinasi pariwisata per tahun.
2. Input total pengunjung destinasi pariwisata per tahun.
3. Input jenis pengunjung destinasi pariwisata per tahun.
4. Input data pekerja destinasi berdasarkan usia per tahun.
5. Input data pekerja destinasi berdasarkan jenis kelamin per tahun.
6. Input data pekerja destinasi berdasarkan pendidikan per tahun.
7. Input jumlah pekerja pariwisata yang ikut pelatihan per tahun.
8. Optional input nama pelatihan.
9. Tampilkan grafik tren omset pariwisata.
10. Tampilkan grafik tren pengunjung pariwisata.
11. Tampilkan distribusi jenis pengunjung per tahun.

## 9.10 Paket Wisata

Fitur:

1. List paket wisata per destinasi.
2. Create paket wisata.
3. Edit paket wisata.
4. Delete/soft delete paket wisata.
5. Filter paket berdasarkan jenis paket.
6. Set aktif/nonaktif paket.
7. Tampilkan paket pada detail destinasi.

## 9.11 Survey Pariwisata

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

## 9.12 Village Annual Impact Data

Fitur admin dan enumerator:

1. Input data masyarakat desa berdasarkan jenis kelamin per tahun.
2. Input data masyarakat desa berdasarkan pendidikan per tahun.
3. Input data masyarakat desa berdasarkan keterampilan custom per tahun.
4. Input data masyarakat desa berdasarkan mata pencaharian custom per tahun.
5. Input master kategori kelompok rentan.
6. Input jumlah kelompok rentan per tahun.
7. Input master kategori kelompok aktif masyarakat dan kemitraan.
8. Input jumlah kelompok aktif masyarakat per tahun.
9. Input jumlah kemitraan per tahun.
10. Tampilkan grafik tren data masyarakat desa.
11. Tampilkan ringkasan kelompok rentan.
12. Tampilkan ringkasan kelompok aktif dan kemitraan.

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

## 10.4 Workflow Enumerator Mengisi Data Masyarakat Desa Tahunan

1. Enumerator membuka detail desa.
2. Enumerator membuka tab Impact Data atau Data Tahunan Desa.
3. Enumerator memilih tahun.
4. Enumerator memilih dimensi: gender, education, skill, atau livelihood.
5. Enumerator mengisi `category_value` dan `total_people`.
6. Sistem menyimpan data ke `village_annual_population_stats`.
7. Sistem mencegah duplikasi kombinasi `village_id`, `year`, `dimension`, dan `category_value`.

## 10.5 Workflow Enumerator Mengisi Kelompok Rentan Desa Tahunan

1. Enumerator membuka detail desa.
2. Enumerator membuka tab Kelompok Rentan.
3. Enumerator memilih tahun.
4. Enumerator memilih kategori kelompok rentan.
5. Enumerator mengisi jumlah orang.
6. Sistem menyimpan data ke `village_vulnerable_group_annuals`.
7. Jika kategori belum tersedia, admin dapat menambahkan kategori di `village_vulnerable_group_categories`.

## 10.6 Workflow Enumerator Mengisi Kelompok Aktif dan Kemitraan Desa Tahunan

1. Enumerator membuka detail desa.
2. Enumerator membuka tab Kelompok Aktif & Kemitraan.
3. Enumerator memilih tahun.
4. Enumerator memilih kategori community group atau partnership.
5. Enumerator mengisi nilai/jumlah.
6. Sistem menyimpan data ke `village_active_group_annuals`.
7. Jika kategori belum tersedia, admin dapat menambahkan kategori custom di `village_active_group_categories`.

## 10.7 Workflow Enumerator Menambah Data UMKM

1. Enumerator membuka detail desa.
2. Enumerator membuka tab UMKM.
3. Enumerator klik Tambah UMKM.
4. Enumerator mengisi profil UMKM.
5. Enumerator mengisi data kurasi, pemasaran, sustainability, perbankan, ekspor, dan foto produk.
6. Sistem menyimpan data ke `village_umkms`.
7. UMKM muncul di daftar UMKM desa.

## 10.8 Workflow Enumerator Mengisi Annual Data UMKM

1. Enumerator membuka detail UMKM.
2. Enumerator membuka tab Data Tahunan.
3. Enumerator mengisi omset per tahun.
4. Sistem menyimpan data ke `annual_turnovers` dengan `entity_type = umkm`.
5. Enumerator mengisi data pekerja berdasarkan usia, jenis kelamin, dan pendidikan.
6. Sistem menyimpan data ke `annual_worker_stats` dengan `entity_type = umkm`.
7. Enumerator mengisi jumlah pekerja yang ikut pelatihan per tahun.
8. Sistem menyimpan data ke `annual_worker_training_stats` dengan `entity_type = umkm`.

## 10.9 Workflow Enumerator Mengisi Assessment UMKM

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

## 10.10 Workflow Enumerator Menambah Destinasi Pariwisata

1. Enumerator membuka detail desa.
2. Enumerator membuka tab Pariwisata.
3. Enumerator klik Tambah Destinasi.
4. Enumerator mengisi nama destinasi, kategori, operasional, tiket, alamat, dan penanggung jawab.
5. Sistem menyimpan data ke `pariwisata_village_table`.
6. Sistem menyimpan kategori ke `pariwisata_village_category`.
7. Destinasi muncul di daftar destinasi wisata desa.

## 10.11 Workflow Enumerator Mengisi Paket Wisata

1. Enumerator membuka detail destinasi pariwisata.
2. Enumerator membuka tab Paket Wisata.
3. Enumerator klik Tambah Paket.
4. Enumerator mengisi nama paket, jenis paket, durasi, fasilitas, deskripsi, dan harga.
5. Sistem menyimpan data ke `pariwisata_packages`.
6. Paket muncul di detail destinasi.

## 10.12 Workflow Enumerator Mengisi Annual Data Pariwisata

1. Enumerator membuka detail destinasi pariwisata.
2. Enumerator membuka tab Data Tahunan.
3. Enumerator mengisi omset per tahun.
4. Sistem menyimpan data ke `annual_turnovers` dengan `entity_type = pariwisata`.
5. Enumerator mengisi total pengunjung per tahun.
6. Sistem menyimpan data ke `pariwisata_annual_visitors`.
7. Enumerator mengisi jenis pengunjung per tahun.
8. Sistem menyimpan data ke `pariwisata_visitor_type_annuals`.
9. Enumerator mengisi data pekerja berdasarkan usia, jenis kelamin, dan pendidikan.
10. Sistem menyimpan data ke `annual_worker_stats` dengan `entity_type = pariwisata`.
11. Enumerator mengisi jumlah pekerja yang ikut pelatihan per tahun.
12. Sistem menyimpan data ke `annual_worker_training_stats` dengan `entity_type = pariwisata`.

## 10.13 Workflow Admin Membuat Matrix Survey Pariwisata

1. Admin membuka menu Survey Templates.
2. Admin memilih template survey pariwisata.
3. Admin menambah pertanyaan matrix pariwisata.
4. Admin mengisi kategori, sub kategori, kriteria, indikator, dan bukti pendukung.
5. Admin menambah opsi harkat/peringkat 4, 3, 2, dan 1.
6. Admin publish template.
7. Template siap digunakan untuk survey pariwisata.

## 10.14 Workflow Enumerator Mengisi Survey Pariwisata

1. Enumerator membuka menu Survey Pariwisata.
2. Sistem menampilkan daftar indikator dari `pariwisata_survey_questions`.
3. Enumerator membaca kriteria, indikator, dan bukti pendukung.
4. Enumerator memilih opsi harkat/peringkat dari `pariwisata_suvey_options`.
5. Sistem menyimpan score ke `pariwisata_survey_answers`.
6. Enumerator mengisi catatan pada `notes` jika diperlukan.
7. Enumerator mengupload dokumen bukti pendukung ke `pariwisata_survey_answer_documents`.
8. Sistem menyimpan snapshot pertanyaan dan opsi.

## 10.15 Workflow Admin Membuat Template Survey Desa

1. Admin membuka menu Survey Templates.
2. Admin membuat template survey desa.
3. Admin menambah pertanyaan.
4. Admin menentukan aspect pada setiap pertanyaan.
5. Admin menambah opsi skor pada setiap pertanyaan.
6. Admin publish template.
7. Template siap digunakan untuk assignment survey desa.

## 10.16 Workflow Admin Membuat Survey Assignment Desa

1. Admin membuka detail desa.
2. Admin memilih template survey desa.
3. Admin membuat survey assignment.
4. Sistem membuat record di `village_survey_assignments`.
5. `village_id` bersifat unique agar satu desa hanya memiliki satu survey assignment utama.
6. Sistem menyimpan `assigned_by` dan `assigned_at`.

## 10.17 Workflow Enumerator Mengisi Survey Desa Draft

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

## 10.18 Workflow Submit dan Review Survey Desa

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
9. Desa dapat memiliki data masyarakat tahunan berdasarkan banyak dimensi.
10. Desa dapat memiliki data kelompok rentan tahunan.
11. Desa dapat memiliki data kelompok aktif masyarakat dan kemitraan tahunan.

## 11.3 Program CSR

1. Satu program dapat memiliki banyak desa.
2. Satu desa dapat masuk ke banyak program.
3. Kombinasi `program_id` dan `village_id` harus unik.

## 11.4 Assignment Enumerator Desa

1. Satu enumerator dapat ditugaskan ke banyak desa.
2. Satu desa dapat memiliki banyak enumerator.
3. Kombinasi `village_id` dan `enumerator_id` harus unik.
4. Hanya enumerator aktif yang dapat mengisi data desa, UMKM, pariwisata, annual data, impact data, dan survey.

## 11.5 Annual Turnover

1. Omset tahunan UMKM dan pariwisata disimpan dalam `annual_turnovers`.
2. `entity_type = umkm` wajib memiliki `umkm_id` dan `pariwisata_id` harus kosong.
3. `entity_type = pariwisata` wajib memiliki `pariwisata_id` dan `umkm_id` harus kosong.
4. `entity_key` harus mengikuti format `umkm:{id}` atau `pariwisata:{id}`.
5. Kombinasi `entity_key` dan `year` harus unik.
6. `value` harus numeric dan tidak boleh negatif.

## 11.6 Annual Worker Stats

1. Data pekerja tahunan UMKM dan pariwisata disimpan dalam `annual_worker_stats`.
2. `dimension` hanya boleh `age`, `gender`, atau `education`.
3. `category_value` wajib diisi.
4. `total_people` harus numeric integer dan tidak boleh negatif.
5. Kombinasi `entity_key`, `year`, `dimension`, dan `category_value` harus unik.

## 11.7 Annual Worker Training Stats

1. Data pelatihan pekerja UMKM dan pariwisata disimpan dalam `annual_worker_training_stats`.
2. `total_people` wajib diisi dan tidak boleh negatif.
3. `training_name` bersifat opsional.
4. Jika satu entity memiliki banyak pelatihan dalam tahun yang sama, maka `training_name` digunakan untuk membedakan data.

## 11.8 Pariwisata Annual Visitors

1. Total pengunjung tahunan disimpan dalam `pariwisata_annual_visitors`.
2. Kombinasi `pariwisata_id` dan `year` harus unik.
3. `value` harus integer dan tidak boleh negatif.

## 11.9 Pariwisata Visitor Type Annuals

1. Data jenis pengunjung tahunan disimpan dalam `pariwisata_visitor_type_annuals`.
2. `visitor_type` hanya boleh `lokal`, `domestik`, `mancanegara`, `pelajar`, atau `komunitas`.
3. Kombinasi `pariwisata_id`, `year`, dan `visitor_type` harus unik.
4. Total dari jenis pengunjung tidak wajib sama dengan `pariwisata_annual_visitors.value`, tetapi sistem sebaiknya menampilkan peringatan jika terdapat selisih besar.

## 11.10 Paket Wisata

1. Satu destinasi pariwisata dapat memiliki banyak paket wisata.
2. Nama paket wajib diisi.
3. Paket dapat diaktifkan atau dinonaktifkan.
4. Paket yang dihapus menggunakan soft delete.

## 11.11 Village Annual Population Stats

1. Data masyarakat desa tahunan disimpan dalam `village_annual_population_stats`.
2. `dimension` hanya boleh `gender`, `education`, `skill`, atau `livelihood`.
3. `category_value` wajib diisi.
4. Untuk `skill` dan `livelihood`, `category_value` dapat berupa custom input.
5. Kombinasi `village_id`, `year`, `dimension`, dan `category_value` harus unik.

## 11.12 Village Vulnerable Groups

1. Kategori kelompok rentan disimpan dalam `village_vulnerable_group_categories`.
2. Jumlah kelompok rentan per tahun disimpan dalam `village_vulnerable_group_annuals`.
3. Kombinasi `village_id`, `vulnerable_group_category_id`, dan `year` harus unik.
4. Kategori kelompok rentan dapat dinonaktifkan tanpa menghapus data historis.

## 11.13 Village Active Groups and Partnerships

1. Kategori kelompok aktif dan kemitraan disimpan dalam `village_active_group_categories`.
2. `type = community_group` untuk kelompok masyarakat.
3. `type = partnership` untuk kemitraan.
4. Kategori dapat dibuat custom oleh admin.
5. Jumlah tahunan disimpan dalam `village_active_group_annuals`.
6. Kombinasi `village_id`, `active_group_category_id`, dan `year` harus unik.

## 11.14 Template Survey

1. Template survey dapat berstatus `draft`, `published`, atau `archived`.
2. Template hanya dapat digunakan jika statusnya `published`.
3. Template dapat digunakan untuk survey desa, survey UMKM, atau survey pariwisata sesuai konteks implementasi.
4. Survey desa menggunakan `survey_questions` dan `survey_question_options`.
5. Survey UMKM menggunakan `umkm_survey_questions` dan `umkm_survey_answers`.
6. Survey pariwisata menggunakan `pariwisata_survey_questions`, `pariwisata_suvey_options`, dan `pariwisata_survey_answers`.

## 11.15 UMKM

1. Satu desa dapat memiliki banyak UMKM.
2. Setiap UMKM wajib memiliki `name`.
3. UMKM dapat memiliki data legalitas, produksi, pemasaran, sustainability, perbankan, ekspor, dan foto produk.
4. UMKM yang dihapus menggunakan soft delete.
5. Assessment UMKM hanya dapat diisi oleh enumerator yang ditugaskan ke desa terkait.
6. Satu UMKM hanya boleh memiliki satu jawaban per pertanyaan assessment berdasarkan unique index `(umkm_id, umkm_assessment_question_id)`.

## 11.16 Assessment UMKM

1. Setiap pertanyaan assessment UMKM harus memiliki kriteria.
2. Setiap pertanyaan assessment UMKM harus memiliki bobot pertanyaan.
3. Score tidak boleh melebihi `max_score`.
4. Sistem wajib menyimpan snapshot pertanyaan dan bobot ketika jawaban dibuat.
5. Sistem wajib menghitung `normalized_score` dan `weighted_score`.

## 11.17 Pariwisata

1. Satu desa dapat memiliki banyak destinasi pariwisata.
2. Setiap destinasi pariwisata wajib memiliki `name`.
3. Satu destinasi pariwisata dapat memiliki lebih dari satu kategori.
4. Kategori menggunakan enum `pariwisata_category_type`.
5. Destinasi yang dihapus menggunakan soft delete.

## 11.18 Survey Pariwisata

1. Setiap indikator pariwisata wajib memiliki `indicator_code` dan `indicator_name`.
2. Setiap indikator dapat memiliki bukti pendukung.
3. Opsi harkat/peringkat wajib memiliki score, level, label, dan description.
4. Score pilihan biasanya 4, 3, 2, dan 1.
5. Jawaban survey pariwisata harus memilih salah satu opsi.
6. Sistem wajib menyimpan snapshot pertanyaan dan opsi.
7. Jika `document_required` true, enumerator wajib mengupload dokumen pendukung.
8. Berdasarkan ERD saat ini, unique index pada `pariwisata_survey_answers` adalah `(pariwisata_survey_question_id)`, sehingga satu pertanyaan pariwisata hanya memiliki satu jawaban final secara global. Jika di masa depan survey perlu per destinasi atau per assignment, ERD perlu diperluas dengan foreign key ke assignment atau destinasi.

## 11.19 Survey Desa

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

## 12.3 Annual Turnover

1. Entity type required, must be `umkm` or `pariwisata`.
2. If entity type is `umkm`, `umkm_id` required.
3. If entity type is `pariwisata`, `pariwisata_id` required.
4. Entity key required and must match selected entity.
5. Year required numeric.
6. Value required numeric and must be greater than or equal to 0.
7. Combination `entity_key` and `year` must be unique.

## 12.4 Pariwisata Annual Visitor

1. Pariwisata required.
2. Year required numeric.
3. Value required integer and must be greater than or equal to 0.
4. Combination `pariwisata_id` and `year` must be unique.

## 12.5 Pariwisata Visitor Type Annual

1. Pariwisata required.
2. Year required numeric.
3. Visitor type required and must be one of the enum values.
4. Value required integer and must be greater than or equal to 0.
5. Combination `pariwisata_id`, `year`, and `visitor_type` must be unique.

## 12.6 Pariwisata Package

1. Pariwisata required.
2. Name required.
3. Package type nullable string.
4. Duration nullable string.
5. Facilities nullable text.
6. Price nullable numeric and must be greater than or equal to 0.
7. Is active required boolean.

## 12.7 Annual Worker Stats

1. Entity type required, must be `umkm` or `pariwisata`.
2. Entity key required and must match selected entity.
3. Year required numeric.
4. Dimension required and must be `age`, `gender`, or `education`.
5. Category value required.
6. Total people required integer and must be greater than or equal to 0.
7. Combination `entity_key`, `year`, `dimension`, and `category_value` must be unique.

## 12.8 Annual Worker Training Stats

1. Entity type required, must be `umkm` or `pariwisata`.
2. Entity key required and must match selected entity.
3. Year required numeric.
4. Training name nullable string.
5. Total people required integer and must be greater than or equal to 0.

## 12.9 Village Annual Population Stats

1. Village required.
2. Year required numeric.
3. Dimension required and must be `gender`, `education`, `skill`, or `livelihood`.
4. Category value required.
5. Total people required integer and must be greater than or equal to 0.
6. Combination `village_id`, `year`, `dimension`, and `category_value` must be unique.

## 12.10 Vulnerable Group Category

1. Name required.
2. Slug required and unique.
3. Is active required boolean.
4. Sort order numeric.

## 12.11 Vulnerable Group Annual

1. Village required.
2. Vulnerable group category required.
3. Year required numeric.
4. Total people required integer and must be greater than or equal to 0.
5. Combination `village_id`, `vulnerable_group_category_id`, and `year` must be unique.

## 12.12 Active Group Category

1. Type required and must be `community_group` or `partnership`.
2. Name required.
3. Slug required and unique.
4. Is custom required boolean.
5. Is active required boolean.
6. Sort order numeric.

## 12.13 Active Group Annual

1. Village required.
2. Active group category required.
3. Year required numeric.
4. Value required integer and must be greater than or equal to 0.
5. Combination `village_id`, `active_group_category_id`, and `year` must be unique.

## 12.14 UMKM

1. Village required.
2. Name required.
3. Established year nullable numeric.
4. Annual revenue nullable numeric.
5. Website URL nullable valid URL.
6. Product category nullable string.
7. Has exported nullable boolean.
8. Product photo nullable file path atau valid upload.

## 12.15 UMKM Survey Question

1. Survey template required.
2. Criteria code required.
3. Criteria name required.
4. Criteria weight percent required numeric.
5. Question number required numeric.
6. Question text required.
7. Question weight percent required numeric.
8. Max score required numeric and greater than zero.
9. Combination `survey_template_id`, `criteria_code`, and `question_number` must be unique.

## 12.16 UMKM Survey Answer

1. UMKM required.
2. UMKM assessment question required.
3. Answered by required.
4. Score required numeric.
5. Score must be less than or equal to max score.
6. System must calculate normalized score.
7. System must calculate weighted score.
8. Combination `umkm_id` and `umkm_assessment_question_id` must be unique.

## 12.17 Pariwisata Destination

1. Village required.
2. Name required.
3. Category optional but recommended.
4. Entrance ticket price nullable numeric.
5. PIC phone nullable string.
6. Operational schedule nullable JSON.

## 12.18 Pariwisata Survey Question

1. Survey template required.
2. Indicator code required.
3. Indicator name required.
4. Input type required.
5. Combination `survey_template_id` and `indicator_code` must be unique.
6. Document hint required if document required is true.

## 12.19 Pariwisata Survey Option

1. Pariwisata survey question required.
2. Score required integer.
3. Level required.
4. Label required.
5. Description required.
6. Score unique per pariwisata survey question.

## 12.20 Pariwisata Survey Answer

1. Pariwisata survey question required.
2. Pariwisata survey option required.
3. Option must belong to the selected question.
4. Score copied from selected option.
5. Answered by required.
6. Notes nullable.
7. Snapshot fields populated from question and option.

## 12.21 Survey Desa Answer

1. Village survey assignment required.
2. Survey question required.
3. Survey question option required.
4. Option must belong to the selected question.
5. Score copied from selected option.
6. User must be assigned to the village.
7. Cannot update if assignment status is `reviewed`.

## 12.22 File Upload

1. File required for upload endpoint.
2. Allowed MIME types should include PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG.
3. File size should be limited by system configuration.
4. Uploaded by required.
5. Private survey documents should not be publicly accessible without authorization.

---

## 13. Scoring dan Calculation Logic

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

## 13.7 Annual Turnover Trend

Tren omset dihitung dari `annual_turnovers`.

```text
turnover_growth_percentage = (current_year_value - previous_year_value) / previous_year_value * 100
```

Jika previous year tidak ada atau bernilai 0, growth percentage tidak dihitung.

## 13.8 Visitor Growth Trend

Tren pengunjung dihitung dari `pariwisata_annual_visitors`.

```text
visitor_growth_percentage = (current_year_value - previous_year_value) / previous_year_value * 100
```

## 13.9 Worker Distribution

Distribusi pekerja dihitung dari `annual_worker_stats` berdasarkan entity, tahun, dan dimensi.

```text
worker_distribution = GROUP BY dimension, category_value
```

## 13.10 Village Impact Summary

Impact summary desa dihitung dari:

1. `village_annual_population_stats` untuk demografi, pendidikan, keterampilan, dan mata pencaharian.
2. `village_vulnerable_group_annuals` untuk kelompok rentan.
3. `village_active_group_annuals` untuk kelompok aktif dan kemitraan.

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
8. Paket Wisata.
9. Annual Data.
10. Village Impact Data.
11. Survey Templates.
12. Survey Desa.
13. Survey UMKM.
14. Survey Pariwisata.
15. Review Survey.
16. Audit Logs.
17. Settings.

## 14.2 Enumerator Layout

Menu enumerator:

1. Dashboard.
2. Desa Saya.
3. UMKM Desa.
4. Destinasi Pariwisata.
5. Paket Wisata.
6. Annual Data.
7. Impact Data Desa.
8. Survey Desa.
9. Assessment UMKM.
10. Survey Pariwisata.
11. Profil Saya.

---

## 15. Detail Halaman Admin

## 15.1 Admin Dashboard

Menampilkan:

1. Total desa wisata.
2. Total desa by status.
3. Total active programs.
4. Total enumerator active.
5. Total UMKM.
6. Total UMKM by product category.
7. Total UMKM yang sudah pernah ekspor.
8. Total omset UMKM per tahun.
9. Growth omset UMKM year-over-year.
10. Average UMKM assessment score.
11. Total destinasi wisata.
12. Total destinasi wisata by category.
13. Total paket wisata.
14. Total omset pariwisata per tahun.
15. Total pengunjung pariwisata per tahun.
16. Distribusi jenis pengunjung pariwisata.
17. Average pariwisata survey score.
18. Total pekerja UMKM dan pariwisata per tahun.
19. Total pekerja yang ikut pelatihan per tahun.
20. Data masyarakat desa berdasarkan gender, pendidikan, skill, dan livelihood.
21. Total kelompok rentan per tahun.
22. Total kelompok aktif masyarakat dan kemitraan per tahun.
23. Total survey desa assigned.
24. Total survey desa in progress.
25. Total survey desa submitted.
26. Total survey desa reviewed.
27. Average survey desa score.
28. Desa dengan data belum lengkap.
29. Recent activities.

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
14. Manage impact data desa.
15. Create survey assignment desa.

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
10. Lihat grafik omset tahunan UMKM.
11. Lihat data pekerja tahunan UMKM.
12. Lihat data pelatihan pekerja UMKM.

## 15.6 UMKM Annual Data Page

Fitur:

1. List annual turnover UMKM.
2. Create annual turnover UMKM.
3. Edit annual turnover UMKM.
4. Delete annual turnover UMKM.
5. List worker stats UMKM.
6. Create worker stats UMKM berdasarkan age/gender/education.
7. Edit worker stats UMKM.
8. Delete worker stats UMKM.
9. List worker training stats UMKM.
10. Create worker training stats UMKM.
11. Edit worker training stats UMKM.
12. Delete worker training stats UMKM.

## 15.7 UMKM Assessment Builder

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

## 15.8 Pariwisata Destination Management

Fitur:

1. List destinasi wisata.
2. Filter desa.
3. Filter kategori destinasi.
4. Search nama destinasi.
5. Create destinasi.
6. Edit destinasi.
7. Delete destinasi.
8. Manage kategori destinasi.
9. Lihat paket wisata.
10. Lihat grafik omset tahunan.
11. Lihat grafik pengunjung tahunan.
12. Lihat distribusi jenis pengunjung.
13. Lihat data pekerja tahunan.
14. Lihat data pelatihan pekerja.

## 15.9 Paket Wisata Management

Fitur:

1. List paket wisata.
2. Filter berdasarkan destinasi.
3. Filter berdasarkan jenis paket.
4. Search nama paket.
5. Create paket.
6. Edit paket.
7. Delete paket.
8. Set active/inactive.

## 15.10 Pariwisata Annual Data Page

Fitur:

1. List annual turnover pariwisata.
2. Create annual turnover pariwisata.
3. Edit annual turnover pariwisata.
4. Delete annual turnover pariwisata.
5. List annual visitors.
6. Create annual visitors.
7. Edit annual visitors.
8. Delete annual visitors.
9. List visitor type annuals.
10. Create visitor type annuals.
11. Edit visitor type annuals.
12. Delete visitor type annuals.
13. List worker stats pariwisata.
14. Create worker stats pariwisata.
15. Edit worker stats pariwisata.
16. Delete worker stats pariwisata.
17. List worker training stats pariwisata.
18. Create worker training stats pariwisata.
19. Edit worker training stats pariwisata.
20. Delete worker training stats pariwisata.

## 15.11 Village Impact Data Page

Fitur:

1. List data masyarakat desa per tahun.
2. Create data masyarakat desa.
3. Edit data masyarakat desa.
4. Delete data masyarakat desa.
5. Manage kategori kelompok rentan.
6. List kelompok rentan tahunan.
7. Create kelompok rentan tahunan.
8. Edit kelompok rentan tahunan.
9. Delete kelompok rentan tahunan.
10. Manage kategori kelompok aktif dan kemitraan.
11. List kelompok aktif dan kemitraan tahunan.
12. Create kelompok aktif dan kemitraan tahunan.
13. Edit kelompok aktif dan kemitraan tahunan.
14. Delete kelompok aktif dan kemitraan tahunan.

## 15.12 Pariwisata Survey Matrix Builder

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

## 15.13 Survey Assignment Detail

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
4. Total paket wisata yang telah diinput.
5. Survey desa assigned.
6. Survey desa in progress.
7. Survey desa returned.
8. Survey desa submitted.
9. Assessment UMKM belum lengkap.
10. Survey pariwisata belum lengkap.
11. Annual data yang belum lengkap.
12. Impact data desa yang belum lengkap.
13. Daftar desa terbaru yang perlu diisi.

## 16.2 Desa Saya

Menampilkan daftar desa yang ditugaskan ke enumerator.

Kolom:

1. Nama desa.
2. Lokasi.
3. Status profil.
4. Jumlah UMKM.
5. Jumlah destinasi wisata.
6. Status survey desa.
7. Status annual data.
8. Status impact data.
9. Last saved.
10. Aksi.

## 16.3 Form Profil Desa

Enumerator dapat:

1. Edit deskripsi desa.
2. Edit alamat.
3. Edit koordinat.
4. Edit kontak pengelola.
5. Upload foto/video desa.
6. Tambah item profil.
7. Upload media item profil.

## 16.4 Form Impact Data Desa

Enumerator dapat:

1. Pilih tahun.
2. Input data masyarakat berdasarkan gender.
3. Input data masyarakat berdasarkan pendidikan.
4. Input data masyarakat berdasarkan keterampilan custom.
5. Input data masyarakat berdasarkan mata pencaharian custom.
6. Input data kelompok rentan.
7. Input data kelompok aktif masyarakat.
8. Input data kemitraan.
9. Melihat ringkasan dan grafik sederhana per tahun.

## 16.5 Form UMKM

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

## 16.6 Form Annual Data UMKM

Enumerator dapat:

1. Input omset tahunan.
2. Input data pekerja berdasarkan usia.
3. Input data pekerja berdasarkan jenis kelamin.
4. Input data pekerja berdasarkan pendidikan.
5. Input jumlah pekerja yang ikut pelatihan.
6. Melihat grafik omset dan pekerja.

## 16.7 Form Assessment UMKM

Fitur:

1. Tampilkan pertanyaan berdasarkan kriteria.
2. Tampilkan bobot kriteria dan bobot pertanyaan.
3. Isi nilai per pertanyaan.
4. Tampilkan normalized score.
5. Tampilkan weighted score.
6. Tampilkan total score UMKM.
7. Save per jawaban.
8. Tampilkan pertanyaan yang belum diisi.

## 16.8 Form Destinasi Pariwisata

Enumerator dapat:

1. Tambah destinasi wisata.
2. Edit destinasi wisata.
3. Pilih kategori destinasi lebih dari satu.
4. Isi waktu operasional.
5. Isi tiket masuk.
6. Isi alamat.
7. Isi penanggung jawab.

## 16.9 Form Paket Wisata

Enumerator dapat:

1. Tambah paket wisata.
2. Edit paket wisata.
3. Isi jenis paket.
4. Isi durasi.
5. Isi fasilitas.
6. Isi harga.
7. Set active/inactive.

## 16.10 Form Annual Data Pariwisata

Enumerator dapat:

1. Input omset tahunan destinasi.
2. Input total pengunjung tahunan.
3. Input jenis pengunjung tahunan.
4. Input data pekerja berdasarkan usia.
5. Input data pekerja berdasarkan jenis kelamin.
6. Input data pekerja berdasarkan pendidikan.
7. Input jumlah pekerja yang ikut pelatihan.
8. Melihat grafik omset, pengunjung, dan pekerja.

## 16.11 Form Survey Pariwisata

Fitur:

1. Tampilkan matrix berdasarkan kategori dan sub kategori.
2. Tampilkan kriteria, indikator, dan bukti pendukung.
3. Tampilkan opsi 4, 3, 2, dan 1.
4. Pilih opsi harkat/peringkat.
5. Isi catatan penilaian.
6. Upload dokumen bukti pendukung.
7. Tampilkan progress pertanyaan terjawab.
8. Tampilkan score rata-rata.

## 16.12 Form Survey Desa

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
8. Mendukung input data tahunan berulang dengan cepat.
9. Mendukung tampilan grafik sederhana untuk tren tahunan.

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
11. Inline editable table untuk data tahunan.
12. Chart area yang ringan dan mudah dipahami.

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
24. `Calendar`
25. `Popover`
26. `Command`

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
6. `recharts` untuk chart dashboard dan annual trend
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
8. Menggunakan table annual/time-series untuk omset, pengunjung, pekerja, pelatihan, dan impact data.
9. Menggunakan `entity_key` untuk table generic yang dapat mengarah ke UMKM atau pariwisata.

## 18.4 Redis

Redis digunakan untuk:

1. Cache dashboard summary.
2. Queue jobs.
3. Session jika dibutuhkan.
4. Rate limiting.
5. Temporary progress state untuk upload atau background process.
6. Cache agregasi annual data yang berat.

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
│   ├── AnnualData/
│   ├── ImpactData/
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
│   ├── AnnualDataService.php
│   ├── ImpactDataService.php
│   ├── DashboardMetricService.php
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
23. `PariwisataPackage`
24. `PariwisataSurveyQuestion`
25. `PariwisataSuveyOption`
26. `PariwisataSurveyAnswer`
27. `PariwisataSurveyAnswerDocument`
28. `AnnualTurnover`
29. `PariwisataAnnualVisitor`
30. `PariwisataVisitorTypeAnnual`
31. `AnnualWorkerStat`
32. `AnnualWorkerTrainingStat`
33. `VillageAnnualPopulationStat`
34. `VillageVulnerableGroupCategory`
35. `VillageVulnerableGroupAnnual`
36. `VillageActiveGroupCategory`
37. `VillageActiveGroupAnnual`

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

### AnnualDataService

Bertanggung jawab untuk:

1. Membuat `entity_key` untuk UMKM dan pariwisata.
2. Validasi consistency antara `entity_type`, `umkm_id`, `pariwisata_id`, dan `entity_key`.
3. Menyimpan omset tahunan.
4. Menyimpan data pengunjung tahunan.
5. Menyimpan data jenis pengunjung tahunan.
6. Menyimpan data pekerja tahunan.
7. Menyimpan data pelatihan pekerja tahunan.
8. Menghitung growth year-over-year.

### ImpactDataService

Bertanggung jawab untuk:

1. Menyimpan data masyarakat desa tahunan.
2. Menyimpan master kategori kelompok rentan.
3. Menyimpan data kelompok rentan tahunan.
4. Menyimpan master kategori kelompok aktif dan kemitraan.
5. Menyimpan data kelompok aktif dan kemitraan tahunan.
6. Menyediakan summary impact data per desa dan per tahun.

### DashboardMetricService

Bertanggung jawab untuk:

1. Mengambil data ringkasan dashboard admin.
2. Mengambil data ringkasan dashboard enumerator.
3. Menghitung grafik tren.
4. Meng-cache hasil agregasi dengan Redis.

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
resources/js/Pages/Admin/Villages/ImpactData.tsx

resources/js/Pages/Admin/VillageProfileItemCategories/Index.tsx

resources/js/Pages/Admin/Umkms/Index.tsx
resources/js/Pages/Admin/Umkms/Create.tsx
resources/js/Pages/Admin/Umkms/Edit.tsx
resources/js/Pages/Admin/Umkms/Show.tsx
resources/js/Pages/Admin/Umkms/AnnualData.tsx
resources/js/Pages/Admin/Umkms/Assessment.tsx

resources/js/Pages/Admin/Pariwisata/Index.tsx
resources/js/Pages/Admin/Pariwisata/Create.tsx
resources/js/Pages/Admin/Pariwisata/Edit.tsx
resources/js/Pages/Admin/Pariwisata/Show.tsx
resources/js/Pages/Admin/Pariwisata/AnnualData.tsx

resources/js/Pages/Admin/PariwisataPackages/Index.tsx
resources/js/Pages/Admin/PariwisataPackages/Create.tsx
resources/js/Pages/Admin/PariwisataPackages/Edit.tsx

resources/js/Pages/Admin/AnnualData/Turnovers.tsx
resources/js/Pages/Admin/AnnualData/Visitors.tsx
resources/js/Pages/Admin/AnnualData/WorkerStats.tsx
resources/js/Pages/Admin/AnnualData/WorkerTrainings.tsx

resources/js/Pages/Admin/ImpactData/PopulationStats.tsx
resources/js/Pages/Admin/ImpactData/VulnerableGroups.tsx
resources/js/Pages/Admin/ImpactData/ActiveGroups.tsx

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
resources/js/Pages/Enumerator/Villages/ImpactData.tsx

resources/js/Pages/Enumerator/Umkms/Index.tsx
resources/js/Pages/Enumerator/Umkms/Create.tsx
resources/js/Pages/Enumerator/Umkms/Edit.tsx
resources/js/Pages/Enumerator/Umkms/Show.tsx
resources/js/Pages/Enumerator/Umkms/AnnualData.tsx
resources/js/Pages/Enumerator/Umkms/Assessment.tsx

resources/js/Pages/Enumerator/Pariwisata/Index.tsx
resources/js/Pages/Enumerator/Pariwisata/Create.tsx
resources/js/Pages/Enumerator/Pariwisata/Edit.tsx
resources/js/Pages/Enumerator/Pariwisata/Show.tsx
resources/js/Pages/Enumerator/Pariwisata/AnnualData.tsx
resources/js/Pages/Enumerator/Pariwisata/Survey.tsx

resources/js/Pages/Enumerator/PariwisataPackages/Index.tsx
resources/js/Pages/Enumerator/PariwisataPackages/Create.tsx
resources/js/Pages/Enumerator/PariwisataPackages/Edit.tsx

resources/js/Pages/Enumerator/AnnualData/Turnovers.tsx
resources/js/Pages/Enumerator/AnnualData/Visitors.tsx
resources/js/Pages/Enumerator/AnnualData/WorkerStats.tsx
resources/js/Pages/Enumerator/AnnualData/WorkerTrainings.tsx

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

        Route::get('villages/{village}/impact-data', [AdminVillageImpactDataController::class, 'show'])->name('villages.impact-data.show');
        Route::post('villages/{village}/population-stats', [AdminVillagePopulationStatController::class, 'store'])->name('villages.population-stats.store');
        Route::post('villages/{village}/vulnerable-groups', [AdminVillageVulnerableGroupAnnualController::class, 'store'])->name('villages.vulnerable-groups.store');
        Route::post('villages/{village}/active-groups', [AdminVillageActiveGroupAnnualController::class, 'store'])->name('villages.active-groups.store');

        Route::resource('vulnerable-group-categories', AdminVulnerableGroupCategoryController::class);
        Route::resource('active-group-categories', AdminActiveGroupCategoryController::class);

        Route::resource('umkms', AdminUmkmController::class);
        Route::get('umkms/{umkm}/annual-data', [AdminUmkmAnnualDataController::class, 'show'])->name('umkms.annual-data.show');
        Route::get('umkms/{umkm}/assessment', [AdminUmkmAssessmentController::class, 'show'])->name('umkms.assessment.show');

        Route::resource('pariwisata', AdminPariwisataController::class);
        Route::get('pariwisata/{pariwisata}/annual-data', [AdminPariwisataAnnualDataController::class, 'show'])->name('pariwisata.annual-data.show');
        Route::resource('pariwisata-packages', AdminPariwisataPackageController::class);

        Route::resource('annual-turnovers', AdminAnnualTurnoverController::class);
        Route::resource('pariwisata-annual-visitors', AdminPariwisataAnnualVisitorController::class);
        Route::resource('pariwisata-visitor-type-annuals', AdminPariwisataVisitorTypeAnnualController::class);
        Route::resource('annual-worker-stats', AdminAnnualWorkerStatController::class);
        Route::resource('annual-worker-training-stats', AdminAnnualWorkerTrainingStatController::class);

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
        Route::get('/villages/{village}/impact-data', [EnumeratorVillageImpactDataController::class, 'show'])->name('villages.impact-data.show');
        Route::post('/villages/{village}/population-stats', [EnumeratorVillagePopulationStatController::class, 'store'])->name('villages.population-stats.store');
        Route::post('/villages/{village}/vulnerable-groups', [EnumeratorVillageVulnerableGroupAnnualController::class, 'store'])->name('villages.vulnerable-groups.store');
        Route::post('/villages/{village}/active-groups', [EnumeratorVillageActiveGroupAnnualController::class, 'store'])->name('villages.active-groups.store');

        Route::resource('umkms', EnumeratorUmkmController::class);
        Route::get('umkms/{umkm}/annual-data', [EnumeratorUmkmAnnualDataController::class, 'show'])->name('umkms.annual-data.show');
        Route::get('umkms/{umkm}/assessment', [EnumeratorUmkmAssessmentController::class, 'edit'])->name('umkms.assessment.edit');
        Route::post('umkms/{umkm}/assessment/answers', [EnumeratorUmkmAssessmentAnswerController::class, 'store'])->name('umkms.assessment.answers.store');

        Route::resource('pariwisata', EnumeratorPariwisataController::class);
        Route::get('pariwisata/{pariwisata}/annual-data', [EnumeratorPariwisataAnnualDataController::class, 'show'])->name('pariwisata.annual-data.show');
        Route::resource('pariwisata-packages', EnumeratorPariwisataPackageController::class);

        Route::resource('annual-turnovers', EnumeratorAnnualTurnoverController::class);
        Route::resource('pariwisata-annual-visitors', EnumeratorPariwisataAnnualVisitorController::class);
        Route::resource('pariwisata-visitor-type-annuals', EnumeratorPariwisataVisitorTypeAnnualController::class);
        Route::resource('annual-worker-stats', EnumeratorAnnualWorkerStatController::class);
        Route::resource('annual-worker-training-stats', EnumeratorAnnualWorkerTrainingStatController::class);

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
8. Total omset UMKM per tahun.
9. Growth omset UMKM year-over-year.
10. Average UMKM assessment score.
11. Total destinasi wisata.
12. Total destinasi wisata by category.
13. Total paket wisata.
14. Total omset pariwisata per tahun.
15. Growth omset pariwisata year-over-year.
16. Total pengunjung pariwisata per tahun.
17. Growth pengunjung pariwisata year-over-year.
18. Distribusi jenis pengunjung pariwisata.
19. Average pariwisata survey score.
20. Total pekerja UMKM dan pariwisata per tahun.
21. Total pekerja yang mengikuti pelatihan per tahun.
22. Distribusi pekerja berdasarkan gender, usia, dan pendidikan.
23. Data masyarakat desa berdasarkan gender, pendidikan, keterampilan, dan mata pencaharian.
24. Total kelompok rentan per tahun.
25. Total kelompok aktif masyarakat per tahun.
26. Total kemitraan per tahun.
27. Total survey desa assigned.
28. Total survey desa in progress.
29. Total survey desa submitted.
30. Total survey desa reviewed.
31. Average survey desa score overall.
32. Desa dengan survey belum selesai.
33. Desa dengan annual data belum lengkap.
34. Recent survey activities.
35. Recent annual data updates.

## 22.2 Enumerator Dashboard Metrics

1. Total desa assigned.
2. Total UMKM yang dibuat.
3. Total UMKM assessment belum lengkap.
4. Total UMKM annual data belum lengkap.
5. Total destinasi wisata yang dibuat.
6. Total paket wisata yang dibuat.
7. Total pariwisata annual data belum lengkap.
8. Total survey pariwisata belum lengkap.
9. Total impact data desa belum lengkap.
10. Total survey desa assigned.
11. Total survey desa in progress.
12. Total survey desa returned.
13. Total survey desa submitted.
14. Last saved survey.
15. Pending questions per survey.

---

## 23. Security Requirements

1. Semua halaman wajib menggunakan authentication.
2. Role admin dan enumerator wajib dipisahkan.
3. Enumerator hanya dapat melihat desa yang ditugaskan.
4. Enumerator hanya dapat mengisi data UMKM pada desa yang ditugaskan.
5. Enumerator hanya dapat mengisi data destinasi wisata pada desa yang ditugaskan.
6. Enumerator hanya dapat mengisi annual data UMKM/pariwisata pada desa yang ditugaskan.
7. Enumerator hanya dapat mengisi impact data desa pada desa yang ditugaskan.
8. Enumerator hanya dapat mengisi survey desa yang ditugaskan.
9. Admin dapat melihat seluruh data.
10. Dokumen survey tidak boleh diakses publik tanpa otorisasi.
11. File upload wajib divalidasi.
12. Input form wajib divalidasi server-side.
13. Gunakan CSRF protection bawaan Laravel.
14. Gunakan policy untuk akses model penting.
15. Gunakan rate limiting untuk endpoint upload dan auth.
16. Password disimpan menggunakan hashing Laravel.
17. Soft delete digunakan untuk data penting.
18. Jangan percaya `entity_key` dari client tanpa validasi ulang di server.

---

## 24. Performance Requirements

1. List data harus menggunakan pagination.
2. Dashboard summary dapat dicache di Redis.
3. Query list desa harus mendukung search dan filter.
4. Query list UMKM harus mendukung search dan filter.
5. Query list destinasi wisata harus mendukung search dan filter kategori.
6. Query annual data harus mendukung filter tahun.
7. Query annual data harus menggunakan index pada entity, tahun, dimensi, dan kategori.
8. Query survey detail harus eager load relasi penting.
9. Upload file besar dapat diproses dengan queue jika diperlukan.
10. Tabel history harus diberi index pada assignment, answer, question, dan actor.
11. Dashboard tidak boleh melakukan query agregasi berat berulang tanpa caching.
12. Matrix pariwisata harus di-load bertahap atau dikelompokkan agar UI tetap ringan.
13. Grafik tren tahunan harus menggunakan query agregasi yang efisien dan cacheable.

---

## 25. Error Handling

Sistem harus menangani error berikut:

1. User tidak memiliki akses ke desa.
2. User tidak memiliki akses ke UMKM.
3. User tidak memiliki akses ke destinasi pariwisata.
4. User tidak memiliki akses ke annual data.
5. User tidak memiliki akses ke impact data.
6. User tidak memiliki akses ke survey.
7. Survey desa sudah reviewed dan tidak dapat diedit.
8. Pertanyaan tidak ditemukan.
9. Opsi skor tidak sesuai pertanyaan.
10. Score UMKM melebihi max score.
11. File terlalu besar.
12. Format file tidak didukung.
13. Survey desa belum lengkap saat submit.
14. Assignment survey untuk desa sudah ada.
15. Data sudah dihapus atau tidak aktif.
16. Dokumen wajib survey pariwisata belum diupload.
17. Kategori destinasi tidak valid.
18. Annual data duplicate pada tahun dan kategori yang sama.
19. Entity key tidak sesuai dengan entity type.
20. Value annual data bernilai negatif.
21. Visitor type tidak valid.
22. Dimension pekerja atau populasi desa tidak valid.
23. Kategori kelompok rentan tidak aktif.
24. Kategori kelompok aktif/kemitraan tidak aktif.

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

## 26.4 Village Impact Data

- Enumerator dapat mengisi data masyarakat desa tahunan pada desa yang ditugaskan.
- Admin dapat mengelola kategori kelompok rentan.
- Enumerator dapat mengisi jumlah kelompok rentan per tahun.
- Admin dapat mengelola kategori kelompok aktif dan kemitraan.
- Enumerator dapat mengisi jumlah kelompok aktif dan kemitraan per tahun.
- Sistem mencegah duplikasi data tahunan dengan kombinasi unique yang sama.
- Dashboard dapat menampilkan ringkasan impact data per desa dan per tahun.

## 26.5 UMKM Management

- Enumerator dapat menambah UMKM pada desa yang ditugaskan.
- Enumerator dapat mengedit UMKM pada desa yang ditugaskan.
- Admin dapat melihat semua UMKM.
- Sistem menyimpan relasi UMKM ke desa.
- Sistem dapat menampilkan daftar UMKM per desa.

## 26.6 UMKM Annual Data

- Enumerator dapat mengisi omset tahunan UMKM.
- Sistem menyimpan omset UMKM ke `annual_turnovers` dengan `entity_type = umkm`.
- Enumerator dapat mengisi data pekerja UMKM per tahun berdasarkan usia, jenis kelamin, dan pendidikan.
- Enumerator dapat mengisi jumlah pekerja UMKM yang mengikuti pelatihan per tahun.
- Sistem dapat menampilkan grafik tren omset UMKM.

## 26.7 UMKM Assessment

- Admin dapat membuat pertanyaan assessment UMKM.
- Pertanyaan assessment memiliki criteria code, criteria name, criteria weight, question weight, dan max score.
- Enumerator dapat mengisi nilai assessment UMKM.
- Sistem menghitung normalized score.
- Sistem menghitung weighted score.
- Satu UMKM hanya memiliki satu jawaban per pertanyaan assessment.

## 26.8 Pariwisata Management

- Enumerator dapat menambah destinasi wisata pada desa yang ditugaskan.
- Enumerator dapat memilih lebih dari satu kategori destinasi.
- Admin dapat melihat semua destinasi wisata.
- Sistem dapat menampilkan destinasi wisata per desa.
- Sistem dapat memfilter destinasi berdasarkan kategori.

## 26.9 Paket Wisata

- Enumerator dapat menambah paket wisata pada destinasi di desa yang ditugaskan.
- Enumerator dapat mengedit paket wisata.
- Admin dapat melihat semua paket wisata.
- Sistem dapat menampilkan paket wisata per destinasi.
- Paket dapat diaktifkan dan dinonaktifkan.

## 26.10 Pariwisata Annual Data

- Enumerator dapat mengisi omset tahunan destinasi pariwisata.
- Sistem menyimpan omset pariwisata ke `annual_turnovers` dengan `entity_type = pariwisata`.
- Enumerator dapat mengisi total pengunjung tahunan.
- Enumerator dapat mengisi jenis pengunjung tahunan.
- Enumerator dapat mengisi data pekerja pariwisata per tahun berdasarkan usia, jenis kelamin, dan pendidikan.
- Enumerator dapat mengisi jumlah pekerja pariwisata yang mengikuti pelatihan per tahun.
- Sistem dapat menampilkan grafik tren omset dan pengunjung pariwisata.

## 26.11 Pariwisata Survey

- Admin dapat membuat matrix survey pariwisata.
- Admin dapat membuat opsi harkat/peringkat untuk setiap indikator.
- Enumerator dapat memilih opsi 4, 3, 2, atau 1.
- Sistem menyimpan score dari opsi.
- Enumerator dapat mengisi notes.
- Enumerator dapat upload dokumen bukti pendukung.
- Sistem menyimpan snapshot pertanyaan dan opsi.

## 26.12 Survey Template Desa

- Admin dapat membuat template survey desa.
- Admin dapat menambah pertanyaan.
- Admin dapat mengisi aspect pada pertanyaan.
- Admin dapat menambah opsi skor per pertanyaan.
- Admin tidak dapat publish template jika pertanyaan belum punya opsi.

## 26.13 Survey Assignment Desa

- Admin dapat membuat survey assignment untuk desa.
- Satu desa hanya boleh memiliki satu survey assignment.
- Assignment menyimpan `assigned_by` dan `assigned_at`.

## 26.14 Survey Fill Desa

- Enumerator dapat memilih opsi skor.
- Sistem menyimpan score dari opsi.
- Enumerator dapat upload dokumen opsional.
- Enumerator dapat save draft.
- Survey dapat dilanjutkan enumerator lain.
- Satu pertanyaan hanya memiliki satu jawaban final per assignment.

## 26.15 Survey Submit Desa

- Survey tidak dapat submit jika pertanyaan wajib belum lengkap.
- Survey yang lengkap dapat disubmit.
- Sistem menyimpan `submitted_by` dan `submitted_at`.
- Sistem mencatat log `submitted`.

## 26.16 Survey Review Desa

- Admin dapat review survey submitted.
- Admin dapat return survey.
- Survey reviewed tidak dapat diedit enumerator.
- Semua perubahan status tercatat di log.

## 26.17 Audit Trail

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

## Milestone 4 — Village Impact Data

1. CRUD data masyarakat desa tahunan.
2. CRUD kategori kelompok rentan.
3. CRUD kelompok rentan tahunan.
4. CRUD kategori kelompok aktif dan kemitraan.
5. CRUD kelompok aktif dan kemitraan tahunan.
6. Dashboard impact data desa.

## Milestone 5 — UMKM Data

1. CRUD UMKM.
2. Form profil UMKM.
3. Filter/search UMKM.
4. Detail UMKM.
5. Dashboard summary UMKM.

## Milestone 6 — UMKM Annual Data

1. CRUD omset tahunan UMKM.
2. CRUD data pekerja tahunan UMKM.
3. CRUD data pelatihan pekerja UMKM.
4. Grafik tren omset UMKM.
5. Ringkasan pekerja UMKM.

## Milestone 7 — UMKM Assessment

1. CRUD UMKM survey questions.
2. Form assessment UMKM.
3. Save answer UMKM.
4. Calculate normalized score.
5. Calculate weighted score.
6. Display score per criteria.

## Milestone 8 — Pariwisata Data

1. CRUD destinasi wisata.
2. Multi-category destinasi.
3. Filter/search destinasi.
4. Detail destinasi.
5. CRUD paket wisata.
6. Dashboard summary destinasi.

## Milestone 9 — Pariwisata Annual Data

1. CRUD omset tahunan pariwisata.
2. CRUD total pengunjung tahunan.
3. CRUD jenis pengunjung tahunan.
4. CRUD data pekerja tahunan pariwisata.
5. CRUD data pelatihan pekerja pariwisata.
6. Grafik tren omset dan pengunjung.

## Milestone 10 — Pariwisata Survey

1. CRUD pariwisata survey questions.
2. CRUD pariwisata survey options.
3. Form survey pariwisata.
4. Save survey pariwisata answer.
5. Upload supporting documents.
6. Display score summary.

## Milestone 11 — Survey Desa Template

1. CRUD survey template.
2. CRUD survey question.
3. CRUD survey question option.
4. Publish/archive survey template.

## Milestone 12 — Survey Desa Assignment dan Fill

1. Create survey assignment.
2. Enumerator survey fill page.
3. Save answer.
4. Upload document.
5. Save draft.
6. Collaborative survey editing.

## Milestone 13 — Review dan Audit

1. Submit survey desa.
2. Review survey desa.
3. Return survey desa.
4. Assignment logs.
5. Answer histories.
6. Admin review page.

## Milestone 14 — Dashboard dan Polish

1. Admin dashboard.
2. Enumerator dashboard.
3. Annual data charts.
4. Impact data charts.
5. Filter/search.
6. UI polish.
7. Validation polish.
8. Testing.
9. Deployment preparation.

---

## 28. Future Enhancements

1. Export laporan PDF.
2. Export Excel.
3. Public profile page untuk desa wisata.
4. Public catalog destinasi wisata.
5. Public catalog UMKM.
6. Public catalog paket wisata.
7. Map-based dashboard.
8. Grafik skor per aspek.
9. Grafik skor UMKM per kriteria.
10. Grafik skor pariwisata per kategori.
11. Grafik dampak sosial-ekonomi multi-tahun.
12. Multi-period survey.
13. Offline survey support.
14. Mobile app enumerator.
15. Notification system.
16. AI summary untuk hasil survey.
17. Approval bertingkat.
18. Versioning template survey.
19. S3/MinIO storage.
20. Integration dengan Google Maps.
21. Marketplace produk UMKM.
22. Booking paket wisata.
23. Penyesuaian ERD untuk assignment survey pariwisata per destinasi atau per periode.
24. Data warehouse dan BI dashboard.
25. Import Excel untuk annual data.
26. Export impact report per desa, per program, dan per tahun.

---

## 29. Notes for Developer

1. Gunakan policy untuk semua akses desa, UMKM, destinasi, annual data, impact data, dan survey.
2. Jangan izinkan enumerator mengakses desa yang bukan assignment-nya.
3. Pastikan `village_survey_assignments.village_id` unique agar satu desa hanya memiliki satu survey utama.
4. Pastikan `survey_answers` memiliki unique index pada `village_survey_assignment_id` dan `survey_question_id`.
5. Pastikan `umkm_survey_answers` memiliki unique index pada `umkm_id` dan `umkm_assessment_question_id`.
6. Pastikan `pariwisata_survey_answers` mengikuti unique index sesuai ERD saat ini.
7. Pastikan `annual_turnovers` menggunakan `entity_key` yang dibuat di server, bukan dipercaya langsung dari input client.
8. Pastikan validasi `entity_type`, `umkm_id`, `pariwisata_id`, dan `entity_key` konsisten.
9. Pastikan semua data tahunan memiliki validasi duplicate sesuai unique index.
10. Simpan snapshot jawaban untuk menjaga histori.
11. Simpan history jawaban survey desa setiap create/update.
12. Simpan assignment log setiap perubahan status survey desa.
13. Gunakan transaction saat menyimpan jawaban dan history.
14. Gunakan transaction saat submit survey desa.
15. Gunakan service khusus untuk scoring survey desa, scoring UMKM, scoring pariwisata, annual data, dan impact data.
16. Gunakan Redis cache untuk dashboard jika query mulai berat.
17. Untuk survey pariwisata, perhatikan bahwa ERD saat ini belum memiliki assignment atau relasi langsung ke destinasi pada table jawaban. Jika kebutuhan berubah menjadi survey per destinasi/periode, struktur database perlu diperluas.
18. Nama table `pariwisata_suvey_options` mengikuti ERD saat ini. Jika memungkinkan sebelum migrasi production, pertimbangkan koreksi typo menjadi `pariwisata_survey_options` agar konsisten.
19. Hindari table legacy `turnover_umkm_annuals`, `turnover_pariwisata_annuals`, dan `visitor_pariwisata_annuals` jika sudah menggunakan rancangan baru `annual_turnovers` dan `pariwisata_annual_visitors`.
20. Untuk kategori custom seperti skill, livelihood, kelompok aktif, dan kemitraan, sediakan autocomplete agar data tidak terlalu bervariasi akibat typo.
