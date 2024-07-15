
const tablets = [
    {
        id: 1,
        itemNumber: 3001,
        name: "Apple iPad Air (5th Generation)",
        processor: "Apple A15 Bionic chip with 6-core CPU and 5-core GPU",
        display: "10.9-inch Liquid Retina display with True Tone",
        storageOptions: "64GB or 256GB",
        camera: "12MP rear camera, 12MP ultra-wide front camera",
        price: 599,
        brand: "apple",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    },
    {
        id: 2,
        itemNumber: 3002,
        name: "Apple iPad Pro (M1, 5th Generation)",
        processor: "Apple M1 chip with 8-core CPU and 8-core GPU",
        display: "11-inch Liquid Retina display (2388 x 1668 resolution) or 12.9-inch Liquid Retina XDR display (2732 x 2048 resolution)",
        storageOptions: "128GB, 256GB, 512GB, 1TB, or 2TB",
        camera: "12MP Wide and 10MP Ultra Wide rear cameras, 12MP TrueDepth front camera",
        price: 799,
        brand: "apple",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    },
    {
        id: 3,
        itemNumber: 3003,
        name: "iPad Mini (6th Generation)",
        processor: "Apple A15 Bionic chip with 6-core CPU and 5-core GPU",
        display: "8.3-inch Liquid Retina display with True Tone",
        storageOptions: "64GB or 256GB",
        camera: "12MP Wide rear camera, 12MP Ultra Wide front camera",
        price: 499,
        brand: "apple",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    },
    {
        id: 4,
        itemNumber: 3004,
        name: "Microsoft Surface Pro 7",
        processor: "Intel Core i3/i5/i7 options available",
        display: "12.3-inch PixelSense display with 2736 x 1824 resolution",
        storageOptions: "128GB, 256GB, 512GB, or 1TB SSD",
        camera: "8MP rear camera, 5MP front-facing camera",
        price: 749,
        brand: "microsoft",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    },
    {
        id: 5,
        itemNumber: 3005,
        name: "Amazon Fire HD 10 (11th Generation)",
        processor: "Octa-core processor",
        display: "10.1-inch Full HD display",
        storageOptions: "32GB or 64GB (expandable up to 1TB via microSD card)",
        camera: "5MP rear camera, 2MP front-facing camera",
        price: 149.99,
        brand: "amazon",
        images: ["front.png", "sideview.png", "top.png"],
        currentImageIndex: 0
    }
];


function displayTablets(tabletList) {
    const container = document.getElementById('tablets-container');
    if (!container) {
        return;
    }
    container.innerHTML = '';
    tabletList.forEach(tablet => {
        const tabletElement = document.createElement('div');
        tabletElement.className = 'tablet-item';
        tabletElement.innerHTML = `
            <h3>${tablet.name}</h3>
            <div class="image-gallery">
                <div class="main-image">
                    <img src="${tablet.images[tablet.currentImageIndex]}" alt="${tablet.name}" id="mainImage${tablet.itemNumber}" width="300" height="200">
                </div>
                <div class="arrows">
                    <button class="prev" onclick="changeTabletImage(-1, ${tablet.itemNumber})">&#10094;</button>
                    <button class="next" onclick="changeTabletImage(1, ${tablet.itemNumber})">&#10095;</button>
                </div>
            </div>
            <ul>
                <li>Processor: ${tablet.processor}</li>
                <li>Display: ${tablet.display}</li>
                <li>Storage Options: ${tablet.storageOptions}</li>
                <li>Camera: ${tablet.camera}</li>
            </ul>
            <p><strong>Price: $${tablet.price}</strong></p>
            <button class="btn" onclick="checkTabletAvailability(${tablet.itemNumber})">Check Availability</button>
        `;
        container.appendChild(tabletElement);
    });
}

window.changeTabletImage = function(direction, itemNumber) {
    const tablet = tablets.find(tab => tab.itemNumber === itemNumber);
    tablet.currentImageIndex += direction;

    if (tablet.currentImageIndex < 0) {
        tablet.currentImageIndex = tablet.images.length - 1;
    } else if (tablet.currentImageIndex >= tablet.images.length) {
        tablet.currentImageIndex = 0;
    }

    document.getElementById(`mainImage${itemNumber}`).src = tablet.images[tablet.currentImageIndex];
};

window.checkTabletAvailability = function(itemNumber) {
    const tablet = tablets.find(tab => tab.itemNumber === itemNumber);

    if (!tablet) {
        console.error("Tablet not found for Item Number:", itemNumber);
        return;
    }

    localStorage.setItem('selectedItemNumber', tablet.itemNumber);
    localStorage.setItem('selectedTabletName', tablet.name);
    localStorage.setItem('selectedTabletSpecs', JSON.stringify({
        processor: tablet.processor,
        display: tablet.display,
        storageOptions: tablet.storageOptions,
        camera: tablet.camera
    }));
    localStorage.setItem('selectedTabletImages', JSON.stringify(tablet.images));

    window.location.href = 'availability_tablet.html';
};

document.getElementById('apply-changes-btn').addEventListener('click', () => {
    const category = document.getElementById('categories').value;
    const priceSort = document.getElementById('price').value;
    let filteredTablets = tablets;

    if (category !== 'all') {
        filteredTablets = tablets.filter(tablet => tablet.brand === category);
    }

    if (priceSort === 'low-to-high') {
        filteredTablets.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-to-low') {
        filteredTablets.sort((a, b) => b.price - a.price);
    }

    displayTablets(filteredTablets);
});

const tabletSearchForm = document.getElementById('search-form');
if (tabletSearchForm) {
    tabletSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = document.getElementById('search-input').value.toLowerCase();
        const filteredTablets = tablets.filter(tablet =>
            tablet.name.toLowerCase().includes(query) ||
            tablet.brand.toLowerCase().includes(query)
        );
        displayTablets(filteredTablets);
    });
}

// Display all tablets by default
if (document.getElementById('tablets-container')) {
    displayTablets(tablets);
}