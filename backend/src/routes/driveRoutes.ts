import express from 'express';
import multer from 'multer';
import { DriveController } from '../controllers/driveController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/list', DriveController.listFiles);
router.post('/upload', upload.single('file'), DriveController.uploadFile);
router.get('/download/:fileId', DriveController.downloadFile);

export default router;