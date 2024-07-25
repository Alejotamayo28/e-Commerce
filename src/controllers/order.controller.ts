import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { OrderService } from "../services/order.service";


export const orderServicePurchaseController = (req: RequestExt, res: Response) => {
  try {
    new OrderService(req, res).createPurchase(req.body)
  } catch (e) {
    console.error(e)
  }
}
