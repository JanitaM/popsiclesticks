// const express = require('express');
// const app = express();
// const serverless = require('serverless-http');
// const cors = require('cors');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// app.get('/api/info', (request, response) => {
//   response.send('Hello from lambda');
// });

require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());
app.use(express.json({ extended: true }));
app.use(cors());

const pool = mysql.createPool({
  host: process.env.AWS_HOST,
  user: process.env.AWS_USER,
  password: process.env.AWS_PASSWORD
});

// GET All Users
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

// POST User
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

// GET One User
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

// UPDATE User
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

// DELETE User
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

// POST Idea
app.post('/idea', authorizeUser, async (request, response) => {
  try {
    console.log('POST IDEA');

    if (!request.body.username) {
      response.status(400).send({ message: 'enter all requried information' });
    }
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'INSERT INTO popsicle_stick.idea (username, title, location, description, cost, indoor_outdoor, category, url, picture, weather, isCompleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        request.body.username,
        request.body.title,
        request.body.location ? request.body.location : null,
        request.body.description ? request.body.description : null,
        request.body.cost ? request.body.cost : null,
        request.body.indoor_outdoor ? request.body.indoor_outdoor : null,
        request.body.category ? request.body.category : null,
        request.body.url ? request.body.url : null,
        request.body.picture ? request.body.picture : null,
        request.body.weather ? request.body.weather : null,
        request.body.isCompleted ? request.body.isCompleted : null
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

// GET ALL Ideas
app.get('/ideas', async (request, response) => {
  try {
    console.log('GET ALL IDEAS');

    const con = await pool.getConnection();
    const recordset = await con.query('SELECT * FROM popsicle_stick.idea');
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

// GET One Idea - Done
app.get('/idea', authorizeUser, async (request, response) => {
  try {
    console.log('GET ONE IDEA');

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'SELECT * FROM popsicle_stick.idea WHERE id = ? AND username = ?',
      [request.query.id, request.query.username]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

// UPDATE Idea
app.put('/idea', authorizeUser, async (request, response) => {
  try {
    console.log('UPDATE ONE IDEA');

    const selectQuery = await pool.execute(
      'SELECT * FROM popsicle_stick.idea WHERE id = ? AND username = ?',
      [request.body.id, request.body.username]
    );

    console.log(selectQuery[0][0]);

    const selectedUser = selectQuery[0][0];
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'UPDATE popsicle_stick.idea SET title = ?, location = ?, description = ?, cost = ?, indoor_outdoor = ?, category = ?, url = ?, picture = ?, weather = ?, isCompleted = ? WHERE id = ? AND username = ?',
      [
        request.body.title ? request.body.title : selectedUser.title,
        request.body.location ? request.body.location : selectedUser.location,
        request.body.description
          ? request.body.description
          : selectedUser.description,
        request.body.cost ? request.body.cost : selectedUser.cost,
        request.body.indoor_outdoor
          ? request.body.indoor_outdoor
          : selectedUser.indoor_outdoor,
        request.body.category ? request.body.category : selectedUser.category,
        request.body.url ? request.body.url : selectedUser.url,
        request.body.picture ? request.body.picture : selectedUser.picture,
        request.body.weather ? request.body.weather : selectedUser.weather,
        request.body.isCompleted
          ? request.body.isCompleted
          : selectedUser.isCompleted,
        request.body.id,
        request.body.username
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

// DELETE Idea
app.delete('/idea', async (request, response) => {
  try {
    console.log('DELETE AN IDEA');
    const con = await pool.getConnection();
    const recordset = await con.execute(
      'DELETE FROM popsicle_stick.idea WHERE id = ? AND username = ?',
      [request.body.id, request.body.username]
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

module.exports.handler = serverless(app);
