const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      return res.sendStatus(403);
    }

    // Ensure that the decodedToken contains the user data
    if (!decodedToken || !decodedToken.data) {
      return res.sendStatus(403);
    }

    req.user = decodedToken; // Attach the user information to the request object
    next();
  });
}

module.exports = authenticateToken;
