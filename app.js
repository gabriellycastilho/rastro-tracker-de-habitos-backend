import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// Rotas
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

export default app;
// O código acima configura um servidor Express básico com CORS habilitado e uma rota de teste /ping




