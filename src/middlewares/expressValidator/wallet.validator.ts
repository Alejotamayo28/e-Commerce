import { check } from "express-validator";
import { validateResult } from ".";
import { NextFunction, Request, Response } from "express";


export const validateWalletPost = [
  check(`balance`).exists().isNumeric(),
  check(`currency`).exists().isString(),
  check(`status`).exists().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export const validateWalletPut = [
  check(`balance`).isNumeric(),
  check(`status`).isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
