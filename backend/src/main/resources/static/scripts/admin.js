document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('manage-equipment-btn').addEventListener('click', loadManageEquipment);
    document.getElementById('manage-orders-btn').addEventListener('click', loadManageOrders);
    document.getElementById('manage-users-btn').addEventListener('click', loadManageUsers);
    document.getElementById('manage-feedback-btn').addEventListener('click', loadManageFeedback);

    // Add event listener for add equipment form submission
    document.getElementById('add-equipment-form').addEventListener('submit', addEquipment);
});

function loadManageEquipment() {
    document.getElementById('content').innerHTML = document.getElementById('manage-equipment-section').outerHTML;
    document.getElementById('manage-equipment-section').style.display = 'block';
    loadEquipmentList();
}

function loadManageOrders() {
    // Implement loading of Manage Rental Orders section
}

function loadManageUsers() {
    // Implement loading of Manage Users section
}

function loadManageFeedback() {
    // Implement loading of Feedback and Reviews section
}

function loadEquipmentList() {
    // Fetch and display the list of equipment from the backend
    // This is a placeholder. You need to implement the actual fetching logic.
    const equipmentList = [
        { id: 1, name: 'Laptop', description: 'Dell XPS 13', category: 'Laptops', stockQuantity: 5, dailyRentalRate: 10 },
        { id: 2, name: 'Camera', description: 'Canon EOS R', category: 'Cameras', stockQuantity: 3, dailyRentalRate: 15 }
    ];

    const equipmentListBody = document.getElementById('equipment-list-body');
    equipmentListBody.innerHTML = '';

    equipmentList.forEach(equipment => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${equipment.id}</td>
            <td>${equipment.name}</td>
            <td>${equipment.description}</td>
            <td>${equipment.category}</td>
            <td>${equipment.stockQuantity}</td>
            <td>${equipment.dailyRentalRate}</td>
            <td><button class="edit" onclick="editEquipment(${equipment.id})">Edit</button></td>
            <td><button class="delete" onclick="deleteEquipment(${equipment.id})">Delete</button></td>
        `;

        equipmentListBody.appendChild(row);
    });
}

function addEquipment(event) {
    event.preventDefault();
    
    const equipment = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        stockQuantity: document.getElementById('stockQuantity').value,
        dailyRentalRate: document.getElementById('dailyRentalRate').value
    };

    fetch('/api/equipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(equipment)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        loadEquipmentList(); // Refresh the equipment list
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function editEquipment(id) {
    // Implement logic to fetch and populate equipment details in edit form
    alert(`Edit Equipment with ID: ${id} - Not yet implemented`);
}

function deleteEquipment(id) {
    // Implement logic to delete equipment
    alert(`Delete Equipment with ID: ${id} - Not yet implemented`);
}
