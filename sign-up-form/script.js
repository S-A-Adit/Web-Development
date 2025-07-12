document.querySelector('.signup-form').addEventListener('submit', function(e) {
    let valid = true;

    // First Name
    const firstName = document.getElementById('first-name');
    if (!firstName.value.trim()) {
        firstName.setCustomValidity('First name is required.');
        valid = false;
    } else {
        firstName.setCustomValidity('');
    }

    // Last Name
    const lastName = document.getElementById('last-name');
    if (!lastName.value.trim()) {
        lastName.setCustomValidity('Last name is required.');
        valid = false;
    } else {
        lastName.setCustomValidity('');
    }

    // Email
    const email = document.getElementById('email');
    if (!email.value.trim()) {
        email.setCustomValidity('Email is required.');
        valid = false;
    } else if (!email.checkValidity()) {
        email.setCustomValidity('Please enter a valid email address.');
        valid = false;
    } else {
        email.setCustomValidity('');
    }

    // Phone
    const phone = document.getElementById('phone');
    if (!phone.value.trim()) {
        phone.setCustomValidity('Phone number is required.');
        valid = false;
    } else {
        phone.setCustomValidity('');
    }

    // Password
    const password = document.getElementById('password');
    if (!password.value.trim()) {
        password.setCustomValidity('Password is required.');
        valid = false;
    } else if (password.value.length < 8) {
        password.setCustomValidity('Password must be at least 8 characters.');
        valid = false;
    } else {
        password.setCustomValidity('');
    }

// Confirm Password
const confirmPassword = document.getElementById('confirm-password');
if (!confirmPassword.value.trim()) {
    confirmPassword.setCustomValidity('Please confirm your password.');
    valid = false;
} else if (confirmPassword.value.length < 8) {
    confirmPassword.setCustomValidity('Password must be at least 8 characters.');
    valid = false;
} else if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity('Passwords do not match.');
    valid = false;
} else {
    confirmPassword.setCustomValidity('');
}

    if (!valid) {
        e.preventDefault();
        // Show built-in validation messages
        this.reportValidity();
    }
});