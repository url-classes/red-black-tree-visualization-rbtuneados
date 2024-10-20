class NodeRBT {
    private data: number;
    private father!: NodeRBT; 
    private leftChild!: NodeRBT; 
    private rightChild!: NodeRBT; 
    private color: string;

    constructor(data: number, isLeaf?: boolean) {
        this.data = data;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }

    public getData(): number {
        return this.data;
    }

    public setFather(newFather: NodeRBT): void {
        this.father = newFather;
    }

    public getFather(): NodeRBT {
        return this.father;
    }

    public setLeftChild(newChild: NodeRBT): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeRBT {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeRBT): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeRBT {
        return this.rightChild;
    }

    public setNodeAsRed(): void {
        this.color = "RED";
    }

    public setNodeAsBlack(): void {
        this.color = "BLACK";
    }

    public getColor(): string {
        return this.color;
    }
}

class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;
    private traversalResult: HTMLElement;

    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
        this.traversalResult = document.getElementById('traversalResult') as HTMLElement;

    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            // si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // significa que el tío es el hijo derecho del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                // significa que el tío es el hijo izquierdo del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
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

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    private inorderTraversal(node: NodeRBT, result: number[]): void {
        if (node.getLeftChild() !== this.leaf) {
            this.inorderTraversal(node.getLeftChild(), result);
        }
        result.push(node.getData());
        if (node.getRightChild() !== this.leaf) {
            this.inorderTraversal(node.getRightChild(), result);
        }
    }

    private preorderTraversal(node: NodeRBT, result: number[]): void {
        result.push(node.getData());
        if (node.getLeftChild() !== this.leaf) {
            this.preorderTraversal(node.getLeftChild(), result);
        }
        if (node.getRightChild() !== this.leaf) {
            this.preorderTraversal(node.getRightChild(), result);
        }
    }

    private postorderTraversal(node: NodeRBT, result: number[]): void {
        if (node.getLeftChild() !== this.leaf) {
            this.postorderTraversal(node.getLeftChild(), result);
        }
        if (node.getRightChild() !== this.leaf) {
            this.postorderTraversal(node.getRightChild(), result);
        }
        result.push(node.getData());
    }

    public inorder(): void {
        console.log("Inorden recorrido");
        const result: number[] = [];
        this.inorderTraversal(this.root, result);
        this.updateTraversalResult(result);
    }

    public preorder(): void {
        console.log("Preorden recorrido");
        const result: number[] = [];
        this.preorderTraversal(this.root, result);
        this.updateTraversalResult(result);
    }

    public postorder(): void {
        console.log("Postorden recorrido");
        const result: number[] = [];
        this.postorderTraversal(this.root, result);
        this.updateTraversalResult(result);
    }

    private updateTraversalResult(result: number[]): void {
        console.log("Resultado del recorrido:", result);
        this.traversalResult.innerText = result.length ? result.join(' -> ') : 'El árbol está vacío';
    }

    public bindTraversalButtons(preOrderId: string, inOrderId: string, postOrderId: string): void {
        const preOrderButton = document.getElementById(preOrderId) as HTMLButtonElement;
        const inOrderButton = document.getElementById(inOrderId) as HTMLButtonElement;
        const postOrderButton = document.getElementById(postOrderId) as HTMLButtonElement;

        preOrderButton.addEventListener('click', () => this.preorder());
        inOrderButton.addEventListener('click', () => this.inorder());
        postOrderButton.addEventListener('click', () => this.postorder());
    }

    public insert(data: number): void {
        // Inserción normal de BST
        if (data > 0){
            let newNode: NodeRBT = new NodeRBT(data);
            let parent: NodeRBT = this.leaf;
            let current: NodeRBT = this.root;
            // Los RBT por la propiedad 5 inserta un nodo hoja a los hijos izquierdo y derecho
            newNode.setLeftChild(this.leaf);
            newNode.setRightChild(this.leaf);
            // Continua inserción normal de BST
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

            // Propiedades del RBT
            if (newNode.getFather() === this.leaf) {
                newNode.setNodeAsBlack()
                return;
            }
            if (newNode.getFather().getFather() == this.leaf)
                return;
            // corregir inserción
            this.fixInsert(newNode);
        }
    }

    public getRoot(){
        return this.root
    }

    public search(data:number){
        let encontrado:boolean = this.searchNode(this.root,data)
        if (encontrado == false){
            console.log()
        }
    }

    public searchRecursive(dataToSearch: number): boolean {
        return this.searchNode(this.root, dataToSearch);
    }
    
    private searchNode(node: NodeRBT, dataToSearch: number): boolean {
        if (node === this.leaf || node === null) {
            return false;
        }
    
        if (dataToSearch === node.getData()) {
            return true;
        } else if (dataToSearch < node.getData()) {
            return this.searchNode(node.getLeftChild(), dataToSearch);
        } else {
            return this.searchNode(node.getRightChild(), dataToSearch);
        }
    }
    
    public searchPrint(dataToSearch: number): void {
        const searchResult = document.getElementById('searchResult') as HTMLElement;
        if (this.searchRecursive(dataToSearch)) {
            searchResult.innerText = `Valor encontrado: ${dataToSearch}`;
        } else {
            searchResult.innerText = 'Valor no encontrado';
        }
    }
}




const tree = new RBTree();
tree.bindTraversalButtons('preOrder', 'inOrder', 'postOrder');

tree.insert(10);
tree.insert(20);
tree.insert(5);

