/**
 * Node.js Streams & Data Processing (Module 7)
 * Demonstrates: Readable, Transform, Writable streams, pipe(), chunk transformation.
 */
const { Readable, Transform } = require('stream');

/**
 * Creates a Transform stream that converts JavaScript Order/Sales objects into CSV text rows.
 */
class ObjectToCsvTransform extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
    this.isHeaderWritten = false;
  }

  _transform(chunk, encoding, callback) {
    try {
      let output = '';

      // Write CSV Header on the first row
      if (!this.isHeaderWritten) {
        output += 'Order ID,Date,Product Name,Farmer Name,Customer Name,Quantity (KG),Unit Price (INR),Total Subtotal (INR),Status\n';
        this.isHeaderWritten = true;
      }

      // Convert chunk to CSV row
      const row = [
        `"${chunk.orderId || ''}"`,
        `"${chunk.date || ''}"`,
        `"${chunk.productName || ''}"`,
        `"${chunk.farmerName || ''}"`,
        `"${chunk.customerName || ''}"`,
        chunk.quantity || 0,
        chunk.unitPrice || 0,
        chunk.subtotal || 0,
        `"${chunk.status || ''}"`
      ].join(',') + '\n';

      output += row;
      this.push(output);
      callback();
    } catch (err) {
      callback(err);
    }
  }
}

/**
 * Creates a Readable stream from an array of sales records.
 */
const createSalesReadableStream = (salesData = []) => {
  let index = 0;
  return new Readable({
    objectMode: true,
    read() {
      if (index < salesData.length) {
        this.push(salesData[index++]);
      } else {
        this.push(null); // Stream EOF
      }
    }
  });
};

module.exports = {
  ObjectToCsvTransform,
  createSalesReadableStream
};
