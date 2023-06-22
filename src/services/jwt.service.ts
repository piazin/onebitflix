import jwt from 'jsonwebtoken';
import { config } from '../config';

const secret = config.jwt_secret as string;

class JwtService {
  signToken(payload: string | Object | Buffer, expiration: string) {
    return jwt.sign(payload, secret, { expiresIn: expiration });
  }

  verifyToken(token: string, callbackfn: jwt.VerifyCallback) {
    jwt.verify(token, secret, callbackfn);
  }
}

export const jwtService = new JwtService();
