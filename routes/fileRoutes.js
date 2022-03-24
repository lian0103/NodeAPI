const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.route('/').get(fileController.uploadPage);

router.route('/file/:fileName').get(fileController.getFile);

router.post('/fileupload', fileController.uploadFile);

module.exports = router;
