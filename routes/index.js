var express = require('express');
var router = express.Router();
var controller = require('../controller');
console.log(controller);

router.get('/', controller.home.show);
router.get('/edit', controller.home.edit);
router.get('/users/edit', controller.users.edit);

module.exports = router;
