import { NextFunction, Response } from "express";
import { RequestExt } from "../../models/requestExt";
import { pool } from "../../database/database";
import { errorMessage } from "../../errors";

export const verifyUserExists = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id
    const user = await pool.query(`SELECT id FROM "Customer" WHERE id = $1`, [userId!])
    if (!user) {
      return res.status(404).json({ Message: `User not found` })
    }
    next()
  } catch (e) {
    return errorMessage(e, res)
  }
}
