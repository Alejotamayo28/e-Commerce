import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { WalletService } from "../services/wallet.service";
import { errorMessage } from "../errors";

export const wallerServicePostController = async (req: RequestExt, res: Response) => {
  try {
    new WalletService(req, res).createWallet(req.body)
  } catch (e) {
    return errorMessage(e, res)
  }
}
export const walletServicePutController = async (req: RequestExt, res: Response) => {
  try {
    new WalletService(req, res).updateWallet(req.body)
  } catch (e) {
    return errorMessage(e, res)
  }
}
