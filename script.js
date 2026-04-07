// Store all products
let allProducts = [];

// Fetch products from API
async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  allProducts = data;
  loadCategories(data);
  updateProducts();
}

// Display products
function showProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p class='no-data'>No products found 😢</p>";
    return;
  }

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

// Load category dropdown
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

// Main function: search + filter + sort
function updateProducts() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const categoryValue = document.getElementById("category").value;
  const sortValue = document.getElementById("sort").value;

  let result = [...allProducts];

  // 🔍 Search
  result = result.filter(p =>
    p.title.toLowerCase().includes(searchValue)
  );

  // 📂 Category filter
  if (categoryValue !== "all") {
    result = result.filter(p => p.category === categoryValue);
  }

  // 🔃 Sort
  if (sortValue === "low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high") {
    result.sort((a, b) => b.price - a.price);
  }

  showProducts(result);
}

// Event listeners
document.getElementById("search").addEventListener("input", updateProducts);
document.getElementById("category").addEventListener("change", updateProducts);
document.getElementById("sort").addEventListener("change", updateProducts);

// Initialize app
fetchProducts();
