document.addEventListener('DOMContentLoaded', () => {
    const itemNumber = localStorage.getItem('selectedItemNumber');
    const headphoneName = localStorage.getItem('selectedHeadphoneName');
    const headphoneSpecs = JSON.parse(localStorage.getItem('selectedHeadphoneSpecs'));
    const images = JSON.parse(localStorage.getItem('selectedHeadphoneImages'));

    // Debugging logs
    console.log("Fetched item number:", itemNumber);
    console.log("Fetched headphone name:", headphoneName);
    console.log("Fetched headphone specs:", headphoneSpecs);
    console.log("Fetched headphone images:", images);

    function changeImage(direction) {
        let currentImageIndex = images.findIndex(img => img === document.getElementById('mainImage').src);
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        document.getElementById('mainImage').src = images[currentImageIndex];
    }

    if (itemNumber) {
        fetch(`/api/admin/equipment/itemNumber/${itemNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(product => {
                document.getElementById('headphone-details').querySelector('h3').textContent = headphoneName;
                document.getElementById('mainImage').src = images[0];
                const specsList = document.getElementById('headphone-specs');
                specsList.innerHTML = headphoneSpecs.map(spec => `<li>${spec}</li>`).join('');
                document.getElementById('headphone-price').textContent = product.dailyRentalRate;
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
        const proceedButton = document.createElement('button');
        proceedButton.textContent = 'Proceed to Checkout';
        proceedButton.classList.add('btn');
        proceedButton.onclick = () => {
            window.location.href = 'payment.html';
        };
        document.getElementById('availability-form').appendChild(proceedButton);
    });
});
