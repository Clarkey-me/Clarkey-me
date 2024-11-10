document.addEventListener("DOMContentLoaded", () => {
    // Retrieve payment details from local storage
    const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if payment details exist in local storage
    if (paymentDetails) {
        // Populate payment details
        document.getElementById("confirmName").textContent = paymentDetails.name;
        document.getElementById("confirmContact").textContent = paymentDetails.contact;
        document.getElementById("confirmAddress").textContent = paymentDetails.address;
        document.getElementById("confirmLandmark").textContent = paymentDetails.landmark || 'N/A';
        document.getElementById("confirmPostalCode").textContent = paymentDetails.postalCode;
        document.getElementById("confirmPaymentMethod").textContent = paymentDetails.paymentMethod;
    } else {
        // If no payment details found
        alert("No payment details found!");
    }

    // Render cart items
    const cartItemsContainer = document.getElementById("cartItems");
    let subtotal = 0;

    if (cartItems.length > 0) {
        cartItems.forEach((item) => {
            const price = Number(item.price);
            const total = price * 1; // Quantity is always 1
            subtotal += total;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₱${price.toFixed(2)}</td>
                <td>1</td> <!-- Quantity is always 1 -->
                <td>₱${total.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(row);
        });

        // Calculate total amount
        const totalAmount = subtotal;
        document.getElementById("totalAmount").textContent = `₱${totalAmount.toFixed(2)}`;
    } else {
        // If no cart items found
        document.getElementById("cartItemsTable").innerHTML = "<tr><td colspan='4'>Your cart is empty.</td></tr>";
    }

    // Optional: Clear localStorage after displaying confirmation
    localStorage.removeItem("cartItems");
    localStorage.removeItem("paymentDetails");
});
