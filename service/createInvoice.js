require('dotenv').config();
const DiscordDatabase = require("discord-cloud-database");
var discordDatabase = new DiscordDatabase(process.env.TOKEN, process.env.CHANNELID);
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Buffer = require('buffer').Buffer;
const path = require('path');
const { setDefaultAutoSelectFamilyAttemptTimeout } = require('net');

const poppinsBold = path.resolve(__dirname, '..', 'public/assets/fonts/Poppins/Poppins-Bold.ttf');
const poppinsRegular = path.resolve(__dirname, '..', 'public/assets/fonts/Poppins/Poppins-Regular.ttf');
const poppinsItalic = path.resolve(__dirname, '..', 'public/assets/fonts/Poppins/Poppins-Italic.ttf');

const createInvoice = async (filename, data) => {

  const doc = new PDFDocument({ bufferPages: true, size: 'A4', margin: 50 });

  const { date, refNr, name, email, mobile, items } = data;

  doc.image(path.resolve(__dirname, 'logo.jpg'), 50, 50, {width: 80});

  doc.font(poppinsBold).fontSize(20).text("GIFT OF A TREE", 140, 55);
  doc.font(poppinsItalic).fontSize(18).text(`"Trees for a better tomorrow!"`, 140, 75);
  doc.fontSize(12);
  doc.font('Courier').text("This serves as your invoice/receipt of your purchase of items in the Gift of a Tree App.", 140, 110);

  doc.moveTo(50, 140).lineTo(545.28, 140).stroke();

  doc.font('Courier-Bold').text('Date: ', 420, 150);
  doc.font('Courier').text(date, 465, 150);
  doc.font('Courier-Bold').text('Reference Number: ', 333, 170);
  doc.font('Courier').text(refNr, 465, 170);

  doc.text('', 50, 190);

  doc.font(poppinsRegular).text("BUYER\'S DETAILS:").moveDown(1);
  doc.font('Courier').text(name, {indent: 30}).moveDown(0.5);
  doc.font('Courier').text(email, {indent: 30}).moveDown(0.5);
  doc.font('Courier').text(mobile, {indent: 30}).moveDown(1);

  doc.font(poppinsRegular).text("PURCHASED ITEMS:").moveDown(1);

  let forTableDisplay = [['ITEMS', 'AREA', 'AMOUNT']], overallTotal = 0;

  items.map(item => {
    let newItem = [`${item.qty} X ${item.name} (${item.type}) @ ${moneyfy(item.price, true)}`, `${item.area}`, `${moneyfy(item.subtotal, true)}`];
    overallTotal += item.subtotal;
    forTableDisplay.push(newItem);
  });

  forTableDisplay.push(['TOTAL', '', moneyfy(overallTotal, true)]);

  createTable(doc, forTableDisplay);

  doc.text('', 50).moveDown(1);

  doc.font('Courier').fontSize(10).text('This invoice is computer-generated and does not require a manual signature.').moveDown(2);

  // Create a writable stream to the file system
  const writeStream = fs.createWriteStream(filename);

  // Pipe the PDF document stream to the file system stream
  doc.pipe(writeStream);

  // Close the PDF document stream
  doc.end();
  
  writeStream.on('finish', async () => {
    writeStream.close();
    let fileUrl = uploadPdf(filename);
    return fileUrl;
  });

};

const uploadPdf = async (filename) => {
  const fileBuffer = Buffer.from(fs.readFileSync(path.resolve(__dirname, '..', filename)));
  const fileUrl = await discordDatabase.uploadFile(
    fileBuffer,
    filename,
    { id: process.env.CHANNELID }
  );
  return fileUrl;
};

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

    let blockSize;
    
    let c = 0;
    value.forEach(text => {
      if(c == 0) {
        doc.text(text, currentX + distanceX, currentY, {align: 'left'});
        blockSize = 250;
      } else if(c == 1) {
        doc.text(text, currentX + distanceX, currentY, {align: 'left'});
        blockSize = 100;
      } else {
        doc.text(text, currentX + distanceX, currentY, {align: 'right'});
        blockSize = 150;
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

function moneyfy(x, withPesoSign) {
  if(withPesoSign) {
    return `P${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

module.exports = createInvoice;