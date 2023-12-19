
var dbconfig = {
    Dev_local: {
        //connectionLimit : 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
        //database: 'ce_project_mgt'
    },
    Dev_online: {
        host: "grp6m5lz95d9exiz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "x30lzoxzakd7mmfb",
        password: "ssd7zoad8t4r9e20",
        database: "us9k7p5quhhayigx",
        port: "3306"
    },
    Production: {
        host: "sql6.freesqldatabase.com",
        user: "sql6635663",
        password: "NktAhYk6bD",
        database: "sql6635663",
        port: "3306"
    },
};
module.exports = dbconfig;
