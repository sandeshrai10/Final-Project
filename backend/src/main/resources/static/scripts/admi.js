document.addEventListener('DOMContentLoaded', () => {
    const addEquipmentForm = document.getElementById('add-equipment-form');
    const equipmentTableBody = document.getElementById('equipment-table').querySelector('tbody');

    // Fetch existing equipment from the server
    async function fetchEquipment() {
        try {
            const response = await fetch('/api/equipment');
            const equipmentList = await response.json();
            renderEquipmentList(equipmentList);
        } catch (error) {
            console.error('Error fetching equipment:', error);
        }
    }

    function renderEquipmentList(equipmentList) {
        equipmentTableBody.innerHTML = '';
        equipmentList.forEach((equipment) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${equipment.category}</td>
                <td>${equipment.name}</td>
                <td>${equipment.description}</td>
                <td>${equipment.dailyRentalRate}</td>
                <td>${equipment.availability}</td>
                <td>
                    <button onclick="editEquipment(${equipment.id})">Edit</button>
                    <button onclick="deleteEquipment(${equipment.id})">Delete</button>
                </td>
            `;
            equipmentTableBody.appendChild(row);
        });
    }

    addEquipmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newEquipment = {
            category: document.getElementById('equipment-type').value,
            name: document.getElementById('equipment-name').value,
            description: document.getElementById('equipment-description').value,
            dailyRentalRate: document.getElementById('equipment-price').value,
            availability: document.getElementById('equipment-availability').value
        };

        try {
            const response = await fetch('/api/equipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEquipment)
            });

            if (response.ok) {
                fetchEquipment();
                addEquipmentForm.reset();
            } else {
                console.error('Error adding equipment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    window.editEquipment = function(id) {
        // Fetch equipment details and fill the form for editing
        fetch(`/api/equipment/${id}`)
            .then(response => response.json())
            .then(equipment => {
                document.getElementById('equipment-type').value = equipment.category;
                document.getElementById('equipment-name').value = equipment.name;
                document.getElementById('equipment-description').value = equipment.description;
                document.getElementById('equipment-price').value = equipment.dailyRentalRate;
                document.getElementById('equipment-availability').value = equipment.availability;

                deleteEquipment(id); // Remove the old equipment entry before adding the updated one
            })
            .catch(error => console.error('Error fetching equipment details:', error));
    };

    window.deleteEquipment = async function(id) {
        try {
            const response = await fetch(`/api/equipment/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchEquipment();
            } else {
                console.error('Error deleting equipment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchEquipment();
});
