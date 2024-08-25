import { Readable } from 'stream';
import { driveService, GD_FOLDER_ID } from '../config/googleDriveConfig';
import { FileMetadata, UploadedFile } from '../models/driveModel';

export class DriveService {
  static async listFiles(): Promise<FileMetadata[]> {
    const response = await driveService.files.list({
      q: `'${GD_FOLDER_ID}' in parents`,
      fields: 'files(id, name, mimeType)',
    });
    return response.data.files as FileMetadata[];
  }

  static async uploadFile(file: Express.Multer.File): Promise<UploadedFile> {
    const fileMetadata = {
      name: file.originalname,
      parents: [GD_FOLDER_ID],
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    const params = {
      requestBody: fileMetadata,
      media: media,
      fields: 'id'
    } as any;
    
    const response = await driveService.files.create(params);

    return { fileId: response.data.id || '' };
  }

  static getFileStream(fileId: string) {
    return driveService.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    );
  }
}