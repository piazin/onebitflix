import jwt from 'jsonwebtoken';

const secret = 'Hamu25$';

class JwtService {
  signToken(payload: string | Object | Buffer, expiration: string) {
    return jwt.sign(payload, secret, { expiresIn: expiration });
  }

  verifyToken(token: string, callbackfn: jwt.VerifyCallback) {
    jwt.verify(token, secret, callbackfn);
  }
}

export const jwtService = new JwtService();
