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

// API authenticationteacher
async function authenticationteacher(username, password) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = `SELECT id_rmutl , _email FROM biographical_teacher WHERE _email = '${username}' AND id_rmutl = '${password}' `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {
      if (results[0] !== undefined) {
        // console.log('results is', results[0]);
        const userRole = 'อาจารย์';
        var token = jwt.sign(
          { data: username, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret',
        );
        // console.log('tokenUser : ' + token);
        var tokenRole = jwt.sign(
          { dataRole: userRole, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret_role',
        );
        // console.log('tokenUserRole : ' + tokenRole);
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          jwt: token,
          jwtRole: tokenRole,
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
        });
      }
    });
  });
}

async function authenticationteacherproject(username, password) {
  if (username === 'nisan' && password === '1150') {
    const token = jwt.sign(
      { data: 'Project teacher', iat: Math.floor(Date.now() / 1000) - 30 },
      'jwt_secret'
    );

    const userRole = 'project-teacher'; // Define the user role here

    const tokenRole = jwt.sign(
      { dataRole: userRole, iat: Math.floor(Date.now() / 1000) - 30 },
      'jwt_secret_role'
    );

    return {
      statusCode: 200,
      returnCode: 1,
      jwt: token,
      jwtRole: tokenRole,
    };
  } else {
    return {
      statusCode: 404,
      returnCode: 11,
    };
  }
}

async function authenticationadmin(username, password) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = `SELECT off_user , off_pass FROM officer WHERE off_user = '${username}' AND off_pass = '${password}' `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {
      if (results[0] !== undefined) {
        // console.log('results is', results[0]);
        const userRole = 'admin';
        var token = jwt.sign(
          { data: username, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret',
        );
        // console.log('tokenUser : ' + token);
        var tokenRole = jwt.sign(
          { dataRole: userRole, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret_role',
        );
        // console.log('tokenUserRole : ' + tokenRole);
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          jwt: token,
          jwtRole: tokenRole,
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
        });
      }
    });
  });
}

async function authenticationstudent(username, password) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = `SELECT id_rmutl , birthday FROM biographical_student WHERE id_rmutl = '${username}' AND birthday = '${password}' `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {
      if (results[0] !== undefined) {
        // console.log('results is', results[0]);
        const userRole = 'นักศึกษา';
        var token = jwt.sign(
          { data: username, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret',
        );
        // console.log('tokenUser : ' + token);
        var tokenRole = jwt.sign(
          { dataRole: userRole, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret_role',
        );
        // console.log('tokenUserRole : ' + tokenRole);
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          jwt: token,
          jwtRole: tokenRole,
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
        });
      }
    });
  });
}

async function verifyauthentication(token, tokenRole) {
  let role;
  let username;

  console.log('tokenRole : ', tokenRole);
  try {
    jwt.verify(token, 'jwt_secret', function (err, decoded) {
      username = decoded.data;
      // console.log('username' + decoded.data);
    });
    jwt.verify(tokenRole, 'jwt_secret_role', function (err, decoded) {
      role = decoded.dataRole;
      console.log(decoded);
      // console.log('role : ' + role);
    });
    return {
      returnCode: '1',
      User: username,
      stateRole: role,
    };
  } catch (err) {
    return { message: err, returnCode: '0' };
  }
}


module.exports.authenRepo = {
  authenticationteacher: authenticationteacher,
  authenticationteacherproject: authenticationteacherproject,
  authenticationadmin: authenticationadmin,
  authenticationstudent: authenticationstudent,
  verifyauthentication: verifyauthentication
};