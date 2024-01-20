const express = require('express');

var temp = express.Router();

temp.get('/', function(req, res) {
  res.send('Hello from temp root route.');

  // const db = await dbConnect();
  // const value = await getLastDataPoint(db);

  // db.end();

  // res.end(value[0].value);
});

temp.get('/users', function(req, res) {
  res.send('List of APIv1 users.');
});

module.exports = temp;

// setInterval(async () => {
//   try {
//
//     const db = await dbConnect();
//     const temp = await fetchTemp();
//     await saveDataPoint(db, temp);
//
//     db.end();
//
//   } catch (err) {
//     console.log(err);
//   }
// }, 5 * 60 * 1000);


// const fetchTemp = () => {
//   return new Promise((resolve, reject) => {
//     https.get(process.env.BOILER_TEMP_URL, (res) => {
//
//       let data = [];
//
//       res.on('data', chunk => {
//         data.push(chunk);
//       });
//
//       res.on('end', () => {
//         resolve(Buffer.concat(data).toString());
//       });
//     }).on('error', err => {
//       reject(err.message);
//     });
//   });
// }
//
// const saveDataPoint = (db, value) => {
//   return new Promise((resolve, reject) => {
//
//     let post = { value, created_at: new Date() };
//     let sql = "INSERT INTO data SET ?";
//
//     db.query(sql, post, (err) => {
//       if (err) {
//         reject(err);
//       }
//       resolve();
//     });
//   });
// }
//
// const getLastDataPoint = (db) => {
//   return new Promise((resolve, reject) => {
//
//     const sql = "SELECT value FROM data ORDER BY created_at DESC LIMIT 1";
//
//     db.query(sql, (err, rows) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(rows);
//     });
//   });
// }