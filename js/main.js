// -------------------------------
// Fonction pour charger un fragment HTML (header/footer)
// -------------------------------
async function loadHTML(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Impossible de charger ${file}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (err) {
        console.error(err);
    }
}

// -------------------------------
// Fonction pour afficher la bannière cookies
// -------------------------------
function showCookieBanner() {
    if (localStorage.getItem('cookiesConsent')) return; // déjà choisi

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
        <p>
            Ce site utilise des cookies pour améliorer votre expérience.
            <button id="accept-cookies">Accepter</button>
            <button id="reject-cookies">Refuser</button>
            <a href="pages/privacy.html">En savoir plus</a>
        </p>
    `;
    document.body.prepend(banner);

    // Gestion des boutons
    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookiesConsent', 'accepted');
        banner.style.display = 'none';
        console.log('Cookies acceptés');
        // Ici : lancer les scripts analytics ou autres cookies non essentiels
    });

    document.getElementById('reject-cookies').addEventListener('click', () => {
        localStorage.setItem('cookiesConsent', 'rejected');
        banner.style.display = 'none';
        console.log('Cookies refusés');
        // Ici : ne pas lancer les scripts non essentiels
    });
}

function initAuthSwitch() {
    const authCard = document.querySelector('[data-auth-mode]');
    if (!authCard) return;

    const tabs = document.querySelectorAll('[data-auth-target]');
    const panels = document.querySelectorAll('[data-auth-panel]');

    function setMode(mode) {
        authCard.setAttribute('data-auth-mode', mode);

        tabs.forEach((tab) => {
            const isActive = tab.getAttribute('data-auth-target') === mode;
            tab.classList.toggle('is-active', isActive);

            if (tab.classList.contains('auth-tab')) {
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            }
        });

        panels.forEach((panel) => {
            const isActive = panel.getAttribute('data-auth-panel') === mode;
            panel.classList.toggle('is-active', isActive);
            panel.hidden = !isActive;
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            setMode(tab.getAttribute('data-auth-target'));
        });
    });

    setMode(authCard.getAttribute('data-auth-mode') || 'login');
}

// -------------------------------
// Exécution au chargement de la page
// -------------------------------
window.addEventListener('load', () => {
    // Détection du chemin pour header/footer
    const pathPrefix = window.location.pathname.includes("/pages/") ? "../partials/" : "partials/";

    // Chargement du header et footer
    loadHTML('header', pathPrefix + 'header.html');
    loadHTML('footer', pathPrefix + 'footer.html');

    // Affichage de la bannière cookies
    showCookieBanner();
    initAuthSwitch();
});
