

const itemProducts = document.querySelector(".item-products")
productCart();
// countItemInTheCart();

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
    const curentProduct = products
    const newItem = products.map(({image , title, price, id }) => {
        return `
        <div class="item">
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        <p>$${price}</p>
        <button class="add-to-cart-btn" data-id="${id}">Add to Cart</button>
        </div>
        `   
    }).join('')
    
    itemProducts.innerHTML = newItem;
    
    itemProducts.querySelectorAll(".add-to-cart-btn").forEach((button)=>{
        button.addEventListener("click", ()=>{
            const {id} = button.dataset;
            let product = curentProduct.find( products => products.id === id)
            addTocart(product)
        })
    })

}

const cartBtn = document.querySelector("#cartBtn")
const cartModal = document.querySelector("#cartModal")
const closeCartModal = document.querySelector("#closeCartModal")
const cartItems =document.querySelector("#cartItems")

cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    renderCart();
  })
  
closeCartModal.addEventListener('click', () => {
    cartModal.classList.remove('active');
  })




//   function renderCart() {
//     let cart = JSON.parse(localStorage.getItem('cart'));
//     cartItems.innerHTML = cart.map((item) =>
//       `<div class="cart-item">
//         <img src="${item.image}" alt="${item.title}">
//         <div class="cart-item-details">
//           <h4>${item.title}</h4>
//           <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
//         </div>
//         <div class="cart-item-actions">
//           <button class="quantity-btn" data-id="${item.id
//       }" data-action="decrease">-</button>
//           <span>${item.quantity}</span>
//           <button class="quantity-btn" data-id="${item.id
//       }" data-action="increase">+</button>
//         </div>
//       </div>
//     `).join("");
//     cartItems.querySelectorAll(".quantity-btn").forEach((quantityBtn) => {
//       quantityBtn.addEventListener("click", () => {
//         const { id, action } = quantityBtn.dataset;
  
//         let cartItem = cart.find((crt) => crt.id == id);
  
//         if (action == "increase") {
//           cartItem.quantity += 1;
//           localStorage.setItem("cart", JSON.stringify(cart));
//         } else if (action == "decrease") {
//           cartItem.quantity -= 1;
//           if (cartItem.quantity === 0) {
//             cart = cart.filter((crt) => crt.id != id);
//           }
//           localStorage.setItem("cart", JSON.stringify(cart));
//         }
//         // countItemInTheCart()
//         renderCart();
//       });
  
//     })
  
  
//   }

  
// function addTocart(item) {
//     let carts = JSON.parse(localStorage.getItem("cart")) || [];
//     let existingTocart = carts.find((cartItem) => cartItem.id === item.id)
//     if (existingTocart) {
//       existingTocart.quantity += 1;
//     } else {
//       carts.push({ ...item, quantity: 1 });
//     }
//     localStorage.setItem("cart", JSON.stringify(carts));
//     // countItemInTheCart()
    
//   }
  
//   function countItemInTheCart() {
//     let cartCount = document.querySelector('#cartCount');
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cartCount.textContent = cart.length;
//     calculateCartItems()
//   }
  
//   function calculateCartItems() {
//     let cartTotal = document.querySelector('#cartTotal');
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//     cartTotal.textContent = total.toFixed(2);
//   }

