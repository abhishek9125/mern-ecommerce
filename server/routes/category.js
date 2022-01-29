const express = require('express');
const router = express.Router();

const { create, read, update, remove, list } = require('../controllers/category');

const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);

module.exports = router;