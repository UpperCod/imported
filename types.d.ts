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
        graph(src: string): object;
        addChild(src: string, childSrc: string): void;
        getRoots(src: string, childSrc: string): void;
        remove(src: string): void;
    }

    export default function createTree(tree?: Tree): Context;
}
