import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service.js';

export const AdminController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const newAdmin = await AdminService.register(name, email, password);
      
      // Retorna 201 (Created) em caso de sucesso
      res.status(201).json(newAdmin);
    } catch (error: any) {
      // Retorna 400 (Bad Request) com a mensagem de erro do nosso Service
      res.status(400).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const data = await AdminService.login(email, password);
      
      // Retorna 200 (OK) com os dados do usuário e o Token
      res.status(200).json(data);
    } catch (error: any) {
      // Retorna 401 (Unauthorized) se as credenciais estiverem erradas
      res.status(401).json({ error: error.message });
    }
  },
};