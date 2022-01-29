const admin = require('../firebase');
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        req.user = firebaseUser; // Added to req object to access at controller
        next();
    } catch (error) {
        console.log("Error Validating the Token : ", error);
        res.status(401).json({
            error: 'Token is either Invalid or Expired.'
        })
    }
}

exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user;
        const adminUser = await User.findOne({ email }).exec();
        
        if(adminUser.role !== 'admin') {
            res.status(403).json({
                error : 'Admin Resouce. Access Denied'
            });
        } else {
            next();
        }
        
    } catch (error) {
        console.log('Error Validating Admin : ', admin);
    }
}