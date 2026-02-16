const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

async function fetchCategories() {
  const categoryContainer = document.getElementById("category-container");
  if (!categoryContainer) return;

  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();

    categoryContainer.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.className =
      "category-btn px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-full shadow-lg transition-all duration-300 cursor-pointer";
    allBtn.innerText = "All";
    allBtn.onclick = () => loadProducts("all", allBtn);
    categoryContainer.appendChild(allBtn);

    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.className =
        "category-btn px-6 py-2.5 bg-white text-[#374151] border border-gray-200 font-medium rounded-full transition-all duration-300 capitalize cursor-pointer";
      btn.innerText = category;
      btn.onclick = () => loadProducts(category, btn);
      categoryContainer.appendChild(btn);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

async function loadProducts(
  category = "all",
  selectedBtn = null,
  limit = null,
) {
  const container = document.getElementById("product-container");
  if (!container) return;

  const allBtns = document.querySelectorAll(".category-btn");
  allBtns.forEach((btn) => {
    btn.classList.remove("bg-indigo-600", "text-white", "shadow-lg");
    btn.classList.add(
      "bg-white",
      "text-[#374151]",
      "border",
      "border-gray-200",
    );
  });

  if (selectedBtn) {
    selectedBtn.classList.add("bg-indigo-600", "text-white", "shadow-lg");
    selectedBtn.classList.remove(
      "bg-white",
      "text-[#374151]",
      "border-gray-200",
    );
  }

  let url =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;

  try {
    container.innerHTML = `<div class="col-span-full text-center py-10">Loading products...</div>`;

    const response = await fetch(url);
    let products = await response.json();
    if (limit) {
      products = products.slice(0, limit);
    }

    container.innerHTML = "";

    products.forEach((product) => {
      const card = `
        <div class="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
          <div class="relative h-64 bg-white rounded-t-xl overflow-hidden mb-4 flex items-center justify-center p-6">
            <img src="${product.image}" alt="${product.title}" class="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div class="p-4">
            <div class="flex justify-between items-center mb-2">
              <span class="bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold px-2 py-1 rounded">${product.category}</span>
              <div class="flex items-center text-yellow-500 text-sm font-semibold">
                <i class="fa-solid fa-star mr-1"></i>
                <span class="text-gray-500">${product.rating.rate} (${product.rating.count})</span>
              </div>
            </div>
            <h3 class="text-gray-900 font-semibold text-lg mb-1 truncate" title="${product.title}">${product.title}</h3>
            <div class="text-gray-900 font-bold text-xl mb-4">$${product.price}</div>
            <div class="flex gap-4">
              <button class="flex-1 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-2"><i class="fa-regular fa-eye"></i> Details</button>
              <button class="flex-1 text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-2"><i class="fa-solid fa-cart-shopping"></i> Add</button>
            </div>
          </div>
        </div>`;
      container.innerHTML += card;
    });
  } catch (error) {
    container.innerHTML = `<div class="col-span-full text-center text-red-500 py-10">Failed to load products.</div>`;
  }
}

if (document.getElementById("category-container")) {
  fetchCategories();
  loadProducts("all");
} else {
  loadProducts("all", null, 3);
}
