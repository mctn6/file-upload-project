const request = require('supertest');
const path = require('path');
const fs = require('fs');
const app = require('../server'); // Adjust this path to where your Express app is exported

describe('File Upload API', () => {
  const uploadDir = path.join(__dirname, '..', 'uploads');

  beforeEach(() => {
    // Clear the uploads directory before each test
    fs.readdirSync(uploadDir).forEach(file => {
      fs.unlinkSync(path.join(uploadDir, file));
    });
  });

  it('should upload a file successfully', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('file', path.join(__dirname, 'testimage.jpg'))
      .expect(200);

    expect(response.body).toHaveProperty('message', 'File uploaded successfully');
    
    // Check if file exists in uploads directory
    const files = fs.readdirSync(uploadDir);
    expect(files.length).toBe(1);
  });

  it('should return 400 if no file is uploaded', async () => {
    const response = await request(app)
      .post('/api/upload')
      .expect(400);

    expect(response.body).toHaveProperty('message', 'No file uploaded');
  });

  it('should get list of uploaded files', async () => {
    const response = await request(app)
      .get('/api/files')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('path');
  });
});