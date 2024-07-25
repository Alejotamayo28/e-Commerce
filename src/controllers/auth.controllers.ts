import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RequestExt } from "../models/requestExt";


export const authServiceLoginController = (req: RequestExt, res: Response) => {
  try {
    new AuthService(req, res).login(req.body)
  } catch (e) {
    console.error(e)
  }
}

export const authServiceRegisterController = (req: RequestExt, res: Response) => {
  try {
    new AuthService(req, res).register(req.body)
  } catch (e) {
    console.error(e)
  }
}
