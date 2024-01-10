use se_study_db;

-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-11-12 18:16:37.866

-- tables
-- Table: biographical_student
-- CREATE TABLE biographical_student (
--     student_id int  NOT NULL AUTO_INCREMENT,
--     prefix varchar(255)  NOT NULL,
--     first_name varchar(255)  NOT NULL,
--     last_name varchar(255)  NOT NULL,
--     id_rmutl varchar(255)  NOT NULL,
--     email varchar(255)  NOT NULL,
--     status char(1)  NOT NULL,
--     curriculum varchar(255)  NOT NULL,
--     section varchar(255)  NOT NULL,
--     birthday varchar(255)  NOT NULL,
--     CONSTRAINT biographical_student_pk PRIMARY KEY (student_id)
-- );

-- CREATE TABLE biographical_teacher (
--     teacher_id int  NOT NULL AUTO_INCREMENT,
--     prefix varchar(255)  NOT NULL,
--     first_name varchar(255)  NOT NULL,
--     last_name varchar(255)  NOT NULL,
--     id_rmutl varchar(255)  NOT NULL,
--     email varchar(255)  NOT NULL,
--     status char(1)  NOT NULL,
--     curriculum varchar(255)  NOT NULL,
--     section varchar(255)  NOT NULL,
--     birthday varchar(255)  NOT NULL,
--     CONSTRAINT biographical_teacher_pk PRIMARY KEY (teacher_id)
-- );


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
    ce_file_name varchar(255)  NULL,
    ce_type varchar(255)  NULL,
    ce_status int  NULL DEFAULT 0,
    created_datetime datetime  NULL,
    last_updated datetime  NULL,
    CONSTRAINT preproject_document_froms_pk PRIMARY KEY (ce_doc_id)
);

-- Table: preprojects
CREATE TABLE preprojects (
    preproject_id int  NOT NULL AUTO_INCREMENT,
    section_id int NULL,
    preproject_name_th varchar(255)  NULL,
    preproject_name_eng varchar(255)  NULL,
    project_code varchar(255)   NULL,
    project_type varchar(255)   NULL,
    project_status varchar(255) NULL,
    project_extend int  NULL,
    created_date_time datetime  NULL,
    last_updated datetime  NULL,
    created_by int  NULL,
    is_deleted int   NULL DEFAULT 0,
    CONSTRAINT preprojects_pk PRIMARY KEY (preproject_id)
);

-- Table: preprojects_advisers
CREATE TABLE preprojects_advisers (
    adviser_id int NOT  NULL AUTO_INCREMENT,
    preproject_id int NULL,
    instructor_id int   NULL,
    adviser_status char(1)   NULL DEFAULT '1',
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT preprojects_advisers_pk PRIMARY KEY (adviser_id)
);

-- Table: preprojects_committees
CREATE TABLE preprojects_committees (
    committee_id int NOT NULL AUTO_INCREMENT,
    preproject_id int NULL,
    instructor_id int   NULL,
    committee_status varchar(1)   NULL DEFAULT '1',
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT preprojects_committees_pk PRIMARY KEY (committee_id)
);

-- Table: preprojects_document_comments
CREATE TABLE preprojects_document_comments (
    comment_id int NOT NULL AUTO_INCREMENT,
    document_id int   NULL,
    comment_text varchar(255)   NULL,
    comment_status varchar(1)   NULL,
    created_date_time datetime  NULL,
    created_by datetime  NULL,
    CONSTRAINT preprojects_document_comments_pk PRIMARY KEY (comment_id)
);

-- Table: preprojects_documents
CREATE TABLE preprojects_documents (
    document_id int  NOT NULL AUTO_INCREMENT,
    preproject_id int   NULL,
    document_type varchar(50)   NULL,
    document_name varchar(255)   NULL,
    document_owner char(1)   NULL,
    document_role varchar(255)  NULL,
    document_description varchar(255)  NULL,
    document_status char(1)   NULL,
    created_date_time datetime  NULL,
    created_by datetime  NULL,
    CONSTRAINT preprojects_documents_pk PRIMARY KEY (document_id)
);

-- Table: preprojects_public_relations
CREATE TABLE preprojects_public_relations (
    public_relations_id int  NOT NULL,
    preproject_name Varchar(255)   NULL,
    instructor_id int   NULL,
    header_name varchar(255)   NULL,
    description text   NULL,
    created_date_time datetime  NULL,
    isdelete int   NULL,
    created_by int  NULL,
    CONSTRAINT preprojects_public_relations_pk PRIMARY KEY (public_relations_id)
);

-- Table: preprojects_studens
CREATE TABLE preprojects_studens (
    studen_preproject_id int  NOT NULL AUTO_INCREMENT,
    preproject_id int   NULL,
    studen_id int   NULL,
    status char(1)   NULL  DEFAULT '1',
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT preprojects_studens_pk PRIMARY KEY (studen_preproject_id)
);

-- Table: project_document_froms
CREATE TABLE project_document_froms (
    ch_doc_id int  NOT NULL AUTO_INCREMENT,
    ch_file_name varchar(255)   NULL,
    ch_type varchar(255)   NULL,
    ch_status int   NULL,
    created_datetime datetime  NULL,
    last_updated datetime  NULL,
    CONSTRAINT project_document_froms_pk PRIMARY KEY (ch_doc_id)
);

-- Table: projects
CREATE TABLE projects (
    project_id int  NOT NULL AUTO_INCREMENT,
    section_id int NULL,
    preproject_id int   NULL,
    project_name_th varchar(255)   NULL,
    project_name_eng varchar(255)   NULL,
    project_code varchar(255)   NULL,
    project_type varchar(255) NULL,
    project_status varchar(255) NULL,
    project_extend int  NULL,
    created_date_time datetime NULL,
    last_updated datetime  NULL,
    created_by varchar(255) NULL,
    is_deleted int  NOT NULL DEFAULT 0,
    CONSTRAINT projects_pk PRIMARY KEY (project_id)
);

-- Table: projects_advisers
CREATE TABLE projects_advisers (
    adviser_id int  NOT NULL AUTO_INCREMENT,
    preproject_adviser_id int NULL,
    project_id int   NULL,
    instructor_id int   NULL,
    adviser_status char(1)   NULL DEFAULT '1',
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT projects_advisers_pk PRIMARY KEY (adviser_id)
);

-- Table: projects_committees
CREATE TABLE projects_committees (
    committee_id int  NOT NULL AUTO_INCREMENT,
    preproject_committee_id int  NULL,
    project_id int   NULL,
    instructor_id int   NULL,
    committee_status varchar(1)   NULL DEFAULT '1',
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT projects_committees_pk PRIMARY KEY (committee_id)
);

-- Table: projects_document_comments
CREATE TABLE projects_document_comments (
    comment_id int  NOT NULL AUTO_INCREMENT,
    document_id int NULL,
    comment_text varchar(255)   NULL,
    comment_status varchar(1)   NULL,
    created_date_time datetime  NULL,
    created_by datetime  NULL,
    CONSTRAINT projects_document_comments_pk PRIMARY KEY (comment_id)
);

-- Table: projects_documents
CREATE TABLE projects_documents (
    document_id int  NOT NULL AUTO_INCREMENT,
    project_id int   NULL,
    document_type varchar(50)   NULL,
    document_name varchar(255)   NULL,
    document_owner char(1)   NULL,
    document_role varchar(255)  NULL,
    document_description varchar(255)  NULL,
    document_status char(1)   NULL,
    created_date_time datetime  NULL,
    created_by datetime  NULL,
    CONSTRAINT projects_documents_pk PRIMARY KEY (document_id)
);

-- Table: students_projects
CREATE TABLE projects_students (
    studen_project_id int  NOT NULL AUTO_INCREMENT,
    studen_preproject_id int   NULL,
    project_id int   NULL,
    studen_id int   NULL,
    status char(1)   NULL DEFAULT '1',
    created_date_time datetime  NULL,
    last_update datetime  NULL,
    CONSTRAINT students_projects_pk PRIMARY KEY (studen_project_id)
);

-- Table: subjects
CREATE TABLE project_mgt_subjects (
    subject_id int  NOT NULL AUTO_INCREMENT,
    curriculum_id int   NULL,
    subject_code varchar(255)   NULL,
    subject_type varchar(255)   NULL,
    subject_name_th varchar(255)   NULL,
    subject_name_en varchar(255)   NULL,
    credit_qty int   NULL,
    CONSTRAINT subjects_pk PRIMARY KEY (subject_id)
);

-- Table: year_sem_sections
CREATE TABLE year_sem_sections (
    section_id int  NOT NULL AUTO_INCREMENT,
    subject_id int   NULL,
    section_name varchar(255)   NULL,
    sem_year int   NULL,
    semester_order int   NULL,
    sec_status char   NULL DEFAULT 0,
    last_updated datetime  NULL,
    created_date_time datetime  NULL,
    CONSTRAINT year_sem_sections_pk PRIMARY KEY (section_id)
);

CREATE TABLE project_potentials (
    poten_id int  NOT NULL AUTO_INCREMENT,
    project_id int  NULL,
    subject_id varchar(255)   NULL,
    weight varchar(255)   NULL,
    is_deleted char(1)   NULL DEFAULT 0,
    created_datetime datetime  NULL,
    CONSTRAINT project_potentials_pk PRIMARY KEY (poten_id)
);

-- Table: project_status
CREATE TABLE project_status (
    status_id int  NOT NULL AUTO_INCREMENT,
    status_name varchar(255)   NULL,
    status_active char(1)   NULL,
    CONSTRAINT project_status_pk PRIMARY KEY (status_id)
);

-- Table: project_types
CREATE TABLE project_types (
    type_id int  NOT NULL AUTO_INCREMENT,
    type_name varchar(255)   NULL,
    type_status char(1)   NULL DEFAULT 1,
    CONSTRAINT project_types_pk PRIMARY KEY (type_id)
);

CREATE TABLE preproject_in_section (
    pre_sec_id int  NOT NULL AUTO_INCREMENT,
    section_id int   NULL,
    preproject_id int   NULL,
    created_datetime datetime NULL,
    CONSTRAINT preproject_in_section_pk PRIMARY KEY (pre_sec_id)
);

-- Table: project_in_section
CREATE TABLE project_in_section (
    pro_sec_id int  NOT NULL AUTO_INCREMENT,
    section_id int   NULL,
    project_id int   NULL,
    created_datetime datetime NULL,
    CONSTRAINT project_in_section_pk PRIMARY KEY (pro_sec_id)
);

CREATE TABLE preproject_status (
    status_id int  NOT NULL AUTO_INCREMENT,
    status_name varchar(255)   NULL,
    status_active char(1)   NULL,
    CONSTRAINT preproject_status_pk PRIMARY KEY (status_id)
);

-- Table: project_activity
-- CREATE TABLE project_activity (
--     activity_id int  NOT NULL AUTO_INCREMENT,
--     description varchar(255)  NOT NULL,
--     created_datetime datetime  NOT NULL,
--     CONSTRAINT project_activity_pk PRIMARY KEY (activity_id)
-- );

-- CREATE TABLE preproject_activitys (
--     activity_id int  NOT NULL AUTO_INCREMENT,
--     preproject_id int   NULL,
--     preproject_description varchar(255)   NULL,
--     activity_order int   NULL,
--     created_datetime datetime NULL,
--     CONSTRAINT preproject_activitys_pk PRIMARY KEY (activity_id)
-- );

-- Table: project_activity
-- CREATE TABLE project_activity (
--     activity_id int  NOT NULL AUTO_INCREMENT,
--     project_id int   NULL,
--     project_description varchar(255)   NULL,
--     activity_order int   NULL,
--     created_datetime datetime   NULL,
--     CONSTRAINT project_activity_pk PRIMARY KEY (activity_id)
-- );

CREATE TABLE biographical_teacher (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    prefix VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    id_rmutl VARCHAR(20),
    _email VARCHAR(255),
    status VARCHAR(50),
    birthday DATE
);

-- Insert data
INSERT INTO biographical_teacher (teacher_id, prefix, first_name, last_name, id_rmutl, _email, status, birthday) VALUES
(1, 'Mr', 'John', 'Doe', '123456', 'john.doe@example.com', 'Active', '1990-01-15'),
(2, 'Ms', 'Jane', 'Smith', '654321', 'jane.smith@example.com', 'Inactive', '1985-08-22'),
(3, 'Dr', 'Michael', 'Johnson', '987654', 'michael.j@example.com', 'Active', '1978-04-03'),
(4, 'Mrs', 'Emily', 'Davis', '456789', 'emily.d@example.com', 'Active', '1982-11-07'),
(5, 'Mr', 'Robert', 'Brown', '789012', 'robert.b@example.com', 'Inactive', '1995-06-30'),
(6, 'Miss', 'Samantha', 'White', '234567', 'samantha.w@example.com', 'Active', '1989-12-18'),
(7, 'Mr', 'Daniel', 'Lee', '567890', 'daniel.l@example.com', 'Inactive', '1975-09-25'),
(8, 'Ms', 'Olivia', 'Miller', '890123', 'olivia.m@example.com', 'Active', '1987-03-12'),
(9, 'Dr', 'Christopher', 'Wilson', '345678', 'chris.w@example.com', 'Active', '1980-02-08'),
(10, 'Mrs', 'Sophia', 'Taylor', '012345', 'sophia.t@example.com', 'Inactive', '1992-07-14');

-- Create table with auto-incrementing primary key
CREATE TABLE biographical_student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    prefix VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    id_rmutl VARCHAR(20),
    email VARCHAR(255),
    birthday DATE
);

-- Insert data
INSERT INTO biographical_student (prefix, first_name, last_name, id_rmutl, email, birthday) VALUES
('Mr', 'David', 'Johnson', '123456', 'david.j@example.com', '1998-05-20'),
('Ms', 'Emily', 'Smith', '654321', 'emily.s@example.com', '1997-09-15'),
('Dr', 'Daniel', 'Lee', '987654', 'daniel.l@example.com', '1999-03-10'),
('Mrs', 'Sophia', 'Taylor', '456789', 'sophia.t@example.com', '1996-12-05'),
('Mr', 'Christopher', 'Wilson', '789012', 'chris.w@example.com', '1998-07-22'),
('Miss', 'Olivia', 'Miller', '234567', 'olivia.m@example.com', '1997-01-30'),
('Mr', 'Michael', 'Davis', '567890', 'michael.d@example.com', '1999-11-18'),
('Ms', 'Emma', 'Brown', '890123', 'emma.b@example.com', '1996-08-07'),
('Dr', 'William', 'White', '345678', 'william.w@example.com', '1998-04-02'),
('Mrs', 'Ava', 'Anderson', '012345', 'ava.a@example.com', '1997-10-14');

INSERT INTO `project_mgt_subjects` (`curriculum_id`, `subject_code`, `subject_type`, `subject_name_th`, `subject_name_en`, `credit_qty`) VALUES ('1', 'ENGCE113', '1', 'การเตรียมโครงงานวิศวกรรมคอมพิวเตอร์', 'Computer Engineering Project', '1');
INSERT INTO `project_mgt_subjects` (`curriculum_id`, `subject_code`, `subject_type`, `subject_name_th`, `subject_name_en`, `credit_qty`) VALUES ('1', 'ENGCE114', '2', 'โครงงานวิศวกรรมคอมพิวเตอร์', 'Computer Engineering Project', '3');

INSERT INTO `year_sem_sections` (`subject_id`, `section_name`, `sem_year`, `semester_order`, `sec_status`) VALUES ('1', 'SEC1', '2566', '2', '1');
INSERT INTO `year_sem_sections` (`subject_id`, `section_name`, `sem_year`, `semester_order`, `sec_status`) VALUES ('1', 'SEC2', '2566', '2', '1');
INSERT INTO `year_sem_sections` (`subject_id`, `section_name`, `sem_year`, `semester_order`, `sec_status`) VALUES ('2', 'SEC1', '2566', '2', '1');
INSERT INTO `year_sem_sections` (`subject_id`, `section_name`, `sem_year`, `semester_order`, `sec_status`) VALUES ('1', 'SEC1', '2566', '1', '0');
INSERT INTO `year_sem_sections` (`subject_id`, `section_name`, `sem_year`, `semester_order`, `sec_status`) VALUES ('2', 'SEC1', '2566', '1', '0');

INSERT INTO `project_types` (`type_name`, `type_status`) VALUES ('IOT', '1');
INSERT INTO `project_types` (`type_name`, `type_status`) VALUES ('Network', '1');
INSERT INTO `project_types` (`type_name`, `type_status`) VALUES ('Pure software ', '1');
INSERT INTO `project_types` (`type_name`, `type_status`) VALUES ('Hardware', '1');
INSERT INTO `project_types` (`type_name`, `type_status`) VALUES ('AI', '1');
INSERT INTO `project_types` (`type_name`, `type_status`) VALUES ('Robot', '1');
INSERT INTO `project_types` (`type_name`, `type_status`) VALUES ('Blockchain', '1');
INSERT INTO `project_types` (`type_name`, `type_status`) VALUES ('Others', '1');

INSERT INTO `preproject_status` (`status_name`, `status_active`) VALUES ('Reject', '1');
INSERT INTO `preproject_status` (`status_name`, `status_active`) VALUES ('Wait for approve', '1');
INSERT INTO `preproject_status` (`status_name`, `status_active`) VALUES ('Inprocess', '1');
INSERT INTO `preproject_status` (`status_name`, `status_active`) VALUES ('Can test', '1');
INSERT INTO `preproject_status` (`status_name`, `status_active`) VALUES ('Tes ing', '1');
INSERT INTO `preproject_status` (`status_name`, `status_active`) VALUES ('Passed', '1');
INSERT INTO `preproject_status` (`status_name`, `status_active`) VALUES ('Tranfered', '1');

INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Reject', '1');
INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Send CH1', '1');
INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Send CH2', '1');
INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Send CH3', '1');
INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Send CH4', '1');
INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Send CH5', '1');
INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Can test', '1');
INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Testing', '1');
INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Pass', '1');
INSERT INTO `project_status` (`status_name`, `status_active`) VALUES ('Display', '1');


-- End of file.

