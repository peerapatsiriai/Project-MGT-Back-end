const hapi = require("@hapi/hapi");
//const H2o2 = require('@hapi/h2o2');
var express = require("express");
const AuthBearer = require("hapi-auth-bearer-token");

var express = require("express");
const Joi = require("joi");
const axios = require("axios");
const FormData = require("form-data");

// const AgentStatus = require("./respository/AgentStatus");
// const Inbound = require("./respository/Inbound");
// const Outbound = require("./respository/Outbound");
// const OnlineAgent = require("./respository/OnlineAgent");
// const Satisfaction = require("./respository/Satisfaction");
//------------------------------------------------------------------------------//
//const InSertProject = require("./respository/project_mgt/InsertPreproject");
//const DisplayProject = require("./respository/project_mgt/DisplayProjects");
//------------------------------------------------------------------------------//
//-------------------- Routes --------------------//
const Project_mgt_route_backoffice = require("./routes/project_mgt/backOffice/backOffice")
const Project_mgt_route_searching = require("./routes/project_mgt/backOffice/searching")

//------------------------------------------------------------------------------//
const env = require("./env.js");

//---------------- Websocket -----------------------------
const hapiPort = 3200;
const webSocketPort = 3201;
const webPort = 3280;

var url = require("url");

//init Express
var app = express();
//init Express Router
var router = express.Router();

//REST route for GET /status
router.get("/status", function (req, res) {
  res.json({
    status: "App is running!",
  });
});

//connect path to router
app.use("/", router);

//add middleware for static content
app.use(express.static("static"));
var webserver = app.listen(webPort, function () {
  console.log("Websockets listening on port: " + webSocketPort);
  console.log("Webserver running on port: " + webPort);
});

//var env = process.env.NODE_ENV || 'development';
//var env = process.env.NODE_ENV || 'production';

console.log("Running Environment: " + env);

const init = async () => {
  const server = hapi.Server({
    port: hapiPort,
    host: "localhost",
    routes: {
      cors: true,
    },
  });

  ///////////////////////////////// START ////////////////////////////////////////////
  Project_mgt_route_backoffice(server)
  Project_mgt_route_searching(server)
  //////////////////////////////// END //////////////////////////////////////////////
  
  // Greeting API
  server.route({
    method: "GET",
    path: "/",
    handler: () => {
      
      return "<h3> Welcome to CE Reform API V1.0.1</h3>";
    },
  });

  //API: http://localhost:3000/getOnlineAgentByAgentCode?agentcode=08926
  server.route({
    method: "GET",
    path: "/api/v1/getaveragewaitingtime",
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-width"],
      },
    },
    handler: async function (request, reply) {
      try {
        const responsedata =
          await Satisfaction.SatisfactionRepo.getAverageWaitingTime();
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          //return responsedata;

          console.log("responsedata: ", responsedata);

          return responsedata;
        }
      } catch (err) {
        server.log(["error", "home"], err);
        return err;
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

//-----------------------
