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
exports.ShoppingCartService = void 0;
const errors_1 = require("../errors");
const database_1 = require("../database/database");
class ShoppingCartService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    addProduct(shoppingCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.req.user;
            if (!client)
                this.res.status(303).json({ Message: `User not found` });
            try {
                const product = yield database_1.pool.query(`SELECT * FROM "Product" WHERE id = $1`, [shoppingCart.productId]);
                if (!product.rowCount) {
                    return this.res.status(303).json(`Product not found`);
                }
                const shoppingCartResponse = yield database_1.pool.query(`INSERT INTO "ShoppingCart" (customerId, productId, quantity, added_at) VALUES ($1, $2, $3, $4) RETURNING *`, [client.id, shoppingCart.productId, shoppingCart.quantity, new Date()]);
                return this.res.status(202).json({ Message: `Tasks Succesfull`, Data: shoppingCartResponse.rows });
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
}
exports.ShoppingCartService = ShoppingCartService;
