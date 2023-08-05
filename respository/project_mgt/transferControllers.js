var mysql = require('mysql');
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];
const util = require('util');
const { get } = require('request');
/////////////////////////////////////////////////////////////////////////////////

const pool = mysql.createPool(config);
const poolQuery = util.promisify(pool.query).bind(pool);

async function searchYearInOnePreproject(preproject_id) {
  console.log("Transfer Pre-project Get Year");
  try {
    // หาหลักสูตร และ วิชา 
    // เพื่อเอาไปหาว่าในหลักสูตรตัวนี้มีวิชาโปรเจครหหัสอะไร
    // แล้วจึงนำไปหาปีทั้งหมด
    const fild_Curriculum_Subject_Query = `
    SELECT DISTINCT sub.subject_id, cur.curriculum_id
    FROM preprojects AS pre
    INNER JOIN year_sem_sections AS sec
    ON pre.section_id = sec.section_id
    INNER JOIN subjects AS sub
    ON sub.subject_id = sec.subject_id
    INNER JOIN curriculums AS cur
    ON cur.curriculum_id = sub.curriculum_id
    WHERE pre.preproject_id = ${preproject_id};
    `;

    // Fild Subject Project ID IN Curriculum
    const curriculumSubjectResult = await poolQuery(fild_Curriculum_Subject_Query);

    let curriculum_id = curriculumSubjectResult[0].curriculum_id
    let preproject_Subject_id = curriculumSubjectResult[0].subject_id
    
    const fild_Project_Subject_Id_Query = `
    SELECT DISTINCT sub.subject_id
    FROM curriculums AS cur
    INNER JOIN subjects AS sub
    ON cur.curriculum_id = sub.curriculum_id
    WHERE cur.curriculum_id = ${curriculum_id} AND sub.subject_id != ${preproject_Subject_id};
    `
    const subject_Project_Result = await poolQuery(fild_Project_Subject_Id_Query)
    
    const Project_subject_PK = subject_Project_Result[0].subject_id;
    
    const get_all_Year_Query = `SELECT DISTINCT sem_year FROM year_sem_sections WHERE subject_id = ${Project_subject_PK} ORDER BY sem_year`
    const all_year_result = await poolQuery(get_all_Year_Query);

    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      all_years: all_year_result,
      project_subject_id: Project_subject_PK
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      returnCode: 11,
      message: 'Server Error',
    };
  } finally {
    // Make sure to release the pool connection when done
    // pool.end();
  }
}

async function searchAllSecInOneProjectSubject(subject_project_id, year) {
  console.log("Transfer Pre-project Get Sec");
  try {
    const Query = `SELECT * FROM year_sem_sections WHERE subject_id = ${subject_project_id} AND sem_year = ${year}`;
    console.log(Query);
    const sec_Result = await poolQuery(Query);
    if (sec_Result.length > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        data: sec_Result,
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


// transfer pre-project

// upload document

module.exports.transferRepo = {
  searchYearInOnePreproject:searchYearInOnePreproject,
  searchAllSecInOneProjectSubject:searchAllSecInOneProjectSubject
};
