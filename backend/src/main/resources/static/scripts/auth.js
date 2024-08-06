// scripts/auth.js

// Function to check if the user is logged in
function checkUserStatus() {
  const user = localStorage.getItem("user"); // Assuming user data is stored in localStorage
  const userName = localStorage.getItem("userName"); // Assuming user's name is stored in localStorage

  if (user) {
    document.getElementById("login-link").style.display = "none";
    document.getElementById("register-link").style.display = "none";
    document.getElementById("user-greeting").style.display = "block";
    document.getElementById("user-name").innerText = `Hello, ${userName}`;
    document.getElementById("admin-link").style.display =
      user.role === "ADMIN" ? "block" : "none";
    document.getElementById("logout-link").style.display = "block"; // Ensure logout link is displayed
  } else {
    document.getElementById("login-link").style.display = "block";
    document.getElementById("register-link").style.display = "block";
    document.getElementById("user-greeting").style.display = "none";
    document.getElementById("admin-link").style.display = "none";
    document.getElementById("logout-link").style.display = "none"; // Ensure logout link is hidden
  }
}

// Function to handle user logout
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("userName");
  window.location.href = "/";
}

document.getElementById("logout-link").addEventListener("click", logout);

// Call the function to check user status on page load
window.onload = checkUserStatus;
