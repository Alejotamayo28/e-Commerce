import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { Wallet } from "../models/wallet";
import { QueryResult } from "pg";
import { WalletUtils } from "../utils/wallet.utils";
import { errorMessage } from "../errors";

export class WalletService {
  private walletUtils: WalletUtils
  constructor(private req: RequestExt, private res: Response) {
    this.walletUtils = new WalletUtils()
  }
  public async createWallet(walletData: Wallet): Promise<Response> {
    const client = this.req.user
    if (!client) {
      return this.res.status(303).json({ message: `User not found` })
    } try {
      const response = await this.walletUtils.createWalletUtils(client.id, walletData)
      return this.res.status(202).json({ Message: `Wallet crated`, Data: response })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  public async updateWallet(walletData: Wallet): Promise<Response> {
    const client = this.req.user
    if (!client) {
      return this.res.status(303).json({ message: `User not found` })
    }
    try {
      const walletOldData: Wallet = await WalletUtils.getWalletRecord(client.id)
      const walletNewData: Partial<Wallet> = {
        balance: walletData.balance ?? walletOldData.balance,
        status: walletData.status ?? walletOldData.status
      }
      const Wallet = await this.walletUtils.updateWalletRecord(client.id, walletNewData)
      return this.res.status(202).json({ Message: `Wallet Updated`, Data: Wallet.rows })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
}




