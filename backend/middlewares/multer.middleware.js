import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const name = `${Date.now()}-${file.originalname}`;
        cb(null, name);
    }
});

export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/; // Restrict file types
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});
