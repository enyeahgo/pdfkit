const router = require('express').Router();
const pageController = require('../controllers/pageController');
const { uploadImageMiddleware, deleteImageMiddleware } = require('../middlewares/discordUpload'); 

router.get('/', pageController.home);

router.post('/upload', uploadImageMiddleware, pageController.upload);

module.exports = router;