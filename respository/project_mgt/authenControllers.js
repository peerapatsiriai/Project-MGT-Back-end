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

async function login(username, password) {
    try {
        // Fetch user's hashed password from the database
        const getPasswordQuery = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
        const rows = await poolQuery(getPasswordQuery, [username, password]);
        
        if (rows.length === 0) {
            return {
                statusCode: 401,
                returnCode: 1,
                message: 'User not found or Invalid password' ,
            };
        }
        return {
            statusCode: 200,
            returnCode: 0,
            message: 'Login successfully',
            data:rows[0]
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


  module.exports.authenRepo = {
    login:login
  };