import test from "ava";
import createTree from "../src/index";

test("Creation and association as root", async (t) => {
    const tree = createTree();

    tree.add("a");

    t.deepEqual(tree.get("a"), tree.tree["a"]);

    t.is(tree.has("a"), true);
    t.is(tree.get("a").root, true);
});

test("Creation and association as child", async (t) => {
    const tree = createTree();

    tree.add("a");

    tree.addChild("a", "b");

    t.deepEqual(tree.getRoots("b"), ["a"]);

    tree.addChild("b", "c");

    t.deepEqual(tree.getRoots("c"), ["a"]);
    t.deepEqual(tree.getRoots("a"), ["a"]);
});

test("Associative record deletion", async (t) => {
    const tree = createTree();

    tree.add("a");

    tree.addChild("a", "b");

    tree.remove("b");

    t.is(tree.tree["b"], undefined);
    t.is(tree.tree["b"], undefined);
});

test("Options", async (t) => {
    const options = {
        tree: {},
        format: (src) => "." + src,
    };

    const tree = createTree(options);

    tree.add("a");

    tree.addChild("a", "b");

    t.deepEqual(Object.keys(tree.tree), [".a", ".b"]);
});
