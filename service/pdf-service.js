const PDFDocument = require('pdfkit');
const path = require('path');

const poppinsBold = path.resolve(__dirname, '..', 'public/assets/fonts/Poppins/Poppins-Bold.ttf');
const poppinsRegular = path.resolve(__dirname, '..', 'public/assets/fonts/Poppins/Poppins-Regular.ttf');
const poppinsItalic = path.resolve(__dirname, '..', 'public/assets/fonts/Poppins/Poppins-Italic.ttf');

function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument({ bufferPages: true, size: 'A4', margin: 50 });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.image(path.resolve(__dirname, 'logo.jpg'), 50, 50, {width: 80});

  doc.font(poppinsBold).fontSize(20).text(`GIFT OF A TREE`, 140, 55);
  doc.font(poppinsItalic).fontSize(18).text(`"Trees for a better tomorrow!"`, 140, 75);
  doc.fontSize(12);
  doc.font('Courier').text(`This serves as your invoice/receipt of your purchase of items in the Gift of a Tree App.`, 140, 110);

  doc.moveTo(50, 140).lineTo(545.28, 140).stroke();

  doc.font('Courier-Bold').text('Date: ', 400, 160);
  doc.font('Courier').text('10 Nov 2023', 450, 160);

  doc.font('Courier-Bold').text('Reference Number: ', 50).moveDown(2);
  doc.font('Courier').text('DUHVIE2JFK');

  doc.font('Courier-Bold').text('Buyer\'s Details:').moveDown(1);
  doc.font('Courier').text('Inigo Orosco', ).moveDown(1);

  // Buyer's name and address
  // Buyer's Contact details
  // Quantity of goods or services: The number of units of each good or service that was sold.
  // Unit price: The price per unit of each good or service.
  // Subtotal: The total amount of money owed before any taxes or discounts are applied.
  // Total amount due
  // A reference number

  doc.end();
}

// https://github.com/foliojs/pdfkit/issues/29

module.exports = { buildPDF };