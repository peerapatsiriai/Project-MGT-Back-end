
var dbconfig = {
    development: {
        //connectionLimit : 10,
        host: '127.0.0.1',
        port: '4406',
        user: 'devremote',
        password: '1q2w3e4rP;;',
        database: '3cx-buzz'
    },
    production: {
        //connectionLimit : 10,
        //host: '128.199.188.223',
        host: '127.0.0.1',
        port: '4406',
        user: 'root',
        password: '1q2w3e4rP@ssw0rd',
        database: '3cx-buzz'
    }
};
module.exports = dbconfig;
