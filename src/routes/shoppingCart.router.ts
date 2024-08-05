import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { postShoppingCartController } from "../controllers/shoppingCart.controller";

const shoppingCart = Router()
shoppingCart.post(`/addProduct`, authenticateToken, postShoppingCartController)
export default shoppingCart

