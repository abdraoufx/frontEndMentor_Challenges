"use strict";

const hamburger = document.getElementById("hamburger"), // Hamburger Icon
  mobMenu = document.getElementById("mobile-nav"), // Mobile Menu
  closeMobMenu = document.getElementById("closeMenu"), // Close Mobile Menu Icon
  shopCartImg = document.getElementById("cart-img"), // Cart Image Icon.
  cartMainBox = document.getElementById("the-cart"), // The Cart Container
  addToCartBtn = document.getElementById("add-to-cart"), // Add To Cart Button
  quantityToAdd = document.getElementById("q-value"), // quantityToAdd Choosed To Add To The Cart
  nextBtn = document.querySelector(".photos-section .switch-btns .next-btn"), // switch Next Button
  prevBtn = document.querySelector(".photos-section .switch-btns .prev-btn"), // switch Previous Button
  cartTopNumber = document.getElementById("cart-length"),
  product = {
    price: 125,
    quantityChoosed: 0,
    image: document
      .querySelector(".photos-section .products .show")
      .cloneNode()
      .getAttribute("src"),
    prodName: document.getElementById("product-name").textContent.trim(),
    deleteImg: "images/icon-delete.svg",
  };

// Mobile Menu Toggle Classes
hamburger.onclick = () => mobMenu.classList.add("visible");
closeMobMenu.onclick = () => mobMenu.classList.remove("visible");

// Show Cart And Its Functions
shopCartImg.onclick = () => cartMainBox.classList.toggle("show-cart");

renderFromLocal();

if (cartMainBox.childElementCount <= 1) {
  delCartItem();
}

updQuantityValue();

addToCartBtn.onclick = () => {
  checkCart();
  quantityToAdd.textContent = "0";
};

// Slider And Its Functions
desktopSlider();

// Next, Prev Btns
if (nextBtn != null) {
  const imgesParent = document.querySelector(".photos-section > .products"),
    showedImg = imgesParent.querySelector(".show");

  checkBtns(imgesParent, showedImg, nextBtn, prevBtn);

  prevBtn.onclick = () => {
    showPrevImg(imgesParent, prevBtn, nextBtn);
  };
  nextBtn.onclick = () => {
    showNextImg(imgesParent, prevBtn, nextBtn);
  };
}

// LightBox Section And Its Functions:
const showedProdImg = document.querySelector(".photos-section .products .show"),
  lightBoxSection = document.querySelector(".lightbox"),
  lgBoxImgesContainer = document.querySelector(".lightbox .products"),
  closeLightBox = document.querySelector(".lightbox .close-icon"),
  lgNextBtn = document.querySelector(".lightbox .next-btn"),
  lgPrevBtn = document.querySelector(".lightbox .prev-btn");

showedProdImg.onclick = () => lightBoxSection.classList.add("show-lg");
closeLightBox.onclick = () => lightBoxSection.classList.remove("show-lg");

checkBtns(
  lgBoxImgesContainer,
  document.querySelector(".lightbox .show"),
  lgNextBtn,
  lgPrevBtn
);

lgPrevBtn.onclick = () =>
  showPrevImg(
    lgBoxImgesContainer,
    lgPrevBtn,
    lgNextBtn,
    document.querySelector(".lightbox .product.show"),
    document.querySelector(".lightbox .image-container.active")
  );
lgNextBtn.onclick = () =>
  showNextImg(
    lgBoxImgesContainer,
    lgPrevBtn,
    lgNextBtn,
    document.querySelector(".lightbox .product.show"),
    document.querySelector(".lightbox .image-container.active")
  );

// Functions:

// Update quantityToAdd Value Function:
function updQuantityValue() {
  const decreaseBtn = document.getElementById("decrease-q"),
    increaseBtn = document.getElementById("increase-q");

  decreaseBtn.onclick = (e) => {
    if (quantityToAdd.textContent == 0) {
      e.preventDefault();
    } else {
      quantityToAdd.textContent--;
      product.quantityChoosed = parseInt(quantityToAdd.textContent);
    }
  };

  increaseBtn.onclick = () => {
    quantityToAdd.textContent++;
    product.quantityChoosed = parseInt(quantityToAdd.textContent);
  };
}
// Check If The Cart Is Empty Function:
function checkCart() {
  const cartBody = document.querySelector("#the-cart .cart-content__body"),
    emptyNote = document.querySelector(".cart-content .empty-note");

  if (cartMainBox.contains(emptyNote)) {
    cartMainBox.classList.remove("empty");
    cartMainBox.removeChild(emptyNote);
    appendElementsToCart();
  } else if (cartMainBox.contains(cartBody)) {
    const currentQuantity = cartBody.querySelector(
        ".prod-info__quantity"
      ).lastElementChild,
      finalPrice = cartBody.querySelector(".prod-info__final-price");

    if (quantityToAdd.textContent == "0" || quantityToAdd.textContent == "1") {
      currentQuantity.textContent = `${
        parseInt(currentQuantity.textContent) + 1
      }`;
      updateQnAndCart(parseInt(currentQuantity.textContent));
      finalPrice.textContent = calcFnlPrice();
    } else {
      currentQuantity.textContent = `${
        parseInt(currentQuantity.textContent) +
        parseInt(quantityToAdd.textContent)
      }`;
      updateQnAndCart(parseInt(currentQuantity.textContent));
      finalPrice.textContent = calcFnlPrice();
    }
  } else {
    appendElementsToCart();
  }

  addToLocal(
    withoutDollor(
      document.querySelector(
        "#the-cart .cart-content__body .prod-info__final-price"
      )
    )
  );

  const delIcon = document.getElementById("del-prod");
  delIcon.onclick = () => {
    delCartItem(delIcon);
  };
}
// Create Cart All Needed Elements Function:
function appendElementsToCart(productFromLocal) {
  const body = createElement("div", { class: "cart-content__body" }), // Cart Body
    upperSection = createElement("div", { class: "upper-section" }), // Upper Section
    productImg = createElement("img", {
      class: "prod-img",
      src: product.image,
      alt: "Product Image",
    }), // Product Image
    prodInfoParent = createElement("div", { class: "prod-info" }), // Product Info Parent Element
    productName = createElement(
      // Product Name Element.
      "span",
      { class: "prod-info__name" },
      product.prodName
    ),
    // Product Price Element.
    productPrice = createElement(
      "span",
      { class: "prod-info__sin-price" },
      `$${product.price}.00`
    ),
    addQuantity = createElement("span", { class: "prod-info__quantity" }), // Quantity In Cart Parent Element
    quanFrsSpan = createElement("span", "", "x"), // Span That Have the Value x
    quanScndSpan = createElement("span"), // All Cart Quantity Element
    finalProdPrice = createElement("span", { class: "prod-info__final-price" }); // Bold Element In The Cart That Has Final Price.

  if (product.quantityChoosed === 0) {
    updateQnAndCart(1);
    quanScndSpan.textContent = "1";
    finalProdPrice.textContent = `$${product.price}.00`;
  } else {
    quanScndSpan.textContent = `${product.quantityChoosed}`;
    finalProdPrice.textContent = calcFnlPrice();
  }

  addQuantity.append(quanFrsSpan, quanScndSpan);

  const deleteIcon = createElement("img", {
      src: "images/icon-delete.svg",
      alt: "Delete Icon",
      class: "delete-icon",
      id: "del-prod",
    }),
    // Below Section
    checkOutBtn = createElement(
      "button",
      { class: "orng-btn checkout", id: "checkout-prod" },
      "Checkout"
    );

  // Check For Local Storage
  if (productFromLocal) {
    const { quantityChoosed, finalPrice, image } = productFromLocal;

    product.quantityChoosed = quantityChoosed;

    cartTopNumber.textContent = `${product.quantityChoosed}`;

    quanScndSpan.textContent = `${product.quantityChoosed}`;

    productImg.setAttribute("src", image);

    finalProdPrice.textContent = `$${finalPrice}.00`;
  }

  // Appending Everything To Its Parent
  prodInfoParent.append(productName, productPrice, addQuantity, finalProdPrice);

  upperSection.append(productImg, prodInfoParent, deleteIcon);

  body.append(upperSection, checkOutBtn);

  cartMainBox.appendChild(body);
}

// Create Elements And Add Its Content Function:
function createElement(tagName, props, txtValue) {
  let el = document.createElement(tagName);

  if (props) {
    for (const name in props) {
      el.setAttribute(`${name}`, `${props[name]}`);
    }
  }

  if (txtValue) {
    el.textContent = txtValue;
  }

  return el;
}

// Calc Final Price Function:
function calcFnlPrice() {
  return `$${product.price * product.quantityChoosed}.00`;
}

// Return Element Has Dollar String Without it Function:
function withoutDollor(txt) {
  let result;
  if (typeof txt === "string") {
    result = txt
      .split("")
      .filter((e) => e != "$")
      .join("");
  } else if (typeof txt === "object") {
    result = txt.textContent
      .split("")
      .filter((e) => e != "$")
      .join("");
  }
  return parseInt(result);
}

// Update product.quantityChoosed And How Many Product The Cart Has Function:
function updateQnAndCart(num) {
  product.quantityChoosed = num;
  cartTopNumber.textContent = `${product.quantityChoosed}`;
}

// Add To Local Storage Function:
function addToLocal(fnPrice) {
  const theObject = {
    ...product,
    finalPrice: fnPrice,
  };
  window.localStorage.setItem("product", JSON.stringify(theObject));
}

// Render Local Storage Content Function:
function renderFromLocal() {
  const localSProduct = JSON.parse(localStorage.getItem("product"));

  localSProduct ? appendElementsToCart(localSProduct) : false;

  const delIcon = document.getElementById("del-prod");
  if (delIcon === null || delIcon === undefined) {
    return;
  } else {
    delIcon.onclick = function () {
      delCartItem(this);
    };
  }
}

// Delete Cart Content Function:
function delCartItem(delIcon) {
  if (delIcon) {
    delIcon.parentElement.parentElement.remove();
    localStorage.getItem("product")
      ? localStorage.removeItem("product")
      : false;
  }
  // Reseting Everything
  product.quantityChoosed = 0;
  cartTopNumber.textContent = `${product.quantityChoosed}`;
  createEmptyNote();
}

// Create Your Cart Is Empty Msg Function:
function createEmptyNote() {
  const noticeMsg = document.createElement("span");
  noticeMsg.textContent = "Your cart is empty.";
  noticeMsg.classList.add("empty-note");

  cartMainBox.classList.add("empty");
  cartMainBox.querySelector(".cart-content__head").after(noticeMsg);
}

// Desktop Version Slider Function:
function desktopSlider() {
  const photosSection = document.querySelector(".photos-section"),
    bigImges = photosSection.querySelectorAll(".products img"),
    smlImges = photosSection.querySelectorAll(" .thumbnails > div");

  smlImges.forEach((img, ind) => {
    img.onclick = () => {
      removeClass(photosSection, "active", "show");

      img.classList.toggle("active");
      bigImges[ind].classList.toggle("show");
    };
  });
}

// Remove Multiple Elements ClassName Function:
function removeClass(element, ...classesName) {
  for (let i = 0; i < classesName.length; i++) {
    element
      .querySelector(`.${classesName[i]}`)
      .classList.remove(classesName[i]);
  }
}

// Show Previous Image Function:

function showPrevImg(parent, prevBtn, nextBtn, showedImage, activeImage) {
  if (prevBtn.classList.contains("not-allowed")) {
    return;
  } else {
    showedImage.classList.remove("show");
    showedImage.previousElementSibling.classList.add("show");
    if (activeImage) {
      activeImage.classList.remove("active");
      activeImage.previousElementSibling.classList.add("active");
    }

    checkBtns(parent, parent.querySelector(".show"), nextBtn, prevBtn);
  }
}

// Show Next Image Function:
function showNextImg(parent, prevBtn, nextBtn, showedImage, activeImage) {
  if (nextBtn.classList.contains("not-allowed")) {
    return;
  } else {
    showedImage.classList.remove("show");
    showedImage.nextElementSibling.classList.add("show");

    if (activeImage) {
      activeImage.classList.remove("active");
      activeImage.nextElementSibling.classList.add("active");
    }

    checkBtns(parent, parent.querySelector(".show"), nextBtn, prevBtn);
  }
}

// Check For Not Allowed Button:
function checkBtns(imagesParent, showedImg, nextBtn, prevBtn) {
  let allImages = imagesParent.querySelectorAll(".product");
  let imagesLength = allImages.length;

  if (showedImg === imagesParent.firstElementChild) {
    nextBtn.classList.remove("not-allowed");
    prevBtn.classList.add("not-allowed");
  } else if (showedImg === allImages[imagesLength - 1]) {
    prevBtn.classList.remove("not-allowed");
    nextBtn.classList.add("not-allowed");
  } else {
    prevBtn.classList.remove("not-allowed");
    nextBtn.classList.remove("not-allowed");
  }
}
