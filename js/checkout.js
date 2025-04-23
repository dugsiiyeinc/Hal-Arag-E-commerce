let listCart = [];
function checkCart(){
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(carts);
    // check if cart is empty
    if(carts.length == 0){
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
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}