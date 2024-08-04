// contact.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;

        const data = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                const errorData = await response.json();
                alert('Failed to send message: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the message.');
        }
    });
});
