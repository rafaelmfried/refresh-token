import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if(!authToken) {
    return response.status(401).json({
      message: "Token is missing",
    });
  }
  const SECRET = process.env.SECRET || '7a74ab23-dd12-4b8d-8004-69b865e475c6';
  const [,token] = authToken.split(' ');

  try{
    verify(token, SECRET);

    return next();
  }catch(err) {
    return response.status(401).json({
      message: "Token invalid",
    });
  }
}