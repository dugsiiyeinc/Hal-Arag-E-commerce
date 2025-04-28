let listCart = [];
function checkCart() {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(carts);
    // check if cart is empty
    if (carts.length == 0) {
        let cartHTML = document.querySelector('.returnCart');
        cartHTML.innerHTML = `<div class="emptyCart">Your cart is empty</div>`;
        return;
    }
    // check if cart is not empty
    // loop through cart and get product details
    carts.forEach(product => {
        let productDetails = {
            id: product.id,
            name: product.title,
            image: product.image,
            price: product.price,
            quantity: product.quantity
        }
        listCart.push(productDetails);
    })

}
checkCart();
addCartToHTML();
function addCartToHTML() {
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if (listCart) {
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `
                    <img src="${product.image}">
                    <div class="item-Details">
                    
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">Price : $${product.price}</div>
                        <div class="quantity-price">
                        <div class="quantity">${product.quantity} : </div>
                        <div class="returnPrice">$${product.price * product.quantity}</div>
                        </div>
                    </div>
                    
                    </div>
                    `

                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}


// const thansk = document.querySelector('.thanks');
const thankYouMessage = document.querySelector('.thankYouMessage');
const checkoutLayout = document.querySelector('.checkoutLayout');


// /js/checkout.js
// /js/checkout.js
function handleCheckout() {
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const country = document.getElementById('country');
    const city = document.getElementById('city');

    let isValid = true;

    const fields = [name, phone, address, country, city];

    // Function si loo highlight-gareeyo field-ka buuxin la'
    function highlightField(field) {
        field.style.border = '2px solid red';
        field.focus();
    }

    // Function si loo reset-gareeyo field marka uu buuxiyo
    function resetFieldBorder(field) {
        field.addEventListener('input', () => {
            if (field.value.trim() !== '') {
                field.style.border = '';
            }
        });
        field.addEventListener('change', () => {
            if (field.value.trim() !== '') {
                field.style.border = '';
            }
        });
    }

    // Reset borders
    fields.forEach(field => {
        field.style.border = '';
        resetFieldBorder(field);
    });

    // Validation
    if (name.value.trim() === '') {
        highlightField(name);
        isValid = false;
        Swal.fire('Error', 'Please enter your full name!', 'error');
        return;
    }

    if (phone.value.trim() === '') {
        highlightField(phone);
        isValid = false;
        Swal.fire('Error', 'Please enter your phone number!', 'error');
        return;
    }

    if (address.value.trim() === '') {
        highlightField(address);
        isValid = false;
        Swal.fire('Error', 'Please enter your address!', 'error');
        return;
    }

    if (country.value.trim() === '') {
        highlightField(country);
        isValid = false;
        Swal.fire('Error', 'Please choose your country!', 'error');
        return;
    }

    if (city.value.trim() === '') {
        highlightField(city);
        isValid = false;
        Swal.fire('Error', 'Please choose your city!', 'error');
        return;
    }

 
    if (isValid) {
        Swal.fire({
            title: 'Success!',
            text: 'Your order has been placed successfully!',
            icon: 'success',
            confirmButtonColor: '#DD9D27', 
            confirmButtonText: 'OK'
        }).then(() => {
            showThankYouPage();
            // Clear the cart after successful checkout
            localStorage.removeItem("cart");
            checkoutLayout.style.display = "none";         
            cartItems.innerHTML = ""; 
            
         
        });
    }
}

function showThankYouPage() {
    const carts = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQuantity = 0;
    let totalPrice = 0;

    const orderItemsContainer = document.getElementById('orderItems');
    orderItemsContainer.innerHTML = ''; // Clear previous content

    // Xisaabi total quantity iyo total price
    carts.forEach(product => {
        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;

        // Create product box
        const item = document.createElement('div');
        item.classList.add('order-item');
        item.innerHTML = `
        <div class = "order-item-details">
            <img src="${product.image}" alt="${product.title}">
            <div class="details">
                <p>Quantity: ${product.quantity}</p>
                <p>Price: $${(product.price * product.quantity).toFixed(2)}</p>
            </div>
        </div>
        `;
        orderItemsContainer.appendChild(item);
    });

    // Show Thanks Page
    document.getElementById('thankyouMessage').style.display = 'block';

    // Random Order ID generator
    const orderId = Math.floor(Math.random() * 900000) + 100000;

    // Update UI
    document.getElementById('orderId').innerText = '#' + orderId;
    document.getElementById('orderTotal').innerText = '$' + totalPrice.toFixed(2);
    document.getElementById('orderQuantity').innerText = totalQuantity + ' items';

}





