
document.addEventListener("DOMContentLoaded", function () {
  productCart();
  countItemInTheCart();
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  carts.forEach((item) => {
    displayCartItem(item);
  });


})
const itemProducts = document.querySelector(".item-products")

async function productCart() {
  try {

    const response = await fetch("https://fakestoreapi.in/api/products")

    const data = await response.json();
    // console.log(data.products);
    displayProduct(data.products)

  } catch (error) {
    console.error('Error:', error);

  }
}


function displayProduct(products) {
  // console.log(products);

  const newItem = products?.map(({ image, title, price, id }) => {
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

  itemProducts.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      let product = products.find((products) => products.id == id)
      console.log(product)
      addToCart(product)
      displayCartItem(product)
      countItemInTheCart()
    })
  })

}

const cartBtn = document.querySelector("#cartBtn")
const cartModal = document.querySelector("#cartModal")
const closeCartModal = document.querySelector("#closeCartModal")
const cartItems = document.querySelector("#cartItems")
const cartEmpty = document.querySelector(".cart-empty")
// console.log(cartItems)

function displayCartItem(item) {
  cartEmpty.style.display = "none"

  let cart = JSON.parse(localStorage.getItem('cart'));
  // console.log(item);
  cartItems.innerHTML +=
    `<div class="cart-item container">
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
        <div class="cart-item-actions">
        <button class="quantity-btn" data-id="${item.id
    }" data-action="decrease">-</button>
        <span class="quantity" >${item.quantity}</span>
        <button class="quantity-btn" data-id="${item.id
    }" data-action="increase">+</button>
      </div>
      </div> 
    </div>
  `

  cartItems.querySelectorAll(".quantity-btn").forEach((quantityBtn) => {
    quantityBtn.addEventListener("click", () => {
      const { id, action } = quantityBtn.dataset;
      console.log(id, action)
      let cartItem = cart.find((crt) => crt.id == id);

      if (action == "increase") {
        cartItem.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        countItemInTheCart()
        // location.reload()
      }
      else if (action == "decrease") {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
          cart = cart.filter((crt) => crt.id != id);
          cartEmpty.style.display = "flex"
          cartTotal.style.display = "none"
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        countItemInTheCart()
        // location.reload()
      }

      cartItems.innerHTML = ""
      cart.forEach((item) => {
        displayCartItem(item)
      })

    })

    // displayCartItem(cartItem)
    const cartTotal = document.querySelector(".cart-total")
    cartTotal.style.display = "flex"


  })

}

function countItemInTheCart() {
  let cartCount = document.querySelector('#cartCount');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cart.length)
  cartCount.textContent = cart.length;
  calculateCartItems()
}

function calculateCartItems() {
  let cartTotal = document.querySelector('#cartTotal');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  cartTotal.textContent = total.toFixed(2);
}
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "block"
  cartItems.innerHTML = ""
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  carts.forEach((item) => {
    displayCartItem(item)
  })
})

const checkoutBtn = document.querySelector("#checkoutBtn")


function handleCheckout() {
  Swal.fire({
    icon: 'success',
    title: 'Congratulations!',
    text: 'You have successfully purchased all your items.',
    confirmButtonText: 'OK',
    confirmButtonColor: '#F59E0B', // Midab huruud ah sida sawirkaaga

  }).then(() => {
    localStorage.removeItem("cart")
    cartItems.innerHTML = ""
    cartEmpty.style.display = "flex"
    cartTotal.style.display = "none"
    countItemInTheCart()
  });
}



