// const InSertProject = require('../../../respository/project_mgt/searchingControllers');
const BackOffice = require('../../../respository/project_mgt/backofficeControllers');
const Transfer = require('../../../respository/project_mgt/transferControllers');

module.exports = (server) => {
  //API: http://localhost:3000/api/project-mgt/curriculums/subjects?curriculum_id=2
  // เพิ่มหัวข้อโครงงานใหม่เข้าสู่ระบบจาก Back Office
  server.route({
    method: 'POST',
    path: '/api/project-mgt/insertpreproject',
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
      const {
        section_id,
        preproject_name_th,
        preproject_name_eng,
        project_code,
        project_status,
        project_type,
        created_by,
        studen_id,
        adviser,
        subadviser,
        committee,
      } = body;
      try {
        const responsedata =
          await BackOffice.backofficeRepo.insertNewPreProject(
            section_id,
            preproject_name_th,
            preproject_name_eng,
            project_code,
            project_status,
            project_type,
            created_by,
            studen_id,
            adviser,
            subadviser,
            committee
          );
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

  // อัปเดทของมูล Pre-project ที่เลือก
  server.route({
    method: 'POST',
    path: '/api/project-mgt/updatepreproject',
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
      const {
        preproject_id,
        section_id,
        preproject_name_th,
        preproject_name_eng,
        project_code,
        project_status,
        project_type,
        studen_id,
        adviser,
        subadviser,
        committee,
      } = body;
      try {
        const responsedata = await BackOffice.backofficeRepo.updatePreProject(
          preproject_id,
          section_id,
          preproject_name_th,
          preproject_name_eng,
          project_code,
          project_status,
          project_type,
          studen_id,
          adviser,
          subadviser,
          committee
        );
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

  // ลบข้อมูลเปลี่ยนสถานะของ Pre-project ที่เลือก
  server.route({
    method: 'PUT',
    path: '/api/project-mgt/deletepreproject',
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
      const { preproject_id } = body;
      try {
        const responsedata = await BackOffice.backofficeRepo.deletePreproject(
          preproject_id
        );
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

  // เปลี่ยนแปลงสถานะ Pre-project -> Project
  server.route({
    method: 'POST',
    path: '/api/project-mgt/transferproject',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, h) {
      var body = request.payload;
      const { preproject_id, section_id } = body;
      try {
        const responsedata = await Transfer.transferRepo.transferproject(
          preproject_id,
          section_id
        );
        if (responsedata.error) {
          return responsedata;
        } else {
          if (responsedata.statusCode === 400)
            return h.response(responsedata).code(400);
          return responsedata;
        }
      } catch (err) {
        console.log(err);
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // เปลี่ยนแปลงสถานะ Pre-project -> Project หลายตัว
  server.route({
    method: 'POST',
    path: '/api/project-mgt/transferproject_many',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, h) {
      var body = request.payload;
      const { preproject_list, section_id } = body;
      try {
        const responsedata = await Transfer.transferRepo.transferlistproject(
          preproject_list,
          section_id
        );
        if (responsedata.error) {
          return responsedata;
        } else {
          if (responsedata.statusCode === 400)
            return h.response(responsedata).code(400);
          return responsedata;
        }
      } catch (err) {
        console.log(err);
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // บันทึกเอกสาร
  server.route({
    method: 'POST',
    path: '/api/project-mgt/uploadpreprojectdocuments',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, h) {
      var body = request.payload;
      const {
        preproject_id,
        document_type,
        document_name,
        adviser,
        studen_id,
        instructor,
        committee,
        role,
        description
      } = body;
      // return 123
      let document_owner;

      if (adviser !== '') document_owner = adviser;
      else if (studen_id !== '') document_owner = studen_id;
      else if (instructor !== '') document_owner = instructor;
      else if (committee !== '') document_owner = committee;
      else document_owner = 0;

      try {

        const responsedata = await BackOffice.backofficeRepo.saveDocument(
          preproject_id,
          document_type,
          document_name,
          document_owner,
          role,
          description
        );
        if (responsedata.error) {
          return responsedata;
        } else {
          if (responsedata.statusCode === 400)
            return h.response(responsedata).code(400);
          return responsedata;
        }
      } catch (err) {
        console.log(err);
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // อัปโหลดเอกสาร project
  server.route({
    method: 'POST',
    path: '/api/project-mgt/uploadprojectdocuments',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
      },
    },
    handler: async function (request, h) {
      var body = request.payload;
      const {
        project_id,
        document_type,
        document_name,
      } = body;

      try {

        const responsedata = await BackOffice.backofficeRepo.saveDocumentProject(
          project_id,
          document_type,
          document_name
        );
        if (responsedata.error) {
          return responsedata;
        } else {
          if (responsedata.statusCode === 400)
            return h.response(responsedata).code(400);
          return responsedata;
        }
      } catch (err) {
        console.log(err);
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  // อัปเดทของมูล Project ที่เลือก
  server.route({
    method: 'POST',
    path: '/api/project-mgt/updateproject',
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
      const {
        project_id,
        section_id,
        project_name_th,
        project_name_eng,
        project_code,
        project_status,
        project_type,
        studen_id,
        adviser,
        subadviser,
        committee,
      } = body;
      try {
        const responsedata = await BackOffice.backofficeRepo.updateProject(
          project_id,
          section_id,
          project_name_th,
          project_name_eng,
          project_code,
          project_status,
          project_type,
          studen_id,
          adviser,
          subadviser,
          committee
        );
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


  // ลบข้อมูลเปลี่ยนสถานะของ Project ที่เลือก
  server.route({
    method: 'PUT',
    path: '/api/project-mgt/deleteproject',
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
      const { project_id } = body;
      try {
        const responsedata = await BackOffice.backofficeRepo.deleteProject(project_id)
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

  // Select subject to project-subject
  server.route({
    method: 'POST',
    path: '/api/project-mgt/select_project_subject',
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
      const { curriculum_id, subject_id, subject_type } = body;
      try {
        const responsedata = await BackOffice.backofficeRepo.selectProjectSubject(subject_id, curriculum_id, subject_type)
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
