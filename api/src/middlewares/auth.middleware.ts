import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export interface AuthRequest extends Request {
  adminId?: string;
}

export const AuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token de autenticação não fornecido.' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    // Tenta abrir o token com a nossa chave secreta
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    
    // Pendura o ID do admin na requisição para podermos usar lá no Controller das vagas
    req.adminId = decoded.id; 
    
    // Tudo certo com o crachá! Pode seguir em frente.
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado. Faça login novamente.' });
  }
};