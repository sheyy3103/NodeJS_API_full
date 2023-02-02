const uploadFile = require("../config/file");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const isAuth = require("../middleware/auth");

module.exports = (app) => {
    app.get('/api/category',isAuth, categoryController.getAll);
    app.get('/api/category/:id',isAuth, categoryController.findByID);
    app.post('/api/category', categoryController.create);
    app.get('/api/product',isAuth, productController.getAll);
    app.get('/api/product/:id',isAuth, productController.findByID);
    app.post('/api/product',uploadFile.single('uploaded_file'), productController.create);
}