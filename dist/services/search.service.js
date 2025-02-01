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
const jwt_1 = require("../utils/jwt");
const search_utils_1 = require("../utils/service/search.utils");
class SearchService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    responseQuery(response) {
        if (!response.rowCount) {
            return this.res.status(400).json({ Message: 'Data not found' });
        }
        return this.res.status(200).json({ Message: 'Successful', Data: response.rows });
    }
    verifyAndExecute(queryFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.req.user;
            if (!(0, jwt_1.verifyClient)(client)) {
                return this.res.status(401).json({ Message: 'Unauthorized' });
            }
            try {
                const response = yield queryFunction();
                return this.responseQuery(response);
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    categorySearch() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.verifyAndExecute(() => __awaiter(this, void 0, void 0, function* () {
                const { category } = this.req.params;
                return yield (0, search_utils_1.getProductsByCategory)(category);
            }));
        });
    }
    priceSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.verifyAndExecute(() => __awaiter(this, void 0, void 0, function* () {
                const { price } = this.req.params;
                return yield (0, search_utils_1.getProductsByPrice)(Number(price));
            }));
        });
    }
    categoryPriceSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.verifyAndExecute(() => __awaiter(this, void 0, void 0, function* () {
                const { category, price } = this.req.params;
                return yield (0, search_utils_1.getProductsByCategoryAndPrice)(category, Number(price));
            }));
        });
    }
}
exports.SearchService = SearchService;
