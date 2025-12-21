console.log('🔍 Debug Login Script Loaded');

// Override the form submit to add detailed logging
window.addEventListener('load', () => {
    console.log('✅ Page loaded, setting up login debugger...');
    
    // Find the login form
    const form = document.querySelector('form');
    if (!form) {
        console.error('❌ Login form not found!');
        return;
    }
    
    console.log('✅ Login form found');
    
    // Intercept form submission
    form.addEventListener('submit', async (e) => {
        console.log('📝 Form submitted!');
        
        const emailInput = form.querySelector('input[type="email"]');
        const passwordInput = form.querySelector('input[type="password"]');
        
        if (emailInput && passwordInput) {
            console.log('📧 Email:', emailInput.value);
            console.log('🔑 Password:', passwordInput.value ? '***' + passwordInput.value.slice(-2) : 'empty');
            console.log('📊 Email length:', emailInput.value.length);
            console.log('📊 Password length:', passwordInput.value.length);
        } else {
            console.error('❌ Could not find email/password inputs');
        }
    }, true); // Use capture phase
    
    console.log('✅ Login debugger ready');
});

// Log all Firebase errors
window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('firebase')) {
        console.error('🔥 Firebase Error:', e.message);
    }
});

// Log all unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('⚠️ Unhandled Promise Rejection:', e.reason);
});
