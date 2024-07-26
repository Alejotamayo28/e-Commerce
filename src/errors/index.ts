import { Response } from "express";

export const errorMessage = (error: any, res: Response) => {
  const errorMessage = error instanceof Error ? error.message : `Unkwon Error`
  console.error(errorMessage)
  return res.status(404).json({ message: errorMessage });
}
