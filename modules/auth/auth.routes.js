const router = require('express').Router();
const controller = require('./auth.controller');
const asyncHandler = require('../../middlewares/async.middleware');

router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));

module.exports = router;