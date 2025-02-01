import { Response } from "express"
import { errorMessage } from "../errors"
import { ShoppingCart } from "../models/shoppingCart"
import { QueryResult } from "pg"
import { postShoppingCart, getShoppingCart, getTotalShoppingCart, getProductById } from "../utils/service/shoppingCart.utils"
import { HttpResponses } from "../utils/http.response"
import { RequestExt } from "../models/requestExt"

export class ShoppingCartService {
  constructor(private req: RequestExt, private res: Response) { }
  private responseQuery(response: ShoppingCart, grand_total?: number): Response {
    return this.res.status(200).json({ Message: 'Successful', Total: grand_total, Data: response })
  }
  private verifyClient(): boolean {
    const client = this.req.user
    if (!client) {
      this.res.status(401).json({ Message: `User not found` })
      return false
    }
    return true
  }
  public async addProduct(shoppingCart: ShoppingCart): Promise<Response | undefined> {
    try {
      const product: QueryResult = await getProductById(this.req.user!.id)
      if (!product.rowCount) return this.sendProductNotFound()
      await postShoppingCart(shoppingCart, this.req.user!.id)
      return this.sendProductAdded()
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  public async getShoppingCart(): Promise<Response | undefined> {
    if (!this.verifyClient()) return
    try {
      const response: ShoppingCart = await getShoppingCart(this.req.user!.id)
      return this.responseQuery(response)
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  public async getTotal(): Promise<Response | undefined> {
    if (!this.verifyClient()) return
    try {
      const response: QueryResult = await getTotalShoppingCart(this.req.user!.id)
      return this.res.status(202).json({ Message: `Succesfull`, Total: response.rows[0].grand_total })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  private sendProductNotFound(): Response {
    return HttpResponses.sendErrorResponse(this.res, 204, `Product Not Found`)
  }
  private sendProductAdded(): Response {
    return HttpResponses.sendSuccessResponse(this.res, `Product Added To Your ShoppingCart`)
  }
}


