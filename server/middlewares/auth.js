const admin = require('../firebase');

exports.authCheck = (req, res, next) => {
    console.log('Hello : ', req.headers);
    next();
}