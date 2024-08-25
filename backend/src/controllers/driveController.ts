import { Request, Response } from 'express';
import { DriveService } from '../services/driveService';


export class DriveController {
  static async listFiles(req: Request, res: Response) {
    try {
      const files = await DriveService.listFiles();
      res.json(files);
    } catch (error) {
      console.error('Error listing files:', error);
      res.status(500).json({ error: 'Failed to list files' });
    }
  }

  static async uploadFile(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const result = await DriveService.uploadFile(req.file);
      res.json(result);
    } catch (error) {
      console.error('Upload failed:', error);
      res.status(500).json({ error: 'File upload failed' });
    }
  }

  static async downloadFile(req: Request, res: Response) {
    const fileId = req.params.fileId;

    try {
      const response = await DriveService.getFileStream(fileId);
      res.setHeader('Content-Type', response.headers['content-type']);
      res.setHeader('Content-Disposition', `attachment; filename=${fileId}`);
      response.data.pipe(res);
    } catch (error) {
      console.error('Download failed:', error);
      res.status(500).json({ error: 'File download failed' });
    }
  }
}