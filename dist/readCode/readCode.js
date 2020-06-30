"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function default_1(path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, "utf8", function (err, text) {
            if (err) {
                reject(err);
                return;
            }
            const studentCode = text
                .replace(/\/\*([^]*?)\*\//gm, "")
                .replace(/\/\/[^]*?\n/g, "")
                .trim();
            if (studentCode.length) {
                resolve(studentCode);
            }
            else {
                reject("File does not contain any code");
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=readCode.js.map