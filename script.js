// Section 1: Mobile navigation menu
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        siteNav.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
        siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}

// Section 2: Reveal the opening letter when it enters the viewport.
const letterInner = document.querySelector(".letter-inner");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (letterInner && !prefersReducedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("has-letter-reveal");

    const letterObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.15 });

    letterObserver.observe(letterInner);
}

// Section 4: Reveal friends' message cards as they enter the viewport.
const friendNotes = document.querySelectorAll(".friend-note");

if (friendNotes.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("has-friend-reveal");

    const friendMessageObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.15 });

    friendNotes.forEach((note) => friendMessageObserver.observe(note));
}

// Section 5: Reveal each editorial feature as it enters the viewport.
const specialFeatures = document.querySelectorAll(".special-feature");

if (specialFeatures.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("has-special-reveal");

    const specialFeatureObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.15 });

    specialFeatures.forEach((feature) => specialFeatureObserver.observe(feature));
}

// Section 7: Count down to the visitor's next local December 11.
const birthdayDate = document.querySelector("#birthday-date");
const birthdayDateYear = document.querySelector("#birthday-date-year");
const birthdayStatus = document.querySelector("#birthday-status");
const birthdayCountdown = document.querySelector("#birthday-countdown");
const birthdayMessage = document.querySelector("#birthday-message");
const birthdayCountdownValues = document.querySelectorAll("[data-countdown]");

function updateBirthdayFeature(now = new Date()) {
    if (!birthdayDate || !birthdayDateYear || !birthdayStatus || !birthdayCountdown || !birthdayMessage) {
        return;
    }

    const year = now.getFullYear();
    const isBirthday = now.getMonth() === 11 && now.getDate() === 11;
    const birthdayHasPassed = now.getMonth() === 11 && now.getDate() > 11;
    birthdayDateYear.textContent = String(year);
    birthdayDate.dateTime = `${year}-12-11`;

    if (isBirthday) {
        birthdayStatus.textContent = "Today is your day.";
        birthdayCountdown.hidden = true;
        birthdayMessage.textContent = "The world celebrates you today, Amarachi. Happiest birthday!";
        birthdayMessage.hidden = false;
        return;
    }

    if (birthdayHasPassed) {
        birthdayStatus.textContent = "A beautiful day, forever remembered.";
        birthdayCountdown.hidden = true;
        birthdayMessage.textContent = "December 11 may have passed, but the joy of celebrating you stays with us. Until we celebrate you again.";
        birthdayMessage.hidden = false;
        return;
    }

    birthdayStatus.textContent = "Counting down to your special day.";
    birthdayMessage.hidden = true;
    birthdayCountdown.hidden = false;

    const nextBirthday = new Date(year, 11, 11);
    const secondsRemaining = Math.ceil(Math.max(0, nextBirthday.getTime() - now.getTime()) / 1000);
    const values = {
        days: Math.floor(secondsRemaining / 86400),
        hours: Math.floor((secondsRemaining % 86400) / 3600),
        minutes: Math.floor((secondsRemaining % 3600) / 60),
        seconds: secondsRemaining % 60
    };

    birthdayCountdownValues.forEach((element) => {
        const value = String(values[element.dataset.countdown]).padStart(2, "0");

        if (element.textContent === value) {
            return;
        }

        element.textContent = value;
        if (!prefersReducedMotion) {
            element.classList.remove("is-changing");
            void element.offsetWidth;
            element.classList.add("is-changing");
        }
    });
}

updateBirthdayFeature();
if (birthdayDate) {
    window.setInterval(updateBirthdayFeature, 1000);
}

// Section 8: Reveal the final birthday message once the button is activated.
const surpriseButton = document.querySelector("#surprise-button");
const finalMessage = document.querySelector("#final-message");

if (surpriseButton && finalMessage) {
    surpriseButton.addEventListener("click", () => {
        finalMessage.hidden = false;
        surpriseButton.setAttribute("aria-expanded", "true");
        surpriseButton.textContent = "Surprise opened";
        surpriseButton.disabled = true;

        requestAnimationFrame(() => finalMessage.classList.add("is-open"));
        finalMessage.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "nearest"
        });
        finalMessage.focus({ preventScroll: true });
    });
}

// Section 9: Reveal the closing page and return to the cover.
const finalPageInner = document.querySelector(".final-page-inner");
const backToCover = document.querySelector("#back-to-cover");

if (finalPageInner && !prefersReducedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("has-final-page-reveal");

    const finalPageObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.15 });

    finalPageObserver.observe(finalPageInner);
}

if (backToCover) {
    backToCover.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });
}

// Section 3: Open and close enlarged gallery photos.
const photoLightbox = document.querySelector(".photo-lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

if (photoLightbox && lightboxImage && lightboxCaption && lightboxClose) {
    document.querySelectorAll(".gallery-image-button").forEach((button) => {
        button.addEventListener("click", () => {
            const image = button.querySelector("img");
            const caption = button.closest("figure")?.querySelector("figcaption");

            if (!image || !caption) {
                return;
            }

            lightboxImage.src = image.currentSrc || image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = caption.textContent.trim();
            photoLightbox.showModal();
        });
    });

    lightboxClose.addEventListener("click", () => {
        photoLightbox.close();
    });

    photoLightbox.addEventListener("click", (event) => {
        if (event.target === photoLightbox) {
            photoLightbox.close();
        }
    });

    photoLightbox.addEventListener("cancel", (event) => {
        event.preventDefault();
        photoLightbox.close();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && photoLightbox.open) {
            event.preventDefault();
            photoLightbox.close();
        }
    }, true);
}