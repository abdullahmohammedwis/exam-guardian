const request = require('supertest');
const app = require('../server'); // Update the path to your server.js file

describe('Authentication API', () => {
  let token; // Token to be used for authenticated requests

  beforeAll(async () => {
    // Wait for the server to connect to MongoDB before proceeding
    await new Promise((resolve) => {
      const maxAttempts = 20; // Number of attempts to check the connection status
      let attempts = 0;

      const checkConnection = () => {
        if (app.locals.isConnectedToMongoDB) {
          resolve();
        } else {
          attempts++;
          if (attempts >= maxAttempts) {
            // If maximum attempts reached and still not connected, fail the test
            throw new Error('Failed to connect to MongoDB');
          }
          setTimeout(checkConnection, 1000); // Retry after 1 second
        }
      };

      checkConnection();
    });
  });

  // Test if the server connects to MongoDB
  it('should connect to MongoDB', () => {
    expect(app.locals.isConnectedToMongoDB).toBe(true);
  });

  // Test the login route
  describe('POST /auth/login', () => {
    it('should return a token for valid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@lsbu.com', password: '1234567' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token;
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'invalid@example.com', password: 'invalid_password' });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Authentication failed');
    });
  });

});
