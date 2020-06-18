require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.AWS_HOST,
  user: process.env.AWS_USER,
  password: process.env.AWS_PASSWORD
});

// (async function testConnection() {
//   try {
//     const con = await pool.getConnection();
//     console.log('con created', con);
//     con.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

(async function createUserTable() {
  try {
    const con = await pool.getConnection();
    con.query('CREATE DATABASE IF NOT EXISTS popsicle_stick');
    con.query('USE popsicle_stick');
    const userDB = await con.query(
      'CREATE TABLE IF NOT EXISTS user (username VARCHAR(255) UNIQUE NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, profile_pic VARCHAR(255), date DATETIME, PRIMARY KEY(username))'
    );

    console.log(userDB);

    con.release();
  } catch (error) {
    console.log(error);
  }
})();

(async function createIdeasTable() {
  try {
    const con = await pool.getConnection();
    con.query('USE popsicle_stick');
    const ideaDB = await con.query(
      'CREATE TABLE IF NOT EXISTS idea (id INT UNIQUE NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, location VARCHAR(255), description VARCHAR(4095), cost DECIMAL(10,2), indoor_outdoor VARCHAR(10), category VARCHAR(255), url VARCHAR(255), picture VARCHAR(255), weather VARCHAR(50), isCompleted BOOLEAN, PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username))'
    );

    console.log(ideaDB);

    con.release();
  } catch (error) {
    console.log(error);
  }
})();

(async function createIdeaPicTable() {
  try {
    const con = await pool.getConnection();
    con.query('USE popsicle_stick');
    const ideapicDB = await con.query(
      'CREATE TABLE IF NOT EXISTS ideapic (s3uuid VARCHAR(255) UNIQUE NOT NULL, description VARCHAR(4095), idea INT NOT NULL, PRIMARY KEY(s3uuid), FOREIGN KEY(idea) REFERENCES idea(id))'
    );

    console.log(ideapicDB);

    con.release();
  } catch (error) {
    console.log(error);
  }
})();
