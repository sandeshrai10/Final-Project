document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('manage-equipment-btn').addEventListener('click', loadManageEquipment);
    document.getElementById('manage-feedback-btn').addEventListener('click', () => {
        window.location.href = 'adminReviews.html';
    });
    document.getElementById('manage-users-btn').addEventListener('click', () => {
        window.location.href = 'adminUsers.html'; 
    });
});



function loadManageEquipment() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div id="manage-equipment-section">
            <h2>Manage Equipment</h2>
            <form id="add-equipment-form">
                <h3>Add Equipment</h3>
                <label for="itemNumber">Item Number:</label>
                <input type="number" id="itemNumber" name="itemNumber" required><br>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>
                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea><br>
                <label for="category">Category:</label>
                <select id="category" name="category" required>
                    <option value="Cameras">Cameras</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Tablets">Tablets</option>
                </select><br>
                <label for="stockQuantity">Stock Quantity:</label>
                <input type="number" id="stockQuantity" name="stockQuantity" required><br>
                <label for="dailyRentalRate">Daily Rental Rate:</label>
                <input type="number" id="dailyRentalRate" name="dailyRentalRate" required><br>
                <label for="status">Status:</label>
                <select id="status" name="status" required>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                </select><br>
                <button type="submit">Add Equipment</button>
            </form>
            <div id="equipment-list">
                <h3>Equipment List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Item Number</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Stock Quantity</th>
                            <th>Daily Rental Rate</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Save</th>
                        </tr>
                    </thead>
                    <tbody id="equipment-list-body">
                        <!-- Equipment list will be dynamically loaded here -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('add-equipment-form').addEventListener('submit', addEquipment);
    loadEquipmentList();
}

function loadEquipmentList() {
    fetch('/api/admin/equipment')
        .then(response => response.json())
        .then(data => {
            const equipmentListBody = document.getElementById('equipment-list-body');
            equipmentListBody.innerHTML = '';

            data.forEach(equipment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${equipment.id}</td>
                    <td>${equipment.itemNumber}</td>
                    <td><input type="text" id="edit-name-${equipment.id}" value="${equipment.name}" disabled></td>
                    <td><textarea id="edit-description-${equipment.id}" disabled>${equipment.description}</textarea></td>
                    <td>
                        <select id="edit-category-${equipment.id}" disabled>
                            <option value="Cameras" ${equipment.category === 'Cameras' ? 'selected' : ''}>Cameras</option>
                            <option value="Headphones" ${equipment.category === 'Headphones' ? 'selected' : ''}>Headphones</option>
                            <option value="Laptops" ${equipment.category === 'Laptops' ? 'selected' : ''}>Laptops</option>
                            <option value="Tablets" ${equipment.category === 'Tablets' ? 'selected' : ''}>Tablets</option>
                        </select>
                    </td>
                    <td><input type="number" id="edit-stockQuantity-${equipment.id}" value="${equipment.stockQuantity}" disabled></td>
                    <td><input type="number" id="edit-dailyRentalRate-${equipment.id}" value="${equipment.dailyRentalRate}" disabled></td>
                    <td>
                        <select id="edit-status-${equipment.id}" disabled>
                            <option value="Available" ${equipment.availability ? 'selected' : ''}>Available</option>
                            <option value="Not Available" ${!equipment.availability ? 'selected' : ''}>Not Available</option>
                        </select>
                    </td>
                    <td><button class="edit" onclick="enableEditing(${equipment.id})">Edit</button></td>
                    <td><button class="delete" onclick="deleteEquipment(${equipment.id})">Delete</button></td>
                    <td><button class="save" id="save-${equipment.id}" onclick="saveEquipment(${equipment.id})" style="display:none;">Save</button></td>
                `;
                equipmentListBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error loading equipment list:', error);
        });
}

function addEquipment(event) {
    event.preventDefault();

    const itemNumber = document.getElementById('itemNumber').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const stockQuantity = document.getElementById('stockQuantity').value;
    const dailyRentalRate = document.getElementById('dailyRentalRate').value;
    const availability = document.getElementById('status').value === 'Available';

    // Validate itemNumber
    if (!itemNumber || isNaN(itemNumber)) {
        alert('Item Number must be a valid number and cannot be empty');
        return;
    }

    // Check for unique itemNumber
    fetch('/api/admin/equipment')
        .then(response => response.json())
        .then(data => {
            if (data.some(equipment => equipment.itemNumber === itemNumber)) {
                alert('Item Number must be unique');
                throw new Error('Item Number must be unique');
            }

            const equipment = {
                itemNumber,
                name,
                description,
                category,
                stockQuantity,
                dailyRentalRate,
                availability
            };

            return fetch('/api/admin/equipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(equipment)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            loadEquipmentList(); // Refresh the equipment list
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function enableEditing(id) {
    document.getElementById(`edit-name-${id}`).disabled = false;
    document.getElementById(`edit-description-${id}`).disabled = false;
    document.getElementById(`edit-category-${id}`).disabled = false;
    document.getElementById(`edit-stockQuantity-${id}`).disabled = false;
    document.getElementById(`edit-dailyRentalRate-${id}`).disabled = false;
    document.getElementById(`edit-status-${id}`).disabled = false;
    document.getElementById(`save-${id}`).style.display = 'inline';
}

function saveEquipment(id) {
    const updatedEquipment = {
        id: id,
        itemNumber: document.getElementById(`edit-itemNumber-${id}`).value,
        name: document.getElementById(`edit-name-${id}`).value,
        description: document.getElementById(`edit-description-${id}`).value,
        category: document.getElementById(`edit-category-${id}`).value,
        stockQuantity: document.getElementById(`edit-stockQuantity-${id}`).value,
        dailyRentalRate: document.getElementById(`edit-dailyRentalRate-${id}`).value,
        availability: document.getElementById(`edit-status-${id}`).value === 'Available'
    };

    fetch(`/api/admin/equipment/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEquipment)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Save failed');
    })
    .then(data => {
        console.log('Updated:', data);
        loadEquipmentList(); // Refresh the equipment list
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function deleteEquipment(id) {
    fetch(`/api/admin/equipment/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            loadEquipmentList(); // Refresh the equipment list
        } else {
            throw new Error('Delete failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
