document.addEventListener('DOMContentLoaded', () => {
    const selectedHeadphone = JSON.parse(localStorage.getItem('selectedHeadphone'));

    if (selectedHeadphone) {
        document.getElementById('headphone-details').querySelector('h3').textContent = selectedHeadphone.name;
        document.getElementById('mainImage').src = selectedHeadphone.images[selectedHeadphone.currentImageIndex];
        document.getElementById('headphone-price').textContent = selectedHeadphone.price;

        const specsList = document.getElementById('headphone-specs');
        specsList.innerHTML = `
            <li>Brand: ${selectedHeadphone.brand}</li>
            <li>Model: ${selectedHeadphone.model}</li>
            <li>Type: ${selectedHeadphone.type}</li>
            <li>Battery Life: ${selectedHeadphone.batteryLife}</li>
        `;

        function changeImage(direction) {
            selectedHeadphone.currentImageIndex += direction;
            if (selectedHeadphone.currentImageIndex < 0) {
                selectedHeadphone.currentImageIndex = selectedHeadphone.images.length - 1;
            } else if (selectedHeadphone.currentImageIndex >= selectedHeadphone.images.length) {
                selectedHeadphone.currentImageIndex = 0;
            }
            document.getElementById('mainImage').src = selectedHeadphone.images[selectedHeadphone.currentImageIndex];
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
    }
});
