document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.email-signup');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const submitButton = form.querySelector('button');
        
        // Immediately show success state
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribed!';
        submitButton.style.backgroundColor = '#22c55e';
        
        // Clear the form immediately
        form.reset();
        
        try {
            const response = await fetch('https://undrafted-newsletter-production.up.railway.app/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.error);
            }
            
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // Reset button after 2 seconds
            setTimeout(() => {
                submitButton.textContent = 'Subscribe';
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 2000);
        }
    });
});
