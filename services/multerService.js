const multer = require('multer');
const AppError = require('../utils/appError');

const userImgStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `user-${req.user.id}.${ext}`)
    }
});

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

exports.userImgUpload = uploadToUserFolder.single('photo')