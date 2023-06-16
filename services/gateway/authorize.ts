import { verify } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const getPublicKey = (header:any, callback:any) => {
  const client = jwksClient({
    jwksUri: process.env.JWKS_ENDPOINT || 'https://api.asgardeo.io/t/devsecopsnext/oauth2/jwks'
  });

  client.getSigningKey(header.kid, (err, key:any) => {
    console.log('Get signing key :', key);
    if(key){
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    } else {
      callback(null, null);
    }    
  });
}

const verifyToken = (token:any, callback:any) => {
  const options = {
    audience: process.env.AUDIENCE || 'Xd5x1efqK0uxF4YS5QhO1qhnQMka',
    issuer: process.env.TOKEN_ENDPOINT || 'https://api.asgardeo.io/t/devsecopsnext/oauth2/token'
  };

  console.log('Verify token');
  verify(token, getPublicKey, callback);
};

export const authorize = (req:any, res:any, next:any) => {
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
    verifyToken(token, (err:any, decoded:any) => {
      if (err) {
        console.log('Invalid JWT:', err);
        res.sendStatus(401);
        return;
      }
      req.scopes = decoded.scope;
      next();
    });    

  } catch (error) {
    console.log('Error occured while verifying token :', error);
    return;
  }
};


// Define middleware function to validate scope of GraphQL queries
export const  validateScope = (req:any, res:any, next:any) => {
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

