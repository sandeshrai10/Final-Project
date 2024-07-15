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
    const cameraName = localStorage.getItem('selectedCameraName');
    const cameraSpecs = JSON.parse(localStorage.getItem('selectedCameraSpecs'));
    images = JSON.parse(localStorage.getItem('selectedCameraImages'));

    // Debugging logs
    console.log("Fetched item number:", itemNumber);
    console.log("Fetched camera name:", cameraName);
    console.log("Fetched camera specs:", cameraSpecs);
    console.log("Fetched camera images:", images);

    // Check if required elements exist
    const productNameElem = document.getElementById('product-name');
    const mainImageElem = document.getElementById('mainImage');
    const specsListElem = document.getElementById('product-specs');
    const productPriceElem = document.getElementById('product-price');
    const stockQuantityElem = document.getElementById('stock-quantity');
    const statusElem = document.getElementById('status');

    if (!itemNumber || !cameraName || !cameraSpecs || !images) {
        console.error("Missing data in localStorage");
        alert("Missing data in localStorage. Please select a camera from the cameras page.");
        return;
    }

    if (itemNumber) {
        fetch(`/api/admin/equipment/itemNumber/${itemNumber}`)
            .then(response => {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(product => {
                if (productNameElem) {
                    productNameElem.textContent = cameraName;
                }
                if (mainImageElem) {
                    mainImageElem.src = images[0];
                }
                if (specsListElem) {
                    specsListElem.innerHTML = cameraSpecs.map(spec => `<li>${spec}</li>`).join('');
                }
                if (productPriceElem) {
                    productPriceElem.textContent = `Price per day: $${product.dailyRentalRate}`;
                }
                if (stockQuantityElem) {
                    stockQuantityElem.textContent = `Stock Quantity: ${product.stockQuantity}`;
                }
                if (statusElem) {
                    statusElem.textContent = `Status: ${product.availability ? 'Available' : 'Not Available'}`;
                }
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
