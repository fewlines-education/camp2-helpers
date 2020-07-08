"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function readCode(path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, "utf8", function (err, text) {
            if (err) {
                reject(err);
                return;
            }
            const code = text
                .replace(/\/\*([^]*?)\*\//gm, "")
                .replace(/\/\/[^]*?\n/g, "")
                .trim();
            if (code.length) {
                resolve(code);
            }
            else {
                reject("File does not contain any code");
            }
        });
    });
}
exports.readCode = readCode;
//# sourceMappingURL=readCode.js.map