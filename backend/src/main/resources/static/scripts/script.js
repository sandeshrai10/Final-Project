document.addEventListener('DOMContentLoaded', () => {
    // Handle register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Registration successful!');
                    window.location.href = 'login.html';
                } else {
                    const error = await response.text();
                    alert(`Registration failed: ${error}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Registration failed.');
            }
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value
            };

            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const user = await response.json();
                    alert(`Welcome, ${user.firstName}!`);
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = 'index.html';
                } else {
                    alert('Login failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Login failed.');
            }
        });
    }

    // Reservation form submission
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Reservation submitted successfully!');
        });
    }

    // Toggle menu for small screens
    function toggleMenu() {
        const menu = document.querySelector('nav ul');
        menu.classList.toggle('active');
    }

    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Laptop related code
    const laptops = [
        // Laptop entries...
    ];
    function displayLaptops(filteredLaptops) {
        const laptopsContainer = document.getElementById('laptops-container');
        if (!laptopsContainer) {
            return;
        }
        laptopsContainer.innerHTML = '';

        filteredLaptops.forEach(laptop => {
            const laptopItem = document.createElement('div');
            laptopItem.className = 'laptop-item';
            laptopItem.innerHTML = `
                <div class="image-gallery">
                    <div class="main-image">
                        <img src="${laptop.images[laptop.currentImageIndex]}" alt="${laptop.name}" width="300" height="200" id="mainImage${laptop.id}">
                    </div>
                    <div class="arrows">
                        <button class="prev" onclick="changeImage(-1, ${laptop.id})">&#10094;</button>
                        <button class="next" onclick="changeImage(1, ${laptop.id})">&#10095;</button>
                    </div>
                </div>
                <div class="laptop-details">
                    <h3>${laptop.name}</h3>
                    <ul>
                        ${laptop.specs.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                    <p><strong>Price: $${laptop.price}</strong></p>
                    <button class="btn" onclick="checkAvailability(${laptop.id})">Check Availability</button>
                </div>
            `;
            laptopsContainer.appendChild(laptopItem);
        });
    }

    window.changeImage = function(direction, laptopId) {
        const laptop = laptops.find(l => l.id === laptopId);
        laptop.currentImageIndex += direction;

        if (laptop.currentImageIndex < 0) {
            laptop.currentImageIndex = laptop.images.length - 1;
        } else if (laptop.currentImageIndex >= laptop.images.length) {
            laptop.currentImageIndex = 0;
        }

        document.getElementById(`mainImage${laptopId}`).src = laptop.images[laptop.currentImageIndex];
    };

    window.checkAvailability = function(laptopId) {
        const laptop = laptops.find(l => l.id === laptopId);
        localStorage.setItem('selectedLaptop', JSON.stringify(laptop));
        window.location.href = 'availability.html';
    };

    function filterLaptops() {
        const category = document.getElementById('categories').value;
        let filteredLaptops = laptops;

        if (category !== 'all') {
            filteredLaptops = laptops.filter(laptop => laptop.category === category);
        }

        return filteredLaptops;
    }

    function sortLaptops(laptopsToSort) {
        const sortOption = document.getElementById('price').value;

        if (sortOption === 'low-to-high') {
            laptopsToSort.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'high-to-low') {
            laptopsToSort.sort((a, b) => b.price - a.price);
        }

        return laptopsToSort;
    }

    function applyChanges() {
        let filteredLaptops = filterLaptops();
        filteredLaptops = sortLaptops(filteredLaptops);
        displayLaptops(filteredLaptops);
    }

    function searchLaptops(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredLaptops = laptops.filter(laptop =>
            laptop.name.toLowerCase().includes(searchTerm)
        );

        displayLaptops(filteredLaptops);
    }

    // Initial display of all laptops
    if (document.getElementById('laptops-container')) {
        displayLaptops(laptops);
    }

    // Event listeners for category and price filter
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', searchLaptops);
    }

    const applyChangesBtn = document.getElementById('apply-changes-btn');
    if (applyChangesBtn) {
        applyChangesBtn.addEventListener('click', applyChanges);
    }

    // Camera related code...
    const cameras = [
        // Camera entries...
    ];

    function displayCameras(cameraList) {
        const container = document.getElementById('cameras-container');
        if (!container) {
            return;
        }
        container.innerHTML = '';
        cameraList.forEach(camera => {
            const cameraElement = document.createElement('div');
            cameraElement.className = 'camera-item';
            cameraElement.innerHTML = `
                <h3>${camera.name}</h3>
                <div class="image-gallery">
                    <div class="main-image">
                        <img src="${camera.images[camera.currentImageIndex]}" alt="${camera.name}" id="mainImage${camera.id}" width="300" height="200">
                    </div>
                    <div class="arrows">
                        <button class="prev" onclick="changeCameraImage(-1, ${camera.id})">&#10094;</button>
                        <button class="next" onclick="changeCameraImage(1, ${camera.id})">&#10095;</button>
                    </div>
                </div>
                <ul>
                    <li>Sensor: ${camera.sensor}</li>
                    <li>Processor: ${camera.processor}</li>
                    <li>ISO Range: ${camera.isoRange}</li>
                    <li>Autofocus: ${camera.autofocus}</li>
                    <li>Video: ${camera.video}</li>
                    <li>Display: ${camera.display}</li>
                </ul>
                <p><strong>Price: $${camera.price}</strong></p>
                <button class="btn" onclick="checkCameraAvailability(${camera.id})">Check Availability</button>
            `;
            container.appendChild(cameraElement);
        });
    }

    window.changeCameraImage = function(direction, cameraId) {
        const camera = cameras.find(cam => cam.id === cameraId);
        camera.currentImageIndex += direction;

        if (camera.currentImageIndex < 0) {
            camera.currentImageIndex = camera.images.length - 1;
        } else if (camera.currentImageIndex >= camera.images.length) {
            camera.currentImageIndex = 0;
        }

        document.getElementById(`mainImage${cameraId}`).src = camera.images[camera.currentImageIndex];
    };

    window.checkCameraAvailability = function(cameraId) {
        const camera = cameras.find(cam => cam.id === cameraId);
        localStorage.setItem('selectedCamera', JSON.stringify(camera));
        window.location.href = 'availability_camera.html';
    };

    const applyChangesBtnCamera = document.getElementById('apply-changes-btn');
    if (applyChangesBtnCamera) {
        applyChangesBtnCamera.addEventListener('click', () => {
            const category = document.getElementById('categories').value;
            const priceSort = document.getElementById('price').value;
            let filteredCameras = cameras;

            if (category !== 'all') {
                filteredCameras = cameras.filter(camera => camera.brand === category);
            }

            if (priceSort === 'low-to-high') {
                filteredCameras.sort((a, b) => a.price - b.price);
            } else if (priceSort === 'high-to-low') {
                filteredCameras.sort((a, b) => b.price - a.price);
            }

            displayCameras(filteredCameras);
        });
    }

    const cameraSearchForm = document.getElementById('search-form');
    if (cameraSearchForm) {
        cameraSearchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = document.getElementById('search-input').value.toLowerCase();
            const filteredCameras = cameras.filter(camera => 
                camera.name.toLowerCase().includes(query) || 
                camera.brand.toLowerCase().includes(query)
            );
            displayCameras(filteredCameras);
        });
    }

    // Display all cameras by default
    if (document.getElementById('cameras-container')) {
        displayCameras(cameras);
    }

    // Tablet related code...
    const tablets = [
        {
            id: 1,
            name: "Apple iPad Air (5th Generation)",
            processor: "Apple A15 Bionic chip with 6-core CPU and 5-core GPU",
            display: "10.9-inch Liquid Retina display with True Tone",
            storageOptions: "64GB or 256GB",
            camera: "12MP rear camera, 12MP ultra-wide front camera",
            price: 599,
            images: ["front.png", "sideview.png", "top.png"],
            currentImageIndex: 0
        },
        {
            id: 2,
            name: "Apple iPad Pro (M1, 5th Generation)",
            processor: "Apple M1 chip with 8-core CPU and 8-core GPU",
            displayOptions: "11-inch Liquid Retina display (2388 x 1668 resolution), 12.9-inch Liquid Retina XDR display (2732 x 2048 resolution)",
            storageOptions: "128GB, 256GB, 512GB, 1TB, or 2TB",
            camera: "12MP Wide and 10MP Ultra Wide rear cameras, 12MP TrueDepth front camera",
            price: 799,
            images: ["front.png", "sideview.png", "top.png"],
            currentImageIndex: 0
        },
        {
            id: 3,
            name: "iPad Mini (6th Generation)",
            processor: "Apple A15 Bionic chip with 6-core CPU and 5-core GPU",
            display: "8.3-inch Liquid Retina display with True Tone",
            storageOptions: "64GB or 256GB",
            camera: "12MP Wide rear camera, 12MP Ultra Wide front camera",
            price: 499,
            images: ["front.png", "sideview.png", "top.png"],
            currentImageIndex: 0
        },
        {
            id: 4,
            name: "Microsoft Surface Pro 7",
            processor: "Intel Core i3/i5/i7 options available",
            display: "12.3-inch PixelSense display with 2736 x 1824 resolution",
            storageOptions: "128GB, 256GB, 512GB, or 1TB SSD",
            camera: "8MP rear camera, 5MP front-facing camera",
            price: 749,
            images: ["front.png", "sideview.png", "top.png"],
            currentImageIndex: 0
        },
        {
            id: 5,
            name: "Amazon Fire HD 10 (11th Generation)",
            processor: "Octa-core processor",
            display: "10.1-inch Full HD display",
            storageOptions: "32GB or 64GB (expandable up to 1TB via microSD card)",
            camera: "5MP rear camera, 2MP front-facing camera",
            price: 149.99,
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
                        <img src="${tablet.images[tablet.currentImageIndex]}" alt="${tablet.name}" id="mainImage${tablet.id}" width="300" height="200">
                    </div>
                    <div class="arrows">
                        <button class="prev" onclick="changeTabletImage(-1, ${tablet.id})">&#10094;</button>
                        <button class="next" onclick="changeTabletImage(1, ${tablet.id})">&#10095;</button>
                    </div>
                </div>
                <ul>
                    <li>Processor: ${tablet.processor}</li>
                    <li>Display: ${tablet.display}</li>
                    <li>Storage Options: ${tablet.storageOptions}</li>
                    <li>Camera: ${tablet.camera}</li>
                </ul>
                <p><strong>Price: $${tablet.price}</strong></p>
                <button class="btn" onclick="checkTabletAvailability(${tablet.id})">Check Availability</button>
            `;
            container.appendChild(tabletElement);
        });
    }

    window.changeTabletImage = function(direction, tabletId) {
        const tablet = tablets.find(tab => tab.id === tabletId);
        tablet.currentImageIndex += direction;

        if (tablet.currentImageIndex < 0) {
            tablet.currentImageIndex = tablet.images.length - 1;
        } else if (tablet.currentImageIndex >= tablet.images.length) {
            tablet.currentImageIndex = 0;
        }

        document.getElementById(`mainImage${tabletId}`).src = tablet.images[tablet.currentImageIndex];
    };

    window.checkTabletAvailability = function(tabletId) {
        const tablet = tablets.find(tab => tab.id === tabletId);
        localStorage.setItem('selectedTablet', JSON.stringify(tablet));
        window.location.href = 'availability_tablet.html';
    };

    const applyChangesBtnTablet = document.getElementById('apply-changes-btn');
    if (applyChangesBtnTablet) {
        applyChangesBtnTablet.addEventListener('click', () => {
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
    }

    const tabletSearchForm = document.getElementById('search-form');
    if (tabletSearchForm) {
        tabletSearchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = document.getElementById('search-input').value.toLowerCase();
            const filteredTablets = tablets.filter(tablet => 
                tablet.name.toLowerCase().includes(query)
            );
            displayTablets(filteredTablets);
        });
    }

    // Display all tablets by default
    if (document.getElementById('tablets-container')) {
        displayTablets(tablets);
    }
});
