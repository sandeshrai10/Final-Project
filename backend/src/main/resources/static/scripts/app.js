document.addEventListener('DOMContentLoaded', () => {
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    const openSignupModal = document.getElementById('openSignupModal');
    const openLoginModal = document.getElementById('openLoginModal');
    const closeSignupModal = document.getElementById('closeSignupModal');
    const closeLoginModal = document.getElementById('closeLoginModal');

    openSignupModal.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    openLoginModal.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeSignupModal.addEventListener('click', () => {
        signupModal.style.display = 'none';
    });

    closeLoginModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
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
                    signupModal.style.display = 'none';
                } else {
                    alert('Registration failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Registration failed.');
            }
        });
    }

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
                    alert(`Welcome, ${user.firstName}!`);
                    loginModal.style.display = 'none';
                } else {
                    alert('Login failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Login failed.');
            }
        });
    }
});
