const request = require('supertest');
const app = require('../server'); // Update the path to your server.js file
const jwt = require('jsonwebtoken');

let token;
describe('Authentication API', () => {
  
  beforeAll(async () => {
    // Wait for the server to connect to MongoDB before proceeding
    await new Promise((resolve) => {
      const maxAttempts = 50; // Number of attempts to check the connection status
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
          setTimeout(checkConnection, 2000); // Retry after 2 second
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

  afterAll((done) => {
    // Close the server connection here
    const server = app.listen(0, () => {
      server.close(done);
    });
  });

});

const user = {
  __v: 0,
  _id: '64c2398803020128a770c7f6',
  fullName: 'Mohammed Ismail',
  email: 'admin@lsbu.com',
  password: '1234567',
  isAdmin: true,
};

describe('User Details API', () => {
  it('should return the logged-in user details', async () => {
    const response = await request(app)
      .get('/user/user-details')
      .set('Authorization', `${token}`); // Include the JWT token in the request header
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toEqual(user);
  });

  it('should return 403 if jwt token is invalid', async () => {
    // Create a JWT token with invalid user data
    const invalidUserToken = jwt.sign({ invalid_user: { data: user } }, 'your_secret_key');
    console.log('invalidtoken' + invalidUserToken)
    const response = await request(app)
      .get('/user/user-details')
      .set('Authorization', `${invalidUserToken}`); // Include the JWT token in the request header

    expect(response.status).toBe(403);
  });
});
