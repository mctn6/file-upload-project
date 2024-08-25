import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const auth = new google.auth.GoogleAuth({
  keyFile: './gdapi_key.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});

export const driveService = google.drive({ version: 'v3', auth });
export const GD_FOLDER_ID = process.env.GD_FOLDER_ID;