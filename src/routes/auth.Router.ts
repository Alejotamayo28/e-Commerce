import { Router } from "express";
import { authServiceLoginController, authServiceRegisterController } from "../controllers/auth.controllers";

const authRouter = Router()

authRouter.post(`/login`, authServiceLoginController)
authRouter.post(`/register`, authServiceRegisterController)

export default authRouter

