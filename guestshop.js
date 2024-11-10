document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const brandSearch = document.getElementById("brand-search");
    const priceSearch = document.getElementById("price-search");

    // Load products from local storage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Render products on the page
    function renderProducts(filteredProducts = products) {
        productGrid.innerHTML = ""; // Clear the grid before rendering new content
        filteredProducts.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <a href="viewproduct.html?index=${index}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </a>
                <div class="des">
                    <span>${product.brand}</span>
                    <h5>${product.name}</h5>
                    <h4>₱${product.price}</h4>
                </div>
                <button class="add-to-cart" data-index="${index}">
                    <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
            `;

            productGrid.appendChild(productCard);
        });
    }

    // Filter products based on search criteria (brand and price)
    function filterProducts() {
        const brandValue = brandSearch.value.toLowerCase();
        const maxPrice = parseFloat(priceSearch.value) || Infinity;

        const filteredProducts = products.filter(product => {
            const matchesBrand = product.brand.toLowerCase().includes(brandValue);
            const matchesPrice = product.price <= maxPrice;
            return matchesBrand && matchesPrice;
        });

        renderProducts(filteredProducts);
    }

    // Event listeners for search inputs
    brandSearch.addEventListener("input", filterProducts);
    priceSearch.addEventListener("input", filterProducts);

    renderProducts();

    // Add to Cart functionality
    productGrid.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            addToCart();
        }
    });

    // Function to add a product to the cart in local storage
    function addToCart(product) {
        window.location = "login.html";
    }
});
