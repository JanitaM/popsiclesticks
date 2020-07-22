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

    if (!request.body.email) {
      response.status(400).send({ message: 'enter all requried information' });
    }
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'INSERT INTO popsicle_stick.user (email, profilepic, date) VALUES (?, ?, ?)',
      [
        request.body.email,
        request.body.profilepic ? request.body.profilepic : null,
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

// POST Idea Pic - Done
app.post('/pic', authorizeUser, async (request, response) => {
  try {
    console.log('POST PIC');

    if (!request.body.s3uuid || !request.body.idea) {
      response.status(400).send({ message: 'missing s3uuid or idea id' });
    }
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'INSERT INTO popsicle_stick.ideapic (s3uuid, description, idea) VALUES (?, ?, ?)',
      [
        request.body.s3uuid,
        request.body.description ? request.body.description : null,
        request.body.idea
      ]
    );
    con.release();

    console.log(queryResponse);

    response.status(200).send({ messge: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET All Idea Pics - Done
app.get('/pics', async (request, response) => {
  try {
    console.log('GET ALL PICS');

    const con = await pool.getConnection();
    const recordset = await con.query('SELECT * FROM popsicle_stick.ideapic');
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET One Idea Pic - Done
app.get('/pic', authorizeUser, async (request, response) => {
  try {
    console.log('GET ONE PIC');

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'SELECT * FROM popsicle_stick.ideapic WHERE s3uuid = ? AND idea = ?',
      [request.body.s3uuid, request.body.idea]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// UPDATE Idea Pic - Done
app.put('/pic', authorizeUser, async (request, response) => {
  try {
    console.log('UPDATE ONE PIC');

    const selectQuery = await pool.execute(
      'SELECT * FROM popsicle_stick.ideapic WHERE s3uuid = ? AND idea = ?',
      [request.body.s3uuid, request.body.idea]
    );

    console.log(selectQuery[0][0]);

    const selectedUser = selectQuery[0][0];
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'UPDATE popsicle_stick.ideapic SET s3uuid = ?, description = ?, idea = ? WHERE s3uuid = ? AND idea = ?',
      [
        request.body.s3uuid ? request.body.s3uuid : selectedUser.s3uuid,
        request.body.description
          ? request.body.description
          : selectedUser.description,
        request.body.idea ? request.body.idea : selectedUser.idea,
        request.body.s3uuid,
        request.body.idea
      ]
    );
    con.release();

    console.log(queryResponse);

    response.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// DELETE Idea Pic - Done
app.delete('/pic', async (request, response) => {
  try {
    console.log('DELETE A PIC');
    const con = await pool.getConnection();
    const recordset = await con.execute(
      'DELETE FROM popsicle_stick.ideapic WHERE s3uuid = ? AND idea = ?',
      [request.body.s3uuid, request.body.idea]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET Everything - Done
app.get('/everything', authorizeUser, async (request, response) => {
  try {
    console.log('GET EVERYTHING');

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'SELECT * FROM popsicle_stick.ideapic JOIN popsicle_stick.idea ON popsicle_stick.idea.id = popsicle_stick.ideapic.idea JOIN popsicle_stick.user ON popsicle_stick.idea.username = popsicle_stick.user.username'
    );
    con.release();

    console.log(queryResponse[0]);

    response.status(200).send({ message: queryResponse[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET Everything By User - Done
app.get('/everythingbyuser', authorizeUser, async (request, response) => {
  try {
    console.log('GET EVERYTHING');

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'SELECT * FROM popsicle_stick.ideapic JOIN popsicle_stick.idea ON popsicle_stick.idea.id = popsicle_stick.ideapic.idea JOIN popsicle_stick.user ON popsicle_stick.idea.username = popsicle_stick.user.username WHERE popsicle_stick.user.username = ?',
      [request.body.username]
    );
    con.release();

    console.log(queryResponse[0]);

    response.status(200).send({ message: queryResponse[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

function authorizeUser(request, response, next) {
  next();
}

module.exports.handler = serverless(app);
