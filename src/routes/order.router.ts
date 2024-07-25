import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { orderServicePurchaseController } from "../controllers/order.controller";

const orderRouter = Router()

orderRouter.get(`/get`, authenticateToken, orderServicePurchaseController)


export default orderRouter
