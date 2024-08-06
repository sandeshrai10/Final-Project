document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("admin-register-form")
    .addEventListener("submit", register);
});

function register(event) {
  event.preventDefault();

  const adminDetails = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    phoneNumber: document.getElementById("phoneNumber").value,
  };

  fetch("/api/admin/register", {
    // Ensure this matches the backend endpoint
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adminDetails),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Registration successful");
        window.location.href = "/adminLogin.html";
      } else {
        alert("Registration failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Registration failed");
    });
}
