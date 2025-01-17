import { QueryResult } from "pg";
import { Customer } from "../models/customer";
import { pool } from "../database/database";

export class AuthUtils {
  public async createCustomer(hashedPassword: string, customerData: Customer): Promise<Customer> {
    const response: QueryResult = await pool.query(
      `INSERT INTO "Customer" (email, password, name, country) VALUES ($1, $2, $3, $4) RETURNING *`,
      [customerData.email, hashedPassword, customerData.name, customerData.country])
    return response.rows[0]
  }
  public async getCustomer(email: string): Promise<Customer> {
    const response: QueryResult = await pool.query(
      `SELECT * FROM "Customer" WHERE email = $1`,
      [email])
    return response.rows[0]
  }
}
