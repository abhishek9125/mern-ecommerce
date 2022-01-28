const express = require('express');

const router = express.Router();

router.get('/create-or-update-user', (req, res) => {
    res.json({
        data : 'Hey you hit Node API'
    })
});

module.exports = router;