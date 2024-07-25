import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { ProductService } from "../services/product.service";


export const productServicePostController = (req: RequestExt, res: Response) => {
  try {
    new ProductService(req, res).createProduct(req.body)
  } catch (e) {
    console.error(e)
  }
}
export const productServiceGetController = (req: RequestExt, res: Response) => {
  try {
    new ProductService(req, res).getProducts()
  } catch (e) {
    console.error(e)
  }


}
