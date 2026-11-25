/**
 * Stream Controller (Module 7: Streams & Data Processing)
 * Demonstrates: Readable stream, Transform stream, pipe to HTTP response, chunk processing.
 */
const { ObjectToCsvTransform, createSalesReadableStream } = require('../streams/csvExportStream');
const Order = require('../models/Order');
const { isMongoConnected } = require('../config/db');

// Sample mock data for stream generation if Mongo is empty
const sampleSalesRecords = [
  { orderId: 'RC-20261125-001', date: '2026-11-25', productName: 'Fresh Country Tomatoes', farmerName: 'Ramesh Naidu', customerName: 'Priya Sharma', quantity: 15, unitPrice: 35, subtotal: 525, status: 'DELIVERED' },
  { orderId: 'RC-20261125-002', date: '2026-11-25', productName: 'Guntur Red Chillies', farmerName: 'Ramesh Naidu', customerName: 'Rahul Verma', quantity: 5, unitPrice: 180, subtotal: 900, status: 'DELIVERED' },
  { orderId: 'RC-20261124-003', date: '2026-11-24', productName: 'Banganapalli Mangoes', farmerName: 'Saraswathi Devi', customerName: 'Kiran Kumar', quantity: 20, unitPrice: 120, subtotal: 2400, status: 'DELIVERED' },
  { orderId: 'RC-20261124-004', date: '2026-11-24', productName: 'Sona Masoori Rice', farmerName: 'Venkatesh Rao', customerName: 'Anita Rao', quantity: 50, unitPrice: 65, subtotal: 3250, status: 'DELIVERED' },
  { orderId: 'RC-20261123-005', date: '2026-11-23', productName: 'A2 Gir Cow Milk', farmerName: 'Saraswathi Devi', customerName: 'Vikas Gupta', quantity: 10, unitPrice: 80, subtotal: 800, status: 'DELIVERED' }
];

// @desc    Export Sales Report as CSV via Node.js Stream Pipeline (Module 7)
// @route   GET /api/v1/streams/sales-csv
// @access  Public / Evaluator Demo
const exportSalesCsvStream = async (req, res, next) => {
  try {
    let salesRecords = [];

    if (isMongoConnected()) {
      const orders = await Order.find().limit(200);
      orders.forEach((ord) => {
        ord.items.forEach((item) => {
          salesRecords.push({
            orderId: ord.orderNumber,
            date: ord.placedAt ? ord.placedAt.toISOString().slice(0, 10) : '2026-11-25',
            productName: item.productName,
            farmerName: 'Verified Partner Farmer',
            customerName: ord.deliveryAddress ? ord.deliveryAddress.recipientName : 'Consumer',
            quantity: item.quantity,
            unitPrice: item.pricePerUnit,
            subtotal: item.subtotal,
            status: ord.orderStatus
          });
        });
      });
    }

    if (!salesRecords.length) {
      salesRecords = sampleSalesRecords;
    }

    // Set CSV download headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="rythuconnect_sales_report.csv"');

    // 1. Create Readable Stream
    const readableStream = createSalesReadableStream(salesRecords);

    // 2. Create Transform Stream (Object -> CSV Line)
    const csvTransformStream = new ObjectToCsvTransform();

    // 3. Pipe Readable -> Transform -> Writable HTTP Response (Module 7)
    readableStream
      .pipe(csvTransformStream)
      .pipe(res)
      .on('finish', () => {
        console.log('✅ Sales CSV stream pipeline completed successfully.');
      })
      .on('error', (err) => {
        console.error('❌ Stream error:', err);
        if (!res.headersSent) {
          res.status(500).send('Stream processing error');
        }
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  exportSalesCsvStream
};
