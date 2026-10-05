function createProjectCard(project) {
    const hasDemo = Boolean(project.demoUrl) && project.demoUrl !== '#';
    const hasCode = Boolean(project.codeUrl) && project.codeUrl !== '#';

    let links = '';
    if (hasDemo) {
        links += `<a href="${project.demoUrl}" class="project-card__link" target="_blank" rel="noopener noreferrer">Demo</a>`;
    }
    if (hasCode) {
        links += `<a href="${project.codeUrl}" class="project-card__link" target="_blank" rel="noopener noreferrer">Code</a>`;
    }
    if (!links) {
        links = '<span class="project-card__soon">Binnenkort beschikbaar</span>';
    }

    return `
        <article class="project-card" data-category="${project.category}">
            <img src="${project.image}" alt="Screenshot van ${project.title}" class="project-card__image" loading="lazy">
            <div class="project-card__content">
                <div class="project-card__meta">
                    <span>${project.year}</span>
                    <span>${project.status}</span>
                </div>
                <h3 class="project-card__title">${project.title}</h3>
                <p class="project-card__description">${project.description}</p>
                <div class="project-card__tags">
                    ${project.tags.map(tag => `<span class="project-card__tag">${tag}</span>`).join('')}
                </div>
                <div class="project-card__links">${links}</div>
            </div>
        </article>
    `;
}

function renderProjects(containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const list = typeof limit === 'number' ? projects.slice(0, limit) : projects;
    container.innerHTML = list.map(createProjectCard).join('');
}

function initFilters() {
    const filters = document.getElementById('filters');
    const grid = document.getElementById('projects-grid');
    if (!filters || !grid) return;

    const buttons = filters.querySelectorAll('.filters__btn');
    const empty = document.getElementById('projects-empty');
    const count = document.getElementById('projects-count');

    function applyFilter(category) {
        let visible = 0;

        grid.querySelectorAll('.project-card').forEach(card => {
            const show = category === 'all' || card.dataset.category === category;
            card.hidden = !show;
            if (show) visible += 1;
        });

        if (count) {
            count.textContent = visible + (visible === 1 ? ' project' : ' projecten');
        }
        if (empty) {
            empty.hidden = visible !== 0;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(other => {
                other.classList.remove('filters__btn--active');
                other.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('filters__btn--active');
            button.setAttribute('aria-pressed', 'true');
            applyFilter(button.dataset.filter);
        });
    });
}

function initActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (page !== 'projecten.html') return;

    document.querySelectorAll('.nav__link').forEach(link => {
        if ((link.getAttribute('href') || '').indexOf('projecten') !== -1) {
            link.classList.add('nav__link--active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

function initMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isActive);
        });

        menu.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerElement = document.querySelector('.header');
                const headerHeight = headerElement ? headerElement.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Versturen...';
            submitBtn.disabled = true;

            try {
                console.log('Formulier verzonden:', data);
                alert('Bedankt voor je bericht! Ik neem zo snel mogelijk contact op.');
                form.reset();
            } catch (error) {
                console.error('Fout bij versturen:', error);
                alert('Er is een fout opgetreden. Probeer het later opnieuw.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section > .container > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects('projects-grid');
    renderProjects('projects-preview', 3);
    initFilters();
    initActiveNav();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initHeaderScroll();
});