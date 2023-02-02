const category = require("../models/category")


const categoryController = {
    getAll: (req, res) => {
        category.getAll((err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).json(result);
            }
        });
    },
    findByID: (req, res) => {
        category.findByID(req.params.id, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).json(result)
            }
        });
    },
    create: (req, res) => {
        category.create(req.body, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).json({ "message": "Added category successfully" });
            }
        });
    }
}

module.exports = categoryController;