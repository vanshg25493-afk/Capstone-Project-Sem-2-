let allProducts = [];
let filteredProducts = [];

// Fetch products
async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  allProducts = data;
  filteredProducts = data;

  showProducts(data);
  loadCategories(data);
}

// Show products
function showProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" />
        <h4>${p.title.slice(0, 40)}</h4>
        <p>₹ ${p.price}</p>
        <p>⭐ ${p.rating.rate}</p>
      </div>
    `;
  });
}

// Load categories
function loadCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];
  const select = document.getElementById("category");

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// Search
document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  filteredProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes(value)
  );

  showProducts(filteredProducts);
});

// Filter by category
document.getElementById("category").addEventListener("change", function () {
  const value = this.value;

  if (value === "all") {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(p => p.category === value);
  }

  showProducts(filteredProducts);
});

// Sort
document.getElementById("sort").addEventListener("change", function () {
  let sorted = [...filteredProducts];

  if (this.value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (this.value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  showProducts(sorted);
});

// Init
fetchProducts();
