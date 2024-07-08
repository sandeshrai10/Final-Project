let currentImageIndex = 0;
let selectedCamera = JSON.parse(localStorage.getItem('selectedCamera'));

if (selectedCamera) {
    document.getElementById('camera-name').textContent = selectedCamera.name;
    document.getElementById('mainImage').src = selectedCamera.images[0];
    document.getElementById('camera-price').textContent = `Price per day: $${selectedCamera.price}`;

    const specsList = document.getElementById('camera-specs');
    const specs = [
        `Sensor: ${selectedCamera.sensor}`,
        `Processor: ${selectedCamera.processor}`,
        `ISO Range: ${selectedCamera.isoRange}`,
        `Autofocus: ${selectedCamera.autofocus}`,
        `Video: ${selectedCamera.video}`,
        `Display: ${selectedCamera.display}`
    ];

    if (selectedCamera.imageStabilization) {
        specs.push(`Image Stabilization: ${selectedCamera.imageStabilization}`);
    }

    specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });
}

const images = selectedCamera.images;

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    document.getElementById('mainImage').src = images[currentImageIndex];
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
