const express = require('express');
const router = express.Router();

const { create, listAll, update, list, read, productsCount, productStar, remove } = require('../controllers/product');

const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/product', authCheck, adminCheck, create);
router.get('/product/total', productsCount);
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.post('/products', list);
router.put('/product/star/:productId', authCheck, productStar);

module.exports = router;