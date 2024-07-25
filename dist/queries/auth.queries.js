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
exports.getCustomer = exports.registerCustomer = void 0;
const database_1 = require("../database/database");
const tables_1 = require("../database/tables");
const registerCustomer = (tablename, hashedPassword, customerData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!tables_1.validTables.includes(tablename))
        throw new Error(`Invalid table name`);
    const response = yield database_1.pool.query(`INSERT INTO "${tablename}" (email, password, name,) VALUES ( $1, $2, $3) RETURNING *`, [customerData.email, hashedPassword, customerData.name]);
    return response;
});
exports.registerCustomer = registerCustomer;
const getCustomer = (tablename, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!tables_1.validTables.includes(tablename))
        throw new Error(`Invalid table name`);
    const response = yield database_1.pool.query(`SELECT * FROM "${tablename}" WHERE email = $1`, [email]);
    return response;
});
exports.getCustomer = getCustomer;
