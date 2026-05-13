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


// Shopping cart system
let cart = [];

const cartDisplay = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const emptyCartMessage = document.getElementById("emptyCartMessage");

const addToCartBtn = document.getElementById("addToCartBtn");
const toast = document.getElementById("toast");

// Update cart display
function updateCart() {

    // Update counter
    cartDisplay.textContent = cart.length;

    // Clear old list
    cartItems.innerHTML = "";

    // Show message if cart is empty
    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
    } else {
        emptyCartMessage.style.display = "none";
    }

    // Display books
    cart.forEach((book, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${book.title}</strong> - ${book.author}
            <button class="remove-btn" data-index="${index}">
                Remove
            </button>
        `;

        cartItems.appendChild(li);
    });

    // Remove buttons
    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {

            const index = button.dataset.index;

            cart.splice(index, 1);

            updateCart();
        });
    });
}

// Show / Hide cart section
const cartIcon = document.getElementById("cartIcon");
const cartSection = document.getElementById("cartSection");

cartIcon.addEventListener("click", () => {
    cartSection.classList.toggle("hidden");
});

// Add selected book
addToCartBtn.addEventListener("click", () => {

    const selectedBook = {
        title: heroTitle.textContent,
        author: heroAuthor.textContent
    };

    cart.push(selectedBook);

    updateCart();

    // Toast popup
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
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

toggleHeroDescription.addEventListener("click", () => {
    if (heroDescription.style.display === "none") {
        heroDescription.style.display = "block";
    } else {
        heroDescription.style.display = "none";
    }
});