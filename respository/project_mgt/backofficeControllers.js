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
    const insertPreprojectQuery = `INSERT INTO preprojects (section_id, preproject_name_th, preproject_name_eng, project_code, project_type, project_status, created_date_time, last_updated, created_by) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)`;
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
  
    for(let subadviserid of subadviser){
      await poolQuery(insertSubAdviserQuery, [preproject_id, subadviserid]);
      console.log("Query is: ", insertSubAdviserQuery, [preproject_id, subadviserid]);
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



module.exports.backofficeRepo = {
  insertNewPreProject:insertNewPreProject
};
