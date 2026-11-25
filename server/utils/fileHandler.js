/**
 * File Handling & Asynchronous Operations Lab (Module 6)
 * Demonstrates: Node.js fs, fs.promises, sync vs async I/O, Buffer operations.
 */
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const storageDir = path.resolve(__dirname, '../uploads');

// Ensure upload directory exists asynchronously
const ensureStorageDir = async () => {
  try {
    await fsPromises.access(storageDir);
  } catch {
    await fsPromises.mkdir(storageDir, { recursive: true });
  }
};

/**
 * Educational Demonstration: Asynchronous File Operations with async/await & Promises
 */
const runAsyncFileDemo = async (content = 'RythuConnect Farm Ledger Log Entry') => {
  await ensureStorageDir();
  const demoFile = path.join(storageDir, 'academic_async_ledger.txt');

  const timestamp = new Date().toISOString();
  const logContent = `[${timestamp}] ${content}\n`;

  // Asynchronous append using fs.promises
  await fsPromises.appendFile(demoFile, logContent, 'utf8');

  // Asynchronous read
  const data = await fsPromises.readFile(demoFile, 'utf8');

  // Buffer demonstration
  const buffer = Buffer.from(logContent, 'utf8');

  return {
    operation: 'Asynchronous fs.promises.appendFile + readFile',
    filePath: demoFile,
    fileSizeInBytes: (await fsPromises.stat(demoFile)).size,
    bufferByteLength: buffer.length,
    recentContent: data.split('\n').filter(Boolean).slice(-5)
  };
};

/**
 * Educational Demonstration: Synchronous File Read (For comparison in syllabus)
 */
const runSyncFileDemo = () => {
  const demoFile = path.join(storageDir, 'academic_sync_manifest.json');
  const manifestData = {
    system: 'RythuConnect File Handling Module',
    syncMode: true,
    checkedAt: new Date().toISOString()
  };

  // Synchronous write
  fs.writeFileSync(demoFile, JSON.stringify(manifestData, null, 2), 'utf8');

  // Synchronous read
  const readBack = fs.readFileSync(demoFile, 'utf8');

  return {
    operation: 'Synchronous fs.writeFileSync + readFileSync',
    parsed: JSON.parse(readBack)
  };
};

module.exports = {
  ensureStorageDir,
  runAsyncFileDemo,
  runSyncFileDemo,
  storageDir
};
