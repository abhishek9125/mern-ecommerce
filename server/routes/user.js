const express = require('express');
const router = express.Router();

const { userCart } = require('../controllers/user');

const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/cart', authCheck, userCart);

module.exports = router;