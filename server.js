import app from './app.js';
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
// O código acima inicia o servidor Express definido no app.js