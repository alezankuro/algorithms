export type TreeTraverseCallback = (node: TreeNode) => void;

export class TreeNode {
    constructor(
        public value: number,
        public left: TreeNode | null = null,
        public right: TreeNode | null = null,
        public parent: TreeNode | null = null,
    ) {}
}

export class SearchTree {
    constructor(public root: TreeNode | null = null) {}

    public insert(node: TreeNode) {
        let current = this.root;
        let trailing: TreeNode | null = null;

        while (current) {
            trailing = current;

            if (current.left && node.value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (!trailing) {
            this.root = node;
        } else if (node.value < trailing.value) {
            trailing.left = node;
        } else {
            trailing.right = node;
        }

        node.parent = trailing;

        return this;
    }

    public traverseRecursive(
        callback: TreeTraverseCallback,
        node: TreeNode | null = this.root,
    ) {
        if (!node) return;

        this.traverseRecursive(callback, node.left);
        callback(node);
        this.traverseRecursive(callback, node.right);
    }

    public search(value: number, node = this.root): TreeNode | null {
        if (!node || value === node.value) return node;

        if (value < node.value) return this.search(value, node.left);

        return this.search(value, node.right);
    }

    public getMinimum(node = this.root): TreeNode | null {
        let current = node;

        while (current?.left) current = current.left;

        return current;
    }

    public getMaximum(node = this.root): TreeNode | null {
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

    private transplant(target: TreeNode, node: TreeNode | null) {
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

    public deleteNode(node: TreeNode) {
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
