
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

fetch('https://fakestoreapi.in/api/products')
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    displayProduct(allProducts);
    populateCategories(allProducts); 
  });

const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');

let allProducts = []; 

// Filter function
function filterProducts() {
  let filtered = [...allProducts];

  // Category filter
  const selectedCategory = categoryFilter.value;
  if (selectedCategory) {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }

  // Price filter
  const selectedPrice = priceFilter.value;
  if (selectedPrice) {
    const [min, max] = selectedPrice.split('-').map(Number);
    filtered = filtered.filter(product => product.price >= min && product.price <= max);
  }

  displayProduct(filtered);

}

// Event listeners
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

// Event listeners
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

// Populate category filter haddii aysan horey kuu dhisin
function populateCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}


populateCategories(allProducts);



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

  const addToCartBtns = itemProducts.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const { id } = button.dataset;
      const onlineUser = JSON.parse(localStorage.getItem("onlineUser"));
      
      if (!onlineUser) {
        e.preventDefault();
        Swal.fire({
          icon: 'warning',
          title: 'No user is logged in!',
          text: 'Please sign up or log in first to add items to your cart!',
          confirmButtonText: 'Okay',
        })
        .then(() => {
          window.location.href = "/html/login.html"; 
        });
        return;
      }
  
      let product = filteredProducts.find((product) => product.id == id);
      addToCart(product);
      displayCartItem(product); 
      countItemInTheCart();
    });
  });
}

  itemProducts.innerHTML = newItem;
  itemProducts.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const { id } = button.dataset;
      const onlineUser = JSON.parse(localStorage.getItem("onlineUser"));
      
      if (!onlineUser) {
        e.preventDefault();
        Swal.fire({
          icon: 'warning',
          title: 'No user is logged in!',
          text: 'Please sign up or log in first to add items to your cart!',
          confirmButtonText: 'Okay',
          
        })
        .then(() => {
          window.location.href = "/html/login.html"; 
        });
        return;
      }
  
      let product = products.find((product) => product.id == id);
      addToCart(product);
      displayCartItem(product); 
      countItemInTheCart();

  
      })
    })


}

const cartBtn = document.querySelector("#cartBtn")
const cartItems = document.querySelector("#cartItems")


function addToCart(item) {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let existingToCart = carts.find((cartItem) => cartItem.id === item.id)
  if (existingToCart) {
    existingToCart.quantity += 1;
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

