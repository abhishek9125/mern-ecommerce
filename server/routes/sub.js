const express = require('express');
const router = express.Router();

const { create, read, update, remove, list } = require('../controllers/sub');

const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/sub', authCheck, adminCheck, create);
router.get('/subs', list);
router.get('/sub/:slug', read);
router.put('/sub/:slug', authCheck, adminCheck, update);
router.delete('/sub/:slug', authCheck, adminCheck, remove);

module.exports = router;