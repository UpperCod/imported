# index-tree

This script allows to create index relationships, it is used by EStack to manage the dependency of printing files between documents.

## install

```
npm install @uppercod/index-tree
```

## example

Check test/index.test.js for the api implementation.

```js
import createTree from "@uppercod/index-tree";

const tree = createTree();

tree.add("a");

tree.addChild("a", "b");

tree.add("b", "c");

tree.getParents("c"); // return a
```
