var express = require('express');
var router = express.Router();
var controller = require('../core/controller');

router.get('/', (req, res) => {
    res.render('index', {});
});

module.exports = router;
