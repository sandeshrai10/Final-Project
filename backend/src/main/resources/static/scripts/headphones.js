
    //     // Headphones related code...
    //     const headphones = [
    //         {
    //             id: 1,
    //             itemNumber: 4001,
    //             name: 'Apple AirPods Pro',
    //             type: 'True wireless earbuds',
    //             noiseCancellation: 'Active Noise Cancellation',
    //             batteryLife: 'Up to 4.5 hours of listening time with ANC on',
    //             specialFeatures: 'Touch sensor controls, ambient sound control, and voice assistant integration',
    //             price: 249,
    //             brand: 'apple',
    //             images: ['airpods_pro_front.png', 'airpods_pro_side.png', 'airpods_pro_case.png'],
    //             currentImageIndex: 0
    //         },
    //         {
    //             id: 2,
    //             itemNumber: 4002,
    //             name: 'Sony WH-1000XM4',
    //             type: 'Over-ear wireless headphones',
    //             noiseCancellation: 'Yes (industry-leading)',
    //             batteryLife: 'Up to 30 hours (with noise cancellation on)',
    //             specialFeatures: 'Touch sensor controls, ambient sound control, and voice assistant integration',
    //             price: 349,
    //             brand: 'sony',
    //             images: ['sony_wh1000xm4_front.png', 'sony_wh1000xm4_side.png', 'sony_wh1000xm4_top.png'],
    //             currentImageIndex: 0
    //         },
    //         {
    //             id: 3,
    //             itemNumber: 4003,
    //             name: 'Bose QuietComfort 45',
    //             type: 'Over-ear wireless headphones',
    //             noiseCancellation: 'Yes',
    //             batteryLife: 'Up to 24 hours (with noise cancellation on)',
    //             specialFeatures: 'Aware mode for hearing ambient sound, voice assistant support',
    //             price: 329,
    //             brand: 'bose',
    //             images: ['bose_qc45_front.png', 'bose_qc45_side.png', 'bose_qc45_top.png'],
    //             currentImageIndex: 0
    //         },
    //         {
    //             id: 4,
    //             itemNumber: 4004,
    //             name: 'Jabra Elite 85t',
    //             type: 'True wireless earbuds',
    //             noiseCancellation: 'Active Noise Cancellation',
    //             batteryLife: 'Up to 5.5 hours (with ANC on), additional 19.5 hours with charging case',
    //             specialFeatures: 'Customizable sound via Jabra Sound+ app, strong connectivity',
    //             price: 229,
    //             brand: 'jabra',
    //             images: ['jabra_elite85t_front.png', 'jabra_elite85t_side.png', 'jabra_elite85t_case.png'],
    //             currentImageIndex: 0
    //         },
    //         {
    //             id: 5,
    //             itemNumber: 4005,
    //             name: 'Sennheiser Momentum 3 Wireless',
    //             type: 'Over-ear wireless headphones',
    //             noiseCancellation: 'Yes',
    //             batteryLife: 'Up to 17 hours',
    //             specialFeatures: 'Transparent Hearing mode, auto on/off when folding/unfolding',
    //             price: 399,
    //             brand: 'sennheiser',
    //             images: ['sennheiser_momentum3_front.png', 'sennheiser_momentum3_side.png', 'sennheiser_momentum3_top.png'],
    //             currentImageIndex: 0
    //         },
    //         {
    //             id: 6,
    //             itemNumber: 4006,
    //             name: 'Skullcandy Indy ANC',
    //             type: 'True wireless earbuds',
    //             noiseCancellation: 'Active Noise Cancellation',
    //             batteryLife: 'Up to 5 hours (earbuds) + 16 hours (charging case)',
    //             specialFeatures: 'Tile tracking, touch controls, rapid charge (10 minutes for 2 hours)',
    //             price: 129,
    //             brand: 'skullcandy',
    //             images: ['skullcandy_indyanc_front.png', 'skullcandy_indyanc_side.png', 'skullcandy_indyanc_case.png'],
    //             currentImageIndex: 0
    //         }
    //     ];
    


    //     function displayHeadphones(headphoneList) {
    //         const container = document.getElementById('headphones-container');
    //         if (!container) {
    //             return;
    //         }
    //         container.innerHTML = '';
    //         headphoneList.forEach(headphone => {
    //             const headphoneElement = document.createElement('div');
    //             headphoneElement.className = 'headphone-item';
    //             headphoneElement.innerHTML = `
    //                 <h3>${headphone.name}</h3>
    //                 <div class="image-gallery">
    //                     <div class="main-image">
    //                         <img src="${headphone.images[headphone.currentImageIndex]}" alt="${headphone.name}" id="mainImage${headphone.id}" width="300" height="200">
    //                     </div>
    //                     <div class="arrows">
    //                         <button class="prev" onclick="changeHeadphoneImage(-1, ${headphone.id})">&#10094;</button>
    //                         <button class="next" onclick="changeHeadphoneImage(1, ${headphone.id})">&#10095;</button>
    //                     </div>
    //                 </div>
    //                 <ul>
    //                     <li>Type: ${headphone.type}</li>
    //                     <li>Noise Cancellation: ${headphone.noiseCancellation}</li>
    //                     <li>Battery Life: ${headphone.batteryLife}</li>
    //                     <li>${headphone.specialFeatures ? `Special Features: ${headphone.specialFeatures}` : ''}</li>
    //                 </ul>
    //                 <p><strong>Price: $${headphone.price}</strong></p>
    //                 <button class="btn" onclick="checkHeadphoneAvailability(${headphone.itemNumber})">Check Availability</button>
    //             `;
    //             container.appendChild(headphoneElement);
    //         });
    //     }
        
    //     window.changeHeadphoneImage = function(direction, headphoneId) {
    //         const headphone = headphones.find(h => h.id === headphoneId);
    //         headphone.currentImageIndex += direction;
        
    //         if (headphone.currentImageIndex < 0) {
    //             headphone.currentImageIndex = headphone.images.length - 1;
    //         } else if (headphone.currentImageIndex >= headphone.images.length) {
    //             headphone.currentImageIndex = 0;
    //         }
        
    //         document.getElementById(`mainImage${headphoneId}`).src = headphone.images[headphone.currentImageIndex];
    //     };
        
    //     window.checkHeadphoneAvailability = function(itemNumber) {
    //         const headphone = headphones.find(h => h.itemNumber === itemNumber);
        
    //         if (!headphone) {
    //             console.error("Headphone not found for Item Number:", itemNumber);
    //             return;
    //         }
        
    //         localStorage.setItem('selectedItemNumber', headphone.itemNumber);
    //         localStorage.setItem('selectedHeadphoneName', headphone.name);
    //         localStorage.setItem('selectedHeadphoneSpecs', JSON.stringify([
    //             `Type: ${headphone.type}`,
    //             `Noise Cancellation: ${headphone.noiseCancellation}`,
    //             `Battery Life: ${headphone.batteryLife}`,
    //             `Special Features: ${headphone.specialFeatures}`
    //         ]));
    //         localStorage.setItem('selectedHeadphoneImages', JSON.stringify(headphone.images));
        
    //         window.location.href = 'availability_headphone.html';
    //     };
        
    //     document.getElementById('apply-changes-btn').addEventListener('click', () => {
    //         const category = document.getElementById('categories').value;
    //         const priceSort = document.getElementById('price').value;
    //         let filteredHeadphones = headphones;
        
    //         if (category !== 'all') {
    //             filteredHeadphones = headphones.filter(headphone => headphone.brand === category);
    //         }
        
    //         if (priceSort === 'low-to-high') {
    //             filteredHeadphones.sort((a, b) => a.price - b.price);
    //         } else if (priceSort === 'high-to-low') {
    //             filteredHeadphones.sort((a, b) => b.price - a.price);
    //         }
        
    //         displayHeadphones(filteredHeadphones);
    //     });
        
    //     const headphoneSearchForm = document.getElementById('search-form');
    //     if (headphoneSearchForm) {
    //         headphoneSearchForm.addEventListener('submit', (event) => {
    //             event.preventDefault();
    //             const query = document.getElementById('search-input').value.toLowerCase();
    //             const filteredHeadphones = headphones.filter(headphone =>
    //                 headphone.name.toLowerCase().includes(query) ||
    //                 headphone.brand.toLowerCase().includes(query)
    //             );
    //             displayHeadphones(filteredHeadphones);
    //         });
    //     }
        
    //     // Display all headphones by default
    //     if (document.getElementById('headphones-container')) {
    //         displayHeadphones(headphones);
    //     }


    //     // Search functionality
    // const searchInput = document.getElementById('search-input');
    // const suggestions = document.getElementById('suggestions');
    // const searchButton = document.getElementById('search-button');

    // if (searchInput && suggestions && searchButton) {
    //     const equipmentSuggestions = ['laptops', 'cameras', 'tablets', 'headphones'];

    //     searchInput.addEventListener('focus', () => {
    //         showSuggestions('');
    //     });

    //     searchInput.addEventListener('input', () => {
    //         const query = searchInput.value.toLowerCase();
    //         showSuggestions(query);
    //     });

    //     searchInput.addEventListener('blur', () => {
    //         setTimeout(() => {
    //             suggestions.innerHTML = '';
    //         }, 200);
    //     });

    //     searchButton.addEventListener('click', () => {
    //         const query = searchInput.value.toLowerCase();
    //         navigateToPage(query);
    //     });

    //     function showSuggestions(query) {
    //         suggestions.innerHTML = '';
    //         const filteredSuggestions = equipmentSuggestions.filter(item => item.startsWith(query));
    //         filteredSuggestions.forEach(item => {
    //             const suggestionItem = document.createElement('div');
    //             suggestionItem.textContent = item;
    //             suggestionItem.classList.add('suggestion-item');
    //             suggestionItem.addEventListener('mousedown', (e) => {
    //                 e.preventDefault();
    //                 navigateToPage(item);
    //             });
    //             suggestions.appendChild(suggestionItem);
    //         });
    //     }

    //     function navigateToPage(query) {
    //         switch (query) {
    //             case 'laptops':
    //             case 'laptop':
    //                 window.location.href = '/laptops.html';
    //                 break;
    //             case 'cameras':
    //             case 'camera':
    //                 window.location.href = '/cameras.html';
    //                 break;
    //             case 'tablets':
    //             case 'tablet':
    //                 window.location.href = '/tablets.html';
    //                 break;
    //             case 'headphones':
    //             case 'headphone':
    //                 window.location.href = '/headphones.html';
    //                 break;
    //             default:
    //                 alert('No matching equipment found');
    //         }
    //     }
    // }









    const headphones = [
        {
            id: 1,
            itemNumber: 4001,
            name: 'Apple AirPods Pro',
            type: 'True wireless earbuds',
            noiseCancellation: 'Active Noise Cancellation',
            batteryLife: 'Up to 4.5 hours of listening time with ANC on',
            specialFeatures: 'Touch sensor controls, ambient sound control, and voice assistant integration',
            price: 249,
            brand: 'apple',
            images: ['airpods_pro_front.png', 'airpods_pro_side.png', 'airpods_pro_case.png'],
            currentImageIndex: 0
        },
        {
            id: 2,
            itemNumber: 4002,
            name: 'Sony WH-1000XM4',
            type: 'Over-ear wireless headphones',
            noiseCancellation: 'Yes (industry-leading)',
            batteryLife: 'Up to 30 hours (with noise cancellation on)',
            specialFeatures: 'Touch sensor controls, ambient sound control, and voice assistant integration',
            price: 349,
            brand: 'sony',
            images: ['sony_wh1000xm4_front.png', 'sony_wh1000xm4_side.png', 'sony_wh1000xm4_top.png'],
            currentImageIndex: 0
        },
        {
            id: 3,
            itemNumber: 4003,
            name: 'Bose QuietComfort 45',
            type: 'Over-ear wireless headphones',
            noiseCancellation: 'Yes',
            batteryLife: 'Up to 24 hours (with noise cancellation on)',
            specialFeatures: 'Aware mode for hearing ambient sound, voice assistant support',
            price: 329,
            brand: 'bose',
            images: ['bose_qc45_front.png', 'bose_qc45_side.png', 'bose_qc45_top.png'],
            currentImageIndex: 0
        },
        {
            id: 4,
            itemNumber: 4004,
            name: 'Jabra Elite 85t',
            type: 'True wireless earbuds',
            noiseCancellation: 'Active Noise Cancellation',
            batteryLife: 'Up to 5.5 hours (with ANC on), additional 19.5 hours with charging case',
            specialFeatures: 'Customizable sound via Jabra Sound+ app, strong connectivity',
            price: 229,
            brand: 'jabra',
            images: ['jabra_elite85t_front.png', 'jabra_elite85t_side.png', 'jabra_elite85t_case.png'],
            currentImageIndex: 0
        },
        {
            id: 5,
            itemNumber: 4005,
            name: 'Sennheiser Momentum 3 Wireless',
            type: 'Over-ear wireless headphones',
            noiseCancellation: 'Yes',
            batteryLife: 'Up to 17 hours',
            specialFeatures: 'Transparent Hearing mode, auto on/off when folding/unfolding',
            price: 399,
            brand: 'sennheiser',
            images: ['sennheiser_momentum3_front.png', 'sennheiser_momentum3_side.png', 'sennheiser_momentum3_top.png'],
            currentImageIndex: 0
        },
        {
            id: 6,
            itemNumber: 4006,
            name: 'Skullcandy Indy ANC',
            type: 'True wireless earbuds',
            noiseCancellation: 'Active Noise Cancellation',
            batteryLife: 'Up to 5 hours (earbuds) + 16 hours (charging case)',
            specialFeatures: 'Tile tracking, touch controls, rapid charge (10 minutes for 2 hours)',
            price: 129,
            brand: 'skullcandy',
            images: ['skullcandy_indyanc_front.png', 'skullcandy_indyanc_side.png', 'skullcandy_indyanc_case.png'],
            currentImageIndex: 0
        }
    ];
    
    function displayHeadphones(filteredHeadphones) {
        const container = document.getElementById('headphones-container');
        if (!container) {
            return;
        }
        container.innerHTML = '';
        filteredHeadphones.forEach(headphone => {
            const headphoneElement = document.createElement('div');
            headphoneElement.className = 'headphone-item';
            headphoneElement.innerHTML = `
                <h3>${headphone.name}</h3>
                <div class="image-gallery">
                    <div class="main-image">
                        <img src="${headphone.images[headphone.currentImageIndex]}" alt="${headphone.name}" id="mainImage${headphone.id}" width="300" height="200">
                    </div>
                    <div class="arrows">
                        <button class="prev" onclick="changeHeadphoneImage(-1, ${headphone.id})">&#10094;</button>
                        <button class="next" onclick="changeHeadphoneImage(1, ${headphone.id})">&#10095;</button>
                    </div>
                </div>
                <ul>
                    <li>Type: ${headphone.type}</li>
                    <li>Noise Cancellation: ${headphone.noiseCancellation}</li>
                    <li>Battery Life: ${headphone.batteryLife}</li>
                    <li>${headphone.specialFeatures ? `Special Features: ${headphone.specialFeatures}` : ''}</li>
                </ul>
                <p><strong>Price: $${headphone.price}</strong></p>
                <button class="btn" onclick="checkHeadphoneAvailability(${headphone.itemNumber})">Check Availability</button>
                <div class="rating" id="rating-button-${headphone.itemNumber}" onclick="navigateToReviews(${headphone.itemNumber})">
                    Loading...
                </div>
            `;
            container.appendChild(headphoneElement);
    
            // Fetch and display rating summary
            fetchRatingSummary(headphone.itemNumber);
        });
    }
    
    function fetchRatingSummary(itemNumber) {
        fetch(`/api/reviews/item/${itemNumber}/summary`)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(summary => {
                const averageRating = summary.averageRating.toFixed(1);
                const numberOfRatings = summary.numberOfRatings;
                const starRating = '★'.repeat(Math.round(averageRating)) + '☆'.repeat(5 - Math.round(averageRating));
                const ratingButton = document.getElementById(`rating-button-${itemNumber}`);
                ratingButton.innerHTML = `${averageRating} ${starRating} (${numberOfRatings} ratings)`;
            })
            .catch(error => {
                console.error('Error fetching rating summary:', error);
                const ratingButton = document.getElementById(`rating-button-${itemNumber}`);
                ratingButton.innerHTML = 'Rating unavailable';
            });
    }
    
    function navigateToReviews(itemNumber) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            localStorage.setItem('selectedItemNumber', itemNumber);
            window.location.href = 'reviews.html';
        } else {
            localStorage.setItem('redirectToReviews', 'true');
            localStorage.setItem('selectedItemNumber', itemNumber);
            window.location.href = 'login.html';
        }
    }
    
    window.changeHeadphoneImage = function(direction, headphoneId) {
        const headphone = headphones.find(h => h.id === headphoneId);
        headphone.currentImageIndex += direction;
    
        if (headphone.currentImageIndex < 0) {
            headphone.currentImageIndex = headphone.images.length - 1;
        } else if (headphone.currentImageIndex >= headphone.images.length) {
            headphone.currentImageIndex = 0;
        }
    
        document.getElementById(`mainImage${headphoneId}`).src = headphone.images[headphone.currentImageIndex];
    };
    
    window.checkHeadphoneAvailability = function(itemNumber) {
        const headphone = headphones.find(h => h.itemNumber === itemNumber);
    
        if (!headphone) {
            console.error("Headphone not found for Item Number:", itemNumber);
            return;
        }
    
        localStorage.setItem('selectedItemNumber', headphone.itemNumber);
        localStorage.setItem('selectedHeadphoneName', headphone.name);
        localStorage.setItem('selectedHeadphoneSpecs', JSON.stringify([
            `Type: ${headphone.type}`,
            `Noise Cancellation: ${headphone.noiseCancellation}`,
            `Battery Life: ${headphone.batteryLife}`,
            `Special Features: ${headphone.specialFeatures}`
        ]));
        localStorage.setItem('selectedHeadphoneImages', JSON.stringify(headphone.images));
    
        window.location.href = 'availability_headphone.html';
    };
    
    document.getElementById('apply-changes-btn').addEventListener('click', () => {
        const category = document.getElementById('categories').value;
        const priceSort = document.getElementById('price').value;
        let filteredHeadphones = headphones;
    
        if (category !== 'all') {
            filteredHeadphones = headphones.filter(headphone => headphone.brand === category);
        }
    
        if (priceSort === 'low-to-high') {
            filteredHeadphones.sort((a, b) => a.price - b.price);
        } else if (priceSort === 'high-to-low') {
            filteredHeadphones.sort((a, b) => b.price - a.price);
        }
    
        displayHeadphones(filteredHeadphones);
    });
    
    const headphoneSearchForm = document.getElementById('search-form');
    if (headphoneSearchForm) {
        headphoneSearchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = document.getElementById('search-input').value.toLowerCase();
            const filteredHeadphones = headphones.filter(headphone =>
                headphone.name.toLowerCase().includes(query) ||
                headphone.brand.toLowerCase().includes(query)
            );
            displayHeadphones(filteredHeadphones);
        });
    }
    
    // Display all headphones by default
    if (document.getElementById('headphones-container')) {
        displayHeadphones(headphones);
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('suggestions');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput && suggestions && searchButton) {
        const equipmentSuggestions = ['laptops', 'cameras', 'tablets', 'headphones'];
    
        searchInput.addEventListener('focus', () => {
            showSuggestions('');
        });
    
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            showSuggestions(query);
        });
    
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                suggestions.innerHTML = '';
            }, 200);
        });
    
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            navigateToPage(query);
        });
    
        function showSuggestions(query) {
            suggestions.innerHTML = '';
            const filteredSuggestions = equipmentSuggestions.filter(item => item.startsWith(query));
            filteredSuggestions.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = item;
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    navigateToPage(item);
                });
                suggestions.appendChild(suggestionItem);
            });
        }
    
        function navigateToPage(query) {
            switch (query) {
                case 'laptops':
                case 'laptop':
                    window.location.href = '/laptops.html';
                    break;
                case 'cameras':
                case 'camera':
                    window.location.href = '/cameras.html';
                    break;
                case 'tablets':
                case 'tablet':
                    window.location.href = '/tablets.html';
                    break;
                case 'headphones':
                case 'headphone':
                    window.location.href = '/headphones.html';
                    break;
                default:
                    alert('No matching equipment found');
            }
        }
    }
    