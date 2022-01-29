const admin = require('../firebase');

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
    next();
}