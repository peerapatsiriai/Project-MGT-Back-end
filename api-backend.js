const Hapi = require("@hapi/hapi");
const Joi = require("joi");
const axios = require("axios");
const FormData = require("form-data");

// ------------------- Routes ------------------- //
const Project_mgt_route_backoffice = require("./routes/project_mgt/backOffice/backOffice");
const Project_mgt_route_searching = require("./routes/project_mgt/backOffice/searching");

// ------------------ Websocket ----------------- //
const hapiPort = 3200;
const webPort = 3280;

const init = async () => {
  const server = Hapi.Server({
    port: hapiPort,
    host: "0.0.0.0", // Change this to your LAN IP address if needed
    routes: {
      cors: true,
    },
  });

  // Replace this part with your actual route handlers
  Project_mgt_route_backoffice(server);
  Project_mgt_route_searching(server);
  // ...

  // Greeting API
  server.route({
    method: "GET",
    path: "/",
    handler: () => {
      return "<h3> Welcome to CE Reform API V1.0.1</h3>";
    },
  });

  // API: http://localhost:3200/api/v1/getaveragewaitingtime
  server.route({
    method: "GET",
    path: "/api/v1/getaveragewaitingtime",
    config: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-width"],
      },
    },
    handler: async (request, h) => {
      try {
        const responsedata = await Satisfaction.SatisfactionRepo.getAverageWaitingTime();
        if (responsedata.error) {
          return h.response(responsedata.errMessage).code(500);
        } else {
          console.log("responsedata: ", responsedata);
          return h.response(responsedata);
        }
      } catch (err) {
        console.error(err);
        return h.response("Internal Server Error").code(500);
      }
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
