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

  doc.font(poppinsBold).fontSize(20).text("GIFT OF A TREE", 140, 55);
  doc.font(poppinsItalic).fontSize(18).text(`"Trees for a better tomorrow!"`, 140, 75);
  doc.fontSize(12);
  doc.font('Courier').text("This serves as your invoice/receipt of your purchase of items in the Gift of a Tree App.", 140, 110);

  doc.moveTo(50, 140).lineTo(545.28, 140).stroke();

  doc.font('Courier-Bold').text('Date: ', 420, 150);
  doc.font('Courier').text('10 Nov 2023', 465, 150);
  doc.font('Courier-Bold').text('Reference Number: ', 333, 170);
  doc.font('Courier').text('BUHFAIEUJ5', 465, 170);

  doc.text('', 50, 190);

  doc.font(poppinsRegular).text("BUYER\'S DETAILS:").moveDown(1);
  doc.font('Courier').text("Inigo Orosco", {indent: 30}).moveDown(0.5);
  doc.font('Courier').text("enyeahgo@gmail.com", {indent: 30}).moveDown(0.5);
  doc.font('Courier').text("09159476988", {indent: 30}).moveDown(1);

  doc.font(poppinsRegular).text("PURCHASED ITEMS:").moveDown(1);

  createTable(doc, [[1,2],[1,2]]);

  doc.end();
}

function createTable(doc, data, width = 500) {
  const startY = doc.y,
    startX = doc.x,
    distanceY = 20,
    distanceX = 10;

  doc.fontSize(12);

  let currentY = startY;

  data.forEach(value => {
    let currentX = startX,
      size = value.length;

    let blockSize = width / size;

    let c = 0;
    value.forEach(text => {
      if(c == 0) {
        //Write text
        doc.text(text, currentX + distanceX, currentY, {align: 'left'});
      } else {
        //Write text
        doc.text(text, currentX + distanceX, currentY, {align: 'right'});
      }

      //Create rectangles
      doc
        .lineJoin("miter")
        .rect(currentX, currentY, blockSize, distanceY)
        .stroke();

      currentX += blockSize;
      c++;
    });

    currentY += distanceY;
  });
}

module.exports = { buildPDF };