// js/login.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
        errorMessage.style.display = 'none';

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                })
            });

            const data = await response.json();
            console.log('Response:', response.status, data);

            if (response.ok && data.success) {
                // Generate or get token if not provided
                const token = data.token || btoa(Date.now() + document.getElementById('email').value);
                localStorage.setItem('authToken', token);
                
                // Redirect handling
                const redirectUrl = data.redirectUrl || '/index.html';
                window.location.href = redirectUrl.startsWith('/') ? redirectUrl : '/' + redirectUrl;
                return;
            }

            throw new Error(data.message || 'Login failed. Please try again.');

        } catch (err) {
            errorMessage.textContent = err.message;
            errorMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }
    });

    // Clear any existing invalid tokens
    if (localStorage.getItem('authToken')) {
        const token = localStorage.getItem('authToken');
        if (!token || token === 'undefined' || token === 'null') {
            localStorage.removeItem('authToken');
        }
    }
});
