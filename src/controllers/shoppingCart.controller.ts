import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { errorMessage } from "../errors";
import { ShoppingCartService } from "../services/shoppingCart.service";

export const postShoppingCartController = (req: RequestExt, res: Response) => {
  try {
    new ShoppingCartService(req, res).addProduct(req.body)
  } catch (e) {
    return errorMessage(e, res)
  }
}
