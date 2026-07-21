// Toggle between services
const buyBtn = document.getElementById('buy-btn');
const sellBtn = document.getElementById('sell-btn');
const contactBtn = document.getElementById('contact-btn');
const buySection = document.getElementById('buy-home');
const sellSection = document.getElementById('sell-home');
const contactForm = document.getElementById('contact-form');

// Initialize the page with Buy section active
document.addEventListener('DOMContentLoaded', () => {
    buyBtn.classList.add('active');
    buySection.classList.add('active');
});

buyBtn.addEventListener('click', () => {
    buyBtn.classList.add('active');
    sellBtn.classList.remove('active');
    contactBtn.classList.remove('active');
    buySection.classList.add('active');
    sellSection.classList.remove('active');
    contactForm.classList.remove('active');
});

sellBtn.addEventListener('click', () => {
    sellBtn.classList.add('active');
    buyBtn.classList.remove('active');
    contactBtn.classList.remove('active');
    sellSection.classList.add('active');
    buySection.classList.remove('active');
    contactForm.classList.remove('active');
});

contactBtn.addEventListener('click', () => {
    contactBtn.classList.add('active');
    buyBtn.classList.remove('active');
    sellBtn.classList.remove('active');
    contactForm.classList.add('active');
    buySection.classList.remove('active');
    sellSection.classList.remove('active');
});

// Show contact form with specific service selected
function showForm(service) {
    const form = document.getElementById('contact-form');
    const serviceSelect = document.getElementById('service');
    const content = document.querySelector('.content');
    
    // Set the selected service in the form
    if (service === 'buy') {
        serviceSelect.value = 'buy';
    } else if (service === 'sell') {
        serviceSelect.value = 'sell';
    }
    
    // Activate contact button and form
    contactBtn.classList.add('active');
    buyBtn.classList.remove('active');
    sellBtn.classList.remove('active');
    
    // Hide all content sections and show form
    buySection.classList.remove('active');
    sellSection.classList.remove('active');
    form.classList.add('active');
    
    // Scroll to the form for better UX
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideForm() {
    const form = document.getElementById('contact-form');
    const content = document.querySelector('.content');
    
    // Hide the form
    form.classList.remove('active');
    
    // Show the appropriate content based on active button
    if (buyBtn.classList.contains('active')) {
        buySection.classList.add('active');
    } else if (sellBtn.classList.contains('active')) {
        sellSection.classList.add('active');
    }
}

// Interactive Glowing Menu
function toggleMenu() {
    const menuOverlay = document.querySelector('.menu-overlay');
    menuOverlay.classList.toggle('active');
}

// Close Menu When Clicking on Dark Background
document.addEventListener('click', (event) => {
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuContent = document.querySelector('.menu-content');
    const menuIcon = document.querySelector('.menu-icon');

    if (
        menuOverlay.classList.contains('active') &&
        !menuContent.contains(event.target) &&
        !menuIcon.contains(event.target)
    ) {
        menuOverlay.classList.remove('active');
    }
});

// Navigation function for menu items
function navigate(page) {
    // You can add specific navigation logic here if needed
    console.log(`Navigating to ${page}`);
    toggleMenu(); // Close the menu after selection
}


//Menu flash on load
// JavaScript for menu functionality with flash effect
document.addEventListener('DOMContentLoaded', function() {
    // Get menu elements
    const menuIcon = document.querySelector('.menu-icon');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Function to toggle menu
    function toggleMenu() {
        menuIcon.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Add pulse animation when menu is active
        if (menuIcon.classList.contains('active')) {
            menuIcon.style.animation = 'pulse 2s infinite';
        } else {
            menuIcon.style.animation = 'none';
        }
    }
    
    // Add event listener to menu icon
    if (menuIcon) {
        menuIcon.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu-content a');
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // Add flash animation to menu when page loads
    if (menuIcon) {
        // Remove any existing animation
        menuIcon.style.animation = 'none';
        
        // Trigger reflow
        void menuIcon.offsetWidth;
        
        // Apply the flash animation
        menuIcon.style.animation = 'flashAnimation 2s ease-in-out 1';
        
        // After animation completes, set to normal state
        setTimeout(() => {
            menuIcon.style.animation = 'none';
        }, 2000);
    }
    
    // Service buttons functionality
    const buyBtn = document.getElementById('buy-btn');
    const sellBtn = document.getElementById('sell-btn');
    const contactBtn = document.getElementById('contact-btn');
    
    if (buyBtn && sellBtn && contactBtn) {
        buyBtn.addEventListener('click', function() {
            showSection('buy-home');
            setActiveButton(this);
        });
        
        sellBtn.addEventListener('click', function() {
            showSection('sell-home');
            setActiveButton(this);
        });
        
        contactBtn.addEventListener('click', function() {
            showSection('contact-form');
            setActiveButton(this);
        });
    }
    
    function showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.content section, #contact-form');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    function setActiveButton(button) {
        // Remove active class from all buttons
        const buttons = document.querySelectorAll('.service-buttons button');
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
    }
});


