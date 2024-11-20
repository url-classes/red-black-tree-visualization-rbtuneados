"use strict";

class NodeRBT {
    constructor(data, isLeaf) {
        this.data = data;
        this.color = "RED";
        if (isLeaf) this.color = "BLACK";
    }

    getData() {
        return this.data;
    }

    setFather(newFather) {
        this.father = newFather;
    }

    getFather() {
        return this.father;
    }

    setLeftChild(newChild) {
        this.leftChild = newChild;
    }

    getLeftChild() {
        return this.leftChild;
    }

    setRightChild(newChild) {
        this.rightChild = newChild;
    }

    getRightChild() {
        return this.rightChild;
    }

    setNodeAsRed() {
        this.color = "RED";
    }

    setNodeAsBlack() {
        this.color = "BLACK";
    }

    getColor() {
        return this.color;
    }
}

class RBTree {
    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
        this.traversalResult = document.getElementById('traversalResult');
    }

    fixInsert(testNode) {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                var uncle = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                var uncle = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    leftRotate(x) {
        var y = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf) y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf) this.root = y;
        else if (x === x.getFather().getLeftChild()) x.getFather().setLeftChild(y);
        else x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    rightRotate(x) {
        var y = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf) y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf) this.root = y;
        else if (x === x.getFather().getRightChild()) x.getFather().setRightChild(y);
        else x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    inorderTraversal(node, result) {
        if (node.getLeftChild() !== this.leaf) {
            this.inorderTraversal(node.getLeftChild(), result);
        }
        result.push(node.getData());
        if (node.getRightChild() !== this.leaf) {
            this.inorderTraversal(node.getRightChild(), result);
        }
    }

    preorderTraversal(node, result) {
        result.push(node.getData());
        if (node.getLeftChild() !== this.leaf) {
            this.preorderTraversal(node.getLeftChild(), result);
        }
        if (node.getRightChild() !== this.leaf) {
            this.preorderTraversal(node.getRightChild(), result);
        }
    }

    postorderTraversal(node, result) {
        if (node.getLeftChild() !== this.leaf) {
            this.postorderTraversal(node.getLeftChild(), result);
        }
        if (node.getRightChild() !== this.leaf) {
            this.postorderTraversal(node.getRightChild(), result);
        }
        result.push(node.getData());
    }

    inorder() {
        console.log("Inorden recorrido");
        var result = [];
        this.inorderTraversal(this.root, result);
        this.updateTraversalResult(result);
    }

    preorder() {
        console.log("Preorden recorrido");
        const result = [];
        if (this.root !== this.leaf) {
            this.preorderTraversal(this.root, result);
            this.updateTraversalResult(result);
        } else {
            console.log("El árbol está vacío.");
        }
    }

    preorderTraversal(node, result) {
        if (node === null || node === this.leaf) {
            return; // Detener si el nodo es nulo o hoja
        }
        result.push(node.getData());
        this.preorderTraversal(node.getLeftChild(), result);
        this.preorderTraversal(node.getRightChild(), result);
    }

    postorder() {
        console.log("Postorden recorrido");
        var result = [];
        this.postorderTraversal(this.root, result);
        this.updateTraversalResult(result);
    }

    updateTraversalResult(result) {
        console.log("Resultado del recorrido:", result);
        this.traversalResult.innerText = result.length ? result.join(' -> ') : 'El árbol está vacío';
    }

    bindTraversalButtons(preOrderId, inOrderId, postOrderId) {
        var preOrderButton = document.getElementById(preOrderId);
        var inOrderButton = document.getElementById(inOrderId);
        var postOrderButton = document.getElementById(postOrderId);
        preOrderButton.addEventListener('click', () => this.preorder());
        inOrderButton.addEventListener('click', () => this.inorder());
        postOrderButton.addEventListener('click', () => this.postorder());
    }

    

    insert(data) {
        if (data > 0) {
            var newNode = new NodeRBT(data);
            var parent = this.leaf;
            var current = this.root;

            newNode.setLeftChild(this.leaf);
            newNode.setRightChild(this.leaf);

            while (current !== this.leaf) {
                parent = current;
                if (newNode.getData() < current.getData()) {
                    current = current.getLeftChild();
                } else {
                    current = current.getRightChild();
                }
            }
            newNode.setFather(parent);
            if (parent === this.leaf) {
                this.root = newNode;
            } else if (newNode.getData() < parent.getData()) {
                parent.setLeftChild(newNode);
            } else {
                parent.setRightChild(newNode);
            }

            if (newNode.getFather() === this.leaf) {
                newNode.setNodeAsBlack();
                return;
            }
            if (newNode.getFather().getFather() == this.leaf) return;
            this.fixInsert(newNode);
        }
    }

    getRoot() {
        return this.root;
    }

    search(data) {
        var encontrado = this.searchNode(this.root, data);
        if (encontrado == false) {
            console.log();
        }
    }

    searchRecursive(dataToSearch) {
        return this.searchNode(this.root, dataToSearch);
    }


    searchPrint(dataToSearch) {
        var searchResult = document.getElementById('searchResult');
        if (this.searchRecursive(dataToSearch)) {
            searchResult.innerText = `Valor encontrado: ${dataToSearch}`;
        } else {
            searchResult.innerText = 'Valor no encontrado';
        }
    }

    toD3Format(node) {
        if (node === this.leaf) {
            return null;
        }
        return {
            name: node.getData(),
            children: [
                this.toD3Format(node.getLeftChild()),
                this.toD3Format(node.getRightChild())
            ].filter(child => child !== null)
        };
    }

    drawTree(ctx, node, x, y, offset) {
        if (node === this.leaf) return; // Detener si el nodo es una hoja
        console.log(`Dibujando nodo: ${node.getData()} en (${x}, ${y})`); // Mensaje de depuración
        ctx.fillStyle = node.getColor() === "RED" ? "red" : "black";
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.fillText(node.getData(), x - 5, y + 5);
        
        if (node.getLeftChild() !== this.leaf) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - offset, y + 50);
            ctx.stroke();
            this.drawTree(ctx, node.getLeftChild(), x - offset, y + 50, offset / 2);
        }
        
        if (node.getRightChild() !== this.leaf) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + offset, y + 50);
            ctx.stroke();
            this.drawTree(ctx, node.getRightChild(), x + offset, y + 50, offset / 2);
        }
    }

    searchNode(node, dataToSearch) {
        if (node === this.leaf || node === null) {
            return null;
        }
        if (dataToSearch === node.getData()) {
            return node;
        } else if (dataToSearch < node.getData()) {
            return this.searchNode(node.getLeftChild(), dataToSearch);
        } else {
            return this.searchNode(node.getRightChild(), dataToSearch);
        }
    }
    
    delete(data) {
        const nodeToDelete = this.searchNode(this.root, data); // Ahora devolverá el nodo o null
        if (!nodeToDelete) {
            console.log("Valor no encontrado");
            return;
        }
        this.deleteNode(nodeToDelete);    
    }

    deleteNode(node) {
        let originalColor = node.getColor();
        let replacementNode;

        if (node.getLeftChild() === this.leaf) {
            replacementNode = node.getRightChild();
            this.transplant(node, node.getRightChild());
        } else if (node.getRightChild() === this.leaf) {
            replacementNode = node.getLeftChild();
            this.transplant(node, node.getLeftChild());
        } else {
            let successor = this.minimum(node.getRightChild());
            originalColor = successor.getColor();
            replacementNode = successor.getRightChild();
            if (successor.getFather() === node) {
                replacementNode.setFather(successor);
            } else {
                this.transplant(successor, successor.getRightChild());
                successor.setRightChild(node.getRightChild());
                successor.getRightChild().setFather(successor);
            }
            this.transplant(node, successor);
            successor.setLeftChild(node.getLeftChild());
            successor.getLeftChild().setFather(successor);
            successor.color = node.getColor();
        }

        if (originalColor === "BLACK") {
            this.fixDelete(replacementNode);
        }
    }

    transplant(u, v) {
        if (u.getFather() === this.leaf) {
            this.root = v;
        } else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        } else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }

    fixDelete(node) {
        while (node !== this.root && node.getColor() === "BLACK") {
            if (node === node.getFather().getLeftChild()) {
                let sibling = node.getFather().getRightChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.leftRotate(node.getFather());
                    sibling = node.getFather().getRightChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" &&
                    sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                } else {
                    if (sibling.getRightChild().getColor() === "BLACK") {
                        sibling.getLeftChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.rightRotate(sibling);
                        sibling = node.getFather().getRightChild();
                    }
                    sibling.setColor(node.getFather().getColor());
                    node.getFather().setNodeAsBlack();
                    sibling.getRightChild().setNodeAsBlack();
                    this.leftRotate(node.getFather());
                    node = this.root;
                }
            } else {
                let sibling = node.getFather().getLeftChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.rightRotate(node.getFather());
                    sibling = node.getFather().getLeftChild();
                }
                if (sibling.getRightChild().getColor() === "BLACK" &&
                    sibling.getLeftChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                } else {
                    if (sibling.getLeftChild().getColor() === "BLACK") {
                        sibling.getRightChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.leftRotate(sibling);
                        sibling = node.getFather().getLeftChild();
                    }
                    sibling.setColor(node.getFather().getColor());
                    node.getFather().setNodeAsBlack();
                    sibling.getLeftChild().setNodeAsBlack();
                    this.rightRotate(node.getFather());
                    node = this.root;
                }
            }
        }
        node.setNodeAsBlack();
    }

    minimum(node) {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }

    
}

const rbt = new RBTree();
rbt.insert(10);
rbt.insert(5);
rbt.insert(30);
rbt.insert(7);
rbt.insert(40);
rbt.insert(25);
rbt.insert(8);
//rbt.delete(5)

 

document.addEventListener("DOMContentLoaded", function () {
    rbt.bindTraversalButtons('preOrder', 'inOrder', 'postOrder');

    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');

    // Dibuja el árbol una vez que se haya insertado algún nodo
    rbt.drawTree(ctx, rbt.getRoot(), canvas.width / 2, 50, 100);
});

function clearCanvas() {
    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('insertNode').addEventListener('click', () => {
    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');
    const data = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(data)) { // Verifica si el valor ingresado es un número
        clearCanvas();
        rbt.insert(data);  // Inserta el nodo en el árbol
          // Limpia el canvas antes de redibujar
        rbt.drawTree(ctx, rbt.getRoot(), canvas.width / 2, 50, 100);  // Redibuja el árbol en el canvas
    } else {
        alert("Por favor, ingresa un valor numérico válido.");
    }
});

document.getElementById('deleteNode').addEventListener('click', () => {
    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');
    const data = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(data)) { // Verifica si el valor ingresado es un número
        rbt.delete(data);  
        clearCanvas();  // Limpia el canvas antes de redibujar
        rbt.drawTree(ctx, rbt.getRoot(), canvas.width / 2, 50, 100);  // Redibuja el árbol en el canvas
    } else {
        alert("Por favor, ingresa un valor numérico válido.");
    }
});
