import { check } from "express-validator";
import { verifyPositiveNumber } from "./custom.validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from ".";

export const validateOrderPost = [
  check(`productId`).exists().isNumeric().custom((value) => {
    return verifyPositiveNumber(value)
  }),
  check(`quantity`).exists().isNumeric().custom((value) => {
    return verifyPositiveNumber(value)
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
