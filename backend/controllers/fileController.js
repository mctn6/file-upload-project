const multer = require('multer');
const path = require('path');
const File = require('../models/file');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.uploadFile = [
  upload.single('file'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = new File({
      name: req.file.originalname,
      path: req.file.path,
    });

    file.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  },
];

exports.getUploadedFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files' });
  }
};