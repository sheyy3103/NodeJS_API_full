const conn = require("../config/database");


const category = {
    getAll: (cb) => {
        let sql = "SELECT * FROM categories ORDER BY name ASC";
        conn.query(sql, (err, result) => {
            if (err) {
                return cb(err);
            } else {
                return cb(null, result);
            }
        });
    },
    findByID: (id, cb) => {
        let sql = "SELECT * FROM categories WHERE id = ?";
        conn.query(sql, [id], (err, result) => {
            if (err) {
                return cb(err);
            } else {
                return cb(null, result[0]);
            }
        });
    },
    create: (data, cb) => {
        let sql = "INSERT INTO categories SET ?";
        conn.query(sql, data, (err, result) => {
            if (err) {
                return cb(err);
            } else {
                return cb(null, result);
            }
        });
    }
}

module.exports = category;