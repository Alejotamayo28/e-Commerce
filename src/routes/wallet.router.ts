import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { wallerServicePostController, walletServicePutController } from "../controllers/wallet.controller";

const walletRouter = Router()
walletRouter.post(`/post`, authenticateToken, wallerServicePostController)
walletRouter.put(`/put`, authenticateToken, walletServicePutController)
export default walletRouter
