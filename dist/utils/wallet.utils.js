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
exports.WalletUtils = void 0;
const database_1 = require("../database/database");
class WalletUtils {
    createWalletUtils(customerId, walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletResult = yield database_1.pool.query(`INSERT INTO "Wallet" (customer_id, balance, currency, status) 
     VALUES ($1, $2, $3, $4) RETURNING *`, [customerId, walletData.balance, walletData.currency, walletData.status]);
            return walletResult.rows[0];
        });
    }
    static getWalletRecord(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletResult = yield database_1.pool.query(`SELECT * FROM "Wallet" WHERE customer_id = $1`, [customerId]);
            return walletResult.rows[0];
        });
    }
    updateWalletRecord(customerId, walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletResult = yield database_1.pool.query(`UPDATE "Wallet" SET balance = $1, status = $2, updated_at = $3 WHERE customer_id = $4 RETURNING *`, [walletData.balance, walletData.status, new Date(), customerId]);
            return walletResult;
        });
    }
}
exports.WalletUtils = WalletUtils;
