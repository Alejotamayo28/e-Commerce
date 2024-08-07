import bcrypt from "bcryptjs"
import { Response } from "express"
import { generateToken } from "../utils/jwt"
import { Customer } from "../models/customer"
import { AuthUtils } from "../utils/auth.utils"
import { errorMessage } from "../errors"
import { EmailService } from "./email.service"
import { HttpResponses } from "../utils/http.response"

export class AuthService {
  private authUtils: AuthUtils
  constructor(private res: Response) {
    this.authUtils = new AuthUtils()
  }
  public async register(customerData: Customer): Promise<Response> {
    try {
      const hashedPassword = await bcrypt.hash(customerData.password, 10)
      const response: Customer = await this.authUtils.createCustomer(hashedPassword, customerData)
      new EmailService().sendEmail(customerData)
      return HttpResponses.sendSuccessResponse(this.res, 'Register Completed Succesfully', response)
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  public async login(customerData: Customer): Promise<Response> {
    try {
      const user: Customer = await this.authUtils.getCustomer(customerData.email)
      if (!user) this.res.status(303).json(`Email not found`)
      if (!(await bcrypt.compare(customerData.password, user.password))) {
        return HttpResponses.sendErrorResponse(this.res,303,`Invalid Password`)
      } return this.res.status(202).json({
        Token: generateToken(user.id, user.country)
      })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
}



