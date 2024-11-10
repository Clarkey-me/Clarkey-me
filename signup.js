document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const adminUsername = 'admin'; 
    const adminPassword = 'admin123'; 

    // Handle form submission
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("newUsername").value.trim();
        const password = document.getElementById("newPassword").value.trim();

        const adminUsername = 'admin'; 
        const adminPassword = 'admin123'; 

        if (username === adminUsername && password === adminPassword) {
            alert("This username is already taken. Please choose another one.")
            return;
        }
        // Check if the username or password fields are empty
        if (!username || !password) {
            alert("Please fill in both fields.");
            return;  // Prevent further execution if fields are empty
        }

        // Check if the username already exists
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            // Alert for duplicate username
            alert("This username is already taken. Please choose another one.");
            return;  // Stop the form submission if the username is duplicate
        } else {
            // Register new user if username is not duplicate
            const newUser = { username: username, password: password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Sign up successful!");
            window.location = "login.html";  // Redirect to login page after successful signup

            // Optionally, clear input fields after successful submission
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
        }
    });
});
