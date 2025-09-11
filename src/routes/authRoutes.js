import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;

// Todas as rotas definidas em authRoutes.js serão prefixadas com /auth
// Por exemplo, a rota de registro será acessível via POST /auth/register
// e a rota de login via POST /auth/login
