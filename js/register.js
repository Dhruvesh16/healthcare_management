// public/js/register.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.register-form');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering...';
        errorMessage.style.display = 'none';

        try {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    password: password
                })
            });

            const data = await response.json();
            
            if (data.success) {
                window.location.href = 'login.html';
            } else {
                throw new Error(data.error || 'Registration failed');
            }
        } catch (err) {
            errorMessage.textContent = err.message;
            errorMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Register';
        }
    });
});