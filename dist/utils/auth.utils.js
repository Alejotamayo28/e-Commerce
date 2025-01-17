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
exports.AuthUtils = void 0;
const database_1 = require("../database/database");
class AuthUtils {
    createCustomer(hashedPassword, customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query(`INSERT INTO "Customer" (email, password, name, country) VALUES ($1, $2, $3, $4) RETURNING *`, [customerData.email, hashedPassword, customerData.name, customerData.country]);
            return response.rows[0];
        });
    }
    getCustomer(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query(`SELECT * FROM "Customer" WHERE email = $1`, [email]);
            return response.rows[0];
        });
    }
}
exports.AuthUtils = AuthUtils;
