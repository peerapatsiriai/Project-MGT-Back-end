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

async function getAllLoadByInstructorID(instructor_id) {
  try {
    let adviserCount_preproject, committeeCount_preproject  = 0
    let adviserCount_project, committeeCount_project = 0

    // Adviser Preproject
    const searchAdviserQuery = `
    SELECT * FROM preprojects_advisers AS ad 
    INNER JOIN biographical_teacher AS tea 
    ON ad.instructor_id = tea.teacher_id
    INNER JOIN preprojects AS pre
    ON pre.preproject_id = ad.preproject_id
    INNER JOIN preproject_status AS stu ON pre.project_status = stu.status_id
    WHERE ad.instructor_id = '${instructor_id}' AND CAST(pre.project_status AS SIGNED) < 6 AND is_deleted = 0
    `;
    const preprojectAdviser = await poolQuery(searchAdviserQuery);
    adviserCount_preproject = preprojectAdviser.length

    // Committee Preproject
    const searchCommitteeQuery = `
    SELECT * FROM preprojects_committees AS com 
    INNER JOIN biographical_teacher AS tea 
    ON com.instructor_id = tea.teacher_id 
    INNER JOIN preprojects AS pre
    ON pre.preproject_id = com.preproject_id
    INNER JOIN preproject_status AS stu ON pre.project_status = stu.status_id
    WHERE com.instructor_id = '${instructor_id}' AND CAST(pre.project_status AS SIGNED) < 6 AND is_deleted = 0
    `;
    const preprojectCommittee = await poolQuery(searchCommitteeQuery);
    committeeCount_preproject = preprojectCommittee.length
    
    // Adviser Project
    const searchProjectAdviserQuery = `
    SELECT * FROM projects_advisers AS ad 
    INNER JOIN biographical_teacher AS tea 
    ON ad.instructor_id = tea.teacher_id
    INNER JOIN projects AS pro
    ON pro.project_id = ad.project_id
    INNER JOIN project_status AS stu ON pro.project_status = stu.status_id
    WHERE ad.instructor_id = '${instructor_id}' AND CAST(pro.project_status AS SIGNED) < 9 AND is_deleted = 0
    `;
    const projectAdviser = await poolQuery(searchProjectAdviserQuery);
    adviserCount_project = projectAdviser.length

    // Committee Project
    const searchProjectCommitteeQuery = `
    SELECT * FROM projects_committees AS com 
    INNER JOIN biographical_teacher AS tea 
    ON com.instructor_id = tea.teacher_id 
    INNER JOIN projects AS pro
    ON pro.project_id = com.project_id
    INNER JOIN project_status AS stu ON pro.project_status = stu.status_id
    WHERE com.instructor_id = '${instructor_id}' AND CAST(pro.project_status AS SIGNED) < 9 AND is_deleted = 0
    `;
    const projectCommittee = await poolQuery(searchProjectCommitteeQuery);
    committeeCount_project = projectCommittee.length
    
    const allLoadCount = adviserCount_preproject + committeeCount_preproject + adviserCount_project + committeeCount_project
    // Return success
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      loadCount: { allLoadCount, adviserCount_preproject, committeeCount_preproject, adviserCount_project,committeeCount_project },
      preprojectAdviser ,
      preprojectCommittee ,
      projectAdviser ,
      projectCommittee 
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

///////////////////////////////// POST ////////////////////////////////////////
// Get All Post
async function getAllPost() {
  try {
    
    // Adviser Preproject
    const searchAllPostQuery = `
    SELECT * FROM preprojects_public_relations AS pub
    INNER JOIN biographical_teacher AS tea
    ON pub.instructor_id = tea.teacher_id
    WHERE isdelete = '0'
    `;
    const allpost = await poolQuery(searchAllPostQuery);
   
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      allpost
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

// add new post
async function addnewinterest(instructor_id, topicname, description ) {
  try {
    
    // Adviser Preproject
    const PostQuery = `
    INSERT INTO preprojects_public_relations ( instructor_id, header_name, description, created_date_time, isdelete, created_by)
    VALUES ('${instructor_id}','${topicname}','${description}',NOW(),'0','${instructor_id}');
    `;
    await poolQuery(PostQuery);

    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Post Success'
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

// View Detail
async function postDetail(public_relations_id) {
  try {
    
    
    const ViewQuery = `
    SELECT * FROM preprojects_public_relations AS pos
    INNER JOIN biographical_teacher AS tea
    ON pos.instructor_id = tea.teacher_id
    WHERE public_relations_id = '${public_relations_id}'
    `;
    const Data = await poolQuery(ViewQuery);

    return {
      statusCode: 200,
      returnCode: 0,
      Data
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

// Update satuts
async function updateStatus(public_relations_id,status) {
  try {
    
    
    const UpdateQuery = `
    UPDATE preprojects_public_relations
    SET public_relation_status = '${status}'
    WHERE public_relations_id = '${public_relations_id}'
    `;
    await poolQuery(UpdateQuery);

    return {
      statusCode: 200,
      returnCode: 0,
      message: `Update Success change status post ${public_relations_id} to ${status}`
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

// Delete
async function deletePost(public_relations_id) {
  try {
    
    
    const DeleteQuery = `
    UPDATE preprojects_public_relations
    SET isdelete = '1'
    WHERE public_relations_id = '${public_relations_id}'
    `;
    await poolQuery(DeleteQuery);

    return {
      statusCode: 200,
      returnCode: 0,
      message: `Delete Post Success`
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


///////////////////////////////// TEST ////////////////////////////////////////

// GET LIST Preproject and Project Ready to test
async function preproject_ready_test() {
  try {
    var last_result = [];

    const searchAllTestProjectQuery = `
      SELECT * FROM preprojects AS pre
      INNER JOIN preproject_in_section AS presec
      ON presec.preproject_id = pre.preproject_id
      INNER JOIN year_sem_sections AS sec
      ON sec.section_id = presec.section_id
      INNER JOIN preproject_status AS stu ON pre.project_status = stu.status_id
      WHERE pre.project_status = 4 AND sec.sec_status = 1;
    `;

    const listpeproject = await poolQuery(searchAllTestProjectQuery);

    // Find committee status
    for (const element of listpeproject) {
      let preproject_id = element.preproject_id;

      const searchCommitteeCountQuery = `
        SELECT COUNT(preproject_id) FROM preprojects_committees 
        WHERE preproject_id = '${preproject_id}'
      `;

      const result = await poolQuery(searchCommitteeCountQuery);

      if (result[0]['COUNT(preproject_id)'] >= 2) element["can_rigister_status"] = 0;
      else element["can_rigister_status"] = 1;

      last_result.push(element); // Use push to add the updated element to the array
    }

    // console.log(last_result);
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      last_result: last_result,
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

// Get Detail of preproject document
async function preproject_documentList(preproject_id) {
  try {
    
    
    const searchAllDocumentPreprojectQuery = `
    SELECT
    document_type,
    COUNT(*) AS document_count,
    MAX(document_id) AS max_document_id,
    MIN(document_id) AS min_document_id,
    GROUP_CONCAT(document_name) AS document_names
    FROM preprojects_documents
    WHERE preproject_id = '${preproject_id}' AND document_status = '2'
    GROUP BY document_type;
        

    `;
    const listDocument = await poolQuery(searchAllDocumentPreprojectQuery);
   
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Success',
      listDocument
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

// Rigis committee
async function registerCommittee(preproject_id, instructor_id) {
  try {
    
    const registerQuery = `INSERT INTO preprojects_committees (preproject_id, instructor_id, created_date_time, last_update) VALUES ('${preproject_id}', '${instructor_id}', NOW(), NOW())`
    await poolQuery(registerQuery);
   
    return {
      statusCode: 200,
      returnCode: 0,
      message: 'Register Success',
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

module.exports.teacherRepo = {
  getAllLoadByInstructorID: getAllLoadByInstructorID,
  getAllPost:getAllPost,
  addnewinterest:addnewinterest,
  postDetail:postDetail,
  updateStatus:updateStatus,
  deletePost:deletePost,
  preproject_ready_test:preproject_ready_test,
  preproject_documentList:preproject_documentList,
  registerCommittee:registerCommittee
};
