// Toggle between login and registration forms
document.getElementById('show-register').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

// Function to validate password (min length, contains digit and special character)
function validatePassword(password) {
    const minLength = 6;
    const hasDigit = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    // Check password length
    if (password.length < minLength) {
        return 'Password must be at least 6 characters long.';
    }
    // Check if password contains a digit
    if (!hasDigit.test(password)) {
        return 'Password must contain at least one digit.';
    }
    // Check if password contains a special character
    if (!hasSpecialChar.test(password)) {
        return 'Password must contain at least one special character.';
    }
    return null;
}

// Registration
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Check if username already exists
    if (localStorage.getItem(username)) {
        alert('A user with this username already exists.');
        return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
        alert(passwordError);
        return;
    }

    // Save user to localStorage
    localStorage.setItem(username, JSON.stringify({ password }));

    // Save the logged-in user
    localStorage.setItem('loggedInUser', username);

    // Redirect to profile page
    window.location.href = 'profile.html';
});

// Login
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Check if user exists
    const userData = localStorage.getItem(username);
    if (!userData) {
        alert('This user does not exist. Please register.');
        return;
    }

    const user = JSON.parse(userData);
    if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }

    // Save the logged-in user
    localStorage.setItem('loggedInUser', username);

    // Redirect to profile page
    window.location.href = 'profile.html';
});
