import { PoolClient, QueryResult } from "pg"
import { Wallet } from "../../models/wallet"
import { onSession, onTransaction } from "../dataAccessLayer"
import { queryGetWalletRecord, queryInsertWalletRecord, queryUpdateWalletRecord } from "../../queries/wallet.queries"

export class WalletUtils {
  static async createWalletUtils(customerId: number, wallet: Wallet): Promise<Wallet> {
    return await onTransaction(async (client) => {
      return await queryInsertWalletRecord(customerId, wallet, client)
    })
  }
  static async getWalletRecord(customerId: number, session?: PoolClient): Promise<Wallet> {
    if (session) {
      return await queryGetWalletRecord(customerId, session)
    } else {
      return await onSession(async (session) => {
        return await queryGetWalletRecord(customerId, session)
      })
    }
  }
  static async updateWalletRecord(customerId: number, wallet: Partial<Wallet>) {
    return await onTransaction(async (client) => {
      return await queryUpdateWalletRecord(customerId, wallet, client)
    })
  }
}







