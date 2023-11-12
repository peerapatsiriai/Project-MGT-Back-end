// const InSertProject = require('../../../respository/project_mgt/searchingControllers');
const { log } = require('util');
const section = require('../../../respository/project_mgt/sectionControllers');


module.exports = (server) => {

  // Search all subject in curriculums
  server.route({
    method: 'POST',
    path: '/api/project-mgt/getsubjectincurriculums',
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
      const { curriculum_id } = body;
      try {
        const responsedata = await section.sectionRepo.getAllSubjectInCurriculums(curriculum_id);
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

  // Open new section in system
  server.route({
    method: 'POST',
    path: '/api/project-mgt/opennewsection',
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
      const { subject_id, sec_name, semester, year } = body;
      try {
        const responsedata = await section.sectionRepo.openNewSection(subject_id, sec_name, semester, year);
        if (responsedata.error) {
           
          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        console.log(err);
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Get all section list in system
  server.route({
    method: 'GET',
    path: '/api/project-mgt/sections',
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
        const responsedata = await section.sectionRepo.sectionList();
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // Active Section
  server.route({
    method: 'POST',
    path: '/api/project-mgt/activesection',
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
      const { section_id } = body;
      try {
        const responsedata = await section.sectionRepo.activeSec(section_id);
        if (responsedata.error) {
          return responsedata;
        } else {
          return responsedata;
        }
      } catch (err) {
        console.log(err);
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // UnActive Section
  server.route({
    method: 'POST',
    path: '/api/project-mgt/unactivesection',
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
      const { section_id } = body;
      try {
        const responsedata = await section.sectionRepo.unActiveSec(section_id);
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
