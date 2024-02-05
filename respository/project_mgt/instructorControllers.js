var mysql = require('mysql');
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];
const util = require('util');
const { get } = require('request');
/////////////////////////////////////////////////////////////////////////////////

//--------------- jwt -----------------
var jwt = require('jsonwebtoken');
const { check } = require('prisma');

const pool = mysql.createPool(config);
const poolQuery = util.promisify(pool.query).bind(pool);

var PreprojectObjectTemplate = {
  "preproject_id": '',
  "preproject_code": "",
  "preproject_name": '',
  "preproject_status": '',
  "CE01": {
    "document_id": "no",
    "document_status": "no"
  },

  "CE02": {
    "document_id": "no",
    "document_status": "no"
  },

  "CE03": {
    "document_id": "no",
    "document_status": "no"
  },
  "CE04": {
    "document_id": "no",
    "document_status": "no"
  },
  "CE05": {
    "document_id": "no",
    "document_status": "no"
  },
  "CE06": {
    "document_id": "no",
    "document_status": "no"
  },


}

// API Aprove preproject document
async function approvePreprojectDocument(document_id) {
  try {
    
    FineDataDocumentQuery = ` 
    SELECT * FROM preprojects_documents WHERE document_id = '${document_id}'`;

    const document_Result = await poolQuery(FineDataDocumentQuery);

    const document_type = document_Result[0].document_type
    const preproject_id = document_Result[0].preproject_id

    const UpdateDocumentQuery = ` UPDATE preprojects_documents
    SET document_status = '2'
    WHERE preproject_id = '${preproject_id}' AND document_type = '${document_type}' `
    await poolQuery(UpdateDocumentQuery);


    return {
      statusCode: 200,
      returnCode: 1,
      meassge:`Updated All ${document_type} In Preproject ${preproject_id} Success`
    }
  } catch (error) {
    console.log(error);
    return error
  } finally {
    // Make sure to release the database connection here if you're using a connection pool
    // pool.end();
  }
}

// API Aprove Project Document
async function approveprojectDocument(document_id) {
  try {
    
    FineDataDocumentQuery = ` 
    SELECT * FROM projects_documents WHERE document_id = '${document_id}'`;

    const document_Result = await poolQuery(FineDataDocumentQuery);

    const document_type = document_Result[0].document_type
    const project_id = document_Result[0].project_id

    const UpdateDocumentQuery = ` UPDATE projects_documents
    SET document_status = '2'
    WHERE project_id = '${project_id}' AND document_type = '${document_type}' `
    await poolQuery(UpdateDocumentQuery);


    return {
      statusCode: 200,
      returnCode: 1,
      meassge:`Updated All ${document_type} In Project ${project_id} Success`
    }
  } catch (error) {
    console.log(error);
    return error
  } finally {
    // Make sure to release the database connection here if you're using a connection pool
    // pool.end();
  }
}

// Up date Prerpocjet Statut
async function updatePreprojectStatus(preproject_id, preprojectStatus) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = ` UPDATE preprojects
    SET project_status = '${preprojectStatus}'
    WHERE preproject_id = '${preproject_id}'
            `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {

      if (results) {
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          meassge: "Update Success"
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 500,
          returnCode: 11,
        });
      }
    });
  });
}

// Up date Procjet Statut
async function updateProjectStatus(project_id, projectStatus) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = ` UPDATE projects
    SET project_status = '${projectStatus}'
    WHERE project_id = '${project_id}'
            `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {

      if (results) {
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          meassge: "Update Success"
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 500,
          returnCode: 11,
        });
      }
    });
  });
}

// Get all Preproject And Document list by section id
async function displayPreprojectAndDoucmentInOneSection(section_id) {
  try {
    Query = ` 
    SELECT  
    preprojects.preproject_id,
    MAX(preprojects.preproject_name_th) AS preproject_name_th,
    MAX(preprojects.project_code) AS project_code,
    MAX(preprojects.project_status) AS project_status,
    MAX(preproject_status.status_name) AS status_name,
    MAX(COALESCE(ce01.document_id, 'no')) AS ce01_document_id,
    MAX(COALESCE(ce01.document_status, 'no')) AS ce01_status,
    MAX(COALESCE(ce02.document_id, 'no')) AS ce02_document_id,
    MAX(COALESCE(ce02.document_status, 'no')) AS ce02_status,
    MAX(COALESCE(ce03.document_id, 'no')) AS ce03_document_id,
    MAX(COALESCE(ce03.document_status, 'no')) AS ce03_status,
    MAX(COALESCE(ce04.document_id, 'no')) AS ce04_document_id,
    MAX(COALESCE(ce04.document_status, 'no')) AS ce04_status,
    MAX(COALESCE(ce05.document_id, 'no')) AS ce05_document_id,
    MAX(COALESCE(ce05.document_status, 'no')) AS ce05_status,
    MAX(COALESCE(ce06.document_id, 'no')) AS ce06_document_id,
    MAX(COALESCE(ce06.document_status, 'no')) AS ce06_status
    FROM preprojects
    LEFT JOIN preprojects_documents ce01 ON ce01.preproject_id = preprojects.preproject_id AND ce01.document_type = 'CE01'
    LEFT JOIN preprojects_documents ce02 ON ce02.preproject_id = preprojects.preproject_id AND ce02.document_type = 'CE02'
    LEFT JOIN preprojects_documents ce03 ON ce03.preproject_id = preprojects.preproject_id AND ce03.document_type = 'CE03'
    LEFT JOIN preprojects_documents ce04 ON ce04.preproject_id = preprojects.preproject_id AND ce04.document_type = 'CE04'
    LEFT JOIN preprojects_documents ce05 ON ce05.preproject_id = preprojects.preproject_id AND ce05.document_type = 'CE05'
    LEFT JOIN preprojects_documents ce06 ON ce06.preproject_id = preprojects.preproject_id AND ce06.document_type = 'CE06'
    LEFT JOIN preproject_in_section ON preproject_in_section.preproject_id = preprojects.preproject_id AND preproject_in_section.section_id = '${section_id}'
    LEFT JOIN preproject_status ON preproject_status.status_id = preprojects.project_status
    WHERE preproject_in_section.section_id = '${section_id}' AND preprojects.is_deleted = 0
    GROUP BY preprojects.preproject_id;
    
  `;

    const document_Result = await poolQuery(Query);
    return {
      statusCode: 200,
      returnCode: 1,
      document_Result
    }
  } catch (error) {
    console.log(error);
    return error
  } finally {
    // Make sure to release the database connection here if you're using a connection pool
    // pool.end();
  }
}

// Get all Project And Document list by section id
async function displayProjectAndDoucmentInOneSection(section_id) {
  try {
    
    Query = ` 
    SELECT 
    projects.project_id,
    MAX(projects.project_name_th) AS project_name_th,
    MAX(projects.project_code) AS project_code,
    MAX(projects.project_status) AS project_status,
    MAX(project_status.status_name) AS status_name,
    MAX(COALESCE(ch01.document_id, 'no')) AS ch01_document_id,
    MAX(COALESCE(ch01.document_status, 'no')) AS ch01_status,
    MAX(COALESCE(ch02.document_id, 'no')) AS ch02_document_id,
    MAX(COALESCE(ch02.document_status, 'no')) AS ch02_status,
    MAX(COALESCE(ch03.document_id, 'no')) AS ch03_document_id,
    MAX(COALESCE(ch03.document_status, 'no')) AS ch03_status,
    MAX(COALESCE(ch04.document_id, 'no')) AS ch04_document_id,
    MAX(COALESCE(ch04.document_status, 'no')) AS ch04_status,
    MAX(COALESCE(ch05.document_id, 'no')) AS ch05_document_id,
    MAX(COALESCE(ch05.document_status, 'no')) AS ch05_status
FROM projects
LEFT JOIN projects_documents ch01 ON ch01.project_id = projects.project_id AND ch01.document_type = 'CH01'
LEFT JOIN projects_documents ch02 ON ch02.project_id = projects.project_id AND ch02.document_type = 'CH02'
LEFT JOIN projects_documents ch03 ON ch03.project_id = projects.project_id AND ch03.document_type = 'CH03'
LEFT JOIN projects_documents ch04 ON ch04.project_id = projects.project_id AND ch04.document_type = 'CH04'
LEFT JOIN projects_documents ch05 ON ch05.project_id = projects.project_id AND ch05.document_type = 'CH05'
LEFT JOIN project_in_section ON project_in_section.project_id = projects.project_id AND project_in_section.section_id = '${section_id}'
LEFT JOIN project_status ON project_status.status_id = projects.project_status
WHERE project_in_section.section_id = ${section_id} AND projects.is_deleted = 0
GROUP BY projects.project_id;

  `;

    const document_Result = await poolQuery(Query);
    return {
      statusCode: 200,
      returnCode: 1,
      document_Result
    }
  } catch (error) {
    console.log(error);
    return error
  } finally {
    // Make sure to release the database connection here if you're using a connection pool
    // pool.end();
  }
}



module.exports.instructorRepo = {
  approvePreprojectDocument: approvePreprojectDocument,
  approveprojectDocument: approveprojectDocument,
  updateProjectStatus: updateProjectStatus,
  updatePreprojectStatus: updatePreprojectStatus,
  displayPreprojectAndDoucmentInOneSection: displayPreprojectAndDoucmentInOneSection,
  displayProjectAndDoucmentInOneSection:displayProjectAndDoucmentInOneSection
};