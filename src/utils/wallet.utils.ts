import { QueryResult } from "pg"
import { pool } from "../database/database"
import { Wallet } from "../models/wallet"

export class WalletUtils {
  public async createWalletUtils(customerId: number, walletData: Wallet): Promise<Wallet> {
    const walletResult: QueryResult = await pool.query(
      `INSERT INTO "Wallet" (customer_id, balance, currency, status) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
      [customerId, walletData.balance, walletData.currency, walletData.status])
    return walletResult.rows[0]
  }
  static async getWalletRecord(customerId: number):Promise<Wallet> {
    const walletResult: QueryResult = await pool.query(
      `SELECT * FROM "Wallet" WHERE customer_id = $1`,
        [customerId])
    return walletResult.rows[0] as Wallet
  }
  public async updateWalletRecord(customerId: number, walletData: Partial<Wallet>) {
    const walletResult: QueryResult = await pool.query(
      `UPDATE "Wallet" SET balance = $1, status = $2, updated_at = $3 WHERE customer_id = $4 RETURNING *`,
      [walletData.balance, walletData.status, new Date(), customerId])
    return walletResult
  }
}
