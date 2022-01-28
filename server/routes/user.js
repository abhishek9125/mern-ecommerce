const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
    res.json({
        data : 'Hey you hit Node API for user'
    })
});

module.exports = router;