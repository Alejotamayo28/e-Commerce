import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { Wallet } from "../models/wallet";
import { errorMessage } from "../errors";
import { HttpResponses } from "../utils/http.response";
import { WalletUtils } from "../utils/service/wallet.utils";
import { UpdateWalletFields } from "../queries/wallet.queries";

export class WalletService {
  constructor(private req: RequestExt, private res: Response) { }
  public async createWallet(walletData: Wallet): Promise<Response> {
    const user = this.req.user!
    try {
      await WalletUtils.createWalletUtils(user.id, walletData)
      return this.sendWalletCreatedRespons()
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  public async updateWallet(walletData: Wallet): Promise<Response> {
    const user = this.req.user!
    try {
      const newWallet: Partial<Wallet> = await UpdateWalletFields(user.id, walletData)
      await WalletUtils.updateWalletRecord(user.id, newWallet)
      return this.sendWalletUpdatedResponse()
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  private sendWalletCreatedRespons(): Response {
    return HttpResponses.sendSuccessResponse(this.res, `Wallet Created Succesfully`)
  }
  private sendWalletUpdatedResponse(): Response {
    return HttpResponses.sendSuccessResponse(this.res, `Wallet Created Succesfully`)
  }
}




