import multer from "multer";
import path from "path";

// Storage engine setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ye folder aapke project root me hona chahiye
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    // Unique filename banane ke liye date aur original extension use kar rahe hain
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter (optional but recommended to accept only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

export default upload;