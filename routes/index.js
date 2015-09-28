var express = require('express');
var router = express.Router();
var controller = require('../controller');

router.get('/', controller.home.index);
router.post('/url-break-points', controller.process.getBreakPoints);

module.exports = router;
