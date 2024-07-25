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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const auth_queries_1 = require("../queries/auth.queries");
class AuthService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    register(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(customerData.password, 10);
            const response = yield (0, auth_queries_1.registerCustomer)("Customer", hashedPassword, customerData);
            return this.res.status(202).json({ Message: `Completed`, Data: response.rows[0] });
        });
    }
    login(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, auth_queries_1.getCustomer)("Customer", customerData.email);
            if (!user.rowCount)
                this.res.status(303).json(`Email not found`);
            if (!(yield bcryptjs_1.default.compare(customerData.password, user.rows[0].password))) {
                return this.res.status(303).json(`Contrasena Invalida`);
            }
            return this.res.status(202).json({ Token: (0, jwt_1.generateToken)(user.rows[0].id) });
        });
    }
}
exports.AuthService = AuthService;
