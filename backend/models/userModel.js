const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

function createUser(username, password, callback) {
    const hash = bcrypt.hashSync(password, 10);

    db.run(
        `INSERT INTO users (username, password_hash) VALUES (?, ?)`,
        [username, hash],
        function (err) {
            if (err) return callback(err);
            callback(null, { id: this.lastID });
        }
    );
}

function findUserByUsername(username, callback) {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
        callback(err, row);
    });
}

module.exports = {
    createUser,
    findUserByUsername
};
