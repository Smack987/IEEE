function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the requested screen
    document.getElementById(screenId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Remember me functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if there are saved credentials
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPassword = localStorage.getItem('savedPassword');
        const savedUserType = localStorage.getItem('savedUserType');
        
        if (savedEmail && savedPassword && savedUserType) {
            // Pre-fill the login form based on user type
            document.getElementById(`${savedUserType}-email`).value = savedEmail;
            document.getElementById(`${savedUserType}-password`).value = savedPassword;
            document.getElementById(`${savedUserType}-remember`).checked = true;
            
            // Show the appropriate login screen
            showScreen(`${savedUserType}-login`);
        }
    }
    
    // Add event listeners to login buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent === 'Sign In') {
            button.addEventListener('click', function() {
                const screenId = this.closest('.screen').id;
                const userType = screenId.split('-')[0];
                const rememberMe = document.getElementById(`${userType}-remember`).checked;
                const email = document.getElementById(`${userType}-email`).value;
                const password = document.getElementById(`${userType}-password`).value;
                
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('savedEmail', email);
                    localStorage.setItem('savedPassword', password);
                    localStorage.setItem('savedUserType', userType);
                } else {
                    localStorage.setItem('rememberMe', 'false');
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('savedPassword');
                    localStorage.removeItem('savedUserType');
                }
            });
        }
    });
});

// Form validation for login screens
document.addEventListener('DOMContentLoaded', function() {
    const loginForms = document.querySelectorAll('form');
    
    loginForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const passwordInput = form.querySelector('input[type="password"]');
            
            if (emailInput && passwordInput) {
                if (!emailInput.value || !passwordInput.value) {
                    alert('Please fill in all fields');
                    return;
                }
                
                if (!isValidEmail(emailInput.value)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // If all validations pass, proceed with login
                console.log('Login form submitted successfully');
            }
        });
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});