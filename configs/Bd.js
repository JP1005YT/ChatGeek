const {Pacotes} = require("../configs/Packages.js");
let P = new Pacotes()

const pool = P.mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'database_allo',
  password: ''
});

module.exports = pool.promise();
