// public/js/dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');

    // Attach logout handler
    logoutBtn.addEventListener('click', async () => {
        try {
            const token = localStorage.getItem('authToken');
            
            // Optional: Call backend logout endpoint
            await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Clear auth data
            localStorage.removeItem('authToken');
            
            // Redirect to login
            window.location.href = '/login.html';
            
        } catch (err) {
            console.error('Logout failed:', err);
            // Force logout on error
            localStorage.removeItem('authToken');
            window.location.href = '/login.html';
        }
    });
});