document.addEventListener('DOMContentLoaded', () => {
    const writeReviewBtn = document.getElementById('write-review-btn');
    const writeReviewSection = document.getElementById('write-review');
    const reviewForm = document.getElementById('review-form');
    const starRating = document.getElementById('star-rating');
    const ratingInput = document.getElementById('rating');
    const reviewsContainer = document.getElementById('reviews-container');
    const ratingButton = document.getElementById('rating-button');

    // Retrieve itemNumber from localStorage
    const itemNumber = localStorage.getItem('selectedItemNumber');
    console.log('Retrieved itemNumber:', itemNumber); // Debugging

    // Fetch and display rating summary
    fetchRatingSummary(itemNumber);

    writeReviewBtn.addEventListener('click', () => {
        writeReviewSection.style.display = 'block';
        writeReviewBtn.style.display = 'none';
    });

    starRating.addEventListener('click', (event) => {
        if (event.target.classList.contains('star')) {
            const ratingValue = event.target.getAttribute('data-value');
            ratingInput.value = ratingValue;
            updateStarRating(ratingValue);
        }
    });

    function updateStarRating(ratingValue) {
        const stars = starRating.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < ratingValue) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const reviewData = {
            itemNumber: parseInt(itemNumber, 10),
            userName: reviewForm.name.value,
            rating: parseInt(reviewForm.rating.value, 10),
            title: reviewForm.title.value,
            comments: reviewForm.comments.value,
            reviewDate: new Date().toISOString() // Storing the date in ISO format
        };

        if (!reviewData.userName || !reviewData.rating || !reviewData.title || !reviewData.comments) {
            alert('Please fill out all fields, including the rating.');
            return;
        }

        console.log('Submitting review:', reviewData); // Log review data for debugging

        fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(review => {
                console.log('Review submitted successfully:', review);
                alert('Review submitted successfully!');
                displayReview(review); // Display the submitted review
                reviewForm.reset();
                ratingInput.value = ""; // Reset the rating input
                updateStarRating(0); // Reset stars
                writeReviewSection.style.display = 'none';
                writeReviewBtn.style.display = 'block';
                fetchRatingSummary(itemNumber); // Update rating summary after submitting a review
            })
            .catch(error => {
                console.error('Error submitting review:', error);
                alert('Failed to submit review. Please try again later.');
            });
    });

    // function displayReview(review) {
    //     const reviewItem = `
    //         <div class="review-item">
    //             <p class="reviewer-name">${review.userName}</p>
    //             <h3>${review.title}</h3>
    //             <p class="star-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
    //             <p>${review.comments}</p>
    //             <p class="review-date">Reviewed on ${new Date(review.reviewDate).toLocaleDateString()}</p>
    //         </div>
    //     `;
    //     reviewsContainer.innerHTML += reviewItem;
    // }

    function displayReview(review) {
        const reviewItem = `
            <div class="review-item">
                <p class="reviewer-name">${review.userName}</p>
                <h3>${review.title}</h3>
                <p class="star-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                <p>${review.comments}</p>
                <p class="review-date">Reviewed on ${new Date(review.reviewDate).toLocaleDateString()}</p>
            </div>
        `;
        reviewsContainer.insertAdjacentHTML('beforeend', reviewItem);
    }


    function fetchReviews() {
        console.log('Fetching reviews for itemNumber:', itemNumber); // Debugging
        fetch(`/api/reviews/item/${itemNumber}`)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(reviews => {
                reviewsContainer.innerHTML = '';
                if (reviews.length === 0) {
                    reviewsContainer.innerHTML = '<p id="placeholder-text">No reviews yet. Be the first to write a review!</p>';
                } else {
                    reviews.forEach(review => {
                        displayReview(review);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                reviewsContainer.innerHTML = '<p id="placeholder-text">Failed to load reviews. Please try again later.</p>';
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
                ratingButton.innerHTML = `${averageRating} ${starRating} (${numberOfRatings} ratings)`;
            })
            .catch(error => {
                console.error('Error fetching rating summary:', error);
            });
    }

    // Fetch and display reviews on page load
    fetchReviews();
});
