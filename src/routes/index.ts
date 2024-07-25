import { Router } from "express";
import authRouter from "./auth.Router";
import productRouter from "./product.router";
import orderRouter from "./order.router";
import walletRouter from "./wallet.router";

const mainRouter = Router()

mainRouter.use(`/auth`, authRouter)
mainRouter.use(`/product`, productRouter)
mainRouter.use(`/order`, orderRouter)
mainRouter.use(`/wallet`, walletRouter)

export default mainRouter
