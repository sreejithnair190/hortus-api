const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../handlers/handleAsyncErr');
const AppError = require('../utils/appError');

const imgStorage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null, true);
    }else {
        cb(new AppError('Please upload only image', 400), false);
    }
}

const upload = multer({
    storage: imgStorage,
    fileFilter: imageFilter
});

// User Image Upload
exports.resizeUserImage = catchAsync( async (req, res, next) => {

    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}.jpeg`;

    await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({ quality:90 })
            .toFile(`public/img/users/${req.file.filename}`);
    next();
});

exports.userImgUpload = upload.single('photo');

// Product Image Upload
exports.resizeProductImage = catchAsync( async (req, res, next) => {
   if (!req.files.imageCover || !req.files.images) return next();

    // Image Cover
    if (req.files.imageCover){
        const imageCoveFileName = `product-${req.params.id}-cover.jpeg`;

        await sharp(req.files.imageCover[0].buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality:90 })
            .toFile(`public/img/products/${imageCoveFileName}`);

        req.body.imageCover = imageCoveFileName;
    }


    // Images
    if (req.files.images.length){
        const images = [];
        await Promise.all(
            req.files.images.map( (productImage, index) => {
                const productImageName = `product-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;

                sharp(productImage.buffer)
                    .resize(2000, 1333)
                    .toFormat('jpeg')
                    .jpeg({ quality:90 })
                    .toFile(`public/img/products/${productImageName}`);

                images.push(productImageName);
            })
        );

        req.body.images = images;
    }


    next();
});

exports.productImgUpload = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]);