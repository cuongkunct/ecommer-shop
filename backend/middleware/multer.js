import multer from "multer";

//Cấu hình multer – một middleware trong Express dùng để xử lý upload file (thường là ảnh, video, PDF…).
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
