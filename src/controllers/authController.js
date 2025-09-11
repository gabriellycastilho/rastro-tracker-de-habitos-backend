import prisma from "../../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Cadastrar usuário
export const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // Verifica se o email já existe
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Cria hash da senha
    const hashSenha = await bcrypt.hash(senha, 10);

    // Cria usuário no banco
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashSenha,
      },
    });

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", usuarioId: usuario.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    // Verifica se usuário existe
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    // Verifica senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    // Gera JWT
    const token = jwt.sign(
      { userId: usuario.id, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token válido por 1 hora
    );

    return res.json({ message: "Login realizado com sucesso", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao realizar login" });
  }
};
