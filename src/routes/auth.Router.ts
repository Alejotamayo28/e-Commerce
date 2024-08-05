import { Router } from "express";
import { authServiceLoginController, authServiceRegisterController } from "../controllers/auth.controllers";
import { validateAuthLogin } from "../middlewares/validators/auth.validator";

const authRouter = Router()

authRouter.post(`/login`, validateAuthLogin, authServiceLoginController)
authRouter.post(`/register`, authServiceRegisterController)

export default authRouter

