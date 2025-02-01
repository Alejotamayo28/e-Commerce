import { NextFunction, Response } from "express";
import { RequestExt } from "../../models/requestExt";
import { errorMessage } from "../../errors";

export const verifyUserExists = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id
    if (!userId) {
      return res.status(404).json({ Message: `User not found` })
    }
    next()
  } catch (e) {
    return errorMessage(e, res)
  }
}
