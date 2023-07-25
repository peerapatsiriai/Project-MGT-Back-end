
var dbconfig = {
    development: {
        //connectionLimit : 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'project_mgt'
    },
    production1: {
        //connectionLimit : 10,
        //host: '128.199.188.223',
        host: 'yjo6uubt3u5c16az.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        port: '3306',
        user: 'm1i0apdnwx6uuqhx',
        password: 'm56uhwdpjpsoa44v',
        database: 'cff5144ks6iiu375'
    },
    production2: {
        //connectionLimit : 10,
        //host: '128.199.188.223',
        host: 'wb39lt71kvkgdmw0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        port: '3306',
        user: 'uotdx2ldu03w47k5',
        password: 'ujt4mrw25n2ajeja',
        database: 'duidokltr1gf7r1g'
    },
};
module.exports = dbconfig;
