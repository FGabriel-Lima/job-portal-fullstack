import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller.js';

const adminRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de Administradores
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastra um novo administrador
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *       400:
 *         description: Erro na requisição (ex. e-mail já cadastrado)
 */
adminRoutes.post('/register', AdminController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do administrador
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o admin e o token JWT
 *       401:
 *         description: Credenciais inválidas
 */
adminRoutes.post('/login', AdminController.login);

export { adminRoutes };