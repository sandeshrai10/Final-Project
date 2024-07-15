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

    // Debugging logs
    console.log("Fetched item number:", itemNumber);
    console.log("Fetched laptop name:", laptopName);
    console.log("Fetched laptop specs:", laptopSpecs);
    console.log("Fetched laptop images:", images);

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
                document.getElementById('stock-quantity').textContent = `Stock Quantity: ${product.stockQuantity}`;
                document.getElementById('status').textContent = `Status: ${product.availability ? 'Available' : 'Not Available'}`;
            })
            .catch(error => {
                console.error('Error fetching availability:', error);
                alert('Error fetching availability: ' + error.message);
            });
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
