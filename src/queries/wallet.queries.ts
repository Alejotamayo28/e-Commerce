import { PoolClient, QueryResult } from "pg";
import { partialWallet, Wallet } from "../models/wallet";
import { WalletUtils } from "../utils/service/wallet.utils";

export const queryInsertWalletRecord = async (
  customerId: number,
  wallet: Wallet,
  session: PoolClient,
): Promise<Wallet> => {
  const {
    rows: [walletResponse],
  } = await session.query<Wallet>(
    `INSERT INTO "Wallet" (customer_id, balance, currency, status)
   VALUES ($1, $2, $3, $4) RETURNING *`,
    [customerId, wallet.balance, wallet.currency, wallet.status],
  );
  return walletResponse;
};

export const queryGetWalletRecord = async (
  customerId: number,
  session: PoolClient,
): Promise<Wallet> => {
  const {
    rows: [walletResponse],
  } = await session.query<Wallet>(
    `SELECT * FROM "Wallet" WHERE customer_id = $1`,
    [customerId],
  );
  return walletResponse;
};

export const queryUpdateWalletRecord = async (
  customerId: number,
  wallet: Partial<Wallet>,
  session: PoolClient,
): Promise<Wallet> => {
  const {
    rows: [walletResponse],
  }: QueryResult = await session.query<Wallet>(
    `UPDATE "Wallet" SET balance = $1, status = $2,
      updated_at = $3 WHERE customer_id = $4 RETURNING *`,
    [wallet.balance, wallet.status, new Date(), customerId],
  );
  return walletResponse;
};

export const UpdateWalletFields = async (
  customerId: number,
  wallet: Wallet,
): Promise<partialWallet> => {
  const oldWallet: Wallet = await WalletUtils.getWalletRecord(customerId);
  return {
    balance: wallet.balance ?? oldWallet.balance,
    status: wallet.status ?? oldWallet.status,
  };
};
