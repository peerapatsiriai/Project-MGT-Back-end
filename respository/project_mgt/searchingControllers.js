const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];

const pool = mysql.createPool(config);

const poolQuery = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results, fields) => {
      if (error) reject(error);
      else resolve({ results, fields });
    });
  });
};


async function getAllCurriculums() {
  try {
    const Query = `SELECT * FROM curriculums`;
    console.log('Query is: ', Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        data: results,
        message: 'SearchAllCurriculum Success',
      };
    } else {
      return {
        statusCode: 404,
        message: 'Curriculum not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

// find preproject subject in curriculum
async function getAllSubjectInCurriculums(curriculum_id) {
  try {
    // Status 1 is subject is pre-porject subject
    const Query = `SELECT * FROM project_mgt_subjects WHERE curriculum_id = ${curriculum_id} AND subject_type = 1`;
    console.log('Query is: ', Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        data: results,
        message: 'SearchAllSubjects Success',
      };
    } else {
      return {
        statusCode: 404,
        message: 'Subject not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}


// find project subject in curriculum
async function getSubjectProjectInCurriculums(curriculum_id) {
  try {
    // Status 1 is subject is pre-porject subject
    const Query = `SELECT * FROM project_mgt_subjects WHERE curriculum_id = ${curriculum_id} AND subject_type = 2`;
    console.log('Query is: ', Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        data: results,
        message: 'SearchAllSubjects Success',
      };
    } else {
      return {
        statusCode: 404,
        message: 'Subject not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

async function getAllSubjectYears(subject_id) {
  try {
    const Query = `SELECT DISTINCT sem_year FROM year_sem_sections WHERE subject_id = ${subject_id} ORDER BY sem_year`;
    console.log('Query is: ', Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        data: results,
        message: 'SearchAllSubjects Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: 'Year Not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

async function getAllSectionInYear(subject_id, year) {
  try {
    const Query = `SELECT * FROM year_sem_sections WHERE subject_id = ${subject_id} AND sem_year = ${year}`;
    console.log('Query is: ', Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        data: results,
        message: 'Search All Section Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: 'Section Not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

async function getAllListInstructors() {
  try {
    const Query = `SELECT * FROM biographical_teacher`;
    console.log('Query is: ', Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        data: results,
        message: 'Search All Instructors Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: 'Instructors Not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

async function getAllListStudents() {
  try {
    const Query = `SELECT * FROM biographical_student`;
    console.log('Query is: ', Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        data: results,
        message: 'Search All Studen Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: 'Studens Not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

async function getAllPreprojects() {
  try {
    const Query = `SELECT * FROM preprojects AS pe INNER JOIN year_sem_sections AS sec ON pe.section_id = sec.section_id
                   INNER JOIN project_mgt_subjects AS sub ON sec.subject_id = sub.subject_id
                   INNER JOIN curriculums AS cur ON sub.curriculum_id = cur.curriculum_id
                   WHERE pe.is_deleted = 0 ORDER BY preproject_id DESC
                   `;
    console.log('Query1 is: ', Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        data: results,
        message: 'Sear Pre-project Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: 'Pre-project not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

async function getonePreproject(preproject_id) {
  try {
    const PreprojectQuery = `
      SELECT * FROM
      preprojects AS pe
      INNER JOIN year_sem_sections AS sec
      ON pe.section_id = sec.section_id
      INNER JOIN project_mgt_subjects AS sub
      ON sec.subject_id = sub.subject_id
      INNER JOIN curriculums AS cur
      ON sub.curriculum_id = cur.curriculum_id
      INNER JOIN preprojects_advisers AS advi
      ON pe.preproject_id = advi.preproject_id AND advi.adviser_status = '1'
      INNER JOIN biographical_teacher AS ins
      ON advi.instructor_id = ins.teacher_id 
      WHERE pe.preproject_id = '${preproject_id}'
    `;

    const StudentQuery = `SELECT stu2.student_id, stu2.prefix, stu2.first_name, stu2.last_name, stu2.id_rmutl 
     FROM preprojects AS pre
     INNER JOIN preprojects_studens AS stu
     ON pre.preproject_id = stu.preproject_id
     INNER JOIN biographical_student AS stu2
     ON stu.studen_id = stu2.student_id  
     WHERE pre.preproject_id = '${preproject_id}'     
     `;

    const subadviserQuery = `SELECT ins.teacher_id, ins.prefix, ins.first_name, ins.last_name FROM preprojects AS pre
                              INNER JOIN preprojects_advisers AS advi
                              ON pre.preproject_id = advi.preproject_id AND advi.adviser_status = '2'
                              INNER JOIN biographical_teacher AS ins
                              ON advi.instructor_id = ins.teacher_id
                              WHERE pre.preproject_id = '${preproject_id}'
                            `;

    const committeeQuery = `SELECT ins.teacher_id, ins.prefix, ins.first_name, ins.last_name FROM preprojects AS pre
                            INNER JOIN preprojects_committees AS com
                            ON pre.preproject_id = com.preproject_id
                            INNER JOIN biographical_teacher AS ins
                            ON com.instructor_id = ins.teacher_id
                            WHERE pre.preproject_id = '${preproject_id}'
    `;

    const documentQuery = `SELECT DISTINCT document_type,
                           CASE WHEN document_status > 1 THEN 'complete'
                           ELSE 'not pass'
                           END AS status
                           FROM preprojects_documents
                           WHERE preproject_id = ${preproject_id} AND document_status != 0;
`;
    // Execute both queries asynchronously
    // const [preprojectResults, studentResults, subadviserResults, committeeResult, documentResult] = await Promise.all([
    const [
      preprojectResults,
      studentResults,
      subadviserResults,
      committeeResult,
      documentResult,
    ] = await Promise.all([
      poolQuery(PreprojectQuery),
      poolQuery(StudentQuery),
      poolQuery(subadviserQuery),
      poolQuery(committeeQuery),
      poolQuery(documentQuery),
    ]);

    let ListDocument = {
      ce01: { status: 'Not pass' },
      ce02: { status: 'Not pass' },
      ce03: { status: 'Not pass' },
      ce04: { status: 'Not pass' },
      ce05: { status: 'Not pass' },
      ce06: { status: 'Not pass' },
    };

    // Fine Same CE document
    const separateCE = async (data) => {
      data.forEach((element) => {
        // update status
        if (element.status === 'complete') {
          if (element.document_type === 'CE01') {
            ListDocument.ce01.status = 'Pass';
          } else if (element.document_type === 'CE01') {
            ListDocument.ce01.status = 'Pass';
          } else if (element.document_type === 'CE02') {
            ListDocument.ce02.status = 'Pass';
          } else if (element.document_type === 'CE03-4-G') {
            ListDocument.ce03.status = 'Pass';
          } else if (element.document_type === 'CE04') {
            ListDocument.ce04.status = 'Pass';
          } else if (element.document_type === 'CE05') {
            ListDocument.ce05.status = 'Pass';
          } else if (element.document_type === 'CE06') {
            ListDocument.ce06.status = 'Pass';
          }
        }
      });
    };
    separateCE(documentResult.results);

    if (preprojectResults.results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        PreprojectData: preprojectResults.results,
        PreprojectSubAdviser: subadviserResults.results,
        PreprojectStudent: studentResults.results,
        PreprojectCommittee: committeeResult.results,
        PreprojectDocument: ListDocument,
        message: 'SearchPre-project Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: 'Pre-project not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

// preproject document
async function getListInOneDocuments(preproject_id, document_type) {
  try {
    const QueryDocumentList = `SELECT * FROM 
                                preprojects_documents
                                WHERE preproject_id = ${preproject_id} AND document_type = '${document_type}'
                                AND document_status != 0 
                                ORDER BY created_date_time DESC
                                `;

    const StudentQuery = `SELECT stu2.student_id, stu2.prefix, stu2.first_name, stu2.last_name, stu2.id_rmutl 
     FROM preprojects AS pre
     INNER JOIN preprojects_studens AS stu
     ON pre.preproject_id = stu.preproject_id
     INNER JOIN biographical_student AS stu2
     ON stu.studen_id = stu2.student_id  
     WHERE pre.preproject_id = '${preproject_id}'     
     `;

    const adviserQuery = `SELECT ins.teacher_id, ins.prefix, ins.first_name, ins.last_name FROM preprojects AS pre
                              INNER JOIN preprojects_advisers AS advi
                              ON pre.preproject_id = advi.preproject_id
                              INNER JOIN biographical_teacher AS ins
                              ON advi.instructor_id = ins.teacher_id
                              WHERE pre.preproject_id = '${preproject_id}'
                            `;

    const committeeQuery = `SELECT ins.teacher_id, ins.prefix, ins.first_name, ins.last_name FROM preprojects AS pre
                            INNER JOIN preprojects_committees AS com
                            ON pre.preproject_id = com.preproject_id
                            INNER JOIN biographical_teacher AS ins
                            ON com.instructor_id = ins.teacher_id
                            WHERE pre.preproject_id = '${preproject_id}'
    `;
    console.log('Query is: ', QueryDocumentList);
    const { results } = await poolQuery(QueryDocumentList);

    const students = await poolQuery(StudentQuery);
    const adviser = await poolQuery(adviserQuery);
    const committee = await poolQuery(committeeQuery);

    if (results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        documentList: results,
        index: results.length,
        students: students.results,
        adviser: adviser.results,
        committee: committee.results,
        message: 'Search Document Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        index: 0,
        students: students.results,
        adviser: adviser.results,
        committee: committee.results,
        message: 'Document not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

async function getAllProjects() {
  try {
    const Query = `SELECT * FROM projects AS pro 
                   INNER JOIN year_sem_sections AS sec ON pro.section_id = sec.section_id
                   INNER JOIN project_mgt_subjects AS sub ON sec.subject_id = sub.subject_id
                   INNER JOIN curriculums AS cur ON sub.curriculum_id = cur.curriculum_id
                   INNER JOIN preprojects AS pre ON pre.preproject_id = pro.preproject_id
                   WHERE pro.is_deleted = 0 ORDER BY pro.project_id DESC
                   `;
    console.log('Query1 is: ', Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        data: results,
        message: 'Sear Pre-project Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: 'Project not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

async function getoneProjects(project_id) {
  try {
    const projectQuery = `
      SELECT * FROM
      projects AS pro
      INNER JOIN year_sem_sections AS sec
      ON pro.section_id = sec.section_id
      INNER JOIN project_mgt_subjects AS sub
      ON sec.subject_id = sub.subject_id
      INNER JOIN curriculums AS cur
      ON sub.curriculum_id = cur.curriculum_id
      INNER JOIN projects_advisers AS advi
      ON pro.project_id = advi.project_id AND advi.adviser_status = '1'
      INNER JOIN biographical_teacher AS ins
      ON advi.instructor_id = ins.teacher_id
      INNER JOIN preprojects AS pre
      ON pre.preproject_id = pro.preproject_id
      WHERE pro.project_id = '${project_id}' 
    `;

    const StudentQuery = `SELECT stu2.student_id, stu2.id_rmutl, stu2.prefix ,stu2.first_name, stu2.last_name 
     FROM projects AS pro
     INNER JOIN projects_students AS stu
     ON pro.project_id = stu.project_id
     INNER JOIN biographical_student AS stu2
     ON stu.studen_id = stu2.student_id  
     WHERE pro.project_id = '${project_id}'     
     `;

    const subadviserQuery = `SELECT ins.teacher_id, ins.prefix, ins.first_name, ins.last_name FROM projects AS pro
                              INNER JOIN projects_advisers AS advi
                              ON pro.project_id = advi.project_id AND advi.adviser_status = '2'
                              INNER JOIN biographical_teacher AS ins
                              ON advi.instructor_id = ins.teacher_id
                              WHERE pro.project_id = '${project_id}'
                            `;

    const committeeQuery = `SELECT ins.teacher_id, ins.prefix, ins.first_name, ins.last_name FROM projects AS pro
                            INNER JOIN projects_committees AS com
                            ON pro.project_id = com.project_id
                            INNER JOIN biographical_teacher AS ins
                            ON com.instructor_id = ins.teacher_id
                            WHERE pro.project_id = '${project_id}'
    `;

    const documentQuery = `SELECT DISTINCT document_type,
                           CASE WHEN document_status > 1 THEN 'complete'
                           ELSE 'not pass'
                           END AS status
                           FROM projects_documents
                           WHERE project_id = '${project_id}' AND document_status != 0;
`;
    // Execute both queries asynchronously
    // const [preprojectResults, studentResults, subadviserResults, committeeResult, documentResult] = await Promise.all([
    const [
      projectResults,
      studentResults,
      subadviserResults,
      committeeResult,
      documentResult,
    ] = await Promise.all([
      poolQuery(projectQuery),
      poolQuery(StudentQuery),
      poolQuery(subadviserQuery),
      poolQuery(committeeQuery),
      poolQuery(documentQuery),
    ]);

    let ListDocument = {
      ce01: { status: 'Not Pass' },
      ce02: { status: 'Not Pass' },
      ce03: { status: 'Not Pass' },
      ce04: { status: 'Not Pass' },
      ce05: { status: 'Not Pass' },
      ce06: { status: 'Not Pass' },
    };

    // Fine Same CE document
    const separateCE = async (data) => {
      data.forEach((element) => {
        // update status
        if (element.status === 'complete') {
          if (element.document_type === 'บทที่1') {
            ListDocument.ce01.status = 'Pass';
          } else if (element.document_type === 'บทที่2') {
            ListDocument.ce01.status = 'Pass';
          } else if (element.document_type === 'บทที่3') {
            ListDocument.ce03.status = 'Pass';
          } else if (element.document_type === 'บทที่4') {
            ListDocument.ce04.status = 'Pass';
          } else if (element.document_type === 'บทที่5') {
            ListDocument.ce05.status = 'Pass';
          } else if (element.document_type === 'บทที่6') {
            ListDocument.ce06.status = 'Pass';
          }
        }
      });
    };
    separateCE(documentResult.results);
    console.log(ListDocument)
    if (projectResults.results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        PreprojectData: projectResults.results,
        PreprojectSubAdviser: subadviserResults.results,
        PreprojectStudent: studentResults.results,
        PreprojectCommittee: committeeResult.results,
        PreprojectDocument: ListDocument,
        message: 'SearchProject Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: 'Project not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}

// project document
async function getListInOneDocumentsProject(project_id, document_type) {
  try {
    const QueryDocumentList = `SELECT * FROM 
                                projects_documents
                                WHERE project_id = ${project_id} AND document_type = '${document_type}'
                                AND document_status != 0 
                                ORDER BY created_date_time DESC
                                `;

    console.log('Query is: ', QueryDocumentList);
    const { results } = await poolQuery(QueryDocumentList);



    if (results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        documentList: results,
        index: results.length,
        message: 'Search Document Success',
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        index: 0,
        message: 'Document not found',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // pool.end();
  }
}



module.exports.searchingRepo = {
  getAllCurriculums: getAllCurriculums,
  getAllSubjectInCurriculums: getAllSubjectInCurriculums,
  getAllSubjectYears: getAllSubjectYears,
  getAllSectionInYear: getAllSectionInYear,
  getAllListInstructors: getAllListInstructors,
  getAllListStudents: getAllListStudents,
  getAllPreprojects: getAllPreprojects,
  getonePreproject: getonePreproject,
  getListInOneDocuments: getListInOneDocuments,
  getAllProjects:getAllProjects,
  getoneProjects:getoneProjects,
  getListInOneDocumentsProject:getListInOneDocumentsProject,
  getSubjectProjectInCurriculums:getSubjectProjectInCurriculums
};
