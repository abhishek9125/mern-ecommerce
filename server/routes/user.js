const express = require('express');
const router = express.Router();

const { saveUserCart, getUserCart } = require('../controllers/user');

const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/user/cart', authCheck, saveUserCart);
router.get('/user/cart', authCheck, getUserCart);

module.exports = router;