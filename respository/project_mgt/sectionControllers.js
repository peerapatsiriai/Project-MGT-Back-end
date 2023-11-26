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

async function getAllSubjectInCurriculums(curriculum_id) {
    try {
        const Query = `SELECT * FROM project_mgt_subjects WHERE curriculum_id = ${curriculum_id}`;

        const sec_Result = await poolQuery(Query);

        if (sec_Result.length > 0) {
            return {
                statusCode: 201,
                returnCode: 1,
                data: sec_Result
            };
        } else {
            return {
                statusCode: 404,
                returnCode: 11
            };
        }
    } catch (error) {
        throw error;
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function openNewSection(subject_id, sec_name, semester, year) {
    try {
        const Query = `
        INSERT INTO year_sem_sections (subject_id, section_name, semester_order, sem_year, created_date_time, last_updated)
        VALUES ('${subject_id}', '${sec_name}', '${semester}', '${year}', NOW(), NOW())
      `;

        const sec_Result = await poolQuery(Query);
        return {
            statusCode: 201,
            returnCode: 1,
            message: 'Section created successfully',
        };
    } catch (error) {
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function sectionList() {
    try {
        const Query = `
        SELECT * FROM year_sem_sections AS sec
        INNER JOIN project_mgt_subjects AS sub
        ON sec.subject_id = sub.subject_id
        INNER JOIN curriculum AS cur
        ON cur.curriculum_id = sub.curriculum_id
        ORDER BY section_id DESC
      `;

        const sec_Result = await poolQuery(Query);

        if (sec_Result.length > 0) {
            return {
                statusCode: 201,
                returnCode: 1,
                data: sec_Result,
                message: 'Section created successfully',
            };
        } else {
            return {
                statusCode: 404,
                returnCode: 11,
                message: 'Section not created',
            };
        }
    } catch (error) {
        throw error;
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function activeSec(section_id) {
    try {
        const Query = `
        UPDATE year_sem_sections
        SET sec_status = '1', last_updated = NOW()
        WHERE section_id = ${section_id};
      `;

        const sec_Result = await poolQuery(Query);
        return {
            statusCode: 200,
            returnCode: 1,
            message: 'Section Actived',
        };
    } catch (error) {
        throw error;
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function unActiveSec(section_id) {
    try {
        const Query = `
        UPDATE year_sem_sections
        SET sec_status = '0', last_updated = NOW()
        WHERE section_id = ${section_id};
      `;

        const sec_Result = await poolQuery(Query);
        return {
            statusCode: 200,
            returnCode: 1,
            message: 'Section UnActived',
        };
    } catch (error) {
        throw error;
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}


module.exports.sectionRepo = {
    openNewSection: openNewSection,
    sectionList: sectionList,
    activeSec: activeSec,
    unActiveSec: unActiveSec,
    getAllSubjectInCurriculums: getAllSubjectInCurriculums
};
