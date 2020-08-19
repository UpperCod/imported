/**
 * Create a related index tree
 * @param {string} [tree] - Index map
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
     * @returns {{children:string[],root?:boolean}}
     */
    function get(src) {
        return (tree[src] = tree[src] || { children: [] });
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
        if (!item.children.includes(childSrc) && src != childSrc) {
            item.children.push(src);
        }
    }
    /**
     * Get the root indices
     * @param {string} src - Index to consult
     * @param {string[]} [parents]
     * @return {string[]}
     */
    function getParents(src, parents = []) {
        const item = get(src);
        const addParent = (src) => !parents.includes(src) && parents.push(src);
        item.children.forEach((parentSrc) => {
            if (src != parentSrc) {
                const item = get(parentSrc);
                item.root && addParent(parentSrc);
                getParents(parentSrc, parents);
            }
        });
        return parents;
    }
    /**
     * Delete the index record and its relationships
     * @param {string} src
     */
    function remove(src) {
        for (let prop in tree) {
            tree[prop].children.splice(
                tree[prop].children.indexOf(src) >>> 0,
                1
            );
            if (!tree[prop].children.length && !tree[prop].root) {
                delete tree[prop];
            }
        }
        delete tree[src];
    }

    return {
        tree,
        has,
        get,
        add,
        addChild,
        getParents,
        remove,
    };
}
