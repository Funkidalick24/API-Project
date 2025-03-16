const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const initDB = (callback) => {
  if (_db) {
    console.warn("Trying to init DB again!");
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db("contacts"); // Specify your database name here
      callback(null, _db);
    })
    .catch((err) => {
      console.error("Failed to connect to database");
      callback(err, null);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Database is not initialized");
  }
  return _db;
};

module.exports = { initDB, getDB };
