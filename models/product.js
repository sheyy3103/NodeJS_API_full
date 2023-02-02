const conn = require("../config/database");

const product = {
    getALL: (cb) => {
        let sql = "SELECT p.*, c.name as category_name FROM products p JOIN categories c on p.category_id = c.id ORDER BY p.name ASC";
        conn.query(sql, (err, result) => {
            if (err) {
                return cb(err)
            } else {
                return cb(null, result);
            }
        });
    },
    findByID: (id, cb) => {
        let sql = "SELECT * FROM products WHERE id = ?";
        conn.query(sql, id, (err, result) => {
            if (err) {
                return cb(err)
            } else {
                return cb(null, result[0]);
            }
        });
    },
    create: (data, cb) => {
        let sql = "INSERT INTO products SET ?";
        conn.query(sql, data, (err, result) => {
            if (err) {
                return cb(err)
            } else {
                return cb(null, result);
            }
        });
    }
}

module.exports = product;