document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sideNav = document.getElementById('side-nav');
    const navLinks = sideNav.querySelectorAll('a');
    const pages = document.querySelectorAll('.page');
    const body = document.body; // Get the body element

    // --- Navigation Toggle ---
    function openNav() {
        sideNav.classList.add('active');
        // Add class to body only if screen is wide enough to push content
        if (window.innerWidth > 768) {
            body.classList.add('nav-open');
        }
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
        sideNav.classList.remove('active');
        body.classList.remove('nav-open'); // Remove class from body
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    menuToggle.addEventListener('click', openNav);
    menuClose.addEventListener('click', closeNav);

    // Close nav if clicking outside of it (optional)
    document.addEventListener('click', (event) => {
        if (!sideNav.contains(event.target) && !menuToggle.contains(event.target) && sideNav.classList.contains('active')) {
            closeNav();
        }
    });

    // --- Page Switching ---
    function showPage(targetId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        } else {
            // Fallback to home if target not found
            document.getElementById('home').classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor jump
            const targetId = link.getAttribute('href').substring(1); // Get id from href (remove #)
            showPage(targetId);
            // Close the nav after clicking a link, especially on mobile
            if (window.innerWidth <= 768) {
                closeNav();
            }
        });
    });

    // Show the initial page (home) based on hash or default
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        showPage(initialHash);
    } else {
        showPage('home'); // Default to home
    }

    // Handle browser back/forward navigation
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        showPage(hash || 'home'); // Show page based on new hash or default to home
    });

    // Adjust body class on resize
    window.addEventListener('resize', () => {
        if (sideNav.classList.contains('active')) {
            if (window.innerWidth <= 768) {
                body.classList.remove('nav-open');
            } else {
                body.classList.add('nav-open');
            }
        }
    });
});