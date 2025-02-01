"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWalletFields = exports.queryUpdateWalletRecord = exports.queryGetWalletRecord = exports.queryInsertWalletRecord = void 0;
const wallet_utils_1 = require("../utils/service/wallet.utils");
const queryInsertWalletRecord = (customerId, wallet, session) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [walletResponse] } = yield session.query(`INSERT INTO "Wallet" (customer_id, balance, currency, status)
   VALUES ($1, $2, $3, $4) RETURNING *`, [customerId, wallet.balance, wallet.currency, wallet.status]);
    return walletResponse;
});
exports.queryInsertWalletRecord = queryInsertWalletRecord;
const queryGetWalletRecord = (customerId, session) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [walletResponse] } = yield session.query(`SELECT * FROM "Wallet" WHERE customer_id = $1`, [customerId]);
    return walletResponse;
});
exports.queryGetWalletRecord = queryGetWalletRecord;
const queryUpdateWalletRecord = (customerId, wallet, session) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [walletResponse] } = yield session.query(`UPDATE "Wallet" SET balance = $1, status = $2, updated_at = $3 WHERE customer_id = $4 RETURNING *`, [wallet.balance, wallet.status, new Date(), customerId]);
    return walletResponse;
});
exports.queryUpdateWalletRecord = queryUpdateWalletRecord;
const UpdateWalletFields = (customerId, wallet) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const oldWallet = yield wallet_utils_1.WalletUtils.getWalletRecord(customerId);
    return {
        balance: (_a = wallet.balance) !== null && _a !== void 0 ? _a : oldWallet.balance,
        status: (_b = wallet.status) !== null && _b !== void 0 ? _b : oldWallet.status
    };
});
exports.UpdateWalletFields = UpdateWalletFields;
