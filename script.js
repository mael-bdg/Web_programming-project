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

// Fonction pour déterminer si une couleur est sombre (à ajouter)
function isDarkColor(hex) {
    if (!hex) return false;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}


// --- SYSTÈME DE BARRE DE RECHERCHE ---

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// 1. Récupérer la liste des livres disponibles à partir des miniatures HTML
function getAvailableBooks() {
    const thumbs = document.querySelectorAll(".circle-thumb");
    const booksList = [];
    
    thumbs.forEach(thumb => {
        booksList.push({
            title: thumb.dataset.title,
            author: thumb.dataset.author
        });
    });
    return booksList;
}

// 2. Écouter la saisie dans la barre de recherche
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    
    // Si la barre est vide, on cache les résultats
    if (query === "") {
        searchResults.innerHTML = "";
        searchResults.classList.add("hidden");
        return;
    }

    const allBooks = getAvailableBooks();
    // Filtrer les livres par titre ou par auteur
    const filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );

    // Vider les anciens résultats
    searchResults.innerHTML = "";
    searchResults.classList.remove("hidden");

    if (filteredBooks.length === 0) {
        searchResults.innerHTML = `<div class="no-results">No books found 😕</div>`;
        return;
    }

    // Afficher les livres correspondants
    filteredBooks.forEach(book => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("search-item");

        itemDiv.innerHTML = `
            <div class="search-item-info">
                <strong>${book.title}</strong>
                <span>${book.author}</span>
            </div>
            <button class="search-add-btn">Add</button>
        `;

        // Événement pour ajouter au panier depuis la recherche
        const addBtn = itemDiv.querySelector(".search-add-btn");
        addBtn.addEventListener("click", () => {
            // Ajouter au tableau global 'cart' (votre variable existante)
            cart.push({
                title: book.title,
                author: book.author
            });

            // Mettre à jour le panier (votre fonction existante)
            updateCart();

            // Déclencher votre animation Toast existante
            const toast = document.getElementById("toast");
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 2000);

            // Optionnel : Réinitialiser la barre de recherche après l'ajout
            searchInput.value = "";
            searchResults.innerHTML = "";
            searchResults.classList.add("hidden");
        });

        searchResults.appendChild(itemDiv);
    });
});

// Fermer les résultats si on clique n'importe où ailleurs sur la page
document.addEventListener("click", (event) => {
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.classList.add("hidden");
    }
});