const searching = require('../../../respository/project_mgt/searchingControllers');
const backoffice = require('../../../respository/project_mgt/backofficeControllers');
const transfer = require('../../../respository/project_mgt/transferControllers');
module.exports = (server) => {
  
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

  // ส่งข้อมูลวิชาทั้งหมดภายในหลักสูตรที่เลือกโดยต้องส่ง ID ของหลักสูตรเข้ามา
  server.route({
    method: 'GET',
    path: '/api/project-mgt/subjects_project',
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
          await searching.searchingRepo.getSubjectProjectInCurriculums(
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

  // ส่งข้อมูลรายชื่อ Pre-project ทั้งหมดในระบบ
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

  // ส่งข้อมูลปีทั้งหมดของในวิชาโปรเจคของ pre-project ที่กำลังประเปลี่ยน
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallyearsubjectproject',
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
        const responsedata = await transfer.transferRepo.searchYearInOnePreproject(preproject_id);
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

  // ส่งข้อมูล sec ทั้งหมดในปีที่เลือก ของ pre-project ที่กำลังจะเปลี่ยน
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallsecinprojectsubject',
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
      const { subject_project_id, year } = param;
      try {
        const responsedata = await transfer.transferRepo.searchAllSecInOneProjectSubject(subject_project_id, year);
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

  //ค้าหาหนึ่งประเภทเอกสารของหนึ่งโปรเจค
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallonedocumenttype',
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
      const { preproject_id, document_type } = param;
      try {
        const responsedata = await searching.searchingRepo.getListInOneDocuments(preproject_id, document_type);
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

  // All Project
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallprojects',
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
        const responsedata = await searching.searchingRepo.getAllProjects();
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

  // Search one project
  server.route({
    method: 'GET',
    path: '/api/project-mgt/project',
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
      const { project_id } = param;
      try {
        const responsedata = await searching.searchingRepo.getoneProjects(project_id);
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

  //ค้าหาหนึ่งประเภทเอกสารของหนึ่งโปรเจค
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallonedocumenttypeproject',
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
      const { project_id, document_type } = param;
      try {
        const responsedata = await searching.searchingRepo.getListInOneDocumentsProject(project_id, document_type);
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

  // Search all project type
  server.route({
    method: 'GET',
    path: '/api/project-mgt/project_type',
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
          await searching.searchingRepo.getAllProjecttype();
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
  
  // Search all project status
  server.route({
    method: 'GET',
    path: '/api/project-mgt/project_status',
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
          await searching.searchingRepo.getAllProjectstatus();
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

  // Search all preproject status
  server.route({
    method: 'GET',
    path: '/api/project-mgt/preproject_status',
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
          await searching.searchingRepo.getAllPreprorojectstatus();
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

  // Search all general subject in system by curriculms id
  server.route({
    method: 'GET',
    path: '/api/project-mgt/subject_general',
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
        const responsedata = await searching.searchingRepo.getaAllGeneralSubjectInCurriculum(curriculum_id);
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

  // Search all project subjects
  server.route({
    method: 'GET',
    path: '/api/project-mgt/all_project_subject',
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
      try {
        const responsedata = await searching.searchingRepo.getAllProjectSubjert();
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

  // Search one project subject
  server.route({
    method: 'GET',
    path: '/api/project-mgt/one_project_subject',
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
        const responsedata = await searching.searchingRepo.getOneProjectSubject(curriculum_id);
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

  // Search all preproject not yet transfer
  server.route({
    method: 'GET',
    path: '/api/project-mgt/preproject_not_yet_transfer',
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
        const responsedata = await searching.searchingRepo.preprojectsnottransfer();
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


  // Search all section active in system
  server.route({
    method: 'GET',
    path: '/api/project-mgt/secs_active',
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
        const responsedata = await searching.searchingRepo.all_sec_active();
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

  // Search all preproject in section by section_id
  server.route({
    method: 'GET',
    path: '/api/project-mgt/preproject_in_sec',
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
      const { section_id } = param;
      try {
        const responsedata = await searching.searchingRepo.preproject_in_sec(section_id);
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


  // Search all project in section by section_id
  server.route({
    method: 'GET',
    path: '/api/project-mgt/project_in_sec',
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
      const { section_id } = param;
      try {
        const responsedata = await searching.searchingRepo.project_in_sec(section_id);
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

};
