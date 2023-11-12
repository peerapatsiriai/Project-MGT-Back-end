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

////////////////////// CE Document ////////////////////////////////////
async function getalldocument_ce() {
    try {
        const Query = `SELECT * FROM preproject_document_froms ORDER BY ce_status AND ce_type DESC 
        `;

        const document_Result = await poolQuery(Query);

        if (document_Result.length > 0) {
            return {
                statusCode: 201,
                returnCode: 1,
                data: document_Result
            };
        } else {
            return {
                statusCode: 404,
                returnCode: 11
            };
        }
    } catch (error) {
        console.log(error);
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function insert_new_ce_from(ce_file_name, ce_type) {
    try {
        const Query = `
        INSERT INTO preproject_document_froms (ce_file_name, ce_type, ce_status, created_datetime, last_updated)
        VALUES ('${ce_file_name}', '${ce_type}', '0', NOW(), NOW())
      `;

        const ce_Result = await poolQuery(Query);
        return {
            statusCode: 201,
            returnCode: 1,
            message: 'CE created successfully',
        };
    } catch (error) {
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function activedocument_ce(ce_doc_id) {
    try {
        // ตรวจสอบว่ามีเอกสารในประเภทนั้น active อยู่หรือป่าว
        const Check_type_Query = `SELECT ce_type FROM preproject_document_froms WHERE ce_doc_id = ${ce_doc_id}`
        const check_type = await poolQuery(Check_type_Query);
        const Check_Document_active_Query = `SELECT * FROM preproject_document_froms WHERE ce_type = '${check_type[0].ce_type}' AND ce_status = '1'`
        const Check = await poolQuery(Check_Document_active_Query);
        // ถ้ามีที่ Active
        if (Check.length > 0) {
            return {
                statusCode: 201,
                returnCode: 1,
                message: `This ${check_type[0].ce_type} document already active`,
            };
        } else {
            const Active_Query = `
                    UPDATE preproject_document_froms
                    SET ce_status = '1', last_updated = NOW()
                    WHERE ce_doc_id = ${ce_doc_id};
                `;
            await poolQuery(Active_Query);
            return {
                statusCode: 201,
                returnCode: 1,
                message: 'Document Active successfully',
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

async function unactivedocument_ce(ce_doc_id) {
    try {
        const Query = `
        UPDATE preproject_document_froms
        SET ce_status = '0', last_updated = NOW()
        WHERE ce_doc_id = ${ce_doc_id};
      `;

        await poolQuery(Query);
        return {
            statusCode: 200,
            returnCode: 1,
            message: 'Document UnActive successfully',
        };
    } catch (error) {
        throw error;
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function dowload_ce() {
    try {
        const Query = `SELECT DISTINCT ce_file_name ,ce_type ,ce_status FROM preproject_document_froms WHERE ce_status = '1' ORDER BY ce_type
        `;

        const document_Result = await poolQuery(Query);

        if (document_Result.length > 0) {
            return {
                statusCode: 201,
                returnCode: 1,
                data: document_Result
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

//////////////////// CH Document ////////////////////////////////////
/////////////////// CH is document of project subject
async function getalldocument_ch() {
    try {
        const Query = `SELECT * FROM project_document_froms ORDER BY ch_status AND ch_type DESC 
        `;

        const document_Result = await poolQuery(Query);

        if (document_Result.length > 0) {
            return {
                statusCode: 201,
                returnCode: 1,
                data: document_Result
            };
        } else {
            return {
                statusCode: 404,
                returnCode: 11
            };
        }
    } catch (error) {
        console.log(error);
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function insert_new_ch_from(ch_file_name, ch_type) {
    try {
        const Query = `
        INSERT INTO project_document_froms (ch_file_name, ch_type, ch_status, created_datetime, last_updated)
        VALUES ('${ch_file_name}', '${ch_type}', '0', NOW(), NOW())
      `;

        const ch_Result = await poolQuery(Query);
        return {
            statusCode: 201,
            returnCode: 1,
            message: 'CE created successfully',
        };
    } catch (error) {
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function activedocument_ch(ch_doc_id) {
    try {
        // ตรวจสอบว่ามีเอกสารในประเภทนั้น active อยู่หรือป่าว
        const Check_type_Query = `SELECT ch_type FROM project_document_froms WHERE ch_doc_id = ${ch_doc_id}`
        const check_type = await poolQuery(Check_type_Query);
        const Check_Document_active_Query = `SELECT * FROM project_document_froms WHERE ch_type = '${check_type[0].ch_type}' AND ch_status = '1'`
        const Check = await poolQuery(Check_Document_active_Query);
        // ถ้ามีที่ Active
        if (Check.length > 0) {
            return {
                statusCode: 201,
                returnCode: 1,
                message: `This ${check_type[0].ch_type} document already active`,
            };
        } else {
            const Active_Query = `
                    UPDATE project_document_froms
                    SET ch_status = '1', last_updated = NOW()
                    WHERE ch_doc_id = ${ch_doc_id};
                `;
            await poolQuery(Active_Query);
            return {
                statusCode: 201,
                returnCode: 1,
                message: 'Document Active successfully',
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

async function unactivedocument_ch(ch_doc_id) {
    try {
        const Query = `
        UPDATE project_document_froms
        SET ch_status = '0', last_updated = NOW()
        WHERE ch_doc_id = ${ch_doc_id};
      `;

        await poolQuery(Query);
        return {
            statusCode: 200,
            returnCode: 1,
            message: 'Document UnActive successfully',
        };
    } catch (error) {
        throw error;
        return error
    } finally {
        // Make sure to release the database connection here if you're using a connection pool
        // pool.end();
    }
}

async function dowload_ch() {
    try {
        const Query = `SELECT DISTINCT ch_file_name ,ch_type ,ch_status FROM project_document_froms WHERE ch_status = '1' ORDER BY ch_type`;

        const document_Result = await poolQuery(Query);

        if (document_Result.length > 0) {
            return {
                statusCode: 201,
                returnCode: 1,
                data: document_Result
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

module.exports.fromRepo = {
    getalldocument_ce: getalldocument_ce,
    insert_new_ce_from: insert_new_ce_from,
    activedocument_ce: activedocument_ce,
    unactivedocument_ce: unactivedocument_ce,
    dowload_ce: dowload_ce,
    getalldocument_ch: getalldocument_ch,
    insert_new_ch_from: insert_new_ch_from,
    activedocument_ch: activedocument_ch,
    unactivedocument_ch: unactivedocument_ch,
    dowload_ch: dowload_ch,
};
