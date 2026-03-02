const router = require('express').Router();
const controller = require('./blog.controller');
const asyncHandler = require('../../middlewares/async.middleware');
const upload = require('../../middlewares/upload.middleware');
const validation = require('./blog.validation');

router.get(
  '/',
  asyncHandler(controller.list)
);

router.post(
  '/upload',
  upload.single('file'),
  validation.create,
  asyncHandler(controller.create)
);

module.exports = router;
