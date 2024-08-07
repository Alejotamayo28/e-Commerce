"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponses = void 0;
class HttpResponses {
    static sendSuccessResponse(res, message, data) {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }
    static sendErrorResponse(res, status, message) {
        return res.status(status).json({
            success: false,
            message
        });
    }
}
exports.HttpResponses = HttpResponses;
