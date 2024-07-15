 // Camera related code...
 const cameras = [
    {
        id: 1,
        itemNumber: 2001,
        name: "Fujifilm X-T30 II",
        sensor: "26.1 megapixel APS-C X-Trans CMOS 4 sensor",
        processor: "X-Processor 4",
        isoRange: "160-12800 (expandable to 80-51200)",
        autofocus: "Hybrid AF with 425 points",
        video: "4K at 30p, Full HD at 240p",
        display: "3.0\" tilting touchscreen LCD",
        price: 899,
        brand: "fujifilm",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    },
    {
        id: 2,
        itemNumber: 2002,
        name: "Sony A7 III",
        sensor: "24.2 megapixel full-frame Exmor R CMOS sensor",
        processor: "BIONZ X image processor",
        isoRange: "100-51200 (expandable to 50-204800)",
        autofocus: "Fast Hybrid AF with 693 phase-detection and 425 contrast-detection points",
        video: "4K HDR at 30p, Full HD at 120p",
        display: "3.0\" tilting touchscreen LCD",
        price: 1999,
        brand: "sony",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    },
    {
        id: 3,
        itemNumber: 2003,
        name: "Canon PowerShot SX70 HS",
        sensor: "20.3 megapixel 1/2.3\" CMOS sensor",
        processor: "DIGIC 8",
        isoRange: "100-3200 (expandable to 6400)",
        autofocus: "65x optical zoom lens (21-1365mm equivalent)",
        video: "Full HD at 60p",
        display: "3.0\" vari-angle LCD",
        price: 549,
        brand: "canon",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    },
    {
        id: 4,
        itemNumber: 2004,
        name: "Sony ZV-E10",
        sensor: "24.2 megapixel APS-C Exmor CMOS sensor",
        processor: "BIONZ X image processor",
        isoRange: "100-32000 (expandable to 100-51200)",
        autofocus: "Fast Hybrid AF with 425 phase-detection and 425 contrast-detection points",
        video: "4K HDR at 30p, Full HD at 120p",
        display: "3.0\" vari-angle touchscreen LCD",
        price: 699,
        brand: "sony",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    },
    {
        id: 5,
        itemNumber: 2005,
        name: "Fujifilm X-S10",
        sensor: "26.1 megapixel APS-C X-Trans CMOS 4 sensor",
        processor: "X-Processor 4",
        isoRange: "160-12800 (expandable to 80-51200)",
        autofocus: "Hybrid AF with 425 points",
        video: "4K at 30p, Full HD at 240p",
        imageStabilization: "5-axis in-body image stabilization",
        display: "3.0\" vari-angle touchscreen LCD",
        price: 999,
        brand: "fujifilm",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    },
    {
        id: 6,
        itemNumber: 2006,
        name: "Canon EOS 90D",
        sensor: "32.5 megapixel APS-C CMOS sensor",
        processor: "DIGIC 8",
        isoRange: "100-25600 (expandable to 51200)",
        autofocus: "45-point all cross-type AF system",
        video: "4K at 30p, Full HD at 120p",
        display: "3.0\" vari-angle touchscreen LCD",
        price: 1199,
        brand: "canon",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    }
];

function displayCameras(filteredCameras) {
    if (!Array.isArray(filteredCameras)) {
        console.error("Expected filteredCameras to be an array, got:", typeof filteredCameras);
        return;
    }
    const camerasContainer = document.getElementById('cameras-container');
    if (!camerasContainer) {
        return;
    }
    camerasContainer.innerHTML = '';

    filteredCameras.forEach(camera => {
        const cameraItem = document.createElement('div');
        cameraItem.className = 'camera-item';
        cameraItem.innerHTML = `
            <div class="image-gallery">
                <div class="main-image">
                    <img src="${camera.images[camera.currentImageIndex]}" alt="${camera.name}" width="300" height="200" id="mainImage${camera.itemNumber}">
                </div>
                <div class="arrows">
                    <button class="prev" onclick="changeCameraImage(-1, ${camera.itemNumber})">&#10094;</button>
                    <button class="next" onclick="changeCameraImage(1, ${camera.itemNumber})">&#10095;</button>
                </div>
            </div>
            <div class="camera-details">
                <h3>${camera.name}</h3>
                <ul>
                    <li>Sensor: ${camera.sensor}</li>
                    <li>Processor: ${camera.processor}</li>
                    <li>ISO Range: ${camera.isoRange}</li>
                    <li>Autofocus: ${camera.autofocus}</li>
                    <li>Video: ${camera.video}</li>
                    <li>Display: ${camera.display}</li>
                </ul>
                <p><strong>Price: $${camera.price}</strong></p>
                <button class="btn" onclick="checkCameraAvailability(${camera.itemNumber})">Check Availability</button>
            </div>
        `;
        camerasContainer.appendChild(cameraItem);
    });
}

window.changeCameraImage = function(direction, itemNumber) {
    const camera = cameras.find(cam => cam.itemNumber === itemNumber);
    camera.currentImageIndex += direction;

    if (camera.currentImageIndex < 0) {
        camera.currentImageIndex = camera.images.length - 1;
    } else if (camera.currentImageIndex >= camera.images.length) {
        camera.currentImageIndex = 0;
    }

    document.getElementById(`mainImage${itemNumber}`).src = camera.images[camera.currentImageIndex];
};

window.checkCameraAvailability = function(itemNumber) {
    const camera = cameras.find(cam => cam.itemNumber === itemNumber);

    if (!camera) {
        console.error("Camera not found for Item Number:", itemNumber);
        return;
    }

    localStorage.setItem('selectedItemNumber', camera.itemNumber);
    localStorage.setItem('selectedCameraName', camera.name);
    localStorage.setItem('selectedCameraSpecs', JSON.stringify([
        `Sensor: ${camera.sensor}`,
        `Processor: ${camera.processor}`,
        `ISO Range: ${camera.isoRange}`,
        `Autofocus: ${camera.autofocus}`,
        `Video: ${camera.video}`,
        `Display: ${camera.display}`
    ]));
    localStorage.setItem('selectedCameraImages', JSON.stringify(camera.images));

    window.location.href = 'availability_camera.html';
};



function filterCameras() {
    const category = document.getElementById('categories').value;
    let filteredCameras = cameras;

    if (category !== 'all') {
        filteredCameras = cameras.filter(camera => camera.brand === category);
    }

    return filteredCameras;
}

function applyChanges() {
    let filteredCameras = filterCameras();
    displayCameras(filteredCameras);
}

function searchCameras(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredCameras = cameras.filter(camera =>
        camera.name.toLowerCase().includes(searchTerm)
    );

    displayCameras(filteredCameras);
}

// Initial display of all cameras
if (document.getElementById('cameras-container')) {
    displayCameras(cameras);
}

// Event listeners for category and price filter
const searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', searchCameras);
}

const applyChangesBtn = document.getElementById('apply-changes-btn');
if (applyChangesBtn) {
    applyChangesBtn.addEventListener('click', applyChanges);
}