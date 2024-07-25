import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { Wallet } from "../models/wallet";
import { QueryResult } from "pg";
import { WalletUtils } from "../utils/wallet.utils";

export class WalletService {
  private walletUtils: WalletUtils
  constructor(private req: RequestExt, private res: Response) {
    this.walletUtils = new WalletUtils()
  }
  public async createWallet(walletData: Wallet) {
    const client = this.req.user
    if (!client) {
      return this.res.status(303).json({ message: `User not found` })
    } try {
      const response = await this.walletUtils.createWalletUtils(client.id, walletData)
      return this.res.status(202).json({ Message: `Wallet crated`, Data: response })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unkown Error'
      return this.res.status(400).json({ error: errorMessage })
    }
  }
  public async updateWallet(walletData: Wallet) {
    const client = this.req.user
    if (!client) {
      return this.res.status(303).json({ message: `User not found` })
    }
    try {
      const walletOldData: QueryResult = await this.walletUtils.getWalletRecord(client.id)
      const walletNewData: Partial<Wallet> = {
        balance: walletData.balance ?? walletOldData.rows[0].balance,
        status: walletData.status ?? walletOldData.rows[0].status
      }
      const Wallet = await this.walletUtils.updateWalletRecord(client.id, walletNewData)
      return this.res.status(202).json({ Message: `Wallet Updated`, Data: Wallet.rows })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unkown Error'
      return this.res.status(400).json({ error: errorMessage })
    }
  }
}




