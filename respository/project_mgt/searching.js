var mysql = require('mysql');
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const { query } = require('express');
const config = require('../../dbconfig.js')[env];

/////////////////////////////////////////////////////////////////////////////////

async function getAllCurriculums() {
  var Query;
  var pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = `SELECT * FROM curriculums`;
    console.log('Query is: ', Query);

    pool.query(Query, function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0) {
        pool.end();
        return resolve({
          statusCode: 200,
          data: results,
          message: 'SearchAllCurriculum Success',
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          message: 'Curriculum not found',
        });
      }
    });
  });
}

async function getAllSubjectInCurriculums(curriculum_id) {
  var Query;
  var pool = mysql.createPool(config);
  
  return new Promise((resolve, reject) => {
    Query = `SELECT * FROM subjects WHERE curriculum_id = ${curriculum_id}`;
    console.log('Query is: ', Query);

    pool.query(Query, function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0) {
        pool.end();
        return resolve({
          statusCode: 200,
          data: results,
          message: 'SearchAllSubjects Success',
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 204,
          message: 'Subject not found',
        });
      }
    });
  });
}

async function getAllSubjectYears(subject_id) {
  var Query;
  var pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = `SELECT DISTINCT sem_year FROM year_sem_sections WHERE subject_id = ${subject_id} ORDER BY sem_year`;
    console.log('Query is: ', Query);

    pool.query(Query, function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0) {
        pool.end();

        return resolve({
          statusCode: 200,
          returnCode: 1,
          data: results,
          message: 'SearchAllSubjects Success',
        });
      } else {
        pool.end();

        return resolve({
          statusCode: 204,
          returnCode: 11,
          message: 'Year Not found',
        });
      }
    });
  });
}

async function getAllSectionInYear(subject_id, year) {
  var Query;
  var pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = `SELECT * FROM year_sem_sections WHERE subject_id = ${subject_id} AND sem_year = ${year}`;
    console.log('Query is: ', Query);

    pool.query(Query, function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0) {
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          data: results,
          message: 'SearchAllSubjects Success',
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 204,
          returnCode: 11,
          message: 'Year Not found',
        });
      }
    });
  });
}

async function insertNewPreProject(
  section_id,
  preproject_name_th,
  preproject_name_eng,
  project_code,
  project_status,
  project_type,
  created_by,
  studenlist,
  adviser,
  subadviser,
  committee
) {
  var Query;
  var pool = mysql.createPool(config);
  var preproject_id;

  return new Promise((resolve, reject) => {
    Query = `INSERT INTO preprojects (section_id,preproject_name_th,preproject_name_eng,project_code,project_type,project_status,created_date_time,last_updated,created_by) VALUE (${section_id},"${preproject_name_th}","${preproject_name_eng}","${project_code}","${project_type}","${project_status}",NOW(),NOW(),${created_by});`;
    console.log('Query is: ', Query);

    pool.query(Query, async function (error, results, fields) {
      if (error) {
        pool.end();
        return resolve({
          statusCode: 500,
          returnCode: 11,
          message: 'Server Error',
        });
      } else {
        pool.query(
          `SELECT * FROM preprojects WHERE preproject_name_th = "${preproject_name_th}" AND preproject_name_eng = "${preproject_name_eng}"`,
          async function (error, results, fields) {
            if (error) throw error;
            //เพิ่มข้อมูลหัวข้อแล้วเก็บค่า project id
            preproject_id = results[0].preproject_id;
            for (let i in studenlist) {
              // แยกชื่อกับ นามกุล
              let name = studenlist[i][1].split(' ');
              const fname = name[0];
              const lname = name[1];
              pool.query(
                `SELECT * FROM students WHERE studen_first_name = '${fname}' AND studen_last_name = '${lname}'`,
                async (error, results, fields) => {
                  if (error) throw error;
                  // ถ้ามีชื่อซ่ำใรระบบ
                  if (results[0]) {
                    await pool.query(
                      `INSERT INTO preprojects_studens (preproject_id, studen_id, status, created_date_time, last_update) value ('${preproject_id}','${results[0].studen_id}','1',NOW(),NOW());`
                    );
                  } else {
                    // เพิ่งชื่อลงในระบบ
                    pool.query(
                      `INSERT INTO students (studen_number, studen_first_name, studen_last_name) value ('${studenlist[i][0]}','${fname}','${lname}');`,
                      async (error, results) => {
                        if (error) throw error;
                        // เอาชื่อที่เพิ่มลงไปกลับมา เพิ่มในตารางนักศึกษากลับโปรเจค
                        pool.query(
                          `SELECT * FROM students WHERE studen_number = '${studenlist[i][0]}'`,
                          async (error, results, fields) => {
                            if (error) throw error;
                            //บันทึก ไอดีนักศึกษาใหม่ที่เพิ่มเข้ามาในระบบกับไอดีของโปรเจคที่ทำ
                            await pool.query(
                              `INSERT INTO preprojects_studens (preproject_id, studen_id, status, created_date_time, last_update) value ('${preproject_id}','${results[0].studen_id}','1',NOW(),NOW());`
                            );
                          }
                        );
                      }
                    );
                  }
                }
              );
            }
            try {
              for (let i in adviser) {
                await pool.query(
                  `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status, created_date_time, last_update) value ('${preproject_id}','${adviser[i]}','1',NOW(),NOW());`
                );
              }

              for (let i in subadviser) {
                await pool.query(
                  `INSERT INTO preprojects_advisers (preproject_id, instructor_id, adviser_status, created_date_time, last_update) value ('${preproject_id}','${subadviser[i]}','2',NOW(),NOW());`
                );
              }

              for (let i in committee) {
                await pool.query(
                  `INSERT INTO preprojects_committees (preproject_id, instructor_id, committee_status, created_date_time, last_update) value ('${preproject_id}','${committee[i]}','1',NOW(),NOW());`
                );
              }
            } catch (err) {
              return resolve({
                statusCode: 500,
                returnCode: 1,
                message: 'Error',
              });
            }
            return resolve({
              statusCode: 201,
              returnCode: 11,
              message: 'Insert Secces',
            });
          }
        );
      }
    });
  });
}

async function getAllListInstructors() {
  var Query;
  var pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = `SELECT * FROM instructors`;
    console.log('Query is: ', Query);

    pool.query(Query, function (error, results, fields) {
      if (error) throw error;
      //console.log('results1 is: ', results);

      //return resolve('OK');
      if (results.length > 0) {
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          data: results,
          message: 'SearchAllSubjects Success',
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 204,
          returnCode: 11,
          message: 'Year Not found',
        });
      }
    });
  });
}

async function getAllListStudents() {
  var Query;
  var pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = `SELECT * FROM students`;
    console.log('Query is: ', Query);

    pool.query(Query, function (error, results, fields) {
      if (error) throw error;;
      if (results.length > 0) {
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          data: results,
          message: 'SearchAllSubjects Success',
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
          message: 'Year Not found',
        });
      }
    });
  });
}

module.exports.searchingRepo = {
  getAllCurriculums: getAllCurriculums,
  getAllSubjectInCurriculums: getAllSubjectInCurriculums,
  getAllSubjectYears: getAllSubjectYears,
  getAllSectionInYear: getAllSectionInYear,
  insertNewPreProject: insertNewPreProject,
  getAllListInstructors: getAllListInstructors,
  getAllListStudents: getAllListStudents,
};
