import { describe, it, expect, mock } from 'bun:test';

import { type Comparator } from 'src/common';
import { SearchTree, TreeNode } from '.';

describe('SearchTree', () => {
    describe('insert', () => {
        it('should insert a node into an empty tree', () => {
            const tree = new SearchTree();
            const node = new TreeNode(10);

            tree.insert(node);

            expect(tree.root).toBe(node);
            expect(tree.root?.parent).toBeNull();
        });

        it('should insert nodes in the correct order', () => {
            const tree = new SearchTree();
            const node1 = new TreeNode(10);
            const node2 = new TreeNode(5);
            const node3 = new TreeNode(15);

            tree.insert(node1).insert(node2).insert(node3);

            expect(tree.root).toBe(node1);
            expect(tree.root?.left).toBe(node2);
            expect(tree.root?.right).toBe(node3);
            expect(node2.parent).toBe(node1);
            expect(node3.parent).toBe(node1);
        });

        it('should handle inserting duplicate values', () => {
            const tree = new SearchTree();
            const node1 = new TreeNode(10);
            const node2 = new TreeNode(10);

            tree.insert(node1).insert(node2);

            expect(tree.root).toBe(node1);
            expect(tree.root?.right).toBe(node2);
            expect(node2.parent).toBe(node1);
        });
    });

    describe('traverseRecursive', () => {
        it('should traverse an empty tree without calling the callback', () => {
            const tree = new SearchTree();
            const callback = mock();

            tree.traverseRecursive(callback);

            expect(callback).not.toHaveBeenCalled();
        });

        it('should traverse a single-node tree and call the callback once', () => {
            const node = new TreeNode(10);
            const tree = new SearchTree(node);
            const callback = mock();

            tree.traverseRecursive(callback);

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(node);
        });

        it('should traverse a multi-node tree in ascending order', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(3))
                .insert(new TreeNode(7));

            const expected = [3, 5, 7, 10, 15];
            const actual: number[] = [];
            const callback = (node: TreeNode) =>
                actual.push(node.value);

            tree.traverseRecursive(callback);

            expect(actual).toEqual(expected);
        });
    });

    describe('search', () => {
        it('should return null when searching in an empty tree', () => {
            const tree = new SearchTree();

            expect(tree.search(10)).toBeNull();
        });

        it('should find the root node when searching for its value', () => {
            const rootNode = new TreeNode(10);
            const tree = new SearchTree(rootNode);

            expect(tree.search(10)).toBe(rootNode);
        });

        it('should find a node in the left subtree', () => {
            const rootNode = new TreeNode(10);
            const leftNode = new TreeNode(5);
            const tree = new SearchTree(rootNode).insert(leftNode);

            expect(tree.search(5)).toBe(leftNode);
        });

        it('should find a node in the right subtree', () => {
            const rootNode = new TreeNode(10);
            const rightNode = new TreeNode(15);
            const tree = new SearchTree(rootNode).insert(rightNode);

            expect(tree.search(15)).toBe(rightNode);
        });

        it('should return null when searching for a non-existent value', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15));

            expect(tree.search(20)).toBeNull();
        });

        it('should find a node in a deeply nested tree', () => {
            const testNode = new TreeNode(7);
            const tree = new SearchTree(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(3))
                .insert(testNode)
                .insert(new TreeNode(20));

            expect(tree.search(7)).toBe(testNode);
        });

        it('should return null when searching for a value in a tree with only one node and the value does not match', () => {
            const tree = new SearchTree(new TreeNode(10));

            expect(tree.search(5)).toBeNull();
        });
    });

    describe('getMinimum', () => {
        it('should return minimum element in the tree', () => {
            const expectedMinimum = new TreeNode(3);
            const tree = new SearchTree(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(expectedMinimum)
                .insert(new TreeNode(7))
                .insert(new TreeNode(20));

            expect(tree.getMinimum()).toBe(expectedMinimum);
        });
    });

    describe('getMaximum', () => {
        it('should return minimum element in the tree', () => {
            const expectedMaximum = new TreeNode(35);
            const tree = new SearchTree(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(expectedMaximum)
                .insert(new TreeNode(3))
                .insert(new TreeNode(7))
                .insert(new TreeNode(20));

            expect(tree.getMaximum()).toBe(expectedMaximum);
        });
    });

    describe('getSuccessor', () => {
        it('should return successor of the given node', () => {
            const node = new TreeNode(13);
            const expectedSuccessor = new TreeNode(15);
            const tree = new SearchTree(expectedSuccessor)
                .insert(new TreeNode(6))
                .insert(new TreeNode(18))
                .insert(new TreeNode(3))
                .insert(new TreeNode(7))
                .insert(new TreeNode(17))
                .insert(new TreeNode(20))
                .insert(new TreeNode(2))
                .insert(new TreeNode(4))
                .insert(node)
                .insert(new TreeNode(9));

            expect(tree.getSuccessor(node)).toBe(expectedSuccessor);
        });
    });

    describe('getPredecessor', () => {
        it('should return successor of the given node', () => {
            const node = new TreeNode(17);
            const expectedPredecessor = new TreeNode(15);
            const tree = new SearchTree(expectedPredecessor)
                .insert(new TreeNode(6))
                .insert(new TreeNode(18))
                .insert(new TreeNode(3))
                .insert(new TreeNode(7))
                .insert(node)
                .insert(new TreeNode(20))
                .insert(new TreeNode(2))
                .insert(new TreeNode(4))
                .insert(new TreeNode(13))
                .insert(new TreeNode(9));

            expect(tree.getPredecessor(node)).toBe(expectedPredecessor);
        });
    });

    describe('deleteNode', () => {
        it('should delete a leaf node', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(3));

            const nodeToDelete = tree.search(3)!;
            tree.deleteNode(nodeToDelete);

            expect(tree.search(3)).toBeNull();
            expect(tree.search(5)?.left).toBeNull();
        });

        it('should delete a node with only a left child', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(3));

            const nodeToDelete = tree.search(5)!;
            tree.deleteNode(nodeToDelete);

            expect(tree.search(5)).toBeNull();
            expect(tree.search(10)?.left?.value).toBe(3);
            expect(tree.search(3)?.parent?.value).toBe(10);
        });

        it('should delete a node with only a right child', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(7));

            const nodeToDelete = tree.search(5)!;
            tree.deleteNode(nodeToDelete);

            expect(tree.search(5)).toBeNull();
            expect(tree.search(10)?.left?.value).toBe(7);
            expect(tree.search(7)?.parent?.value).toBe(10);
        });

        it('should delete a node with two children', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(3))
                .insert(new TreeNode(7))
                .insert(new TreeNode(12))
                .insert(new TreeNode(17));

            const nodeToDelete = tree.search(15)!;
            tree.deleteNode(nodeToDelete);

            expect(tree.search(15)).toBeNull();
            expect(tree.search(10)?.right?.value).toBe(17);
            expect(tree.search(17)?.left?.value).toBe(12);
            expect(tree.search(12)?.parent?.value).toBe(17);
        });

        it('should delete the root node', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(3))
                .insert(new TreeNode(7))
                .insert(new TreeNode(12))
                .insert(new TreeNode(17));

            const nodeToDelete = tree.search(10)!;
            tree.deleteNode(nodeToDelete);

            expect(tree.search(10)).toBeNull();
            expect(tree.root?.value).toBe(12);
            expect(tree.search(12)?.left?.value).toBe(5);
            expect(tree.search(12)?.right?.value).toBe(15);
            expect(tree.search(5)?.parent?.value).toBe(12);
            expect(tree.search(15)?.parent?.value).toBe(12);
        });

        it('should delete the root node when it has only one child', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5));

            const nodeToDelete = tree.search(10)!;
            tree.deleteNode(nodeToDelete);

            expect(tree.search(10)).toBeNull();
            expect(tree.root?.value).toBe(5);
            expect(tree.root?.parent).toBeNull();
        });

        it('should delete the root node when it is the only node in the tree', () => {
            const tree = new SearchTree().insert(
                new TreeNode(10),
            );

            const nodeToDelete = tree.search(10)!;
            tree.deleteNode(nodeToDelete);

            expect(tree.search(10)).toBeNull();
            expect(tree.root).toBeNull();
        });

        it('should handle deleting a node with a successor that has a right child', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(3))
                .insert(new TreeNode(7))
                .insert(new TreeNode(12))
                .insert(new TreeNode(17))
                .insert(new TreeNode(11))
                .insert(new TreeNode(13));

            const nodeToDelete = tree.search(15)!;
            tree.deleteNode(nodeToDelete);

            expect(tree.search(15)).toBeNull();
            expect(tree.search(10)?.right?.value).toBe(17);
            expect(tree.search(17)?.left?.value).toBe(12);
            expect(tree.search(12)?.left?.value).toBe(11);
            expect(tree.search(12)?.right?.value).toBe(13);
            expect(tree.search(11)?.parent?.value).toBe(12);
            expect(tree.search(13)?.parent?.value).toBe(12);
        });
    });

    describe('custom comparator', () => {
        it('should work with string values using a custom comparator', () => {
            const stringComparator: Comparator<string> = (a, b) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            };

            const tree = new SearchTree<string>(null, stringComparator);
            tree.insert(new TreeNode<string>('banana'))
                .insert(new TreeNode<string>('apple'))
                .insert(new TreeNode<string>('cherry'));

            expect(tree.root?.value).toBe('banana');
            expect(tree.root?.left?.value).toBe('apple');
            expect(tree.root?.right?.value).toBe('cherry');

            expect(tree.search('apple')).not.toBeNull();
            expect(tree.search('banana')).not.toBeNull();
            expect(tree.search('cherry')).not.toBeNull();
            expect(tree.search('orange')).toBeNull();
        });

        it('should work with custom object values using a custom comparator', () => {
            interface Person {
                id: number;
                name: string;
            }

            const personComparator: Comparator<Person> = (a, b) => {
                return a.id - b.id;
            };

            const person1 = { id: 10, name: 'Alice' };
            const person2 = { id: 5, name: 'Bob' };
            const person3 = { id: 15, name: 'Charlie' };

            const tree = new SearchTree<Person>(null, personComparator);
            tree.insert(new TreeNode<Person>(person1))
                .insert(new TreeNode<Person>(person2))
                .insert(new TreeNode<Person>(person3));

            expect(tree.root?.value).toBe(person1);
            expect(tree.root?.left?.value).toBe(person2);
            expect(tree.root?.right?.value).toBe(person3);

            expect(tree.search({ id: 5, name: 'Bob' })?.value.name).toBe('Bob');
            expect(tree.search({ id: 10, name: 'Alice' })?.value.name).toBe(
                'Alice',
            );
            expect(tree.search({ id: 15, name: 'Charlie' })?.value.name).toBe(
                'Charlie',
            );
            expect(tree.search({ id: 20, name: 'Dave' })).toBeNull();
        });
    });

    describe('getNodes', () => {
        it('should return empty array for empty tree', () => {
            const tree = new SearchTree();
            expect(tree.getNodes()).toEqual([]);
        });

        it('should return single node array for tree with one node', () => {
            const node = new TreeNode(10);
            const tree = new SearchTree(node);
            expect(tree.getNodes()).toEqual([node]);
        });

        it('should return nodes in sorted order for multi-node tree', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(3))
                .insert(new TreeNode(7));

            const expectedValues = [3, 5, 7, 10, 15];
            const actualNodes = tree.getNodes();

            expect(actualNodes.map(n => n.value)).toEqual(expectedValues);
        });
    });

    describe('getValues', () => {
        it('should return empty array for empty tree', () => {
            const tree = new SearchTree();
            expect(tree.getValues()).toEqual([]);
        });

        it('should return single value array for tree with one node', () => {
            const node = new TreeNode(10);
            const tree = new SearchTree(node);
            expect(tree.getValues()).toEqual([10]);
        });

        it('should return values in sorted order', () => {
            const tree = new SearchTree()
                .insert(new TreeNode(10))
                .insert(new TreeNode(5))
                .insert(new TreeNode(15))
                .insert(new TreeNode(3))
                .insert(new TreeNode(7));

            expect(tree.getValues()).toEqual([3, 5, 7, 10, 15]);
        });
    });
});
