import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // Token vem no formato: "Bearer token_aqui"
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona os dados do usuário decodificado na request
    req.user = decoded; // agora em qualquer rota eu consigo acessar req.user.userId, req.user.nome

    next(); // segue pra rota
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
