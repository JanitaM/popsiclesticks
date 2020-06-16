require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(express.json({ extended: true }));
app.use(cors());

const pool = mysql.createPool({
  host: process.env.AWS_HOST,
  user: process.env.AWS_USER,
  password: process.env.AWS_PASSWORD
});

// GET All Users - Done
app.get('/users', authorizeUser, async (request, response) => {
  try {
    console.log('GET ALL USERS');

    const con = await pool.getConnection();
    const recordset = await con.query('SELECT * FROM popsicle_stick.user');
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

// POST User - Done
app.post('/user', authorizeUser, async (request, response) => {
  try {
    console.log('POST USER');

    if (
      !request.body.username ||
      !request.body.email ||
      !request.body.password
    ) {
      response.status(400).send({ message: 'enter all requried information' });
    }
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'INSERT INTO popsicle_stick.user (username, email, password, profile_pic, date) VALUES (?, ?, ?, ?, ?)',
      [
        request.body.username,
        request.body.email,
        request.body.password,
        request.body.profile_pic ? request.body.profile_pic : null,
        new Date()
      ]
    );
    con.release();

    console.log(queryResponse);

    response.status(200).send({ messge: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

// GET One User - Done
app.get('/user', authorizeUser, async (request, response) => {
  try {
    console.log('GET ONE USER');

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'SELECT * FROM popsicle_stick.user WHERE username=?',
      [request.query.username]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

// UPDATE User - Done
app.put('/user', authorizeUser, async (request, response) => {
  try {
    console.log('UPDATE ONE USER');

    if (!request.body.username || !request.body.password) {
      response
        .status(400)
        .send({ message: 'entered valid username and password' });
    }
    const selectQuery = await pool.execute(
      'SELECT * FROM popsicle_stick.user WHERE username = ? AND password = ?',
      [request.body.username, request.body.password]
    );

    console.log(selectQuery[0][0]);

    const selectedUser = selectQuery[0][0];
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'UPDATE popsicle_stick.user SET email = ?, password = ?, profile_pic = ? WHERE username = ? AND password = ?',
      [
        request.body.email ? request.body.email : selectedUser.email,
        request.body.password ? request.body.password : selectedUser.password,
        request.body.profile_pic
          ? request.body.profile_pic
          : selectedUser.profile_pic,
        request.body.username,
        request.body.password
      ]
    );
    con.release();

    console.log(queryResponse);

    response.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

// DELETE User - Done
app.delete('/user', async (request, response) => {
  try {
    console.log('DELETE USER');
    const con = await pool.getConnection();
    const recordset = await con.execute(
      'DELETE FROM popsicle_stick.user WHERE username = ? AND password = ?',
      [request.body.username, request.body.password]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

function authorizeUser(request, response, next) {
  next();
}

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
