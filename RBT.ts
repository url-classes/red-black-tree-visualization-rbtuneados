

export class NodeRBT {
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

export class RBTree {
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
        console.log('root');
        console.log(this.root);
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
        return node;
    }

    
    public searchPrint(dataToSearch: number): void {
        const searchResult = document.getElementById('searchResult') as HTMLElement;
        if (this.searchRecursive(dataToSearch)) {
            searchResult.innerText = `Valor encontrado: ${dataToSearch}`;
        } else {
            searchResult.innerText = 'Valor no encontrado';
        }
    }

    public toD3Format(node: NodeRBT): any {
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

    public drawTree(ctx: CanvasRenderingContext2D, node: NodeRBT, x: number, y: number, offset: number): void {
        if (node === this.root) return; // O cualquier condición que necesites para detener la recursión
    
        console.log(`Dibujando nodo: ${node.getData()} en (${x}, ${y})`); // Mensaje de depuración
    
        ctx.fillStyle = node.getColor() === "RED" ? "red" : "black";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.fillText(node.getData().toString(), x - 10, y + 5);
    
        if (node.getLeftChild() !== this.leaf) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - offset, y + 60);
            ctx.stroke();
            this.drawTree(ctx, node.getLeftChild(), x - offset, y + 60, offset / 2);
        }
    
        if (node.getRightChild() !== this.leaf) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + offset, y + 60);
            ctx.stroke();
            this.drawTree(ctx, node.getRightChild(), x + offset, y + 60, offset / 2);
        }
    }
    
    public isLeaf(node: NodeRBT): boolean {
        return node === this.leaf;
    }
    
}



const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
    console.error("No se pudo obtener el contexto del canvas.");
} else {
    // Limpia el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tree = new RBTree();
    tree.bindTraversalButtons('preOrder', 'inOrder', 'postOrder');

    tree.insert(10);
    tree.insert(20);
    tree.insert(5);

    // Verifica que el árbol tiene nodos
    const root = tree.getRoot(); // Asegúrate de que la raíz no es un nodo hoja
    console.log(root); // Muestra la raíz en la consola

    if (!tree.isLeaf(root)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas antes de dibujar
        tree.drawTree(ctx, root, canvas.width / 2, 20, 100);
    } else {
        console.log("El árbol está vacío.");
    }
}
