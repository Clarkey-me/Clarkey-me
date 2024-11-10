document.addEventListener("DOMContentLoaded", () => {
    // Get the table body element
    const userTableBody = document.querySelector("#userTable tbody");

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Function to render the users
    function renderUsers() {
        userTableBody.innerHTML = "";

        if (users.length === 0) {
            const noUsersRow = document.createElement("tr");
            noUsersRow.innerHTML = "<td colspan='3'>No users found</td>";
            userTableBody.appendChild(noUsersRow);
            return;
        }

        users.forEach(user => {
            const userRow = document.createElement("tr");

            // Display username and a masked password
            userRow.innerHTML = `
                <td>${user.username}</td>
                <td>••••••••</td> <!-- Masking the password -->
                <td><button class="delete-user" data-username="${user.username}">Delete</button></td>
            `;
            
            userTableBody.appendChild(userRow);
        });
    }

    // Function to delete a user
    userTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-user")) {
            const usernameToDelete = event.target.getAttribute("data-username");

            // Ask for confirmation before deleting
            const isConfirmed = confirm(`Are you sure you want to delete the user: ${usernameToDelete}?`);

            if (isConfirmed) {
                // Remove the user from the array and update localStorage
                users = users.filter(user => user.username !== usernameToDelete);
                localStorage.setItem("users", JSON.stringify(users));
                renderUsers();  // Re-render the table after deleting
            }
        }
    });

    // Initial render of the users
    renderUsers();
});
