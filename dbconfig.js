
var dbconfig = {
    development: {
        //connectionLimit : 10,
        host     : '127.0.0.1',
        port     : '4406',
        user     : 'root',
        password : '1q2w3e4rP@ssw0rd',
        database : '3cx-buzz'
    },
    production: {
        //connectionLimit : 10,
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : '3cx-buzz'
    }
    };
module.exports = dbconfig;
