

const itemProducts = document.querySelector(".item-products")

productCart()

async function productCart() {




    try {

        const response = await fetch("https://fakestoreapi.in/api/products")
        
            const data = await response.json();
            console.log(data.products);
            displayProduct(data.products)

        
    } catch (error) {
      console.error('Error:', error);
        
    }

}
function displayProduct(products) {
    const newItem = products.map(product => {
        return `
        <div class="item">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
        `
    }).join('')
    

    itemProducts.innerHTML = newItem


}

















