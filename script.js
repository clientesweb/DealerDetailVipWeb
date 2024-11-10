// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 3000);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Top Banner Rotation
    const banner = document.getElementById('top-banner');
    const bannerContent = banner.querySelector('.banner-content');
    const bannerItems = banner.querySelectorAll('.banner-item');
    let currentBanner = 0;

    function rotateBanner() {
        currentBanner = (currentBanner + 1) % bannerItems.length;
        bannerContent.style.transform = `translateX(-${currentBanner * 100}%)`;
    }

    setInterval(rotateBanner, 5000);

    // Service Modal
    const serviceModal = document.createElement('div');
    serviceModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    serviceModal.innerHTML = `
        <div class="bg-black border border-[#00FF00] p-8 rounded-lg max-w-md w-full relative">
            <button id="closeModal" class="absolute top-2 right-2 text-[#00FF00] hover:text-white text-2xl" aria-label="Close modal">&times;</button>
            <h2 id="modalTitle" class="text-2xl font-bold mb-4 text-[#00FF00]"></h2>
            <p id="modalDescription" class="mb-4 text-white"></p>
            <ul id="modalFeatures" class="list-disc pl-5 mb-4 text-white"></ul>
            <p id="modalPrice" class="font-bold mb-4 text-[#00FF00]"></p>
            <button id="modalBookNow" class="bg-[#00FF00] text-black px-4 py-2 rounded-full hover:bg-opacity-80 transition">Book Now</button>
        </div>
    `;
    document.body.appendChild(serviceModal);

    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalPrice = document.getElementById('modalPrice');
    const closeModal = document.getElementById('closeModal');
    const modalBookNow = document.getElementById('modalBookNow');
    const viewServiceButtons = document.querySelectorAll('.view-service');

    const serviceDetails = {
        'protection-film': {
            title: "Protection Film",
            description: "Protect your vehicle's paint with our high-quality film application.",
            features: [
                "Advanced paint protection film",
                "Shields against rock chips and scratches",
                "Self-healing properties",
                "UV protection",
                "Preserves resale value"
            ],
            price: "From $499.99"
        },
        'steam-cleaning': {
            title: "Steam Cleaning",
            description: "Deep clean your vehicle's interior with our professional steam cleaning service.",
            features: [
                "Eliminates bacteria and allergens",
                "Removes tough stains",
                "Deodorizes interior",
                "Eco-friendly cleaning method",
                "Safe for all interior surfaces"
            ],
            price: "From $149.99"
        },
        'paint-correction': {
            title: "Paint Correction",
            description: "Restore your vehicle's paint to its original glory with our expert paint correction service.",
            features: [
                "Removes swirl marks and light scratches",
                "Enhances paint clarity and gloss",
                "Improves overall appearance",
                "Prepares surface for ceramic coating",
                "Performed by certified technicians"
            ],
            price: "From $299.99"
        },
        'ceramic-coating': {
            title: "Ceramic Coating",
            description: "Protect your vehicle's paint with a long-lasting ceramic coating.",
            features: [
                "Superior protection against environmental contaminants",
                "Enhances paint gloss and depth",
                "Hydrophobic properties for easy cleaning",
                "UV resistance to prevent fading",
                "Long-lasting protection (2-5 years)"
            ],
            price: "From $699.99"
        }
    };

    viewServiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-service');
            const details = serviceDetails[service];
            modalTitle.textContent = details.title;
            modalDescription.textContent = details.description;
            modalFeatures.innerHTML = details.features.map(feature => `<li>${feature}</li>`).join('');
            modalPrice.textContent = details.price;
            serviceModal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        serviceModal.classList.add('hidden');
    });

    modalBookNow.addEventListener('click', () => {
        serviceModal.classList.add('hidden');
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Testimonials Auto-scroll
    const testimonials = document.querySelector('.testimonials-auto-scroll');
    let scrollPosition = 0;
    const scrollSpeed = 1;

    function autoScrollTestimonials() {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= testimonials.scrollWidth / 2) {
            scrollPosition = 0;
        }
        testimonials.style.transform = `translateX(-${scrollPosition}px)`;
        requestAnimationFrame(autoScrollTestimonials);
    }

    autoScrollTestimonials();

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('open');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Booking Modal
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeBookingModal = bookingModal.querySelector('.close');

    bookNowBtn.addEventListener('click', () => {
        bookingModal.style.display = 'block';
    });

    closeBookingModal.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    // Book Now Button Notification
    const bookNowNotification = document.getElementById('bookNowNotification');
    let notificationTimeout;

    function showNotification() {
        bookNowNotification.style.opacity = '1';
        clearTimeout(notificationTimeout);
        notificationTimeout = setTimeout(() => {
            bookNowNotification.style.opacity = '0';
        }, 3000);
    }

    setInterval(showNotification, 15000);

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    console.log('Script loaded and running');
});
