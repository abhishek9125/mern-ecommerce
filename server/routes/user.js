const express = require('express');
const router = express.Router();

const { saveUserCart, getUserCart, emptyCart, saveAddress, applyCouponToUserCart, createOrder, createCashOrder, orders, addToWishlist, wishlist, removeToWishlist } = require('../controllers/user');

const { authCheck } = require('../middlewares/auth');

router.post('/user/cart', authCheck, saveUserCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);
router.get('/user/orders', authCheck, orders);
router.post('/user/order', authCheck, createOrder);
router.post('/user/cash-order', authCheck, createCashOrder);
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);
router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeToWishlist);

module.exports = router;