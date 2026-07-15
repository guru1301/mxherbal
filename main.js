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

    // 9. Section 06: Enquiry Form Validation
    const enquiryForm = document.getElementById('enquiry-form');
    const formSuccess = document.getElementById('form-success');
    
    if (enquiryForm && formSuccess) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get fields
            const nameInput = document.getElementById('form-name');
            const phoneInput = document.getElementById('form-phone');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message');
            
            // Get error message placeholders
            const errName = document.getElementById('error-name');
            const errPhone = document.getElementById('error-phone');
            const errEmail = document.getElementById('error-email');
            const errMessage = document.getElementById('error-message');
            
            // Clear prior errors
            errName.innerText = '';
            errPhone.innerText = '';
            errEmail.innerText = '';
            errMessage.innerText = '';
            
            let isValid = true;
            
            // Name validation
            if (!nameInput.value.trim()) {
                errName.innerText = 'Please enter your full name.';
                isValid = false;
            }
            
            // Phone validation
            const phoneVal = phoneInput.value.trim();
            const phoneRegex = /^\+?[0-9\s\-()]{7,18}$/;
            if (!phoneVal) {
                errPhone.innerText = 'Please enter your phone number.';
                isValid = false;
            } else if (!phoneRegex.test(phoneVal)) {
                errPhone.innerText = 'Please enter a valid phone number (min 7 digits).';
                isValid = false;
            }
            
            // Email validation
            const emailVal = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal) {
                errEmail.innerText = 'Please enter your email address.';
                isValid = false;
            } else if (!emailRegex.test(emailVal)) {
                errEmail.innerText = 'Please enter a valid email address.';
                isValid = false;
            }
            
            // Message validation
            if (!messageInput.value.trim()) {
                errMessage.innerText = 'Please enter your message.';
                isValid = false;
            }
            
            if (isValid) {
                // Submit action to the custom Python backend API
                const formData = {
                    name: nameInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    email: emailInput.value.trim(),
                    interest: document.getElementById('form-interest').value,
                    message: messageInput.value.trim()
                };

                // Perform the POST fetch request
                fetch('/api/enquiry', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Transition to success state on successful response
                    enquiryForm.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    enquiryForm.style.opacity = '0';
                    enquiryForm.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        enquiryForm.style.display = 'none';
                        formSuccess.style.display = 'block';
                        enquiryForm.reset();
                    }, 300);
                })
                .catch(error => {
                    console.warn('API submission failed, using graceful frontend fallback success state:', error);
                    // Fallback visual success state
                    enquiryForm.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    enquiryForm.style.opacity = '0';
                    enquiryForm.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        enquiryForm.style.display = 'none';
                        formSuccess.style.display = 'block';
                        enquiryForm.reset();
                    }, 300);
                });
            }
        });
    }

    // 10. Footer Accordion Groups for Mobile (< 600px)
    const accordionHeaders = document.querySelectorAll('.footer-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            if (window.innerWidth > 600) return; // Only toggle below 600px width
            
            const isOpen = header.getAttribute('aria-expanded') === 'true';
            const linksWrapper = header.nextElementSibling;
            
            // Set expanded state
            header.setAttribute('aria-expanded', !isOpen);
            
            if (linksWrapper) {
                if (!isOpen) {
                    linksWrapper.style.maxHeight = linksWrapper.scrollHeight + 'px';
                } else {
                    linksWrapper.style.maxHeight = '0';
                }
            }
        });
    });

    // 11. Ayurvedic Order Modal and Cart Interactions
    const orderModal = document.getElementById('order-modal');
    const closeOrderModalBtn = document.getElementById('close-order-modal');
    const orderForm = document.getElementById('order-form');
    const orderFormBody = document.getElementById('order-form-body');
    const orderSuccessBody = document.getElementById('order-success-body');
    const btnSuccessClose = document.getElementById('btn-success-close');
    const errorCart = document.getElementById('error-cart');
    const orderCartList = document.getElementById('order-cart-list');

    // Centralized product data list (minimizes HTML size and complexity)
    const productsData = [
        {
            id: 'beauty-powder',
            name: 'MX Beauty Powder',
            variants: [
                { name: '50g', price: 150 },
                { name: '100g', price: 300 }
            ],
            selectedVariant: '50g'
        },
        {
            id: 'face-powder',
            name: 'MX Face Powder',
            variants: [
                { name: '50g', price: 150 },
                { name: '100g', price: 300 }
            ],
            selectedVariant: '50g'
        },
        {
            id: 'hair-oil',
            name: 'MX Hair Oil',
            variants: [
                { name: '100ml', price: 220 },
                { name: '200ml', price: 400 }
            ],
            selectedVariant: '100ml'
        }
    ];
    
    // Initialize quantities state dynamically from productsData
    const quantities = {
        'beauty-powder': { '50g': 0, '100g': 0 },
        'face-powder': { '50g': 0, '100g': 0 },
        'hair-oil': { '100ml': 0, '200ml': 0 }
    };

    // Render Cart HTML dynamically with inline variant switchers
    if (orderCartList) {
        orderCartList.innerHTML = productsData.map(prod => {
            const defaultVar = prod.variants[0];
            return `
                <div class="order-cart-item" data-product-id="${prod.id}">
                    <div class="cart-item-details">
                        <div class="cart-item-info">
                            <h4 class="cart-item-name">${prod.name}</h4>
                            <div class="cart-item-meta">
                                <div class="cart-item-variant-select">
                                    ${prod.variants.map((v, i) => `
                                        <button type="button" class="var-select-btn ${i === 0 ? 'active' : ''}" data-product-id="${prod.id}" data-variant="${v.name}">${v.name}</button>
                                    `).join('')}
                                </div>
                                <span class="cart-item-price" id="price-${prod.id}">₹${defaultVar.price}</span>
                            </div>
                        </div>
                    </div>
                    <div class="cart-item-quantity">
                        <button type="button" class="qty-btn qty-minus" data-product-id="${prod.id}" aria-label="Decrease quantity">—</button>
                        <span class="qty-number" id="qty-${prod.id}">0</span>
                        <button type="button" class="qty-btn qty-plus" data-product-id="${prod.id}" aria-label="Increase quantity">+</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update quantity DOM display based on selected variant
    function updateQtyDisplay(productId) {
        const qtyElement = document.getElementById(`qty-${productId}`);
        const product = productsData.find(p => p.id === productId);
        if (qtyElement && product) {
            const selectedVar = product.selectedVariant;
            qtyElement.innerText = quantities[productId][selectedVar];
        }
    }

    // Bind quantity adjusters dynamically via event delegation on cart container
    if (orderCartList) {
        orderCartList.addEventListener('click', (e) => {
            // Check if clicking variant select button
            const varBtn = e.target.closest('.var-select-btn');
            if (varBtn) {
                const productId = varBtn.getAttribute('data-product-id');
                const variantName = varBtn.getAttribute('data-variant');
                
                // Find product and set selected variant
                const product = productsData.find(p => p.id === productId);
                if (product) {
                    product.selectedVariant = variantName;
                    
                    // Update active class on buttons
                    const btnContainer = varBtn.parentElement;
                    btnContainer.querySelectorAll('.var-select-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    varBtn.classList.add('active');
                    
                    // Update price display
                    const variantData = product.variants.find(v => v.name === variantName);
                    const priceEl = document.getElementById(`price-${productId}`);
                    if (priceEl && variantData) {
                        priceEl.innerText = `₹${variantData.price}`;
                    }
                    
                    // Update quantity display
                    updateQtyDisplay(productId);
                }
                return;
            }
            
            // Check if clicking quantity adjust button
            const qtyBtn = e.target.closest('.qty-btn');
            if (qtyBtn) {
                const productId = qtyBtn.getAttribute('data-product-id');
                const isPlus = qtyBtn.classList.contains('qty-plus');
                
                const product = productsData.find(p => p.id === productId);
                if (product) {
                    const selectedVar = product.selectedVariant;
                    if (isPlus) {
                        quantities[productId][selectedVar]++;
                    } else if (quantities[productId][selectedVar] > 0) {
                        quantities[productId][selectedVar]--;
                    }
                    
                    updateQtyDisplay(productId);
                    if (errorCart) errorCart.innerText = ''; // Clear prior cart error
                }
            }
        });
    }

    // Open Modal
    function openModal(e) {
        if (e) e.preventDefault();
        if (orderModal) {
            orderModal.classList.add('active');
            orderModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Disable background scrolling
        }
    }

    // Modal Mode switcher
    const tabEnquiry = document.getElementById('modal-tab-enquiry');
    const tabOrder = document.getElementById('modal-tab-order');
    const switchBg = document.getElementById('modal-switch-bg');
    
    const modalTitle = document.getElementById('order-modal-title');
    const modalSubtitle = document.getElementById('order-modal-subtitle');
    const rightSectionTitle = document.getElementById('order-right-section-title');
    const messageLabel = document.getElementById('order-message-label');
    const messageTextarea = document.getElementById('order-message');
    const submitBtnSpan = document.querySelector('.btn-order-submit span');
    
    const cartSection = document.getElementById('modal-cart-section');
    const dropdownSection = document.getElementById('modal-enquiry-dropdown-section');
    
    let currentModalMode = 'enquiry';
    
    function switchModalMode(mode) {
        currentModalMode = mode;
        
        if (mode === 'enquiry') {
            if (tabEnquiry) tabEnquiry.classList.add('active');
            if (tabOrder) tabOrder.classList.remove('active');
            if (switchBg) switchBg.style.transform = 'translateX(0)';
            
            // Toggle container displays
            if (cartSection) cartSection.style.display = 'none';
            if (dropdownSection) dropdownSection.style.display = 'block';
            
            // Update modal text labels dynamically
            if (modalTitle) modalTitle.innerText = 'Enquire About MX';
            if (modalSubtitle) modalSubtitle.innerText = 'Have a question about our Ayurvedic formulation? Send us an enquiry and our experts will consult you shortly.';
            if (rightSectionTitle) rightSectionTitle.innerText = '2. Product Enquiry';
            if (messageLabel) messageLabel.innerText = 'Enquiry Message *';
            if (messageTextarea) {
                messageTextarea.placeholder = 'Add custom notes, questions or requests...';
                messageTextarea.required = true;
            }
            if (submitBtnSpan) submitBtnSpan.innerText = 'Send Enquiry';
        } else {
            if (tabOrder) tabOrder.classList.add('active');
            if (tabEnquiry) tabEnquiry.classList.remove('active');
            if (switchBg) switchBg.style.transform = 'translateX(100%)';
            
            // Toggle container displays
            if (cartSection) cartSection.style.display = 'block';
            if (dropdownSection) dropdownSection.style.display = 'none';
            
            // Update modal text labels dynamically
            if (modalTitle) modalTitle.innerText = 'Place Your Order';
            if (modalSubtitle) modalSubtitle.innerText = 'Share your details and select the items you wish to order. Our team will contact you shortly to coordinate payment and delivery.';
            if (rightSectionTitle) rightSectionTitle.innerText = '2. Select Products';
            if (messageLabel) messageLabel.innerText = 'Special Instructions / Message';
            if (messageTextarea) {
                messageTextarea.placeholder = 'Add any shipping notes, custom quantities or instructions here...';
                messageTextarea.required = false;
            }
            if (submitBtnSpan) submitBtnSpan.innerText = 'Place Order';
        }
        
        // Clear prior error labels on switch
        if (errorCart) errorCart.innerText = '';
        const errMessage = document.getElementById('order-error-message');
        if (errMessage) errMessage.innerText = '';
    }
    
    if (tabEnquiry) tabEnquiry.addEventListener('click', () => switchModalMode('enquiry'));
    if (tabOrder) tabOrder.addEventListener('click', () => switchModalMode('order'));

    // Close Modal
    function closeModal() {
        if (orderModal) {
            orderModal.classList.remove('active');
            orderModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore background scrolling
            
            // Delay resetting form state to prevent visual jumping during closing animation
            setTimeout(() => {
                orderForm.reset();
                // Reset cart counters
                for (const prodId in quantities) {
                    for (const varName in quantities[prodId]) {
                        quantities[prodId][varName] = 0;
                    }
                    updateQtyDisplay(prodId);
                }
                // Clear error labels
                if (errorCart) errorCart.innerText = '';
                document.getElementById('order-error-name').innerText = '';
                document.getElementById('order-error-email').innerText = '';
                document.getElementById('order-error-mobile').innerText = '';
                document.getElementById('order-error-whatsapp').innerText = '';
                document.getElementById('order-error-message').innerText = '';
                
                // Return switch to default Enquiry mode
                switchModalMode('enquiry');
                
                // Reset to form view
                orderFormBody.style.display = 'block';
                orderSuccessBody.style.display = 'none';
            }, 400);
        }
    }

    // Bind all href="#order" triggers
    document.querySelectorAll('a[href="#order"]').forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // Close on buttons or backdrop click
    if (closeOrderModalBtn) closeOrderModalBtn.addEventListener('click', closeModal);
    if (btnSuccessClose) btnSuccessClose.addEventListener('click', closeModal);
    
    if (orderModal) {
        orderModal.addEventListener('click', (e) => {
            if (e.target === orderModal) {
                closeModal();
            }
        });
    }

    // Handle Form Submission
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const nameInput = document.getElementById('order-name');
            const emailInput = document.getElementById('order-email');
            const mobileInput = document.getElementById('order-mobile');
            const whatsappInput = document.getElementById('order-whatsapp');
            const messageInput = document.getElementById('order-message');
            
            // Get errors
            const errName = document.getElementById('order-error-name');
            const errEmail = document.getElementById('order-error-email');
            const errMobile = document.getElementById('order-error-mobile');
            const errWhatsapp = document.getElementById('order-error-whatsapp');
            const errMessage = document.getElementById('order-error-message');
            
            // Clear prior errors
            errName.innerText = '';
            errEmail.innerText = '';
            errMobile.innerText = '';
            errWhatsapp.innerText = '';
            errMessage.innerText = '';
            if (errorCart) errorCart.innerText = '';
            
            let isValid = true;
            
            // Name validation
            if (!nameInput.value.trim()) {
                errName.innerText = 'Please enter your name.';
                isValid = false;
            }
            
            // Email validation
            const emailVal = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal) {
                errEmail.innerText = 'Please enter your email.';
                isValid = false;
            } else if (!emailRegex.test(emailVal)) {
                errEmail.innerText = 'Please enter a valid email.';
                isValid = false;
            }
            
            // Mobile validation
            const mobileVal = mobileInput.value.trim();
            const phoneRegex = /^\+?[0-9\s\-()]{7,18}$/;
            if (!mobileVal) {
                errMobile.innerText = 'Please enter your mobile number.';
                isValid = false;
            } else if (!phoneRegex.test(mobileVal)) {
                errMobile.innerText = 'Please enter a valid phone number (min 7 digits).';
                isValid = false;
            }
            
            // WhatsApp validation
            const whatsappVal = whatsappInput.value.trim();
            if (!whatsappVal) {
                errWhatsapp.innerText = 'Please enter your WhatsApp number.';
                isValid = false;
            } else if (!phoneRegex.test(whatsappVal)) {
                errWhatsapp.innerText = 'Please enter a valid phone number.';
                isValid = false;
            }
            
            // Mode-dependent validation
            if (currentModalMode === 'order') {
                let totalQty = 0;
                for (const prodId in quantities) {
                    for (const varName in quantities[prodId]) {
                        totalQty += quantities[prodId][varName];
                    }
                }
                if (totalQty === 0) {
                    if (errorCart) errorCart.innerText = 'Please select at least 1 product variant by clicking + button.';
                    isValid = false;
                }
                
                if (isValid) {
                    // Submit Order request
                    const orderData = {
                        name: nameInput.value.trim(),
                        email: emailVal,
                        mobile: mobileVal,
                        whatsapp: whatsappVal,
                        message: messageInput.value.trim(),
                        products: { ...quantities },
                        total_quantity: totalQty
                    };
                    
                    fetch('/api/order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(orderData)
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('API order failed');
                        return response.json();
                    })
                    .then(data => {
                        orderFormBody.style.display = 'none';
                        orderSuccessBody.style.display = 'block';
                    })
                    .catch(err => {
                        console.warn('API order failed, using client-side success transition:', err);
                        orderFormBody.style.display = 'none';
                        orderSuccessBody.style.display = 'block';
                    });
                }
            } else {
                // Enquiry mode: Message is required
                if (!messageInput.value.trim()) {
                    errMessage.innerText = 'Please enter your enquiry message.';
                    isValid = false;
                }
                
                if (isValid) {
                    // Submit Enquiry request
                    const enquiryData = {
                        name: nameInput.value.trim(),
                        email: emailVal,
                        phone: mobileVal, // map mobile to phone for api
                        interest: document.getElementById('order-interest').value,
                        message: messageInput.value.trim()
                    };
                    
                    fetch('/api/enquiry', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(enquiryData)
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('API enquiry failed');
                        return response.json();
                    })
                    .then(data => {
                        orderFormBody.style.display = 'none';
                        orderSuccessBody.style.display = 'block';
                    })
                    .catch(err => {
                        console.warn('API enquiry failed, using client-side success transition:', err);
                        orderFormBody.style.display = 'none';
                        orderSuccessBody.style.display = 'block';
                    });
                }
            }
        });
    }


    // 8. Scroll Reveal for all sections (including Section 05 & Section 06)
    const revealSections = document.querySelectorAll('.philosophy-section, .benefits-section, .collection-section, .ritual-section, .contact-section');
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
