import { Response } from "express";

export class HttpResponses {
  static sendSuccessResponse(res: Response, message: string, data?: any): Response {
    return res.status(200).json({
      success: true,
      message,
      data
    });
  }
  static sendErrorResponse(res: Response, status: number, message: string): Response {
    return res.status(status).json({
      success: false,
      message
    });
  }
}
