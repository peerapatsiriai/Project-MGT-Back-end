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

async function insertNewPreProject(
  section_id,
  preproject_name_th,
  preproject_name_eng,
  project_code,
  project_status,
  project_type,
  created_by,
  studen_id,
  adviser,
  subadviser,
  committee
) {
  try {
    let preproject_id;
    const insertPreprojectQuery = `INSERT INTO preprojects (section_id, preproject_name_th, preproject_name_eng, project_code, project_type, project_status, created_date_time, last_updated, created_by, is_deleted) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, 0)`;
    const insertStudentQuery = `INSERT INTO preprojects_studens (preproject_id, studen_id, created_date_time, last_update) VALUES (?, ?, NOW(), NOW())`;
    const insertAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status, created_date_time, last_update) VALUES (?, ?, "1", NOW(), NOW())`;
    const insertSubAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status, created_date_time, last_update) VALUES (?, ?, "2", NOW(), NOW())`;
    const insertCommitteeQuery = `INSERT INTO preprojects_committees (preproject_id, instructor_id, created_date_time, last_update) VALUES (?, ?, NOW(), NOW())`;

    // Insert the new preproject and await the result
    const insertResult = await poolQuery(insertPreprojectQuery, [
      section_id,
      preproject_name_th,
      preproject_name_eng,
      project_code,
      project_type,
      project_status,
      created_by,
    ]);
    console.log('Query is: ', insertPreprojectQuery, [
      section_id,
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

    for (let committeeid of committee) {
      await poolQuery(insertCommitteeQuery, [preproject_id, committeeid]);
      console.log('Query is: ', insertCommitteeQuery, [
        preproject_id,
        committeeid,
      ]);
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

async function updatePreProject(
  preproject_id,
  section_id,
  preproject_name_th,
  preproject_name_eng,
  project_code,
  project_status,
  project_type,
  studen_id,
  adviser,
  subadviser,
  committee
) {
  try {
    console.log(1150);
    const updatePreprojectQuery = `UPDATE preprojects SET section_id = ?, preproject_name_th = ?, preproject_name_eng = ?, project_code = ?, project_type = ?, project_status = ?, last_updated = NOW() WHERE preproject_id = ?`;

    // Update the preproject and await the result
    await poolQuery(updatePreprojectQuery, [
      section_id,
      preproject_name_th,
      preproject_name_eng,
      project_code,
      project_type,
      project_status,
      preproject_id,
    ]);

    // Clear data in relation of pre-project
    const clearStudenQuery = `DELETE FROM preprojects_studens WHERE preproject_id = ${preproject_id}`;
    const clearAdviserQuery = `DELETE FROM preprojects_advisers WHERE preproject_id = ${preproject_id}`;
    const clearCommitteeQuery = `DELETE FROM preprojects_committees WHERE preproject_id = ${preproject_id}`;
    // Insert New Data of pre-project
    const insertStudentQuery = `INSERT INTO preprojects_studens (preproject_id, studen_id) VALUES (?, ?)`;
    const insertAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status) VALUES (?, ?, "1")`;
    const insertSubAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status) VALUES (?, ?, "2")`;
    const insertCommitteeQuery = `INSERT INTO preprojects_committees (preproject_id, instructor_id) VALUES (?, ?)`;

    await poolQuery(clearStudenQuery);
    await poolQuery(clearAdviserQuery);
    await poolQuery(clearCommitteeQuery);

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

    for (let committeeid of committee) {
      await poolQuery(insertCommitteeQuery, [preproject_id, committeeid]);
      console.log('Query is: ', insertCommitteeQuery, [
        preproject_id,
        committeeid,
      ]);
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

async function deletePreproject(preproject_id) {
  try {
    const updateStatusQuery = `UPDATE preprojects SET is_deleted = 1 WHERE preproject_id = ?`;

    // Update the preproject status and await the result
    await poolQuery(updateStatusQuery, [preproject_id]);

    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      returnCode: 11,
      message: 'Server Error',
    };
  }
}

// upload document
async function saveDocument(preproject_id, document_type, document_name, document_owner, document_role, description) {

  try {

    const uploadDocumentQuery = 
    `
      INSERT INTO preprojects_documents 
      (preproject_id, document_type, document_name, document_owner, document_role, document_description ,document_status, created_date_time, created_by)
      VALUES (${preproject_id} ,'${document_type}' ,"${document_name}" ,'${document_owner}', '${document_role}', '${description}' ,1 ,NOW() ,NOW()) 
    `
    await poolQuery(uploadDocumentQuery)
    console.log(uploadDocumentQuery);
    
    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      returnCode: 11,
      message: 'Server Error',
    };
  }
}

async function deleteProject( project_id ) {

  try {

    const updateStatusQuery = `UPDATE projects SET is_deleted = 1 WHERE project_id = ?`;
    const findPrimarykeyOfPreproject = `SELECT preproject_id FROM projects WHERE project_id = ?`
    const updateStatusPreproject = `UPDATE preprojects SET project_status = 6 WHERE preproject_id = ?`
    // Update the preproject status and await the result
    await poolQuery(updateStatusQuery, [project_id]);
    console.log(updateStatusQuery);


    const findPKResult = await poolQuery(findPrimarykeyOfPreproject,[project_id]);
    console.log(findPrimarykeyOfPreproject);
    const preProjectPK = findPKResult[0].preproject_id


    await poolQuery(updateStatusPreproject,[preProjectPK])
    console.log(updateStatusPreproject);
    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Deleted Success',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      returnCode: 11,
      message: 'Server Error',
    };
  }
}

module.exports.backofficeRepo = {
  insertNewPreProject: insertNewPreProject,
  updatePreProject: updatePreProject,
  deletePreproject: deletePreproject,
  saveDocument:saveDocument,
  deleteProject:deleteProject
};
