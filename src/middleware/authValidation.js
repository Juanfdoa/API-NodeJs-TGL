const jwt = require('jsonwebtoken')
require('dotenv').config();

function isAuthenticated(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send('unauthorized')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            console.log(err)
            return res.status(403).send('Forbidden')
            
        }
        req.user = payload;
        next();
    })
}

module.exports = isAuthenticated;