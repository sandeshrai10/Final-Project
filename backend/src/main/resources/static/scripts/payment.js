document.addEventListener("DOMContentLoaded", async function () {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const totalAmountElement = document.getElementById("total-amount");
  const payAmountElement = document.getElementById("pay-amount");
  let totalAmount = 0;

  cartItemsContainer.innerHTML = "";

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

  for (const item of cartItems) {
    const dailyRentalRate = await fetchDailyRentalRate(item.itemNumber);
    const rentalDays =
      Math.ceil(
        (new Date(item.endDate) - new Date(item.startDate)) /
          (1000 * 60 * 60 * 24)
      ) + 1; // Including both start and end days
    const itemTotal = dailyRentalRate * item.quantity * rentalDays;
    totalAmount += itemTotal;

    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";
    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Rental from ${item.startDate} to ${item.endDate}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  }

  totalAmount = parseFloat(totalAmount.toFixed(2)); // Ensure totalAmount is a number
  totalAmountElement.textContent = `${totalAmount}`;
  payAmountElement.textContent = totalAmount;

  document
    .getElementById("payment-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const cardName = document.getElementById("card-name").value.trim();
      const email = document.getElementById("email").value.trim();
      const cardNumber = document.getElementById("card-number").value.trim();
      const expiryDate = document.getElementById("expiry-date").value.trim();
      const cvv = document.getElementById("cvv").value.trim();
      const country = document.getElementById("country").value.trim();

      // Validation
      if (!/^[a-zA-Z\s]+$/.test(cardName)) {
        alert("Card name must contain only letters and spaces.");
        return;
      }
      if (!email) {
        alert("Email is required.");
        return;
      }
      if (!/^\d{16}$/.test(cardNumber)) {
        alert(
          "Card number must be a non-negative number with exactly 16 digits."
        );
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiryDate)) {
        alert("Expiry date must be in MM/YYYY format.");
        return;
      }
      const [month, year] = expiryDate.split("/").map(Number);
      const expiry = new Date(year, month - 1);
      const now = new Date();
      if (expiry < new Date(now.getFullYear(), now.getMonth())) {
        alert("Expiry date must be current or future month and year.");
        return;
      }
      if (!/^\d{1,4}$/.test(cvv) || cvv < 0) {
        alert("CVV must be a non-negative number with up to 4 digits.");
        return;
      }

      const paymentData = {
        payment: {
          cardName,
          email,
          cardNumber,
          expiryDate,
          cvv,
          country,
          totalAmount: totalAmount, // Ensure this is a number
          orderNumber: generateOrderNumber(),
          transactionDate: new Date().toISOString().split("T")[0], // Add transaction date
        },
        paymentItems: cartItems.map((item) => ({
          itemNumber: item.itemNumber, // Ensure itemNumber is included
          itemName: item.name,
          itemDescription: item.description,
          itemQuantity: item.quantity,
          itemPrice: parseFloat(item.price),
          startDate: item.startDate, // Include startDate
          endDate: item.endDate, // Include endDate
        })),
      };

      console.log("Payment Data:", JSON.stringify(paymentData)); // Debugging log

      fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (response.ok) {
            localStorage.setItem("paymentData", JSON.stringify(paymentData)); // Store payment data
            alert("Payment processed successfully!");
            localStorage.removeItem("cartItems");
            window.location.href = "success.html"; // Redirect to a success page
          } else {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .catch((error) => {
          console.error("Error processing payment:", error);
          alert("Payment failed. Please try again.");
        });
    });

  function generateOrderNumber() {
    return "ORDER-" + Math.floor(Math.random() * 1000000).toString();
  }

  const paymentOptions = document.querySelectorAll(".option");
  paymentOptions.forEach((option) => {
    option.addEventListener("click", function () {
      paymentOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
