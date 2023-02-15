require('dotenv').config();

const http = require('http');
const https = require('https');
const mysql = require('mysql');

const dbConnect = () => {
  return new Promise((resolve, reject) => {

    const options = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };

    const db = mysql.createConnection(options);

    db.connect((err) => {
      if (err) {
        reject(err);
      }
      resolve(db);
    });
  });
};

const fetchTemp = () => {
  return new Promise((resolve, reject) => {
    https.get(process.env.BOILER_TEMP_URL, (res) => {

      let data = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        resolve(Buffer.concat(data).toString());
      });
    }).on('error', err => {
      reject(err.message);
    });
  });
}

const saveDataPoint = (db, value) => {
  return new Promise((resolve, reject) => {

    let post = { value, created_at: new Date() };
    let sql = "INSERT INTO data SET ?";

    db.query(sql, post, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

const getLastDataPoint = (db) => {
  return new Promise((resolve, reject) => {

    const sql = "SELECT value FROM data ORDER BY created_at DESC LIMIT 1";

    db.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

setInterval(async () => {
  try {

    const db = await dbConnect();
    const temp = await fetchTemp();
    await saveDataPoint(db, temp);

    db.end();

  } catch (err) {
    console.log(err);
  }
}, 5 * 60 * 1000);

const requestListener = async function (req, res) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    const db = await dbConnect();
    const value = await getLastDataPoint(db);

    db.end();

    res.end(value[0].value);
};

const server = http.createServer(requestListener);

server.listen(3110, 'localhost', () => {
    console.log('Server is running.');
});
