
document.addEventListener('DOMContentLoaded', () => {
    const writeReviewBtn = document.getElementById('write-review-btn');
    const writeReviewSection = document.getElementById('write-review');
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-container');
    const starRating = document.getElementById('star-rating');
    const ratingInput = document.getElementById('rating');

    // Display placeholder reviews
    reviewsContainer.innerHTML = '<p id="placeholder-text">No reviews yet. Be the first to write a review!</p>';

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
            name: reviewForm.name.value,
            rating: reviewForm.rating.value,
            title: reviewForm.title.value,
            comments: reviewForm.comments.value,
            reviewDate: new Date().toLocaleDateString() // Adding the current date
        };

        // Check if all required fields are filled, including rating
        if (!reviewData.name || !reviewData.rating || !reviewData.title || !reviewData.comments || reviewData.rating === "0") {
            alert('Please fill out all fields, including the rating.');
            return;
        }

        console.log('Review submitted:', reviewData);

        // Remove the placeholder text if present
        const placeholderText = document.getElementById('placeholder-text');
        if (placeholderText) {
            placeholderText.remove();
        }

        // Simulate successful submission
        reviewsContainer.innerHTML += `
            <div class="review-item">
            <p class="reviewer-name">${reviewData.name}</p>
                <h3>${reviewData.title}</h3>
                <p class="star-rating">${'★'.repeat(reviewData.rating)}${'☆'.repeat(5 - reviewData.rating)}</p>
                <p>${reviewData.comments}</p>
                <p class="review-date">Reviewed on ${reviewData.reviewDate}</p>
            </div>
        `;

        writeReviewSection.style.display = 'none';
        writeReviewBtn.style.display = 'block';
        reviewForm.reset();
        ratingInput.value = ""; // Reset the rating input
        updateStarRating(0); // Reset stars
    });
});
