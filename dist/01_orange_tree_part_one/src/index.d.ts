declare abstract class Tree {
    age: number;
    height: number;
    alive: boolean;
    constructor(age: number);
    abstract isAlive(): boolean;
    abstract ageOneYear(): void;
    seed(): void;
}
export { Tree };
