document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('admin-login-form').addEventListener('submit', login);
});

function login(event) {
    event.preventDefault();

    const credentials = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    fetch('/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Login failed');
    })
    .then(data => {
        localStorage.setItem('authToken', data.token); // Store the token
        window.location.href = '/admin.html'; // Redirect to admin page
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed');
    });
}
