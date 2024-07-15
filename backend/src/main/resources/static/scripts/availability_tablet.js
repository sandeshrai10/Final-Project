document.addEventListener('DOMContentLoaded', function() {
    const itemNumber = localStorage.getItem('selectedItemNumber');
    const tabletName = localStorage.getItem('selectedTabletName');
    const tabletSpecs = JSON.parse(localStorage.getItem('selectedTabletSpecs'));
    const images = JSON.parse(localStorage.getItem('selectedTabletImages'));
    let currentImageIndex = 0;

    if (itemNumber) {
        fetch(`/api/admin/equipment/itemNumber/${itemNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(product => {
                document.getElementById('tablet-details').querySelector('h3').textContent = tabletName;
                document.getElementById('mainImage').src = images[currentImageIndex];

                const specsList = document.getElementById('tablet-specs');
                specsList.innerHTML = `
                    <li>Processor: ${tabletSpecs.processor}</li>
                    <li>Display: ${tabletSpecs.display}</li>
                    <li>Storage Options: ${tabletSpecs.storageOptions}</li>
                    <li>Camera: ${tabletSpecs.camera}</li>
                `;

                document.getElementById('tablet-price').textContent = product.dailyRentalRate;
                document.getElementById('stock-quantity').textContent = `Stock Quantity: ${product.stockQuantity}`;
                document.getElementById('status').textContent = `Status: ${product.availability ? 'Available' : 'Not Available'}`;
            })
            .catch(error => {
                console.error('Error fetching availability:', error);
                alert('Error fetching availability: ' + error.message);
            });
    }

    function changeImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        document.getElementById('mainImage').src = images[currentImageIndex];
    }

    document.querySelector('.arrows .prev').addEventListener('click', () => changeImage(-1));
    document.querySelector('.arrows .next').addEventListener('click', () => changeImage(1));

    document.getElementById('availability-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        alert(`Availability checked for dates: ${startDate} to ${endDate}`);
        const proceedButton = document.createElement('button');
        proceedButton.textContent = 'Proceed to Checkout';
        proceedButton.classList.add('btn');
        proceedButton.onclick = () => {
            window.location.href = 'payment.html';
        };
        document.getElementById('availability-form').appendChild(proceedButton);
    });
});
