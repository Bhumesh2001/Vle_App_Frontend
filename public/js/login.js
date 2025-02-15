const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const loginSpinner = document.getElementById('loginSpinner');
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

const baseUrl = 'https://vle-backend.onrender.com';
const frontendBaseUrl = 'https://vle-app-frontend.onrender.com';

// const baseUrl = 'http://localhost:3001';
// const frontendBaseUrl = 'http://localhost:3000';

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    loginText.classList.add('d-none');
    loginSpinner.classList.remove('d-none');
    loginBtn.disabled = true;
    loginBtn.style.backgroundColor = '#ff0000';

    try {
        const response = await fetch(`${baseUrl}/admin/login-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        await response.json();

        if (response.ok) {
            window.location.href = `${frontendBaseUrl}/admin/dashboard`;
            document.getElementById('loginForm').reset();
            removedisabledButton();
        } else {
            const inputs = document.querySelectorAll('input[type="password"], input[type="text"].form-control');
            inputs.forEach(input => {
                input.style.borderColor = 'red';
            });
            removedisabledButton();
        };

    } catch (error) {
        console.error('Error:', error);
        removedisabledButton();
    };
});

function removedisabledButton() {
    loginText.classList.remove('d-none');
    loginSpinner.classList.add('d-none');
    loginBtn.disabled = false;
    loginBtn.style.backgroundColor = '';
};

togglePassword.addEventListener("click", function () {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;

    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
});
