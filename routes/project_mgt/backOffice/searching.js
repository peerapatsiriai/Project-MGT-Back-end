const searching = require('../../../respository/project_mgt/searching');
const backoffice = require('../../../respository/project_mgt/backoffice');

module.exports = (server) => {
  
  ////////////////////////////////////////////////////////////////////////////////////
  //------------------------------- GET --------------------------------------------//
  ////////////////////////////////////////////////////////////////////////////////////

  //API: http://localhost:3200/api/project-mgt/curriculums
  // ส่งข้อมูลหลักสูตรทั้งหมด
  server.route({
    method: 'GET',
    path: '/api/project-mgt/curriculums',
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
        const responsedata = await searching.searchingRepo.getAllCurriculums();
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

  //API: http://localhost:3000/api/project-mgt/curriculums/subjects?curriculum_id=2
  // ส่งข้อมูลวิชาทั้งหมดภายในหลักสูตรที่เลือกโดยต้องส่ง ID ของหลักสูตรเข้ามา
  server.route({
    method: 'GET',
    path: '/api/project-mgt/curriculums/subjects',
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
      const { curriculum_id } = param;
      try {
        const responsedata =
          await searching.searchingRepo.getAllSubjectInCurriculums(
            curriculum_id
          );
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

  //API: http://localhost:3000/api/project-mgt/curriculums/subjects?curriculum_id=2
  // ส่งจำนวนปีทั้งหมดของวิชาที่เลือกมาโดยใช้ ID ของวิชา
  server.route({
    method: 'GET',
    path: '/api/project-mgt/curriculums/subjects/year',
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
      const { subject_id } = param;
      try {
        const responsedata = await searching.searchingRepo.getAllSubjectYears(
          subject_id
        );
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

  //API: http://localhost:3000/api/project-mgt/curriculums/subjects?curriculum_id=2
  // ส่งข้อมูลของวิชาที่เลือกโดยส่งเฉพาะข้อมูลของวิชานั้นตามปีที่เลือกเท่านั้น
  server.route({
    method: 'GET',
    path: '/api/project-mgt/curriculums/subjects/year/sections',
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
      const { subject_id, year } = param;
      try {
        const responsedata = await searching.searchingRepo.getAllSectionInYear(
          subject_id,
          year
        );
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

  //API: http://0.0.0.0:3000/api/project-mgt/preprojects
  // ส่งข้อมูลรายชื่อวิชา Pre-project ทั้งหมดที่มีในระบบโดยไม่มีเงื่อนไข
  server.route({
    method: 'GET',
    path: '/api/project-mgt/preprojects',
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
        const responsedata =
          await searching.searchingRepo.getAllPreprojects();
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

  //API: http://localhost:3000/api/project-mgt/instructors
  // ส่งข้อมูลอาจารย์ทั้งหมดโดยไม่มีเงื่อนไข
  server.route({
    method: 'GET',
    path: '/api/project-mgt/instructors',
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
        const responsedata =
          await searching.searchingRepo.getAllListInstructors();
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

  //API: http://localhost:3200/api/project-mgt/students
  // ส่งข้อมูลนักศึกษาทั้งหมดโดยไม่มีเงื่อนไข
  server.route({
    method: 'GET',
    path: '/api/project-mgt/students',
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
        responsedata = await searching.searchingRepo.getAllListStudents();
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

  server.route({
    method: 'GET',
    path: '/api/project-mgt/preproject',
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
      const { preproject_id } = param;
      try {
        const responsedata = await searching.searchingRepo.getonePreproject(preproject_id);
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

  ////////////////////////////////////////////////////////////////////////////////////
  //------------------------------- POST -------------------------------------------//
  ////////////////////////////////////////////////////////////////////////////////////
};
