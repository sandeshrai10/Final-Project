


document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const payAmountElement = document.getElementById('pay-amount');
    let totalAmount = 0;

    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemTotal = itemPrice * item.quantity;
        totalAmount += itemTotal;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
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
    });

    totalAmount = parseFloat(totalAmount.toFixed(2)); // Ensure totalAmount is a number
    totalAmountElement.textContent = `Total Amount: $${totalAmount}`;
    payAmountElement.textContent = totalAmount;

    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const paymentData = {
            payment: {
                cardName: document.getElementById('card-name').value,
                email: document.getElementById('email').value,
                cardNumber: document.getElementById('card-number').value,
                expiryDate: document.getElementById('expiry-date').value,
                cvv: document.getElementById('cvv').value,
                country: document.getElementById('country').value,
                totalAmount: totalAmount, // Ensure this is a number
                orderNumber: generateOrderNumber()
            },
            paymentItems: cartItems.map(item => ({
                itemNumber: item.itemNumber, // Ensure itemNumber is included
                itemName: item.name,
                itemDescription: item.description,
                itemQuantity: item.quantity,
                itemPrice: parseFloat(item.price),
                startDate: item.startDate, // Include startDate
                endDate: item.endDate // Include endDate
            }))
        };

        console.log('Payment Data:', JSON.stringify(paymentData)); // Debugging log

        fetch('/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        })
        .then(response => {
            if (response.ok) {
                alert('Payment processed successfully!');
                localStorage.removeItem('cartItems');
                window.location.href = 'success.html'; // Redirect to a success page
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .catch(error => {
            console.error('Error processing payment:', error);
            alert('Payment failed. Please try again.');
        });
    });

    function generateOrderNumber() {
        return 'ORDER-' + Math.floor(Math.random() * 1000000).toString();
    }

    const paymentOptions = document.querySelectorAll('.option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
