const express = require('express');
const router = express.Router();

const { saveUserCart, getUserCart, emptyCart, saveAddress, applyCouponToUserCart, createOrder } = require('../controllers/user');

const { authCheck } = require('../middlewares/auth');

router.post('/user/cart', authCheck, saveUserCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);
router.post('/user/order', authCheck, createOrder);
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);

module.exports = router;