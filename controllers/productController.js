const product = require("../models/product")

const productController = {
    getAll: (req, res) => {
        product.getALL((err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).json(result);
            }
        });
    },
    findByID: (req, res) => {
        product.findByID(req.params.id, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).json(result)
            }
        });
    },
    create: (req, res) => {
        req.body.image = req.get('host')+`/${req.file.filename}`;
        product.create(req.body, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).json({"message": "Added product successfully"})
            }
        });
    }
}

module.exports = productController;