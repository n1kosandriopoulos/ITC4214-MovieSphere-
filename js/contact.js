//Select Contact From
const contactForm = document.querySelector(".contact-form");

//Select Input
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");

//Select Success Message
const successMessage = document.querySelector(".success-message");

//Contact Form Submit event
contactForm.addEventListener("submit", function(event) {

    //Prevent Page Refresh
    event.preventDefault();

    //Check if fields are empty
    if (

        nameInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        subjectInput.value.trim() === "" ||
        messageInput.value.trim() === ""

    ) {

        alert("Please fill in all the required fields.");
        return;

    }

    //Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value)) {

        alert("Please enter a valid email address.");
        return;

    }

    //Success message
    successMessage.textContent = "Your message has been sent!";
    successMessage.style.color = "limegreen";

    //Reset Form
    contactForm.reset();

});