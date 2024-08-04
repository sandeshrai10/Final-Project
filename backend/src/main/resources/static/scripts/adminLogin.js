// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('admin-login-form').addEventListener('submit', login);
// });

// function login(event) {
//     event.preventDefault();

//     const credentials = {
//         email: document.getElementById('loginEmail').value,
//         password: document.getElementById('loginPassword').value
//     };

//     fetch('/api/admin/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error('Login failed');
//     })
//     .then(data => {
//         localStorage.setItem('authToken', data.token); // Store the token
//         window.location.href = '/admin.html'; // Redirect to admin page
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('Login failed');
//     });
// }




// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('admin-login-form').addEventListener('submit', loginAdmin);
// });

// function loginAdmin(event) {
//     event.preventDefault();

//     const credentials = {
//         email: document.getElementById('loginEmail').value,
//         password: document.getElementById('loginPassword').value
//     };

//     fetch('/api/admin/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.json().then(err => { throw new Error(err.message || 'Login failed'); });
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data.token) {
//             localStorage.setItem('authToken', data.token);
//             window.location.href = '/admin.html';
//             console.log('Login successful, token:', data.token);  // Add this line
//             console.log('Redirecting to admin page...');  // Add this line
//             // window.location.replace('/admin.html');
//         } else {
//             throw new Error('Invalid response from server');
//         }
//     })
//     .catch(error => {
//         console.error('Login error:', error);
//         alert('Login failed: ' + error.message);
//     });
// }

// // Attach token to every request
// (function() {
//     const originalFetch = window.fetch;
//     window.fetch = function() {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             if (!arguments[1]) {
//                 arguments[1] = {};
//             }
//             if (!arguments[1].headers) {
//                 arguments[1].headers = {};
//             }
//             arguments[1].headers['Authorization'] = 'Bearer ' + token;
//             console.log('Adding token to request:', arguments[0]); // Log the URL being fetched
//         }
//         return originalFetch.apply(this, arguments);
//     };
// })();







// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('admin-login-form').addEventListener('submit', loginAdmin);
// });

// function loginAdmin(event) {
//     event.preventDefault();

//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;

//     fetch('/api/admin/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: email, password: password })
//     })
//     .then(response => {
//         if (response.ok) {
//             window.location.href = '/admin.html';
//         } else {
//             return response.json().then(data => { throw new Error(data.message || 'Login failed'); });
//         }
//     })
//     .catch(error => {
//         console.error('Login error:', error);
//         alert('Login failed: ' + error.message);
//     });
// }





document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('admin-login-form').addEventListener('submit', loginAdmin);
});

function loginAdmin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    fetch('/api/admin/login', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/admin.html';
        } else {
            return response.json().then(data => { throw new Error(data.message || 'Login failed'); });
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
    });
}