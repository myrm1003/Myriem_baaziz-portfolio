document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const homeLink = document.getElementById('home-link');
    const homeContent = document.getElementById('home-content');
    const profilContent = document.getElementById('profil-content');
    
    // Fonction pour charger le contenu des pages
    async function loadContent(page) {
        try {
            const response = await fetch(`pages/${page}.html`);
            const content = await response.text();
            document.querySelector('.content-area').innerHTML = content;
        } catch (error) {
            console.error('Erreur de chargement:', error);
        }
    }

    // Fonction pour cacher toutes les sections
    function hideAllSections() {
        const sections = document.querySelectorAll('.page-content');
        sections.forEach(section => section.style.display = 'none');
    }

    // Gestion des liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('href').substring(1);
            
            // Charger le contenu de la page
            await loadContent(page);
            
            // Mettre à jour la classe active
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Gestion du clic sur le logo MB pour revenir à l'accueil
    homeLink.addEventListener('click', async () => {
        await loadContent('accueil');
        navLinks.forEach(link => link.classList.remove('active'));
    });

    // Animation des barres de compétences
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.setProperty('--width', `${level}%`);
    });
});

