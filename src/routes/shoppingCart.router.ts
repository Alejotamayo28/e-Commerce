import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { getShoppingCartController, getTotalShoppingCartController, postShoppingCartController } from "../controllers/shoppingCart.controller";

const shoppingCart = Router()
shoppingCart.post(`/addProduct`, authenticateToken, postShoppingCartController)
shoppingCart.get(`/get`,authenticateToken, getShoppingCartController)
shoppingCart.get(`/get/total`,authenticateToken, getTotalShoppingCartController)
export default shoppingCart

