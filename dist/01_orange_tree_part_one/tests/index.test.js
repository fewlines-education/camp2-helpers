"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const readCode_1 = require("./utils/readCode");
const index_1 = require("../src/index");
const astNodeParser_1 = require("./utils/astNodeParser");
const index_2 = require("../../index");
describe("Tree class", () => {
    let treeClassNode;
    beforeAll(async (done) => {
        const studentCode = await readCode_1.readCode(path.resolve(__dirname, "../src/index.ts"));
        treeClassNode = astNodeParser_1.findNode(studentCode, "Tree");
        done();
    });
    class TestTree extends index_1.Tree {
        isAlive() {
            const randomNumber = Math.round(Math.random() * 50);
            return randomNumber < this.age - 50 + 1 ? false : true;
        }
        ageOneYear() {
            this.age += 1;
            if (this.age <= 9) {
                this.height += 25;
            }
            else if (this.age >= 10 && this.age <= 20) {
                this.height += 10;
            }
            this.alive = this.isAlive();
        }
    }
    const tree = new TestTree(1);
    it("should be a class", () => {
        expect.assertions(2);
        expect(treeClassNode.type).toBe(astNodeParser_1.NODE_TYPE.CLASS_DECLARATION);
        index_2.expectMessage(tree instanceof index_1.Tree, "It should be false").toBe(false);
    });
    it("should be abstract", () => {
        expect.assertions(1);
        index_2.expectMessage(treeClassNode.abstract, "Hello poipoipoi", {
            bg: "red",
            effect: "bright",
        }).toBe(false);
    });
    describe("class constructor:", () => {
        let constructorNode;
        beforeAll(() => {
            constructorNode = astNodeParser_1.findNode(treeClassNode, "constructor");
        });
        test("Tree should have a constructor", () => {
            expect.assertions(2);
            expect(constructorNode).not.toBe(undefined);
            expect(constructorNode.kind).toBe(astNodeParser_1.NODE_KIND.CONSTRUCTOR);
        });
        it("should initialize age", () => {
            expect.assertions(1);
            const firstParameter = constructorNode.params[0].name;
            expect(firstParameter).toBe("age");
        });
        describe("height computation:", () => {
            it("should have a height of 0 if initialized at 0 years old", () => {
                expect.assertions(1);
                const tree = new TestTree(0);
                expect(tree.height).toEqual(0);
            });
            it("should grow 25 centimeters per year, from 1 to 9 years old (included)", () => {
                expect.assertions(9);
                for (let age = 1; age < 10; age++) {
                    const tree = new TestTree(age);
                    expect(tree.height).toEqual(age * 25);
                }
            });
            it("should grow 10 centimeters per year, from 10 to 20 years old (included)", () => {
                expect.assertions(11);
                let index = 1;
                for (let age = 10; age <= 20; age++) {
                    const tree = new TestTree(age);
                    expect(tree.height).toEqual(225 + index * 10);
                    index++;
                }
            });
            it("should stop growing after 20 years old", () => {
                expect.assertions(80);
                const tree = new TestTree(20);
                for (let age = 20; age < 100; age++) {
                    const previousHeight = tree.height;
                    tree.ageOneYear();
                    expect(tree.height).toEqual(previousHeight);
                }
            });
        });
    });
    describe("class properties:", () => {
        const testTree = new TestTree(19);
        it("should have a property called age.", () => {
            expect.assertions(2);
            const ageNode = astNodeParser_1.findNode(treeClassNode, "age");
            expect(ageNode).not.toBe(undefined);
            expect(ageNode.type).toBe(astNodeParser_1.NODE_TYPE.CLASS_PROPERTY);
        });
        it("should have a property called height, that get computed based on its age", () => {
            expect.assertions(4);
            const heightNode = astNodeParser_1.findNode(treeClassNode, "height");
            expect(heightNode).not.toBe(undefined);
            expect(heightNode.type).toBe(astNodeParser_1.NODE_TYPE.CLASS_PROPERTY);
            expect(tree.height).toEqual(25);
            expect(testTree.height).toEqual(325);
        });
        it("should have a property called alive, with a default value of `true`.", () => {
            expect.assertions(3);
            const aliveNode = astNodeParser_1.findNode(treeClassNode, "alive");
            expect(aliveNode).not.toBe(undefined);
            expect(aliveNode.type).toBe(astNodeParser_1.NODE_TYPE.CLASS_PROPERTY);
            expect(aliveNode.value.value).toBe(true);
        });
    });
    describe("class methods:", () => {
        describe("isAlive:", () => {
            let isAliveNode;
            beforeAll(() => {
                isAliveNode = astNodeParser_1.findNode(treeClassNode, "isAlive");
            });
            it("should have a method called isAlive.", () => {
                expect.assertions(2);
                expect(isAliveNode).not.toBe(undefined);
                expect(isAliveNode.kind).toBe(astNodeParser_1.NODE_KIND.METHOD);
            });
            it("should be an abstract method.", () => {
                expect.assertions(1);
                expect(isAliveNode.abstract).toBe(true);
            });
        });
        describe("ageOneYear:", () => {
            let ageOneYearNode;
            beforeAll(() => {
                ageOneYearNode = astNodeParser_1.findNode(treeClassNode, "ageOneYear");
            });
            it("should have a method called ageOneYear.", () => {
                expect.assertions(2);
                expect(ageOneYearNode).not.toBe(undefined);
                expect(ageOneYearNode.kind).toBe(astNodeParser_1.NODE_KIND.METHOD);
            });
            it("should be an abstract method.", () => {
                expect.assertions(1);
                expect(ageOneYearNode.abstract).toBe(true);
            });
        });
        describe("seed", () => {
            let seedNode;
            beforeAll(() => {
                seedNode = astNodeParser_1.findNode(treeClassNode, "seed");
            });
            it("should have a method called seed.", () => {
                expect.assertions(2);
                expect(seedNode).not.toBe(undefined);
                expect(seedNode.kind).toBe(astNodeParser_1.NODE_KIND.METHOD);
            });
            it("should not be an abstract method.", () => {
                expect.assertions(1);
                expect(seedNode.abstract).toBe(undefined);
            });
            test("the seed method should reset the tree properties.", () => {
                expect.assertions(3);
                tree.alive = false;
                tree.seed();
                expect(tree.age).toEqual(0);
                expect(tree.height).toEqual(0);
                expect(tree.alive).toEqual(true);
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map