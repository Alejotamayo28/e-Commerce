import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from ".";

export const validateProductPost = [
  check(`name`).exists().isString(),
  check(`price`).exists().isNumeric(),
  check(`stock`).exists().isNumeric(),
  check(`description`).exists().isString(),
  check(`color`).exists().isString(),
  check(`year`).exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
