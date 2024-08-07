import { Response } from "express"
import { RequestExt } from "../models/requestExt"
import { PurchaseProduct } from "../models/purchaseProduct"
import { Purchase } from "../models/purchase"
import { OrderUtils } from "../utils/order.Utils"
import { errorMessage } from "../errors"
import { Product } from "../models/product"
import { getProductById } from "../utils/product.utils"
import { HttpResponses } from "../utils/http.response"
import { WalletUtils } from "../utils/wallet.utils"

export class OrderService {
  constructor(private req: RequestExt, private res: Response) {
  }
  public async createPurchase(purchaseProduct: PurchaseProduct): Promise<Response> {
    const user = this.req.user!
    try {
      const productData: Product = await getProductById(purchaseProduct.productId)
      if (!productData) return HttpResponses.sendErrorResponse(this.res, 204, `Product Not Found`)
      const [sellerCountry, walletBalance] = await Promise.all([
        OrderUtils.getSellerCountry(purchaseProduct.productId),
        WalletUtils.getWalletRecord(user.id)
      ])
      const total = OrderUtils.calculateTotal(
        productData.price, purchaseProduct.quantity, user, sellerCountry.country)
      if (!OrderUtils.checkBalance(total, walletBalance.balance)) {
        return HttpResponses.sendErrorResponse(this.res, 402, `Insufficient Balance`)
      }
      const purchaseData: Purchase = await OrderUtils.createPurchaseRecord(user.id, total)
      console.log(`wallet: `,walletBalance)
      await OrderUtils.processPurchase(
        purchaseData.id, productData, purchaseProduct.quantity, user.id, walletBalance, total);
      return HttpResponses.sendSuccessResponse(this.res, `Purchase Completed Succesfully`)
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
}



