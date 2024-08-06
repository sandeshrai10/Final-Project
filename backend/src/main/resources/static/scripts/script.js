document.addEventListener("DOMContentLoaded", () => {
  // Handle register form submission
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        password: document.getElementById("password").value,
      };

      // Client-side validation
      if (data.phoneNumber.length !== 10) {
        alert("Phone number must be exactly 10 digits.");
        return;
      }

      try {
        const response = await fetch("/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const user = await response.json();
          alert("Registration successful!");
          window.location.href = "login.html"; // Redirect to login page with redirectUrl
        } else {
          const errorText = await response.text(); // Capture the error message
          alert("Registration failed: " + errorText);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Registration failed.");
      }
    });
  }

  // Handle login form submission
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
      };

      try {
        const response = await fetch("/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const user = await response.json();
          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userName", user.firstName);
          alert(`Welcome, ${user.firstName}!`);

          // Check if the user was redirected from the rating button
          if (localStorage.getItem("redirectToReviews") === "true") {
            localStorage.removeItem("redirectToReviews");
            window.location.href = "reviews.html";
          } else {
            window.location.href = "index.html";
          }
        } else {
          alert("Login failed.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Login failed.");
      }
    });
  }

  // Reservation form submission
  const reservationForm = document.getElementById("reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Reservation submitted successfully!");
    });
  }

  // Toggle menu for small screens
  function toggleMenu() {
    const menu = document.querySelector("nav ul");
    menu.classList.toggle("active");
  }

  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  // Search functionality
  const searchInput = document.getElementById("search-input");
  const suggestions = document.getElementById("suggestions");
  const searchButton = document.getElementById("search-button");

  if (searchInput && suggestions && searchButton) {
    const equipmentSuggestions = [
      "laptops",
      "cameras",
      "tablets",
      "headphones",
    ];

    searchInput.addEventListener("focus", () => {
      showSuggestions("");
    });

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      showSuggestions(query);
    });

    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        suggestions.innerHTML = "";
      }, 200);
    });

    searchButton.addEventListener("click", () => {
      const query = searchInput.value.toLowerCase();
      navigateToPage(query);
    });

    function showSuggestions(query) {
      suggestions.innerHTML = "";
      const filteredSuggestions = equipmentSuggestions.filter((item) =>
        item.startsWith(query)
      );
      filteredSuggestions.forEach((item) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.textContent = item;
        suggestionItem.classList.add("suggestion-item");
        suggestionItem.addEventListener("mousedown", (e) => {
          e.preventDefault();
          navigateToPage(item);
        });
        suggestions.appendChild(suggestionItem);
      });
    }

    function navigateToPage(query) {
      switch (query) {
        case "laptops":
        case "laptop":
          window.location.href = "/laptops.html";
          break;
        case "cameras":
        case "camera":
          window.location.href = "/cameras.html";
          break;
        case "tablets":
        case "tablet":
          window.location.href = "/tablets.html";
          break;
        case "headphones":
        case "headphone":
          window.location.href = "/headphones.html";
          break;
        default:
          alert("No matching equipment found");
      }
    }
  }
});
