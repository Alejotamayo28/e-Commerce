import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { WalletService } from "../services/wallet.service";

export const wallerServicePostController = async (req: RequestExt, res: Response) => {
  try {
    new WalletService(req, res).createWallet(req.body)
  } catch (e) {
    console.error(e)
  }
}
export const walletServicePutController = async (req: RequestExt, res: Response) => {
  try {
    new WalletService(req, res).updateWallet(req.body)
  } catch (e) {
    console.error(e)
  }
}
