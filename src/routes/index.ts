import { Router } from "express";
import authRouter from "./auth.Router";
import productRouter from "./product.router";
import orderRouter from "./order.router";
import walletRouter from "./wallet.router";
import searchRouter from "./search.router";
import shoppingCart from "./shoppingCart.router";

const mainRouter = Router()

mainRouter.use(`/auth`, authRouter)
mainRouter.use(`/product`, productRouter)
mainRouter.use(`/order`, orderRouter)
mainRouter.use(`/wallet`, walletRouter)
mainRouter.use(`/search`, searchRouter)
mainRouter.use(`/shoppingCart`, shoppingCart)


export default mainRouter
