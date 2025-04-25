
const togleButton = document.querySelector(".toggle-button")
const navbar = document.querySelector(".navbar")

togleButton.addEventListener("click", function () {
  navbar.classList.toggle("active")
})
document.addEventListener("DOMContentLoaded", function () {
  productCart();
  countItemInTheCart();
  // let carts = JSON.parse(localStorage.getItem("cart")) || [];
  // carts.forEach((item) => {
  //   displayCartItem(item);
  // });
})


const itemProducts = document.querySelector(".item-products")
async function productCart() {
  try {

    const response = await fetch("https://fakestoreapi.in/api/products")

    const data = await response.json();
    console.log(data.products);
    displayProduct(data.products);

  } catch (error) {
    console.error('Error:', error);

  }
}


function applyFilters() {
  const category = document.querySelector("#categoryFilter").value;
  const priceRange = document.querySelector("#priceFilter").value;

  let filtered = currentProduct;

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  showFilteredProducts(filtered);
}


function displayProduct(products) {
  console.log(products);
  const currentProduct = products
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

  const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProducts = currentProduct.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  showFilteredProducts(filteredProducts);
});

function showFilteredProducts(filteredProducts) {
  const newItem = filteredProducts.map(({ image, title, price, id }) => {
    return `
      <div class="item">
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        <p>$${price?.toFixed(2)}</p>
        <button class="add-to-cart-btn" data-id="${id}">Add to Cart</button>
      </div>
    `;
  }).join('');
  itemProducts.innerHTML = newItem;
}

  itemProducts.innerHTML = newItem;

  itemProducts.querySelectorAll(".add-to-cart-btn").forEach((button) => {

    button.addEventListener("click", () => {
      const { id } = button.dataset;
      let product = currentProduct.find((products) => products.id == id)
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
          addToCart(product)
          displayCartItem(product)
          countItemInTheCart()
        })
      })
    })
  })

}

const cartBtn = document.querySelector("#cartBtn")
// const cartModal = document.querySelector("#cartModal")
// const closeCartModal = document.querySelector("#closeCartModal")
const cartItems = document.querySelector("#cartItems")


function addToCart(item) {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let existingToCart = carts.find((cartItem) => cartItem.id === item.id)
  if (existingToCart) {
    existingToCart.quantity += 0;
  } else {
    carts.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(carts));
  countItemInTheCart()
  
}


function countItemInTheCart() {
  let cartCount = document.querySelector('#cartCount');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cart.length)
  cartCount.textContent = cart.length;
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

