    // Laptop related code
    const laptops = [
        {
            id: 1,
            itemNumber: 1000,
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
        {
            id: 2,
            itemNumber: 1001,
            category: 'dell',
            name: 'DELL - Inspiron 15 Laptop',
            price: 800,
            images: ['front.png', 'sideview.png', 'top.png'],
            currentImageIndex: 0,
            specs: [
                'Processor: 13th Gen Intel® Core™ i5-1335U (12 MB cache, 10 cores, 12 threads, up to 4.60 GHz Turbo)',
                'Operating System: Windows 11 Home, English/French/Spanish',
                'Graphics Card: Intel® Iris® Xe Graphics',
                'Display: 15.6" FHD (1920x1080), 60Hz, WVA, IPS, Touch, Anti-Glare, Narrow Border, LED-Backlit',
                'Memory: 16 GB (2 x 8 GB), DDR4, 2666 MT/s',
                'Storage: 512 GB M.2 PCIe NVMe SSD'
            ]
        },
        {
            id: 3,
            itemNumber: 1002,
            category: 'dell',
            name: 'DELL - Alienware m18 R2 Gaming Laptop',
            price: 3000,
            images: ['front.png', 'sideview.png', 'top.png'],
            currentImageIndex: 0,
            specs: [
                'Processor: 14th Gen Intel® Core™ i7-14650HX (16-Core, 30MB L3 Cache, up to 5.2GHz Max Turbo Frequency)',
                'Operating System: Windows 11 Home, English/French/Spanish',
                'Graphics Card: NVIDIA® GeForce RTX™ 4060, 8 GB GDDR6',
                'Display: 18" QHD+ (2560 x 1600), 165Hz, 3ms, ComfortView Plus, NVIDIA G-SYNC + DDS, 100% DCI-P3, FHD IR Camera',
                'Memory: 16 GB DDR5 (2 x 8 GB), 5600 MT/s, non-ECC, dual-channel',
                'Storage: 1 TB M.2 PCIe NVMe SSD'
            ]
        },
        {
            id: 4,
            itemNumber: 1003,
            category: 'dell',
            name: 'DELL - Latitude 3550 Laptop',
            price: 900,
            images: ['front.png', 'sideview.png', 'top.png'],
            currentImageIndex: 0,
            specs: [
                'Processor: 13th Gen Intel® Core™ i3-1315U (10 MB cache, 6 cores, 8 threads, up to 4.5 GHz Turbo)',
                'Operating System: Windows 11 Pro, English/Brazilian Portuguese/French/Spanish',
                'Graphics Card: Intel® Integrated Graphics (13th Generation i3-1315U)',
                'Display: 15.6" HD (1366x768), Non-Touch, AG (Anti-Glare), TN, 220 nits, HD Cam, WLAN',
                'Memory: 8 GB DDR5 (1 x 8 GB), 5600 MT/s (5200 MT/s with 13th Gen Intel® Core™ processors)',
                'Storage: 256GB M.2 2230 TLC PCIe Gen 4 NVMe'
            ]
        },
        {
            id: 5,
            itemNumber: 1004,
            category: 'dell',
            name: 'DELL - Alienware x14 R2 Gaming Laptop',
            price: 2200,
            images: ['front.png', 'sideview.png', 'top.png'],
            currentImageIndex: 0,
            specs: [
                'Processor: 13th Gen Intel® Core™ i7-13620H (24 MB cache, 10 cores, 16 threads, up to 4.9 GHz Turbo)',
                'Operating System: Windows 11 Home, English/French/Spanish',
                'Graphics Card: NVIDIA® GeForce RTX™ 4050, 6 GB GDDR6',
                'Display: 14" QHD+ (2560 x 1600), 165Hz, 3ms, 300 nits, DCI-P3 100% typ, Hello/LBL/GSYNC/DDS/ComfortView Plus',
                'Memory: 16 GB LPDDR5, 4800 MT/s (onboard)',
                'Storage: 1 TB M.2 PCIe NVMe SSD'
            ]
        },
        {
            id: 6,
            itemNumber: 1005,
            category: 'macbook',
            name: 'MacBook Air (M1 Chip)',
            price: 999,
            images: ['front.png', 'sideview.png', 'top.png'],
            currentImageIndex: 0,
            specs: [
                'Processor: Apple M1 chip with 8-core CPU and 7-core GPU',
                'Memory: 8GB unified memory',
                'Storage: 256GB SSD',
                'Display: 13.3" Retina display with True Tone'
            ]
        },
        {
            id: 7,
            itemNumber: 1006,
            category: 'macbook',
            name: 'MacBook Pro 14-inch (M1 Pro Chip)',
            price: 1999,
            images: ['front.png', 'sideview.png', 'top.png'],
            currentImageIndex: 0,
            specs: [
                'Processor: Apple M1 Pro chip with 8-core CPU and 14-core GPU',
                'Memory: 16GB unified memory',
                'Storage: 512GB SSD',
                'Display: 14.2" Liquid Retina XDR display with ProMotion'
            ]
        },
        {
            id: 8,
            itemNumber: 1007,
            category: 'macbook',
            name: 'MacBook Pro 16-inch (M1 Pro Chip)',
            price: 2499,
            images: ['front.png', 'sideview.png', 'top.png'],
            currentImageIndex: 0,
            specs: [
                'Processor: Apple M1 Pro chip with 10-core CPU and 16-core GPU',
                'Memory: 16GB unified memory',
                'Storage: 512GB SSD',
                'Display: 16.2" Liquid Retina XDR display with ProMotion'
            ]
        },
        {
            id: 9,
            itemNumber: 1008,
            category: 'macbook',
            name: 'MacBook Pro 16-inch (M1 Max Chip)',
            price: 3499,
            images: ['front.png', 'sideview.png', 'top.png'],
            currentImageIndex: 0,
            specs: [
                'Processor: Apple M1 Max chip with 10-core CPU and 32-core GPU',
                'Memory: 32GB unified memory',
                'Storage: 1TB SSD',
                'Display: 16.2" Liquid Retina XDR display with ProMotion'
            ]
        }
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
                    <button class="btn" onclick="checkAvailability(${laptop.itemNumber})">Check Availability</button>
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
    
    window.checkAvailability = function(itemNumber) {
        fetch(`/api/admin/equipment/itemNumber/${itemNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('selectedEquipment', JSON.stringify(data));
                window.location.href = 'availability.html';
            })
            .catch(error => {
                console.error('Error fetching availability:', error);
                alert('Error fetching availability: ' + error.message);
            });
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