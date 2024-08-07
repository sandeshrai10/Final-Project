document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const closeCartButton = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const checkoutButton = document.getElementById("checkout-btn");
  const totalAmountElement = document.getElementById("total-amount");

  function toggleCart() {
    cartContainer.classList.toggle("open");
    if (cartContainer.classList.contains("open")) {
      renderCartItems();
    }
  }

  async function fetchDailyRentalRate(itemNumber) {
    try {
      const response = await fetch(
        `/api/admin/equipment/itemNumber/${itemNumber}`
      );
      const product = await response.json();
      return product.dailyRentalRate;
    } catch (error) {
      console.error("Error fetching daily rental rate:", error);
      alert("Error fetching daily rental rate: " + error.message);
      return 0;
    }
  }

  async function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItemsContainer.innerHTML = "";
    let totalAmount = 0;

    for (const item of cartItems) {
      const dailyRentalRate = await fetchDailyRentalRate(item.itemNumber);
      const rentalDays =
        Math.ceil(
          (new Date(item.endDate) - new Date(item.startDate)) /
            (1000 * 60 * 60 * 24)
        ) + 1; // Including both start and end days
      const totalPrice = dailyRentalRate * item.quantity * rentalDays;
      totalAmount += totalPrice;

      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Rental from ${item.startDate} to ${item.endDate}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <div class="cart-item-price">$${totalPrice.toFixed(2)}</div>
        <button class="remove-item" data-index="${cartItems.indexOf(
          item
        )}">&times;</button>
      `;
      cartItemsContainer.appendChild(cartItemElement);
    }

    if (totalAmountElement) {
      totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(
        2
      )}`;
    }

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        removeCartItem(index);
      });
    });

    // Enable or disable the checkout button based on the cart items
    checkoutButton.disabled = cartItems.length === 0;
  }

  function removeCartItem(index) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCartItems();
  }

  closeCartButton.addEventListener("click", toggleCart);
  checkoutButton.addEventListener("click", () => {
    const user = localStorage.getItem("user");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.length === 0) {
      alert(
        "Your cart is empty. Please add items to the cart before proceeding to checkout."
      );
      return;
    }

    if (user) {
      // User is logged in, proceed to the payment page
      window.location.href = "/payment.html";
    } else {
      // User is not logged in, redirect to the login page with redirect URL to cart
      window.location.href = "/login.html?redirectUrl=cart.html";
    }
  });

  const cartButton = document.getElementById("cart-button");
  if (cartButton) {
    cartButton.addEventListener("click", toggleCart);
  }

  renderCartItems();
});
