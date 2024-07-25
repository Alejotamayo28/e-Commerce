import bcrypt from "bcryptjs"
import { QueryResult } from "pg"
import { Request, Response } from "express"
import { generateToken } from "../utils/jwt"
import { Customer } from "../models/customer"
import { AuthUtils } from "../utils/auth.utils"
import { errorMessage } from "../errors"

export class AuthService {
  private authUtils: AuthUtils
  constructor(private req: Request, private res: Response) {
    this.authUtils = new AuthUtils()
  }
  public async register(customerData: Customer): Promise<Response> {
    try {
      const hashedPassword = await bcrypt.hash(customerData.password, 10)
      const response: QueryResult = await this.authUtils.createCustomer(hashedPassword, customerData)
      return this.res.status(202).json({ Message: `Completed`, Data: response.rows[0] })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  public async login(customerData: Customer): Promise<Response> {
    try {
      const user: QueryResult = await this.authUtils.getCustomer(customerData.email)
      if (!user.rowCount) this.res.status(303).json(`Email not found`)
      if (!(await bcrypt.compare(customerData.password, user.rows[0].password))) {
        return this.res.status(303).json(`Contrasena Invalida`)
      } return this.res.status(202).json({ Token: generateToken(user.rows[0].id) })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
}
