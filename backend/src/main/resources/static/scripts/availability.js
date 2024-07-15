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
    const selectedLaptop = JSON.parse(localStorage.getItem('selectedLaptop'));
    if (selectedLaptop) {
        // Fetch equipment details from the backend using item number
        fetch(`/api/admin/equipment/itemNumber/${selectedLaptop.itemNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                updateProductDetails(data, selectedLaptop);
            })
            .catch(error => {
                console.error('Error fetching availability:', error);
                alert('Error fetching availability: ' + error.message);
            });
    }
});

function updateProductDetails(product, selectedLaptop) {
    document.getElementById('product-name').textContent = product.name;
    images = selectedLaptop.images; // Use images from selectedLaptop as they might not be in the backend
    document.getElementById('mainImage').src = images[0];
    const specsList = document.getElementById('product-specs');
    specsList.innerHTML = selectedLaptop.specs.map(spec => `<li>${spec}</li>`).join('');
    document.getElementById('product-price').textContent = `Price per day: $${product.dailyRentalRate}`;
    document.getElementById('stock-quantity').textContent = `Stock Quantity: ${product.stockQuantity}`;
    document.getElementById('status').textContent = `Status: ${product.availability ? 'Available' : 'Not Available'}`;
}

document.getElementById('availability-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    alert(`Availability checked for dates: ${startDate} to ${endDate}`);
    // If available, show the "Proceed to Checkout" button
    const proceedButton = document.createElement('button');
    proceedButton.textContent = 'Proceed to Checkout';
    proceedButton.classList.add('btn');
    proceedButton.onclick = () => {
        window.location.href = 'payment.html';
    };
    document.getElementById('availability-form').appendChild(proceedButton);
});
