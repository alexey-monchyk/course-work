const router = require('express').Router();

const { articleController } = require('../controllers');
const auth = require('../middlewares/auth');
const uploadImage = require('../middlewares/multer');

router.post('/', articleController.postArticle); // TODO: AUTH

router.get('/by-user/:userId', articleController.getArticlesByUserId);
router.get('/self', auth, articleController.getSelfArticles);
router.get('/:id', articleController.getArticleById);
router.get('/', articleController.getAllArticles);

router.put('/likes/:id', articleController.putArticleLike);
router.put('/file/:id', uploadImage.single('file'), articleController.putArticleFile); // TODO: AUTH
router.put('/image/:id', uploadImage.single('file'), articleController.putArticleImage); // TODO: AUTH
router.put('/:id', articleController.putArticleById); // TODO: AUTH

router.delete('/:id', auth, articleController.deleteArticleById);

module.exports = router;
