import { Response } from "express"
import { RequestExt } from "../models/requestExt"
import { PurchaseProduct } from "../models/purchaseProduct"
import { errorMessage } from "../errors"
import { HttpResponses } from "../utils/http.response"
import {  calculateTotalPrice, createPurchaseRecord, getProductById, getSellerCountryAndWalletBalance, hasSufficientBalance, processPurchase } from "../utils/service/order.Utils"

export class OrderService {
  constructor(private req: RequestExt, private res: Response) {
  }
  public async createPurchase(product: PurchaseProduct): Promise<Response> {
    const user = this.req.user!
    try {
      const productData = await getProductById(product.productId)
      if (!productData) return this.sendProductNotFoundError()
      const { sellerCountry, walletBalance } = await getSellerCountryAndWalletBalance(product.productId, user.id)
      const total = calculateTotalPrice(productData.price, product.quantity, user, sellerCountry)
      if (!hasSufficientBalance(total, walletBalance.balance)) {
        return this.sendInsufficientBalanceError();
      }
      const purchaseData = await createPurchaseRecord(user.id, total);
      await processPurchase(purchaseData.id, productData, product.quantity, user.id, walletBalance, total);
      return this.sendPurchaseSuccessResponse()
    } catch (e) {
      return this.handleError(e)
    }
  }
  private sendProductNotFoundError(): Response {
    return HttpResponses.sendErrorResponse(this.res, 204, `Product Not Found`);
  }

  private sendInsufficientBalanceError(): Response {
    return HttpResponses.sendErrorResponse(this.res, 402, `Insufficient Balance`);
  }

  private sendPurchaseSuccessResponse(): Response {
    return HttpResponses.sendSuccessResponse(this.res, `Purchase Completed Successfully`);
  }

  private handleError(e: any): Response {
    return errorMessage(e, this.res);
  }
}

