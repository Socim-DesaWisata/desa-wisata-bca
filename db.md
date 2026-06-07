// ======================================================
// ENUMS - USER & MASTER DATA
// ======================================================

Enum user_role {
  admin
  enumerator
}

Enum user_status {
  active
  inactive
}

Enum program_status {
  active
  inactive
  archived
}

Enum village_status {
  draft
  in_progress
  completed
  archived
}

Enum media_type {
  image
  video
  document
}


// ======================================================
// ENUMS - SURVEY
// ======================================================

Enum survey_template_status {
  draft
  published
  archived
}

Enum survey_assignment_status {
  assigned
  in_progress
  submitted
  reviewed
  returned
}

Enum survey_assignment_log_action {
  assigned
  started
  saved_draft
  submitted
  reviewed
  returned
  status_changed
}

Enum survey_answer_log_action {
  created
  updated
  document_uploaded
  document_deleted
}

Enum survey_question_type {
  desa
  wisata
}


// ======================================================
// ENUMS - PARIWISATA
// ======================================================

Enum pariwisata_category_type {
  wisata_alam
  wisata_buatan
  wisata_religi
  wisata_budaya
  wisata_kuliner
  wisata_edukasi
}

Enum pariwisata_survey_input_type {
  single_choice
  multiple_choice
  text
  textarea
  number
  file
}

Enum pariwisata_survey_score_level {
  terpenuhi_sepenuhnya
  sebagian_terpenuhi
  kurang_terpenuhi
  tidak_terpenuhi
}


// ======================================================
// USERS
// ======================================================
// Menyimpan akun admin dan enumerator.

Table users {
  id bigint [pk, increment]

  name varchar(150) [not null]
  email varchar(150) [not null, unique]
  password varchar(255) [not null]

  role user_role [not null]
  status user_status [not null, default: 'active']

  phone varchar(30)
  avatar_path varchar(255)

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
}


// ======================================================
// CSR PROGRAMS
// ======================================================
// Menyimpan program CSR, misalnya program Desa Wisata BCA per tahun.

Table csr_programs {
  id bigint [pk, increment]

  name varchar(150) [not null]
  sponsor_name varchar(150) [not null, default: 'BCA']
  description text
  year int

  status program_status [not null, default: 'active']
  created_by bigint [not null]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
}

// Relasi banyak-ke-banyak antara program CSR dan desa wisata.
// Satu program dapat memiliki banyak desa.
// Satu desa dapat ikut lebih dari satu program/tahun.

Table program_villages {
  id bigint [pk, increment]

  program_id bigint [not null]
  village_id bigint [not null]

  joined_at date
  status program_status [not null, default: 'active']

  created_at timestamp
  updated_at timestamp

  Indexes {
    (program_id, village_id) [unique]
  }
}


// ======================================================
// TOURISM VILLAGES
// ======================================================
// Master data desa wisata.

Table tourism_villages {
  id bigint [pk, increment]

  code varchar(50) [not null, unique]
  name varchar(150) [not null]
  slug varchar(180) [not null, unique]
  description text

  province varchar(100)
  city varchar(100)
  district varchar(100)
  subdistrict varchar(100)
  address text
  postal_code varchar(20)

  latitude decimal(10,7)
  longitude decimal(10,7)
  maps_url text

  manager_name varchar(150)
  manager_phone varchar(30)
  manager_email varchar(150)

  status village_status [not null, default: 'draft']
  created_by bigint [not null]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
}

// Menyimpan assignment enumerator ke desa.
// Enumerator yang ditugaskan ke desa dapat melakukan input profil,
// survey desa, UMKM, dan pariwisata sesuai akses aplikasi.

Table village_enumerator_assignments {
  id bigint [pk, increment]

  village_id bigint [not null]
  enumerator_id bigint [not null]
  assigned_by bigint [not null]

  is_active boolean [not null, default: true]
  assigned_at timestamp

  created_at timestamp
  updated_at timestamp

  Indexes {
    (village_id, enumerator_id) [unique]
  }
}

// Media umum untuk desa wisata.
// Digunakan untuk foto cover, galeri, video, atau dokumen desa.

Table village_media {
  id bigint [pk, increment]

  village_id bigint [not null]
  uploaded_by bigint [not null]

  type media_type [not null]
  title varchar(150)
  caption text

  file_path varchar(255)
  external_url text
  mime_type varchar(100)
  file_size bigint

  is_cover boolean [not null, default: false]
  sort_order int [not null, default: 0]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
}


// ======================================================
// VILLAGE PROFILE ITEMS
// ======================================================
// Modul profil tambahan desa wisata.
// Dapat digunakan untuk amenitas, atraksi, fasilitas, produk unggulan,
// budaya, kuliner, homestay, atau item profil lain.

Table village_profile_item_categories {
  id bigint [pk, increment]

  name varchar(100) [not null]
  slug varchar(100) [not null, unique]
  description text

  is_active boolean [not null, default: true]
  sort_order int [not null, default: 0]

  created_at timestamp
  updated_at timestamp
}

Table village_profile_items {
  id bigint [pk, increment]

  village_id bigint [not null]
  category_id bigint [not null]
  created_by bigint [not null]

  name varchar(150) [not null]
  description text

  address text
  latitude decimal(10,7)
  longitude decimal(10,7)
  maps_url text

  price_min decimal(12,2)
  price_max decimal(12,2)
  price_text varchar(100)

  opening_hours varchar(150)
  contact_name varchar(150)
  contact_phone varchar(30)

  metadata json

  is_active boolean [not null, default: true]
  sort_order int [not null, default: 0]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (village_id, category_id)
  }
}

Table village_profile_item_media {
  id bigint [pk, increment]

  village_profile_item_id bigint [not null]
  uploaded_by bigint [not null]

  type media_type [not null]
  title varchar(150)
  caption text

  file_path varchar(255)
  external_url text
  mime_type varchar(100)
  file_size bigint

  is_cover boolean [not null, default: false]
  sort_order int [not null, default: 0]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
}


// ======================================================
// SURVEY DESA - TEMPLATE & QUESTIONS
// ======================================================
// Master template survey.
// Dalam sistem Anda, template dapat digunakan untuk:
// 1. Survey Desa
// 2. Survey UMKM
// 3. Survey Pariwisata

Table survey_templates {
  id bigint [pk, increment]

  title varchar(150) [not null]
  description text

  status survey_template_status [not null, default: 'draft']
  created_by bigint [not null]
  published_at timestamp

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
}

// Pertanyaan survey desa.
// Table ini lebih sederhana dibandingkan survey UMKM dan pariwisata.
// Cocok untuk survey desa yang berbasis aspek dan pilihan jawaban score.

Table survey_questions {
  id bigint [pk, increment]

  survey_template_id bigint [not null]

  aspect varchar(150) [not null]
  code varchar(50)
  question_text text [not null]
  document_hint text

  sort_order int [not null, default: 0]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (survey_template_id, aspect)
    (survey_template_id, code)
  }
}

// Opsi jawaban untuk survey desa.
// Contoh: Tidak Ada = 0, Ada Sebagian = 1, Ada Lengkap = 2.

Table survey_question_options {
  id bigint [pk, increment]

  survey_question_id bigint [not null]

  score decimal(6,2) [not null]
  label varchar(255) [not null]

  sort_order int [not null, default: 0]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (survey_question_id, score) [unique]
  }
}


// ======================================================
// SURVEY DESA - ASSIGNMENTS & ANSWERS
// ======================================================
// Assignment survey desa.
// Karena village_id dibuat unique, maka 1 desa hanya memiliki 1 survey desa.

Table village_survey_assignments {
  id bigint [pk, increment]

  village_id bigint [not null, unique]
  survey_template_id bigint [not null]

  status survey_assignment_status [not null, default: 'assigned']

  assigned_by bigint [not null]
  submitted_by bigint
  reviewed_by bigint

  assigned_at timestamp
  started_at timestamp
  last_saved_at timestamp
  submitted_at timestamp
  reviewed_at timestamp

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (survey_template_id)
    (status)
  }
}

// Jawaban survey desa.
// Snapshot digunakan agar data lama tetap aman jika master pertanyaan berubah.

Table survey_answers {
  id bigint [pk, increment]

  village_survey_assignment_id bigint [not null]
  survey_question_id bigint [not null]
  survey_question_option_id bigint [not null]

  score int [not null]

  aspect_snapshot varchar(150)
  question_text_snapshot text
  option_label_snapshot varchar(255)

  answered_by bigint [not null]
  last_edited_by bigint [not null]

  answered_at timestamp
  last_edited_at timestamp

  created_at timestamp
  updated_at timestamp

  Indexes {
    (village_survey_assignment_id, survey_question_id) [unique]
    (answered_by)
    (last_edited_by)
  }
}

// Dokumen pendukung jawaban survey desa.

Table survey_answer_documents {
  id bigint [pk, increment]

  survey_answer_id bigint [not null]
  uploaded_by bigint [not null]

  file_name varchar(255) [not null]
  file_path varchar(255) [not null]
  mime_type varchar(100)
  file_size bigint

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
}

// Log perubahan status assignment survey desa.
// Contoh: assigned, started, submitted, reviewed, returned.

Table village_survey_assignment_logs {
  id bigint [pk, increment]

  village_survey_assignment_id bigint [not null]
  actor_id bigint [not null]

  action survey_assignment_log_action [not null]
  from_status survey_assignment_status
  to_status survey_assignment_status

  description text
  metadata json

  created_at timestamp

  Indexes {
    (village_survey_assignment_id)
    (actor_id)
    (action)
  }
}

// Riwayat perubahan jawaban survey desa.

Table survey_answer_histories {
  id bigint [pk, increment]

  survey_answer_id bigint [not null]
  village_survey_assignment_id bigint [not null]
  survey_question_id bigint [not null]
  actor_id bigint [not null]

  action survey_answer_log_action [not null]

  old_survey_question_option_id bigint
  new_survey_question_option_id bigint

  old_score decimal(6,2)
  new_score decimal(6,2)

  old_option_label varchar(255)
  new_option_label varchar(255)

  created_at timestamp

  Indexes {
    (survey_answer_id)
    (village_survey_assignment_id)
    (survey_question_id)
    (actor_id)
  }
}


// ======================================================
// UMKM - PROFILE
// ======================================================
// Master data UMKM di desa.
// Satu desa dapat memiliki banyak UMKM.
// Isi table ini mengikuti bagian Profiling Pelaku UMKM,
// kurasi UMKM, pemasaran, sustainability, solusi perbankan,
// ekspor, dan foto produk.

Table village_umkms {
  id bigint [pk, increment]

  village_id bigint [not null]
  created_by bigint
  data_collector_id bigint

  // Identitas survey/profiling
  business_owner_name varchar(150)
  village_name varchar(150)
  collector_name varchar(150)

  // Data UMKM
  name varchar(150) [not null]
  legal_business_name varchar(180)
  established_year int
  company_website_url text
  production_address text
  product_category varchar(150)
  brand_name varchar(150)
  annual_revenue decimal(18,2)
  monthly_production_capacity varchar(150)
  current_obstacles text
  certifications text

  // Kriteria Penilaian Kurasi UMKM
  has_business_legality_and_certification string
  is_umkm_participant string
  is_production_capacity_participant string
  annual_production_capacity string
  factory_location_feasibility text

  // Pemasaran dan Penjualan
  instagram_url text
  facebook_url text
  twitter_url text
  marketing_website_url text
  ecommerce_profile_url text
  marketing_notes text

  // Keberlanjutan / Sustainability
  sustainability_notes text

  // Solusi Perbankan
  bank_name varchar(150)
  bank_account_number varchar(100)
  has_qris boolean
  qris_provider varchar(150)
  has_edc boolean
  edc_provider varchar(150)
  has_credit_card boolean
  banking_notes text

  // Ekspor
  has_exported boolean
  export_destination_countries text

  // Foto Produk
  product_photo_path varchar(255)

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (village_id)
    (name)
    (business_owner_name)
    (product_category)
    (has_exported)
  }
}


// ======================================================
// UMKM - SURVEY
// ======================================================
// Table ini menyimpan master pertanyaan assessment UMKM.
// Acuan form UMKM:
// - Kelompok kriteria: A, B, C, dst.
// - Contoh A = Kualitas Produk.
// - Setiap kelompok memiliki bobot total, contoh Kualitas Produk = 25%.
// - Setiap pertanyaan memiliki bobot sendiri, contoh 10%, 8%, 3%, 4%.

Table umkm_survey_questions {
  id bigint [pk, increment]

  survey_template_id bigint [not null]

  // Kode kelompok kriteria.
  // Contoh: A, B, C.
  criteria_code varchar(10) [not null]

  // Nama kelompok kriteria.
  // Contoh: Kualitas Produk, Kapasitas Produksi.
  criteria_name varchar(150) [not null]

  // Bobot total kelompok kriteria.
  // Contoh: Kualitas Produk = 25.
  criteria_weight_percent decimal(6,2) [not null]

  // Nomor pertanyaan di dalam kriteria.
  // Contoh: 1, 2, 3, 4.
  question_number int [not null]

  // Teks pertanyaan assessment UMKM.
  question_text text [not null]

  // Bobot pertanyaan.
  // Contoh: Standar kualitas = 10, Konsistensi = 8.
  question_weight_percent decimal(6,2) [not null]

  // Nilai maksimal.
  // Jika skala 1-4, maka max_score = 4.
  max_score decimal(6,2) [not null, default: 4.00]

  // Panduan penilaian untuk enumerator.
  help_text text

  // Urutan tampil pertanyaan.
  sort_order int [not null, default: 0]

  // Status aktif pertanyaan.
  is_active boolean [not null, default: true]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (survey_template_id)
    (criteria_code)
    (criteria_code, question_number)
    (survey_template_id, criteria_code, question_number) [unique]
  }
}

// Table ini menyimpan jawaban/nilai assessment UMKM.
// Kolom score berasal dari nilai yang diisi enumerator.
// normalized_score dan weighted_score digunakan untuk perhitungan nilai akhir.

Table umkm_survey_answers {
  id bigint [pk, increment]

  // UMKM yang dinilai.
  umkm_id bigint [not null]

  // Pertanyaan UMKM yang dijawab.
  // Relasi ke umkm_survey_questions.id.
  umkm_assessment_question_id bigint [not null]

  // Enumerator yang mengisi.
  answered_by bigint [not null]

  // Nilai yang diisi enumerator.
  score decimal(6,2) [not null]

  // Snapshot kriteria saat jawaban dibuat.
  criteria_code_snapshot varchar(10)
  criteria_name_snapshot varchar(150)
  criteria_weight_percent_snapshot decimal(6,2)

  // Snapshot pertanyaan dan bobot saat jawaban dibuat.
  question_text_snapshot text
  question_weight_percent_snapshot decimal(6,2)
  max_score_snapshot decimal(6,2)

  // Hasil perhitungan.
  // Rekomendasi formula:
  // normalized_score = score / max_score_snapshot
  // weighted_score = normalized_score * question_weight_percent_snapshot
  normalized_score decimal(8,4)
  weighted_score decimal(8,4)

  answered_at timestamp
  last_edited_at timestamp

  created_at timestamp
  updated_at timestamp

  Indexes {
    (umkm_id)
    (umkm_assessment_question_id)
    (answered_by)
    (umkm_id, umkm_assessment_question_id) [unique]
  }
}


// ======================================================
// PARIWISATA - DESTINASI
// ======================================================
// Master data destinasi wisata di dalam desa.
// Satu desa dapat memiliki banyak destinasi wisata.

Table pariwisata_village_table {
  id bigint [pk, increment]

  village_id bigint [not null]

  // Nama Destinasi Wisata.
  name varchar(150) [not null]

  // Waktu operasional.
  operational_days varchar(150)
  operational_hours varchar(150)
  operational_schedule json

  // Tiket masuk.
  entrance_ticket_price decimal(12,2)
  entrance_ticket_description varchar(150)

  // Alamat destinasi wisata.
  address text

  // Penanggung jawab destinasi.
  person_in_charge_name varchar(150)
  person_in_charge_phone varchar(30)
  person_in_charge_address text

  is_active boolean [not null, default: true]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (village_id)
    (name)
    (is_active)
  }
}

// Kategori destinasi wisata.
// Karena satu destinasi bisa memiliki lebih dari satu kategori,
// table ini menjadi pivot kategori.

Table pariwisata_village_category {
  id bigint [pk, increment]

  pariwisata_village_id bigint [not null]
  category pariwisata_category_type

  created_at timestamp
  updated_at timestamp
}


// ======================================================
// PARIWISATA - SURVEY QUESTIONS
// ======================================================
// Table ini menyimpan matrix penilaian sertifikasi desa wisata.
// Mapping dari matrix:
// - KATEGORI A. PENGELOLAAN BERKELANJUTAN -> category_code, category_name
// - A.a Struktur dan kerangka Pengelolaan -> sub_category_code, sub_category_name
// - A.1 Tanggungjawab pengelolaan desa wisata -> criteria_code, criteria_name
// - Kolom KRITERIA panjang -> criteria_description
// - A.1.a Struktur dan tanggungjawab kelompok -> indicator_code, indicator_name
// - Kolom INDIKATOR -> indicator_description
// - Kolom BUKTI PENDUKUNG -> supporting_evidence

Table pariwisata_survey_questions {
  id bigint [pk, increment]

  survey_template_id bigint [not null]

  // Kategori besar.
  // Contoh: A.
  category_code varchar(20)

  // Nama kategori besar.
  // Contoh: Kategori A. Pengelolaan Berkelanjutan.
  category_name varchar(255)

  // Kode sub kategori.
  // Contoh: A.a.
  sub_category_code varchar(20)

  // Nama sub kategori.
  // Contoh: Struktur dan kerangka Pengelolaan.
  sub_category_name varchar(255)

  // Kode kriteria.
  // Contoh: A.1.
  criteria_code varchar(20)

  // Nama kriteria.
  // Contoh: Tanggungjawab pengelolaan desa wisata.
  criteria_name varchar(255)

  // Deskripsi panjang kriteria.
  criteria_description text

  // Kode indikator.
  // Contoh: A.1.a.
  indicator_code varchar(20) [not null]

  // Nama indikator.
  // Contoh: Struktur dan tanggungjawab kelompok.
  indicator_name varchar(255) [not null]

  // Deskripsi indikator.
  indicator_description text

  // Bukti pendukung yang harus diperiksa/dilampirkan.
  // Contoh: SK pengangkatan, forum organisasi, dokumen rencana kerja.
  supporting_evidence text

  // Tipe input.
  // Untuk matrix harkat/peringkat, default-nya single_choice.
  input_type pariwisata_survey_input_type [not null, default: 'single_choice']

  // Apakah jawaban wajib melampirkan dokumen.
  document_required boolean [not null, default: false]

  // Petunjuk dokumen yang harus diupload.
  document_hint text

  sort_order int [not null, default: 0]
  is_active boolean [not null, default: true]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (survey_template_id)
    (category_code)
    (sub_category_code)
    (criteria_code)
    (indicator_code)
    (survey_template_id, indicator_code) [unique]
  }
}

// Table opsi jawaban pariwisata.
// Catatan: nama table tetap "pariwisata_suvey_options" sesuai rancangan Anda.
// Mapping dari matrix HARKAT & PERINGKAT:
// 4 = Terpenuhi Sepenuhnya
// 3 = Sebagian Terpenuhi
// 2 = Kurang Terpenuhi
// 1 = Tidak Terpenuhi

Table pariwisata_suvey_options {
  id bigint [pk, increment]

  pariwisata_survey_question_id bigint [not null]

  // Nilai harkat/peringkat.
  score int [not null]

  // Level enum dari score.
  level pariwisata_survey_score_level [not null]

  // Label tampilan.
  label varchar(100) [not null]

  // Deskripsi detail dari kondisi penilaian.
  description text [not null]

  sort_order int [not null, default: 0]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (pariwisata_survey_question_id)
    (pariwisata_survey_question_id, score) [unique]
  }
}

// Table jawaban survey pariwisata.
// Enumerator memilih salah satu opsi harkat/peringkat.
// Kolom notes mewakili kolom "Keterangan & Nilai" pada matrix.

Table pariwisata_survey_answers {
  id bigint [pk, increment]

  pariwisata_survey_question_id bigint [not null]
  pariwisata_suvey_option_id bigint [not null]

  // Nilai akhir dari opsi yang dipilih.
  score int [not null]

  // Catatan/keterangan penilaian.
  notes text

  // Snapshot kategori.
  category_code_snapshot varchar(20)
  category_name_snapshot varchar(255)

  // Snapshot sub kategori.
  sub_category_code_snapshot varchar(20)
  sub_category_name_snapshot varchar(255)

  // Snapshot kriteria.
  criteria_code_snapshot varchar(20)
  criteria_name_snapshot varchar(255)
  criteria_description_snapshot text

  // Snapshot indikator.
  indicator_code_snapshot varchar(20)
  indicator_name_snapshot varchar(255)
  indicator_description_snapshot text

  // Snapshot bukti pendukung.
  supporting_evidence_snapshot text

  // Snapshot opsi yang dipilih.
  option_label_snapshot varchar(100)
  option_description_snapshot text

  // User/enumerator yang menjawab.
  answered_by bigint [not null]

  // User terakhir yang mengedit.
  last_edited_by bigint

  answered_at timestamp
  last_edited_at timestamp

  created_at timestamp
  updated_at timestamp

  Indexes {
    (pariwisata_survey_question_id)
    (pariwisata_suvey_option_id)
    (answered_by)
    (pariwisata_survey_question_id) [unique]
  }
}

// Dokumen bukti pendukung jawaban survey pariwisata.
// Contoh: SK, foto kegiatan, dokumen struktur organisasi,
// rencana kerja, bukti forum, dan dokumen lain sesuai supporting_evidence.

Table pariwisata_survey_answer_documents {
  id bigint [pk, increment]

  pariwisata_survey_answer_id bigint [not null]
  uploaded_by bigint [not null]

  file_name varchar(255) [not null]
  file_path varchar(255) [not null]
  mime_type varchar(100)
  file_size bigint

  caption text

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (pariwisata_survey_answer_id)
    (uploaded_by)
  }
}


Table turnover_umkm_annuals{ 
  id int  
  umkm_id bigint
  year int  
  value int 
  created_at timestamp
  updated_at timestamp

}

// ======================================================
// ENUMS - ANNUAL DATA & IMPACT DATA
// ======================================================

Enum annual_turnover_entity_type {
  umkm
  pariwisata
}

Enum annual_worker_entity_type {
  umkm
  pariwisata
}

Enum worker_stat_dimension {
  age
  gender
  education
}

Enum pariwisata_visitor_type {
  lokal
  domestik
  mancanegara
  pelajar
  komunitas
}

Enum village_population_dimension {
  gender
  education
  skill
  livelihood
}

Enum active_group_category_type {
  community_group
  partnership
}


// ======================================================
// ANNUAL TURNOVER - UMKM & PARIWISATA
// ======================================================
// Table ini menyimpan omset tahunan untuk UMKM dan Pariwisata.
// Dipakai untuk menggantikan table terpisah:
// - turnover_umkm_annuals
// - turnover_pariwisata_annuals
//
// Contoh:
// entity_type = umkm, entity_key = "umkm:1", year = 2022, value = 120000000
// entity_type = pariwisata, entity_key = "pariwisata:5", year = 2022, value = 350000000

Table annual_turnovers {
  id bigint [pk, increment]

  entity_type annual_turnover_entity_type [not null]

  // Isi salah satu sesuai entity_type.
  // Jika entity_type = umkm, maka umkm_id wajib diisi.
  // Jika entity_type = pariwisata, maka pariwisata_id wajib diisi.
  umkm_id bigint
  pariwisata_id bigint

  // Key unik untuk memudahkan validasi unique di MySQL.
  // Contoh:
  // umkm:1
  // pariwisata:5
  entity_key varchar(100) [not null]

  year int [not null]
  value decimal(18,2) [not null] // Omset dalam Rupiah

  notes text

  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (entity_type)
    (entity_key)
    (umkm_id)
    (pariwisata_id)
    (year)
    (entity_key, year) [unique]
  }
}


// ======================================================
// PARIWISATA - ANNUAL VISITORS
// ======================================================
// Table ini menyimpan total pengunjung tahunan untuk satu destinasi pariwisata.
// Contoh:
// pariwisata_id = 5, year = 2022, value = 25000

Table pariwisata_annual_visitors {
  id bigint [pk, increment]

  pariwisata_id bigint [not null]

  year int [not null]
  value int [not null] // Total pengunjung dalam satu tahun

  notes text

  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (pariwisata_id)
    (year)
    (pariwisata_id, year) [unique]
  }
}


// ======================================================
// PARIWISATA - ANNUAL VISITOR TYPES
// ======================================================
// Table ini menyimpan jumlah pengunjung tahunan berdasarkan jenis pengunjung.
// Contoh:
// 2022, lokal, 1000
// 2022, domestik, 500
// 2022, mancanegara, 120
// 2022, pelajar, 300
// 2022, komunitas, 50

Table pariwisata_visitor_type_annuals {
  id bigint [pk, increment]

  pariwisata_id bigint [not null]

  year int [not null]
  visitor_type pariwisata_visitor_type [not null]
  value int [not null] // Jumlah pengunjung berdasarkan jenis

  notes text

  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (pariwisata_id)
    (year)
    (visitor_type)
    (pariwisata_id, year, visitor_type) [unique]
  }
}


// ======================================================
// PARIWISATA - PACKAGES
// ======================================================
// Table ini menyimpan paket wisata yang dimiliki oleh destinasi pariwisata.
// Contoh:
// Nama Paket: Paket Edukasi Membatik
// Jenis Paket: Edukasi
// Durasi: 3 jam
// Fasilitas: Mentor, alat batik, snack, dokumentasi

Table pariwisata_packages {
  id bigint [pk, increment]

  pariwisata_id bigint [not null]

  name varchar(150) [not null] // Nama paket wisata
  package_type varchar(100) // Jenis paket
  duration varchar(100) // Durasi paket
  facilities text // Fasilitas yang didapat

  description text
  price decimal(12,2)

  is_active boolean [not null, default: true]

  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (pariwisata_id)
    (name)
    (package_type)
    (is_active)
  }
}


// ======================================================
// ANNUAL WORKER STATS - UMKM & PARIWISATA
// ======================================================
// Table ini menyimpan data pekerja tahunan untuk UMKM dan Pariwisata.
// Dimensi yang didukung:
// - age
// - gender
// - education
//
// Contoh input:
// 2022, 22 tahun, 100 orang
// 2022, lelaki, 80 orang
// 2022, S1, 25 orang

Table annual_worker_stats {
  id bigint [pk, increment]

  entity_type annual_worker_entity_type [not null]

  // Isi salah satu sesuai entity_type.
  umkm_id bigint
  pariwisata_id bigint

  // Key unik untuk memudahkan validasi unique di MySQL.
  // Contoh:
  // umkm:1
  // pariwisata:5
  entity_key varchar(100) [not null]

  year int [not null]

  // age / gender / education
  dimension worker_stat_dimension [not null]

  // Contoh:
  // Jika dimension = age, category_value = "22 tahun"
  // Jika dimension = gender, category_value = "lelaki"
  // Jika dimension = education, category_value = "S1"
  category_value varchar(150) [not null]

  total_people int [not null]

  notes text

  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (entity_type)
    (entity_key)
    (umkm_id)
    (pariwisata_id)
    (year)
    (dimension)
    (category_value)
    (entity_key, year, dimension, category_value) [unique]
  }
}


// ======================================================
// ANNUAL WORKER TRAINING STATS - UMKM & PARIWISATA
// ======================================================
// Table ini menyimpan jumlah pekerja yang ikut pelatihan per tahun.
// Contoh:
// 2022, 35 orang
// 2023, 50 orang

Table annual_worker_training_stats {
  id bigint [pk, increment]

  entity_type annual_worker_entity_type [not null]

  // Isi salah satu sesuai entity_type.
  umkm_id bigint
  pariwisata_id bigint

  // Contoh:
  // umkm:1
  // pariwisata:5
  entity_key varchar(100) [not null]

  year int [not null]

  // Optional jika nanti ingin mencatat nama pelatihan.
  training_name varchar(150)

  total_people int [not null]

  notes text

  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (entity_type)
    (entity_key)
    (umkm_id)
    (pariwisata_id)
    (year)
    (training_name)
  }
}


// ======================================================
// VILLAGE - ANNUAL POPULATION STATS
// ======================================================
// Table ini menyimpan data masyarakat desa per tahun.
// Dimensi yang didukung:
// - gender
// - education
// - skill
// - livelihood
//
// Contoh:
// 2022, gender, pria, 50
// 2022, education, S2, 20
// 2022, skill, pemandu wisata, 15
// 2022, livelihood, petani, 200

Table village_annual_population_stats {
  id bigint [pk, increment]

  village_id bigint [not null]

  year int [not null]

  // gender / education / skill / livelihood
  dimension village_population_dimension [not null]

  // Untuk skill dan livelihood, value bisa custom.
  // Contoh:
  // pria, wanita, SD, SMP, SMA, S1, S2,
  // pemandu wisata, membatik, digital marketing,
  // petani, nelayan, pedagang, pengrajin
  category_value varchar(150) [not null]

  total_people int [not null]

  notes text

  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (village_id)
    (year)
    (dimension)
    (category_value)
    (village_id, year, dimension, category_value) [unique]
  }
}



Table village_vulnerable_group_annuals {
  id bigint [pk, increment]

  village_id bigint [not null]
  vulnerable_category string

  year int [not null]
  total_people int [not null]

  notes text

  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (village_id)
    (year)
    (village_id, year) [unique]
  }
}




Table village_active_group_annuals {
  id bigint [pk, increment]

  village_id bigint [not null]
  active_category string 

  year int [not null]
  value int [not null]

  notes text

  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  Indexes {
    (village_id)
    (year)
    (village_id, year) [unique]
  }
}


// ======================================================
// REFS - ANNUAL TURNOVER
// ======================================================

Ref: annual_turnovers.umkm_id > village_umkms.id
Ref: annual_turnovers.pariwisata_id > pariwisata_village_table.id
Ref: annual_turnovers.created_by > users.id


// ======================================================
// REFS - PARIWISATA ANNUAL DATA
// ======================================================

Ref: pariwisata_annual_visitors.pariwisata_id > pariwisata_village_table.id
Ref: pariwisata_annual_visitors.created_by > users.id

Ref: pariwisata_visitor_type_annuals.pariwisata_id > pariwisata_village_table.id
Ref: pariwisata_visitor_type_annuals.created_by > users.id

Ref: pariwisata_packages.pariwisata_id > pariwisata_village_table.id
Ref: pariwisata_packages.created_by > users.id


// ======================================================
// REFS - WORKER STATS
// ======================================================

Ref: annual_worker_stats.umkm_id > village_umkms.id
Ref: annual_worker_stats.pariwisata_id > pariwisata_village_table.id
Ref: annual_worker_stats.created_by > users.id

Ref: annual_worker_training_stats.umkm_id > village_umkms.id
Ref: annual_worker_training_stats.pariwisata_id > pariwisata_village_table.id
Ref: annual_worker_training_stats.created_by > users.id


// ======================================================
// REFS - VILLAGE ANNUAL DATA
// ======================================================

Ref: village_annual_population_stats.village_id > tourism_villages.id
Ref: village_annual_population_stats.created_by > users.id

Ref: village_vulnerable_group_annuals.village_id > tourism_villages.id
Ref: village_vulnerable_group_annuals.created_by > users.id

Ref: village_active_group_annuals.village_id > tourism_villages.id
Ref: village_active_group_annuals.created_by > users.id


// ======================================================
// REFS - USERS & PROGRAMS
// ======================================================

Ref: csr_programs.created_by > users.id

Ref: program_villages.program_id > csr_programs.id
Ref: program_villages.village_id > tourism_villages.id


// ======================================================
// REFS - TOURISM VILLAGES
// ======================================================

Ref: tourism_villages.created_by > users.id

Ref: village_enumerator_assignments.village_id > tourism_villages.id
Ref: village_enumerator_assignments.enumerator_id > users.id
Ref: village_enumerator_assignments.assigned_by > users.id

Ref: village_media.village_id > tourism_villages.id
Ref: village_media.uploaded_by > users.id


// ======================================================
// REFS - VILLAGE PROFILE ITEMS
// ======================================================

Ref: village_profile_items.village_id > tourism_villages.id
Ref: village_profile_items.category_id > village_profile_item_categories.id
Ref: village_profile_items.created_by > users.id

Ref: village_profile_item_media.village_profile_item_id > village_profile_items.id
Ref: village_profile_item_media.uploaded_by > users.id


// ======================================================
// REFS - SURVEY DESA
// ======================================================

Ref: survey_templates.created_by > users.id

Ref: survey_questions.survey_template_id > survey_templates.id

Ref: survey_question_options.survey_question_id > survey_questions.id

Ref: village_survey_assignments.village_id > tourism_villages.id
Ref: village_survey_assignments.survey_template_id > survey_templates.id
Ref: village_survey_assignments.assigned_by > users.id
Ref: village_survey_assignments.submitted_by > users.id
Ref: village_survey_assignments.reviewed_by > users.id

Ref: survey_answers.village_survey_assignment_id > village_survey_assignments.id
Ref: survey_answers.survey_question_id > survey_questions.id
Ref: survey_answers.survey_question_option_id > survey_question_options.id
Ref: survey_answers.answered_by > users.id
Ref: survey_answers.last_edited_by > users.id

Ref: survey_answer_documents.survey_answer_id > survey_answers.id
Ref: survey_answer_documents.uploaded_by > users.id

Ref: village_survey_assignment_logs.village_survey_assignment_id > village_survey_assignments.id
Ref: village_survey_assignment_logs.actor_id > users.id

Ref: survey_answer_histories.survey_answer_id > survey_answers.id
Ref: survey_answer_histories.village_survey_assignment_id > village_survey_assignments.id
Ref: survey_answer_histories.survey_question_id > survey_questions.id
Ref: survey_answer_histories.actor_id > users.id
Ref: survey_answer_histories.old_survey_question_option_id > survey_question_options.id
Ref: survey_answer_histories.new_survey_question_option_id > survey_question_options.id


// ======================================================
// REFS - UMKM
// ======================================================

Ref: village_umkms.village_id > tourism_villages.id
Ref: village_umkms.created_by > users.id
Ref: village_umkms.data_collector_id > users.id

Ref: umkm_survey_questions.survey_template_id > survey_templates.id

Ref: umkm_survey_answers.umkm_id > village_umkms.id
Ref: umkm_survey_answers.umkm_assessment_question_id > umkm_survey_questions.id
Ref: umkm_survey_answers.answered_by > users.id


// ======================================================
// REFS - PARIWISATA
// ======================================================

Ref: pariwisata_village_table.village_id > tourism_villages.id

Ref: pariwisata_village_category.pariwisata_village_id > pariwisata_village_table.id

Ref: pariwisata_survey_questions.survey_template_id > survey_templates.id

Ref: pariwisata_suvey_options.pariwisata_survey_question_id > pariwisata_survey_questions.id

Ref: pariwisata_survey_answers.pariwisata_survey_question_id > pariwisata_survey_questions.id
Ref: pariwisata_survey_answers.pariwisata_suvey_option_id > pariwisata_suvey_options.id
Ref: pariwisata_survey_answers.answered_by > users.id
Ref: pariwisata_survey_answers.last_edited_by > users.id

Ref: pariwisata_survey_answer_documents.pariwisata_survey_answer_id > pariwisata_survey_answers.id
Ref: pariwisata_survey_answer_documents.uploaded_by > users.id