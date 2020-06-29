"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tree {
    constructor(age) {
        this.alive = true;
        this.age = age;
        let height = 0;
        for (let index = 1; index <= age; index++) {
            if (this.age > 0 && index < 10) {
                height += 25;
            }
            else if (index >= 10 && this.age <= 20) {
                height += 10;
            }
        }
        this.height = height;
    }
    seed() {
        this.age = 0;
        this.height = 0;
        this.alive = true;
    }
}
exports.Tree = Tree;
//# sourceMappingURL=index.js.map