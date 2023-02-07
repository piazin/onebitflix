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

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === 'undefined')
      return res.status(401).json({ message: 'Não autorizado' });

    const user = await userService.findByEmail((decoded as JwtPayload).email);

    req.user = user;
    next();
  });
}

export function ensureAuthViaQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.query;

  if (!token)
    return res
      .status(401)
      .json({ message: 'Não autorizado: nenhum token foi encontrado.' });

  if (typeof token !== 'string')
    return res.status(400).json({
      message: 'O parametro token deve ser do tipo string',
    });

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === 'undefined')
      return res.status(401).json({ message: 'Não autorizado' });

    const user = await userService.findByEmail((decoded as JwtPayload).email);

    req.user = user;
    next();
  });
}
