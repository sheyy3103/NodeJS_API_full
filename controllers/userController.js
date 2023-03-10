const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const generateToken = require('../helpers/generateToken.js');
const saltRounds = 10;


const userController = {
    getAll: (req, res) => {
        user.getAll((err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.status(200).json(result);
            }
        });
    },
    register: (req, res) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                req.body.password = hash;
                user.register(req.body, (err, data) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.status(200).json(data);
                    }
                });
            });
        });
    },
    login: (req, res) => {
        user.checkLogin(req.body.email, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                if (results.length > 0) {
                    bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                        if (err) {
                            res.json(err);
                        } else {
                            if (result) {
                                const token = generateToken({ id: results[0].id });
                                user.setToken(results[0].id, { refresh_token: token.refreshToken }, (err, tokenData) => {
                                    if (err) {
                                        res.json(err);
                                    } else {
                                        res.status(200).json({ tokenData, token });
                                    }
                                })
                            } else {
                                res.json({ result, message: "Failed" });
                            }
                        }
                    })
                }
            }
        })
    },
    refreshToken: (req, res) => {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ "message": "Unprovided token" });
        } else {
            user.checkToken(refreshToken, (err, results) => {
                if (err) {
                    res.json(err);
                } else {
                    try {
                        var decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
                        const token = generateToken({ id: decoded.id });
                        user.setToken(decoded.id, { refresh_token: token.refreshToken }, (err, tokenData) => {
                            if (err) {
                                res.json(err);
                            } else {
                                res.status(200).json({ tokenData, token });
                            }
                        })
                    } catch (err) {
                        res.status(403).json({ "message": "Unexcepted token" });
                    }
                }
            });
        }
    }
};

module.exports = userController;