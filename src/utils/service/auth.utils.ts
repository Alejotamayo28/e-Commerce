import { PoolClient, QueryResult } from "pg";
import { Customer } from "../../models/customer";

export class AuthUtils {
  static async insertCustomer(hashedPassword: string, customerData: Customer, client: PoolClient): Promise<Customer> {
    const response: QueryResult = await client.query<Customer>(
      `INSERT INTO "Customer" (email, password, name, country) VALUES ($1, $2, $3, $4) RETURNING *`,
      [customerData.email, hashedPassword, customerData.name, customerData.country])
    return response.rows[0]
  }
  static async getCustomer(email: string, client: PoolClient): Promise<Customer> {
    const response: QueryResult = await client.query(
      `SELECT * FROM "Customer" WHERE email = $1`,
      [email])
    return response.rows[0]
  }
}
