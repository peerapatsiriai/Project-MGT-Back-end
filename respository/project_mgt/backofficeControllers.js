var mysql = require("mysql");
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();
const env = require("../../env.js");
const config = require("../../dbconfig.js")[env];
const util = require('util');
const { get } = require("request");
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
    const insertStudentQuery = `INSERT INTO preprojects_studens (preproject_id, studen_id) VALUES (?, ?)`;
    const insertAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status) VALUES (?, ?, "1")`;
    const insertSubAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status) VALUES (?, ?, "2")`;
    const insertCommitteeQuery = `INSERT INTO preprojects_committees (preproject_id, instructor_id) VALUES (?, ?)`;

    // Insert the new preproject and await the result
    const insertResult = await poolQuery(insertPreprojectQuery, [
      section_id,
      preproject_name_th,
      preproject_name_eng,
      project_code,
      project_type,
      project_status,
      created_by
    ]);
    console.log("Query is: ", insertPreprojectQuery, [section_id, preproject_name_th, preproject_name_eng, project_code, project_type, project_status, created_by]);
    
    // If the insert failed, throw an error
    if (!insertResult || !insertResult.insertId) {
      throw new Error('Failed to insert preproject.');
    }

    preproject_id = insertResult.insertId;

    // Insert the students Preproject
    for (let student of studen_id) {
      await poolQuery(insertStudentQuery, [preproject_id, student]);
      console.log("Query is: ", insertStudentQuery,[preproject_id, student]);
    }
    

    // insert the adviser
    await poolQuery(insertAdviserQuery, [preproject_id, adviser]);
    console.log("Query is: ", insertAdviserQuery,[preproject_id, adviser]);

    if (subadviser.length > 0) { 
      for(let subadviserid of subadviser){
        await poolQuery(insertSubAdviserQuery, [preproject_id, subadviserid]);
        console.log("Query is: ", insertSubAdviserQuery, [preproject_id, subadviserid]);
      }
     }
    

    for(let committeeid of committee){
      await poolQuery(insertCommitteeQuery, [preproject_id, committeeid]);
      console.log("Query is: ", insertCommitteeQuery, [preproject_id, committeeid]);
    }
    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      preproject_id: preproject_id
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
    const updateResult = await poolQuery(updatePreprojectQuery, [
      section_id,
      preproject_name_th,
      preproject_name_eng,
      project_code,
      project_type,
      project_status,
      preproject_id,
    ]);

    // Clear data in relation of pre-project
    const clearStudenQuery = `DELETE FROM preprojects_studens WHERE preproject_id = ${preproject_id}`
    const clearAdviserQuery = `DELETE FROM preprojects_advisers WHERE preproject_id = ${preproject_id}`
    const clearCommitteeQuery = `DELETE FROM preprojects_committees WHERE preproject_id = ${preproject_id}`
    // Insert New Data of pre-project
    const insertStudentQuery = `INSERT INTO preprojects_studens (preproject_id, studen_id) VALUES (?, ?)`;
    const insertAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status) VALUES (?, ?, "1")`;
    const insertSubAdviserQuery = `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status) VALUES (?, ?, "2")`;
    const insertCommitteeQuery = `INSERT INTO preprojects_committees (preproject_id, instructor_id) VALUES (?, ?)`;

    await poolQuery(clearStudenQuery)
    await poolQuery(clearAdviserQuery)
    await poolQuery(clearCommitteeQuery)

    // Insert the students Preproject
    for (let student of studen_id) {
      await poolQuery(insertStudentQuery, [preproject_id, student]);
      console.log("Query is: ", insertStudentQuery,[preproject_id, student]);
    }
    

    // insert the adviser
    await poolQuery(insertAdviserQuery, [preproject_id, adviser]);
    console.log("Query is: ", insertAdviserQuery,[preproject_id, adviser]);

    if (subadviser.length > 0) { 
      for(let subadviserid of subadviser){
        await poolQuery(insertSubAdviserQuery, [preproject_id, subadviserid]);
        console.log("Query is: ", insertSubAdviserQuery, [preproject_id, subadviserid]);
      }
     }
    

    for(let committeeid of committee){
      await poolQuery(insertCommitteeQuery, [preproject_id, committeeid]);
      console.log("Query is: ", insertCommitteeQuery, [preproject_id, committeeid]);
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
  } finally {
    // Make sure to release the pool connection when done
    // pool.end();
  }
}

// upload document

module.exports.backofficeRepo = {
  insertNewPreProject:insertNewPreProject,
  updatePreProject:updatePreProject,
  deletePreproject:deletePreproject
};
