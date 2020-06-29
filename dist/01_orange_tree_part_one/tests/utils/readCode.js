"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function readCode(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, "utf8", function (err, text) {
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
exports.readCode = readCode;
//# sourceMappingURL=readCode.js.map