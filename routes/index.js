const router = require('express').Router();
const pageController = require('../controllers/pageController');
const { uploadImageMiddleware, deleteImageMiddleware } = require('../middlewares/multerDiscord');
const pdfService = require('../service/pdf-service');
const createInvoice = require('../service/createInvoice');
const fileParser = require('express-multipart-file-parser');
router.use(fileParser);

router.get('/', pageController.home);

router.get('/pdflive', pageController.pdflive);

router.post('/upload', uploadImageMiddleware, pageController.upload);

router.get('/invoice', async (req, res, next) => {
  let items = [
    { name: 'Yakal', qty: 1, type: 'block', price: 100450, subtotal: 100450, area: 'Y1'},
    { name: 'Molave', qty: 1, type: 'block', price: 88900, subtotal: 88900, area: 'Mo2'},
    { name: 'Red Narra', qty: 2, type: 'seedling', price: 2510, subtotal: 5020, area: 'RN3'}
  ];

  let data = {
    date: '10 Nov 2023',
    refNr: 'ABCDE12345',
    name: 'Inigo Orosco', email: 'enyeahgo@gmail.com', mobile: '09159476988',
    items: items 
  }
  
  let fileUrl = await createInvoice(`invoices/Invoice-${data.refNr}.pdf`, data);

  console.log(fileUrl + "XXX");

  res.status(200).json(fileUrl);
});

module.exports = router;