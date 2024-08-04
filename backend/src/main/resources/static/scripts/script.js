document.addEventListener('DOMContentLoaded', () => {
    // Handle register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Registration successful!');
                    window.location.href = 'login.html';
                } else {
                    alert('Registration failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Registration failed.');
            }
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value
            };

            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const user = await response.json();
                    // Store user role in localStorage
                    localStorage.setItem('userRole', user.role);
                    alert(`Welcome, ${user.firstName}!`);
                    window.location.href = 'index.html';
                } else {
                    alert('Login failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Login failed.');
            }
        });
    }

    // Reservation form submission
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Reservation submitted successfully!');
        });
    }

    // Toggle menu for small screens
    function toggleMenu() {
        const menu = document.querySelector('nav ul');
        menu.classList.toggle('active');
    }

    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('suggestions');
    const searchButton = document.getElementById('search-button');

    if (searchInput && suggestions && searchButton) {
        const equipmentSuggestions = ['laptops', 'cameras', 'tablets', 'headphones'];

        searchInput.addEventListener('focus', () => {
            showSuggestions('');
        });

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            showSuggestions(query);
        });

        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                suggestions.innerHTML = '';
            }, 200);
        });

        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            navigateToPage(query);
        });

        function showSuggestions(query) {
            suggestions.innerHTML = '';
            const filteredSuggestions = equipmentSuggestions.filter(item => item.startsWith(query));
            filteredSuggestions.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = item;
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    navigateToPage(item);
                });
                suggestions.appendChild(suggestionItem);
            });
        }

        function navigateToPage(query) {
            switch (query) {
                case 'laptops':
                case 'laptop':
                    window.location.href = '/laptops.html';
                    break;
                case 'cameras':
                case 'camera':
                    window.location.href = '/cameras.html';
                    break;
                case 'tablets':
                case 'tablet':
                    window.location.href = '/tablets.html';
                    break;
                case 'headphones':
                case 'headphone':
                    window.location.href = '/headphones.html';
                    break;
                default:
                    alert('No matching equipment found');
            }
        }
    }
});
