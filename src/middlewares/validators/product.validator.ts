import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from ".";
import { verifyProductCategory, verifyProductStock } from "./custom.validator";

export const validateProductPost = [
  check(`name`).exists().isString(),
  check(`price`).exists().isNumeric(),
  check(`stock`).exists().isNumeric().custom((value) => {
    verifyProductStock(value)
  }),
  check(`description`).exists().isString(),
  check(`color`).exists().isString(),
  check(`year`).exists().isNumeric(),
  check(`category`).exists().isString().custom((value) => {
    return verifyProductCategory(value)
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

