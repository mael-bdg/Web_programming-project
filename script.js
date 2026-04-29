// Show or hide book descriptions
const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const description = button.previousElementSibling;

        if (description.style.display === "none") {
            description.style.display = "block";
        } else {
            description.style.display = "none";
        }
    });
});

// Display current date and time in the footer
function updateDateTime() {
    const dateTimeElement = document.getElementById("dateTime");
    const now = new Date();

    dateTimeElement.textContent = "Current date and time: " + now.toLocaleString();
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Search / filter books
const searchInput = document.getElementById("searchInput");
const bookCards = document.querySelectorAll(".book-card");

searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    bookCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const author = card.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchText) || author.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

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