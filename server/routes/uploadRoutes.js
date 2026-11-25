const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadFile, getFileOperationsDemo } = require('../controllers/fileUploadController');

// Upload single file (Module 6)
router.post('/', upload.single('file'), uploadFile);

// Academic Lab: Async vs Sync operations
router.get('/academic-demo', getFileOperationsDemo);

module.exports = router;
