// db.js

import mysql from 'mysql';

// Create a connection pool
export const pool = mysql.createPool({
  host: 'sql7.freesqldatabase.com',
  user: 'sql7623226',
  password: 'PjWRdkuixQ',
  database: 'sql7623226'
})

