
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
class Product{
    constructor(name,color,weight,stock,id){
        this.name = name;
        this.color = color;
        this.weight = weight;
        this.stock = stock;
    }
}

const products = new Products();

const producto1 = new Product("Playstation5", "ligthblue", "4.5kg", 300)
const producto2 = new Product("Playstation4", "black", "3.4KG",200)

products.addProduct([producto1, producto2])


//DOM

const nombre = document.getElementById("nombre")
const color = document.getElementById("color");
const peso = document.getElementById("peso")
const stock = document.getElementById("stock")

const btnSubmit = document.getElementById("submit")

const list = document.getElementById("list")

function update() {
    list.innerHTML = ""
    products.arrProducts.forEach(x =>{
        const li = document.createElement("li")
        li.innerHTML = `nombre: ${x.name}, color: ${x.color}, peso: ${x.weight}, stock: ${x.stock}, id: ${x.id}`
        li.setAttribute("idProduct", x.id)

        const eraseBtn = document.createElement('button')
        eraseBtn.innerHTML ="Borrar"
        eraseBtn.addEventListener('click',()=>{
            products.deleteProduct(li.getAttribute("idProduct"))
            update()
        })
        li.appendChild(eraseBtn)
        list.appendChild(li)
    })
}
update()

btnSubmit.addEventListener('click', function(e){
    e.preventDefault()
    const productDom = new Product(nombre.value, color.value, peso.value,stock.value)
    nombre.value = ""; color.value = ""; stock.value ="", peso.value = "";
    products.addProduct(productDom)
    update()
})
