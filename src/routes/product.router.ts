import { Router } from "express";
import { productServiceGetController, productServicePostController } from "../controllers/product.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const productRouter = Router()
productRouter.post(`/post`, authenticateToken, productServicePostController)
productRouter.get(`/get`, authenticateToken, productServiceGetController)
export default productRouter
