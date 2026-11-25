/**
 * File Upload & Asynchronous Operations Controller (Module 6)
 */
const { runAsyncFileDemo, runSyncFileDemo } = require('../utils/fileHandler');
const ApiResponse = require('../utils/apiResponse');

// @desc    Upload product image or farmer KYC document
// @route   POST /api/v1/upload
// @access  Public / Authenticated
const uploadFile = (req, res, next) => {
  try {
    if (!req.file) {
      return ApiResponse.badRequest(res, 'Please choose a file to upload');
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    return ApiResponse.created(res, 'File uploaded successfully', {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: fileUrl
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Academic Lab: Compare Async vs Sync file operations
// @route   GET /api/v1/academic/files/demo
// @access  Public
const getFileOperationsDemo = async (req, res, next) => {
  try {
    // 1. Asynchronous I/O demo (fs.promises)
    const asyncResult = await runAsyncFileDemo('New crop harvest ledger entry created.');

    // 2. Synchronous I/O demo (fs.readFileSync)
    const syncResult = runSyncFileDemo();

    return ApiResponse.success(res, 'Module 6: File Handling & Async Operations Lab Demo', {
      syllabusTopic: 'Module 6 – File Handling and Asynchronous Operations',
      conceptsDemonstrated: [
        'Node.js fs and fs.promises modules',
        'Asynchronous non-blocking file I/O with async/await',
        'Synchronous blocking file operations comparison',
        'Buffer byte length handling and streams readiness'
      ],
      asynchronousOperation: asyncResult,
      synchronousOperation: syncResult
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile,
  getFileOperationsDemo
};
