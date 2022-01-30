const express = require('express');
const router = express.Router();

const { create, listAll, read, remove } = require('../controllers/product');

const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.delete('/product/:slug', authCheck, adminCheck, remove);

module.exports = router;