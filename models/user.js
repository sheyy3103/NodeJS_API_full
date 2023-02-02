const conn = require('../config/database');

const user = {
    getAll: (cb) => {
        let sql = "SELECT * FROM users";
        conn.query(sql, (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },

    register: (data, cb) => {
        let sql = "INSERT INTO users SET ?";
        conn.query(sql, data, (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },

    checkLogin: (data, cb) => {
        let sql = "SELECT * FROM users WHERE email = ? ";
        conn.query(sql, data, (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },
    setToken: (id, token, cb) => {
        let sql = "UPDATE users SET ? WHERE id = ? ";
        conn.query(sql, [token, id], (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    },
    checkToken: (refreshToken, cb) => {
        let sql = "SELECT * FROM users WHERE refresh_token = ?";
        conn.query(sql, refreshToken, (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    }
};

module.exports = user;