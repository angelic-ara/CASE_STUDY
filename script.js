document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Budget Meal Calculator (Home Page)
    const calcBtn = document.getElementById("calcBtn");
    const budgetInput = document.getElementById("budgetInput");
    const calcResult = document.getElementById("calcResult");

    if (calcBtn) {
        calcBtn.addEventListener("click", function () {
            const budget = parseFloat(budgetInput.value);

            if (isNaN(budget) || budget <= 0) {
                calcResult.textContent = "Please enter a valid budget amount.";
                calcResult.style.color = "#d90429";
            } else if (budget < 35) {
                calcResult.textContent = "₱" + budget + ": Try Pancit Canton + Soft Boiled Egg!";
                calcResult.style.color = "#2b2d42";
            } else if (budget < 60) {
                calcResult.textContent = "₱" + budget + ": You can afford Hotdog with Rice or Century Tuna + Rice!";
                calcResult.style.color = "#2b2d42";
            } else {
                calcResult.textContent = "₱" + budget + ": Great budget! Enjoy Gisadong Corned Beef with Crispy Potatoes!";
                calcResult.style.color = "#198754";
            }
        });
    }

    // 2. Live Recipe Search Filter (Articles Page)
    const searchInput = document.getElementById("searchInput");
    const articleList = document.getElementById("articleList");

    if (searchInput && articleList) {
        searchInput.addEventListener("keyup", function () {
            const query = searchInput.value.toLowerCase();
            const columns = articleList.getElementsByClassName("column");

            Array.from(columns).forEach(function (col) {
                const title = col.querySelector("h2").textContent.toLowerCase();
                const text = col.querySelector("p").textContent.toLowerCase();

                if (title.includes(query) || text.includes(query)) {
                    col.style.display = "flex";
                } else {
                    col.style.display = "none";
                }
            });
        });
    }

    // 3. Contact Form Submission with Google Sheets Integration
    const scriptURL = "https://script.google.com/macros/s/AKfycbwSGOVZCihR384PWYIaS_-eaTn7FXd1-Z9zSwKU7EX0uq48_TN8uvARcV2D8UIS4Tn7gA/exec";
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            if (formFeedback) {
                formFeedback.textContent = "Sending your message...";
                formFeedback.style.color = "#ffb703";
            }

            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            fetch(scriptURL, {
                method: "POST",
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (formFeedback) {
                    formFeedback.textContent = "Thank you, " + formData.name + "! Your recipe suggestion has been sent.";
                    formFeedback.style.color = "#198754";
                }
                contactForm.reset();
            })
            .catch(error => {
                if (formFeedback) {
                    formFeedback.textContent = "Error sending message. Please try again.";
                    formFeedback.style.color = "#d90429";
                }
                console.error("Error!", error.message);
            });
        });
    }
});


function openRecipe(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active-temp", "active-tab");
        // Safe removal for active class
        tabContents[i].classList.remove("active-tab");
    }

    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add("active-tab");
        selectedTab.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}