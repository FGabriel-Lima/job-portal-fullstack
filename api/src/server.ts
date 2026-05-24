import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { setupSwagger } from './config/swagger.js';
import { adminRoutes } from  './routes/admin.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

// Inicia o Swagger na rota /docs
setupSwagger(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API do Portal de Vagas rodando perfeitamente! 🚀' });
});

app.use('/auth', adminRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/docs`);
});