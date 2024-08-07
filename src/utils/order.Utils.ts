import { QueryResult } from "pg"
import { pool } from "../database/database"
import { Product } from "../models/product"
import { Purchase } from "../models/purchase"
import { Response } from "express"
import { Customer } from "../models/customer"
import { JwtPayload } from "jsonwebtoken"
import { Wallet } from "../models/wallet"

export class OrderUtils {
  constructor(private res: Response) { }
  static async createPurchaseRecord(customerId: number, total: number): Promise<Purchase> {
    const purchaseResult: QueryResult = await pool.query(
      `INSERT INTO "Purchase" (customerId, total) VALUES ($1, $2) RETURNING *`,
      [customerId, total]
    )
    return purchaseResult.rows[0] as Purchase
  }
  static async createPurchaseProductRecord(purchaseId: number, productId: number, quantity: number): Promise<void> {
    await pool.query(
      `INSERT INTO "PurchaseProduct" (purchaseId, productId, quantity) VALUES ($1, $2, $3)`,
      [purchaseId, productId, quantity]
    )
  }
  static async updateProductStock(productId: number, newStock: number): Promise<void> {
    await pool.query(
      `UPDATE "Product" SET stock = $1 WHERE id = $2`,
      [newStock, productId]
    )
  }
  static async updateWalletBalance(customerId: number, newBalance: number): Promise<void> {
    await pool.query(
      `UPDATE "Wallet" SET balance = $1, updated_at = $2 WHERE customer_id = $3`,
      [newBalance, new Date(), customerId])
  }
  static checkBalance(total: number, balance: number): Boolean {
    if (total > balance) {
      return false
    }
    return true
  }
  static async getPurchaseRecords(customerId: number): Promise<QueryResult> {
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
  static async getSellerCountry(id: number): Promise<Customer> {
    const response: QueryResult = await pool.query(
      `SELECT
	  c.country as country
FROM
	  "Customer" c
JOIN
	  "Product" p ON c.id  = p.seller_id 
WHERE
	  p.id = $1`, [id])
    return response.rows[0]
  }
  static async processPurchase(
    purchaseId: number,
    productData: Product,
    quantity: number,
    userId: number,
    walletBalance: Wallet,
    total: number
  ): Promise<void> {
    await Promise.all([
      OrderUtils.createPurchaseProductRecord(purchaseId, productData.id, quantity),
      OrderUtils.updateProductStock(productData.id, productData.stock - quantity),
      OrderUtils.updateWalletBalance(userId, walletBalance.balance - total)
    ]);
  }
  static calculateTotal(price: number, quantity: number, user: JwtPayload, sellerCountry: string): number {
    return (price * quantity) + this.countryTaxes(user, sellerCountry)
  }
  static countryTaxes(user: JwtPayload, sellerCountry: string): number {
    let tax = 0
    const userCountry = user.country
    if (userCountry != sellerCountry) tax += 1000
    return tax
  }
}
