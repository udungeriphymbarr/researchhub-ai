const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads/temp";

// Create temp folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({

  destination(req, file, cb) {

    cb(null, uploadDir);

  },

  filename(req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);

  },

});

const fileFilter = (req, file, cb) => {

  if (file.fieldname === "cover") {

    if (
      file.mimetype.startsWith("image/")
    ) {

      return cb(null, true);

    }

    return cb(new Error("Cover must be an image."), false);

  }

  if (file.fieldname === "pdf") {

    if (
      file.mimetype === "application/pdf"
    ) {

      return cb(null, true);

    }

    return cb(new Error("Only PDF files allowed."), false);

  }

  cb(new Error("Invalid file."), false);

};

const upload = multer({

  storage,

  fileFilter,

});

module.exports = upload;