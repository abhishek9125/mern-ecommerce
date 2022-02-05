const express = require('express');
const router = express.Router();

const { saveUserCart, getUserCart, emptyCart } = require('../controllers/user');

const { authCheck } = require('../middlewares/auth');

router.post('/user/cart', authCheck, saveUserCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);

module.exports = router;