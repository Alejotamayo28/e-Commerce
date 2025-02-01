export interface Wallet {
  wallet_id: number,
  customer_id: number,
  balance: number,
  currency: string,
  created_at: Date,
  updated_at: Date,
  status: string
}

export type partialWallet = Partial<Wallet>
