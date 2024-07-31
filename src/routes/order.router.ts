import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { orderServiceGetRecordController, orderServicePurchaseController } from "../controllers/order.controller";

const orderRouter = Router()

orderRouter.get(`/get`, authenticateToken, orderServicePurchaseController)
orderRouter.get(`/getRecords`, authenticateToken, orderServiceGetRecordController)

export default orderRouter
