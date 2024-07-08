document.addEventListener('DOMContentLoaded', () => {
    const selectedTablet = JSON.parse(localStorage.getItem('selectedTablet'));

    if (selectedTablet) {
        document.getElementById('tablet-details').querySelector('h3').textContent = selectedTablet.name;
        document.getElementById('mainImage').src = selectedTablet.images[selectedTablet.currentImageIndex];
        document.getElementById('tablet-price').textContent = selectedTablet.price;

        const specsList = document.getElementById('tablet-specs');
        specsList.innerHTML = `
            <li>Processor: ${selectedTablet.processor}</li>
            <li>Display: ${selectedTablet.display}</li>
            <li>Storage Options: ${selectedTablet.storageOptions}</li>
            <li>Camera: ${selectedTablet.camera}</li>
        `;

        function changeImage(direction) {
            selectedTablet.currentImageIndex += direction;
            if (selectedTablet.currentImageIndex < 0) {
                selectedTablet.currentImageIndex = selectedTablet.images.length - 1;
            } else if (selectedTablet.currentImageIndex >= selectedTablet.images.length) {
                selectedTablet.currentImageIndex = 0;
            }
            document.getElementById('mainImage').src = selectedTablet.images[selectedTablet.currentImageIndex];
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
