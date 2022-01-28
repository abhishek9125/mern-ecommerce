const admin = require('../firebase');

exports.authCheck = (req, res, next) => {
    console.log('Hello');
    next();
}