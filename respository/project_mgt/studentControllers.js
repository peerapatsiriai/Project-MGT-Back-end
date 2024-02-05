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

async function getallMypreprojectandproject(student_id) {
  try {

    const searchMypreprojectQuery = `
        SELECT * FROM preprojects AS pre 
        INNER JOIN preprojects_studens AS std 
        ON std.preproject_id = pre.preproject_id
        INNER JOIN preproject_status AS stu
        ON pre.project_status = stu.status_id
        WHERE  std.studen_id = '${student_id}' AND std.status = '1' AND pre.is_deleted = '0'
    `;
    const preprojectlist = await poolQuery(searchMypreprojectQuery);



    const searchMyprojectQuery = `
        SELECT * FROM projects AS pro
        INNER JOIN projects_students AS std 
        ON std.project_id = pro.project_id
        INNER JOIN project_status AS stu
        ON pro.project_status = stu.status_id
        WHERE  std.studen_id = '${student_id}' AND std.status = '1' AND pro.is_deleted = '0'
    `;
    const projectlist = await poolQuery(searchMyprojectQuery);



    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      preprojectlist,
      projectlist
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

async function registerNewPreproject(
  section_id,
  preproject_name_th,
  preproject_name_eng,
  project_code,
  project_status,
  project_type,
  created_by,
  studen_id,
  adviser,
  subadviser
) {
  try {
    let preproject_id;
    const insertPreprojectQuery = `INSERT INTO preprojects (preproject_name_th, preproject_name_eng, project_code, project_type, project_status, created_date_time, last_updated, created_by, is_deleted) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, 0)`;
    const insertPreprojectinjointable = `INSERT INTO preproject_in_section (section_id, preproject_id, created_datetime) VALUES (?, ?, NOW())`
    const insertStudentQuery = `INSERT INTO preprojects_studens (preproject_id, studen_id, created_date_time, last_update) VALUES (?, ?, NOW(), NOW())`;
    const insertAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status, created_date_time, last_update) VALUES (?, ?, "1", NOW(), NOW())`;
    const insertSubAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status, created_date_time, last_update) VALUES (?, ?, "2", NOW(), NOW())`;
    //const insertCommitteeQuery = `INSERT INTO preprojects_committees (preproject_id, instructor_id, created_date_time, last_update) VALUES (?, ?, NOW(), NOW())`;

    // Insert the new preproject and await the result
    const insertResult = await poolQuery(insertPreprojectQuery, [
      preproject_name_th,
      preproject_name_eng,
      project_code,
      project_type,
      project_status,
      created_by,
    ]);
    console.log('Query is: ', insertPreprojectQuery, [
      preproject_name_th,
      preproject_name_eng,
      project_code,
      project_type,
      project_status,
      created_by,
    ]);

    // If the insert failed, throw an error
    if (!insertResult || !insertResult.insertId) {
      throw new Error('Failed to insert preproject.');
    }

    preproject_id = insertResult.insertId;

    // Insert new preproject to join table
    await poolQuery(insertPreprojectinjointable, [section_id, preproject_id]);

    // Insert the students Preproject
    for (let student of studen_id) {
      await poolQuery(insertStudentQuery, [preproject_id, student]);
      console.log('Query is: ', insertStudentQuery, [preproject_id, student]);
    }

    // insert the adviser
    await poolQuery(insertAdviserQuery, [preproject_id, adviser]);
    console.log('Query is: ', insertAdviserQuery, [preproject_id, adviser]);

    if (subadviser.length > 0) {
      for (let subadviserid of subadviser) {
        await poolQuery(insertSubAdviserQuery, [preproject_id, subadviserid]);
        console.log('Query is: ', insertSubAdviserQuery, [
          preproject_id,
          subadviserid,
        ]);
      }
    }

    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      preproject_id: preproject_id,
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

async function projectRecommend() {
  try {

    const searchprojectQuery = `
    WITH RankedProjects AS (
      SELECT
        pro.*,
        stu.status_name,
        stu.status_active,
        insec.pro_sec_id,
        insec.created_datetime,
        sec.subject_id,
        sec.section_name,
        sec.sem_year,
        sec.semester_order,
        sec.sec_status,
        sub.subject_code,
        sub.subject_type,
        sub.subject_name_th,
        sub.subject_name_en,
        sub.credit_qty,
        cur.curriculum_id,
        cur.curriculum_name_th,
        cur.curriculum_name_en,
        cur.curriculum_year,
        tea.teacher_id,
        tea.prefix,
        tea.first_name,
        tea.last_name,
        type.type_name,
        ROW_NUMBER() OVER (PARTITION BY pro.project_id ORDER BY pro.created_date_time DESC) AS RowNum
      FROM
        projects AS pro
        INNER JOIN project_status AS stu ON pro.project_status = stu.status_id
        INNER JOIN project_in_section AS insec ON insec.project_id = pro.project_id
        INNER JOIN year_sem_sections AS sec ON insec.section_id = sec.section_id
        INNER JOIN project_mgt_subjects AS sub ON sec.subject_id = sub.subject_id
        INNER JOIN curriculums AS cur ON sub.curriculum_id = cur.curriculum_id
        INNER JOIN projects_advisers AS proad ON proad.project_id = pro.project_id
        INNER JOIN biographical_teacher AS tea ON proad.instructor_id = tea.teacher_id
        INNER JOIN project_types AS type ON pro.project_type = type.type_id
      WHERE
        pro.project_status = '6' AND pro.is_deleted = '0'
    )
    SELECT *
    FROM RankedProjects
    WHERE RowNum = 1
    ORDER BY created_date_time DESC;
    `;


    const projectlist = await poolQuery(searchprojectQuery);



    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      projectlist
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

async function myPreprojectdocument(preproject_id) {
  try {

    const searchprojectQuery = `
    SELECT 
    preprojects.preproject_id,
    preprojects.preproject_name_th,
    preprojects.project_code,
    project_status,
    status_name,
    COALESCE(ce01.document_id, 'no') AS ce01_document_id,
    COALESCE(ce01.document_status, 'no') AS ce01_status,
    COALESCE(ce02.document_id, 'no') AS ce02_document_id,
    COALESCE(ce02.document_status, 'no') AS ce02_status,
    COALESCE(ce03.document_id, 'no') AS ce03_document_id,
    COALESCE(ce03.document_status, 'no') AS ce03_status,
    COALESCE(ce04.document_id, 'no') AS ce04_document_id,
    COALESCE(ce04.document_status, 'no') AS ce04_status,
    COALESCE(ce05.document_id, 'no') AS ce05_document_id,
    COALESCE(ce05.document_status, 'no') AS ce05_status,
    COALESCE(ce06.document_id, 'no') AS ce06_document_id,
    COALESCE(ce06.document_status, 'no') AS ce06_status
    FROM preprojects
    LEFT JOIN preprojects_documents ce01 ON ce01.preproject_id = preprojects.preproject_id AND ce01.document_type = 'CE01'
    LEFT JOIN preprojects_documents ce02 ON ce02.preproject_id = preprojects.preproject_id AND ce02.document_type = 'CE02'
    LEFT JOIN preprojects_documents ce03 ON ce03.preproject_id = preprojects.preproject_id AND ce03.document_type = 'CE03'
    LEFT JOIN preprojects_documents ce04 ON ce04.preproject_id = preprojects.preproject_id AND ce04.document_type = 'CE04'
    LEFT JOIN preprojects_documents ce05 ON ce05.preproject_id = preprojects.preproject_id AND ce05.document_type = 'CE05'
    LEFT JOIN preprojects_documents ce06 ON ce06.preproject_id = preprojects.preproject_id AND ce06.document_type = 'CE06'
    LEFT JOIN preproject_status ON preproject_status.status_id = preprojects.project_status
    WHERE preprojects.preproject_id = '${preproject_id}'
    `;
    const documentlist = await poolQuery(searchprojectQuery);

    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      documentlist
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

async function myProjectdocument(project_id) {
  try {

    const searchprojectQuery = `
    SELECT 
    projects.project_id,
    projects.project_name_th,
    projects.project_code,
    project_status,
    status_name,
    COALESCE(ch01.document_id, 'no') AS ch01_document_id,
    COALESCE(ch01.document_status, 'no') AS ch01_status,
    COALESCE(ch02.document_id, 'no') AS ch02_document_id,
    COALESCE(ch02.document_status, 'no') AS ch02_status,
    COALESCE(ch03.document_id, 'no') AS ch03_document_id,
    COALESCE(ch03.document_status, 'no') AS ch03_status,
    COALESCE(ch04.document_id, 'no') AS ch04_document_id,
    COALESCE(ch04.document_status, 'no') AS ch04_status,
    COALESCE(ch05.document_id, 'no') AS ch05_document_id,
    COALESCE(ch05.document_status, 'no') AS ceh5_status
    FROM projects
    LEFT JOIN projects_documents ch01 ON ch01.project_id = projects.project_id AND ch01.document_type = 'CH01'
    LEFT JOIN projects_documents ch02 ON ch02.project_id = projects.project_id AND ch02.document_type = 'CH02'
    LEFT JOIN projects_documents ch03 ON ch03.project_id = projects.project_id AND ch03.document_type = 'CH03'
    LEFT JOIN projects_documents ch04 ON ch04.project_id = projects.project_id AND ch04.document_type = 'CH04'
    LEFT JOIN projects_documents ch05 ON ch05.project_id = projects.project_id AND ch05.document_type = 'CH05'
    LEFT JOIN project_status ON project_status.status_id = projects.project_status
    WHERE projects.project_id = '${project_id}'
    `;
    const documentlist = await poolQuery(searchprojectQuery);

    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      documentlist
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

async function project_potentials(project_id, subject_id, weight) {
  try {
    // ตรวจสอบว่ามีการแนะนำวิชาเกิน 2 วิชาแล้วหรือยัง
    const checkQuery = `
    SELECT * FROM project_potentials WHERE project_id = ${project_id}
    `;
    const length_potentials =  await poolQuery(checkQuery);

    if (length_potentials.length < 2) {

      const insertQuery = `
      INSERT INTO project_potentials 
      (project_id, subject_id, weight, is_deleted, created_datetime)
      VALUES
      ('${project_id}', '${subject_id}', '${weight}', 0, NOW());
      `;
      await poolQuery(insertQuery);

      // Return success
      return {
        statusCode: 200,
        returnCode: 0,
        message: 'Insert Success'
      };
    } else {
      // Return success
      return {
        statusCode: 412,
        returnCode: 0,
        message: "Can't Add New Potentials In This Project"
      };
    }

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

async function getProjectPotentialBySubjectIDList(subject_id) {
  try {

    const fineQuery = `
      SELECT DISTINCT pro.project_id, project_code, project_name_th, project_name_eng, type_name, created_date_time
      FROM project_potentials AS po
      INNER JOIN projects AS pro
      ON pro.project_id = po.project_id
      INNER JOIN project_types AS ty
      ON ty.type_id = pro.project_type
      WHERE po.subject_id = "${subject_id}" AND pro.project_status = "6"
    `;
    let result = await poolQuery(fineQuery);

    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      result: result,
    };
  } catch (error) {
    // Handle errors
    console.error(error);
    return {
      statusCode: 500,
      returnCode: 1,
      error: "Internal Server Error",
    };
  }

}




module.exports.studentRepo = {
  getallMypreprojectandproject: getallMypreprojectandproject,
  registerNewPreproject: registerNewPreproject,
  projectRecommend: projectRecommend,
  myPreprojectdocument: myPreprojectdocument,
  myProjectdocument: myProjectdocument,
  project_potentials: project_potentials,
  getProjectPotentialBySubjectIDList: getProjectPotentialBySubjectIDList
};
