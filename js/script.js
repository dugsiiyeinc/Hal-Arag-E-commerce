
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
let currentProducts = [];
async function FetchProduct() {
  try {
    const response = await fetch(`${API_URL}/products`);
    let data = await response.json();
    renderProducts(data)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

function renderProducts(products) {
  currentProducts = products

  const newProducts = products
    .map(({ title, image,  }) => {
      return `
    <div class="product-card">
  <img src="${image}" alt="${title}" class="product-image">
  <div class="product-info">
   
  </div>
</div>
    `
    }).join('')

  productsGrid.innerHTML = newProducts

  productsGrid.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const { id } = button.dataset;
      let product = currentProducts.find(products => products.id == id);
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
          
          addToCart(product)
        })

      })
    });
  })
}

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



function scrollRightSection(sectionId){
  const productsGrid= document.getElementById(sectionId)
  productsGrid.scrollBy({left:300, behavior:"smooth"})
  
}
function scrollLeftSection(sectionId){
  const movieGrid= document.getElementById(sectionId)
  movieGrid.scrollBy({left: -300, behavior:"smooth"})

}





const testimonialsData = [
  {
    title: "What Our Happy Clients Say",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "/image/image1.jpg",
    name: "Person One",
    description: "CEO of Company"
  },
  {
    title: "Voices That Inspire Us",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
    image: "/image/image2.jpg",
    name: "Person Two",
    description: "Marketing Manager"
  },
  {
    title: "Excellent Customer Service",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
    image: "/image/image3.jpg",
    name: "Person Three",
    description: "Project Manager"
  },
  {
    title: "Highly Recommend Them",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui...",
    image: "/image/image4.jpg",
    name: "Person Four",
    description: "UX Designer"
  },
  {
    title: "Professional and Fast",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...",
    image: "/image/image5.jpg",
    name: "Person Five",
    description: "Software Engineer"
  },
  {
    title: "Truly Outstanding Work",
    text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...",
    image: "/image/image6.jpg",
    name: "Person Six",
    description: "Freelance Developer"
  }
];

// Hadana sidaan horey u samaynay baan u loop gareyneynaa:
const container = document.querySelector('.testimonials-container');

testimonialsData.forEach((testimonial) => {
  const card = document.createElement('div');
  card.className = 'item testimonial-card';
  card.innerHTML = `
    <main class="test-card-body">
      <div class="quote">
        <i class="fa fa-quote-left"></i>
        <h2>${testimonial.title}</h2>
      </div>
      <p>${testimonial.text}</p>
      <div class="ratings">
        ${'<i class="fa-solid fa-star"></i>'.repeat(5)}
      </div>
    </main>
    <div class="profile">
      <div class="profile-image">
        <img src="${testimonial.image}" alt="${testimonial.name}">
      </div>
      <div class="profile-desc">
        <span class="name">${testimonial.name}</span>
        <span class="description">${testimonial.description}</span>
      </div>
    </div>
  `;
  container.appendChild(card);
});

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items: 2, // laba card hal mar
    loop: true,
    autoplay: true,
    margin: 20,
    dots: true,
    nav: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 }
    }
  });

  // Custom Navigation
  $('.next-btn').click(function() {
    $('.owl-carousel').trigger('next.owl.carousel');
  });

  $('.prev-btn').click(function() {
    $('.owl-carousel').trigger('prev.owl.carousel');
  });
});

