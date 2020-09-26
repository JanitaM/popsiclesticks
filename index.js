require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const aws = require('aws-sdk');
const asyncMap = require('./helpers');
const { CodeCommit } = require('aws-sdk');

function setCreds() {
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
  });
}
setCreds();

const s3 = new aws.S3();
const bucket = 'popsiclesticks2135535-dev';

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pool = mysql.createPool({
  host: process.env.AWS_HOST,
  user: process.env.AWS_USER,
  password: process.env.AWS_PASSWORD
});

const jwks = {
  keys: [
    {
      alg: 'RS256',
      e: 'AQAB',
      kid: '9ZFRBUCSbkRzsmlYdpXzq3t+S+HZshgc1K/CBEbFPcI=',
      kty: 'RSA',
      n:
        'hyMqPuYzrljIlPrdCIMaOr0kE4qvGL1svMP66xG7NvUeKBJfNNymwXrKAdUjFShJurT0_IJVWG3O10xb8fn3ylhnxHxiTGtv-myTt4sBqDxya4uW9j4VFt6k2aBPOskjg8DcsWHgp32jzAXNd2_XJTHtp5-IogRLkJj_mGodYRy5ehFJNc-cnc8LOtM1Ss5sNTz2S62I6UsGi2Kp3AEnVwL3jIjKQg6y_DJ4e7ItiKl8ccQOnPpiEUBZm-s2sKCMvmIyf08H08-Zzynzgg9WayTD5EHAYRd5oGvEEPb62SuuP8IAjHLN5ccwL0G5SaqK3vJb286c5bl2gKtBJrLZnQ',
      use: 'sig'
    },
    {
      alg: 'RS256',
      e: 'AQAB',
      kid: 'KcYJh05RlG3/plnVBOBSCIFa2xNVBqTAcDPXVMDYxJ0=',
      kty: 'RSA',
      n:
        'gnP76WNQ1nfOvIIaeMtxdvNSYPboaTy7VVzdquesN4QgS9rHhvdp7QB9SrJIrjplquM6s_hjU4x7tSiwsrKBgWDGpTFD0NvJgqsmxsdkHY5nAN_pb8U7obq5JWjZuwrGGtIr2jq2fJH_y_kShdIdXd_w3OO80aKsdq5Hae-fm1nmx0N6SLT7w7EPQ4siszUgKyF2dcsNng1_NX4cussx-jamiekL5Gb5pDkQTKOA-cr5gKgyNlqqpGxN0kCu-KXlBEMNDQmaB1Vb4ZeXBHE5wIqPxzTAQWD8mmWkmle86HpZk1JvSK5d1Yv3cS491AVwvVJ9lgEuPrEiGioCXWWbAw',
      use: 'sig'
    }
  ]
};

const jwkIdToken = jwks.keys[0];
const jwkAccessToken = jwks.keys[1];
const pem = jwkToPem(jwkIdToken);

// POST User - Done
app.post('/user', async (request, response) => {
  try {
    console.log('POST USER');

    if (!request.body.email) {
      response.status(400).send({ message: 'enter all required information' });
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
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET One User - Done
app.get('/user', authorizeUser, async (request, response) => {
  try {
    console.log('GET ONE USER');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'SELECT * FROM popsicle_stick.user WHERE email = ?',
      [email]
    );
    con.release();
    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET User Profile Pic From S3 - Done
app.get('/user/profilepic', authorizeUser, async (request, response) => {
  console.log('GET USER PROFILE PIC');

  const email = request.decodedToken.email;
  if (!email) {
    response.status(400).send({ message: 'access denied' });
  }

  async function getS3Data() {
    const s3Response = await s3
      .listObjectsV2({
        Bucket: bucket,
        Prefix: `public/${email}/profilepics`
      })
      .promise();

    // console.log(s3Response.Contents);
    const filesToRetriveArray = s3Response.Contents;

    try {
      const resolvedFiles = await asyncMap(
        filesToRetriveArray.map((file) =>
          s3
            .getObject({
              Bucket: bucket,
              Key: file.Key
            })
            .promise()
        )
      );
      // console.log('resolved files', resolvedFiles);

      let sortedResolvedFiles = resolvedFiles.sort(function (a, b) {
        return a.LastModified - b.LastModified;
      });
      const currentPic = sortedResolvedFiles[sortedResolvedFiles.length - 1];
      // console.log(currentPic);

      // response.status(200).send(resolvedFiles);
      response.status(200).send(currentPic);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  }
  getS3Data();
});

// POST Idea - Done
app.post('/user/idea', authorizeUser, async (request, response) => {
  try {
    console.log('POST IDEA');

    const email = request.decodedToken.email;

    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }
    if (!request.body.title) {
      response.status(400).send({ message: 'a title is required' });
    }

    const con = await pool.getConnection();
    const queryIdeaResponse = await con.execute(
      'INSERT INTO popsicle_stick.idea (email, title, location, description, cost, indoor_outdoor, category, url, picture, weather) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        email,
        request.body.title,
        request.body.location ? request.body.location : null,
        request.body.description ? request.body.description : null,
        request.body.cost ? request.body.cost : null,
        request.body.indoor_outdoor ? request.body.indoor_outdoor : null,
        request.body.category ? request.body.category : null,
        request.body.url ? request.body.url : null,
        request.body.picture ? request.body.picture : null,
        request.body.weather ? request.body.weather : null
      ]
    );
    con.release();

    // console.log(queryIdeaResponse);

    response.status(200).send({ message: queryIdeaResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET ALL Ideas by User - Done
app.get('/user/ideas', authorizeUser, async (request, response) => {
  try {
    console.log('GET ALL IDEAS');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const recordset = await con.query(
      'SELECT * FROM popsicle_stick.idea WHERE email = ?',
      [email]
    );
    con.release();

    // console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET One Idea - Done
app.get('/user/idea', authorizeUser, async (request, response) => {
  try {
    console.log('GET ONE IDEA');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'SELECT * FROM popsicle_stick.idea WHERE email = ?',
      [request.body.id, email]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET Filtered Ideas
app.post('/filteredIdeas', authorizeUser, async (request, response) => {
  try {
    console.log('GET FILTERED IDEAS');
    console.log(request.body.data);

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const params = [];
    let sql = `SELECT * FROM popsicle_stick.idea WHERE email = "${email}"`;

    if (request.body.data.cost) {
      sql += ` AND cost = "${request.body.data.cost}"`;
    }

    if (request.body.data.indoor_outdoor) {
      sql += ` AND indoor_outdoor = "${request.body.data.indoor_outdoor}"`;
    }

    if (request.body.data.weather) {
      sql += ` AND weather = "${request.body.data.weather}"`;
    }

    console.log(sql);
    const con = await pool.getConnection();
    const recordset = await con.execute(sql);
    con.release();

    console.log('recordset', recordset[0]);
    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// UPDATE Idea - Done
app.put('/user/idea', authorizeUser, async (request, response) => {
  try {
    console.log('UPDATE ONE IDEA');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const selectQuery = await pool.execute(
      'SELECT * FROM popsicle_stick.idea WHERE id = ? AND email = ?',
      [request.body.id, email]
    );
    // console.log('existing info', selectQuery[0][0]);
    const selectedUser = selectQuery[0][0];

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'UPDATE popsicle_stick.idea SET title = ?, location = ?, description = ?, cost = ?, indoor_outdoor = ?, category = ?, url = ?, picture = ?, weather = ? WHERE id = ? AND email = ?',
      [
        request.body.title,
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
        request.body.id,
        email
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

// DELETE Idea - Done
app.delete('/user/idea', authorizeUser, async (request, response) => {
  try {
    console.log('DELETE AN IDEA');
    console.log(request.body.id);

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();

    if (typeof request.body.id === 'number') {
      con.execute(
        'DELETE FROM popsicle_stick.completed WHERE id = ? AND email = ?',
        [request.body.id, email]
      );
    } else {
      request.body.id.map((id) => {
        con.execute(
          'DELETE FROM popsicle_stick.completed WHERE id = ? AND email = ?',
          [id, email]
        );
      });
    }

    if (typeof request.body.id === 'number') {
      con.execute(
        'DELETE FROM popsicle_stick.idea WHERE id = ? AND email = ?',
        [request.body.id, email]
      );
    } else {
      request.body.id.map((id) => {
        con.execute(
          'DELETE FROM popsicle_stick.idea WHERE id = ? AND email = ?',
          [id, email]
        );
      });
    }
    con.release();

    response.status(200).send('success');
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET Idea Pic From S3 - Needs to be POST to get uuid in?
app.post('/idea/pic', authorizeUser, async (request, response) => {
  console.log('GET IDEA PIC');

  const email = request.decodedToken.email;
  if (!email) {
    response.status(400).send({ message: 'access denied' });
  }

  async function getS3Data() {
    const s3Response = await s3
      .listObjectsV2({
        Bucket: bucket,
        Prefix: `public/${email}/ideaPictures`
      })
      .promise();
    // console.log(s3Response.Contents);

    const matchingFile = [];
    s3Response.Contents.map((file) => {
      if (file.Key.includes(request.body.picUuid)) {
        return matchingFile.push(file);
      }
    });
    // console.log('matchingfile', matchingFile);

    try {
      const resolvedFile = await asyncMap(
        matchingFile.map((file) =>
          s3
            .getObject({
              Bucket: bucket,
              Key: file.Key
            })
            .promise()
        )
      );
      // console.log('resolvedFile', resolvedFile);
      response.status(200).send(resolvedFile);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  }
  getS3Data();
});

// DELETE Idea Pic From S3
app.delete('/idea/pic', authorizeUser, async (request, response) => {
  try {
    console.log('DELETE A PIC');
    // console.log(request.body);

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    // Get the file type
    const s3Response = await s3
      .listObjectsV2({
        Bucket: bucket,
        Prefix: `public/${email}/ideaPictures`
      })
      .promise();
    // console.log('s3Res', s3Response.Contents);

    const matchingFile = [];
    s3Response.Contents.map((file) => {
      if (file.Key.includes(request.body.uuid)) {
        return matchingFile.push(file);
      }
    });
    // console.log('matchFileKey', matchingFile[0].Key);
    let fileName = matchingFile[0].Key;
    let type = fileName.split('.');
    // console.log(type[2]);

    // Delete the pic
    var params = {
      Bucket: bucket,
      Key: `public/${email}/ideaPictures/${request.body.uuid}.${type[2]}`
    };
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log('err', err.stack);
      } else {
        console.log('succes', data);
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// POST Idea to Completed - Done
app.post('/completed', authorizeUser, async (request, response) => {
  try {
    console.log('POST IDEA TO COMPLETE');
    console.log(request.body);
    const email = request.decodedToken.email;

    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const queryIdeaResponse = await con.execute(
      'INSERT INTO popsicle_stick.completed (id, email, isCompleted) VALUES (?, ?, ?)',
      [request.body.id, email, request.body.isCompleted]
    );
    con.release();

    console.log(queryIdeaResponse);

    response.status(200).send({ message: queryIdeaResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET All Completed Ideas - Done
app.get('/completedIdeas', authorizeUser, async (request, response) => {
  try {
    console.log('GET ALL COMPLETED IDEAS');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'SELECT * FROM popsicle_stick.idea INNER JOIN popsicle_stick.completed ON popsicle_stick.idea.id = popsicle_stick.completed.id WHERE popsicle_stick.completed.isCompleted = "1" AND popsicle_stick.idea.email = ? ORDER BY popsicle_stick.idea.title ASC ',
      [email]
    );
    con.release();
    // console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET One Completed Idea - Done
app.get('/completedIdea', authorizeUser, async (request, response) => {
  try {
    console.log('GET ONE COMPLETED IDEA');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'SELECT * FROM popsicle_stick.completed WHERE id = ? AND email = ?',
      [request.query.id, email]
    );
    con.release();
    // console.log(recordset[0].isCompleted);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// UPDATE Completed Status - Done
app.put('/completedIdea', authorizeUser, async (request, response) => {
  try {
    console.log('UPDATE ONE PIC');

    if (request.body.isCompleted === true) {
      request.body.isCompleted = 1;
    } else {
      request.body.isCompleted = 0;
    }

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'UPDATE popsicle_stick.completed SET isCompleted = ? WHERE id = ? AND email = ?',
      [request.body.isCompleted, request.body.id, request.body.email]
    );
    con.release();
    console.log(queryResponse);

    response.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET Everything By User - On Home Screen?
// app.get('/everythingbyuser', authorizeUser, async (request, response) => {
//   try {
//     console.log('GET EVERYTHING');

//     const email = request.decodedToken.email;
//     if (!email) {
//       response.status(400).send({ message: 'access denied' });
//     }

//     const con = await pool.getConnection();
// const queryResponse = await con.execute(
//   'SELECT * FROM popsicle_stick.ideapic JOIN popsicle_stick.idea ON popsicle_stick.idea.id = popsicle_stick.ideapic.idea JOIN popsicle_stick.user ON popsicle_stick.idea.email = popsicle_stick.user.email WHERE popsicle_stick.user.email = ?',
//   [email]
// );
//     con.release();

//     console.log(queryResponse[0]);

//     response.status(200).send({ message: queryResponse[0] });
//   } catch (error) {
//     console.log(error);
//     response.status(500).send({ error: error.message, message: error });
//   }
// });

// Authorize User
function authorizeUser(request, response, next) {
  console.log('AuthroizeUser');

  if (request.query.token) request.body.token = request.query.token;
  const tokenFromRequestBody = request.body.token;

  try {
    jwt.verify(tokenFromRequestBody, pem, function (error, decodedToken) {
      if (error) {
        console.log(error);
        return response.status(403).send(error);
      }

      request.decodedToken = decodedToken;
    });

    next();
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
}

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
