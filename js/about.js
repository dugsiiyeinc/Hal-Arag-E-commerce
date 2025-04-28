const images = [
  "/image/Brand Quality 100% Cotton Men T-shirt V-neck Fashion Design Slim Fit Soild T-shirts Male Tops Tees Short Sleeve T Shirt For Men v1 - F038-O-ArmyGreen _ CN Size S 50-55kg.jpg",
  "/image/Women's & Men's Clothing, Shop Online Fashion.jpg",
  "/image/Zeus - polohemd mit tigerdruck - Zebra _ 3XL.jpg",
  "/image/Retro vintage denim shirt - Blue Gray _ M.jpg",
  "/image/Women's Ivory Sneakers _ Womens Vergas Shoes _ Kizik.jpg",
  "/image/Harber London _ Luxury leather goods_ Wallets, Covers & Bags.jpg",
  "/image/29d3f6db-0b8e-4755-a175-6162735680ff.jpg",
  "/image/Premium by Jack & Jones casual formel.jpg",
  "/image/pngtree-digital-retailing-illustration-laptop-keyboard-with-shopping-basket-and-e-commerce-image_3903657.jpg",
  "/image/Homme Tenant Une Veste Grise Sur Cintre, à La Recherche, En Choisissant_ _ Photo Gratuite.jpg"
];


// Function to switch images
const imageElements = document.querySelectorAll('.image-item');
let imageIndex = 0;

// Function to set images
function setImages() {
  for (let i = 0; i < imageElements.length; i++) {
    const img = images[(imageIndex + i) % images.length];
    imageElements[i].style.backgroundImage = `url('${img}')`;
  }
  imageIndex = (imageIndex + 1) % images.length;
}

// Start showing images
setImages();
setInterval(setImages, 2000); // Change every 3 seconds






const faqs = [
    {
      question: "What products does HalArag offer?",
      answer:
        "HalArag offers a wide range of products, including clothing, electronics, accessories, and home essentials. We aim to bring you the best quality at affordable prices.",
    },
    {
      question: "How can I place an order on HalArag?",
      answer:
        "Simply browse our website, add your favorite items to the cart, and proceed to checkout. We support secure and fast payment methods for a smooth shopping experience.",
    },
    {
      question: "Does HalArag provide international shipping?",
      answer:
        "Currently, we ship only within the country. However, we are working to offer international shipping very soon. Stay tuned!",
    },
    {
      question: "Can I return or exchange an item bought from HalArag?",
      answer:
        "Yes, you can return or exchange items within 14 days after receiving your order. Please ensure the products are unused and in their original packaging.",
    },
  ];
  
  const accordion = document.querySelector(".accordion");
  
  faqs.forEach((faq) => {
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");
  
    accordionItem.innerHTML = `
        <h3 class="accordion-question">${faq.question}</h3>
        <div class="accordion-content">
          <p>${faq.answer}</p>
        </div>
      `;
  
    const accordionQuestion = accordionItem.querySelector(".accordion-question");
  
    accordionQuestion.addEventListener("click", () => {
      accordionItem.classList.toggle('active');
    });
  
    accordion.appendChild(accordionItem);
  });
  

