import { QueryResult } from "pg"
import { pool } from "../database/database"
import { Product } from "../models/product"

export class ProductUtils {
  static async getProducts(): Promise<QueryResult<Product>> {
    const response: QueryResult = await pool.query(`SELECT * FROM "Product"`)
    return response
  }
  public async createProduct(id: number, productData: Product): Promise<Omit<Product, 'id'>> {
    const description = await pool.query<Product>(
      `INSERT INTO "ProductDetails" (description, color, year, category) VALUES ($1, $2, $3, $4) RETURNING *`,
      [productData.description, productData.color, productData.year, productData.category])
    const product: QueryResult = await pool.query(
      `INSERT INTO "Product" (name,  price, stock, description_id, seller_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [productData.name, productData.price, productData.stock, description.rows[0].id, id])
    const producto: Omit<Product, 'id'> = {
      name: product.rows[0].name,
      price: product.rows[0].price,
      stock: product.rows[0].stock,
      description: description.rows[0].description,
      color: description.rows[0].color,
      year: description.rows[0].year,
      category: description.rows[0].category
    }
    return producto
  }
}
export const getProductById = async (id: number): Promise<Product> => {
  const response: QueryResult = await pool.query(
    `SELECT * FROM "Product" WHERE id = $1`,
    [id])
  return response.rows[0]
}
