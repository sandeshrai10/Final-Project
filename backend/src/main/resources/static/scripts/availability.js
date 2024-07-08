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
    const selectedCamera = JSON.parse(localStorage.getItem('selectedCamera'));
    let product;

    if (selectedLaptop) {
        product = selectedLaptop;
    } else if (selectedCamera) {
        product = selectedCamera;
    }

    if (product) {
        document.getElementById('product-name').textContent = product.name;
        images = product.images;
        document.getElementById('mainImage').src = images[0];
        const specsList = document.getElementById('product-specs');
        specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');
        document.getElementById('product-price').textContent = `Price per day: $${product.price}`;
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
