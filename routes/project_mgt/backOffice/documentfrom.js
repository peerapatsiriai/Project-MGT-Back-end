// const InSertProject = require('../../../respository/project_mgt/searchingControllers');
const { log } = require('util');
const from_ec = require('../../../respository/project_mgt/fromDocumentControllers');


module.exports = (server) => {

  //// CE ////

  // Get all CE document LIst in system
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallformdocument_ce',
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
        const responsedata = await from_ec.fromRepo.getalldocument_ce();
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

  // Insert new CE document document
  server.route({
    method: 'POST',
    path: '/api/project-mgt/insert_new_document_ce',
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
      const { ce_file_name, ce_type } = body;
      try {
        const responsedata = await from_ec.fromRepo.insert_new_ce_from(ce_file_name, ce_type);
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

  // Active CE Document
  server.route({
    method: 'POST',
    path: '/api/project-mgt/activecedocument_ce',
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
      const { ce_doc_id } = body;
      try {
        const responsedata = await from_ec.fromRepo.activedocument_ce(ce_doc_id)
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

  // UnActive CE Document
  server.route({
    method: 'POST',
    path: '/api/project-mgt/unactivecedocument_ce',
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
      const { ce_doc_id } = body;
      try {
        const responsedata = await from_ec.fromRepo.unactivedocument_ce(ce_doc_id);
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

  // List CE Document active
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallformdocument_ce_active',
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
        const responsedata = await from_ec.fromRepo.dowload_ce();
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

  //// CH //// 
  // CH is document of project subject

  // Get all ch document LIst in system
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallformdocument_ch',
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
        const responsedata = await from_ec.fromRepo.getalldocument_ch();
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

  // Insert new CH document document
  server.route({
    method: 'POST',
    path: '/api/project-mgt/insert_new_document_ch',
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
      const { ch_file_name, ch_type } = body;
      try {
        const responsedata = await from_ec.fromRepo.insert_new_ch_from(ch_file_name, ch_type);
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

  // Active CH Document
  server.route({
    method: 'POST',
    path: '/api/project-mgt/activecedocument_ch',
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
      const { ch_doc_id } = body;
      try {
        const responsedata = await from_ec.fromRepo.activedocument_ch(ch_doc_id)
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

  // UnActive CE Document
  server.route({
    method: 'POST',
    path: '/api/project-mgt/unactivecedocument_ch',
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
      const { ch_doc_id } = body;
      try {
        const responsedata = await from_ec.fromRepo.unactivedocument_ch(ch_doc_id);
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

  // List CE Document active
  server.route({
    method: 'GET',
    path: '/api/project-mgt/getallformdocument_ch_active',
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
        const responsedata = await from_ec.fromRepo.dowload_ch();
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
