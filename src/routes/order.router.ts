import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { orderServiceGetRecordController, orderServicePurchaseController } from "../controllers/order.controller";
import { verifyUserExists } from "../middlewares/client/checkClient";

const orderRouter = Router()

orderRouter.get(`/get`, authenticateToken, verifyUserExists, orderServicePurchaseController)
orderRouter.get(`/getRecords`, authenticateToken, orderServiceGetRecordController)

export default orderRouter
