// Display current date and time in the footer
function updateDateTime() {
    const dateTimeElement = document.getElementById("dateTime");
    const now = new Date();

    dateTimeElement.textContent = "Current date and time: " + now.toLocaleString();
}

setInterval(updateDateTime, 1000);
updateDateTime();


// Contact form validation
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";
    } else if (!email.match(emailPattern)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "red";
    } else {
        formMessage.textContent = "Message sent successfully!";
        formMessage.style.color = "green";
        contactForm.reset();
    }
});


// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


// Cart system with popup
let cartCount = 0;

const cartDisplay = document.getElementById("cartCount");
const cartButtons = document.querySelectorAll(".cart-btn");
const toast = document.getElementById("toast");

cartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        cartCount++;
        cartDisplay.textContent = cartCount;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2000);
    });
});


// Interactive circular book carousel
const interactiveSection = document.querySelector(".interactive-books");
const heroImage = document.getElementById("heroImage");
const heroTitle = document.getElementById("heroTitle");
const heroAuthor = document.getElementById("heroAuthor");
const heroDescription = document.getElementById("heroDescription");
const circleThumbs = document.querySelectorAll(".circle-thumb");

circleThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        circleThumbs.forEach((item) => item.classList.remove("active"));
        thumb.classList.add("active");

        heroImage.classList.add("change");

        setTimeout(() => {
            heroImage.src = thumb.src;
            heroImage.alt = thumb.alt;

            heroTitle.textContent = thumb.dataset.title;
            heroAuthor.textContent = thumb.dataset.author;
            heroDescription.textContent = thumb.dataset.description;
            const bgColor = thumb.dataset.bg;
            interactiveSection.style.setProperty("--hero-bg", bgColor);

            if (isDarkColor(bgColor)) {
                interactiveSection.style.setProperty("--hero-text", "white");
            } else {
                interactiveSection.style.setProperty("--hero-text", "black");
            }
            
            heroImage.classList.remove("change");
        }, 250);
    });
});

// Show / Hide hero book description
const toggleHeroDescription = document.getElementById("toggleHeroDescription");

toggleHeroDescription.addEventListener("click", () => {
    if (heroDescription.style.display === "none") {
        heroDescription.style.display = "block";
    } else {
        heroDescription.style.display = "none";
    }
});

// Determine if interactive bg color is dark to adapt color of the text
function isDarkColor(hex) {
    hex = hex.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // formule luminosité
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness < 128;
}
