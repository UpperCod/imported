/**
 * Create a related index tree
 * @param {{tree?:tree,format?:(src:string)=>string}} [options] - Index map
 */
export default function createTree({ tree = {}, format } = {}) {
    const formatted = {};
    /**
     * normalize the src, to point correctly to the store
     * @param {string} src
     */
    function id(src) {
        formatted[src] = formatted[src] || (format ? format(src) : src);
        return formatted[src];
    }
    /**
     *
     * @param {string} src
     * @returns {boolean}
     */
    function has(src) {
        return id(src) in tree;
    }
    /**
     *
     * @param {string} src
     * @returns {{imported:string[],root?:boolean,src:string}}
     */
    function get(src) {
        src = id(src);
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
        const { imported, src: _src } = get(childSrc);
        if (!imported.includes(_src) && src != _src) {
            imported.push(src);
        }
    }
    /**
     * Get the root indices
     * @param {string} src - Index to consult
     * @param {string[]} [parents]
     * @return {string[]}
     */
    function getRoots(src, parents = []) {
        const { root, imported, src: _src } = get(src);
        const addParent = (src) => !parents.includes(src) && parents.push(src);
        if (root) addParent(_src);
        imported.forEach((parentSrc) => {
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
        src = id(src);
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
        src = id(src);
        for (const prop in tree) {
            if (tree[prop].imported.includes(src)) {
                root[prop] = ref[prop] || graph(prop, (ref[prop] = {}), ref);
            }
        }
        return root;
    }

    function merge({ tree: _tree }) {
        if (tree == _tree) return;
        for (let prop in _tree) {
            const imported = (tree[prop] && tree[prop].imported) || [];
            tree[prop] = {
                ...tree[prop],
                ..._tree[prop],
                imported: [
                    ...imported,
                    ..._tree[prop].imported.filter(
                        (value) => !imported.includes(value)
                    ),
                ],
            };
        }
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
        merge,
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
