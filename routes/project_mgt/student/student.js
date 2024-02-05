// const InSertProject = require('../../../respository/project_mgt/searchingControllers');
const { log } = require('util');
const student = require('../../../respository/project_mgt/studentControllers');
const { params } = require('@hapi/hapi/lib/validation');


module.exports = (server) => {

  // Search all my preproject and project
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallmyproject',
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
      const { student_id } = param;
      try {
        const responsedata = await student.studentRepo.getallMypreprojectandproject(student_id);
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

  // Register New Preproject
  server.route({
    method: 'POST',
    path: '/api/project-mgt/register_newpreproject',
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
      const { section_id,
        preproject_name_th,
        preproject_name_eng,
        project_code,
        project_status,
        project_type,
        created_by,
        studen_id,
        adviser,
        subadviser } = body;

      try {
        const responsedata = await student.studentRepo.registerNewPreproject(section_id,
          preproject_name_th,
          preproject_name_eng,
          project_code,
          project_status,
          project_type,
          created_by,
          studen_id,
          adviser,
          subadviser)

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

  // Project Recommend
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallprojectrecommend',
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
        const responsedata = await student.studentRepo.projectRecommend()
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

  // My project CE Document
  server.route({
    method: 'GET',
    path: '/api/project-mgt/mypreprojectdocument',
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
      const params= request.query
      const { preproject_id } = params 
      try {
        const responsedata = await student.studentRepo.myPreprojectdocument(preproject_id)
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

  // My project CH Document
  server.route({
    method: 'GET',
    path: '/api/project-mgt/myprojectdocument',
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
      const params= request.query
      const { project_id } = params 
      try {
        const responsedata = await student.studentRepo.myProjectdocument(project_id)
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

  // Regis Project Proten
  server.route({
    method: 'POST',
    path: '/api/project-mgt/addprojectpotentials',
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
      const body = request.payload
      const { project_id, subject_id, weight } = body; 
      try {
        const responsedata = await student.studentRepo.project_potentials(project_id, subject_id, weight)
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

  // Regis Project Proten
  server.route({
    method: 'GET',
    path: '/api/project-mgt/get_project_potential',
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
      var params = request.query;
      const { subject_id } = params; 
      try {
        const responsedata = await student.studentRepo.getProjectPotentialBySubjectIDList(subject_id)
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
