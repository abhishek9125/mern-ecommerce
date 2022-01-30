const express = require('express');
const router = express.Router();

const { create, listAll, update, list, read, remove } = require('../controllers/product');

const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.post('/products', list)

module.exports = router;