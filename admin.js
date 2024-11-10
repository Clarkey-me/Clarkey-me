document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");
    const productTableBody = document.getElementById("productTableBody");

    // Load products from local storage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function saveProducts() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function renderProducts() {
        productTableBody.innerHTML = "";
        products.forEach((product, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>$${product.price}</td>
                <td>
                    <a href="#" class="action-btn edit" onclick="editProduct(${index})">Edit</a>
                    <a href="#" class="action-btn delete" onclick="deleteProduct(${index})">Delete</a>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }

    productForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const productId = document.getElementById("productId").value;
        const productName = document.getElementById("productName").value;
        const productBrand = document.getElementById("productBrand").value;
        const productPrice = document.getElementById("productPrice").value;
        const productImageInput = document.getElementById("productImage");

        // Check if an image file is uploaded
        if (productImageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const productImage = event.target.result; // Data URL of the image

                const product = {
                    name: productName,
                    brand: productBrand,
                    price: productPrice,
                    image: productImage
                };

                if (productId) {
                    products[productId] = product;
                    document.getElementById("productId").value = "";
                } else {
                    products.push(product);
                }

                productForm.reset();
                saveProducts();
                renderProducts();
            };

            reader.readAsDataURL(productImageInput.files[0]);
        } else {
            alert("Please upload an image file.");
        }
    });

    window.editProduct = function(index) {
        const product = products[index];
        document.getElementById("productId").value = index;
        document.getElementById("productName").value = product.name;
        document.getElementById("productBrand").value = product.brand;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productImage").value = product.image; // Clear file input for editing
    };

    window.deleteProduct = function(index) {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
    };

    renderProducts();
});
