const router = require('express').Router();

const { articleController } = require('../controllers');
const auth = require('../middlewares/auth');
const uploadImage = require('../middlewares/multer');

router.post('/', auth, uploadImage.single('file'), articleController.postArticle);

router.get('/by-user/:userId', articleController.getArticlesByUserId);
router.get('/self', auth, articleController.getSelfArticles);
router.get('/:id', articleController.getArticleById);
router.get('/', articleController.getAllArticles);

router.put('/:id', auth, uploadImage.single('file'), articleController.putArticleById);

router.delete('/:id', auth, articleController.deleteArticleById);

module.exports = router;
