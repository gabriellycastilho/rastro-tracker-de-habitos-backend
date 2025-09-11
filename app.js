import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";

const app = express(); // Cria uma aplicação Express

app.use(cors()); // Habilita CORS para todas as rotas

// Rotas
app.use("/auth", authRoutes);
// aqui diz: “todas as rotas dentro de authRoutes vão estar disponíveis a partir de /auth”

export default app;
// O código acima exporta o app para ser usado em outro arquivo (server.js)

// express: Framework que facilita criar e organizar um servidor web em Node.js, facilita criação de rotas, manipulação de requisições e respostas, etc.
// cors: Middleware que libera ou controla requisições de frontends de outras origens (dominios/portas)
