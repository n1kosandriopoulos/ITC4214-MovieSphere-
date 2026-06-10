//Select elements
const searchInput = document.querySelector(".movie-search-input");
const searchButton = document.querySelector(".search-btn");
const resultsContainer = document.querySelector(".movie-results-container");
const savedMoviesContainer = document.querySelector(".saved-movies-container");
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

let currentMovies = [];

//Search  Movies Function
async function searchMovies() {

    //Get user input
    const searchTerm = searchInput.value.trim();

    //Prevent empty search
    if (searchTerm === "") {

        resultsContainer.innerHTML = `

            <p class="error-message">
                Please enter a movie name.
            </p>

        `;

        return;

    }

    try {

        //Loading Message
        resultsContainer.innerHTML = `

            <p class="loading-message">
                Loading Movies...
            </p>

        `;
        
        //Fetch API data
        const response = await fetch(SEARCH_URL + searchTerm);
        const data = await response.json();

        //Display Movies 
        displayMovies(data.results);

    }

    catch(error) {

        console.log("Error fetching movie:", error);

        resultsContainer.innerHTML = `

            <div class="error-message">

                Failed to load movies.
                Please try again later.

            </div>

        `;

    }

}

//Display Movies Function
function displayMovies(movies) {

    currentMovies = movies;
    resultsContainer.innerHTML = "";
    
    movies.forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `

            <img 
                src="${IMAGE_URL + movie.poster_path}"
                alt="${movie.title}">

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>⭐ ${movie.vote_average.toFixed(1)}</p>

                <button
                    class="add-btn"
                    onclick="saveMovie(${movie.id})">

                    Add to Watchlist

                </button>

            </div>

        `;

        resultsContainer.appendChild(movieCard);

    });

}


//Save Movie function
function saveMovie(movieId) {

    //Get existing movies
    let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    //Check if movie already exists
    const movieExists = savedMovies.some(movie => movie.id === movieId);

    if (movieExists) {

        alert("Movie already saved.");
        return;

    }

    //Find selected movie
    const selectedMovie = currentMovies.find(movie => movie.id === movieId);

    //Add movie 
    savedMovies.push(selectedMovie);

    //Save to localStorage
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

    //Refresh UI
    displaySavedMovies();

    alert("Movie saved!");

}

//Remove Movie function
function removeMovie(movieId) {

    //Get saved movies
    let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    //Remove selected movie
    savedMovies = savedMovies.filter(movie => movie.id !== movieId);

    //Update localStorage
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

    //Refresh UI
    displaySavedMovies();

}

//Display Saved Movies function
function displaySavedMovies() {

    //Get saved movies
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    //Clear container
    savedMoviesContainer.innerHTML = "";

    //Check if watchlist is empty
    if (savedMovies.length === 0) {

        savedMoviesContainer.innerHTML = `

            <p class="empty-message">
                No movies saved yet.
            </p>

        `;

        return;

    }

    //Loop through movies
    savedMovies.forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `

            <img 
                src="${IMAGE_URL + movie.poster_path}"
                alt="${movie.title}">

            <div class="movie-info">

                <h3>${movie.title}</h3>
                
                <p>⭐ ${movie.vote_average.toFixed(1)}</p>

                <button 
                    class="remove-btn"
                    onclick="removeMovie(${movie.id})">

                    Remove

                </button>

            </div>

        `;

        savedMoviesContainer.appendChild(movieCard);

    });

}

//Search Button Event
searchButton.addEventListener("click", searchMovies);

//Enter Key
searchInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        searchMovies();

    }

});

console.log("watchlist.js loaded")

displaySavedMovies();