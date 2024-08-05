"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkClientMiddleware = void 0;
const checkClientMiddleware = (req, res, next) => {
    const client = req.user;
    if (!client) {
        return res.status(401).json({ Message: `Unauthorized` });
    }
    next();
};
exports.checkClientMiddleware = checkClientMiddleware;
