import multer from "multer";
import path from "path";

// Configuro multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // aquí guardo en el servidor los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = [".jpg", ".jpeg", ".png", ".bmp"];

    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error("Formato incorrecto. Solo se permiten archivos JPG, JPEG, PNG y BMP."), false);
    }
};

const multerMiddleware = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default multerMiddleware;
