import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { jwtService } from '../services/jwt.service';
import { userService } from '../services/users.service';

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader)
    return res
      .status(401)
      .json({ message: 'Não autorizado: nenhum token foi encontrado.' });

  const token = authorizationHeader.split(' ')[1];

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === 'undefined')
      return res.status(401).json({ message: 'Não autorizado' });

    userService.findByEmail((decoded as JwtPayload).email).then((user) => {
      req.user = user;
      next();
    });
  });
}
