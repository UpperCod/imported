# imported

This script allows to create index relationships, it is used by EStack to manage the dependency of printing files between documents.

## install

```
npm install @uppercod/imported
```

## example

Check test/index.test.js for the api implementation.

```js
import createImported from "@uppercod/imported";

const tree = createImported();

tree.add("a");

tree.addChild("a", "b");

tree.add("b", "c");

tree.getParents("c"); // return a
```
