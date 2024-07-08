document.addEventListener('DOMContentLoaded', function() {
    const totalAmount = localStorage.getItem('totalAmount');
    document.getElementById('total-amount').innerText = `$${totalAmount}`;
    document.getElementById('pay-amount').innerText = totalAmount;

    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Payment processed successfully!');
        // Here you would typically send the payment data to the server
    });

    // Handle payment option selection
    const paymentOptions = document.querySelectorAll('.option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
