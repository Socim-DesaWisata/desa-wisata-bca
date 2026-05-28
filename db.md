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

Ref: csr_programs.created_by > users.id

Ref: tourism_villages.created_by > users.id

Ref: program_villages.program_id > csr_programs.id
Ref: program_villages.village_id > tourism_villages.id

Ref: village_enumerator_assignments.village_id > tourism_villages.id
Ref: village_enumerator_assignments.enumerator_id > users.id
Ref: village_enumerator_assignments.assigned_by > users.id

Ref: village_media.village_id > tourism_villages.id
Ref: village_media.uploaded_by > users.id

Ref: village_profile_items.village_id > tourism_villages.id
Ref: village_profile_items.category_id > village_profile_item_categories.id
Ref: village_profile_items.created_by > users.id

Ref: village_profile_item_media.village_profile_item_id > village_profile_items.id
Ref: village_profile_item_media.uploaded_by > users.id

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
