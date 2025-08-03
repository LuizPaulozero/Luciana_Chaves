        // Enhanced Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

        function openMobileMenu() {
            document.body.classList.add('mobile-menu-open');
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            document.body.classList.remove('mobile-menu-open');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Event listeners
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);

        // Close menu when clicking on menu items
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(closeMobileMenu, 300); // Small delay for smooth transition
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Testimonial Modal Functions
        function openTestimonialModal(imageSrc) {
            const modal = document.getElementById('testimonial-modal');
            const modalImage = document.getElementById('testimonial-modal-image');
            modalImage.src = imageSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeTestimonialModal() {
            const modal = document.getElementById('testimonial-modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close modal when clicking outside the image
        document.getElementById('testimonial-modal').addEventListener('click', function (e) {
            if (e.target === this) {
                closeTestimonialModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeTestimonialModal();
            }
        });

        // Enhanced Carousel Functionality
        const carouselTrack = document.getElementById('carousel-track');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const carouselIndicators = document.getElementById('carousel-indicators');
        const slides = Array.from(carouselTrack.children);
        let currentSlide = 0;
        let isTransitioning = false;

        function updateCarousel() {
            if (isTransitioning) return;
            isTransitioning = true;

            const slideWidth = slides[0].offsetWidth;
            carouselTrack.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

            // Update indicators
            const dots = Array.from(carouselIndicators.children);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });

            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }

        function moveToSlide(slideIndex) {
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            } else if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            currentSlide = slideIndex;
            updateCarousel();
        }

        prevBtn.addEventListener('click', () => {
            moveToSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            moveToSlide(currentSlide + 1);
        });

        carouselIndicators.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-dot')) {
                const slide = parseInt(e.target.dataset.slide);
                moveToSlide(slide);
            }
        });

        // Auto-play carousel
        setInterval(() => {
            if (!isTransitioning) {
                moveToSlide(currentSlide + 1);
            }
        }, 6000);

        // Enhanced Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add staggered animation for multiple elements
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;

                    // Animate text reveals
                    const textReveals = entry.target.querySelectorAll('.text-reveal');
                    textReveals.forEach((element, i) => {
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.animation = 'textReveal 1.5s ease-out forwards';
                        }, i * 200);
                    });

                    // Animate words
                    const words = entry.target.querySelectorAll('.word-animate');
                    words.forEach((word, i) => {
                        setTimeout(() => {
                            word.style.animation = `wordSlide 0.8s ease-out ${i * 0.1}s forwards`;
                        }, 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            appearOnScroll.observe(el);
        });

        // Parallax Effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Enhanced Header Behavior
        const header = document.getElementById('header');
        let lastScrollTop = 0;
        let ticking = false;

        function updateHeader() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                header.classList.add('shadow-strong');
            } else {
                header.classList.remove('shadow-strong');
            }

            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    closeMobileMenu();
                }
            });
        });

        // Initialize carousel
        updateCarousel();

        // Text animation on scroll
        function animateTextOnScroll() {
            const textContainers = document.querySelectorAll('.text-container');
            textContainers.forEach(container => {
                const rect = container.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

                if (isVisible && !container.classList.contains('animated')) {
                    container.classList.add('animated');
                    // Animate paragraphs
                    const paragraphs = container.querySelectorAll('.luxury-paragraph');
                    paragraphs.forEach((p, index) => {
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transform = 'translateY(0)';
                        }, index * 300);
                    });
                }
            });
        }

        window.addEventListener('scroll', animateTextOnScroll);
        window.addEventListener('load', animateTextOnScroll);