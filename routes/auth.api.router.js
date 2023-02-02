const userController = require('../controllers/userController');

module.exports = (app) => {
    app.get('/api/account', userController.getAll);

    app.post('/api/register', userController.register);
    app.post('/api/login', userController.login);

    app.post('/api/token', userController.refreshToken);
};