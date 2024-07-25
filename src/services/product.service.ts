import { QueryResult } from "pg";
import { Response } from "express"
import { RequestExt } from "../models/requestExt";
import { Product } from "../models/product";
import { ProductUtils } from "../utils/product.utils";
import { errorMessage } from "../errors";

export class ProductService {
  private productUtils: ProductUtils
  constructor(private req: RequestExt, private res: Response) {
    this.productUtils = new ProductUtils()
  }
  public async createProduct(productData: Product): Promise<Response> {
    const client = this.req.user
    try {
      if (!client) return this.res.status(303).json({ Message: "Client not found" })
      const response: QueryResult = await this.productUtils.createProduct(client.id, productData)
      return this.res.status(202).json({ Message: `Product Created`, Data: response.rows[0] })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  public async getProducts(): Promise<Response> {
    const client = this.req.user
    if (!client) return this.res.status(303).json({ Message: "Client not found" })
    try {
      const product: QueryResult = await this.productUtils.getProducts()
      if (!product.rows) return this.res.status(303).json({ Message: "No products found" })
      return this.res.status(202).json({ Message: `Data found`, Data: product.rows })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
}
