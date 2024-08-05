import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { ProductService } from "../services/product.service";
import { errorMessage } from "../errors";


export const productServicePostController = (req: RequestExt, res: Response) => {
  try {
    res.set('Cache-Control', 'public, max-age=3600'); 
    new ProductService(req, res).createProduct(req.body)
  } catch (e) {
    return errorMessage(e, res)
  }
}
export const productServiceGetController = (req: RequestExt, res: Response) => {
  try {
    new ProductService(req, res).getProducts()
  } catch (e) {
    return errorMessage(e, res)
  }


}
