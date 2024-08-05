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
exports.SearchService = void 0;
const errors_1 = require("../errors");
const database_1 = require("../database/database");
class SearchService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    priceSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.req.user;
            if (!client) {
                return this.res.status(303).json({ message: `User not found` });
            }
            try {
                const { filter } = this.req.params;
                const response = yield database_1.pool.query(`SELECT 
    "Product".id as product_id,
    "Product".name,
    "Product".price,
    "Product"."stock",
    "ProductDetails".description,
    "ProductDetails".color,
    "ProductDetails"."year",
    "ProductDetails".category
FROM
    "ProductDetails"
JOIN
    "Product" ON "ProductDetails".id = "Product".description_id
WHERE 
    "ProductDetails".category = $1`, [filter]);
                if (!response.rowCount)
                    return this.res.status(303).json({ Message: 'Data not found' });
                return this.res.status(202).json({ Message: `Succesfull`, Data: response.rows });
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
}
exports.SearchService = SearchService;
