import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { ProductService } from "../services/product.service";
import { errorMessage } from "../errors";

export const productServicePostController = async (req: RequestExt, res: Response) => {
  const productService = new ProductService(req, res)
  try {
    await productService.createProduct(req.body)
  } catch (e) {
    return errorMessage(e, res)
  }
}

export const productServiceGetController = async (req: RequestExt, res: Response) => {
  const productService = new ProductService(req, res)
  try {
    await productService.getProducts()
  } catch (e) {
    return errorMessage(e, res)
  }
}
