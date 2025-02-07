import { Response } from "express";
import { AuthService } from "../services/auth.service";
import { RequestExt } from "../models/requestExt";
import { errorMessage } from "../errors";

export const authServiceLoginController = (req: RequestExt, res: Response) => {
  try {
    return new AuthService(res).login(req.body)
  } catch (e) {
    return errorMessage(e, res)
  }
}

export const authServiceRegisterController = (req: RequestExt, res: Response) => {
  try {
    new AuthService(res).register(req.body)
  } catch (e) {
    return errorMessage(e, res)
  }
}
