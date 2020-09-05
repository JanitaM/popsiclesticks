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
const bucket = 'popsiclesticks2';

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

// later comes from currentAuthenticatedUser-the one that says token_use: id
const jwtIdToken =
  'eyJraWQiOiI5WkZSQlVDU2JrUnpzbWxZZHBYenEzdCtTK0hac2hnYzFLXC9DQkViRlBjST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2YmFkY2M5Mi04MjJhLTRmYWYtYTQ4ZS0wOTgzM2NjYWVkZWUiLCJhdWQiOiI0ZzhvbnMwZ25kbWprNGQ0dXVnZmFmMzZiYiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjQzMDlmZDIwLTViZGUtNGYxZi04ZDllLTIwMzBmOWNhZTgxMyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk5MzI5OTIxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9WcDVnNW1qbEwiLCJjb2duaXRvOnVzZXJuYW1lIjoianZtc3VyZnNAZ21haWwuY29tIiwiZXhwIjoxNTk5MzMzNTIxLCJpYXQiOjE1OTkzMjk5MjEsImVtYWlsIjoianZtc3VyZnNAZ21haWwuY29tIn0.C_v6fwmjRacvnfXXNO8aiHbda7_YjuF_krfHHSEZd0n5wVDYbRLq-rZ9NgfFEdhGov7Np6btrwt72Yy0Yq2hOkTzIWejuutJ3JQ8HX4xHzgoS4v82R6F6yXuXmPXX5OaocnJQ2s_W_u2k_2dqQsiiHQJ-W54Gp7mdyFjeSosXNsfxQ-GkHDVFMj613RpPnffnltvFtCfExLuOdnNbmnH0_i45Y2zNhQPWB7tTSMmEswpq0V3IHkysrvrAqIKh-UDdvKq5b2o6aYcO1SIzL2Gm8ZkP0dE5CDQBCeNJ8WJs1wGAJe-pDb2WYizjck4tWBZddva2qSMCbe6MuxkTgrGzA';

const jwks = {
  keys: [
    {
      alg: 'RS256',
      e: 'AQAB',
      kid: 'mwBui5OGtlWrfkdbR1/ZzfbXXcF6TsMw7207hQqlhOY=',
      kty: 'RSA',
      n:
        'rL4sw19DtbKaKDLbncrmBMn8n8_Zpt6X2wdrE-Vh0po4EYlVDng8wn3cye_LO0_nIDSmzA2kKRzF3ExKWVVVZ6YU9Ukxpoy5pKkxn1AeHk7fazicLWDjSlcaUaI0Q2bNQyq6seRc-ixX7FptLaIoBcJs4Ga0a3jJwtnpLTSUA_OkBKG96yhmeJidxbAwCAgUt53ksMxgQu4kbFCTW-wJAYxNb4-xlOoca_Kz0R3aOBQcCNqAe5s-QlBuHVxgDo65kbW6IaMac7hbc4u758biWacH3kEPhanM7syUwc-taDYHv73hTn-knu8BqgmW58mizRvEowH7zSx4Q8IAPNOxUQ',
      use: 'sig'
    },
    {
      alg: 'RS256',
      e: 'AQAB',
      kid: 'xfVBBSZuZL7cklp9WAEpxmBmA426CIJ6HuA9cua9fKk=',
      kty: 'RSA',
      n:
        'ncKGDGr_-tvhI-0kKx2prNtJ9IPXxxKiSWa9BXYvX9VYO3aO03mBo6fjgmD3B4kzygVxIzFZGKMzBdMyxpycZSzKA5zqlI8O_wYnSulB26zXXgG5wNRU6GfkcXukXMoIvyWpOGFOkE55VL-Me-sq6M5wCG3IKhj6QZMFDDoKXgSAfEa_DfAa3ZOO21gzNQHwKslwHgHhjAjM5q0zN8bShVwGb29i37dN-WiLxjYkg0tv171vFdzgohM6Fsp2cUJvlJ1m59y3qniP_gSg8RcutAI5qlFQuqYgHT9R_vT1sNyfVo9vlbuIxA--NT9xN3pDcL-GbXVKk-aYUMKoXNCW6Q',
      use: 'sig'
    }
  ]
};

const jwkIdToken = jwks.keys[0];
const jwkAccessToken = jwks.keys[1];
const pem = jwkToPem(jwkIdToken);

// GET All Users
// app.get('/users', authorizeUser, async (request, response) => {
//   try {
//     console.log('GET ALL USERS');

//     const email = request.decodedToken.email;
//     if (!email) {
//       response.status(400).send({ message: 'access denied' });
//     }

//     const con = await pool.getConnection();
//     const recordset = await con.query('SELECT * FROM popsicle_stick.user');
//     con.release();

//     console.log(recordset[0]);

//     response.status(200).send({ message: recordset[0] });
//   } catch (error) {
//     console.log(error);
//     response.status(500).send({ error: error.message, message: error });
//   }
// });

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

// GET One User
app.get('/user', authorizeUser, async (request, response) => {
  try {
    console.log('GET ONE USER');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'SELECT * FROM popsicle_stick.user WHERE email=?',
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

// GET User Profile Pic - Done
app.get('/user/profilepic', authorizeUser, async (request, response) => {
  console.log('GET USER PROFILE PIC');
  console.log(request.decodedToken.email);

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

// UPDATE User
app.put('/user', authorizeUser, async (request, response) => {
  try {
    console.log('UPDATE ONE USER');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const selectQuery = await pool.execute(
      'SELECT * FROM popsicle_stick.user WHERE email = ?',
      [email]
    );

    console.log(selectQuery[0][0]);

    const selectedUser = selectQuery[0][0];
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'UPDATE popsicle_stick.user SET email = ?, profilepic = ? WHERE email = ?',
      [
        email ? request.body.email : selectedUser.email,
        request.body.profilepic
          ? request.body.profilepic
          : selectedUser.profilepic,
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

// DELETE User
app.delete('/user', authorizeUser, async (request, response) => {
  try {
    console.log('DELETE USER');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'DELETE FROM popsicle_stick.user WHERE email = ?',
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

// POST Idea - Done
app.post('/user/idea', authorizeUser, async (request, response) => {
  try {
    console.log('POST IDEA');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'INSERT INTO popsicle_stick.idea (email, title, location, description, cost, indoor_outdoor, category, url, weather, isCompleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        email,
        request.body.title,
        request.body.location ? request.body.location : null,
        request.body.description ? request.body.description : null,
        request.body.cost ? request.body.cost : null,
        request.body.indoor_outdoor ? request.body.indoor_outdoor : null,
        request.body.category ? request.body.category : null,
        request.body.url ? request.body.url : null,
        request.body.weather ? request.body.weather : null,
        request.body.isCompleted
      ]
    );

    // insert pic into ideapic
    con.release();

    console.log(queryResponse);

    response.status(200).send({ messge: queryResponse });
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
      'SELECT * FROM popsicle_stick.idea WHERE id = ? AND email = ?',
      // [request.query.id, email]
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

// UPDATE Idea - working
app.patch('/user/idea', authorizeUser, async (request, response) => {
  try {
    console.log('UPDATE ONE IDEA');
    console.log(request.body);

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const selectQuery = await pool.execute(
      'SELECT * FROM popsicle_stick.idea WHERE id = ? AND email = ?',
      [request.body.id, email]
    );
    console.log(selectQuery[0][0]);
    const selectedUser = selectQuery[0][0];

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'UPDATE popsicle_stick.idea SET title = ?, location = ?, description = ?, cost = ?, indoor_outdoor = ?, category = ?, url = ?, weather = ?, isCompleted = ? WHERE id = ? AND email = ?',
      [
        request.body.title,
        request.body.location ? request.body.location : null,
        request.body.description ? request.body.description : null,
        request.body.cost ? request.body.cost : null,
        request.body.indoor_outdoor ? request.body.indoor_outdoor : null,
        request.body.category ? request.body.category : null,
        request.body.url ? request.body.url : null,
        request.body.picture ? request.body.picture : null,
        request.body.weather ? request.body.weather : null,
        request.body.isCompleted ? request.body.isCompleted : null,
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

// DELETE Idea
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

// GET Idea Pic - Needs to be POST to get uuid in
app.post('/idea/pic', authorizeUser, async (request, response) => {
  console.log('GET IDEA PIC');
  // console.log(request.body.picUuid);

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

// POST Idea Pic
app.post('/idea/pic', authorizeUser, async (request, response) => {
  try {
    console.log('POST PIC');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    if (!request.body.s3uuid || !request.body.idea) {
      response.status(400).send({ message: 'missing s3uuid or email' });
    }
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'INSERT INTO popsicle_stick.ideapic (s3uuid, email) VALUES (?, ?)',
      [request.body.s3uuid, request.body.email]
    );
    con.release();

    console.log(queryResponse);

    response.status(200).send({ messge: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET All Idea Pics
app.get('/idea/pics', authorizeUser, async (request, response) => {
  try {
    console.log('GET ALL PICS');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

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

// GET One Idea Pic
app.get('/idea/pic', authorizeUser, async (request, response) => {
  try {
    console.log('GET ONE PIC');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'SELECT * FROM popsicle_stick.ideapic WHERE s3uuid = ? AND email = ?',
      [request.body.s3uuid, request.body.email]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// UPDATE Idea Pic
app.put('/idea/pic', authorizeUser, async (request, response) => {
  try {
    console.log('UPDATE ONE PIC');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const selectQuery = await pool.execute(
      'SELECT * FROM popsicle_stick.ideapic WHERE s3uuid = ? AND email = ?',
      [request.body.s3uuid, request.body.email]
    );

    console.log(selectQuery[0][0]);

    const selectedUser = selectQuery[0][0];
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      'UPDATE popsicle_stick.ideapic SET s3uuid = ? WHERE s3uuid = ? AND email = ?',
      [
        request.body.s3uuid ? request.body.s3uuid : selectedUser.s3uuid,
        request.body.s3uuid,
        request.body.email
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

// DELETE Idea Pic
app.delete('/idea/pic', authorizeUser, async (request, response) => {
  try {
    console.log('DELETE A PIC');

    const email = request.decodedToken.email;
    if (!email) {
      response.status(400).send({ message: 'access denied' });
    }

    const con = await pool.getConnection();
    const recordset = await con.execute(
      'DELETE FROM popsicle_stick.ideapic WHERE s3uuid = ? AND email = ?',
      [request.body.s3uuid, request.body.email]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

// GET Everything
// app.get('/everything', authorizeUser, async (request, response) => {
//   try {
//     console.log('GET EVERYTHING');

//     const email = request.decodedToken.email;
//     if (!email) {
//       response.status(400).send({ message: 'access denied' });
//     }

//     const con = await pool.getConnection();
//     const queryResponse = await con.execute(
//       'SELECT * FROM popsicle_stick.ideapic JOIN popsicle_stick.idea ON popsicle_stick.idea.id = popsicle_stick.ideapic.idea JOIN popsicle_stick.user ON popsicle_stick.idea.email = popsicle_stick.user.email'
//     );
//     con.release();

//     console.log(queryResponse[0]);

//     response.status(200).send({ message: queryResponse[0] });
//   } catch (error) {
//     console.log(error);
//     response.status(500).send({ error: error.message, message: error });
//   }
// });

// GET Everything By User - Done
// app.get('/everythingbyuser', authorizeUser, async (request, response) => {
//   try {
//     console.log('GET EVERYTHING');

//     const email = request.decodedToken.email;
//     if (!email) {
//       response.status(400).send({ message: 'access denied' });
//     }

//     const con = await pool.getConnection();
//     const queryResponse = await con.execute(
//       'SELECT * FROM popsicle_stick.ideapic JOIN popsicle_stick.idea ON popsicle_stick.idea.id = popsicle_stick.ideapic.idea JOIN popsicle_stick.user ON popsicle_stick.idea.email = popsicle_stick.user.email WHERE popsicle_stick.user.email = ?',
//       [email]
//     );
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
  console.log(request.query.token);

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
