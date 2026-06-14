// DBML generated from uploaded Laravel/SQLite schema markdown
// Relationships are written inline beside FK columns for dbdiagram.io
// Import this file at https://dbdiagram.io

Table annual_turnovers {
  id integer [pk, increment, not null]
  entity_type varchar [not null]
  umkm_id integer [ref: > village_umkms.id] // delete: set null, update: no action
  pariwisata_id integer [ref: > pariwisata_village_table.id] // delete: set null, update: no action
  entity_key varchar [not null]
  year integer [not null]
  value numeric [not null]
  notes text
  created_by integer [ref: > users.id] // delete: set null, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (entity_key, year) [unique, name: 'annual_turnovers_entity_year_unique']
    year [name: 'annual_turnovers_year_index']
    pariwisata_id [name: 'annual_turnovers_pariwisata_id_index']
    umkm_id [name: 'annual_turnovers_umkm_id_index']
    entity_key [name: 'annual_turnovers_entity_key_index']
    entity_type [name: 'annual_turnovers_entity_type_index']
  }
}

Table annual_worker_stats {
  id integer [pk, increment, not null]
  entity_type varchar [not null]
  umkm_id integer [ref: > village_umkms.id] // delete: set null, update: no action
  pariwisata_id integer [ref: > pariwisata_village_table.id] // delete: set null, update: no action
  entity_key varchar [not null]
  year integer [not null]
  dimension varchar [not null]
  category_value varchar [not null]
  total_people integer [not null]
  notes text
  created_by integer [ref: > users.id] // delete: set null, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (entity_key, year, dimension, category_value) [unique, name: 'annual_worker_stats_unique']
    category_value [name: 'annual_worker_stats_category_value_index']
    dimension [name: 'annual_worker_stats_dimension_index']
    year [name: 'annual_worker_stats_year_index']
    pariwisata_id [name: 'annual_worker_stats_pariwisata_id_index']
    umkm_id [name: 'annual_worker_stats_umkm_id_index']
    entity_key [name: 'annual_worker_stats_entity_key_index']
    entity_type [name: 'annual_worker_stats_entity_type_index']
  }
}

Table annual_worker_training_stats {
  id integer [pk, increment, not null]
  entity_type varchar [not null]
  umkm_id integer [ref: > village_umkms.id] // delete: set null, update: no action
  pariwisata_id integer [ref: > pariwisata_village_table.id] // delete: set null, update: no action
  entity_key varchar [not null]
  year integer [not null]
  training_name varchar
  total_people integer [not null]
  notes text
  created_by integer [ref: > users.id] // delete: set null, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    training_name [name: 'annual_worker_training_stats_training_name_index']
    year [name: 'annual_worker_training_stats_year_index']
    pariwisata_id [name: 'annual_worker_training_stats_pariwisata_id_index']
    umkm_id [name: 'annual_worker_training_stats_umkm_id_index']
    entity_key [name: 'annual_worker_training_stats_entity_key_index']
    entity_type [name: 'annual_worker_training_stats_entity_type_index']
  }
}


Table csr_programs {
  id integer [pk, increment, not null]
  name varchar [not null]
  sponsor_name varchar [not null, default: 'BCA']
  description text
  year integer
  status varchar [not null, default: 'active']
  created_by integer [not null, ref: > users.id] // delete: no action, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime
}

Table pariwisata_annual_visitors {
  id integer [pk, increment, not null]
  pariwisata_id integer [not null, ref: > pariwisata_village_table.id] // delete: cascade, update: no action
  year integer [not null]
  value integer [not null]
  notes text
  created_by integer [ref: > users.id] // delete: set null, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (pariwisata_id, year) [unique, name: 'pariwisata_visitors_year_unique']
    year [name: 'pariwisata_annual_visitors_year_index']
    pariwisata_id [name: 'pariwisata_annual_visitors_pariwisata_id_index']
  }
}

Table pariwisata_packages {
  id integer [pk, increment, not null]
  pariwisata_id integer [not null, ref: > pariwisata_village_table.id] // delete: cascade, update: no action
  name varchar [not null]
  package_type varchar
  duration varchar
  facilities text
  description text
  price numeric
  is_active boolean [not null, default: true]
  created_by integer [ref: > users.id] // delete: set null, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    is_active [name: 'pariwisata_packages_is_active_index']
    package_type [name: 'pariwisata_packages_package_type_index']
    name [name: 'pariwisata_packages_name_index']
    pariwisata_id [name: 'pariwisata_packages_pariwisata_id_index']
  }
}

Table pariwisata_survey_answer_documents {
  id integer [pk, increment, not null]
  pariwisata_survey_answer_id integer [not null, ref: > pariwisata_survey_answers.id] // delete: cascade, update: no action
  uploaded_by integer [not null, ref: > users.id] // delete: no action, update: no action
  file_name varchar [not null]
  file_path varchar [not null]
  mime_type varchar
  file_size integer
  caption text
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    uploaded_by [name: 'pariwisata_survey_answer_documents_uploaded_by_index']
    pariwisata_survey_answer_id [name: 'ps_doc_answer_idx']
  }
}

Table pariwisata_survey_answers {
  id integer [pk, increment, not null]
  village_survey_assignment_id integer [ref: > village_survey_assignments.id] // delete: cascade, update: no action
  pariwisata_survey_question_id integer [not null, ref: > pariwisata_survey_questions.id] // delete: no action, update: no action
  pariwisata_suvey_option_id integer [not null, ref: > pariwisata_suvey_options.id] // delete: no action, update: no action
  score integer [not null]
  notes text
  category_code_snapshot varchar
  category_name_snapshot varchar
  sub_category_code_snapshot varchar
  sub_category_name_snapshot varchar
  criteria_code_snapshot varchar
  criteria_name_snapshot varchar
  criteria_description_snapshot text
  indicator_code_snapshot varchar
  indicator_name_snapshot varchar
  indicator_description_snapshot text
  supporting_evidence_snapshot text
  option_label_snapshot text
  option_description_snapshot text
  answered_by integer [not null, ref: > users.id] // delete: no action, update: no action
  last_edited_by integer [ref: > users.id] // delete: set null, update: no action
  answered_at datetime
  last_edited_at datetime
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (village_survey_assignment_id, pariwisata_survey_question_id) [unique, name: 'ps_answer_village_question_unique']
    answered_by [name: 'pariwisata_survey_answers_answered_by_index']
    pariwisata_suvey_option_id [name: 'ps_answer_option_idx']
    pariwisata_survey_question_id [name: 'ps_answer_question_idx']
    village_survey_assignment_id [name: 'ps_answer_pariwisata_idx']
  }
}

Table pariwisata_survey_questions {
  id integer [pk, increment, not null]
  survey_template_id integer [not null, ref: > survey_templates.id] // delete: cascade, update: no action
  category_code varchar
  category_name varchar
  sub_category_code varchar
  sub_category_name varchar
  criteria_code varchar
  criteria_name varchar
  criteria_description text
  indicator_code varchar [not null]
  indicator_name varchar [not null]
  indicator_description text
  supporting_evidence text
  input_type varchar [not null, default: 'single_choice']
  document_required boolean [not null, default: false]
  document_hint text
  sort_order integer [not null, default: 0]
  is_active boolean [not null, default: true]
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (survey_template_id, indicator_code) [unique, name: 'pariwisata_q_template_indicator_unique']
    indicator_code [name: 'pariwisata_survey_questions_indicator_code_index']
    criteria_code [name: 'pariwisata_survey_questions_criteria_code_index']
    sub_category_code [name: 'pariwisata_survey_questions_sub_category_code_index']
    category_code [name: 'pariwisata_survey_questions_category_code_index']
    survey_template_id [name: 'pariwisata_survey_questions_survey_template_id_index']
  }
}

Table pariwisata_suvey_options {
  id integer [pk, increment, not null]
  pariwisata_survey_question_id integer [not null, ref: > pariwisata_survey_questions.id] // delete: cascade, update: no action
  score integer [not null]
  level varchar [not null]
  label varchar [not null]
  description text [not null]
  sort_order integer [not null, default: 0]
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (pariwisata_survey_question_id, score) [unique, name: 'ps_option_question_score_unique']
    pariwisata_survey_question_id [name: 'ps_option_question_idx']
  }
}

Table pariwisata_village_category {
  id integer [pk, increment, not null]
  pariwisata_village_id integer [not null, ref: > pariwisata_village_table.id] // delete: cascade, update: no action
  category varchar
  created_at datetime
  updated_at datetime
  deleted_at datetime
}

Table pariwisata_village_table {
  id integer [pk, increment, not null]
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  name varchar [not null]
  operational_days varchar
  operational_hours varchar
  operational_schedule text
  entrance_ticket_price numeric
  entrance_ticket_description varchar
  address text
  person_in_charge_name varchar
  person_in_charge_phone varchar
  person_in_charge_address text
  is_active boolean [not null, default: true]
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    is_active [name: 'pariwisata_village_table_is_active_index']
    name [name: 'pariwisata_village_table_name_index']
    village_id [name: 'pariwisata_village_table_village_id_index']
  }
}

Table pariwisata_visitor_type_annuals {
  id integer [pk, increment, not null]
  pariwisata_id integer [not null, ref: > pariwisata_village_table.id] // delete: cascade, update: no action
  year integer [not null]
  visitor_type varchar [not null]
  value integer [not null]
  notes text
  created_by integer [ref: > users.id] // delete: set null, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (pariwisata_id, year, visitor_type) [unique, name: 'pariwisata_visitor_type_unique']
    visitor_type [name: 'pariwisata_visitor_type_annuals_visitor_type_index']
    year [name: 'pariwisata_visitor_type_annuals_year_index']
    pariwisata_id [name: 'pariwisata_visitor_type_annuals_pariwisata_id_index']
  }
}


Table program_villages {
  id integer [pk, increment, not null]
  program_id integer [not null, ref: > csr_programs.id] // delete: cascade, update: no action
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  joined_at date
  status varchar [not null, default: 'active']
  created_at datetime
  updated_at datetime

  indexes {
    (program_id, village_id) [unique, name: 'program_villages_program_id_village_id_unique']
  }
}


Table survey_answer_documents {
  id integer [pk, increment, not null]
  survey_answer_id integer [not null, ref: > survey_answers.id] // delete: cascade, update: no action
  uploaded_by integer [not null, ref: > users.id] // delete: no action, update: no action
  file_name varchar [not null]
  file_path varchar [not null]
  mime_type varchar
  file_size integer
  created_at datetime
  updated_at datetime
  deleted_at datetime
}

Table survey_answer_histories {
  id integer [pk, increment, not null]
  survey_answer_id integer [not null, ref: > survey_answers.id] // delete: cascade, update: no action
  village_survey_assignment_id integer [not null, ref: > village_survey_assignments.id] // delete: cascade, update: no action
  survey_question_id integer [not null, ref: > survey_questions.id] // delete: no action, update: no action
  actor_id integer [not null, ref: > users.id] // delete: no action, update: no action
  action varchar [not null]
  old_survey_question_option_id integer [ref: > survey_question_options.id] // delete: set null, update: no action
  new_survey_question_option_id integer [ref: > survey_question_options.id] // delete: set null, update: no action
  old_score numeric
  new_score numeric
  old_option_label text
  new_option_label text
  created_at datetime
  deleted_at datetime

  indexes {
    actor_id [name: 'sah_actor_index']
    survey_question_id [name: 'sah_question_index']
    village_survey_assignment_id [name: 'sah_assignment_index']
    survey_answer_id [name: 'sah_answer_index']
  }
}

Table survey_answers {
  id integer [pk, increment, not null]
  village_survey_assignment_id integer [not null, ref: > village_survey_assignments.id] // delete: cascade, update: no action
  survey_question_id integer [not null, ref: > survey_questions.id] // delete: no action, update: no action
  survey_question_option_id integer [not null, ref: > survey_question_options.id] // delete: no action, update: no action
  score integer [not null]
  aspect_snapshot text
  question_text_snapshot text
  option_label_snapshot text
  answered_by integer [not null, ref: > users.id] // delete: no action, update: no action
  last_edited_by integer [not null, ref: > users.id] // delete: no action, update: no action
  answered_at datetime
  last_edited_at datetime
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    last_edited_by [name: 'sa_last_edited_by_index']
    answered_by [name: 'sa_answered_by_index']
    (village_survey_assignment_id, survey_question_id) [unique, name: 'sa_assignment_question_unique']
  }
}

Table survey_question_options {
  id integer [pk, increment, not null]
  survey_question_id integer [not null, ref: > survey_questions.id] // delete: cascade, update: no action
  score numeric [not null]
  label text [not null]
  sort_order integer [not null, default: 0]
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (survey_question_id, score) [unique, name: 'survey_question_options_survey_question_id_score_unique']
  }
}

Table survey_questions {
  id integer [pk, increment, not null]
  survey_template_id integer [not null, ref: > survey_templates.id] // delete: cascade, update: no action
  aspect varchar [not null]
  code varchar
  question_text text [not null]
  document_hint text
  sort_order integer [not null, default: 0]
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (survey_template_id, code) [name: 'survey_questions_survey_template_id_code_index']
    (survey_template_id, aspect) [name: 'survey_questions_survey_template_id_aspect_index']
  }
}

Table survey_templates {
  id integer [pk, increment, not null]
  title varchar [not null]
  type varchar
  description text
  status varchar [not null, default: 'draft']
  created_by integer [not null, ref: > users.id] // delete: no action, update: no action
  published_at datetime
  created_at datetime
  updated_at datetime
  deleted_at datetime
}

Table tourism_villages {
  id integer [pk, increment, not null]
  code varchar [not null]
  name varchar [not null]
  slug varchar [not null]
  description text
  province varchar
  city varchar
  district varchar
  subdistrict varchar
  address text
  postal_code varchar
  latitude numeric
  longitude numeric
  maps_url text
  manager_name varchar
  manager_phone varchar
  manager_email varchar
  status varchar [not null, default: 'draft']
  created_by integer [not null, ref: > users.id] // delete: no action, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    slug [unique, name: 'tourism_villages_slug_unique']
    code [unique, name: 'tourism_villages_code_unique']
  }
}

Table umkm_survey_answers {
  id integer [pk, increment, not null]
  umkm_id integer [not null, ref: > village_umkms.id] // delete: cascade, update: no action
  umkm_assessment_question_id integer [not null, ref: > umkm_survey_questions.id] // delete: no action, update: no action
  answered_by integer [not null, ref: > users.id] // delete: no action, update: no action
  score numeric [not null]
  criteria_code_snapshot varchar
  criteria_name_snapshot varchar
  criteria_weight_percent_snapshot numeric
  question_text_snapshot text
  question_weight_percent_snapshot numeric
  max_score_snapshot numeric
  normalized_score numeric
  weighted_score numeric
  answered_at datetime
  last_edited_at datetime
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (umkm_id, umkm_assessment_question_id) [unique, name: 'umkm_a_umkm_question_unique']
    answered_by [name: 'umkm_survey_answers_answered_by_index']
    umkm_assessment_question_id [name: 'umkm_a_question_idx']
    umkm_id [name: 'umkm_survey_answers_umkm_id_index']
  }
}

Table umkm_survey_questions {
  id integer [pk, increment, not null]
  survey_template_id integer [not null, ref: > survey_templates.id] // delete: cascade, update: no action
  criteria_code varchar [not null]
  criteria_name varchar [not null]
  criteria_weight_percent numeric [not null]
  question_number integer [not null]
  question_text text [not null]
  question_weight_percent numeric [not null]
  max_score numeric [not null, default: 4]
  help_text text
  sort_order integer [not null, default: 0]
  is_active boolean [not null, default: true]
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (survey_template_id, criteria_code, question_number) [unique, name: 'umkm_q_template_criteria_number_unique']
    (criteria_code, question_number) [name: 'umkm_q_criteria_number_idx']
    criteria_code [name: 'umkm_survey_questions_criteria_code_index']
    survey_template_id [name: 'umkm_survey_questions_survey_template_id_index']
  }
}

Table users {
  id integer [pk, increment, not null]
  name varchar [not null]
  email varchar [not null]
  email_verified_at datetime
  password varchar [not null]
  role varchar [not null, default: 'enumerator']
  status varchar [not null, default: 'active']
  phone varchar
  avatar_path varchar
  remember_token varchar
  created_at datetime
  updated_at datetime
  deleted_at datetime
  two_factor_secret text
  two_factor_recovery_codes text
  two_factor_confirmed_at datetime

  indexes {
    email [unique, name: 'users_email_unique']
  }
}

Table village_active_group_annuals {
  id integer [pk, increment, not null]
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  active_category varchar
  year integer [not null]
  value integer [not null]
  notes text
  created_by integer [ref: > users.id] // delete: set null, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (village_id, year) [unique, name: 'village_active_year_unique']
    year [name: 'village_active_group_annuals_year_index']
    village_id [name: 'village_active_group_annuals_village_id_index']
  }
}

Table village_annual_population_stats {
  id integer [pk, increment, not null]
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  year integer [not null]
  category_value varchar [not null]
  total_people integer [not null]
  notes text
  created_by integer [ref: > users.id] // delete: set null, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (village_id, year, category_value) [unique, name: 'village_population_unique']
    category_value [name: 'village_annual_population_stats_category_value_index']
    year [name: 'village_annual_population_stats_year_index']
    village_id [name: 'village_annual_population_stats_village_id_index']
  }
}

Table village_enumerator_assignments {
  id integer [pk, increment, not null]
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  enumerator_id integer [not null, ref: > users.id] // delete: cascade, update: no action
  assigned_by integer [not null, ref: > users.id] // delete: no action, update: no action
  is_active boolean [not null, default: true]
  assigned_at datetime
  created_at datetime
  updated_at datetime

  indexes {
    (village_id, enumerator_id) [unique, name: 'village_enumerator_assignments_village_id_enumerator_id_unique']
  }
}

Table village_media {
  id integer [pk, increment, not null]
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  uploaded_by integer [not null, ref: > users.id] // delete: no action, update: no action
  type varchar [not null]
  title varchar
  caption text
  file_path varchar
  external_url text
  mime_type varchar
  file_size integer
  is_cover boolean [not null, default: false]
  sort_order integer [not null, default: 0]
  created_at datetime
  updated_at datetime
  deleted_at datetime
}

Table village_profile_item_categories {
  id integer [pk, increment, not null]
  name varchar [not null]
  slug varchar [not null]
  description text
  is_active boolean [not null, default: true]
  sort_order integer [not null, default: 0]
  created_at datetime
  updated_at datetime

  indexes {
    slug [unique, name: 'village_profile_item_categories_slug_unique']
  }
}

Table village_profile_item_media {
  id integer [pk, increment, not null]
  village_profile_item_id integer [not null, ref: > village_profile_items.id] // delete: cascade, update: no action
  uploaded_by integer [not null, ref: > users.id] // delete: no action, update: no action
  type varchar [not null]
  title varchar
  caption text
  file_path varchar
  external_url text
  mime_type varchar
  file_size integer
  is_cover boolean [not null, default: false]
  sort_order integer [not null, default: 0]
  created_at datetime
  updated_at datetime
  deleted_at datetime
}

Table village_profile_items {
  id integer [pk, increment, not null]
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  category_id integer [not null, ref: > village_profile_item_categories.id] // delete: no action, update: no action
  created_by integer [not null, ref: > users.id] // delete: no action, update: no action
  name varchar [not null]
  description text
  address text
  latitude numeric
  longitude numeric
  maps_url text
  price_min numeric
  price_max numeric
  price_text varchar
  opening_hours varchar
  contact_name varchar
  contact_phone varchar
  metadata text
  is_active boolean [not null, default: true]
  sort_order integer [not null, default: 0]
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (village_id, category_id) [name: 'village_profile_items_village_id_category_id_index']
  }
}

Table village_survey_assignment_logs {
  id integer [pk, increment, not null]
  village_survey_assignment_id integer [not null, ref: > village_survey_assignments.id] // delete: cascade, update: no action
  actor_id integer [not null, ref: > users.id] // delete: no action, update: no action
  action varchar [not null]
  from_status varchar
  to_status varchar
  description text
  metadata text
  created_at datetime
  deleted_at datetime

  indexes {
    action [name: 'vsal_action_index']
    actor_id [name: 'vsal_actor_index']
    village_survey_assignment_id [name: 'vsal_assignment_index']
  }
}

Table village_survey_assignments {
  id integer [pk, increment, not null]
  code varchar [not null]
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  survey_template_id integer [not null, ref: > survey_templates.id] // delete: no action, update: no action
  status varchar [not null, default: 'assigned']
  assigned_by integer [not null, ref: > users.id] // delete: no action, update: no action
  submitted_by integer [ref: > users.id] // delete: set null, update: no action
  reviewed_by integer [ref: > users.id] // delete: set null, update: no action
  assigned_at datetime
  started_at datetime
  last_saved_at datetime
  submitted_at datetime
  reviewed_at datetime
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    village_id [unique, name: 'village_survey_assignments_village_id_unique']
    code [unique, name: 'village_survey_assignments_code_unique']
    status [name: 'village_survey_assignments_status_index']
    survey_template_id [name: 'village_survey_assignments_survey_template_id_index']
  }
}

Table village_umkm_categories {
  id integer [pk, increment, not null]
  village_umkm_id integer [not null, ref: > village_umkms.id] // delete: cascade, update: no action
  category varchar [not null]
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (village_umkm_id, category) [unique, name: 'village_umkm_categories_unique']
  }
}

Table village_umkm_documents {
  id integer [pk, increment, not null]
  village_umkm_id integer [not null, ref: > village_umkms.id] // delete: cascade, update: no action
  uploaded_by integer [ref: > users.id] // delete: set null, update: no action
  document_name varchar [not null]
  file_path varchar [not null]
  mime_type varchar
  file_size integer
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    document_name [name: 'village_umkm_documents_document_name_index']
    uploaded_by [name: 'village_umkm_documents_uploaded_by_index']
    village_umkm_id [name: 'village_umkm_documents_village_umkm_id_index']
  }
}

Table village_umkms {
  id integer [pk, increment, not null]
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  created_by integer [ref: > users.id] // delete: set null, update: no action
  data_collector_id integer [ref: > users.id] // delete: set null, update: no action
  business_owner_name varchar
  village_name varchar
  collector_name varchar
  name varchar [not null]
  legal_business_name varchar
  established_year integer
  company_website_url text
  production_address text
  product_category varchar
  brand_name varchar
  annual_revenue numeric
  monthly_production_capacity varchar
  current_obstacles text
  certifications text
  has_business_legality_and_certification varchar
  is_umkm_participant varchar
  is_production_capacity_participant varchar
  annual_production_capacity varchar
  factory_location_feasibility text
  instagram_url text
  facebook_url text
  twitter_url text
  marketing_website_url text
  ecommerce_profile_url text
  marketing_notes text
  sustainability_notes text
  bank_name varchar
  bank_account_number varchar
  has_qris boolean
  qris_provider varchar
  has_edc boolean
  edc_provider varchar
  has_credit_card boolean
  banking_notes text
  has_exported boolean
  export_destination_countries text
  product_photo_path varchar
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    has_exported [name: 'village_umkms_has_exported_index']
    product_category [name: 'village_umkms_product_category_index']
    business_owner_name [name: 'village_umkms_business_owner_name_index']
    name [name: 'village_umkms_name_index']
    village_id [name: 'village_umkms_village_id_index']
  }
}

Table village_vulnerable_group_annuals {
  id integer [pk, increment, not null]
  village_id integer [not null, ref: > tourism_villages.id] // delete: cascade, update: no action
  vulnerable_category varchar
  year integer [not null]
  total_people integer [not null]
  notes text
  created_by integer [ref: > users.id] // delete: set null, update: no action
  created_at datetime
  updated_at datetime
  deleted_at datetime

  indexes {
    (village_id, year) [unique, name: 'village_vulnerable_year_unique']
    year [name: 'village_vulnerable_group_annuals_year_index']
    village_id [name: 'village_vulnerable_group_annuals_village_id_index']
  }
}
