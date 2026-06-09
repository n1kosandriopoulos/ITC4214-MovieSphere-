/* Theme Toggle Functionality */

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


/* TMDB API */

const API_KEY = "41a0584a9b46ca755d88d78ba66313e1";
const BASE_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const movieContainer = document.querySelector(".movie-grid");

async function fetchTrendingMovies() {

    try {

        const response = await fetch(BASE_URL);

        const data = await response.json();

        displayMovies(data.results);

    }

    catch(error) {

        console.log("Error fetching movies:", error);

    }

}

function displayMovies(movies) {

    movieContainer.innerHTML = "";
    movies.slice(0,8).forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
        
            <img src="${IMAGE_URL + movie.poster_path}"
                 alt="${movie.title}">

            <div class="movie-info">
                
                 <h3>${movie.title}</h3>

                 <p>⭐ ${movie.vote_average.toFixed(1)}</p>                
            
            </div>        
        `;

        movieContainer.appendChild(movieCard);

    });

}

fetchTrendingMovies();







    








