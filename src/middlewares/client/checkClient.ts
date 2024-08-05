import { NextFunction, Response } from "express";
import { RequestExt } from "../../models/requestExt";

export const checkClientMiddleware = (req: RequestExt, res: Response, next: NextFunction) => {
  const client = req.user
  if (!client) {
    return res.status(401).json({ Message: `Unauthorized` })
  }
  next()
}
