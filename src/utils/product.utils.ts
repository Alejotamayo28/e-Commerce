import { QueryResult } from "pg"
import { pool } from "../database/database"
import { Product } from "../models/product"

export class ProductUtils {
  public async getProducts(): Promise<QueryResult<Product>> {
    const response: QueryResult = await pool.query(`SELECT * FROM "Product"`)
    return response
  }
  public async createProduct(id: number, productData: Product): Promise<QueryResult<Product>> {
    const response: QueryResult = await pool.query(
      `INSERT INTO "Product" (name,  price, stock, description, color, year, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [productData.name, productData.price, productData
        .stock, productData.description, productData.color, productData.year, id])
    return response

  }
}
