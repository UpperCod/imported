import test from "ava";
import createTree from "../esm";

test("Creation and association as root", async (t) => {
    const tree = createTree();

    tree.add("a");

    t.deepEqual(tree.get("a"), tree.tree["a"]);

    t.is(tree.get("a").root, true);
});

test("Creation and association as child", async (t) => {
    const tree = createTree();

    tree.add("a");

    tree.addChild("a", "b");

    t.deepEqual(tree.getParents("b"), ["a"]);

    tree.addChild("b", "c");

    t.deepEqual(tree.getParents("c"), ["a"]);
});

test("Associative record deletion", async (t) => {
    const tree = createTree();

    tree.add("a");

    tree.addChild("a", "b");

    tree.remove("b");

    t.is(tree.tree["b"], undefined);
    t.is(tree.tree["b"], undefined);
});
