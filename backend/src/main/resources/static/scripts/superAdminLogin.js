document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("super-admin-login-form")
    .addEventListener("submit", loginSuperAdmin);
});

function loginSuperAdmin(event) {
  event.preventDefault();

  const credentials = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };

  fetch("/api/admin/super-admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      console.log("Response status:", response.status); // Log response status
      return response.text().then((text) => {
        try {
          return JSON.parse(text); // Try to parse JSON
        } catch (err) {
          throw new Error(`Invalid JSON: ${text}`);
        }
      });
    })
    .then((data) => {
      console.log("Received data:", data); // Log received data
      localStorage.setItem("authToken", data.token); // Store the token
      window.location.href = "/adminRegister.html"; // Redirect to admin register page
    })
    .catch((error) => {
      console.error("Login error:", error.message); // Log the error message
      alert(`Login failed: ${error.message}`); // Display detailed error message
      console.error("Error details:", error); // Log the full error
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("super-admin-login-form")
    .addEventListener("submit", loginSuperAdmin);
});

function loginSuperAdmin(event) {
  event.preventDefault();

  const credentials = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };

  fetch("/api/admin/super-admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received data:", data);
      localStorage.setItem("authToken", data.token);
      window.location.href = "adminRegister.html";
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert(`Login failed: ${error.message}`);
    });
}
