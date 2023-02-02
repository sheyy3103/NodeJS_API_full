const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const auth = req.header('Authorization');
    if (!auth) return res.status(401).json({"message":"Unprovided token"})
    const token = auth.split(' ')[1];
    try {
        const decode = jwt.verify(token,process.env.TOKEN_SECRET);
        req.id = decode.id;
        next();
    } catch (error) {
        res.status(401).json({"message":"Unexcepted token"})
    }
}

module.exports = isAuth;