import { QueryResult } from "pg"
import { pool } from "../database/database"
import { Product } from "../models/product"
import { Purchase } from "../models/purchase"
import { Response } from "express"

export class OrderUtils {
  constructor(private res: Response) { }
  public async getProductById(productId: number): Promise<Product | null> {
    const productResult: QueryResult = await pool.query(
      `SELECT * FROM "Product" WHERE id = $1`,
      [productId]
    )
    return productResult.rowCount! > 0 ? productResult.rows[0] : null
  }
  public async getWalletById(customerId: number) {
    const walletResult: QueryResult = await pool.query(
      `SELECT * FROM "Wallet" WHERE customer_id = $1`,
      [customerId])
    return walletResult.rows[0].balance
  }
  public async createPurchaseRecord(customerId: number, total: number): Promise<Purchase> {
    const purchaseResult: QueryResult = await pool.query(
      `INSERT INTO "Purchase" (customerId, total) VALUES ($1, $2) RETURNING *`,
      [customerId, total]
    )
    return purchaseResult.rows[0]
  }
  public async createPurchaseProductRecord(purchaseId: number, productId: number, quantity: number): Promise<void> {
    await pool.query(
      `INSERT INTO "PurchaseProduct" (purchaseId, productId, quantity) VALUES ($1, $2, $3)`,
      [purchaseId, productId, quantity]
    )
  }
  public async updateProductStock(productId: number, newStock: number): Promise<void> {
    await pool.query(
      `UPDATE "Product" SET stock = $1 WHERE id = $2`,
      [newStock, productId]
    )
  }
  public async updateWalletBalance(customerId: number, newBalance: number) {
    await pool.query(
      `UPDATE "Wallet" SET balance = $1, updated_at = $2 WHERE customer_id = $3`,
      [newBalance, new Date(), customerId])
  }
  public checkQuantity(quantity: number): Boolean {
    if (quantity <= 0) {
      this.res.status(400).json({ message: 'La cantidad a comprar debe ser mayor a cero.' })
      return false
    }
    return true
  }
  public checkStock(stock: number, quantity: number): Boolean {
    if (stock < quantity) {
      this.res.status(400).json({ message: 'Stock insuficiente' })
      return false
    }
    return true
  }
  public checkBalance(total: number, balance: number): Boolean {
    if (total > balance) {
      this.res.status(400).json({ message: `insuficient balance` })
      return false
    }
    return true
  }
  public productNotFound() {
    return this.res.status(404).json({ message: 'Producto no encontrado' })
  }
  public async getPurchaseRecords(customerId: number):Promise<QueryResult> {
    const response: QueryResult = await pool.query(
      `SELECT
    "Purchase".id AS purchase_id,
    "Purchase".total,
    "Purchase".createdAt,
    "Product".id AS product_id,
    "Product".name AS product_name,
    "ProductDetails".description,
    "ProductDetails".color,
    "ProductDetails".year
FROM
    "Purchase"
JOIN
    "PurchaseProduct" ON "Purchase".id = "PurchaseProduct".purchaseId
JOIN
    "Product" ON "PurchaseProduct".productId = "Product".id
JOIN
    "ProductDetails" on "Product".description_id = "ProductDetails".id
WHERE
    "Purchase".customerId = $1;`,
      [customerId])
    return response
  }
}
