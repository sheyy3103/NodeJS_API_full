const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "5m"
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn: "10m"
    });

    return {
        token,
        refreshToken
    }
}

module.exports = generateToken;