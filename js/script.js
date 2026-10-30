const productGrid = document.getElementById("productGrid");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const categoryBar = document.getElementById("categoryBar");
const bannerText = document.getElementById("bannerText");
const bannerDots = document.getElementById("bannerDots");
const prevSlideButton = document.getElementById("prevSlide");
const nextSlideButton = document.getElementById("nextSlide");
const cartCountLabel = document.getElementById("cartCount");

const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalThumbs = document.getElementById("modalThumbs");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalOldPrice = document.getElementById("modalOldPrice");
const modalPrice = document.getElementById("modalPrice");
const quantityLabel = document.getElementById("quantity");
const decreaseButton = document.getElementById("decreaseQuantity");
const increaseButton = document.getElementById("increaseQuantity");
const addToCartButton = document.getElementById("addToCart");

let cartCount = 0;
let quantity = 1;
let currentSlide = 0;
let selectedProduct = null;

function formatPrice(amount) {
  return "Rs. " + amount.toLocaleString("en-US");
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <div class="card-image">
      <img src="${product.images[0]}" alt="${product.name}">
      <button class="add-button" type="button" aria-label="Add ${product.name} to cart">+</button>
    </div>
    <h3>${product.name}</h3>
    <p>
      <del class="old-price">Rs. ${product.originalPrice}</del>
      <span class="price">Rs. ${product.discountedPrice}</span>
    </p>
  `;

  card.addEventListener("click", function () {
    openModal(product.id);
  });

  const addButton = card.querySelector(".add-button");
  addButton.addEventListener("click", function (event) {
    event.stopPropagation();
    addToCart(1);
  });

  return card;
}

function showProducts(list) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    productGrid.innerHTML = `<p class="no-result">No product found. Try a different name.</p>`;
    return;
  }

  list.forEach(function (product) {
    productGrid.appendChild(createProductCard(product));
  });
}

function searchProducts() {
  const searchText = searchInput.value.trim().toLowerCase();

  const results = products.filter(function (product) {
    return (
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
    );
  });

  showProducts(results);
}

function showCategories() {
  categories.forEach(function (name, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category" + (index === 0 ? " active" : "");
    button.textContent = name;

    button.addEventListener("click", function () {
      categoryBar.querySelector(".active").classList.remove("active");
      button.classList.add("active");
    });

    categoryBar.appendChild(button);
  });
}

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];

  bannerText.innerHTML = `
    <p class="script-small">${slide.small}</p>
    <h2 class="script-big">${slide.big}</h2>
    <div class="discount">
      <span class="discount-number">${slide.number}<em class="now-tag">NOW</em></span>
      <span class="discount-percent">%<small>OFF</small></span>
    </div>
    <p class="banner-note">${slide.note}</p>
  `;

  bannerDots.innerHTML = "";
  slides.forEach(function (item, dotIndex) {
    const dot = document.createElement("span");
    dot.className = "dot" + (dotIndex === currentSlide ? " active" : "");
    bannerDots.appendChild(dot);
  });
}

function addToCart(amount) {
  cartCount += amount;
  cartCountLabel.textContent = cartCount;
  cartCountLabel.classList.toggle("visible", cartCount > 0);
}

function changeQuantity(amount) {
  quantity = Math.max(1, quantity + amount);
  quantityLabel.textContent = quantity;
}

function showModalImage(index) {
  modalImage.src = selectedProduct.images[index];
  modalImage.alt = selectedProduct.name;

  Array.from(modalThumbs.children).forEach(function (thumb, thumbIndex) {
    thumb.classList.toggle("active", thumbIndex === index);
  });
}

function showThumbnails(product) {
  modalThumbs.innerHTML = "";

  if (product.images.length < 2) {
    return;
  }

  product.images.forEach(function (imagePath, index) {
    const thumb = document.createElement("img");
    thumb.src = imagePath;
    thumb.alt = product.name + " photo " + (index + 1);

    thumb.addEventListener("click", function () {
      showModalImage(index);
    });

    modalThumbs.appendChild(thumb);
  });
}

function openModal(id) {
  selectedProduct = products.find(function (product) {
    return product.id === id;
  });

  quantity = 1;
  quantityLabel.textContent = quantity;

  modalName.textContent = selectedProduct.name;
  modalCategory.textContent = selectedProduct.category;
  modalDescription.textContent = selectedProduct.description;
  modalOldPrice.textContent = formatPrice(selectedProduct.originalPrice);
  modalPrice.textContent = formatPrice(selectedProduct.discountedPrice);

  showThumbnails(selectedProduct);
  showModalImage(0);

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchProducts();
});

searchInput.addEventListener("input", searchProducts);

prevSlideButton.addEventListener("click", function () {
  showSlide(currentSlide - 1);
});

nextSlideButton.addEventListener("click", function () {
  showSlide(currentSlide + 1);
});

decreaseButton.addEventListener("click", function () {
  changeQuantity(-1);
});

increaseButton.addEventListener("click", function () {
  changeQuantity(1);
});

addToCartButton.addEventListener("click", function () {
  addToCart(quantity);
  closeModal();
});

closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});

showCategories();
showSlide(0);
showProducts(products);
