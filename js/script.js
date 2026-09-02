document.addEventListener('DOMContentLoaded', function() {

            // ---- Loader de entrada ----
            const loader = document.getElementById('pageLoader');
            if (loader) {
                document.body.classList.add('is-loading');
                const minimumTime = new Promise(resolve => setTimeout(resolve, 1500));
                const pageLoad = new Promise(resolve => {
                    if (document.readyState === 'complete') {
                        resolve();
                    } else {
                        window.addEventListener('load', resolve, { once: true });
                    }
                });
                Promise.all([minimumTime, pageLoad]).then(() => {
                    loader.classList.add('is-hidden');
                    document.body.classList.remove('is-loading');
                    setTimeout(() => loader.remove(), 700);
                });
            }

            // ---- Menu mobile ----
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');

            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', function() {
                    this.classList.toggle('active');
                    navLinks.classList.toggle('open');
                    this.setAttribute('aria-expanded', String(this.classList.contains('active')));
                });
            }

            // Fecha menu ao clicar em link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle?.classList.remove('active');
                    navLinks?.classList.remove('open');
                    menuToggle?.setAttribute('aria-expanded', 'false');
                });
            });

                // ---- Formulario de contato ----
                const contactForm = document.getElementById('contato-form');
            if (contactForm) contactForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    const formData = new FormData(contactForm);
                    const message = [
                        'Olá! Gostaria de conhecer a Prossigo para o Alvo.',
                        `Nome: ${formData.get('nome')}`,
                        `WhatsApp: ${formData.get('telefone')}`,
                        formData.get('mensagem') ? `Mensagem: ${formData.get('mensagem')}` : ''
                    ].filter(Boolean).join('\n');
                    window.open(`https://wa.me/558198014171?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
                    contactForm.reset();
            });

            // ---- Scroll animations com Intersection Observer ----
            const sections = document.querySelectorAll('section:not(.hero)');
            const acolhimentoImg = document.getElementById('acolhimento-img');
            const depoimentos = document.querySelectorAll('.depoimento-card');
            const footer = document.getElementById('footer');

            if (!('IntersectionObserver' in window)) {
                sections.forEach(section => section.classList.add('visible'));
                acolhimentoImg?.classList.add('visible');
                depoimentos.forEach(card => card.classList.add('visible'));
                footer?.classList.add('visible');
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');

                        // Se for a seção de depoimentos, anima os cards com stagger
                        if (entry.target.id === 'depoimentos') {
                            depoimentos.forEach((card, i) => {
                                setTimeout(() => {
                                    card.classList.add('visible');
                                }, 100 + (i * 120));
                            });
                        }
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });

            sections.forEach(section => {
                observer.observe(section);
            });

            // Observer para imagem de acolhimento (scroll triggered)
            const imgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.2 });

            if (acolhimentoImg) imgObserver.observe(acolhimentoImg);

            // Observer para depoimentos individuais (fallback)
            const depoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15 });

            depoimentos.forEach(card => {
                depoObserver.observe(card);
            });

            // ---- Footer fade ----
            const footerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            if (footer) footerObserver.observe(footer);

        });
