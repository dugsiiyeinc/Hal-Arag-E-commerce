
const togleButton = document.querySelector(".toggle-button")
const navbar = document.querySelector(".navbar")

togleButton.addEventListener("click", function () {
  navbar.classList.toggle("active")
})

document.addEventListener("DOMContentLoaded", function () {
  FetchProduct();
  countItemInTheCart()

})
const API_URL = "https://fakestoreapi.com";

let productsGrid = document.querySelector("#productsGrid");
let categoryFilter = document.querySelector("#categoryFilter");
let curentProducts = [];
async function FetchProduct() {
  try {
    const reponse = await fetch(`${API_URL}/products`);
    let data = await reponse.json();
    renderProducts(data)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

function renderProducts(products) {
  curentProducts = products

  const newProducts = products
    .map(({ title, image, category, id, price }) => {
      return `
    <div class="product-card">
  <img src="${image}" alt="${title}" class="product-image">
  <div class="product-info">
    <h3>${title}</h3>
    <p class="product-price">$${price.toFixed(2)}</p>
    <button class="add-to-cart-btn" data-id="${id}">Add to Cart</button>
  </div>
</div>
    `
    }).join('')

  productsGrid.innerHTML = newProducts

  productsGrid.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      let product = curentProducts.find(products => products.id == id);
      console.log({ ...product, quantity: 1 })

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

        })

      })
    });
  })
}

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

function countItemInTheCart() {
  let cartCount = document.querySelector('#cartCount');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCount.textContent = cart.length;
  calculateCartItems()
}

function calculateCartItems() {
  let cartTotal = document.querySelector('#cartTotal');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  cartTotal.textContent = total.toFixed(2);
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

