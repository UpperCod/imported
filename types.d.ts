interface Value {
    imported: string[];
    root?: boolean;
}

interface Tree {
    [index: string]: Value;
}

interface Context {
    tree: Tree;
    has(str: string): boolean;
    get(str: string): Value;
    add(src: string): void;
    addChild(src: string, childSrc: string): void;
    getParents(src: string, childSrc: string): void;
    remove(src: string): void;
}

declare module "@uppercod/imported" {
    export default function createTree(tree?: Tree): Context;
}
