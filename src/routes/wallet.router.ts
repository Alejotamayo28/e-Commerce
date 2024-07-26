import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { wallerServicePostController, walletServicePutController } from "../controllers/wallet.controller";
import { validateWalletPost, validateWalletPut } from "../middlewares/expressValidator/wallet.validator";

const walletRouter = Router()
walletRouter.post(`/post`, validateWalletPost, authenticateToken, wallerServicePostController)
walletRouter.put(`/put`, validateWalletPut, authenticateToken, walletServicePutController)
export default walletRouter
