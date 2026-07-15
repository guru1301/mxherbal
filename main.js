/* MX Herbal Beauty — Luxury Hero Section JavaScript Interactions */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Launch Entry Trigger
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // 2. Navigation Shrinking and Backdrop Opacity on Scroll
    const mainNav = document.getElementById('main-nav');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially in case page loaded scrolled
    handleScroll();

    // 3. Custom Premium Cursor lagging effect
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    let mouseX = 0, mouseY = 0; // Current mouse position
    let cursorX = 0, cursorY = 0; // Follower current position
    let isHovering = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for the dot
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Animate Follower with interpolation (lerp) for smooth luxury lag
    const animateCursor = () => {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        // Interpolation factor: 0.15 makes it float smoothly
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        follower.style.left = `${cursorX}px`;
        follower.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    // Hover effect expansions for links & interactive elements
    const interactives = document.querySelectorAll('a, button, .nav-toggle');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '14px';
            cursor.style.height = '14px';
            cursor.style.backgroundColor = 'var(--color-forest)';
            follower.style.width = '46px';
            follower.style.height = '46px';
            follower.style.borderColor = 'var(--color-gold)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.backgroundColor = 'var(--color-gold)';
            follower.style.width = '32px';
            follower.style.height = '32px';
            follower.style.borderColor = 'rgba(191, 163, 122, 0.3)';
        });
    });

    // Hide custom cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });


    // 4. Background image is static as requested.
    // No parallax or zoom animations are applied to .hero-bg-image.


    // 5. Canvas-based Floating Organic Micro-Particles (Botanical golden dust)
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 95;

    const resizeCanvas = () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
            // Start at random coordinates across the canvas initially
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20; // Start just below screen
            this.size = Math.random() * 2.2 + 0.8; // Small premium size (0.8px to 3px)
            this.speedY = -(Math.random() * 0.3 + 0.1); // Slow upward float
            this.speedX = (Math.random() * 0.2 - 0.1); // Slow horizontal drift
            this.amplitude = Math.random() * 0.6 + 0.2; // Sine wave amplitude
            this.angle = Math.random() * Math.PI * 2;
            this.angleSpeed = Math.random() * 0.02 + 0.005;
            this.maxOpacity = Math.random() * 0.35 + 0.15; // Muted soft glow
            this.opacity = 0;
            this.fadeIn = true;
        }

        update() {
            this.y += this.speedY;
            this.angle += this.angleSpeed;
            this.x += this.speedX + Math.sin(this.angle) * this.amplitude * 0.5;

            // Handle fade in and fade out limits
            if (this.fadeIn) {
                this.opacity += 0.01;
                if (this.opacity >= this.maxOpacity) {
                    this.fadeIn = false;
                }
            } else {
                // If it floats near top, fade it out
                if (this.y < 100) {
                    this.opacity -= 0.01;
                }
            }

            // Reset when offscreen or completely transparent
            if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10 || this.opacity <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            // Give golden dust glow or ivory pollen look randomly
            const isGold = Math.random() > 0.4;
            const r = isGold ? 191 : 250;
            const g = isGold ? 163 : 249;
            const b = isGold ? 122 : 245;
            
            // Soft radial glow shape
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size
            );
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Particles loop
    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animateParticles);
    };
    requestAnimationFrame(animateParticles);


    // 5b. Collection Canvas-based Floating Organic Micro-Particles (Botanical golden dust)
    const collectionCanvas = document.getElementById('collection-particles-canvas');
    if (collectionCanvas) {
        const cCtx = collectionCanvas.getContext('2d');
        let collectionParticles = [];
        const collectionParticleCount = 40;

        const resizeCollectionCanvas = () => {
            collectionCanvas.width = collectionCanvas.parentElement.offsetWidth;
            collectionCanvas.height = collectionCanvas.parentElement.offsetHeight;
        };
        window.addEventListener('resize', resizeCollectionCanvas);
        resizeCollectionCanvas();

        class CollectionParticle {
            constructor() {
                this.reset();
                this.y = Math.random() * collectionCanvas.height;
            }

            reset() {
                this.x = Math.random() * collectionCanvas.width;
                this.y = collectionCanvas.height + 20;
                this.size = Math.random() * 2.2 + 0.8;
                this.speedY = -(Math.random() * 0.3 + 0.1);
                this.speedX = (Math.random() * 0.2 - 0.1);
                this.amplitude = Math.random() * 0.6 + 0.2;
                this.angle = Math.random() * Math.PI * 2;
                this.angleSpeed = Math.random() * 0.02 + 0.005;
                this.maxOpacity = Math.random() * 0.35 + 0.15;
                this.opacity = 0;
                this.fadeIn = true;
            }

            update() {
                this.y += this.speedY;
                this.angle += this.angleSpeed;
                this.x += this.speedX + Math.sin(this.angle) * this.amplitude * 0.5;

                if (this.fadeIn) {
                    this.opacity += 0.01;
                    if (this.opacity >= this.maxOpacity) {
                        this.fadeIn = false;
                    }
                } else {
                    if (this.y < 100) {
                        this.opacity -= 0.01;
                    }
                }

                if (this.y < -10 || this.x < -10 || this.x > collectionCanvas.width + 10 || this.opacity <= 0) {
                    this.reset();
                }
            }

            draw() {
                cCtx.beginPath();
                const isGold = Math.random() > 0.4;
                const r = isGold ? 191 : 250;
                const g = isGold ? 163 : 249;
                const b = isGold ? 122 : 245;
                
                const gradient = cCtx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                
                cCtx.fillStyle = gradient;
                cCtx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
                cCtx.fill();
            }
        }

        for (let i = 0; i < collectionParticleCount; i++) {
            collectionParticles.push(new CollectionParticle());
        }

        const animateCollectionParticles = () => {
            cCtx.clearRect(0, 0, collectionCanvas.width, collectionCanvas.height);
            collectionParticles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateCollectionParticles);
        };
        requestAnimationFrame(animateCollectionParticles);
    }


    // 6. Mobile Drawer Navigation Toggle
    const toggleBtn = document.querySelector('.nav-toggle');
    const drawer = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleDrawer = () => {
        const isOpen = drawer.classList.toggle('open');
        toggleBtn.classList.toggle('active');
        toggleBtn.setAttribute('aria-expanded', isOpen);
        drawer.setAttribute('aria-hidden', !isOpen);
        
        // Prevent body scrolling when menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    toggleBtn.addEventListener('click', toggleDrawer);

    // Close drawer when clicking mobile links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (drawer.classList.contains('open')) {
                toggleDrawer();
            }
        });
    });

    // Close drawer when screen is resized to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && drawer.classList.contains('open')) {
            toggleDrawer();
        }
    });

    // 7. Section 05: How to Use — The Herbal Ritual Interactive Logic
    const ritualData = {
        face: {
            title: "Herbal Face Powder Ritual",
            subtitle: "For fresh, clean & naturally radiant skin",
            steps: [
                {
                    number: "01",
                    title: "MIX",
                    image: "assets/step1.png",
                    description: "Take 1–2 teaspoons of MX Herbal Face Powder in a clean bowl. Add rose water, milk or aloe vera and mix well to form a smooth paste.",
                    icon: `<svg class="ritual-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18" /><path d="M12 2v10" /><path d="m9 9 3 3 3-3" /><path d="M4 12c0 4.4 3.6 8 8 8s8-3.6 8-8" /></svg>`
                },
                {
                    number: "02",
                    title: "APPLY",
                    image: "assets/step2.png",
                    description: "Apply evenly on your face and neck using clean fingertips or a soft face-pack brush. Avoid the delicate eye area.",
                    icon: `<svg class="ritual-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 8-8 8" /><path d="m15 5 4 4" /><path d="m19 9-2 2-4-4 2-2 4 4Z" /><path d="M9 15c-1.5 0-3-1.5-3-3l3-3 3 3-3 3Z" opacity="0.4" /></svg>`
                },
                {
                    number: "03",
                    title: "REST",
                    image: "assets/step3.png",
                    description: "Leave the herbal mask on for 15–20 minutes and allow it to gently settle on the skin.",
                    icon: `<svg class="ritual-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>`
                },
                {
                    number: "04",
                    title: "RINSE & REVEAL",
                    image: "assets/step4.png",
                    description: "Rinse gently with lukewarm water and pat dry. Follow with your preferred moisturizer as part of your regular skincare routine.",
                    icon: `<svg class="ritual-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C12 2 4 10.5 4 15a8 8 0 0 0 16 0c0-4.5-8-13-8-13Z" /></svg>`
                }
            ],
            results: {
                eyebrow: "Best Results:",
                text: "Use 2–3 times a week as part of your skincare routine. Follow with your preferred moisturizer.",
                labels: [
                    {
                        text: "Natural Glow",
                        icon: `<svg class="ritual-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.886H3.879l5.037 3.66L7.004 18.43 12 14.77l4.996 3.66-1.912-5.884 5.037-3.66h-6.209Z" /></svg>`
                    },
                    {
                        text: "Deep Cleansing",
                        icon: `<svg class="ritual-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>`
                    },
                    {
                        text: "Oil Balance",
                        icon: `<svg class="ritual-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20" /><path d="M5 12h14" /><path d="M8 19c-2 0-3-1.5-3-3" /><path d="M16 19c2 0 3-1.5 3-3" /></svg>`
                    },
                    {
                        text: "Healthy Skin",
                        icon: `<svg class="ritual-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>`
                    }
                ]
            }
        },
        hair: {
            title: "Herbal Hair Oil Ritual",
            subtitle: "For a nourished scalp & healthier-looking hair",
            steps: [
                {
                    number: "01",
                    title: "TAKE",
                    image: "assets/oil-step1.png",
                    description: "Take the required amount of MX Herbal Hair Oil based on your hair length and density.",
                    icon: `<svg class="ritual-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6" /><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7Z" /></svg>`
                },
                {
                    number: "02",
                    title: "MASSAGE",
                    image: "assets/oil-step2.png",
                    description: "Gently massage the oil into the scalp using circular motions for 5–10 minutes, distributing it through the roots and lengths.",
                    icon: `<svg class="ritual-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12" /><path d="M12 6a6 6 0 0 1 6 6" /><path d="M12 10a2 2 0 0 1 2 2" /></svg>`
                },
                {
                    number: "03",
                    title: "NOURISH",
                    image: "assets/oil-step3.png",
                    description: "Leave the oil on for at least 30 minutes before washing. For a longer conditioning ritual, it may be left on overnight if suitable for your routine.",
                    icon: `<svg class="ritual-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 9.3a7 7 0 0 1-9 8.7Z" /><path d="M9 22c0-3.5 2.5-6.5 5.5-8.5" /></svg>`
                },
                {
                    number: "04",
                    title: "WASH",
                    image: "assets/oil-step4.png",
                    description: "Wash thoroughly with a mild shampoo and rinse well. Use as part of your regular hair-care routine.",
                    icon: `<svg class="ritual-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18" /><path d="M12 3v13M8 12l4 4 4-4" /></svg>`
                }
            ],
            results: {
                eyebrow: "Hair Care Ritual:",
                text: "Consistency is key for healthy hair. Use regularly for optimal conditioning and nourishment.",
                labels: [
                    {
                        text: "Nourishes Scalp",
                        icon: `<svg class="ritual-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 4.3 7 13 7 13s7-8.7 7-7a7 7 0 0 0-7-7Z" /></svg>`
                    },
                    {
                        text: "Supports Hair",
                        icon: `<svg class="ritual-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>`
                    },
                    {
                        text: "Soft Feel",
                        icon: `<svg class="ritual-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76Z" /></svg>`
                    },
                    {
                        text: "Natural Shine",
                        icon: `<svg class="ritual-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>`
                    }
                ]
            }
        }
    };

    const renderRitual = (ritualKey) => {
        const data = ritualData[ritualKey];
        
        // 1. Update titles
        document.getElementById('ritual-active-title').innerText = data.title;
        document.getElementById('ritual-active-subtitle').innerText = data.subtitle;
        
        // 2. Render Cards
        const cardsContainer = document.querySelector('.ritual-cards-container');
        if (cardsContainer) {
            let cardsHtml = '';
            data.steps.forEach((step, idx) => {
                cardsHtml += `
                    <div class="ritual-card reveal-item ritual-card-${idx + 1}">
                        <div class="ritual-card-number">${step.number}</div>
                        <div class="ritual-card-image-circle">
                            <img src="${step.image}" alt="${step.title}" class="ritual-card-img" onerror="this.classList.add('hide'); this.nextElementSibling.classList.add('show');" loading="lazy">
                            <div class="ritual-card-img-placeholder">
                                <svg viewBox="0 0 100 100" class="placeholder-icon">
                                    <circle cx="50" cy="50" r="42" stroke="rgba(191, 163, 122, 0.3)" stroke-width="1" fill="none"/>
                                    <path d="M50 30 C47 40 38 45 50 70 C62 45 53 40 50 30 Z" fill="var(--color-gold)"/>
                                    <path d="M50 48 C42 52 35 60 48 70 C46 64 44 56 50 48 Z" fill="var(--color-gold)" opacity="0.6"/>
                                    <path d="M50 48 C58 52 65 60 52 70 C54 64 56 56 50 48 Z" fill="var(--color-gold)" opacity="0.6"/>
                                </svg>
                                <span class="placeholder-text">MX RITUAL</span>
                            </div>
                        </div>
                        <div class="ritual-card-title-wrap">
                            <span class="ritual-card-title">${step.title}</span>
                            ${step.icon}
                        </div>
                        <p class="ritual-card-desc">${step.description}</p>
                    </div>
                `;
            });
            
            // Add absolute connecting arrows
            cardsHtml += `
                <div class="ritual-arrow-connector ritual-arrow-connector-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
                <div class="ritual-arrow-connector ritual-arrow-connector-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
                <div class="ritual-arrow-connector ritual-arrow-connector-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
            `;
            
            cardsContainer.innerHTML = cardsHtml;
        }
        
        // 3. Render Results strip
        const resultsContainer = document.querySelector('.ritual-result-strip');
        if (resultsContainer) {
            let labelsHtml = '';
            data.results.labels.forEach(label => {
                labelsHtml += `
                    <div class="ritual-label-item">
                        ${label.icon}
                        <span>${label.text}</span>
                    </div>
                `;
            });
            
            resultsContainer.innerHTML = `
                <div class="ritual-result-info">
                    <span class="ritual-result-eyebrow">${data.results.eyebrow}</span>
                    <p class="ritual-result-text">${data.results.text}</p>
                </div>
                <div class="ritual-result-labels">
                    ${labelsHtml}
                </div>
            `;
        }

        // Expand hover custom cursor listeners to newly loaded items
        const interactivesNew = document.querySelectorAll('.ritual-section a, .ritual-section button');
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.custom-cursor-follower');
        if (cursor && follower) {
            interactivesNew.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.width = '14px';
                    cursor.style.height = '14px';
                    cursor.style.backgroundColor = 'var(--color-forest)';
                    follower.style.width = '46px';
                    follower.style.height = '46px';
                    follower.style.borderColor = 'var(--color-gold)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.width = '8px';
                    cursor.style.height = '8px';
                    cursor.style.backgroundColor = 'var(--color-gold)';
                    follower.style.width = '32px';
                    follower.style.height = '32px';
                    follower.style.borderColor = 'rgba(191, 163, 122, 0.3)';
                });
            });
        }
    };

    const switchRitual = (ritualKey) => {
        const switchEl = document.querySelector('.ritual-switch');
        const panel = document.getElementById('ritual-panel');
        if (!switchEl || !panel) return;
        
        // Set active switch classes and ARIA values
        if (ritualKey === 'hair') {
            switchEl.classList.add('active-hair');
            document.getElementById('tab-face').classList.remove('active');
            document.getElementById('tab-face').setAttribute('aria-selected', 'false');
            document.getElementById('tab-hair').classList.add('active');
            document.getElementById('tab-hair').setAttribute('aria-selected', 'true');
        } else {
            switchEl.classList.remove('active-hair');
            document.getElementById('tab-hair').classList.remove('active');
            document.getElementById('tab-hair').setAttribute('aria-selected', 'false');
            document.getElementById('tab-face').classList.add('active');
            document.getElementById('tab-face').setAttribute('aria-selected', 'true');
        }
        
        // Easing visual change
        panel.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            renderRitual(ritualKey);
            
            panel.style.transition = 'none';
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(10px)';
            
            panel.offsetHeight; // Force reflow
            
            panel.style.transition = 'opacity 0.35s cubic-bezier(0.25, 1, 0.3, 1), transform 0.35s cubic-bezier(0.25, 1, 0.3, 1)';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 220);
    };

    // Tab Listeners & Keyboards
    const tabFace = document.getElementById('tab-face');
    const tabHair = document.getElementById('tab-hair');
    if (tabFace && tabHair) {
        tabFace.addEventListener('click', () => switchRitual('face'));
        tabHair.addEventListener('click', () => switchRitual('hair'));
        
        const handleTabKey = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                if (tabFace.classList.contains('active')) {
                    tabHair.focus();
                    switchRitual('hair');
                } else {
                    tabFace.focus();
                    switchRitual('face');
                }
            }
        };
        tabFace.addEventListener('keydown', handleTabKey);
        tabHair.addEventListener('keydown', handleTabKey);
    }

    // Initialize Default State
    renderRitual('face');

    // 8. Scroll Reveal for all sections (including Section 05)
    const revealSections = document.querySelectorAll('.philosophy-section, .benefits-section, .collection-section, .ritual-section');
    revealSections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.classList.add('active');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, {
            threshold: 0.10 // Trigger when 10% of the section is visible
        });
        
        observer.observe(section);
    });
});
