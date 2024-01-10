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

const pool = mysql.createPool(config);
const poolQuery = util.promisify(pool.query).bind(pool);

// API Update preproject document
async function approvePreprojectDocument(document_id) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = ` UPDATE preprojects_documents
    SET document_status = '2'
    WHERE document_id = '${document_id}'
            `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {
      
      if (results) {
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          meassge:"Update Success"
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

// API Update Project Document
async function approveprojectDocument(document_id) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = ` UPDATE projects_documents
    SET document_status = '2'
    WHERE document_id = '${document_id}'
            `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {
      
      if (results) {
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          meassge:"Update Success"
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
          meassge:"Update Success"
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
          meassge:"Update Success"
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

module.exports.instructorRepo = {
  approvePreprojectDocument: approvePreprojectDocument,
  approveprojectDocument: approveprojectDocument,
  updateProjectStatus: updateProjectStatus,
  updatePreprojectStatus: updatePreprojectStatus
};