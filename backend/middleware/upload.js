import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Gunakan folder /tmp agar tidak error di serverless
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
