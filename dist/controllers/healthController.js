"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = healthCheck;
const http_status_1 = __importDefault(require("http-status"));
async function healthCheck(req, res) {
    res.status(http_status_1.default.OK).send(" I'm OK!");
}
