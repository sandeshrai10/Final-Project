




let currentImageIndex = 0;
let images = [];

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    document.getElementById('mainImage').src = images[currentImageIndex];
}

document.addEventListener('DOMContentLoaded', function() {
    const itemNumber = localStorage.getItem('selectedItemNumber');
    const laptopName = localStorage.getItem('selectedLaptopName');
    const laptopSpecs = JSON.parse(localStorage.getItem('selectedLaptopSpecs'));
    images = JSON.parse(localStorage.getItem('selectedLaptopImages'));

    // Restrict past dates in date inputs
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').setAttribute('min', today);
    document.getElementById('end-date').setAttribute('min', today);

    if (itemNumber) {
        fetch(`/api/admin/equipment/itemNumber/${itemNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(product => {
                document.getElementById('product-name').textContent = laptopName;
                document.getElementById('mainImage').src = images[0];
                const specsList = document.getElementById('product-specs');
                specsList.innerHTML = laptopSpecs.map(spec => `<li>${spec}</li>`).join('');
                document.getElementById('product-price').textContent = `Price per day: $${product.dailyRentalRate}`;
                document.getElementById('stock-quantity').textContent = `Stock Quantity: ---`;
                document.getElementById('status').textContent = `Status: ---`;
            })
            .catch(error => {
                console.error('Error fetching availability:', error);
                alert('Error fetching availability: ' + error.message);
            });
    }

    document.getElementById('check-availability-btn').addEventListener('click', function(event) {
        event.preventDefault();
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        if (new Date(startDate) >= new Date(endDate)) {
            alert('Start date must be less than end date.');
            return;
        }

        fetch(`/api/payments/payment-items?itemNumber=${itemNumber}`)
            .then(response => response.json())
            .then(paymentItems => {
                let effectiveStockQuantity = 0;

                // Fetch current stock quantity
                fetch(`/api/admin/equipment/itemNumber/${itemNumber}`)
                    .then(response => response.json())
                    .then(equipment => {
                        effectiveStockQuantity = equipment.stockQuantity;

                        // Check each payment item
                        paymentItems.forEach(item => {
                            if (new Date(startDate) > new Date(item.endDate)) {
                                effectiveStockQuantity += item.itemQuantity;
                            }
                        });

                        document.getElementById('stock-quantity').textContent = `Stock Quantity: ${effectiveStockQuantity}`;
                        const statusText = effectiveStockQuantity > 0 ? 'Available' : 'Not Available';
                        document.getElementById('status').textContent = `Status: ${statusText}`;
                    })
                    .catch(error => {
                        console.error('Error fetching stock quantity:', error);
                        alert('Error fetching stock quantity: ' + error.message);
                    });
            })
            .catch(error => {
                console.error('Error fetching payment items:', error);
                alert('Error fetching payment items: ' + error.message);
            });
    });

    document.getElementById('availability-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const stockQuantity = parseInt(document.getElementById('stock-quantity').textContent.split(' ')[2]);
        const productName = document.getElementById('product-name').textContent;
        const productPrice = parseFloat(document.getElementById('product-price').textContent.split('$')[1]);
        const productImage = document.getElementById('mainImage').src;

        // Validate the input
        if (quantity <= 0 || quantity > stockQuantity) {
            alert('Invalid quantity. Please enter a quantity between 1 and the available stock.');
            return;
        }

        const rentalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = productPrice * quantity * rentalDays;

        const cartItem = {
            itemNumber: itemNumber,
            name: productName,
            startDate: startDate,
            endDate: endDate,
            price: totalPrice.toFixed(2),
            image: productImage,
            quantity: quantity
        };

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        alert('Item added to cart!');
        location.reload(); // Refresh the page after successfully adding to the cart
    });
});
