const InSertProject = require('../../../respository/project_mgt/searching');
const BackOffice = require('../../../respository/project_mgt/backoffice');

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