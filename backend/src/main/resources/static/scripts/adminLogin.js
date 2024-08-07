document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("admin-login-form")
    .addEventListener("submit", loginAdmin);
});

function loginAdmin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch("/api/admin/login", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/admin.html";
      } else {
        return response.json().then((data) => {
          throw new Error(data.message || "Login failed");
        });
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      // Redirect to adminLogin.html with error parameter
      window.location.href = "/adminLogin.html?error=true";
    });
}
