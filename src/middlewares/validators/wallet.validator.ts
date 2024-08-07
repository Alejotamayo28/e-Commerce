import { check } from "express-validator";
import { validateResult } from ".";
import { NextFunction, Request, Response } from "express";

export const validateWalletPost = [
  check(`balance`).exists().isNumeric(),
  check(`currency`).exists().isString().custom((value) => {
    return activeCurrencies(value)
  }),
  check(`status`).exists().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export const validateWalletPut = [
  check(`balance`).optional().isNumeric(),
  check(`status`).optional().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]


const currencies = ["USD", "EURO", "COL"]
const activeCurrencies = (value: string) => {
  if (currencies.includes(value)) return true
  else throw new Error(`Currency not allowed`)
}

