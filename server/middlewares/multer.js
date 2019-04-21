const multer = require('multer');
const fs = require('fs');

const storageImage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync('client/public/files')) {
            fs.mkdir('client/public/files', err => cb(err, 'client/public/files'));
        } else {
            cb(null, 'client/public/files');
        }
    },
    filename(req, file, cb) {
        cb(null, +(new Date()) + file.originalname.replace(/ /g, ''));
    },
});

const uploadImage = multer({
    storage: storageImage,
    limits: {
        fileSize: 1024 * 1024 * 50,
    },
});

module.exports = uploadImage;
