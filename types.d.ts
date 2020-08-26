declare module "@uppercod/imported" {
    export interface Value {
        imported: string[];
        root?: boolean;
    }

    export interface Tree {
        [index: string]: Value;
    }

    export interface Context {
        tree: Tree;
        has(str: string): boolean;
        get(str: string): Value;
        add(src: string): void;
        addChild(src: string, childSrc: string): void;
        getParents(src: string, childSrc: string): void;
        remove(src: string): void;
    }

    export default function createTree(tree?: Tree): Context;
}
