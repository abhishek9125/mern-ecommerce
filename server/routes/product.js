const express = require('express');
const router = express.Router();

const { create, listAll, remove } = require('../controllers/product');

const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);
router.delete('/product/:slug', authCheck, adminCheck, remove);

module.exports = router;