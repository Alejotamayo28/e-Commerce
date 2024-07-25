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
exports.ProductService = void 0;
const product_queries_1 = require("../queries/product.queries");
class ProductService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.req.user;
            try {
                if (!client)
                    return this.res.status(303).json({ Message: "Client not found" });
                const response = yield (0, product_queries_1.createProduct)("Product", client.id, productData);
                return this.res.status(202).json({ Message: `Product Created`, Data: response.rows[0] });
            }
            catch (e) {
                if (e instanceof Error)
                    return this.res.status(400).json({ Message: console.error });
                return this.res.status(400).json({ Message: `Desconocido` });
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.req.user;
            if (!client)
                return this.res.status(303).json({ Message: "Client not found" });
            try {
                const product = yield (0, product_queries_1.getAllProducts)("Product");
                if (!product.rows)
                    return this.res.status(303).json({ Message: "No products found" });
                return this.res.status(202).json({ Message: `Data found`, Data: product.rows });
            }
            catch (e) {
                if (e instanceof Error)
                    return this.res.status(400).json({ Message: console.error });
                return this.res.status(400).json({ Message: `Desconocido` });
            }
        });
    }
}
exports.ProductService = ProductService;
