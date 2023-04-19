const socket = io()

let title = document.getElementById("nombre")
let description = document.getElementById("descripcion") 
let price = document.getElementById("precio")
let id = document.getElementById("id")
let category = document.getElementById("categoria")
let stock = document.getElementById("stock")
let code = document.getElementById("codigo")
let btnadd = document.getElementById("btnadd")
let btndelete = document.getElementById("btndelete")
let products = document.getElementById("productos")

btnadd.addEventListener("submit", async (e) => {
    e.preventDefault();

   

    const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        category: category.value,
        stock: stock.value,
        code: code.value,
    }

    try{
        const response = await fetch("/realtimeproducts", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(product)
        })

        const postProductResponse = await response.json()
        

        if(!postProductResponse) return alert(postProductResponse.response)

        title.value = ""
        description.value = ""
        category.value = ""
        price.value = ""
        code.value = ""
        stock.value = ""
        

        alert("Producto añadadido correctamente")
    }catch(error){
        console.error(error)
    }

})

const createHtml = (data) => {
    return data.length
    ? data.map(product => {
        products.innerHTML += `
        <h3 ><span>Nombre: </span>${product.title}</h3>
        <h5 ><span>ID: </span>${product.id}</h5>
        <h5 ><span>Descripcion: </span>${product.description}</h5>
        <h5 ><span>Precio: </span>${product.price}</h5>
        <h5 ><span>Imagen: </span>${product.thumbnail}</h5>
        <h5 ><span>Stock: </span>${product.stock}</h5>
        <h5 ><span>Codigo: </span>${product.code}</h5>
        <h5 ><span>Categoria: </span>${product.category}</h5>
        `            
    })
    : products.innerHTML += `
        <h3 ><span>Nombre: </span>${data.title}</h3>
        <h5 ><span>ID: </span>${data.id}</h5>
        <h5 ><span>Descripcion: </span>${data.description}</h5>
        <h5 ><span>Precio: </span>${data.price}</h5>
        <h5 ><span>Imagen: </span>${data.thumbnail}</h5>
        <h5 ><span>Stock: </span>${data.stock}</h5>
        <h5 ><span>Codigo: </span>${data.code}</h5>
        <h5 ><span>Categoria: </span>${data.category}</h5>
        `       
}

socket.on("newproduct", data =>{
    products.innerHTML = ""
    createHtml(data);
})








