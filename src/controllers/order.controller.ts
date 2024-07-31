import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { OrderService } from "../services/order.service";
import { errorMessage } from "../errors";


export const orderServicePurchaseController = (req: RequestExt, res: Response) => {
  try {
    new OrderService(req, res).createPurchase(req.body)
  } catch (e) {
    return errorMessage(e, res)
  }
}
export const orderServiceGetRecordController = (req: RequestExt, res: Response) => {
  try {
    new OrderService(req, res).getPurchaseRecords()
  } catch (e) {
    return errorMessage(e, res)
  }
}
