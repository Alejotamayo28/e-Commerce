import { Response } from "express"
import { RequestExt } from "../models/requestExt";
import { Product } from "../models/product";
import { errorMessage } from "../errors";
import { ProductUtils } from "../utils/service/product.utils";
import { HttpResponses } from "../utils/http.response";
import { onSession, onTransaction } from "../utils/dataAccessLayer";

export class ProductService {
  constructor(
    private readonly req: RequestExt,
    private readonly res: Response,
  ) {
  }
  async createProduct(data: Product): Promise<Response> {
    try {
      const product = await onTransaction(async (client) => {
        const productDetails = await ProductUtils.insertProductDetails(client, data.details)
        const product = await ProductUtils.insertProduct(client, data, productDetails.id!, this.req.user!.id);
        return ProductUtils.constructProductResponse(product, productDetails);
      })
      return HttpResponses.sendSuccessResponse(this.res, `Product Succesfully Created`, product)
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  async getProducts() {
    try {
      const products = await onSession(async (client) => {
        return await ProductUtils.getProducts(client)
      })
      return this.res.status(202).json({ Message: `Data found`, Data: products.rows })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
}
