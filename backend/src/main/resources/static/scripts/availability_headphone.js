let currentImageIndex = 0;
let images = [];

function changeImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  } else if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  document.getElementById("mainImage").src = images[currentImageIndex];
}

document.addEventListener("DOMContentLoaded", function () {
  const itemNumber = localStorage.getItem("selectedItemNumber");
  const headphoneName = localStorage.getItem("selectedHeadphoneName");
  const headphoneSpecs = JSON.parse(
    localStorage.getItem("selectedHeadphoneSpecs")
  );
  images = JSON.parse(localStorage.getItem("selectedHeadphoneImages"));

  // Restrict past dates in date inputs
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("start-date").setAttribute("min", today);
  document.getElementById("end-date").setAttribute("min", today);

  // Hide quantity field and add to cart button initially
  document.getElementById("quantity").style.display = "none";
  document.getElementById("add-to-cart-btn").style.display = "none";

  if (itemNumber) {
    fetch(`/api/admin/equipment/itemNumber/${itemNumber}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((product) => {
        document.getElementById("product-name").textContent = headphoneName;
        document.getElementById("mainImage").src = images[0];
        const specsList = document.getElementById("product-specs");
        specsList.innerHTML = headphoneSpecs
          .map((spec) => `<li>${spec}</li>`)
          .join("");
        document.getElementById(
          "product-price"
        ).textContent = `Price per day: $${product.dailyRentalRate}`;
        document.getElementById(
          "stock-quantity"
        ).textContent = `Stock Quantity: ---`;
        document.getElementById("status").textContent = `Status: ---`;
      })
      .catch((error) => {
        console.error("Error fetching equipment details:", error);
        alert("Error fetching equipment details: " + error.message);
      });
  }

  document
    .getElementById("check-availability-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const startDate = document.getElementById("start-date").value;
      const endDate = document.getElementById("end-date").value;

      if (new Date(startDate) >= new Date(endDate)) {
        alert("Start date must be less than end date.");
        return;
      }

      fetch(
        `/api/stock-handler/check-availability?itemNumber=${itemNumber}&startDate=${startDate}&endDate=${endDate}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const { stockQuantity, status } = data;
          document.getElementById(
            "stock-quantity"
          ).textContent = `Stock Quantity: ${stockQuantity}`;
          document.getElementById("status").textContent = `Status: ${status}`;

          if (status === "Available") {
            document.getElementById("quantity").style.display = "block";
            document.getElementById("add-to-cart-btn").style.display = "block";
          } else {
            document.getElementById("quantity").style.display = "none";
            document.getElementById("add-to-cart-btn").style.display = "none";
          }
        })
        .catch((error) => {
          console.error("Error checking availability:", error);
          alert("Error checking availability: " + error.message);
        });
    });

  document
    .getElementById("availability-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const startDate = document.getElementById("start-date").value;
      const endDate = document.getElementById("end-date").value;
      const quantity = parseInt(document.getElementById("quantity").value);
      const stockQuantity = parseInt(
        document.getElementById("stock-quantity").textContent.split(" ")[2]
      );
      const productName = document.getElementById("product-name").textContent;
      const productPrice = parseFloat(
        document.getElementById("product-price").textContent.split("$")[1]
      );
      const productImage = document.getElementById("mainImage").src;

      if (quantity <= 0 || quantity > stockQuantity) {
        alert(
          "Invalid quantity. Please enter a quantity between 1 and the available stock."
        );
        return;
      }

      const rentalDays = Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = productPrice * quantity * rentalDays;

      const cartItem = {
        itemNumber: itemNumber,
        name: productName,
        startDate: startDate,
        endDate: endDate,
        price: totalPrice.toFixed(2),
        image: productImage,
        quantity: quantity,
      };

      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Check if the item already exists in the cart
      const existingItemIndex = cartItems.findIndex(
        (item) => item.itemNumber === itemNumber
      );
      if (existingItemIndex !== -1) {
        alert("This item is already in your cart.");
        return;
      }

      cartItems.push(cartItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      alert("Item added to cart!");
      location.reload();
    });
});
