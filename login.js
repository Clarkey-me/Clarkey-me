document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Predefined admin credentials
    const adminUsername = 'admin'; // Change this to your desired admin username
    const adminPassword = 'admin123'; // Change this to your desired admin password

    // Clear error message when user starts typing
    const clearErrorMessage = () => {
        errorMessage.textContent = '';
    };

    // Event listener for form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrorMessage(); // Clear previous error message

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            errorMessage.textContent = 'Please enter both username and password.';
            return;
        }

        // Check if the entered credentials match the admin credentials
        if (username === adminUsername && password === adminPassword) {
            // If admin login is successful, redirect to the admin page
            window.location = 'admin.html'; // Redirect to the admin page
            return;
        }

        // Get registered users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the username and password match any registered user
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // If login is successful, redirect to the user page
            window.location = 'index.html'; // or another page if required
        } else {
            // Show error message if credentials don't match
            errorMessage.textContent = 'Invalid username or password. Please try again.';
        }
    });

    // Add input event listeners to clear error messages
    document.getElementById('username').addEventListener('input', clearErrorMessage);
    document.getElementById('password').addEventListener('input', clearErrorMessage);
});