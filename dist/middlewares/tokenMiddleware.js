"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        throw { type: "unauthorized", message: "Token not provided" };
    const [scheme, token] = authHeader.trim().split(/\s+/);
    if ((scheme === null || scheme === void 0 ? void 0 : scheme.toLowerCase()) !== "bearer" || !token)
        throw { type: "unauthorized", message: "Invalid Token format" };
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("JWT_SECRET not set");
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.userId = payload.userId;
        return next();
    }
    catch (error) {
        throw { type: "unauthorized", message: "Token invalid or expired" };
    }
}
