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
    const selectedEquipment = JSON.parse(localStorage.getItem('selectedEquipment'));
    if (selectedEquipment) {
        document.getElementById('product-name').textContent = selectedEquipment.name;
        images = selectedEquipment.images;
        document.getElementById('mainImage').src = images[0];
        const specsList = document.getElementById('product-specs');
        specsList.innerHTML = selectedEquipment.specs.map(spec => `<li>${spec}</li>`).join('');
        document.getElementById('product-price').textContent = `Price per day: $${selectedEquipment.dailyRentalRate}`;
        document.getElementById('product-quantity').textContent = `Stock Quantity: ${selectedEquipment.stockQuantity}`;
        document.getElementById('product-status').textContent = `Status: ${selectedEquipment.availability ? 'Available' : 'Not Available'}`;
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
});
