const projects = [
    {
        id: 1,
        title: 'Project Naam',
        description: 'Korte beschrijving van het project en wat het doet.',
        image: 'assets/images/project1.jpg',
        tags: ['HTML', 'CSS', 'JavaScript'],
        demoUrl: '#',
        codeUrl: '#'
    },
    {
        id: 2,
        title: 'Project Naam',
        description: 'Korte beschrijving van het project en wat het doet.',
        image: 'assets/images/project2.jpg',
        tags: ['React', 'Node.js', 'MongoDB'],
        demoUrl: '#',
        codeUrl: '#'
    },
    {
        id: 3,
        title: 'Project Naam',
        description: 'Korte beschrijving van het project en wat het doet.',
        image: 'assets/images/project3.jpg',
        tags: ['Vue', 'TypeScript', 'Firebase'],
        demoUrl: '#',
        codeUrl: '#'
    }
];

function createProjectCard(project) {
    return `
        <article class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-card__image" loading="lazy">
            <div class="project-card__content">
                <h3 class="project-card__title">${project.title}</h3>
                <p class="project-card__description">${project.description}</p>
                <div class="project-card__tags">
                    ${project.tags.map(tag => `<span class="project-card__tag">${tag}</span>`).join('')}
                </div>
                <div class="project-card__links">
                    <a href="${project.demoUrl}" class="project-card__link" target="_blank" rel="noopener noreferrer">Demo</a>
                    <a href="${project.codeUrl}" class="project-card__link" target="_blank" rel="noopener noreferrer">Code</a>
                </div>
            </div>
        </article>
    `;
}

function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (container) {
        container.innerHTML = projects.map(createProjectCard).join('');
    }
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
                const headerHeight = document.querySelector('.header').offsetHeight;
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
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initHeaderScroll();
});