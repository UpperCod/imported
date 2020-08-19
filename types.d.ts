interface Value {
    children: string[];
    root?: boolean;
}

interface Tree {
    [index: string]: Value;
}

interface Context {
    tree: Tree;
    get(str: string): Value;
    add(src: string): void;
    addChild(src: string, childSrc: string): void;
    getParents(src: string, childSrc: string): void;
    remove(src: string): void;
}

declare module "@uppercod/tree-index" {
    export default function createTree(tree?: Tree): Context;
}
