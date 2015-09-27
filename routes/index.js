var express = require('express');
var router = express.Router();
var controller = require('../controller');

router.get('/', controller.home.show);

router.get('/user/', controller.users.edit);
router.get('/user/show/:id', controller.users.edit);
router.put('/user/edit/:id', controller.users.edit);
router.post('/user/add', controller.users.edit);
router.delete('/user/delete/:id', controller.users.edit);

router.get('/post/', controller.posts.index);
router.get('/post/show/:id', controller.posts.show);
router.put('/post/edit/:id', controller.posts.edit);
router.post('/post/add', controller.posts.add);
router.delete('/post/delete/:id', controller.posts.delete);

module.exports = router;
