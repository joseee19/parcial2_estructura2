export class Product {
    constructor(
        public code: string,
        public name: string,
        public price: number
    ) {}
}

export class NodeRBT {
    private product: Product; // Ahora almacena un objeto Product
    private father!: NodeRBT;
    private leftChild!: NodeRBT;
    private rightChild!: NodeRBT;
    private color: "RED" | "BLACK";

    constructor(product: Product, isLeaf?: boolean) {
        this.product = product;
        this.color = "RED"; // Los nuevos nodos son rojos por defecto
        if (isLeaf) {
            this.color = "BLACK"; // Nodo hoja es negro
        }
    }

    public getProduct(): Product {
        return this.product;
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

    public getColor(): "RED" | "BLACK" {
        return this.color;
    }
}



