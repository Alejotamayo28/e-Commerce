import { Response } from "express"
import { RequestExt } from "../models/requestExt"
import { PurchaseProduct } from "../models/purchaseProduct"
import { Purchase } from "../models/purchase"
import { OrderUtils } from "../utils/order.Utils"
import { errorMessage } from "../errors"
import { QueryResult } from "pg"

export class OrderService {
  public orderUtils: OrderUtils
  constructor(private req: RequestExt, private res: Response) {
    this.orderUtils = new OrderUtils(res)
  }
  public async createPurchase(purchaseProduct: PurchaseProduct): Promise<Response | undefined> {
    const user = this.req.user
    if (!user) {
      return this.res.status(303).json({ message: 'User not found' })
    }
    try {
      if (!this.orderUtils.checkQuantity(purchaseProduct.quantity)) return
      let productData = await this.orderUtils.getProductById(purchaseProduct.productId)
      if (!productData) {
        return this.orderUtils.productNotFound()
      }
      if (!this.orderUtils.checkStock(productData.stock, purchaseProduct.quantity)) return
      const total = productData.price * purchaseProduct.quantity
      const walletBalance = await this.orderUtils.getWalletById(user.id)
      if (!this.orderUtils.checkBalance(total, walletBalance)) return
      const purchaseData: Purchase = await this.orderUtils.createPurchaseRecord(user.id, total)
      await Promise.all([
        await this.orderUtils.createPurchaseProductRecord(purchaseData.id, productData.id, purchaseProduct.quantity),
        await this.orderUtils.updateProductStock(productData.id, productData.stock - purchaseProduct.quantity),
        await this.orderUtils.updateWalletBalance(user.id, walletBalance - total)
      ])
      return this.res.status(202).json({
        message: `Compra finalizada.`
      })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  public async getPurchaseRecords(): Promise<Response> {
    const user = this.req.user
    if (!user) {
      return this.res.status(303).json({ message: 'User not found' })
    }
    try {
      const response: QueryResult = await this.orderUtils.getPurchaseRecords(user.id)
      return this.res.status(202).json({ Message: `Data History: `, Data: response.rows })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
}
