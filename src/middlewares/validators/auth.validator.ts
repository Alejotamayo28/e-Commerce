import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from ".";

export const validateAuthLogin = [
  check(`email`).exists().isEmail(),
  check(`password`).exists().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export const validateAuthRegister = [
  check(`email`).exists().isEmail(),
  check(`password`).exists().isString(),
  check(`name`).exists().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]
