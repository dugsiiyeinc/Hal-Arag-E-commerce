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
  

