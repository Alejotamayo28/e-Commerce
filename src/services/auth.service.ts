import bcrypt from "bcryptjs";
import { Response } from "express";
import { generateToken } from "../utils/jwt";
import { Customer } from "../models/customer";
import { errorMessage } from "../errors";
import { EmailService } from "./email.service";
import { HttpResponses } from "../utils/http.response";
import { AuthUtils } from "../utils/service/auth.utils";
import { onSession, onTransaction } from "../utils/dataAccessLayer";

export class AuthService {
  constructor(private res: Response) {}
  public async register(customerData: Customer): Promise<Response> {
    try {
      const hashedPassword = await bcrypt.hash(customerData.password, 10);
      const response: Customer = await onTransaction(
        async (transactionClient) => {
          return await AuthUtils.insertCustomer(
            hashedPassword,
            customerData,
            transactionClient,
          );
        },
      );
      new EmailService().sendEmail(customerData);
      return HttpResponses.sendSuccessResponse(
        this.res,
        "REGISTER COMPLETED SUCCESFULLY",
        response,
      );
    } catch (e) {
      return errorMessage(e, this.res);
    }
  }
  public async login(customerData: Customer): Promise<Response> {
    try {
      const user: Customer = await onSession(async (transactionClient) => {
        return await AuthUtils.getCustomer(
          customerData.email,
          transactionClient,
        );
      });
      if (!user)
        HttpResponses.sendErrorResponse(this.res, 303, "EMAIL NOT FOUND");
      if (!(await bcrypt.compare(customerData.password, user.password))) {
        return HttpResponses.sendErrorResponse(
          this.res,
          303,
          `INVALID PASSWORD`,
        );
      }
      return HttpResponses.sendSuccessResponse(
        this.res,
        "LOGIN SUCCESFULLY",
        generateToken(user.id, user.country),
      );
    } catch (e) {
      return errorMessage(e, this.res);
    }
  }
}
