// const InSertProject = require('../../../respository/project_mgt/searchingControllers');
const auth = require('../../../respository/project_mgt/authenControllers');


module.exports = (server) => {
  // Login teacher
  server.route({
    method: 'POST',
    path: '/api/project-mgt/login-teacher',
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
        const responsedata = await auth.authenRepo.authenticationteacher(username, password);
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

  // login teacher project
  server.route({
    method: 'POST',
    path: '/api/project-mgt/login-teacher-project',
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
        const responsedata = await auth.authenRepo.authenticationteacherproject(username, password);
       
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

  // login teacher student
  server.route({
    method: 'POST',
    path: '/api/project-mgt/login-student',
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
        const responsedata = await auth.authenRepo.authenticationstudent(username, password);
       
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

  // login teacher admin
  server.route({
    method: 'POST',
    path: '/api/project-mgt/login-admin',
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
        const responsedata = await auth.authenRepo.authenticationadmin(username, password);
       
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

  // async function verifyauthentication(token, tokenRole) {
  server.route({
    method: 'POST',
    path: '/api/project-mgt/verifyauthentication',
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
      const { token, tokenRole } = body;
      
      try {
        const responsedata = await auth.authenRepo.verifyauthentication(token, tokenRole);
       
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
