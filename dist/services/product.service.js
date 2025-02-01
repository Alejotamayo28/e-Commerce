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
const errors_1 = require("../errors");
const product_utils_1 = require("../utils/service/product.utils");
const http_response_1 = require("../utils/http.response");
const dataAccessLayer_1 = require("../utils/dataAccessLayer");
class ProductService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield (0, dataAccessLayer_1.onTransaction)((client) => __awaiter(this, void 0, void 0, function* () {
                    const productDetails = yield product_utils_1.ProductUtils.insertProductDetails(client, data.details);
                    const product = yield product_utils_1.ProductUtils.insertProduct(client, data, productDetails.id, this.req.user.id);
                    return product_utils_1.ProductUtils.constructProductResponse(product, productDetails);
                }));
                return http_response_1.HttpResponses.sendSuccessResponse(this.res, `Product Succesfully Created`, product);
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield (0, dataAccessLayer_1.onSession)((client) => __awaiter(this, void 0, void 0, function* () {
                    return yield product_utils_1.ProductUtils.getProducts(client);
                }));
                return this.res.status(202).json({ Message: `Data found`, Data: products.rows });
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
}
exports.ProductService = ProductService;
