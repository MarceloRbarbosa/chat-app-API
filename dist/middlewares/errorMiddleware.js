"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandlerMiddleware;
const ERRORS = {
    unauthorized: 401,
    conflict: 409,
    NOT_FOUND: 404,
    bad_request: 400
};
function errorHandlerMiddleware(err, req, res, next) {
    var _a, _b;
    const statusCode = (_a = ERRORS[err.type]) !== null && _a !== void 0 ? _a : 500;
    return res.status(statusCode).json({
        error: (_b = err.message) !== null && _b !== void 0 ? _b : "Unexpected error"
    });
}
