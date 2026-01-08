// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fermer le menu mobile après clic
            closeMenu();
        }
    });
});

// Menu hamburger mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

function closeMenu() {
    if (navLinks && menuToggle && menuOverlay) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openMenu() {
    if (navLinks && menuToggle && menuOverlay) {
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fermer le menu en cliquant sur l'overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de produits
document.querySelectorAll('.product-card, .stone').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Ici tu pourras plus tard ajouter l'envoi réel du formulaire
        // Pour l'instant, on affiche juste un message
        alert('Merci pour votre message ! Nous vous répondrons très bientôt. ✨');

        // Reset du formulaire
        this.reset();
    });
}

// Effet parallax léger sur le hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

console.log('🌙 Maincoon Bijoux - Site initialisé avec succès !');
