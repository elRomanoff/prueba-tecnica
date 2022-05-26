
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
    getProductById(id){
        return this.arrProducts[id-1]
    }
    addProduct(product) {
        if (Array.isArray(product)) {
            product.forEach(productItem => {    
                if (this.arrProducts[this.arrProducts.length - 1]) productItem.id = parseInt(this.arrProducts[this.arrProducts.length - 1].id) + 1
                else productItem.id = 1
                this.arrProducts.push(productItem)
            })
            return `ID's: ${this.arrProducts.length - product.length + 1} - ${this.arrProducts.length}`
        }
        else {
            if (this.arrProducts[this.arrProducts.length - 1]) product.id = parseInt(this.arrProducts[this.arrProducts.length - 1].id) + 1
            else product.id = 1
            this.arrProducts.push(product)
            return product.id   
        }
    }
    editProduct(productId, product) {

        let productToEdit = this.arrProducts.findIndex(x => x.id == productId)

        if(productToEdit >= 0){
            console.log(productToEdit)
            this.arrProducts[productToEdit] = product
        }
    }
    deleteProduct(productId) {
        if (productId > 0) {
            let productToDelete = this.arrProducts.findIndex(x => x.id == productId)

            this.arrProducts.splice(productToDelete, 1)
            return "deleted"
        }
    }
}
class Product{
    constructor(name,color,weight,stock){
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

        const editBtn = document.createElement("button")
        editBtn.innerHTML = "Editar"
        editBtn.addEventListener("click", ()=>{
            li.innerHTML="";
            
            const fragment = document.createDocumentFragment()
            const auxInputName = document.createElement("input");
            const auxInputColor = document.createElement("input");
            const auxInputWeight = document.createElement("input");
            const auxInputStock = document.createElement("input");
            const auxBtnSubmit = document.createElement("button")

            let productToUpdate = products.getProductById(li.getAttribute("idProduct"));

            auxInputName.value = productToUpdate.name
            auxInputColor.value = productToUpdate.color
            auxInputWeight.value = productToUpdate.weight
            auxInputStock.value = productToUpdate.stock
            
            auxBtnSubmit.innerHTML = "Editar"

            fragment.appendChild(auxInputName)
            fragment.appendChild(auxInputColor)
            fragment.appendChild(auxInputWeight)
            fragment.appendChild(auxInputStock)
            fragment.appendChild(auxBtnSubmit)
            
            auxBtnSubmit.addEventListener('click', function(){
                const auxProduct = new Product(auxInputName.value, auxInputColor.value, auxInputWeight.value, auxInputStock.value)
                auxProduct.id = li.getAttribute("idProduct")
                products.editProduct(auxProduct.id, auxProduct)
                update()
            })

            li.appendChild(fragment)
        })

        
        li.appendChild(eraseBtn)
        li.appendChild(editBtn)
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
