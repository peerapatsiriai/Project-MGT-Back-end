// const InSertProject = require('../../../respository/project_mgt/searchingControllers');
const { log } = require('util');
const instructor = require('../../../respository/project_mgt/instructorControllers');


module.exports = (server) => {

  // Approve CE
  server.route({
    method: 'POST',
    path: '/api/project-mgt/approve_preproject_document',
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
      const { document_id } = body;
      try {
        const responsedata = await instructor.instructorRepo.approvePreprojectDocument(document_id);
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

  // Approve CH
  server.route({
    method: 'POST',
    path: '/api/project-mgt/approve_project_document',
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
      const { document_id } = body;
      try {
        const responsedata = await instructor.instructorRepo.approveprojectDocument(document_id);
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

  // Update Status Prerpojec
  server.route({
    method: 'POST',
    path: '/api/project-mgt/change_preproject_status',
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
      const { preproject_id, preproject_status } = body;
      try {
        const responsedata = await instructor.instructorRepo.updatePreprojectStatus(preproject_id, preproject_status);
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

  // Update Status Ppojec
  server.route({
    method: 'POST',
    path: '/api/project-mgt/change_project_status',
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
      const { project_id, project_status } = body;
      try {
        const responsedata = await instructor.instructorRepo.updateProjectStatus(project_id, project_status);
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
