
class Products {
    constructor(){
        this.arrProducts = []
    }
    howMany(){
        return this.arrProducts.length;
    }
    getAllProducts() {
        return this.arrProducts
    }
    addProduct(product) {
        if (Array.isArray(product)) {
            product.forEach(productItem => {
                productItem.id = this.arrProducts.length + 1
                this.arrProducts.push(productItem)
            })
            return `ID's: ${this.arrProducts.length - product.length + 1} - ${this.arrProducts.length}`
        }
        else {
            product.id = this.arrProducts.length + 1
            this.arrProducts.push(product)
            return product.id   
        }
    }
    editProduct(productId, product) {
        if(this.arrProducts[productId-1]){
            this.arrProducts[productId - 1] = product
            console.log(this.arrProducts[productId-1])
        }
    }
    deleteProduct(productId) {
        if (productId > 0) {
            this.arrProducts.splice(productId - 1, 1)
            return "deleted"
        }
    }
}

const products = new Products();


class Product{
    constructor(name,color,weight,stock,id){
        this.name = name;
        this.color = color;
        this.weight = weight;
        this.stock = stock;
    }
}





const producto1 = new Product("Playstation5", "ligthblue", "4.5kg", 300)
const producto2 = new Product("Playstation4", "ligthblue", "3.4KG",200)

console.log(products.addProduct([producto1, producto2]))