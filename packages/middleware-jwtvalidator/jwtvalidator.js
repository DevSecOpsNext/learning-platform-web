const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const getPublicKey = (header, callback) => {
  const client = jwksClient({
    jwksUri: process.env.JWKS_ENDPOINT || 'https://api.asgardeo.io/t/devsecopsnext/oauth2/jwks'
  });

  client.getSigningKey(header.kid, (err, key) => {
    console.log('Get signing key :', key);
    if(key){
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    } else {
      callback(null, null);
    }    
  });
}

const verifyToken = (token, callback) => {
  const options = {
    audience: process.env.AUDIENCE || 'Xd5x1efqK0uxF4YS5QhO1qhnQMka',
    issuer: process.env.TOKEN_ENDPOINT || 'https://api.asgardeo.io/t/devsecopsnext/oauth2/token'
  };

  console.log('Verify token');
  jwt.verify(token, getPublicKey, callback);
};

const authorize = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    console.log('No authorization header');
    res.sendStatus(401);
    return;
  }

  const [type, token] = authorizationHeader.split(' ');
  if (type !== 'Bearer' || !token) {
    console.log('Invalid authorization header');
    res.sendStatus(401);
    return; 
  }
  console.log('Valid authorization header');

  try {
    verifyToken(token, (err, decoded) => {
      if (err) {
        console.log('Invalid JWT:', err);
        res.sendStatus(401);
        return;
      }
      req.scopes = decoded.scope;
      next();
    });    

  } catch (error) {
    console.log('Error occured while verifying token :', err);
    return;
  }
};


// Define middleware function to validate scope of GraphQL queries
const validateScope = (req, res, next) => {
  const { query } = req.body;
  const scopes = req.scopes || '';
  
  if (query.includes('content') && !scopes.includes('content')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (query.includes('users') && !scopes.includes('users')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};