//Theme Toggle Functionality

//Select Theme Toggle Button
const themeToggleBtn = document.querySelector(".theme-toggle-btn");

//Select Body
const body = document.querySelector("body");

//Select Theme Icon
const themeIcon = document.querySelector(".theme-toggle-btn i");

//Check saved theme
if (localStorage.getItem("theme") === "light") {

    body.classList.add("light-mode");
    themeIcon.classList.remove("bi-sun-fill");
    themeIcon.classList.add("bi-moon-fill");

}

//Theme Toggle Event
themeToggleBtn.addEventListener("click", () => {

    //Toggle Light Mode class
    body.classList.toggle("light-mode");

    //Check current mode
    if (body.classList.contains("light-mode")) {

        //Save theme
        localStorage.setItem("theme", "light");

        //Change icon
        themeIcon.classList.remove("bi-sun-fill");
        themeIcon.classList.add("bi-moon-fill");

    }

    else {

        //Save theme
        localStorage.setItem("theme", "dark");

        //Change icon
        themeIcon.classList.remove("bi-moon-fill");
        themeIcon.classList.add("bi-sun-fill");

    }

}); 






