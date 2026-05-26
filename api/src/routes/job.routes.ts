import { Router } from 'express';
import { JobController } from '../controllers/job.controller.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';

const jobRoutes = Router();
const jobController = new JobController();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Gerenciamento e listagem de vagas de emprego
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     JobInput:
 *       type: object
 *       required:
 *         - title
 *         - department
 *         - location
 *         - type
 *         - salary
 *         - description
 *         - requirements
 *         - benefits
 *         - process
 *         - applyLink
 *       properties:
 *         title:
 *           type: string
 *         department:
 *           type: string
 *         location:
 *           type: string
 *         type:
 *           type: string
 *         salary:
 *           type: string
 *         description:
 *           type: string
 *         requirements:
 *           type: string
 *         benefits:
 *           type: string
 *         process:
 *           type: string
 *         applyLink:
 *           type: string
 *         status:
 *           type: string
 *           description: Padrão é "Aberta"
 */

// ==========================================
// ROTAS PÚBLICAS (Visitantes)
// ==========================================

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Lista todas as vagas (com paginação e ordenação)
 *     description: Retorna vagas disponíveis. Pode ser filtrada por título, departamento e localização. Rota pública.
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtro por título da vaga
 *
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filtro por departamento
 *
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filtro por localidade
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página atual
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de itens retornados por página
 *
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Campo utilizado para ordenar os resultados (ex. title, department, createdAt)
 *
 *       - in: query
 *         name: orderDir
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Direção da ordenação (asc para crescente, desc para decrescente)
 *
 *     responses:
 *       200:
 *         description: Lista paginada de vagas retornada com sucesso
 *       500:
 *         description: Erro interno
 */
jobRoutes.get('/', jobController.index);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Busca os detalhes de uma vaga
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vaga retornada com sucesso
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro interno
 */
jobRoutes.get('/:id', jobController.show);

// ==========================================
// BARREIRA DE AUTENTICAÇÃO
// ==========================================
jobRoutes.use(AuthMiddleware);

// ==========================================
// ROTAS PRIVADAS (Apenas Administradores)
// ==========================================

/**
 * @swagger
 * /jobs/dashboard/metrics:
 *   get:
 *     summary: Métricas do Dashboard Administrativo
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna total de vagas e contagem por status
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
jobRoutes.get('/dashboard/metrics', jobController.dashboardMetrics);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Cria uma nova vaga
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobInput'
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao criar vaga
 */
jobRoutes.post('/', jobController.create);

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Atualiza uma vaga existente
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobInput'
 *
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro interno
 */
jobRoutes.put('/:id', jobController.update);

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Exclui uma vaga
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       204:
 *         description: Vaga excluída com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro interno
 */
jobRoutes.delete('/:id', jobController.delete);

export { jobRoutes };