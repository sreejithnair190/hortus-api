const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');

const userImgStorage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null, true);
    }else {
        cb(new AppError('Please upload only image', 400), false);
    }
}

const uploadToUserFolder = multer({
    storage: userImgStorage,
    fileFilter: imageFilter
})


exports.resizeUserImage = (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}.jpeg`;

    sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality:90 })
        .toFile(`public/img/users/${req.file.filename}`);

    next();
}

exports.userImgUpload = uploadToUserFolder.single('photo')