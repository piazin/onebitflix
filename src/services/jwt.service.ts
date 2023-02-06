import jwt from 'jsonwebtoken';

const secret = 'Hamu25$';

class JwtService {
  signToken(payload: string | Object | Buffer, expiration: string) {
    return jwt.sign(payload, secret, { expiresIn: expiration });
  }
}

export const jwtService = new JwtService();
