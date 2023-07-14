const InSertProject = require('../../respository/project_mgt/searching');
const DisplayProject = require('../../respository/project_mgt/backoffice');

module.exports = (server) => {

  ////////////////////////////////////////////////////////////////////////////////////
  //------------------------------- GET --------------------------------------------//
  ////////////////////////////////////////////////////////////////////////////////////
  
  //API: http://localhost:3200/api/project-mgt/curriculums
  // ส่งข้อมูลหลักสูตรทั้งหมด
  server.route({
    method: 'GET',
    path: '/api/project-mgt/curriculums',
    handler: async function (request, reply) {
      try {
        const responsedata =
          await InSertProject.InsertProjectRepo.getAllCurriculums();
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
    method: "GET",
    path: "/api/project-mgt/curriculums/subjects",
    handler: async function (request, reply) {
      var param = request.query;
      const { curriculum_id } = param;
      try {
        const responsedata =
          await InSertProject.InsertProjectRepo.getAllSubjectInCurriculums(
            curriculum_id
          );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(["error", "home"], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/api/project-mgt/curriculums/subjects?curriculum_id=2
  // ส่งจำนวนปีทั้งหมดของวิชาที่เลือกมาโดยใช้ ID ของวิชา
  server.route({
    method: "GET",
    path: "/api/project-mgt/curriculums/subjects/year",
    handler: async function (request, reply) {
      var param = request.query;
      const { subject_id } = param;
      try {
        const responsedata =
          await InSertProject.InsertProjectRepo.getAllSubjectYears(subject_id);
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(["error", "home"], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/api/project-mgt/curriculums/subjects?curriculum_id=2
  // ส่งข้อมูลของวิชาที่เลือกโดยส่งเฉพาะข้อมูลของวิชานั้นตามปีที่เลือกเท่านั้น 
  server.route({
    method: "GET",
    path: "/api/project-mgt/curriculums/subjects/year/sections",
    handler: async function (request, reply) {
      var param = request.query;
      const { subject_id, year } = param;
      try {
        const responsedata =
          await InSertProject.InsertProjectRepo.getAllSectionInYear(
            subject_id,
            year
          );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(["error", "home"], err);
        return err;
      }
    },
  });

  //API: http://0.0.0.0:3000/api/project-mgt/preprojects
  // ส่งข้อมูลรายชื่อวิชา Pre-project ทั้งหมดที่มีในระบบโดยไม่มีเงื่อนไข
  server.route({
    method: "GET",
    path: "/api/project-mgt/preprojects",
    handler: async function (request, reply) {
      try {
        const responsedata =
          await DisplayProject.DisplayProjectRepo.getAllPreprojects();
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(["error", "home"], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/api/project-mgt/instructors
  // ส่งข้อมูลอาจารย์ทั้งหมดโดยไม่มีเงื่อนไข
  server.route({
    method: "GET",
    path: "/api/project-mgt/instructors",
    handler: async function (request, reply) {
      try {
        const responsedata =
          await InSertProject.InsertProjectRepo.getAllListInstructors();
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(["error", "home"], err);
        return err;
      }
    },
  });

  ////////////////////////////////////////////////////////////////////////////////////
  //------------------------------- POST -------------------------------------------//
  ////////////////////////////////////////////////////////////////////////////////////

};
