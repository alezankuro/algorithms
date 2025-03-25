import { defaultComparator, type Comparator } from 'src/common';

export type TreeTraverseCallback<T> = (node: TreeNode<T>) => void;

export class TreeNode<T = number> {
    constructor(
        public value: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null,
        public parent: TreeNode<T> | null = null,
    ) {}
}

export class SearchTree<T = number> {
    constructor(
        public root: TreeNode<T> | null = null,
        private comparator: Comparator<T> = defaultComparator,
    ) {}

    public insert(node: TreeNode<T>) {
        let current = this.root;
        let trailing: TreeNode<T> | null = null;

        while (current) {
            trailing = current;

            if (
                current.left &&
                this.comparator(node.value, current.value) < 0
            ) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (!trailing) {
            this.root = node;
        } else if (this.comparator(node.value, trailing.value) < 0) {
            trailing.left = node;
        } else {
            trailing.right = node;
        }

        node.parent = trailing;

        return this;
    }

    public traverseRecursive(
        callback: TreeTraverseCallback<T>,
        node: TreeNode<T> | null = this.root,
    ) {
        if (!node) return;

        this.traverseRecursive(callback, node.left);
        callback(node);
        this.traverseRecursive(callback, node.right);
    }

    public getNodes(): TreeNode<T>[] {
        const nodes: TreeNode<T>[] = [];
        this.traverseRecursive(node => nodes.push(node));
        return nodes;
    }

    public getValues(): T[] {
        const values: T[] = [];
        this.traverseRecursive(node => values.push(node.value));
        return values;
    }

    public search(value: T, node = this.root): TreeNode<T> | null {
        if (!node || this.comparator(value, node.value) === 0) return node;

        if (this.comparator(value, node.value) < 0)
            return this.search(value, node.left);

        return this.search(value, node.right);
    }

    public getMinimum(node = this.root): TreeNode<T> | null {
        let current = node;

        while (current?.left) current = current.left;

        return current;
    }

    public getMaximum(node = this.root): TreeNode<T> | null {
        let current = node;

        while (current?.right) current = current.right;

        return current;
    }

    public getSuccessor(node = this.root) {
        if (node?.right) return this.getMinimum(node.right);

        let current = node;
        let trailing = node?.parent;

        while (trailing && current === trailing.right) {
            current = trailing;
            trailing = trailing.parent;
        }

        return trailing;
    }

    public getPredecessor(node = this.root) {
        if (node?.left) return this.getMaximum(node.left);

        let current = node;
        let trailing = node?.parent;

        while (trailing && current === trailing.left) {
            current = trailing;
            trailing = trailing.parent;
        }

        return trailing;
    }

    private transplant(target: TreeNode<T>, node: TreeNode<T> | null) {
        if (!target.parent) {
            this.root = node;
        } else if (target === target.parent.left) {
            target.parent.left = node;
        } else {
            target.parent.right = node;
        }

        if (node) {
            node.parent = target.parent;
        }
    }

    public deleteNode(node: TreeNode<T>) {
        if (!node.left) {
            this.transplant(node, node.right);
        } else if (!node.right) {
            this.transplant(node, node.left);
        } else {
            let replacement = this.getMinimum(node.right)!;

            if (replacement.parent !== node) {
                this.transplant(replacement, replacement.right);
                replacement.right = node.right;
                replacement.right.parent = replacement;
            }

            this.transplant(node, replacement);
            replacement.left = node.left;
            replacement.left.parent = replacement;
        }

        return this;
    }
}
