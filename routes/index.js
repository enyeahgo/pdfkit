const router = require('express').Router();
const pageController = require('../controllers/pageController');
const { uploadImageMiddleware, deleteImageMiddleware } = require('../middlewares/multerDiscord');
const pdfService = require('../service/pdf-service');
const fileParser = require('express-multipart-file-parser');
router.use(fileParser);

router.get('/', pageController.home);

router.get('/pdflive', pageController.pdflive);

router.post('/upload', uploadImageMiddleware, pageController.upload);

router.get('/invoice', (req, res, next) => {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=invoice.pdf`,
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
});

module.exports = router;