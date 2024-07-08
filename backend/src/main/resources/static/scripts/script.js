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
        {
            id: 1,
            category: 'dell',
            name: 'DELL - Latitude 5550 Laptop',
            price: 1200,
            images: ['front.png', 'sideview.png', 'top.png'],
            currentImageIndex: 0,
            specs: [
                'Processor: Intel® Core™ Ultra 5 125U (12 MB cache, 12 cores, 14 threads, up to 4.3 GHz Turbo)',
                'Operating System: Windows 11 Pro, English/Brazilian Portuguese/French/Spanish',
                'Graphics Card: Integrated Intel® graphics for Intel® Core™ Ultra 5 125U processor',
                'Display: 15.6" FHD (1920x1080), 60Hz, IPS, Non-Touch, Anti-Glare (AG), 250 nit, 45% NTSC, FHD Cam',
                'Memory: 16 GB DDR5 (2 x 8 GB), 5600 MT/s (5200 MT/s with 13th Gen Intel® Core™ processors)',
                'Storage: 256 GB M.2 2230 TLC Gen 4 PCIe NVMe SSD'
            ]
        },
        // Other laptop entries...
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
        {
            id: 1,
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
});
