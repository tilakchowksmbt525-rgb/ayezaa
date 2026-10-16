// 1. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");

    // Change the menu icon
    menuToggle.textContent = navLinks.classList.contains("show")
        ? "✕"
        : "☰";
});

// Close mobile menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
    });
});


// 2. Filter mehndi designs
const filterButtons = document.querySelectorAll(".filter-btn");
const designCards = document.querySelectorAll(".design-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Remove active style from all filters
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Highlight selected filter
        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        designCards.forEach(function (card) {
            if (
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});


// 3. Design preview modal
const designModal = document.getElementById("designModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".view-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        modalTitle.textContent = button.dataset.title;
        modalDescription.textContent = button.dataset.description;

        designModal.hidden = false;
        closeModal.focus();
    });
});

function hideModal() {
    designModal.hidden = true;
}

closeModal.addEventListener("click", hideModal);

// Close preview by clicking outside its content
designModal.addEventListener("click", function (event) {
    if (event.target === designModal) {
        hideModal();
    }
});

// Close preview with Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !designModal.hidden) {
        hideModal();
    }
});


// 4. Set minimum booking date to today
const bookingDate = document.getElementById("bookingDate");

const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

bookingDate.min = localToday;


// 5. Booking form
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const design = document.getElementById("designType").value;
    const date = bookingDate.value;

    if (!name || !phone || !design || !date) {
        bookingMessage.textContent = "Please complete all fields.";
        return;
    }

    const bookingDetails =
        "Booking request prepared!\n" +
        "Name: " + name + "\n" +
        "Mobile: " + phone + "\n" +
        "Design: " + design + "\n" +
        "Date: " + date;

    bookingMessage.textContent = bookingDetails;

    // Copy the booking details so the customer can send them
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(bookingDetails)
            .then(function () {
                bookingMessage.textContent =
                    bookingDetails + "\n\nDetails copied! Send them to your mehndi artist.";
            })
            .catch(function () {
                // The booking details are still displayed if copying fails
            });
    }
});