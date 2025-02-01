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
const errors_1 = require("../errors");
const email_service_1 = require("./email.service");
const http_response_1 = require("../utils/http.response");
const auth_utils_1 = require("../utils/service/auth.utils");
const dataAccessLayer_1 = require("../utils/dataAccessLayer");
class AuthService {
    constructor(res) {
        this.res = res;
    }
    register(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcryptjs_1.default.hash(customerData.password, 10);
                const response = yield (0, dataAccessLayer_1.onTransaction)((transactionClient) => __awaiter(this, void 0, void 0, function* () {
                    return yield auth_utils_1.AuthUtils.insertCustomer(hashedPassword, customerData, transactionClient);
                }));
                new email_service_1.EmailService().sendEmail(customerData);
                return http_response_1.HttpResponses.sendSuccessResponse(this.res, 'REGISTER COMPLETED SUCCESFULLY', response);
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    login(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, dataAccessLayer_1.onSession)((transactionClient) => __awaiter(this, void 0, void 0, function* () {
                    return yield auth_utils_1.AuthUtils.getCustomer(customerData.email, transactionClient);
                }));
                if (!user)
                    http_response_1.HttpResponses.sendErrorResponse(this.res, 303, 'EMAIL NOT FOUND');
                if (!(yield bcryptjs_1.default.compare(customerData.password, user.password))) {
                    return http_response_1.HttpResponses.sendErrorResponse(this.res, 303, `INVALID PASSWORD`);
                }
                return http_response_1.HttpResponses.sendSuccessResponse(this.res, 'LOGIN SUCCESFULLY', (0, jwt_1.generateToken)(user.id, user.country));
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
}
exports.AuthService = AuthService;
