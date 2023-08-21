const multer = require("multer");
// multer: is a node.js middleware for handling multipart/form-data.

const { v4: uuidv4 } = require("uuid");
// uuid: is a package that generates random and unique ids.

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./media");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

console.log(storage, "storage");

const fileValidations = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "video/mp4",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerUpload = multer({
  storage: storage,
  fileFilter: fileValidations,
});

module.exports = {
  multerUpload,
};
