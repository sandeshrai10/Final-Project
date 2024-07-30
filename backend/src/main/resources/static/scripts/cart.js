// document.addEventListener('DOMContentLoaded', () => {
//     const cartContainer = document.getElementById('cart-container');
//     const closeCartButton = document.getElementById('close-cart');
//     const cartItemsContainer = document.getElementById('cart-items');
//     const checkoutButton = document.getElementById('checkout-btn');
//     const totalAmountElement = document.getElementById('total-amount');

//     function toggleCart() {
//         cartContainer.classList.toggle('open');
//     }

//     function renderCartItems() {
//         const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//         cartItemsContainer.innerHTML = '';
//         let totalAmount = 0;

//         cartItems.forEach((item, index) => {
//             const cartItemElement = document.createElement('div');
//             cartItemElement.className = 'cart-item';
//             totalAmount += parseFloat(item.price);
//             cartItemElement.innerHTML = `
//                 <img src="${item.image}" alt="${item.name}">
//                 <div class="cart-item-details">
//                     <h4>${item.name}</h4>
//                     <p>${item.description}</p>
//                     <p>Quantity: ${item.quantity}</p>
//                 </div>
//                 <div class="cart-item-price">$${item.price}</div>
//                 <button class="remove-item" data-index="${index}">&times;</button>
//             `;
//             cartItemsContainer.appendChild(cartItemElement);
//         });

//         totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;

//         document.querySelectorAll('.remove-item').forEach(button => {
//             button.addEventListener('click', (event) => {
//                 const index = event.target.dataset.index;
//                 removeCartItem(index);
//             });
//         });
//     }

//     function removeCartItem(index) {
//         let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//         cartItems.splice(index, 1);
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//         renderCartItems();
//     }

//     closeCartButton.addEventListener('click', toggleCart);
//     checkoutButton.addEventListener('click', () => {
//         alert('Proceeding to checkout!');
//         window.location.href = 'payment.html';

//     });

//     const cartButton = document.getElementById('cart-button');
//     if (cartButton) {
//         cartButton.addEventListener('click', toggleCart);
//     }

//     renderCartItems();
// });





document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-btn');
    const totalAmountElement = document.getElementById('total-amount');

    function toggleCart() {
        cartContainer.classList.toggle('open');
    }

    function renderCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;

        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            totalAmount += parseFloat(item.price) * item.quantity; // Calculate total amount considering quantity
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="cart-item-price">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                <button class="remove-item" data-index="${index}">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeCartItem(index);
            });
        });
    }

    function removeCartItem(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    }

    closeCartButton.addEventListener('click', toggleCart);
    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout!');
        window.location.href = 'payment.html';
    });

    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }

    renderCartItems();
});
