/**
 * R.K. Dhanesh Mee Kiri - Premium JS Interaction
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. Mobile Menu Drawer Navigation
    // ----------------------------------------------------
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenuCloseBtn = document.getElementById("mobile-menu-close");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const overlay = document.getElementById("drawer-overlay");

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileDrawer.classList.remove("translate-x-full");
            if (overlay) overlay.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
        });
    }

    const closeDrawer = () => {
        if (mobileDrawer) mobileDrawer.classList.add("translate-x-full");
        if (overlay) overlay.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    };

    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);


    // ----------------------------------------------------
    // 2. Intersection Observer for Scroll Reveals
    // ----------------------------------------------------
    const revealItems = document.querySelectorAll(".reveal-item, .reveal-item-left, .reveal-item-right");
    
    if (revealItems.length > 0) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    // Once animated, stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        });

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    }


    // ----------------------------------------------------
    // 3. Premium Testimonial Slider (Homepage)
    // ----------------------------------------------------
    const track = document.getElementById("testimonial-track");
    const prevBtn = document.getElementById("testimonial-prev");
    const nextBtn = document.getElementById("testimonial-next");
    const indicators = document.querySelectorAll(".testimonial-indicator");

    if (track && prevBtn && nextBtn) {
        let index = 0;
        const slides = track.children;
        const totalSlides = slides.length;

        const updateSlider = () => {
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // Update indicators
            indicators.forEach((ind, i) => {
                if (i === index) {
                    ind.classList.add("bg-clay-500", "w-8");
                    ind.classList.remove("bg-gray-300", "w-2");
                } else {
                    ind.classList.remove("bg-clay-500", "w-8");
                    ind.classList.add("bg-gray-300", "w-2");
                }
            });
        };

        nextBtn.addEventListener("click", () => {
            index = (index + 1) % totalSlides;
            updateSlider();
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + totalSlides) % totalSlides;
            updateSlider();
        });

        indicators.forEach((ind, i) => {
            ind.addEventListener("click", () => {
                index = i;
                updateSlider();
            });
        });

        // Autoplay slider every 5 seconds
        setInterval(() => {
            index = (index + 1) % totalSlides;
            updateSlider();
        }, 6000);
    }


    // ----------------------------------------------------
    // 4. Interactive Curd Cost Calculator & WhatsApp Constructor (Contact Page)
    // ----------------------------------------------------
    const calcQtyLarge = document.getElementById("calc-qty-large");
    const calcQtyMedium = document.getElementById("calc-qty-medium");
    const calcQtyTreacle = document.getElementById("calc-qty-treacle");

    const btnMinusLarge = document.getElementById("btn-minus-large");
    const btnPlusLarge = document.getElementById("btn-plus-large");
    const btnMinusMedium = document.getElementById("btn-minus-medium");
    const btnPlusMedium = document.getElementById("btn-plus-medium");
    const btnMinusTreacle = document.getElementById("btn-minus-treacle");
    const btnPlusTreacle = document.getElementById("btn-plus-treacle");

    const totalDisplay = document.getElementById("calc-total");
    const btnSubmitOrder = document.getElementById("btn-submit-order");

    // Prices (LKR)
    const PRICE_LARGE = 450;    // 1L Traditional Clay Pot
    const PRICE_MEDIUM = 350;   // 750ml Clay Pot
    const PRICE_TREACLE = 750;  // 375ml Authentic Kithul Treacle Bottle

    if (calcQtyLarge && calcQtyMedium && calcQtyTreacle) {
        const calculateTotal = () => {
            const qtyLarge = parseInt(calcQtyLarge.innerText) || 0;
            const qtyMedium = parseInt(calcQtyMedium.innerText) || 0;
            const qtyTreacle = parseInt(calcQtyTreacle.innerText) || 0;

            const total = (qtyLarge * PRICE_LARGE) + (qtyMedium * PRICE_MEDIUM) + (qtyTreacle * PRICE_TREACLE);
            
            if (totalDisplay) {
                totalDisplay.innerText = `Rs. ${total.toLocaleString()}`;
            }

            return {
                qtyLarge,
                qtyMedium,
                qtyTreacle,
                total
            };
        };

        const setupCounter = (btnMinus, btnPlus, display) => {
            btnMinus.addEventListener("click", () => {
                let val = parseInt(display.innerText) || 0;
                if (val > 0) {
                    display.innerText = val - 1;
                    calculateTotal();
                }
            });

            btnPlus.addEventListener("click", () => {
                let val = parseInt(display.innerText) || 0;
                display.innerText = val + 1;
                calculateTotal();
            });
        };

        setupCounter(btnMinusLarge, btnPlusLarge, calcQtyLarge);
        setupCounter(btnMinusMedium, btnPlusMedium, calcQtyMedium);
        setupCounter(btnMinusTreacle, btnPlusTreacle, calcQtyTreacle);

        // Form submission and WhatsApp API trigger
        if (btnSubmitOrder) {
            btnSubmitOrder.addEventListener("click", (e) => {
                e.preventDefault();
                
                const name = document.getElementById("order-name")?.value.trim() || "";
                const phone = document.getElementById("order-phone")?.value.trim() || "";
                const address = document.getElementById("order-address")?.value.trim() || "";
                const notes = document.getElementById("order-notes")?.value.trim() || "None";
                
                if (!name || !phone || !address) {
                    alert("దయකරලා නම, දුරකථන අංකය සහ ලිපිනය ඇතුලත් කරන්න! (Please fill in name, phone number, and address!)");
                    return;
                }

                const summary = calculateTotal();
                if (summary.total === 0) {
                    alert("దయකරලා අවම වශයෙන් එක් නිෂ්පාදනයක්වත් තෝරන්න! (Please select at least one item to order!)");
                    return;
                }

                // Constructing beautiful Sri Lankan custom WhatsApp message
                let itemsList = "";
                if (summary.qtyLarge > 0) itemsList += `🥛 1L Traditional Clay Pot: x ${summary.qtyLarge}\n`;
                if (summary.qtyMedium > 0) itemsList += `🥛 750ml Clay Pot: x ${summary.qtyMedium}\n`;
                if (summary.qtyTreacle > 0) itemsList += `🍯 Premium Kithul Treacle: x ${summary.qtyTreacle}\n`;

                const whatsappText = `*R.K. Dhanesh Mee Kiri - New Order* 🥛🍯\n\n` +
                                     `👤 *Customer Name:* ${name}\n` +
                                     `📞 *Phone Number:* ${phone}\n` +
                                     `📍 *Delivery Address:* ${address}\n` +
                                     `📝 *Special Notes:* ${notes}\n\n` +
                                     `📦 *Ordered Items:*\n${itemsList}\n` +
                                     `💰 *Total Amount:* Rs. ${summary.total.toLocaleString()}\n\n` +
                                     `Thank you for ordering traditional pure curd!`;

                const encodedText = encodeURIComponent(whatsappText);
                const whatsappNumber = "94771234567"; // Business WhatsApp Number
                const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;

                window.open(whatsappUrl, "_blank");
            });
        }
    }
});
