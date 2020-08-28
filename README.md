# imported

This script allows to create dependency relationships between indexes, this relationship can be referential to a shared dependency or deep nesting, it can be used to manage files.

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

## tree object

The tree object shows the import relationship between the nodes, the nodes are not required to have a direct relationship, but can be a reference to a deeper import.

## tree functions

### tree.add

Declare an index as root, a dependency as root can only be removed directly by tree.remove.

### tree.addChild

Create a relationship between indices, this relationship allows to guarantee a joint elimination.

### tree.get

Gets or creates a record index.

### tree.has

Check if the index exists.

### tree.getRoots

Get the root indices of an index.

### tree.remove

Delete an index and all its relations except those declared as root.

### tree.graph

Gets the indexes on a descending object related to the index.
