class JwtService {
  signToken(payload: string | Object | Buffer, expiration: string) {}
}

export const jwtService = new JwtService();
