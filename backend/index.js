const fs = require('fs');
require('dotenv').config();

const { google } = require('googleapis');

const gd_folder_id = process.env.GD_FOLDER_ID;

async function upFile() {
    try {
        // Initialize Google Auth
        const auth = new google.auth.GoogleAuth({
            keyFile: './gdapi_key.json',
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        const driveService = google.drive({version: 'v3', auth});

        // File metadata
        const fileMetadata = {
            name: 'picture.jpg',
            parents: [gd_folder_id]
        };

        // Media to be uploaded
        const media = {
            mimeType: 'image/jpeg',
            body: fs.createReadStream('./picture.jpg'),
        };

        // Upload the file
        const response = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });

        return response.data.id;

    } catch (error) {
        console.error("Upload failed:", error);
    }
}

upFile().then(id => {
    if (id) {
        console.log(`File uploaded successfully, File ID: ${id}`);
    } else {
        console.log("File upload failed.");
    }
});
