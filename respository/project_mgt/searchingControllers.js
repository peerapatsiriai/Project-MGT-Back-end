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

async function getAllSubjectInCurriculums(curriculum_id) {
  try {
    const Query = `SELECT * FROM subjects WHERE curriculum_id = ${curriculum_id}`;
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
    const Query = `SELECT * FROM instructors`;
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
    const Query = `SELECT * FROM students`;
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
    const Query = `SELECT * FROM 
                   preprojects AS pe 
                   INNER JOIN year_sem_sections AS sec 
                   ON pe.section_id = sec.section_id
                   INNER JOIN subjects AS sub
                   ON sec.subject_id = sub.subject_id
                   INNER JOIN curriculums AS cur
                   ON sub.curriculum_id = cur.curriculum_id
                   WHERE is_deleted = 0 
                   ORDER BY preproject_id DESC
                   `;
    // console.log("Query1 is: ", Query);

    const { results } = await poolQuery(Query);

    if (results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        data: results,
        message: "Sear Pre-project Success",
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: "Pre-project not found",
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

    const PreprojectQuery = `SELECT * FROM
      preprojects AS pe
      INNER JOIN year_sem_sections AS sec
      ON pe.section_id = sec.section_id
      INNER JOIN subjects AS sub
      ON sec.subject_id = sub.subject_id
      INNER JOIN curriculums AS cur
      ON sub.curriculum_id = cur.curriculum_id
      INNER JOIN preprojects_advisers AS advi
      ON pe.preproject_id = advi.preproject_id AND advi.adviser_status = '1'
      INNER JOIN instructors AS ins
      ON advi.instructor_id = ins.instructor_id 
      WHERE pe.preproject_id = '${preproject_id}'
    `;
    
    const StudentQuery = `SELECT stu2.studen_id,stu2.studen_first_name, stu2.studen_last_name, stu2.studen_number 
                          FROM preprojects AS pre
                          INNER JOIN preprojects_studens AS stu
                          ON pre.preproject_id = stu.preproject_id
                          INNER JOIN students AS stu2
                          ON stu.studen_id = stu2.studen_id  
                          WHERE pre.preproject_id = '${preproject_id}'     
                          `;
    const subadviserQuery = `SELECT ins.instructor_id,ins.instructors_name FROM preprojects AS pre
                              INNER JOIN preprojects_advisers AS advi
                              ON pre.preproject_id = advi.preproject_id AND advi.adviser_status = '2'
                              INNER JOIN instructors AS ins
                              ON advi.instructor_id = ins.instructor_id
                              WHERE pre.preproject_id = '${preproject_id}'
                            `
                              

    const committeeQuery = `SELECT ins.instructor_id,ins.instructors_name FROM preprojects AS pre
                            INNER JOIN preprojects_committees AS com
                            ON pre.preproject_id = com.preproject_id
                            INNER JOIN instructors AS ins
                            ON com.instructor_id = ins.instructor_id
                            WHERE pre.preproject_id = '${preproject_id}'
    `

    const documentQuery = `SELECT DISTINCT document_type,
                           CASE WHEN document_status > 1 THEN 'complete'
                           ELSE 'not pass'
                           END AS status
                           FROM preprojects_documents
                           WHERE preproject_id = ${preproject_id} AND document_status != 0;
`
    // Execute both queries asynchronously
    // const [preprojectResults, studentResults, subadviserResults, committeeResult, documentResult] = await Promise.all([
    const [preprojectResults, studentResults, subadviserResults, committeeResult, documentResult] = await Promise.all([
      poolQuery(PreprojectQuery),
      poolQuery(StudentQuery),
      poolQuery(subadviserQuery),
      poolQuery(committeeQuery),
      poolQuery(documentQuery),
    ]);
    
    let ListDocument = { 
      ce01:{'status':'ยังไม่ผ่าน'}, 
      ce02:{'status':'ยังไม่ผ่าน'}, 
      ce03:{'status':'ยังไม่ผ่าน'}, 
      ce04:{'status':'ยังไม่ผ่าน'}, 
      ce05:{'status':'ยังไม่ผ่าน'}, 
      ce06:{'status':'ยังไม่ผ่าน'}
    }
    
    // Fine Same CE document
    const separateCE = async (data) => {
      data.forEach(element => {
        // update status
        if(element.status === "complete") {
          if (element.document_type === 'CE01') { ListDocument.ce01.status = "ผ่านแล้ว" }
          else if (element.document_type === 'CE01') { ListDocument.ce01.status = "ผ่านแล้ว" }
          else if (element.document_type === 'CE02') { ListDocument.ce02.status = "ผ่านแล้ว" }
          else if (element.document_type === 'CE03-4-G') { ListDocument.ce03.status = "ผ่านแล้ว" }
          else if (element.document_type === 'CE04') { ListDocument.ce04.status = "ผ่านแล้ว" }
          else if (element.document_type === 'CE05') { ListDocument.ce05.status = "ผ่านแล้ว" }
          else if (element.document_type === 'CE06') { ListDocument.ce06.status = "ผ่านแล้ว" }
        }
      });
    }
    separateCE(documentResult.results)

    if (preprojectResults.results.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        PreprojectData: preprojectResults.results,
        PreprojectSubAdviser: subadviserResults.results,
        PreprojectStudent: studentResults.results,
        PreprojectCommittee: committeeResult.results,
        PreprojectDocument: ListDocument,
        message: "SearchPre-project Success",
      };
    } else {
      return {
        statusCode: 404,
        returnCode: 11,
        message: "Pre-project not found",
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
};
