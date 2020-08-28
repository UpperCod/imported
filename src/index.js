/**
 * Create a related index tree
 * @param {tree} [tree] - Index map
 */
export default function createTree(tree = {}) {
    /**
     *
     * @param {string} src
     * @returns {boolean}
     */
    function has(src) {
        return src in tree;
    }
    /**
     *
     * @param {string} src
     * @returns {{imported:string[],root?:boolean}}
     */
    function get(src) {
        return (tree[src] = tree[src] || { imported: [], src });
    }
    /**
     * Set the index as Root
     * @param {string} src
     */
    function add(src) {
        const item = get(src);
        item.root = true;
    }
    /**
     * Define childSrc as child of src
     * @param {string} src - Parent index
     * @param {string} childSrc - Child index
     */
    function addChild(src, childSrc) {
        const item = get(childSrc);
        if (!item.imported.includes(childSrc) && src != childSrc) {
            item.imported.push(src);
        }
    }
    /**
     * Get the root indices
     * @param {string} src - Index to consult
     * @param {string[]} [parents]
     * @return {string[]}
     */
    function getRoots(src, parents = []) {
        const item = get(src);
        const addParent = (src) => !parents.includes(src) && parents.push(src);
        if (item.root) addParent(src);
        item.imported.forEach((parentSrc) => {
            const item = get(parentSrc);
            item.root && addParent(parentSrc);
            getRoots(parentSrc, parents);
        });
        return parents;
    }
    /**
     * Delete the index record and its relationships
     * @param {string} src
     */
    function remove(src) {
        if (!tree[src]) return;
        const { imported } = tree[src];
        delete tree[src];
        imported.forEach((src) => tree[src] && !tree[src].root && remove(src));
        for (const prop in tree) {
            if (!tree[prop].root && tree[prop].imported.includes(src))
                remove(prop);
        }
    }

    function graph(src, root = {}, ref = {}) {
        for (const prop in tree) {
            if (tree[prop].imported.includes(src)) {
                root[prop] = ref[prop] || graph(prop, (ref[prop] = {}), ref);
            }
        }
        return root;
    }

    return {
        tree,
        has,
        get,
        add,
        graph,
        addChild,
        getRoots,
        remove,
    };
}

/**
 * @typedef {Object} register
 * @property {string} src
 * @property {boolean} [root]
 * @property {string[]} imported
 */

/**
 * @typedef {{[src:string]:register}} tree
 */
