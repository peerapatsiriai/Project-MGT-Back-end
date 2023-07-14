var mysql = require("mysql");
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();
const env = require("../../env.js");
const config = require("../../dbconfig.js")[env];

/////////////////////////////////////////////////////////////////////////////////
async function getAllPreprojects() {
  var Query;
  var pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = `SELECT * FROM preprojects`;
    console.log("Query1 is: ", Query);

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
          message: "SearchAllCurriculum Success",
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
          message: "Curriculum not found",
        });
      }
    });
  });
}




module.exports.DisplayProjectRepo = {
  getAllPreprojects:getAllPreprojects
};
