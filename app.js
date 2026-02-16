const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const products = data.slice(0, 3);

    const container = document.getElementById("product-container");
    container.innerHTML = "";

    products.forEach((product) => {
      const card = `
            <div class="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
              <div class="relative h-64 bg-gray-100 rounded-t-xl overflow-hidden mb-4 flex items-center justify-center p-4">
                <img
                  src="${product.image}"
                  alt="${product.title}"
                  class="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div class="p-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold px-2 py-1 rounded">
                    ${product.category}
                  </span>
                  <div class="flex items-center text-yellow-500 text-sm font-semibold">
                    <i class="fa-solid fa-star mr-1"></i>
                    <span class="text-gray-500">${product.rating.rate} (${product.rating.count})</span>
                  </div>
                </div>

                <h3 class="text-gray-900 font-semibold text-lg mb-1 truncate" title="${product.title}">
                  ${product.title}
                </h3>

                <div class="text-gray-900 font-bold text-xl mb-4">$${product.price}</div>

                <div class="flex gap-4">
                  <button class="flex-1 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors flex items-center justify-center gap-2">
                    <i class="fa-regular fa-eye"></i> Details
                  </button>
                  <button class="flex-1 text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors flex items-center justify-center gap-2">
                    <i class="fa-solid fa-cart-shopping"></i> Add
                  </button>
                </div>
              </div>
            </div>
          `;
      container.innerHTML += card;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
fetchProducts();
