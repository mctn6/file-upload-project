const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/upload', fileController.uploadFile);
router.get('/files', fileController.getUploadedFiles);
router.get('/download/:fileName', fileController.downloadFile);

module.exports = router;