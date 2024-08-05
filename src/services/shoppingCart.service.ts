import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { errorMessage } from "../errors";
import { ShoppingCart } from "../models/shoppingCart";
import { QueryResult } from "pg";
import { pool } from "../database/database";

export class ShoppingCartService {
  constructor(private req: RequestExt, private res: Response) { }
  public async addProduct(shoppingCart: ShoppingCart) {
    const client = this.req.user
    if (!client) this.res.status(303).json({ Message: `User not found` })
    try {
      const product: QueryResult = await pool.query(
        `SELECT * FROM "Product" WHERE id = $1`, [shoppingCart.productId])
      if (!product.rowCount) {
        return this.res.status(303).json(`Product not found`)
      }
      const shoppingCartResponse: QueryResult = await pool.query(
        `INSERT INTO "ShoppingCart" (customerId, productId, quantity, added_at) VALUES ($1, $2, $3, $4) RETURNING *`,
        [client!.id, shoppingCart.productId, shoppingCart.quantity, new Date()])
      return this.res.status(202).json({ Message: `Tasks Succesfull`, Data: shoppingCartResponse.rows })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
}
