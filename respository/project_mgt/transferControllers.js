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
    console.log(fild_Curriculum_Subject_Query);
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
    console.log(fild_Project_Subject_Id_Query);
    const subject_Project_Result = await poolQuery(fild_Project_Subject_Id_Query)
    const Project_subject_PK = subject_Project_Result[0].subject_id;
    
    const get_all_Year_Query = `SELECT DISTINCT sem_year FROM year_sem_sections WHERE subject_id = ${Project_subject_PK} ORDER BY sem_year`
    console.log(get_all_Year_Query);
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
async function transferproject(preproject_id, section_id) {

  console.log("Transfer Pre-project To Project");

  try {


    // ตรวจสอบว่า Pre-project ที่จะโอนเป็น Projet แล้วหรือยัง
    const checkProjectQuery = `SELECT * FROM projects WHERE preproject_id = ${preproject_id}`
    const checkProject = await poolQuery(checkProjectQuery)
    if(checkProject.length > 0){
      return {
        statusCode: 400,
        message: "Can't Transfer this because pre-projech have transfered",
      };
    }


    // ย้ายข้อมูล Preproject ลงใน DB Project
    const TransferDataQuery = 
    `
      INSERT INTO projects (preproject_id, section_id,project_name_th, project_name_eng, project_code, project_status, created_date_time, created_by, last_updated)
      SELECT preproject_id, ${section_id},preproject_name_th, preproject_name_eng, project_code, '1',now(), 'Admin', NOW()
      FROM preprojects
      WHERE preproject_id = ${preproject_id};
    `;
    console.log(TransferDataQuery);
    await poolQuery(TransferDataQuery);

    // รับค่า PK ข้อ New Project ที่บันทึก
    const FildPrimarykeyOfNewProjectQuery = 
    `
      SELECT project_id FROM projects WHERE preproject_id = ${preproject_id} 
    `
    console.log(FildPrimarykeyOfNewProjectQuery);
    const FildProjectResult = await poolQuery(FildPrimarykeyOfNewProjectQuery)
    const project_id = FildProjectResult[0].project_id
    
    // ย้ายนักศึกษา
    const TransferStudentsQuery = 
    `
      INSERT INTO projects_students (studen_preproject_id, project_id, studen_id, status, created_date_time, last_update)
      SELECT pre.studen_preproject_id, ${project_id}, pre.studen_id, status, now(), now()
      FROM preprojects_studens AS pre
      WHERE preproject_id = ${preproject_id} ANd status != 0;
    `
    console.log(TransferStudentsQuery);
    await poolQuery(TransferStudentsQuery)

    // ย้ายอาจารย์
    const TransferAdviserQuery = 
    `
      INSERT INTO projects_advisers (preproject_adviser_id, project_id, instructor_id, adviser_status, created_date_time, last_update)
      SELECT preproject_id, ${project_id}, instructor_id, adviser_status, NOW(), NOW()
      FROM preprojects_advisers
      WHERE preproject_id = ${preproject_id} ANd adviser_status != 0;
    `
    console.log(TransferAdviserQuery);
    await poolQuery(TransferAdviserQuery)


    // ย้ายกรรมการ
    const TransferCommitteesQuery = 
    `
      INSERT INTO projects_committees (preproject_committee_id, project_id, instructor_id, committee_status, created_date_time, last_update)
      SELECT preproject_id, ${project_id} ,instructor_id ,committee_status ,NOW(), NOW()
      FROM preprojects_committees
      WHERE preproject_id = ${preproject_id} ANd committee_status != 0;
    `
    console.log(TransferCommitteesQuery);
    await poolQuery(TransferCommitteesQuery)
    // เปลี่ยนสถานะ Pre-project ให้เสร็จแล้ว
    
    if (1 > 0) {
      return {
        statusCode: 200,
        returnCode: 1,
        message: 'Transfer Success',
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports.transferRepo = {
  searchYearInOnePreproject:searchYearInOnePreproject,
  searchAllSecInOneProjectSubject:searchAllSecInOneProjectSubject,
  transferproject:transferproject
};
