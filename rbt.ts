import { Product } from "./node_rbt"; // Asegúrate de que la ruta sea correcta
import { NodeRBT } from "./node_rbt"; // Asegúrate de que la ruta sea correcta

class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(new Product("", "", 0), true);
        this.root = this.leaf;
    }

    private fixInsert(newNode: NodeRBT): void {
        while (newNode !== this.root && newNode.getFather().getColor() === "RED") {
            if (newNode.getFather() === newNode.getFather().getFather().getLeftChild()) {
                const uncle = newNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    newNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    newNode.getFather().getFather().setNodeAsRed();
                    newNode = newNode.getFather().getFather();
                } else {
                    if (newNode === newNode.getFather().getRightChild()) {
                        newNode = newNode.getFather();
                        this.leftRotate(newNode);
                    }
                    newNode.getFather().setNodeAsBlack();
                    newNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(newNode.getFather().getFather());
                }
            } else {
                const uncle = newNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    newNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    newNode.getFather().getFather().setNodeAsRed();
                    newNode = newNode.getFather().getFather();
                } else {
                    if (newNode === newNode.getFather().getLeftChild()) {
                        newNode = newNode.getFather();
                        this.rightRotate(newNode);
                    }
                    newNode.getFather().setNodeAsBlack();
                    newNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(newNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        const y = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() !== this.leaf) y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather().getLeftChild()) {
            x.getFather().setLeftChild(y);
        } else {
            x.getFather().setRightChild(y);
        }
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(y: NodeRBT): void {
        const x = y.getLeftChild();
        y.setLeftChild(x.getRightChild());
        if (x.getRightChild() !== this.leaf) x.getRightChild().setFather(y);
        x.setFather(y.getFather());
        if (y.getFather() === this.leaf) {
            this.root = x;
        } else if (y === y.getFather().getRightChild()) {
            y.getFather().setRightChild(x);
        } else {
            y.getFather().setLeftChild(x);
        }
        x.setRightChild(y);
        y.setFather(x);
    }

    public insert(product: Product): void {
        const newNode = new NodeRBT(product);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;

        while (current !== this.leaf) {
            parent = current;
            if (newNode.getProduct().price < current.getProduct().price) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getProduct().price < parent.getProduct().price) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        this.fixInsert(newNode);
    }

    public findMin(node: NodeRBT): NodeRBT | null {
        while (node && node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }

    public findMax(node: NodeRBT): NodeRBT | null {
        while (node && node.getRightChild() !== this.leaf) {
            node = node.getRightChild();
        }
        return node;
    }

    public findMinPrice(): Product | null {
        const minNode = this.findMin(this.root);
        return minNode ? minNode.getProduct() : null;
    }

    public findMaxPrice(): Product | null {
        const maxNode = this.findMax(this.root);
        return maxNode ? maxNode.getProduct() : null;
    }

    public findInRange(minPrice: number, maxPrice: number): Product[] {
        const result: Product[] = [];
        this.rangeHelper(this.root, minPrice, maxPrice, result);
        return result;
    }

    private rangeHelper(node: NodeRBT, minPrice: number, maxPrice: number, result: Product[]): void {
        if (!node || node === this.leaf) return;

        if (node.getProduct().price > minPrice) {
            this.rangeHelper(node.getLeftChild(), minPrice, maxPrice, result);
        }
        if (node.getProduct().price >= minPrice && node.getProduct().price <= maxPrice) {
            result.push(node.getProduct());
        }
        if (node.getProduct().price < maxPrice) {
            this.rangeHelper(node.getRightChild(), minPrice, maxPrice, result);
        }
    }

    public printAll(): void {
        this.inOrder(this.root);
    }

    private inOrder(node: NodeRBT): void {
        if (node && node !== this.leaf) {
            this.inOrder(node.getLeftChild());
            console.log(`${node.getProduct().name}: $${node.getProduct().price} (${node.getColor()})`);
            this.inOrder(node.getRightChild());
        }
    }
}

// Ejemplo de uso
const priceManager = new RBTree();

// Insertar productos
priceManager.insert(new Product("001", "Laptop", 50));
priceManager.insert(new Product("002", "Pantalla LED", 30));
priceManager.insert(new Product("003", "Coca-Cola", 3));
priceManager.insert(new Product("006", "araña", 3));

// Consultas de precio
console.log("Producto con el precio más bajo:", priceManager.findMinPrice());
console.log("Producto con el precio más alto:", priceManager.findMaxPrice());
console.log("Productos en el rango de 30 a 60:", priceManager.findInRange(30, 60));

// Imprimir todos los productos
console.log("Todos los productos:");
priceManager.printAll();



