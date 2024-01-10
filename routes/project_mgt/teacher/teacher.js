// const InSertProject = require('../../../respository/project_mgt/searchingControllers');
const { log } = require('util');
const teacher = require('../../../respository/project_mgt/teacherControllllers');
const { params } = require('@hapi/hapi/lib/validation');


module.exports = (server) => {

  // Search all subject in curriculums
  server.route({
    method: 'GET',
    path: '/api/project-mgt/teacherload',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, reply) {
      var param = request.query;
      const { instructor_id } = param;
      try {
        const responsedata = await teacher.teacherRepo.getAllLoadByInstructorID(instructor_id)
        if (responsedata.error) {
          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Get all Post
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallpost',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, reply) {
      try {
        const responsedata = await teacher.teacherRepo.getAllPost()
        if (responsedata.error) {
          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Post 
  server.route({
    method: 'POST',
    path: '/api/project-mgt/post_interest',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, reply) {
      var body = request.payload;
      const { instructor_id, topicname, description } = body;

      try {
        const responsedata = await teacher.teacherRepo.addnewinterest(instructor_id, topicname, description);
        if (responsedata.error) {

          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Detail
  server.route({
    method: 'GET',
    path: '/api/project-mgt/get_post_detail',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, reply) {
      const param = request.query
      const { public_relations_id } = param
      try {
        const responsedata = await teacher.teacherRepo.postDetail(public_relations_id)
        if (responsedata.error) {
          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Update status
  server.route({
    method: 'POST',
    path: '/api/project-mgt/post_update_status',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, reply) {
      var body = request.payload;
      const { public_relations_id, status } = body;

      try {
        const responsedata = await teacher.teacherRepo.updateStatus(public_relations_id, status)
        if (responsedata.error) {

          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Delete
  server.route({
    method: 'POST',
    path: '/api/project-mgt/post_delete',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, reply) {
      var body = request.payload;
      const { public_relations_id } = body;

      try {
        const responsedata = await teacher.teacherRepo.deletePost(public_relations_id)
        if (responsedata.error) {

          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Preproject Ready To Test
  server.route({
    method: 'GET',
    path: '/api/project-mgt/preproject_readytest',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, reply) {
      try {
        const responsedata = await teacher.teacherRepo.preproject_ready_test();
        if (responsedata.error) {

          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Get all One document type of one preproject
  server.route({
    method: 'GET',
    path: '/api/project-mgt/document_one_preproject',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, reply) {
      const param = request.query
      const { preproject_id } = param
      try {
        const responsedata = await teacher.teacherRepo.preproject_documentList(preproject_id)
        if (responsedata.error) {

          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Register Committee
  server.route({
    method: 'POST',
    path: '/api/project-mgt/register_committee',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, reply) {
      var body = request.payload;
      const { preproject_id, instructor_id } = body;
      try {
        const responsedata = await teacher.teacherRepo.registerCommittee(preproject_id, instructor_id);
        if (responsedata.error) {

          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

};
