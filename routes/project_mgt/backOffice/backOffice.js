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
    handler: async function (request, reply) {
      var body = request.payload;
      const { preproject_id, section_id } = body;
      try {
        const responsedata = await Transfer.transferRepo.transferproject(preproject_id, section_id);
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
