// ---- Toggle between services (Buy, Sell, Lease, Contact) ----
const buyBtn = document.getElementById('buy-btn');
const sellBtn = document.getElementById('sell-btn');
const leaseBtn = document.getElementById('lease-btn');
const contactBtn = document.getElementById('contact-btn');

const buySection = document.getElementById('buy-home');
const sellSection = document.getElementById('sell-home');
const leaseSection = document.getElementById('lease-home');

const contactFormGeneric = document.getElementById('contact-form-generic');
const contactFormBuy = document.getElementById('contact-form-buy');
const contactFormSell = document.getElementById('contact-form-sell');
const contactFormLease = document.getElementById('contact-form-lease');

// ---- Helper: hide all sections and forms ----
function hideAllSections() {
    document.querySelectorAll('#buy-home, #sell-home, #lease-home')
        .forEach(el => el.classList.remove('active'));
}

function hideAllForms() {
    document.querySelectorAll('#contact-form-generic, #contact-form-buy, #contact-form-sell, #contact-form-lease')
        .forEach(el => el.style.display = 'none');
}

function deactivateAllButtons() {
    document.querySelectorAll('#buy-btn, #sell-btn, #lease-btn, #contact-btn')
        .forEach(el => el.classList.remove('active'));
}

// ---- Helper: slow scroll to center the content box ----
function scrollToContent() {
    const content = document.querySelector('.content');
    if (content) {
        content.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ---- Service button click handlers ----
buyBtn.addEventListener('click', () => {
    deactivateAllButtons();
    buyBtn.classList.add('active');
    hideAllSections();
    hideAllForms();
    buySection.classList.add('active');
    scrollToContent();
});

sellBtn.addEventListener('click', () => {
    deactivateAllButtons();
    sellBtn.classList.add('active');
    hideAllSections();
    hideAllForms();
    sellSection.classList.add('active');
    scrollToContent();
});

leaseBtn.addEventListener('click', () => {
    deactivateAllButtons();
    leaseBtn.classList.add('active');
    hideAllSections();
    hideAllForms();
    leaseSection.classList.add('active');
    scrollToContent();
});

contactBtn.addEventListener('click', () => {
    deactivateAllButtons();
    contactBtn.classList.add('active');
    hideAllSections();
    hideAllForms();
    contactFormGeneric.style.display = 'block';
    scrollToContent();
});

// ---- Switch between services (Buy, Sell, Lease) from form nav buttons ----
function switchService(service) {
    // Hide all forms and sections
    hideAllForms();
    hideAllSections();
    deactivateAllButtons();

    if (service === 'buy') {
        buyBtn.classList.add('active');
        buySection.classList.add('active');
    } else if (service === 'sell') {
        sellBtn.classList.add('active');
        sellSection.classList.add('active');
    } else if (service === 'lease') {
        leaseBtn.classList.add('active');
        leaseSection.classList.add('active');
    }

    // Slow scroll to center the content box
    scrollToContent();
}

// ---- Show contact form with specific service selected ----
function showForm(service) {
    deactivateAllButtons();
    contactBtn.classList.add('active');
    hideAllSections();
    hideAllForms();

    let formToShow;
    if (service === 'buy') {
        formToShow = contactFormBuy;
    } else if (service === 'sell') {
        formToShow = contactFormSell;
    } else if (service === 'lease') {
        formToShow = contactFormLease;
    } else {
        formToShow = contactFormGeneric;
    }
    formToShow.style.display = 'block';
    
    // Slow scroll to center the content box
    scrollToContent();
}

// ---- Glowing Menu toggle ----
function toggleMenu() {
    const overlay = document.querySelector('.menu-overlay');
    overlay.classList.toggle('active');
}

// ---- Close menu helper (used by outside click & Escape key) ----
function closeMenu() {
    const overlay = document.querySelector('.menu-overlay');
    if (overlay.classList.contains('active')) {
        overlay.classList.remove('active');
        // Return focus to the menu icon for accessibility
        const icon = document.querySelector('.menu-icon');
        if (icon) icon.focus();
    }
}

// ---- Close menu when clicking outside ----
document.addEventListener('click', (event) => {
    const overlay = document.querySelector('.menu-overlay');
    const content = document.querySelector('.menu-content');
    const icon = document.querySelector('.menu-icon');
    if (overlay.classList.contains('active') && !content.contains(event.target) && !icon.contains(event.target)) {
        closeMenu();
    }
});

// ---- Close menu on Escape key ----
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// Expose functions to global scope for inline onclick attributes
window.switchService = switchService;
window.showForm = showForm;
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;