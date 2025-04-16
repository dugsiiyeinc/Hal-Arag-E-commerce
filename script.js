
const togleButton=document.querySelector(".toggle-button")
const navbar=document.querySelector(".navbar")

togleButton.addEventListener("click" , function(){
    navbar.classList.toggle("active")
})


const productsGrid = document.querySelectorAll(".products-grid");

fechtPoduct()

async function fechtPoduct(){
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data);
        displayProduct(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayProduct(products){
    const newProduct = products.map(product =>{
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                <h3>${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button  class="add-to-cart-btn" data-id=" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    }
    ).join('');
    
    productsGrid.forEach(grid => grid.innerHTML = newProduct);
}

