
const togleButton = document.querySelector(".toggle-button")
const navbar = document.querySelector(".navbar")

togleButton.addEventListener("click", function () {
  navbar.classList.toggle("active")
})
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
    console.log(data.products);
    displayProduct(data.products)

  } catch (error) {
    console.error('Error:', error);

  }
}


function displayProduct(products) {
  console.log(products);
  const curentProduct = products
  const newItem = products?.map(({ image, title, price, id }) => {
    return `
        <div class="item">
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        <p>$${price?.toFixed(2)}</p>
        <button class="add-to-cart-btn" data-id="${id}">Add to Cart</button>
        </div>
        `
  }).join('')

  itemProducts.innerHTML = newItem;

  itemProducts.querySelectorAll(".add-to-cart-btn").forEach((button) => {

    button.addEventListener("click", () => {
      const { id } = button.dataset;
      let product = curentProduct.find((products) => products.id == id)
      const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")
      addToCartBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const onlineUser = JSON.parse(localStorage.getItem("onlineUser"))
          if (!onlineUser) {
            e.preventDefault()
            alert("Fadlan marka hore iska diiwaan geli si aad wax ugu darto!")
            window.location.href = "/html/login.html"
            return
          }
          addTocart(product)
          displayCartItem(product)
          countItemInTheCart()
        })
      })
    })
  })

}

const cartBtn = document.querySelector("#cartBtn")
const cartModal = document.querySelector("#cartModal")
const closeCartModal = document.querySelector("#closeCartModal")
const cartItems = document.querySelector("#cartItems")


function addTocart(item) {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let existingTocart = carts.find((cartItem) => cartItem.id === item.id)
  if (existingTocart) {
    existingTocart.quantity += 1;
  } else {
    carts.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(carts));
  countItemInTheCart()
}


function displayCartItem(item) {

  console.log(item);
  cartItems.innerHTML +=
    `<div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <p>$${item.price} × ${item.quantity}</p>
        </div>
        <div class="cart-item-actions">
          <button class="quantity-btn" data-id="${item.id
    }" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" data-id="${item.id
    }" data-action="increase">+</button>
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
      } else if (action == "decrease") {
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
          cart = cart.filter((crt) => crt.id != id);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      countItemInTheCart()

    });

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
  cartTotal.textContent = total;
}

const welcomeUser = document.querySelector("#welcomeUser")
const authBtn = document.querySelector("#authBtn")
const logIn = document.querySelector(".login-btn")
const signInBtn = document.querySelector(".sign-in-btn")
const userImage = document.querySelector(".userImage")


const onlineUser = JSON.parse(localStorage.getItem("onlineUser"))


if (onlineUser) {
  welcomeUser.textContent = `${onlineUser.username}`
  authBtn.textContent = "Logout"

  authBtn.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
    window.location.reload() // ama u dir page login ah
  })
  logIn.style.display = "none"
  userImage.style.display = "block"
  signInBtn.style.display = "none"
  // SingUp.style.backgroundColor = "none"

} else {
  welcomeUser.textContent = ""
  authBtn.style.display = "none"
  authBtn.addEventListener("click", () => {
    window.location.href = "/html/login.html" // ama wixii login/signup page ah
  })


}

