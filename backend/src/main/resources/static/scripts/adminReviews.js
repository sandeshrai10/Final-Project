document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-item-number");
  const reviewsContainer = document.getElementById("reviews-container");

  function displayReview(review) {
    const reviewItem = `
            <div class="review-item" data-id="${review.id}">
                <p class="reviewer-name">${review.userName}</p>
                <h3>${review.title}</h3>
                <p class="star-rating">${"★".repeat(review.rating)}${"☆".repeat(
      5 - review.rating
    )}</p>
                <p>${review.comments}</p>
                <p class="review-date">Reviewed on ${new Date(
                  review.reviewDate
                ).toLocaleDateString()}</p>
                <button class="delete-review-btn" onclick="deleteReview(${
                  review.id
                })">Delete</button>
            </div>
        `;
    reviewsContainer.innerHTML += reviewItem;
  }

  // Add event listener for the logout button
  document.getElementById("logout-btn").addEventListener("click", logoutAdmin);

  // Function to handle admin logout
  function logoutAdmin() {
    fetch("/api/admin/logout", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("authToken");
          window.location.href = "/adminLogin.html";
        } else {
          throw new Error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert("Logout failed: " + error.message);
      });
  }

  function fetchAllReviews() {
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((reviews) => {
        reviewsContainer.innerHTML = "";
        if (reviews.length === 0) {
          reviewsContainer.innerHTML =
            '<p id="placeholder-text">No reviews available.</p>';
        } else {
          reviews.forEach((review) => {
            displayReview(review);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        reviewsContainer.innerHTML =
          '<p id="placeholder-text">Failed to load reviews. Please try again later.</p>';
      });
  }

  function searchReviews(itemNumber) {
    fetch(`/api/reviews/item/${itemNumber}`)
      .then((response) => response.json())
      .then((reviews) => {
        reviewsContainer.innerHTML = "";
        if (reviews.length === 0) {
          reviewsContainer.innerHTML =
            '<p id="placeholder-text">No reviews found for this item number.</p>';
        } else {
          reviews.forEach((review) => {
            displayReview(review);
          });
        }
      })
      .catch((error) => {
        console.error("Error searching reviews:", error);
        reviewsContainer.innerHTML =
          '<p id="placeholder-text">Failed to load reviews. Please try again later.</p>';
      });
  }

  window.deleteReview = function (reviewId) {
    fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete review");
        }
        document.querySelector(`.review-item[data-id="${reviewId}"]`).remove();
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        alert("Failed to delete review. Please try again later.");
      });
  };

  searchInput.addEventListener("input", () => {
    const itemNumber = searchInput.value.trim();
    if (itemNumber) {
      searchReviews(itemNumber);
    } else {
      fetchAllReviews();
    }
  });

  fetchAllReviews();
});
