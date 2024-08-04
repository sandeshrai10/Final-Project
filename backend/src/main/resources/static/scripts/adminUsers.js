// document.addEventListener('DOMContentLoaded', () => {
//     const searchInput = document.getElementById('search-user-input');
//     const usersContainer = document.getElementById('users-container');
//     const addUserBtn = document.getElementById('add-user-btn');
//     const addUserSection = document.getElementById('add-user-section');
//     const addUserForm = document.getElementById('add-user-form');
//     const cancelAddUserBtn = document.getElementById('cancel-add-user');

//     function displayUser(user) {
//         const userRow = document.createElement('tr');
//         userRow.innerHTML = `
//             <td>${user.id}</td>
//             <td><input type="text" value="${user.firstName}" disabled></td>
//             <td><input type="text" value="${user.lastName}" disabled></td>
//             <td><input type="email" value="${user.email}" disabled></td>
//             <td><input type="text" value="${user.phoneNumber}" disabled></td>
//             <td>${user.registrationDate}</td>
//             <td>${user.role}</td>
//             <td><button class="edit-btn">Edit</button></td>
//             <td><button class="save-btn" disabled>Save</button></td>
//             <td><button class="delete-btn">Delete</button></td>
//         `;

//         usersContainer.appendChild(userRow);

//         const editBtn = userRow.querySelector('.edit-btn');
//         const saveBtn = userRow.querySelector('.save-btn');
//         const deleteBtn = userRow.querySelector('.delete-btn');
//         const inputs = userRow.querySelectorAll('input');

//         editBtn.addEventListener('click', () => {
//             inputs.forEach(input => input.disabled = false);
//             saveBtn.disabled = false;
//         });

//         saveBtn.addEventListener('click', () => {
//             const updatedUser = {
//                 id: user.id,
//                 firstName: inputs[0].value,
//                 lastName: inputs[1].value,
//                 email: inputs[2].value,
//                 phoneNumber: inputs[3].value,
//             };

//             fetch(`/api/users/${user.id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(updatedUser)
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to update user');
//                 }
//                 return response.json();
//             })
//             .then(() => {
//                 inputs.forEach(input => input.disabled = true);
//                 saveBtn.disabled = true;
//                 fetchAllUsers();
//             })
//             .catch(error => {
//                 console.error('Error updating user:', error);
//             });
//         });

//         deleteBtn.addEventListener('click', () => {
//             fetch(`/api/users/${user.id}`, {
//                 method: 'DELETE',
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to delete user');
//                 }
//                 return response.json();
//             })
//             .then(() => {
//                 fetchAllUsers();
//             })
//             .catch(error => {
//                 console.error('Error deleting user:', error);
//             });
//         });
//     }

//     function fetchAllUsers() {
//         fetch('/api/users')
//             .then(response => response.json())
//             .then(users => {
//                 usersContainer.innerHTML = '';
//                 if (users.length === 0) {
//                     usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">No users found.</td></tr>';
//                 } else {
//                     users.forEach(user => {
//                         displayUser(user);
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//                 usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">Failed to load users. Please try again later.</td></tr>';
//             });
//     }

//     function searchUsers(query) {
//         fetch(`/api/users/search?query=${query}`)
//             .then(response => response.json())
//             .then(users => {
//                 usersContainer.innerHTML = '';
//                 if (users.length === 0) {
//                     usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">No users found.</td></tr>';
//                 } else {
//                     users.forEach(user => {
//                         displayUser(user);
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error('Error searching users:', error);
//                 usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">Failed to load users. Please try again later.</td></tr>';
//             });
//     }

//     if (searchInput) {
//         searchInput.addEventListener('input', () => {
//             const query = searchInput.value.trim();
//             if (query) {
//                 searchUsers(query);
//             } else {
//                 fetchAllUsers();
//             }
//         });
//     }

//     addUserBtn.addEventListener('click', () => {
//         addUserSection.style.display = 'block';
//     });

//     cancelAddUserBtn.addEventListener('click', () => {
//         addUserSection.style.display = 'none';
//     });

//     addUserForm.addEventListener('submit', (event) => {
//         event.preventDefault();

//         const formData = new FormData(addUserForm);
//         const user = {
//             firstName: formData.get('firstName'),
//             lastName: formData.get('lastName'),
//             email: formData.get('email'),
//             password: formData.get('password'),
//             phoneNumber: formData.get('phoneNumber')
//         };

//         fetch('/api/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(user)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to add user');
//             }
//             return response.json();
//         })
//         .then(newUser => {
//             addUserSection.style.display = 'none';
//             fetchAllUsers(); // Refresh the user list
//         })
//         .catch(error => {
//             console.error('Error adding user:', error);
//         });
//     });

//     fetchAllUsers();
// });




// document.addEventListener('DOMContentLoaded', () => {
//     const searchInput = document.getElementById('search-user-input');
//     const usersContainer = document.getElementById('users-container');
//     const addUserBtn = document.getElementById('add-user-btn');
//     const addUserSection = document.getElementById('add-user-section');
//     const addUserForm = document.getElementById('add-user-form');
//     const cancelAddUserBtn = document.getElementById('cancel-add-user');

//     function formatDate(dateString) {
//         const date = new Date(dateString);
//         const options = {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit',
//         };
//         return date.toLocaleString('en-GB', options);
//     }

//     function displayUser(user) {
//         const formattedDate = formatDate(user.registrationDate);
//         const userRow = document.createElement('tr');
//         userRow.innerHTML = `
//             <td>${user.id}</td>
//             <td><input type="text" value="${user.firstName}" disabled></td>
//             <td><input type="text" value="${user.lastName}" disabled></td>
//             <td><input type="email" value="${user.email}" disabled></td>
//             <td><input type="text" value="${user.phoneNumber}" disabled></td>
//             <td>${formattedDate}</td>
//             <td>${user.role}</td>
//             <td><button class="edit-btn">Edit</button></td>
//             <td><button class="save-btn" disabled>Save</button></td>
//             <td><button class="delete-btn">Delete</button></td>
//         `;

//         usersContainer.appendChild(userRow);

//         const editBtn = userRow.querySelector('.edit-btn');
//         const saveBtn = userRow.querySelector('.save-btn');
//         const deleteBtn = userRow.querySelector('.delete-btn');
//         const inputs = userRow.querySelectorAll('input');

//         editBtn.addEventListener('click', () => {
//             inputs.forEach(input => input.disabled = false);
//             saveBtn.disabled = false;
//         });

//         saveBtn.addEventListener('click', () => {
//             const updatedUser = {
//                 id: user.id,
//                 firstName: inputs[0].value,
//                 lastName: inputs[1].value,
//                 email: inputs[2].value,
//                 phoneNumber: inputs[3].value,
//             };

//             fetch(`/api/users/${user.id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(updatedUser)
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to update user');
//                 }
//                 return response.json();
//             })
//             .then(() => {
//                 inputs.forEach(input => input.disabled = true);
//                 saveBtn.disabled = true;
//                 fetchAllUsers();
//             })
//             .catch(error => {
//                 console.error('Error updating user:', error);
//             });
//         });

//         deleteBtn.addEventListener('click', () => {
//             fetch(`/api/users/${user.id}`, {
//                 method: 'DELETE',
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to delete user');
//                 }
//                 return response.json();
//             })
//             .then(() => {
//                 fetchAllUsers();
//             })
//             .catch(error => {
//                 console.error('Error deleting user:', error);
//             });
//         });
//     }

//     function fetchAllUsers() {
//         fetch('/api/users')
//             .then(response => response.json())
//             .then(users => {
//                 usersContainer.innerHTML = '';
//                 if (users.length === 0) {
//                     usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">No users found.</td></tr>';
//                 } else {
//                     users.forEach(user => {
//                         displayUser(user);
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//                 usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">Failed to load users. Please try again later.</td></tr>';
//             });
//     }

//     function searchUsers(query) {
//         fetch(`/api/users/search?query=${query}`)
//             .then(response => response.json())
//             .then(users => {
//                 usersContainer.innerHTML = '';
//                 if (users.length === 0) {
//                     usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">No users found.</td></tr>';
//                 } else {
//                     users.forEach(user => {
//                         displayUser(user);
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error('Error searching users:', error);
//                 usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">Failed to load users. Please try again later.</td></tr>';
//             });
//     }

//     if (searchInput) {
//         searchInput.addEventListener('input', () => {
//             const query = searchInput.value.trim();
//             if (query) {
//                 searchUsers(query);
//             } else {
//                 fetchAllUsers();
//             }
//         });
//     }

//     addUserBtn.addEventListener('click', () => {
//         addUserSection.style.display = 'block';
//     });

//     cancelAddUserBtn.addEventListener('click', () => {
//         addUserSection.style.display = 'none';
//     });

//     addUserForm.addEventListener('submit', (event) => {
//         event.preventDefault();

//         const formData = new FormData(addUserForm);
//         const user = {
//             firstName: formData.get('firstName'),
//             lastName: formData.get('lastName'),
//             email: formData.get('email'),
//             password: formData.get('password'),
//             phoneNumber: formData.get('phoneNumber')
//         };

//         fetch('/api/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(user)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to add user');
//             }
//             return response.json();
//         })
//         .then(newUser => {
//             addUserSection.style.display = 'none';
//             fetchAllUsers(); // Refresh the user list
//         })
//         .catch(error => {
//             console.error('Error adding user:', error);
//         });
//     });

//     fetchAllUsers();
// });




document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-user-input');
    const usersContainer = document.getElementById('users-container');
    const addUserBtn = document.getElementById('add-user-btn');
    const addUserSection = document.getElementById('add-user-section');
    const addUserForm = document.getElementById('add-user-form');
    const cancelAddUserBtn = document.getElementById('cancel-add-user');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return date.toLocaleString('en-GB', options);
    }

    function displayUser(user) {
        const formattedDate = formatDate(user.registrationDate);
        const userRow = document.createElement('tr');
        userRow.innerHTML = `
            <td>${user.id}</td>
            <td><input type="text" value="${user.firstName}" disabled></td>
            <td><input type="text" value="${user.lastName}" disabled></td>
            <td><input type="email" value="${user.email}" disabled></td>
            <td><input type="text" value="${user.phoneNumber}" disabled></td>
            <td>${formattedDate}</td>
            <td>${user.role}</td>
            <td><button class="edit-btn">Edit</button></td>
            <td><button class="save-btn" disabled>Save</button></td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        usersContainer.appendChild(userRow);

        const editBtn = userRow.querySelector('.edit-btn');
        const saveBtn = userRow.querySelector('.save-btn');
        const deleteBtn = userRow.querySelector('.delete-btn');
        const inputs = userRow.querySelectorAll('input');

        editBtn.addEventListener('click', () => {
            inputs.forEach(input => input.disabled = false);
            saveBtn.disabled = false;
        });

        saveBtn.addEventListener('click', () => {
            const updatedUser = {
                id: user.id,
                firstName: inputs[0].value,
                lastName: inputs[1].value,
                email: inputs[2].value,
                phoneNumber: inputs[3].value,
            };

            fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
                return response.json();
            })
            .then(() => {
                inputs.forEach(input => input.disabled = true);
                saveBtn.disabled = true;
                fetchAllUsers();
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
        });

        deleteBtn.addEventListener('click', () => {
            fetch(`/api/users/${user.id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                return response.json();
            })
            .then(() => {
                fetchAllUsers();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
        });
    }

    function fetchAllUsers() {
        fetch('/api/users')
            .then(response => response.json())
            .then(users => {
                usersContainer.innerHTML = '';
                if (users.length === 0) {
                    usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">No users found.</td></tr>';
                } else {
                    users.forEach(user => {
                        displayUser(user);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">Failed to load users. Please try again later.</td></tr>';
            });
    }

    function searchUsers(query) {
        fetch(`/api/users/search?query=${query}`)
            .then(response => response.json())
            .then(users => {
                usersContainer.innerHTML = '';
                if (users.length === 0) {
                    usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">No users found.</td></tr>';
                } else {
                    users.forEach(user => {
                        displayUser(user);
                    });
                }
            })
            .catch(error => {
                console.error('Error searching users:', error);
                usersContainer.innerHTML = '<tr><td colspan="10" id="placeholder-text">Failed to load users. Please try again later.</td></tr>';
            });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchUsers(query);
            } else {
                fetchAllUsers();
            }
        });
    }

    addUserBtn.addEventListener('click', () => {
        addUserSection.style.display = 'block';
    });

    cancelAddUserBtn.addEventListener('click', () => {
        addUserSection.style.display = 'none';
    });

    addUserForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(addUserForm);
        const user = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            phoneNumber: formData.get('phoneNumber')
        };

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            return response.json();
        })
        .then(newUser => {
            addUserSection.style.display = 'none';
            fetchAllUsers(); // Refresh the user list
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
    });

    fetchAllUsers();
});
