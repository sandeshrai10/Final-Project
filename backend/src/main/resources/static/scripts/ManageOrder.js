

document.addEventListener('DOMContentLoaded', function() {
    let orders = [];

    // Fetch orders from the API
    function fetchOrders() {
        fetch('/api/payments/payment-items')
        .then(response => response.json())
        .then(data => {
            orders = data;
            displayOrders(orders);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
    }

    // Display orders in the table
    function displayOrders(ordersToDisplay) {
        const orderTableBody = document.getElementById('order-table-body');
        orderTableBody.innerHTML = '';

        ordersToDisplay.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.orderNumber}</td>
                <td>${new Date(order.transactionDate).toLocaleDateString()}</td>
                <td>$${order.totalAmount.toFixed(2)}</td>
                <td>${order.itemNumber}</td>
                <td>${order.itemName}</td>
                <td>${order.itemDescription}</td>
                <td>${order.itemQuantity}</td>
                <td>$${order.itemPrice.toFixed(2)}</td>
                <td><button class="delete-btn" data-id="${order.id}">Delete</button></td>
            `;
            orderTableBody.appendChild(row);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteOrderItem(id);
            });
        });
    }

    // Delete order item
    function deleteOrderItem(id) {
        fetch(`/api/payments/payment-items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Item deleted successfully!');
                fetchOrders(); // Refresh the order list
            } else {
                response.text().then(text => alert(text));
            }
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
    }

    // Filter orders based on search input
    function filterOrders() {
        const searchTerm = document.getElementById('search-bar').value.trim().toLowerCase();
        const filteredOrders = orders.filter(order => order.orderNumber.toLowerCase().includes(searchTerm));
        displayOrders(filteredOrders);
    }

    // Event listener for search input
    document.getElementById('search-bar').addEventListener('input', filterOrders);

    // Initial fetch and display of orders
    fetchOrders();
});
