import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();


// Retrieve and decode the Base64 encoded key from environment variable
const base64Key = process.env.GOOGLE_API_KEY_BASE64 || '';
const keyFileContent = Buffer.from(base64Key, 'base64').toString('utf8');

// Parse the JSON content
const credentials = JSON.parse(keyFileContent);

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key
  },
  scopes: ['https://www.googleapis.com/auth/drive'],
});

export const driveService = google.drive({ version: 'v3', auth });
export const GD_FOLDER_ID = process.env.GD_FOLDER_ID;