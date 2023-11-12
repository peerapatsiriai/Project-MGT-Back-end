-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-11-12 18:16:37.866

-- tables
-- Table: biographical_student
CREATE TABLE biographical_student (
    student_id int  NOT NULL AUTO_INCREMENT,
    prefix varchar(255)  NOT NULL,
    first_name varchar(255)  NOT NULL,
    last_name varchar(255)  NOT NULL,
    id_rmutl varchar(255)  NOT NULL,
    email varchar(255)  NOT NULL,
    status char(1)  NOT NULL,
    curriculum varchar(255)  NOT NULL,
    section varchar(255)  NOT NULL,
    birthday varchar(255)  NOT NULL,
    CONSTRAINT biographical_student_pk PRIMARY KEY (student_id)
);

CREATE TABLE biographical_teacher (
    teacher_id int  NOT NULL AUTO_INCREMENT,
    prefix varchar(255)  NOT NULL,
    first_name varchar(255)  NOT NULL,
    last_name varchar(255)  NOT NULL,
    id_rmutl varchar(255)  NOT NULL,
    email varchar(255)  NOT NULL,
    status char(1)  NOT NULL,
    curriculum varchar(255)  NOT NULL,
    section varchar(255)  NOT NULL,
    birthday varchar(255)  NOT NULL,
    CONSTRAINT biographical_teacher_pk PRIMARY KEY (teacher_id)
);

-- Table: curriculums
CREATE TABLE curriculums (
    curriculum_id int  NOT NULL AUTO_INCREMENT,
    curriculum_name varchar(255)  NOT NULL,
    year int  NOT NULL,
    CONSTRAINT curriculums_pk PRIMARY KEY (curriculum_id)
);

-- Table: instructors
CREATE TABLE instructors (
    teacher_id int  NOT NULL AUTO_INCREMENT,
    prefix varchar(255)  NOT NULL,
    first_name varchar(255)  NOT NULL,
    last_name varchar(255)  NOT NULL,
    id_rmutl varchar(255)  NOT NULL,
    email varchar(255)  NOT NULL,
    status varchar(255)  NOT NULL,
    curriculum varchar(255)  NOT NULL,
    section varchar(255)  NOT NULL,
    birthday varchar(255)  NOT NULL,
    CONSTRAINT instructors_pk PRIMARY KEY (teacher_id)
);

-- Table: preproject_document_froms
CREATE TABLE preproject_document_froms (
    ce_doc_id int  NOT NULL AUTO_INCREMENT,
    ce_file_name varchar(255)  NOT NULL,
    ce_type varchar(255)  NOT NULL,
    ce_status int  NOT NULL DEFAULT 0,
    created_datetime datetime  NULL,
    last_updated datetime  NULL,
    CONSTRAINT preproject_document_froms_pk PRIMARY KEY (ce_doc_id)
);

-- Table: preprojects
CREATE TABLE preprojects (
    preproject_id int  NOT NULL AUTO_INCREMENT,
    section_id int  NOT NULL,
    preproject_name_th varchar(255)  NOT NULL,
    preproject_name_eng varchar(255)  NOT NULL,
    project_code varchar(255)  NOT NULL,
    project_type varchar(255)  NOT NULL,
    project_status char(1)  NOT NULL,
    project_extend int  NULL,
    created_date_time datetime  NULL,
    last_updated datetime  NULL,
    created_by int  NULL,
    is_deleted int  NOT NULL DEFAULT 0,
    CONSTRAINT preprojects_pk PRIMARY KEY (preproject_id)
);

-- Table: preprojects_advisers
CREATE TABLE preprojects_advisers (
    adviser_id int  NOT NULL AUTO_INCREMENT,
    preproject_id int  NOT NULL,
    instructor_id int  NOT NULL,
    adviser_status char(1)  NOT NULL,
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT preprojects_advisers_pk PRIMARY KEY (adviser_id)
);

-- Table: preprojects_committees
CREATE TABLE preprojects_committees (
    committee_id int  NOT NULL AUTO_INCREMENT,
    preproject_id int  NOT NULL,
    instructor_id int  NOT NULL,
    committee_status varchar(1)  NOT NULL,
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT preprojects_committees_pk PRIMARY KEY (committee_id)
);

-- Table: preprojects_document_comments
CREATE TABLE preprojects_document_comments (
    comment_id int  NOT NULL AUTO_INCREMENT,
    document_id int  NOT NULL,
    comment_text varchar(255)  NOT NULL,
    comment_status varchar(1)  NOT NULL,
    created_date_time datetime  NULL,
    created_by datetime  NULL,
    CONSTRAINT preprojects_document_comments_pk PRIMARY KEY (comment_id)
);

-- Table: preprojects_documents
CREATE TABLE preprojects_documents (
    document_id int  NOT NULL AUTO_INCREMENT,
    preproject_id int  NOT NULL,
    document_type varchar(50)  NOT NULL,
    document_name varchar(255)  NOT NULL,
    document_owner char(1)  NOT NULL,
    document_role varchar(255) NOT NULL,
    document_description varchar(255) NOT NULL,
    document_status char(1)  NOT NULL,
    created_date_time datetime  NULL,
    created_by datetime  NULL,
    CONSTRAINT preprojects_documents_pk PRIMARY KEY (document_id)
);

-- Table: preprojects_public_relations
CREATE TABLE preprojects_public_relations (
    public_relations_id int  NOT NULL,
    preproject_name varchar(1)  NOT NULL,
    instructor_id int  NOT NULL,
    preproject_type int  NOT NULL,
    preproject_status int  NOT NULL,
    created_date_time datetime  NULL,
    isdelete int  NOT NULL,
    created_by int  NULL,
    CONSTRAINT preprojects_public_relations_pk PRIMARY KEY (public_relations_id)
);

-- Table: preprojects_studens
CREATE TABLE preprojects_studens (
    studen_preproject_id int  NOT NULL AUTO_INCREMENT,
    preproject_id int  NOT NULL,
    studen_id int  NOT NULL,
    status char(1)  NOT NULL,
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT preprojects_studens_pk PRIMARY KEY (studen_preproject_id)
);

-- Table: project_document_froms
CREATE TABLE project_document_froms (
    ch_doc_id int  NOT NULL AUTO_INCREMENT,
    ch_file_name varchar(255)  NOT NULL,
    ch_type varchar(255)  NOT NULL,
    ch_status int  NOT NULL,
    created_datetime datetime  NULL,
    last_updated datetime  NULL,
    CONSTRAINT project_document_froms_pk PRIMARY KEY (ch_doc_id)
);

-- Table: projects
CREATE TABLE projects (
    project_id int  NOT NULL AUTO_INCREMENT,
    section_id int  NOT NULL,
    preproject_id int  NOT NULL,
    project_name_th varchar(255)  NOT NULL,
    project_name_eng varchar(255)  NOT NULL,
    project_code varchar(255)  NOT NULL,
    project_type varchar(255)  NOT NULL,
    project_status char(1)  NOT NULL,
    project_extend int  NULL,
    created_date_time datetime  NOT NULL,
    last_updated datetime  NULL,
    created_by datetime  NULL,
    is_deleted int  NOT NULL,
    CONSTRAINT projects_pk PRIMARY KEY (project_id)
);

-- Table: projects_advisers
CREATE TABLE projects_advisers (
    adviser_id int  NOT NULL AUTO_INCREMENT,
    preproject_adviser_id int  NOT NULL,
    project_id int  NOT NULL,
    instructor_id int  NOT NULL,
    adviser_status char(1)  NOT NULL,
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT projects_advisers_pk PRIMARY KEY (adviser_id)
);

-- Table: projects_committees
CREATE TABLE projects_committees (
    committee_id int  NOT NULL AUTO_INCREMENT,
    preproject_committee_id int  NOT NULL,
    project_id int  NOT NULL,
    instructor_id int  NOT NULL,
    committee_status varchar(1)  NOT NULL,
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT projects_committees_pk PRIMARY KEY (committee_id)
);

-- Table: projects_document_comments
CREATE TABLE projects_document_comments (
    comment_id int  NOT NULL AUTO_INCREMENT,
    document_id int  NOT NULL,
    comment_text varchar(255)  NOT NULL,
    comment_status varchar(1)  NOT NULL,
    created_date_time datetime  NULL,
    created_by datetime  NULL,
    CONSTRAINT projects_document_comments_pk PRIMARY KEY (comment_id)
);

-- Table: projects_documents
CREATE TABLE projects_documents (
    document_id int  NOT NULL AUTO_INCREMENT,
    project_id int  NOT NULL,
    document_type varchar(50)  NOT NULL,
    document_name varchar(255)  NOT NULL,
    document_owner char(1)  NOT NULL,
    document_role varchar(255) NOT NULL,
    document_description varchar(255) NOT NULL,
    document_status char(1)  NOT NULL,
    created_date_time datetime  NULL,
    created_by datetime  NULL,
    CONSTRAINT projects_documents_pk PRIMARY KEY (document_id)
);

-- Table: students_projects
CREATE TABLE projects_students (
    studen_project_id int  NOT NULL AUTO_INCREMENT,
    studen_preproject_id int  NOT NULL,
    project_id int  NOT NULL,
    studen_id int  NOT NULL,
    status char(1)  NOT NULL,
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT students_projects_pk PRIMARY KEY (studen_project_id)
);

-- Table: subjects
CREATE TABLE project_mgt_subjects (
    subject_id int  NOT NULL AUTO_INCREMENT,
    curriculum_id int  NOT NULL,
    subject_code varchar(255)  NOT NULL,
    subject_type varchar(255)  NOT NULL,
    subject_name_th varchar(255)  NOT NULL,
    subject_name_en varchar(255)  NOT NULL,
    credit_qty int  NOT NULL,
    CONSTRAINT subjects_pk PRIMARY KEY (subject_id)
);

-- Table: year_sem_sections
CREATE TABLE year_sem_sections (
    section_id int  NOT NULL AUTO_INCREMENT,
    subject_id int  NOT NULL,
    section_name varchar(255)  NOT NULL,
    sem_year int  NOT NULL,
    semester_order int  NOT NULL,
    sec_status char  NOT NULL DEFAULT 0,
    last_updated datetime  NULL,
    created_date_time datetime  NULL,
    CONSTRAINT year_sem_sections_pk PRIMARY KEY (section_id)
);

-- End of file.

