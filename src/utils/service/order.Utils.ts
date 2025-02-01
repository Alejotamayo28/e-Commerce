import { PoolClient, QueryResult } from "pg"
import { JwtPayload } from "jsonwebtoken"
import { pool } from "../../database/database"
import { Product } from "../../models/product"
import { Purchase } from "../../models/purchase"
import { Wallet } from "../../models/wallet"
import { onSession, onTransaction } from "../dataAccessLayer"
import { WalletUtils } from "./wallet.utils"

export class OrderUtils {
  constructor() { }
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
}
export const getProductById = async (productId: number): Promise<Product> => {
  const response: QueryResult<Product> = await onSession(async (client) => {
    return await client.query<Product>(`SELECT * FROM "Product" WHERE id = $1`, [productId])
  })
  return response.rows[0]
}
export const getSellerCountryAndWalletBalance = async (productId: number, clientId: number) => {
  return await onSession(async (client) => {
    const [sellerCountry, walletBalance] = await Promise.all([
      getSellerCountry(productId, client),
      WalletUtils.getWalletRecord(clientId, client)
    ]);
    return { sellerCountry, walletBalance }
  })
}
export const calculateTotalPrice = (
  price: number,
  quantity: number,
  user: JwtPayload, 
  sellerCountry: string
): number => {
  return (price * quantity) + (calculateCountryTaxes(user, sellerCountry))
}
export const calculateCountryTaxes = (user: JwtPayload, sellerCountry: string): number => {
  let tax = 0
  const userCountry = user.country
  if (userCountry != sellerCountry) tax += 1000
  return tax
}

export const hasSufficientBalance = (total: number, balance: number): boolean => {
  return total <= balance
}

export const createPurchaseRecord = async (userId: number, total: number): Promise<Purchase> => {
  const response: QueryResult<Purchase> = await onTransaction(async (client) => {
    return await client.query<Purchase>(`INSERT INTO "Purchase" (customerId, total) VALUES ($1, $2) RETURNING *`,
      [userId, total])
  })
  return response.rows[0]
}
export const processPurchase = async (
  purchaseId: number,
  productData: Product,
  quantity: number,
  userId: number,
  walletBalance: Wallet,
  total: number
): Promise<void> => {
  await onTransaction(async (client) => {
    await Promise.all([
      createPurchaseProductRecord(purchaseId, productData.id!, quantity, client),
      updateProductStock(productData.id!, productData.stock - quantity, client),
      updateWalletBalance(userId, walletBalance.balance - total, client)
    ]);
  });
}
export const createPurchaseProductRecord = async (
  purchaseId: number, 
  productId: number, 
  quantity: number, 
  client: PoolClient
): Promise<void> => {
  await client.query(
    `INSERT INTO "PurchaseProduct" (purchaseId, productId, quantity) VALUES ($1, $2, $3)`,
    [purchaseId, productId, quantity]
  )
}
export const updateProductStock = async (productId: number, newStock: number, client: PoolClient): Promise<void> => {
  await client.query(
    `UPDATE "Product" SET stock = $1 WHERE id = $2`,
    [newStock, productId]
  )
}
export const updateWalletBalance = async (clientId: number, newBalance: number, client: PoolClient): Promise<void> => {
  await client.query(
    `UPDATE "Wallet" SET balance = $1, updated_at = $2 WHERE customer_id = $3`,
    [newBalance, new Date(), clientId])
}
export const getSellerCountry = async (productId: number, client: PoolClient): Promise<string> => { const response: QueryResult = await client.query(
    `SELECT
	  c.country
    FROM
	  "Customer" c
    JOIN
	  "Product" p ON c.id  = p.seller_id 
    WHERE
	  p.id = $1`,
    [productId])
  return response.rows[0].country
}
