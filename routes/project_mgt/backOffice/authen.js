// const InSertProject = require('../../../respository/project_mgt/searchingControllers');
const auth = require('../../../respository/project_mgt/authenControllers');


module.exports = (server) => {
  // อัปเดทของมูล Pre-project ที่เลือก
  server.route({
    method: 'POST',
    path: '/api/project-mgt/login',
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
      const { username, password } = body;
      try {
        const responsedata = await auth.authenRepo.login(username, password);
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
