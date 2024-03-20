import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '66566656',
  port: 3306,
  database: 'twitter_db',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default db;
