require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAccessToken(mail) {
    const payload = { email: mail }

                    console.log(payload)

    const secret = process.env.JWT_KEY;
    const options = { expiresIn: '48h' };

    return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token) {
    return new Promise((resolve) => {

        const secret = process.env.JWT_KEY;

    try {
        const decoded = jwt.verify(token, secret);
        resolve({ success: true, data: decoded });
    } catch (error) {
        resolve({ success: false, error: error.message });
    }

    })
    
}

module.exports = {generateAccessToken, verifyAccessToken}