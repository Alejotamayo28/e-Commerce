import { Router } from "express";
import { productServiceGetController, productServicePostController } from "../controllers/product.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateProductPost } from "../middlewares/validators/product.validator";

const productRouter = Router()
productRouter.post(`/post`, authenticateToken, validateProductPost, productServicePostController)
productRouter.get(`/get`, authenticateToken, productServiceGetController)
export default productRouter
