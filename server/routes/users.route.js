const router = require('express').Router();

const { userController } = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/login', userController.postUserLogin);
router.post('/refresh-token', userController.postRefreshToken);
router.post('/', userController.postUser);

router.put('/', auth, userController.putUser);

router.get('/confirm-email/:token', userController.getConfirmEmail);
router.get('/self', auth, userController.getSelfUser);
router.get('/:id', auth, userController.getUserById);
router.get('/', auth, userController.getUsers);

router.delete('/', auth, userController.deleteSelfUser);

module.exports = router;
