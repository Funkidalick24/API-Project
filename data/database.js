const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDB = (callback) => {
    if (_db) {
        console.warn('Trying to init DB again!');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        _db = client.db('contacts'); // Initialize with database name
        callback(null, _db);
    })
    .catch((err) => {
        console.error('Failed to connect to database:', err);
        callback(err);
    });
};

const getDB = () => {
    if (!_db) {
        throw new Error('Database not initialized');
    }
    return _db;
};

module.exports = { initDB, getDB };
