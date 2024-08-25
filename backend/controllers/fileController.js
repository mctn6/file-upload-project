const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.uploadFile = [
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const file = new File({
        name: req.file.originalname,
        path: req.file.path,
      });

      await file.save(); // Ensure that you are using async/await if saving is asynchronous

      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
];

exports.getUploadedFiles = async (_req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files' });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const uploadDir = path.join(__dirname, '..', 'uploads'); 
    const filePath = path.join(uploadDir, fileName);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};